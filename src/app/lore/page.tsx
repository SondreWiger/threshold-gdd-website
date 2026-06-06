"use client";

import { useState } from "react";
import Link from "next/link";
import SectionHeader from "@/components/SectionHeader";
import DataCard from "@/components/DataCard";

const sections = [
  {
    id: "timeline",
    title: "THE BACKROOMS TIMELINE",
    items: [
      { year: "1989", event: "Async Technologies discovers first stable entrance to the Backrooms in Level 0 — an abandoned office building in Ohio.", significance: "ORIGIN" },
      { year: "1990–1995", event: "Project THRESHOLD initiated. Government-funded military-corporate alliance to map and exploit the Backrooms for resource extraction and weaponization.", significance: "PROGRAM" },
      { year: "1996–2003", event: "First documented entity encounters. Initial expeditions suffer 72% casualty rate. Entities begin displaying adaptive intelligence.", significance: "ESCALATION" },
      { year: "2004–2010", event: "Async establishes Level 4 Outpost. Backrooms begins showing signs of awareness — corridors rearrange in response to human activity.", significance: "AWARENESS" },
      { year: "2011–2018", event: "The Backrooms starts producing Doppelgangers. Psychological warfare tactics deployed against expedition teams.", significance: "ADAPTATION" },
      { year: "2019–2025", event: "Project THRESHOLD reclassified. The Backrooms is no longer a place to be explored — it's an entity to be survived.", significance: "PARADIGM SHIFT" },
      { year: "2026", event: "Events of THRESHOLD. Fireteam deployed to Level 4. The exit point has been compromised.", significance: "THE GAME" },
    ],
  },
  {
    id: "async",
    title: "ASYNC TECHNOLOGIES",
    items: [
      { year: "FOUNDATION", event: "Founded by former DARPA researchers with classified knowledge of non-Euclidean spatial phenomena.", significance: "ORIGIN" },
      { year: "MISSION", event: "Secure, contain, and exploit anomalous spatial phenomena for military and industrial applications.", significance: "PURPOSE" },
      { year: "STRUCTURE", event: "Three divisions: Research (understanding), Operations (exploitation), Security (containment).", significance: "ORG" },
      { year: "MOTIVES", event: "Backrooms contain resources impossible to obtain in normal space. Energy sources, rare materials, and spatial manipulation technology.", significance: "DRIVE" },
      { year: "ETHICS", event: "Minimal. View personnel as expendable assets. Previous expedition teams deemed acceptable losses.", significance: "RISK" },
    ],
  },
  {
    id: "entities",
    title: "ENTITY TAXONOMY",
    items: [
      { year: "CLASS A", event: "Skin-Stealers — Mimic human appearance after prolonged exposure. Infiltration-focused. Patient hunters.", significance: "DECEPTION" },
      { year: "CLASS B", event: "Hounds — Pack-hunting pursuit predators. Blind but hypersensitive to sound and electrical signals.", significance: "HUNT" },
      { year: "CLASS C", event: "Graspers — Limb-based ambush predators. Hide in shadows and tight spaces. Attack nervous system directly.", significance: "AMBUSH" },
      { year: "CLASS D", event: "Doppelgangers — Perfect physical and psychological copies. Created from absorbed personnel. Indistinguishable.", significance: "PARANOIA" },
      { year: "CLASS E", event: "Unclassified — Entities that don't fit known categories. Some appear to be environmental effects. Others seem to be the Backrooms itself.", significance: "UNKNOWN" },
    ],
  },
];

const entityTypes = [
  { name: "Skin-Stealers", class: "A", threat: 65, stealth: 90, intelligence: 80, color: "bg-amber/40" },
  { name: "Hounds", class: "B", threat: 75, stealth: 40, intelligence: 55, color: "bg-amber/40" },
  { name: "Graspers", class: "C", threat: 70, stealth: 85, intelligence: 30, color: "bg-amber/45" },
  { name: "Doppelgangers", class: "D", threat: 50, stealth: 95, intelligence: 90, color: "bg-amber/45" },
  { name: "Unclassified", class: "E", threat: 85, stealth: 70, intelligence: 60, color: "bg-amber/45" },
];

