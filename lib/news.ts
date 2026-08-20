export interface NewsArticle {
  id: string;
  title: string;
  url: string;
  source: string;
  publishedAt: string;
  topic: string;
  summary: string;
  summaryIsFallback: boolean;
  coverageScore: number;
  featured: boolean;
  addedAt: string;
}

export const TOPICS = [
  "AI Policy",
  "Climate",
  "Space",
  "Science Funding",
  "Health",
  "Tech Regulation",
] as const;

/** Nature (and possibly other feeds) always report midnight UTC — treat that as "no real time-of-day". */
function hasTimePrecision(iso: string): boolean {
  const d = new Date(iso);
  return (
    d.getUTCHours() !== 0 ||
    d.getUTCMinutes() !== 0 ||
    d.getUTCSeconds() !== 0 ||
    d.getUTCMilliseconds() !== 0
  );
}

function formatRelativeTime(iso: string, now: Date): string {
  const diffMs = now.getTime() - new Date(iso).getTime();
  const diffMin = Math.round(diffMs / 60000);
  if (diffMin < 1) return "just now";
  if (diffMin < 60) return `${diffMin}m ago`;
  const diffHr = Math.round(diffMin / 60);
  if (diffHr < 24) return `${diffHr}h ago`;
  const diffDay = Math.round(diffHr / 24);
  return `${diffDay}d ago`;
}

function formatPlainDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });
}

/** Relative time when the source gives real time-of-day precision, otherwise a plain date. */
export function formatArticleTimestamp(iso: string, now: Date): string {
  return hasTimePrecision(iso) ? formatRelativeTime(iso, now) : formatPlainDate(iso);
}

function startOfUtcDay(d: Date): number {
  return Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate());
}

export function formatDayGroupLabel(iso: string, now: Date): string {
  const d = new Date(iso);
  const diffDays = Math.round((startOfUtcDay(now) - startOfUtcDay(d)) / 86400000);
  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  return d.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: d.getUTCFullYear() === now.getUTCFullYear() ? undefined : "numeric",
    timeZone: "UTC",
  });
}

export interface NewsDayGroup {
  label: string;
  articles: NewsArticle[];
}

/** Groups articles by calendar day. Assumes `articles` is already sorted newest-first. */
export function groupArticlesByDay(articles: NewsArticle[], now: Date): NewsDayGroup[] {
  const groups: NewsDayGroup[] = [];
  const indexByLabel = new Map<string, number>();

  for (const article of articles) {
    const label = formatDayGroupLabel(article.publishedAt, now);
    const existingIndex = indexByLabel.get(label);
    if (existingIndex === undefined) {
      indexByLabel.set(label, groups.length);
      groups.push({ label, articles: [article] });
    } else {
      groups[existingIndex].articles.push(article);
    }
  }

  return groups;
}

/** Up to `limit` articles from the current calendar month: featured first, then by coverage score. */
export function selectHighlights(articles: NewsArticle[], now: Date, limit = 5): NewsArticle[] {
  const year = now.getUTCFullYear();
  const month = now.getUTCMonth();

  const inMonth = articles.filter((a) => {
    const d = new Date(a.publishedAt);
    return d.getUTCFullYear() === year && d.getUTCMonth() === month;
  });

  const featured = inMonth
    .filter((a) => a.featured)
    .sort((a, b) => b.coverageScore - a.coverageScore);
  const rest = inMonth
    .filter((a) => !a.featured)
    .sort((a, b) => b.coverageScore - a.coverageScore);

  return [...featured, ...rest].slice(0, limit);
}
