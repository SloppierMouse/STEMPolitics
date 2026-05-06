import fs from "fs";
import path from "path";
import { notFound } from "next/navigation";
import Link from "next/link";
import matter from "gray-matter";
import { marked } from "marked";

interface PageProps {
  params: { slug: string };
}

function getEssay(slug: string) {
  const filePath = path.join(process.cwd(), "data/essays", `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;

  const fileContents = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContents);
  const html = marked.parse(content) as string;

  return {
    title: data.title as string,
    description: data.description as string,
    date: data.date as string,
    html,
  };
}

export function generateStaticParams() {
  const essaysDir = path.join(process.cwd(), "data/essays");
  const files = fs.readdirSync(essaysDir).filter((f) => f.endsWith(".md"));
  return files.map((f) => ({ slug: f.replace(/\.md$/, "") }));
}

export default function EssayPage({ params }: PageProps) {
  const essay = getEssay(params.slug);
  if (!essay) notFound();

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <Link
        href="/why-it-matters"
        className="text-sm text-teal hover:underline mb-6 inline-block"
      >
        ← Back to essays
      </Link>

      <p className="text-xs text-muted mb-3">
        {new Date(essay.date).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </p>

      <h1 className="text-3xl font-semibold text-slate-dark mb-4 leading-tight">
        {essay.title}
      </h1>

      <p className="text-lg text-muted leading-[1.7] mb-8 border-l-4 border-teal pl-4">
        {essay.description}
      </p>

      <div
        className="text-gray-700 leading-[1.7] space-y-4 [&_p]:mb-4 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-slate-dark [&_h2]:mt-8 [&_h2]:mb-3 [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:mt-6 [&_h3]:mb-2"
        dangerouslySetInnerHTML={{ __html: essay.html }}
      />
    </div>
  );
}
