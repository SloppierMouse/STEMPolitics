import { NewsArticle, formatArticleTimestamp } from "@/lib/news";

interface NewsCardProps {
  article: NewsArticle;
  now: string;
  variant?: "standard" | "lead" | "highlight";
}

export default function NewsCard({ article, now, variant = "standard" }: NewsCardProps) {
  const timestamp = formatArticleTimestamp(article.publishedAt, new Date(now));
  const isLead = variant === "lead";
  const isHighlight = variant === "highlight";

  return (
    <article
      className={`bg-white rounded-lg border border-gray-200 ${
        isLead ? "p-8" : "p-5"
      } ${isHighlight ? "h-full flex flex-col" : ""}`}
    >
      <a
        href={article.url}
        target="_blank"
        rel="noopener noreferrer"
        className={`font-semibold text-slate-dark hover:text-teal transition-colors ${
          isLead ? "text-2xl" : "text-base"
        }`}
      >
        {article.title}
      </a>

      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-2 text-sm text-muted">
        <span>{article.source}</span>
        <span aria-hidden="true">&middot;</span>
        <span>{timestamp}</span>
        {article.topic !== "Uncategorized" && (
          <span className="text-xs font-medium text-teal bg-teal-light px-2.5 py-0.5 rounded-full">
            {article.topic}
          </span>
        )}
      </div>

      <div className="mt-4 pl-4 border-l-2 border-teal">
        <p className="text-xs font-semibold text-teal uppercase tracking-wide mb-1">
          AI Summary
        </p>
        <p className="text-sm text-muted leading-body">{article.summary}</p>
      </div>
    </article>
  );
}
