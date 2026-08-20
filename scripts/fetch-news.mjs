#!/usr/bin/env node
// Fetches configured RSS feeds, filters/dedupes articles, summarizes new ones
// with the Claude API, and writes the result to data/news-cache.json.
// Run manually with `npm run fetch-news` (requires ANTHROPIC_API_KEY), or on a
// schedule via .github/workflows/fetch-news.yml.

import { createHash } from "node:crypto";
import { readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import Parser from "rss-parser";
import Anthropic from "@anthropic-ai/sdk";

const __dirname = dirname(fileURLToPath(import.meta.url));
const CACHE_PATH = join(__dirname, "..", "data", "news-cache.json");

const FEEDS = [
  { name: "NPR Science", url: "https://feeds.npr.org/1007/rss.xml" },
  { name: "The Hill Technology", url: "https://thehill.com/technology/feed/" },
  { name: "Politico Science", url: "https://rss.politico.com/science.xml" },
  { name: "Nature News", url: "https://www.nature.com/nature.rss" },
  { name: "Science News", url: "https://www.sciencenews.org/feed" },
];

const KEYWORDS = [
  "policy",
  "regulation",
  "congress",
  "legislation",
  "government",
  "senate",
  "STEM",
  "science funding",
  "NASA",
  "climate",
  "AI regulation",
  "tech",
];

const MODEL = "claude-haiku-4-5-20251001";
const MAX_SUMMARY_TOKENS = 200;
const MAX_AGE_DAYS = 45;
// "Token overlap" is treated as Jaccard similarity (intersection / union) of
// the normalized-title word sets.
const DEDUPE_OVERLAP_THRESHOLD = 0.9;

function normalizeTitle(title) {
  return title
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]/gu, "")
    .replace(/\s+/g, " ")
    .trim();
}

function tokenOverlap(normalizedA, normalizedB) {
  const setA = new Set(normalizedA.split(" ").filter(Boolean));
  const setB = new Set(normalizedB.split(" ").filter(Boolean));
  if (setA.size === 0 || setB.size === 0) return 0;
  let intersection = 0;
  for (const token of setA) {
    if (setB.has(token)) intersection++;
  }
  const union = new Set([...setA, ...setB]).size;
  return intersection / union;
}

function isDuplicateTitle(normalizedA, normalizedB) {
  return (
    normalizedA === normalizedB ||
    tokenOverlap(normalizedA, normalizedB) > DEDUPE_OVERLAP_THRESHOLD
  );
}

function matchesKeywords(item) {
  const haystack = `${item.title} ${item.description}`.toLowerCase();
  return KEYWORDS.some((keyword) => haystack.includes(keyword.toLowerCase()));
}

async function fetchFeed(parser, feed) {
  const parsed = await parser.parseURL(feed.url);
  return (parsed.items || []).map((item) => ({
    title: (item.title || "").trim(),
    url: item.link || item.guid || "",
    description: item.contentSnippet || item.summary || item.content || "",
    publishedAt: item.isoDate || item.pubDate || new Date().toISOString(),
    source: feed.name,
  }));
}

async function fetchAllFeeds() {
  const parser = new Parser({
    timeout: 15000,
    headers: {
      "User-Agent":
        "Mozilla/5.0 (compatible; STEMPoliticsBot/1.0; +https://stempolitics.com)",
    },
  });

  const results = await Promise.allSettled(
    FEEDS.map((feed) => fetchFeed(parser, feed))
  );

  const items = [];
  results.forEach((result, index) => {
    const feed = FEEDS[index];
    if (result.status === "fulfilled") {
      items.push(...result.value);
    } else {
      console.warn(
        `[fetch-news] Skipping feed "${feed.name}" (${feed.url}): ${
          result.reason?.message ?? result.reason
        }`
      );
    }
  });
  return items;
}

function groupByStory(items) {
  const groups = [];
  for (const item of items) {
    if (!item.title || !item.url) continue;
    const normalizedTitle = normalizeTitle(item.title);
    const existing = groups.find((group) =>
      isDuplicateTitle(group.normalizedTitle, normalizedTitle)
    );
    if (existing) {
      existing.feedsCovering.add(item.source);
    } else {
      groups.push({
        normalizedTitle,
        item,
        feedsCovering: new Set([item.source]),
      });
    }
  }
  return groups;
}

