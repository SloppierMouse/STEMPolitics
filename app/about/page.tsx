export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-semibold text-slate-dark mb-4">
        About STEMpolitics
      </h1>

      <div className="text-muted leading-[1.7] mb-10 text-lg border-l-4 border-teal pl-4">
        <p>
          STEMpolitics.com tracks scientists, engineers, physicians, and
          mathematicians who have served in public office — and makes the case
          that technical expertise in government is not a luxury but a
          necessity.
        </p>
      </div>

      <section className="mb-12">
        <h2 className="text-xl font-semibold text-slate-dark mb-4">
          Our Mission
        </h2>
        <div className="space-y-4 text-gray-700 leading-[1.7]">
          <p>
            The most consequential policy questions of the 21st century are
            technical questions: how to regulate artificial intelligence, how
            to respond to a changing climate, how to allocate resources for
            pandemic preparedness, how to write law for an era of commercial
            spaceflight. These questions do not have purely political answers.
            They have correct and incorrect answers, better and worse
            framings, and consequences that play out over decades.
          </p>
          <p>
            STEMpolitics exists to document the legislators who bring genuine
            technical expertise to these questions, to argue for the value of
            that expertise, and to make the historical and contemporary case
            that science in politics produces better government.
          </p>
        </div>
      </section>

      {/* Herbert Hoover */}
      <section className="mb-12 bg-teal-light rounded-lg p-6">
        <div className="flex items-start gap-4 mb-4">
          <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center text-gray-500 font-semibold text-lg shrink-0">
            HH
          </div>
          <div>
            <h2 className="text-xl font-semibold text-slate-dark">
              Herbert Hoover
            </h2>
            <p className="text-sm text-muted">
              Mining Engineer → 31st President of the United States
            </p>
          </div>
        </div>
        <div className="space-y-4 text-gray-700 leading-[1.7]">
          <p>
            Before he became president, Herbert Hoover was one of the most
            celebrated engineers in the world. He held a geology and mining
            engineering degree from Stanford, built a successful international
            mining career across Australia and China, and became wealthy
            through technical competence and systematic problem-solving.
          </p>
          <p>
            When World War I devastated Europe, Hoover was appointed to lead
            the Commission for Relief in Belgium, and later served as U.S.
            Food Administrator under Woodrow Wilson. He organized the feeding
            of an estimated 10 million people in occupied Belgium and northern
            France, managing supply chains, negotiating with military
            commanders on both sides, and tracking logistics at a scale
            unprecedented in peacetime. The operation saved millions of lives.
            It was, at its core, an engineering problem — and Hoover solved it
            like one.
          </p>
          <p>
            His presidency is remembered primarily for the Great Depression, a
            crisis that arrived early in his term and that he managed
            imperfectly. But his pre-presidential career stands as one of the
            most compelling examples in American history of technical expertise
            deployed in service of humanity at scale.
          </p>
        </div>
      </section>

      {/* Jimmy Carter */}
      <section className="mb-12 bg-teal-light rounded-lg p-6">
        <div className="flex items-start gap-4 mb-4">
          <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center text-gray-500 font-semibold text-lg shrink-0">
            JC
          </div>
          <div>
            <h2 className="text-xl font-semibold text-slate-dark">
              Jimmy Carter
            </h2>
            <p className="text-sm text-muted">
              Nuclear Physicist → 39th President of the United States
            </p>
          </div>
        </div>
        <div className="space-y-4 text-gray-700 leading-[1.7]">
          <p>
            Jimmy Carter studied nuclear physics at the Naval Academy and was
            personally selected by Admiral Hyman Rickover to join the
            development program for the United States&apos; first nuclear
            submarines — one of the most technically demanding assignments in
            the post-war military. He spent years working on reactor physics
            and nuclear engineering before his father&apos;s death brought him
            back to Georgia to manage the family farm.
          </p>
          <p>
            On March 28, 1979, the Three Mile Island nuclear reactor in
            Pennsylvania suffered a partial meltdown — the most serious nuclear
            accident in U.S. history. Carter, uniquely among American
            presidents before or since, could read the technical briefings
            himself. He understood what a core temperature reading meant, what
            a hydrogen bubble in the reactor vessel implied, what the
            difference was between a controlled release and an uncontrolled
            one. He and Rosalynn walked through the reactor building two days
            after the accident — a visible act of reassurance that required
            genuine confidence in his own technical understanding of the risk.
          </p>
          <p>
            His handling of Three Mile Island is a case study in how technical
            literacy changes the quality of executive decision-making. A
            president who could not evaluate the conflicting technical advice
            he was receiving would have been entirely dependent on advisers
            with their own institutional interests. Carter could push back.
            That matters.
          </p>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-slate-dark mb-4">
          Why Technical Background Matters
        </h2>
        <div className="space-y-4 text-gray-700 leading-[1.7]">
          <p>
            The Hoover and Carter cases illustrate a recurring pattern: when
            technically trained people hold power, they ask different
            questions. They can identify when they are being misled by
            overconfident projections. They understand the difference between
            a model and reality. They know what uncertainty means and what it
            doesn&apos;t.
          </p>
          <p>
            This is not a partisan argument. The politicians we profile span
            the ideological spectrum. Rand Paul and Bill Cassidy are both
            physicians; they have very different politics. Vernon Ehlers was a
            conservative Republican physicist who believed in evidence-based
            policy. The common thread is not ideology — it is epistemic
            humility and technical competence.
          </p>
          <p>
            The decisions that will define the 21st century — on climate, AI,
            pandemic preparedness, space resource law — require legislators
            who can understand the science they are being asked to act on.
            STEMpolitics exists to make that case and to celebrate the people
            who embody it.
          </p>
        </div>
      </section>
    </div>
  );
}
