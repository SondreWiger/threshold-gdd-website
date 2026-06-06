"use client";

import { useState } from "react";
import Link from "next/link";
import SectionHeader from "@/components/SectionHeader";
import DataCard from "@/components/DataCard";

const systems = [
  {
    id: "combat",
    title: "TACTICAL COMBAT",
    icon: "///",
    desc: "Realistic ballistics, limited ammunition, squad-based tactics. Every bullet counts.",
    details: [
      { label: "Weapon Handling", desc: "Realistic recoil, sway, and environmental interaction. Weapons degrade and can jam under stress." },
      { label: "Ammunition", desc: "Severely limited. Players must scavenge, craft, and conserve. Running dry means melee or running." },
      { label: "Squad Commands", desc: "Context-sensitive orders: hold, push, flank, suppress, fall back. Squad responds to tone of voice." },
      { label: "Cover System", desc: "Dynamic cover that can be destroyed. The Backrooms itself becomes cover — or a trap." },
    ],
    relatedCharacters: "/characters",
    relatedLevels: "/levels",
  },
  {
    id: "horror",
    title: "SURVIVAL HORROR",
    icon: "///",
    desc: "Resource scarcity, psychological stress, and the constant threat of the unknown.",
    details: [
      { label: "Stress System", desc: "Each operative has a psychological stress meter. High stress causes hallucinations, slower reactions, and involuntary vocalizations." },
      { label: "Entity Behavior", desc: "Entities follow unpredictable patterns. Some hunt by sound, others by sight, some by thought patterns." },
      { label: "Environmental Hazards", desc: "Flooding, gas leaks, structural collapse, spatial anomalies. The environment is as dangerous as the entities." },
      { label: "Fear Responses", desc: "Characters exhibit realistic fear responses — trembling, rapid breathing, inability to aim. Some freeze. Some run." },
    ],
    relatedCharacters: "/characters",
    relatedLevels: "/levels",
  },
  {
    id: "coop",
    title: "COOPERATIVE PLAY",
    icon: "///",
    desc: "4-player campaign. Communication is your lifeline — and your vulnerability.",
    details: [
      { label: "Distributed Knowledge", desc: "Each player sees different information. One player's map doesn't match another's. Sharing intel is critical." },
      { label: "Communication Degradation", desc: "Radio static increases near entities. At worst, players hear distorted versions of each other's voices." },
      { label: "Split Paths", desc: "Level design forces temporary separation. Players must coordinate across impossible distances." },
      { label: "Shared Stress", desc: "One player's panic can trigger others'. Squad cohesion affects everyone's sanity meter." },
    ],
    relatedCharacters: "/characters",
    relatedLevels: "/levels",
  },
  {
    id: "progression",
    title: "PROGRESSION",
    icon: "///",
    desc: "No XP or levels. Progression is knowledge, equipment, and squad trust.",
    details: [
      { label: "Knowledge-Based", desc: "Players learn entity behavior patterns, environmental rules, and shortcut locations through exploration." },
      { label: "Equipment Scavenging", desc: "Gear is found, not crafted. Higher-tier equipment appears in more dangerous areas." },
      { label: "Squad Trust", desc: "Decisions affect team morale. Consistent leadership builds trust, which unlocks new dialogue and tactical options." },
      { label: "No Grinding", desc: "There is no experience to farm. Every playthrough progresses the story forward." },
    ],
    relatedCharacters: "/characters",
    relatedTimeline: "/timeline",
  },
];

