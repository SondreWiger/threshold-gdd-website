"use client";

import SectionHeader from "@/components/SectionHeader";
import DataCard from "@/components/DataCard";

const overviewSections = [
  {
    title: "The Core Concept",
    content: `THRESHOLD weaponizes tonal dissonance. Players begin as an elite US military squad deployed by Async Technologies to "secure and contain" the Backrooms — confident, well-equipped, and in control. By the campaign's midpoint, that confidence is systematically destroyed. The game transforms from a tactical shooter into a desperate survival-horror experience where the environment itself is the enemy, resources are scarce, and extraction is a distant memory.`,
  },
  {
    title: "Genre",
    content: "Tactical Survival-Horror, Squad-Based FPS. 1 player (Campaign) / 1-4 (Cooperative Multiplayer).",
  },
  {
    title: "Target Platforms",
    content: "PC (Steam/Epic), PlayStation 5, Xbox Series X|S",
  },
  {
    title: "Rating & Price",
    content: "M (Mature 17+) — $49.99 USD. Premium single-purchase. No battle pass, no loot boxes, no FOMO mechanics.",
  },
];

const usps = [
  { num: "01", title: "Tonal Shift Gameplay", desc: "The only tactical shooter that becomes a survival-horror game while you are playing it. Not two modes — one seamless transformation." },
  { num: "02", title: "The Backrooms as Military Sci-Fi", desc: "Brings corporate-military conspiracy, structured lore, and squad dynamics to the liminal space phenomenon." },
  { num: "03", title: "Adaptive Squad AI", desc: "Teammates that learn from player tactics, develop visible stress responses, and can psychologically break under sustained horror exposure." },
  { num: "04", title: "Reality-Bending Environments", desc: "Procedural environmental distortion using UE5 — corridors stretch, rooms rearrange, and distance becomes meaningless." },
  { num: "05", title: "True Cooperative Horror", desc: "Co-op where player communication degrades as in-game communications equipment fails, creating real isolation between players." },
];

const audience = [
  {
    tier: "PRIMARY",
    age: "18–35",
    desc: "Players of Ready or Not, GTFO, Escape from Tarkov, Resident Evil, Silent Hill who want tactical gunplay with horror tension.",
  },
  {
    tier: "SECONDARY",
    age: "16–30",
    desc: "The liminal space / Backrooms community — fans of Kane Pixels, analog horror, liminal space photography.",
  },
  {
    tier: "TERTIARY",
    age: "18–40",
    desc: "Co-op horror enthusiasts (Phasmophobia, Left 4 Dead 2, Deep Rock Galactic) who want shared experiences that still unsettle.",
  },
];

const risks = [
  { risk: "UE5 procedural generation too demanding", prob: "MEDIUM", mitigation: "Early prototype validation" },
  { risk: "Co-op netcode for horror atmosphere", prob: "MEDIUM", mitigation: "Dedicated servers from Day 1" },
  { risk: "\"Not scary enough\" feedback", prob: "MEDIUM", mitigation: "Monthly external horror testing" },
  { risk: "Backrooms IP/community friction", prob: "LOW", mitigation: "Original lore, no direct IP use" },
];

export default function OverviewPage() {
  return (
    <div className="px-6 md:px-12 lg:px-24 py-16 md:py-24">
      <SectionHeader
        code="01 / OVERVIEW"
        title="Project Overview"
        subtitle="Squad-based tactical survival-horror FPS developed by Northem Developments"
      />

      {/* Key stats — clean horizontal */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-x-8 gap-y-6 mb-20">
        <DataCard label="Engine" value="UE5" sub="5.4+" />
        <DataCard label="Developer" value="Northem" sub="Developments" />
        <DataCard label="Players" value="1–4" sub="Campaign + Co-op" />
        <DataCard label="Platforms" value="3" sub="PC, PS5, Xbox" />
        <DataCard label="Timeline" value="18mo" sub="Development cycle" />
        <DataCard label="Price" value="$49" sub="No MTX" />
      </div>

      {/* Overview sections */}
      <div className="space-y-12 mb-20">
        {overviewSections.map((section, i) => (
          <div key={i}>
            <h3 className="font-mono text-[10px] text-foreground/20 tracking-[0.2em] mb-3">
              {section.title.toUpperCase()}
            </h3>
            <p className="text-sm text-foreground/50 leading-relaxed max-w-2xl">
              {section.content}
            </p>
          </div>
        ))}
      </div>

      {/* USPs */}
      <div className="mb-20">
        <h3 className="font-mono text-[10px] text-foreground/20 tracking-[0.2em] mb-8">
          UNIQUE SELLING POINTS
        </h3>
        <div className="space-y-8">
          {usps.map((usp) => (
            <div key={usp.num} className="flex gap-6">
              <span className="font-mono text-sm text-foreground/10 shrink-0">{usp.num}</span>
              <div>
                <h4 className="text-[13px] font-medium text-foreground/60 mb-1">{usp.title}</h4>
                <p className="text-[13px] text-foreground/25 font-light leading-relaxed max-w-xl">{usp.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Audience */}
      <div className="mb-20">
        <h3 className="font-mono text-[10px] text-foreground/20 tracking-[0.2em] mb-8">
          TARGET AUDIENCE
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {audience.map((a) => (
            <div key={a.tier}>
              <div className="flex items-baseline gap-3 mb-2">
                <span className="font-mono text-[9px] text-foreground/20 tracking-[0.2em]">{a.tier}</span>
                <span className="font-mono text-[9px] text-foreground/10">AGE {a.age}</span>
              </div>
              <p className="text-[13px] text-foreground/30 font-light leading-relaxed">{a.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Risk Assessment */}
      <div className="mb-20">
        <h3 className="font-mono text-[10px] text-foreground/20 tracking-[0.2em] mb-8">
          RISK ASSESSMENT
        </h3>
        <div className="space-y-4">
          {risks.map((r, i) => (
            <div key={i} className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6 py-3 border-b border-foreground/[0.04]">
              <span className="text-[13px] text-foreground/40 flex-1">{r.risk}</span>
              <span className={`font-mono text-[9px] tracking-[0.15em] ${
                r.prob === "HIGH" ? "text-tactical-red/60" :
                r.prob === "MEDIUM" ? "text-foreground/25" :
                "text-foreground/15"
              }`}>
                {r.prob}
              </span>
              <span className="text-[12px] text-foreground/20 font-light">{r.mitigation}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Inspirations */}
      <div>
        <h3 className="font-mono text-[10px] text-foreground/20 tracking-[0.2em] mb-6">
          REFERENCE WORKS
        </h3>
        <div className="flex flex-wrap gap-x-4 gap-y-2">
          {["Aliens (1986)", "Event Horizon (1997)", "Annihilation (2018)", "SCP Foundation", "Kane Pixels", "GTFO", "Resident Evil 7", "Control", "STALKER", "The Magnus Archives"].map((ref) => (
            <span key={ref} className="text-[12px] text-foreground/20 font-light">
              {ref}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
