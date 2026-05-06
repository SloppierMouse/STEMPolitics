---
title: "Writing the Rules for AI: Why Engineers Belong in the Room"
description: "AI regulation is being written right now. The core technical questions require genuine literacy to legislate well, and the gap between what AI does and what legislators think it does is dangerous."
date: "2024-02-08"
slug: "ai-governance"
---

The European Union's AI Act entered into force in August 2024, becoming the world's first comprehensive legal framework for artificial intelligence. In the United States, President Biden's Executive Order on AI had already set in motion a cascade of agency rulemakings, safety evaluations, and reporting requirements. The window for shaping how AI is governed is not coming in the future — it is closing now, in real time, as regulations are being written in Brussels, Washington, and Beijing.

The problem is that the most consequential technical questions embedded in this legislation are being decided by people who largely cannot evaluate them.

Consider three specific issues that appear in current regulatory proposals. First: what counts as a "frontier model"? The EU AI Act and US executive orders both attempt to define high-capability AI systems subject to special oversight, often using metrics like the amount of compute used to train the model. But compute thresholds are a rough proxy at best. A model trained on less compute with a better architecture and better data can be dramatically more capable than a larger model trained naively. Setting the threshold wrong either captures too much — burdening legitimate research — or too little, exempting dangerous systems. Getting this right requires understanding the relationship between training compute, model architecture, and emergent capabilities. It is not a question a lawyer can answer by reading a brief.

Second: how do you audit a black box? Regulators are proposing mandatory audits of AI systems before deployment. But current AI systems are not auditable in any traditional engineering sense. There is no source code path you can trace from input to output. Interpretability research — the scientific discipline that tries to understand what happens inside these models — is active and largely unsolved. Legislating audit requirements without understanding this means either mandating theater (audits that satisfy a checkbox but reveal nothing) or inadvertently mandating the impossible.

Third: what do safety benchmarks mean? AI companies and regulators routinely point to benchmark scores as evidence that a system is or isn't safe. But benchmarks measure performance on specific test sets, and it is well-documented that AI systems can score well on safety benchmarks while failing badly in deployment. "Our model scored 95% on the safety eval" sounds reassuring to someone who doesn't know that the benchmark was constructed by the same organization that built the model, or that the test set is publicly available and may have been trained on.

These are not abstract concerns. They are the difference between regulation that actually constrains dangerous AI development and regulation that creates the appearance of oversight while protecting incumbent industry players.

The senators and representatives who will vote on this legislation are not stupid. But intelligence without domain knowledge is not enough. The gap between what these systems actually do and what non-technical legislators believe they do is wide enough to drive a truck through, and industry lobbyists know it. The single most reliable way to close that gap is to have people in the room — on the relevant committees, asking questions during markups, staffing the key offices — who have actually built machine learning systems and understand their failure modes from the inside.

The rules for AI are being written. The question is whether anyone on the legislative side understands what they're writing.
