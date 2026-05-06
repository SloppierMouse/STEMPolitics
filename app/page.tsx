import Link from "next/link";
import politicians from "@/data/politicians.json";

const featuredPoliticians = politicians.filter((p) => p.active).slice(0, 4);

const staticNews = [
  {
    id: 1,
    title: "Congress Debates AI Safety Regulation",
    description:
      "Senate Commerce Committee holds hearings on proposed federal AI oversight framework, with testimony from leading researchers.",
    category: "AI Policy",
    date: "2024-03-10",
  },
  {
    id: 2,
    title: "NASA's Psyche Mission Reaches Asteroid Belt",
    description:
      "The Psyche spacecraft successfully enters orbit around the metal-rich asteroid, opening new questions about space resource law.",
    category: "Space",
    date: "2024-02-28",
  },
  {
    id: 3,
    title: "Senate Passes Bipartisan Science Funding Bill",
    description:
      "A rare moment of agreement: legislation increasing NSF and DOE Office of Science budgets clears the Senate 67-32.",
    category: "Science Funding",
    date: "2024-02-14",
  },
];

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-slate-dark text-white py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-semibold mb-6 leading-tight">
            STEM Belongs in Politics
          </h1>
          <p className="text-xl text-gray-300 leading-[1.7] max-w-2xl mx-auto mb-8">
            The decisions shaping our future — on AI, climate, space, and
            public health — require legislators who understand science. We
            track the scientists, engineers, and physicians who have brought
            technical expertise to public office.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/politicians"
              className="bg-teal text-white px-6 py-3 rounded-md font-semibold hover:bg-teal/90 transition-colors"
            >
              Meet the Politicians
            </Link>
            <Link
              href="/why-it-matters"
              className="border border-white text-white px-6 py-3 rounded-md font-semibold hover:bg-white/10 transition-colors"
            >
              Why It Matters
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Politicians */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-semibold text-slate-dark mb-2">
            Featured Legislators
          </h2>
          <p className="text-muted mb-8 leading-[1.7]">
            Current members of Congress with STEM backgrounds.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredPoliticians.map((politician) => (
              <Link
                key={politician.id}
                href="/politicians"
                className="bg-page-bg rounded-lg p-5 border border-gray-200 hover:border-teal hover:shadow-md transition-all group"
              >
                <div className="w-16 h-16 bg-gray-300 rounded-full mb-4 flex items-center justify-center text-gray-500 text-xl font-semibold">
                  {politician.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .slice(0, 2)}
                </div>
                <h3 className="font-semibold text-slate-dark group-hover:text-teal transition-colors">
                  {politician.name}
                </h3>
                <p className="text-sm text-muted mt-1">{politician.office}</p>
                <p className="text-xs text-teal mt-2 font-medium">
                  {politician.field}
                </p>
              </Link>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link
              href="/politicians"
              className="text-teal font-semibold hover:underline"
            >
              View all STEM politicians →
            </Link>
          </div>
        </div>
      </section>

      {/* Latest News (static placeholder) */}
      <section className="py-16 px-4 bg-page-bg">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-2xl font-semibold text-slate-dark">
              Latest News
            </h2>
            <span className="text-xs text-muted bg-gray-200 px-3 py-1 rounded-full">
              Live feed coming soon
            </span>
          </div>
          <p className="text-muted mb-8 leading-[1.7]">
            Science and policy at the intersection of government.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {staticNews.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-lg p-6 border border-gray-200 hover:shadow-md transition-shadow"
              >
                <span className="text-xs font-semibold text-teal uppercase tracking-wide">
                  {item.category}
                </span>
                <h3 className="font-semibold text-slate-dark mt-2 mb-2 leading-snug">
                  {item.title}
                </h3>
                <p className="text-sm text-muted leading-[1.7]">
                  {item.description}
                </p>
                <p className="text-xs text-gray-400 mt-4">{item.date}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link
              href="/news"
              className="text-teal font-semibold hover:underline"
            >
              See all news →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
