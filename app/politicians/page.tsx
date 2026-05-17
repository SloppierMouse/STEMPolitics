"use client";

import { useState } from "react";
import Image from "next/image";
import politicians from "@/data/politicians.json";

type Party = "All" | "Democrat" | "Republican";
type Status = "All" | "Active" | "Former";

export default function PoliticiansPage() {
  const [partyFilter, setPartyFilter] = useState<Party>("All");
  const [statusFilter, setStatusFilter] = useState<Status>("All");

  const filtered = politicians.filter((p) => {
    const partyMatch = partyFilter === "All" || p.party === partyFilter;
    const statusMatch =
      statusFilter === "All" ||
      (statusFilter === "Active" && p.active) ||
      (statusFilter === "Former" && !p.active);
    return partyMatch && statusMatch;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-semibold text-slate-dark mb-2">
        STEM Politicians
      </h1>
      <p className="text-muted leading-[1.7] mb-8">
        Scientists, engineers, and physicians who have served — or are
        currently serving — in public office.
      </p>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-8">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-muted">Party:</span>
          {(["All", "Democrat", "Republican"] as Party[]).map((p) => (
            <button
              key={p}
              onClick={() => setPartyFilter(p)}
              className={`text-sm px-3 py-1 rounded-full border transition-colors ${
                partyFilter === p
                  ? "bg-teal text-white border-teal"
                  : "border-gray-300 text-muted hover:border-teal hover:text-teal"
              }`}
            >
              {p}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-muted">Status:</span>
          {(["All", "Active", "Former"] as Status[]).map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`text-sm px-3 py-1 rounded-full border transition-colors ${
                statusFilter === s
                  ? "bg-teal text-white border-teal"
                  : "border-gray-300 text-muted hover:border-teal hover:text-teal"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
        <span className="text-sm text-muted self-center">
          {filtered.length} politician{filtered.length !== 1 ? "s" : ""}
        </span>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((politician) => (
          <div
            key={politician.id}
            className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
          >
            {/* Photo */}
            <div className="h-56 bg-gray-200 flex items-center justify-center overflow-hidden relative">
              {politician.image ? (
                <Image
                  src={politician.image}
                  alt={politician.name}
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              ) : (
                <span className="text-4xl font-semibold text-gray-400">
                  {politician.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .slice(0, 2)}
                </span>
              )}
            </div>

            <div className="p-5">
              <div className="flex items-start justify-between gap-2 mb-1">
                <h2 className="font-semibold text-slate-dark leading-snug">
                  {politician.name}
                </h2>
                <span
                  className={`text-xs font-semibold px-2 py-0.5 rounded-full shrink-0 ${
                    politician.party === "Democrat"
                      ? "bg-blue-100 text-blue-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {politician.party === "Democrat" ? "D" : "R"}
                </span>
              </div>

              <p className="text-sm text-muted mb-1">{politician.office}</p>

              <div className="flex items-center gap-1 mb-3">
                <span className="text-xs font-medium text-teal bg-teal-light px-2 py-0.5 rounded-full">
                  {politician.field}
                </span>
                {!politician.active && (
                  <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
                    Former
                  </span>
                )}
              </div>

              <p className="text-xs text-muted leading-[1.7] mb-3">
                <span className="font-medium text-slate-dark">
                  {politician.stemBackground}
                </span>
              </p>

              <p className="text-sm text-gray-600 leading-[1.7]">
                {politician.bio}
              </p>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 text-muted">
          No politicians match the selected filters.
        </div>
      )}
    </div>
  );
}