export default function LorePage() {
  const [activeSection, setActiveSection] = useState("timeline");

  return (
    <div className="px-6 md:px-12 lg:px-24 py-16 md:py-24">
      <SectionHeader
        code="05 / LORE"
        title="Lore & Worldbuilding"
        subtitle="The history, entities, and conspiracy behind the Backrooms"
      />

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-x-8 gap-y-6 mb-20">
        <DataCard label="Timeline" value="37YR" sub="1989–2026" />
        <DataCard label="Entities" value="200+" sub="Documented types" />
        <DataCard label="Async" value="CORP" sub="Tech-military" />
        <DataCard label="Extraction" value="3.7%" sub="Historical avg" />
        <DataCard label="Levels" value="UNKNOWN" sub="Depth unclear" />
        <DataCard label="Status" value="ACTIVE" sub="Containment" />
      </div>

      {/* Section Tabs */}
      <div className="flex gap-6 mb-12 border-b border-foreground/[0.12]">
        {sections.map((s) => (
          <button
            key={s.id}
            onClick={() => setActiveSection(s.id)}
            className={`pb-3 font-mono text-[10px] tracking-[0.15em] transition-colors ${
              activeSection === s.id
                ? "text-amber/75 border-b border-amber/40"
                : "text-foreground/65 hover:text-foreground/65"
            }`}
          >
            {s.title}
          </button>
        ))}
      </div>

      {/* Active Section Content */}
      <div className="mb-20">
        <div className="space-y-0">
          {sections.find((s) => s.id === activeSection)?.items.map((item, i) => (
            <div key={i} className="py-5 border-b border-foreground/[0.08] group">
              <div className="flex items-start gap-6">
                <span className="font-mono text-[10px] text-amber/45 w-24 shrink-0 pt-0.5">{item.year}</span>
                <div className="flex-1">
                  <p className="text-[13px] text-foreground/65 font-light leading-relaxed">{item.event}</p>
                </div>
                <span className="font-mono text-[9px] text-foreground/75 tracking-wider shrink-0">{item.significance}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Entity Visual Comparison */}
      <div className="mb-20">
        <h3 className="font-mono text-[10px] text-foreground/65 tracking-[0.2em] mb-8">ENTITY COMPARISON</h3>
        <div className="space-y-6">
          {entityTypes.map((e, i) => (
            <div key={i} className="py-4 border-b border-foreground/[0.08]">
              <div className="flex items-baseline gap-4 mb-3">
                <span className="font-mono text-[10px] text-amber/55">CLASS {e.class}</span>
                <span className="text-[13px] text-foreground/75 font-medium">{e.name}</span>
              </div>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { label: "THREAT", value: e.threat },
                  { label: "STEALTH", value: e.stealth },
                  { label: "INTEL", value: e.intelligence },
                ].map((stat) => (
                  <div key={stat.label}>
                    <div className="flex items-baseline justify-between mb-1">
                      <span className="font-mono text-[8px] text-foreground/55 tracking-wider">{stat.label}</span>
                      <span className="font-mono text-[9px] text-foreground/65">{stat.value}</span>
                    </div>
                    <div className="h-[2px] bg-foreground/[0.08] overflow-hidden">
                      <div className={`h-full ${e.color}`} style={{ width: `${stat.value}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Cross-links */}
      <div className="mt-16 pt-8 border-t border-foreground/[0.12]">
        <div className="flex flex-wrap gap-6">
          <Link href="/characters" className="font-mono text-[10px] text-foreground/55 hover:text-amber/50 transition-colors tracking-wider">
            FIRETEAM THRESHOLD &rarr;
          </Link>
          <Link href="/levels" className="font-mono text-[10px] text-foreground/55 hover:text-amber/50 transition-colors tracking-wider">
            LEVEL ARCHITECTURE &rarr;
          </Link>
          <Link href="/gameplay" className="font-mono text-[10px] text-foreground/55 hover:text-amber/50 transition-colors tracking-wider">
            COMBAT SYSTEMS &rarr;
          </Link>
          <Link href="/overview" className="font-mono text-[10px] text-foreground/55 hover:text-amber/50 transition-colors tracking-wider">
            PROJECT OVERVIEW &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}
