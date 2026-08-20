"use client";

import { useState } from "react";
import NewsCard from "@/components/NewsCard";
import { NewsArticle, TOPICS, groupArticlesByDay } from "@/lib/news";

type Filter = "All" | (typeof TOPICS)[number];

const FILTERS: Filter[] = ["All", ...TOPICS];

interface NewsFiltersProps {
  articles: NewsArticle[];
  now: string;
}

export default function NewsFilters({ articles, now }: NewsFiltersProps) {
  const [activeFilter, setActiveFilter] = useState<Filter>("All");

  const filtered =
    activeFilter === "All"
      ? articles
      : articles.filter((a) => a.topic === activeFilter);

  const groups = groupArticlesByDay(filtered, new Date(now));
  const leadArticleId = filtered[0]?.id;

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-8">
        {FILTERS.map((filter) => (
          <button
            key={filter}
            type="button"
            onClick={() => setActiveFilter(filter)}
            className={`text-sm px-3 py-1 rounded-full border transition-colors ${
              activeFilter === filter
                ? "bg-teal text-white border-teal"
                : "border-gray-300 text-muted hover:border-teal hover:text-teal"
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="text-muted py-16 text-center">
          No articles match this filter right now.
        </p>
      ) : (
        <div className="space-y-10">
          {groups.map((group) => (
            <section key={group.label}>
              <h3 className="text-sm font-semibold text-muted uppercase tracking-wide mb-4">
                {group.label}
              </h3>
              <div className="space-y-4">
                {group.articles.map((article) => (
                  <NewsCard
                    key={article.id}
                    article={article}
                    now={now}
                    variant={article.id === leadArticleId ? "lead" : "standard"}
                  />
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
