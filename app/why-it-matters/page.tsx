import fs from "fs";
import path from "path";
import Link from "next/link";
import matter from "gray-matter";

interface Essay {
  slug: string;
  title: string;
  description: string;
  date: string;
}

function getEssays(): Essay[] {
  const essaysDir = path.join(process.cwd(), "data/essays");
  const files = fs.readdirSync(essaysDir).filter((f) => f.endsWith(".md"));

  return files
    .map((filename) => {
      const filePath = path.join(essaysDir, filename);
      const fileContents = fs.readFileSync(filePath, "utf8");
      const { data } = matter(fileContents);
      const slug = filename.replace(/\.md$/, "");
      return {
        slug,
        title: data.title as string,
        description: data.description as string,
        date: data.date as string,
      };
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export default function WhyItMattersPage() {
  const essays = getEssays();

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-semibold text-slate-dark mb-2">
        Why It Matters
      </h1>
      <p className="text-muted leading-[1.7] mb-10">
        The argument for STEM expertise in public office, issue by issue.
      </p>

      <div className="flex flex-col gap-6">
        {essays.map((essay) => (
          <Link
            key={essay.slug}
            href={`/why-it-matters/${essay.slug}`}
            className="bg-white border border-gray-200 rounded-lg p-6 hover:border-teal hover:shadow-md transition-all group"
          >
            <p className="text-xs text-muted mb-2">
              {new Date(essay.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
            <h2 className="text-xl font-semibold text-slate-dark group-hover:text-teal transition-colors mb-2 leading-snug">
              {essay.title}
            </h2>
            <p className="text-muted leading-[1.7] text-sm">{essay.description}</p>
            <span className="inline-block mt-4 text-sm text-teal font-semibold group-hover:underline">
              Read essay →
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
