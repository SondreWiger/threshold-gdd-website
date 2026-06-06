"use client";

import SectionHeader from "@/components/SectionHeader";
import DataCard from "@/components/DataCard";
import { Target, Users, Map, Clock, DollarSign, Monitor } from "lucide-react";

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

const audience = [
  {
    tier: "PRIMARY",
    age: "18-35",
    desc: "Players of Ready or Not, GTFO, Escape from Tarkov, Resident Evil, Silent Hill who want tactical gunplay with horror tension.",
  },
  {
    tier: "SECONDARY",
    age: "16-30",
    desc: "The liminal space / Backrooms community — fans of Kane Pixels, analog horror, liminal space photography.",
  },
  {
    tier: "TERTIARY",
    age: "18-40",
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
    <div className="px-6 md:px-16 lg:px-24 py-16 md:py-24">
      <SectionHeader
        code="01"
        title="PROJECT OVERVIEW"
        subtitle="Squad-based tactical survival-horror FPS developed by Northem Developments"
      />

      {/* Key stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-16">
        <DataCard label="Engine" value="UE5" sub="Unreal Engine 5.4+" icon={<Monitor size={14} />} />
        <DataCard label="Developer" value="Northem" sub="Northem Developments" icon={<Target size={14} />} />
        <DataCard label="Players" value="1-4" sub="Campaign + Co-op" icon={<Users size={14} />} />
        <DataCard label="Platforms" value="3" sub="PC, PS5, Xbox" icon={<Monitor size={14} />} />
        <DataCard label="Timeline" value="18mo" sub="Development cycle" icon={<Clock size={14} />} />
        <DataCard label="Price" value="$49" sub="Premium, no MTX" icon={<DollarSign size={14} />} />
      </div>

      {/* Overview sections */}
      <div className="space-y-8 mb-16">
        {overviewSections.map((section, i) => (
          <div key={i} className="bg-steel-dark/30 border border-steel-light/10 p-6 corner-brackets">
            <h3 className="font-mono text-xs text-amber-dim tracking-[0.2em] mb-3">{section.title.toUpperCase()}</h3>
            <p className="text-sm text-foreground/80 leading-relaxed">{section.content}</p>
          </div>
        ))}
      </div>

      {/* USPs */}
      <div className="mb-16">
        <h3 className="font-mono text-xs text-amber-dim tracking-[0.2em] mb-6">UNIQUE SELLING POINTS</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { num: "01", title: "Tonal Shift Gameplay", desc: "The only tactical shooter that becomes a survival-horror game while you are playing it. Not two modes — one seamless transformation." },
            { num: "02", title: "The Backrooms as Military Sci-Fi", desc: "Brings corporate-military conspiracy, structured lore, and squad dynamics to the liminal space phenomenon." },
            { num: "03", title: "Adaptive Squad AI", desc: "Teammates that learn from player tactics, develop visible stress responses, and can psychologically break under sustained horror exposure." },
            { num: "04", title: "Reality-Bending Environments", desc: "Procedural environmental distortion using UE5 — corridors stretch, rooms rearrange, and distance becomes meaningless." },
            { num: "05", title: "True Cooperative Horror", desc: "Co-op where player communication degrades as in-game communications equipment fails, creating real isolation between players." },
          ].map((usp) => (
            <div key={usp.num} className="flex gap-4 bg-steel-dark/20 border border-steel-light/10 p-4 card-hover">
              <span className="font-mono text-2xl font-bold text-amber/20">{usp.num}</span>
              <div>
                <h4 className="font-mono text-xs tracking-wider text-foreground mb-1">{usp.title}</h4>
                <p className="text-xs text-steel-light/70 leading-relaxed">{usp.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Audience */}
      <div className="mb-16">
        <h3 className="font-mono text-xs text-amber-dim tracking-[0.2em] mb-6">TARGET AUDIENCE</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {audience.map((a) => (
            <div key={a.tier} className="bg-steel-dark/30 border border-amber/10 p-5">
              <div className="flex items-center gap-2 mb-3">
                <span className="data-label">{a.tier}</span>
                <span className="font-mono text-[10px] text-amber/40">AGE {a.age}</span>
              </div>
              <p className="text-xs text-foreground/70 leading-relaxed">{a.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Risk Assessment */}
      <div className="mb-16">
        <h3 className="font-mono text-xs text-amber-dim tracking-[0.2em] mb-6">RISK ASSESSMENT</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-steel-light/20">
                <th className="text-left font-mono text-[10px] text-amber-dim tracking-wider py-2 pr-4">RISK</th>
                <th className="text-left font-mono text-[10px] text-amber-dim tracking-wider py-2 pr-4">PROBABILITY</th>
                <th className="text-left font-mono text-[10px] text-amber-dim tracking-wider py-2">MITIGATION</th>
              </tr>
            </thead>
            <tbody>
              {risks.map((r, i) => (
                <tr key={i} className="border-b border-steel-light/5">
                  <td className="py-3 pr-4 text-foreground/70">{r.risk}</td>
                  <td className="py-3 pr-4">
                    <span className={`font-mono text-[10px] px-2 py-0.5 ${
                      r.prob === "HIGH" ? "bg-tactical-red/20 text-tactical-red" :
                      r.prob === "MEDIUM" ? "bg-warning/20 text-warning" :
                      "bg-tactical-green/20 text-tactical-green"
                    }`}>
                      {r.prob}
                    </span>
                  </td>
                  <td className="py-3 text-steel-light/60">{r.mitigation}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Inspirations */}
      <div>
        <h3 className="font-mono text-xs text-amber-dim tracking-[0.2em] mb-6">REFERENCE WORKS</h3>
        <div className="flex flex-wrap gap-2">
          {["Aliens (1986)", "Event Horizon (1997)", "Annihilation (2018)", "SCP Foundation", "Kane Pixels", "GTFO", "Resident Evil 7", "Control", "STALKER", "The Magnus Archives"].map((ref) => (
            <span key={ref} className="px-3 py-1 bg-steel-dark/50 border border-steel-light/10 font-mono text-[10px] text-steel-light/70">
              {ref}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