function buildSummaryPrompt(title, description) {
  return `You are summarizing news for STEMpolitics.com, a site for readers
interested in science and technology policy. Given an article title
and description, respond with ONLY a JSON object (no markdown fences,
no preamble) with this exact shape:

{
  "relevant": boolean,   // true only if genuinely about science/tech policy or governance
  "topic": string,       // one of: "AI Policy", "Climate", "Space", "Science Funding", "Health", "Tech Regulation", "Uncategorized"
  "summary": string      // exactly 2 sentences, factual and neutral, written for this audience
}

Only summarize what is explicitly stated in the title and description.
If the description does not contain enough information to summarize
confidently, write a shorter, more general summary based only on the
title and available facts — never speculate, infer, or guess what the
article likely covers.

Article title: ${title}
Article description: ${description}`;
}

function parseSummaryResponse(text) {
  const cleaned = text
    .trim()
    .replace(/^```(?:json)?\s*/i, "")
    .replace(/```\s*$/, "");
  const parsed = JSON.parse(cleaned);
  if (
    typeof parsed.relevant !== "boolean" ||
    typeof parsed.topic !== "string" ||
    typeof parsed.summary !== "string"
  ) {
    throw new Error("Malformed summary shape");
  }
  return parsed;
}

async function summarizeArticle(anthropic, title, description) {
  const prompt = buildSummaryPrompt(title, description);
  const attempts = 2;
  for (let attempt = 1; attempt <= attempts; attempt++) {
    try {
      const response = await anthropic.messages.create({
        model: MODEL,
        max_tokens: MAX_SUMMARY_TOKENS,
        messages: [{ role: "user", content: prompt }],
      });
      const text = response.content?.[0]?.type === "text" ? response.content[0].text : "";
      return parseSummaryResponse(text);
    } catch (error) {
      console.warn(
        `[fetch-news] Summarization attempt ${attempt}/${attempts} failed for "${title}": ${error.message}`
      );
    }
  }
  return null;
}

async function loadExistingCache() {
  try {
    const raw = await readFile(CACHE_PATH, "utf8");
    return JSON.parse(raw);
  } catch (error) {
    if (error.code === "ENOENT") return [];
    throw error;
  }
}

async function main() {
  if (!process.env.ANTHROPIC_API_KEY) {
    console.error(
      "[fetch-news] Missing ANTHROPIC_API_KEY environment variable. See .env.local.example."
    );
    process.exitCode = 1;
    return;
  }

  const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

  const existingCache = await loadExistingCache();
  const existingUrls = new Set(existingCache.map((entry) => entry.url));

  const rawItems = await fetchAllFeeds();
  console.log(`[fetch-news] Fetched ${rawItems.length} raw items.`);

  const keywordFiltered = rawItems.filter(matchesKeywords);
  console.log(
    `[fetch-news] ${keywordFiltered.length} items passed the keyword filter.`
  );

  const candidates = keywordFiltered.filter(
    (item) => item.url && !existingUrls.has(item.url)
  );

  const groups = groupByStory(candidates);
  console.log(
    `[fetch-news] ${groups.length} distinct stories after dedup (from ${candidates.length} candidates).`
  );

  const newEntries = [];
  for (const group of groups) {
    const { item, feedsCovering, normalizedTitle } = group;
    const summaryResult = await summarizeArticle(
      anthropic,
      item.title,
      item.description
    );

    if (summaryResult && !summaryResult.relevant) {
      console.log(`[fetch-news] Dropping (not relevant): ${item.title}`);
      continue;
    }

    newEntries.push({
      id: createHash("sha1").update(normalizedTitle).digest("hex"),
      title: item.title,
      url: item.url,
      source: item.source,
      publishedAt: item.publishedAt,
      topic: summaryResult ? summaryResult.topic : "Uncategorized",
      summary: summaryResult ? summaryResult.summary : item.description || "",
      summaryIsFallback: !summaryResult,
      coverageScore: feedsCovering.size,
      featured: false,
      addedAt: new Date().toISOString(),
    });
  }

  console.log(`[fetch-news] ${newEntries.length} new entries to add.`);

  const cutoff = Date.now() - MAX_AGE_DAYS * 24 * 60 * 60 * 1000;
  const merged = [...existingCache, ...newEntries].filter((entry) => {
    const publishedAtMs = new Date(entry.publishedAt).getTime();
    return Number.isNaN(publishedAtMs) ? true : publishedAtMs >= cutoff;
  });

  merged.sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

  await writeFile(CACHE_PATH, `${JSON.stringify(merged, null, 2)}\n`, "utf8");
  console.log(
    `[fetch-news] Wrote ${merged.length} entries (${newEntries.length} new) to ${CACHE_PATH}.`
  );
}

main().catch((error) => {
  console.error("[fetch-news] Fatal error:", error);
  process.exitCode = 1;
});
