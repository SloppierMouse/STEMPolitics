import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic();
const cache = new Map<string, string>();

export async function POST(request: NextRequest) {
  const { title, description, url } = (await request.json()) as {
    title: string;
    description: string;
    url?: string;
  };

  if (url && cache.has(url)) {
    return NextResponse.json({ summary: cache.get(url) });
  }

  try {
    const message = await client.messages.create({
      model: "claude-3-5-haiku-20241022",
      max_tokens: 120,
      messages: [
        {
          role: "user",
          content: `Summarize the following news item in exactly 2 sentences. Be concise and factual.\n\nTitle: ${title}\n\nDescription: ${description}`,
        },
      ],
    });

    const block = message.content[0];
    const summary = block.type === "text" ? block.text : description;

    if (url) {
      cache.set(url, summary);
    }

    return NextResponse.json({ summary });
  } catch {
    return NextResponse.json({ summary: description });
  }
}
