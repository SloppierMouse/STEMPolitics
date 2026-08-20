import NewsCard from "@/components/NewsCard";
import { NewsArticle, selectHighlights } from "@/lib/news";

interface NewsHighlightsProps {
  articles: NewsArticle[];
  now: string;
}

export default function NewsHighlights({ articles, now }: NewsHighlightsProps) {
  const highlights = selectHighlights(articles, new Date(now));

  if (highlights.length === 0) {
    return null;
  }

  return (
    <section className="mb-12">
      <h2 className="text-xl font-semibold text-slate-dark mb-4">
        This Month in STEM Policy
      </h2>
      <div className="flex gap-4 overflow-x-auto pb-2 -mx-4 px-4 md:mx-0 md:px-0 md:grid md:grid-cols-2 lg:grid-cols-3 md:overflow-visible">
        {highlights.map((article) => (
          <div key={article.id} className="w-72 shrink-0 md:w-auto">
            <NewsCard article={article} now={now} variant="highlight" />
          </div>
        ))}
      </div>
    </section>
  );
}
