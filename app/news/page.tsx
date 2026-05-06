export default function NewsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-semibold text-slate-dark mb-4">
        Science &amp; Policy News
      </h1>
      <p className="text-muted leading-[1.7] mb-8">
        The latest news at the intersection of STEM and government.
      </p>

      <div className="bg-teal-light border border-teal/30 rounded-lg p-8 text-center">
        <div className="text-4xl mb-4">📡</div>
        <h2 className="text-xl font-semibold text-slate-dark mb-2">
          Live RSS feed coming soon
        </h2>
        <p className="text-muted leading-[1.7] max-w-md mx-auto">
          We&apos;re building a curated feed of science and policy news from
          trusted sources. Check back soon for live updates on STEM legislation,
          research funding, and the politicians who bridge both worlds.
        </p>
      </div>
    </div>
  );
}
