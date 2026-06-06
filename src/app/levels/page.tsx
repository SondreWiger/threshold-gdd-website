"use client";

import { useState } from "react";
import Link from "next/link";
import SectionHeader from "@/components/SectionHeader";
import DataCard from "@/components/DataCard";

const levels = [
  {
    name: "THE ENTRY POINT",
    subtitle: "The Office Complex",
    type: "TUTORIAL / ESTABLISHING",
    threat: "LOW",
    threatColor: "text-foreground/15",
    geometry: "Normal",
    duration: "2–3 hours",
    desc: "An infinite expanse of fluorescent-lit office hallways. Standardized cubicles stretch to every horizon. Fluorescent lights buzz with a frequency that creates a persistent migraine. The geometry is maddeningly regular.",
    threats: ["Skin-Stealers (first encounter)", "Spatial disorientation", "Audio hallucinations"],
    mechanic: "Teaches navigation, communication, and entity behavior in a controlled environment.",
    visual: "████████████░░░░░░░░ 60% Normal",
    relatedCharacters: "/characters",
    relatedLore: "/lore",
  },
  {
    name: "THE INDUSTRIAL DEPTHS",
    subtitle: "The Machine Level",
    type: "ESCALATION",
    threat: "MEDIUM",
    threatColor: "text-amber/40",
    geometry: "Semi-distorted",
    duration: "3–4 hours",
    desc: "Massive industrial spaces housing machinery of unknown purpose. Conveyor belts move through walls into darkness. Steam vents create sound patterns that almost resemble speech.",
    threats: ["Hounds (pack hunters)", "Graspers", "Environmental hazards"],
    mechanic: "Introduces survival mechanics — limited ammunition, crafting, and squad stress management.",
    visual: "████████████████░░░░ 80% Distorted",
    relatedCharacters: "/characters",
    relatedGameplay: "/gameplay",
  },
  {
    name: "THE RESIDENTIAL ZONE",
    subtitle: "The Mimic Level",
    type: "PSYCHOLOGICAL HORROR",
    threat: "HIGH",
    threatColor: "text-amber/60",
    geometry: "Actively warping",
    duration: "3–4 hours",
    desc: "Endless rows of suburban homes from different decades. Some interiors are from the squad's actual memories. The Backrooms is trying to understand them.",
    threats: ["Doppelgangers (perfect mimics)", "Memory corruption", "Reality distortion"],
    mechanic: "Psychological stress peaks. Teammates begin questioning each other's authenticity.",
    visual: "████████████████████ 100% Warped",
    relatedCharacters: "/characters",
    relatedLore: "/lore",
  },
  {
    name: "THE OUTPOST",
    subtitle: "Async Forward Operating Base",
    type: "NARRATIVE HUB",
    threat: "VARIES",
    threatColor: "text-foreground/15",
    geometry: "Mixed",
    duration: "2–3 hours",
    desc: "A partially corrupted Async Technologies research station. Contains equipment caches, recorded logs from previous expeditions, and the remnants of a previous squad that didn't make it out.",
    threats: ["Corrupted research logs", "Previous expedition remnants", "Entity incursions"],
    mechanic: "Safe(r) zone for resupply, story progression, and squad bonding before the final push.",
    visual: "██████████░░░░░░░░░░ 50% Stabilized",
    relatedLore: "/lore",
    relatedCharacters: "/characters",
  },
  {
    name: "THE THRESHOLD ZONE",
    subtitle: "The Deep Levels",
    type: "CLIMAX",
    threat: "EXTREME",
    threatColor: "text-red-500/50",
    geometry: "Fully impossible",
    duration: "4–6 hours",
    desc: "The deepest known point of the Backrooms. Gravity is optional. Time moves in spirals. The exit is theoretically accessible, but reaching it requires navigating geometry that actively resists comprehension.",
    threats: ["All entity types", "Full environmental hostility", "Squad psychological collapse risk"],
    mechanic: "Everything learned is tested. No new mechanics — only mastery of existing systems under extreme pressure.",
    visual: "████████████████████ 100%+ Impossible",
    relatedGameplay: "/gameplay",
    relatedCharacters: "/characters",
  },
];

