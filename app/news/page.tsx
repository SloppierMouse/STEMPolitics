import newsCacheRaw from "@/data/news-cache.json";
import NewsHighlights from "@/components/NewsHighlights";
import NewsFilters from "@/components/NewsFilters";
import { NewsArticle, formatArticleTimestamp } from "@/lib/news";

const newsCache = newsCacheRaw as NewsArticle[];

export default function NewsPage() {
  const now = new Date();
  const nowIso = now.toISOString();

  const lastUpdatedIso = newsCache.reduce<string | null>(
    (latest, article) => (!latest || article.addedAt > latest ? article.addedAt : latest),
    null
  );

  const latest50 = [...newsCache]
    .sort(
      (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    )
    .slice(0, 50);

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <header className="mb-10">
        <h1 className="text-3xl font-semibold text-slate-dark mb-2">News</h1>
        <p className="text-muted leading-body">
          The latest news at the intersection of STEM and government.
        </p>
        {lastUpdatedIso && (
          <p className="text-sm text-muted mt-2">
            Last updated {formatArticleTimestamp(lastUpdatedIso, now)}
          </p>
        )}
      </header>

      <NewsHighlights articles={newsCache} now={nowIso} />

      <section>
        <h2 className="text-xl font-semibold text-slate-dark mb-4">Latest</h2>
        <NewsFilters articles={latest50} now={nowIso} />
      </section>
    </div>
  );
}