export default function GameplayPage() {
  const [activeSystem, setActiveSystem] = useState(0);

  return (
    <div className="px-6 md:px-12 lg:px-24 py-16 md:py-24">
      <SectionHeader
        code="04 / GAMEPLAY"
        title="Systems & Mechanics"
        subtitle="Tactical combat meets survival-horror. Every system serves the tonal shift."
      />

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-x-8 gap-y-6 mb-20">
        <DataCard label="Combat" value="TACTICAL" sub="Realistic ballistics" />
        <DataCard label="Horror" value="PSYCHO" sub="Stress-driven fear" />
        <DataCard label="Co-op" value="1–4" sub="Distributed knowledge" />
        <DataCard label="Progression" value="NONE" sub="Knowledge-based" />
        <DataCard label="Difficulty" value="HIGH" sub="No easy mode" />
        <DataCard label="Replay" value="HIGH" sub="Procedural elements" />
      </div>

      {/* System Tabs */}
      <div className="flex gap-6 mb-12 border-b border-foreground/[0.12]">
        {systems.map((sys, i) => (
          <button
            key={sys.id}
            onClick={() => setActiveSystem(i)}
            className={`pb-3 font-mono text-[10px] tracking-[0.15em] transition-colors ${
              activeSystem === i
                ? "text-amber/75 border-b border-amber/40"
                : "text-foreground/65 hover:text-foreground/65"
            }`}
          >
            {sys.title}
          </button>
        ))}
      </div>

      {/* Active System Detail */}
      <div className="mb-20">
        <div className="mb-6">
          <h3 className="text-[18px] font-light text-foreground/95 mb-2">{systems[activeSystem].title}</h3>
          <p className="text-[14px] text-foreground/55 font-light">{systems[activeSystem].desc}</p>
        </div>

        <div className="space-y-0">
          {systems[activeSystem].details.map((d, i) => (
            <div key={i} className="py-5 border-b border-foreground/[0.08]">
              <h4 className="text-[13px] font-medium text-foreground/75 mb-1">{d.label}</h4>
              <p className="text-[13px] text-foreground/75 font-light leading-relaxed max-w-2xl">{d.desc}</p>
            </div>
          ))}
        </div>

        <div className="flex gap-4 mt-6">
          {systems[activeSystem].relatedCharacters && (
            <Link href={systems[activeSystem].relatedCharacters} className="font-mono text-[9px] text-foreground/55 hover:text-amber/55 transition-colors tracking-wider">
              SQUAD MEMBERS &rarr;
            </Link>
          )}
          {systems[activeSystem].relatedLevels && (
            <Link href={systems[activeSystem].relatedLevels} className="font-mono text-[9px] text-foreground/55 hover:text-amber/55 transition-colors tracking-wider">
              LEVEL DESIGN &rarr;
            </Link>
          )}
          {systems[activeSystem].relatedTimeline && (
            <Link href={systems[activeSystem].relatedTimeline} className="font-mono text-[9px] text-foreground/55 hover:text-amber/55 transition-colors tracking-wider">
              PRODUCTION TIMELINE &rarr;
            </Link>
          )}
        </div>
      </div>

      {/* Equipment Tiers Visual */}
      <div className="mb-20">
        <h3 className="font-mono text-[10px] text-foreground/65 tracking-[0.2em] mb-6">EQUIPMENT TIERS</h3>
        <div className="space-y-3">
          {[
            { tier: "TIER 1", name: "Standard Issue", items: "Pistol, flashlight, radio", bar: 20 },
            { tier: "TIER 2", name: "Tactical", items: "SMG, flares, medkit", bar: 40 },
            { tier: "TIER 3", name: "Specialized", items: "Shotgun, motion tracker, first aid", bar: 60 },
            { tier: "TIER 4", name: "Experimental", items: "Prototype weapons, EMP, stress inhibitors", bar: 80 },
            { tier: "TIER 5", name: "Anomalous", items: "Reality-anchored gear, entity tech", bar: 100 },
          ].map((t, i) => (
            <div key={i} className="flex items-center gap-4">
              <span className="font-mono text-[9px] text-amber/45 w-14 shrink-0">{t.tier}</span>
              <div className="flex-1">
                <div className="flex items-baseline justify-between mb-1">
                  <span className="text-[12px] text-foreground/85 font-light">{t.name}</span>
                  <span className="font-mono text-[9px] text-foreground/75">{t.items}</span>
                </div>
                <div className="h-[2px] bg-foreground/[0.08] overflow-hidden">
                  <div className="h-full bg-amber/40" style={{ width: `${t.bar}%` }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Cross-links */}
      <div className="mt-16 pt-8 border-t border-foreground/[0.12]">
        <div className="flex flex-wrap gap-6">
          <Link href="/characters" className="font-mono text-[10px] text-foreground/55 hover:text-amber/50 transition-colors tracking-wider">
            MEET THE SQUAD &rarr;
          </Link>
          <Link href="/levels" className="font-mono text-[10px] text-foreground/55 hover:text-amber/50 transition-colors tracking-wider">
            EXPLORE THE LEVELS &rarr;
          </Link>
          <Link href="/lore" className="font-mono text-[10px] text-foreground/55 hover:text-amber/50 transition-colors tracking-wider">
            THE LORE &rarr;
          </Link>
          <Link href="/technical" className="font-mono text-[10px] text-foreground/55 hover:text-amber/50 transition-colors tracking-wider">
            TECHNICAL SPECS &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}