export default function LevelsPage() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div className="px-6 md:px-12 lg:px-24 py-16 md:py-24">
      <SectionHeader
        code="03 / LEVELS"
        title="Level Architecture"
        subtitle="Five distinct environments — each escalating physical and psychological threat"
      />

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-x-8 gap-y-6 mb-20">
        <DataCard label="Levels" value="5" sub="Distinct environments" />
        <DataCard label="Campaign" value="14–20H" sub="Full playthrough" />
        <DataCard label="Geometry" value="5" sub="Distortion types" />
        <DataCard label="Entities" value="200+" sub="Per level scaling" />
        <DataCard label="Secrets" value="50+" sub="Hidden areas" />
        <DataCard label="Replayability" value="HIGH" sub="Procedural elements" />
      </div>

      {/* Level List */}
      <div className="space-y-0 mb-16">
        {levels.map((level, i) => (
          <div
            key={i}
            className="py-6 border-b border-foreground/[0.04] cursor-pointer group"
            onClick={() => setSelected(selected === i ? null : i)}
          >
            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6">
              <div className="flex-1">
                <div className="flex items-baseline gap-3 mb-1">
                  <span className="font-mono text-[10px] text-foreground/10">LVL {i + 1}</span>
                  <h3 className="text-[14px] font-medium text-foreground/70 group-hover:text-amber/70 transition-colors">
                    {level.name}
                  </h3>
                  <span className="font-mono text-[9px] text-foreground/10 tracking-wider">{level.type}</span>
                </div>
                <p className="text-[13px] text-foreground/25 font-light">{level.subtitle}</p>
              </div>

              <div className="flex items-center gap-6 shrink-0">
                <div className="text-right">
                  <span className="font-mono text-[8px] text-foreground/15 tracking-wider block">THREAT</span>
                  <span className={`font-mono text-[10px] ${level.threatColor}`}>{level.threat}</span>
                </div>
                <div className="text-right">
                  <span className="font-mono text-[8px] text-foreground/15 tracking-wider block">TIME</span>
                  <span className="font-mono text-[10px] text-foreground/20">{level.duration}</span>
                </div>
                <span className="font-mono text-[10px] text-foreground/10 group-hover:text-amber/30 transition-colors">
                  {selected === i ? "−" : "+"}
                </span>
              </div>
            </div>

            {/* Expanded Detail */}
            {selected === i && (
              <div className="mt-4 pt-4 border-t border-foreground/[0.04]">
                <p className="text-[13px] text-foreground/35 font-light leading-relaxed mb-4 max-w-2xl">
                  {level.desc}
                </p>

                {/* Visual distortion bar */}
                <div className="mb-4">
                  <span className="font-mono text-[8px] text-foreground/15 tracking-wider block mb-1">GEOMETRY DISTORTION</span>
                  <div className="font-mono text-[10px] text-amber/30 tracking-wider">{level.visual}</div>
                </div>

                {/* Threats */}
                <div className="mb-4">
                  <span className="font-mono text-[8px] text-foreground/15 tracking-wider block mb-2">PRIMARY THREATS</span>
                  <div className="flex flex-wrap gap-2">
                    {level.threats.map((t, j) => (
                      <span key={j} className="text-[11px] text-foreground/25 font-light px-2 py-0.5 bg-foreground/[0.02]">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <p className="text-[12px] text-foreground/20 font-light italic mb-3">{level.mechanic}</p>

                <div className="flex gap-4">
                  {level.relatedCharacters && (
                    <Link href={level.relatedCharacters} className="font-mono text-[9px] text-foreground/15 hover:text-amber/40 transition-colors tracking-wider">
                      SQUAD &rarr;
                    </Link>
                  )}
                  {level.relatedLore && (
                    <Link href={level.relatedLore} className="font-mono text-[9px] text-foreground/15 hover:text-amber/40 transition-colors tracking-wider">
                      LORE &rarr;
                    </Link>
                  )}
                  {level.relatedGameplay && (
                    <Link href={level.relatedGameplay} className="font-mono text-[9px] text-foreground/15 hover:text-amber/40 transition-colors tracking-wider">
                      SYSTEMS &rarr;
                    </Link>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Level Progression Visual */}
      <div className="mb-20">
        <h3 className="font-mono text-[10px] text-foreground/20 tracking-[0.2em] mb-6">LEVEL PROGRESSION</h3>
        <div className="space-y-3">
          {levels.map((level, i) => (
            <div key={i} className="flex items-center gap-4">
              <span className="font-mono text-[9px] text-foreground/10 w-12 shrink-0">LVL {i + 1}</span>
              <div className="flex-1 h-[3px] bg-foreground/[0.04] overflow-hidden">
                <div
                  className="h-full bg-amber/20 transition-all duration-500"
                  style={{ width: `${20 + i * 20}%` }}
                />
              </div>
              <span className="font-mono text-[9px] text-foreground/15 w-16 text-right shrink-0">{level.duration}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Threat Scale */}
      <div className="mb-20">
        <h3 className="font-mono text-[10px] text-foreground/20 tracking-[0.2em] mb-6">THREAT SCALE</h3>
        <div className="grid grid-cols-5 gap-2">
          {["LOW", "MEDIUM", "HIGH", "EXTREME", "LETHAL"].map((t, i) => (
            <div key={t} className="text-center py-3 bg-foreground/[0.02]">
              <span className={`font-mono text-[9px] tracking-wider ${
                i < 2 ? "text-foreground/20" :
                i < 3 ? "text-amber/30" :
                i < 4 ? "text-amber/50" :
                "text-red-400/40"
              }`}>
                {t}
              </span>
              <div className="mt-2 h-[2px] bg-foreground/[0.04] overflow-hidden mx-2">
                <div className="h-full bg-amber/20" style={{ width: `${(i + 1) * 20}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Cross-links */}
      <div className="mt-16 pt-8 border-t border-foreground/[0.06]">
        <div className="flex flex-wrap gap-6">
          <Link href="/characters" className="font-mono text-[10px] text-foreground/15 hover:text-amber/50 transition-colors tracking-wider">
            MEET THE SQUAD &rarr;
          </Link>
          <Link href="/lore" className="font-mono text-[10px] text-foreground/15 hover:text-amber/50 transition-colors tracking-wider">
            BACKROOMS LORE &rarr;
          </Link>
          <Link href="/gameplay" className="font-mono text-[10px] text-foreground/15 hover:text-amber/50 transition-colors tracking-wider">
            GAMEPLAY SYSTEMS &rarr;
          </Link>
          <Link href="/maps" className="font-mono text-[10px] text-foreground/15 hover:text-amber/50 transition-colors tracking-wider">
            LEVEL MAPS &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}
