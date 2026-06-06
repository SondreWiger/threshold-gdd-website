"use client";

import { useState } from "react";
import SectionHeader from "@/components/SectionHeader";
import { ChevronDown, ChevronUp, AlertTriangle, Eye, Skull } from "lucide-react";

const entityTiers = [
  {
    tier: "T-1",
    name: "Environmental",
    desc: "Environmental hazards. May be alive. Cannot be killed.",
    examples: ["The Hum", "Spatial distortions", "Reality fluctuations"],
    color: "#7f8c8d",
    danger: "Passive",
  },
  {
    tier: "T-2",
    name: "Fauna",
    desc: "Animal-like. Can be avoided or destroyed.",
    examples: ["The Hound", "The Rattler", "The Lurker"],
    color: "#f39c12",
    danger: "Moderate",
  },
  {
    tier: "T-3",
    name: "Humanoid",
    desc: "Resembling humans. Unpredictable. Often intelligent. Extremely dangerous.",
    examples: ["The Smiler", "The Doppelganger", "The Pipe Crawler", "The Citizens"],
    color: "#e74c3c",
    danger: "High",
  },
  {
    tier: "T-4",
    name: "Apex",
    desc: "Rare, powerful. Define the level they inhabit.",
    examples: ["The Architect", "The Meeting"],
    color: "#8e44ad",
    danger: "Extreme",
  },
  {
    tier: "T-X",
    name: "Transcendent",
    desc: "May not be entities at all. Possibly the Backrooms themselves.",
    examples: ["\"The Designer\""],
    color: "#c0392b",
    danger: "Unknown",
  },
];

const keyEntities = [
  {
    name: "The Lurker",
    tier: "T-2",
    level: "Level 0",
    desc: "Humanoid silhouette visible only in peripheral vision. Never approaches, never retreats.",
    threat: "Observation",
    color: "#d4a017",
  },
  {
    name: "The Hound",
    tier: "T-2",
    level: "Level 0",
    desc: "Quadrupedal, elongated, skin resembling yellowed wallpaper. Hunts in explosive bursts. Photophobic.",
    threat: "Predatory",
    color: "#d4a017",
  },
  {
    name: "The Smiler",
    tier: "T-3",
    level: "Level 1",
    desc: "Humanoid with impossibly wide grin. Photophobic. Extremely fast in darkness.",
    threat: "Predatory",
    color: "#e67e22",
  },
  {
    name: "The Rattler",
    tier: "T-2/T-3",
    level: "Level 1",
    desc: "Metallic serpentine entity in pipes/vents. Territory-defensive.",
    threat: "Territorial",
    color: "#e67e22",
  },
  {
    name: "The Pipe Crawler",
    tier: "T-3",
    level: "Level 2",
    desc: "Emaciated humanoid moving through pipes. Ambush predator.",
    threat: "Ambush",
    color: "#c0392b",
  },
  {
    name: "The Drowned",
    tier: "T-2/T-3",
    level: "Level 2",
    desc: "Humanoid shapes fused to pipe walls. Reach for warmth.",
    threat: "Passive/Reactive",
    color: "#c0392b",
  },
  {
    name: "The Doppelganger",
    tier: "T-3",
    level: "Level 4",
    desc: "Perfect visual and vocal mimicry of squad members. Creates paranoia.",
    threat: "Psychological",
    color: "#2980b9",
  },
  {
    name: "The Meeting",
    tier: "T-4",
    level: "Level 4",
    desc: "A conference room that traps visitors in increasingly irrational scenarios.",
    threat: "Containment",
    color: "#2980b9",
  },
  {
    name: "The Architect",
    tier: "T-4",
    level: "Level 11",
    desc: "Massive, never directly observed. Reshapes the city.",
    threat: "Environmental",
    color: "#8e44ad",
  },
  {
    name: "The Citizens",
    tier: "T-3",
    level: "Level 11",
    desc: "Humanoid shapes walking streets in patterns. Completely passive. Ignore everything.",
    threat: "None",
    color: "#8e44ad",
  },
  {
    name: "The Statue",
    tier: "T-3",
    level: "Level 11",
    desc: "2.5m tall, moves when unobserved. Direct SCP-173 reference.",
    threat: "Predatory",
    color: "#8e44ad",
  },
];

const loreTimeline = [
  { year: "~4.5B years ago", event: "Backrooms already exist" },
  { year: "~1500 BCE", event: "Egyptian records of spatial anomalies" },
  { year: "1943", event: "Philadelphia Experiment" },
  { year: "1969", event: "Buzz Aldrin's private diary entry" },
  { year: "1978", event: "Async Research Collective founded by Dr. Elias Voss" },
  { year: "1983", event: "Incident 0 — Voss returns with physical samples" },
  { year: "1986", event: "Async Incorporated" },
  { year: "1988", event: "First deliberate noclip" },
  { year: "1992", event: "Discovery of Level 1" },
  { year: "1997", event: "\"Silent Spring\" — 23 personnel lost. Voss found dead in Level 4, aged 40 years" },
  { year: "1999", event: "Helena Voss takes CEO. Strategy shifts to containment." },
  { year: "2015", event: "Threshold Theory formally proposed" },
  { year: "2024", event: "Operation THRESHOLD approved" },
];

const asyncStats = {
  levelsConfirmed: 47,
  entityTypes: "200+",
  extractionRate: "3.7%",
  avgSurvivalCivilian: "72 hours",
  avgSurvivalMilitary: "14 days",
};

export default function LorePage() {
  const [openEntity, setOpenEntity] = useState<number | null>(null);

  return (
    <div className="px-6 md:px-16 lg:px-24 py-16 md:py-24">
      <SectionHeader
        code="05"
        title="LORE & ENTITIES"
        subtitle="The Backrooms are not a place — they are a spatial anomaly."
      />

      {/* The Backrooms */}
      <div className="bg-steel-dark/30 border border-amber/10 p-6 mb-8 corner-brackets">
        <h3 className="font-mono text-xs text-amber-dim tracking-[0.2em] mb-4">THE BACKROOMS</h3>
        <p className="text-sm text-foreground/80 leading-relaxed mb-4">
          A seemingly infinite labyrinth of liminal spaces that exist adjacent to, beneath, or outside conventional reality.
          Entry is unplanned and exit is unguaranteed.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {[
            "Non-Euclidean Geometry — Two doors in the same room may lead to entirely different levels",
            "Temporal Instability — Time does not flow consistently between squad members",
            "The Hum — Omnipresent low-frequency ambient sound. Constant, sourceless, psychologically taxing",
            "Entity Presence — Populated by phenomena displaying awareness, agency, and variably hostility",
            "Level Structure — Organized into discrete 'Levels' with entrances, exits, entities, and properties",
            "Immune Response — The Backrooms behave like a body responding to infection",
          ].map((prop, i) => (
            <div key={i} className="flex items-start gap-2 text-xs text-foreground/70">
              <span className="text-amber-dim/40 mt-0.5">▸</span>
              {prop}
            </div>
          ))}
        </div>
      </div>

      {/* Membrane Theory */}
      <div className="bg-steel-dark/30 border border-amber/10 p-5 mb-8">
        <h3 className="font-mono text-xs text-amber-dim tracking-[0.2em] mb-3">THE MEMBRANE THEORY</h3>
        <p className="text-xs text-foreground/70 leading-relaxed">
          Reality is a thin boundary separating &quot;here&quot; from &quot;elsewhere.&quot; The Backrooms are the absence of place — the architectural
          equivalent of the space between thoughts. When reality &quot;noclips,&quot; it does not transport matter — it reveals what was always underneath.
        </p>
      </div>

      {/* Async Technologies */}
      <div className="mb-8">
        <h3 className="font-mono text-xs text-amber-dim tracking-[0.2em] mb-4">ASYNC TECHNOLOGIES</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-4">
          {[
            { label: "LEVELS", value: asyncStats.levelsConfirmed },
            { label: "ENTITIES", value: asyncStats.entityTypes },
            { label: "EXTRACTION", value: asyncStats.extractionRate },
            { label: "CIVILIAN AVG", value: asyncStats.avgSurvivalCivilian },
            { label: "MILITARY AVG", value: asyncStats.avgSurvivalMilitary },
            { label: "FOUNDED", value: "1978" },
          ].map((s) => (
            <div key={s.label} className="bg-steel-dark/30 border border-steel-light/10 p-3 corner-brackets">
              <span className="data-label block mb-1">{s.label}</span>
              <span className="font-mono text-lg font-bold text-amber">{s.value}</span>
            </div>
          ))}
        </div>
        <div className="bg-steel-dark/30 border border-tactical-red/10 p-4">
          <span className="data-label block mb-1 text-tactical-red">THE TRUTH</span>
          <p className="text-xs text-foreground/70 leading-relaxed">
            Async knew extraction was statistically improbable. The squad was sent to <strong>stress-test the Threshold Theory</strong> —
            gathering data on whether sustained military engagement in deep levels would trigger measurable reality fluctuations.
            The soldiers are <strong>sensors with guns</strong>.
          </p>
        </div>
      </div>

      {/* Entity Classification */}
      <div className="mb-8">
        <h3 className="font-mono text-xs text-amber-dim tracking-[0.2em] mb-4">VOSS-CHEN CLASSIFICATION SYSTEM</h3>
        <div className="space-y-2">
          {entityTiers.map((tier) => (
            <div key={tier.tier} className="bg-steel-dark/30 border p-4" style={{ borderColor: `${tier.color}20` }}>
              <div className="flex items-center gap-4">
                <div className="w-12 shrink-0">
                  <span className="font-mono text-sm font-bold" style={{ color: tier.color }}>{tier.tier}</span>
                </div>
                <div className="w-24 shrink-0">
                  <span className="font-mono text-[10px] tracking-wider" style={{ color: tier.color }}>{tier.name.toUpperCase()}</span>
                </div>
                <div className="flex-1">
                  <p className="text-xs text-foreground/70">{tier.desc}</p>
                </div>
                <div className="hidden md:block w-20 shrink-0">
                  <span className="font-mono text-[9px] text-steel-light/50">{tier.danger}</span>
                </div>
              </div>
              <div className="mt-2 ml-16 flex flex-wrap gap-1.5">
                {tier.examples.map((ex) => (
                  <span key={ex} className="px-2 py-0.5 bg-steel-dark/50 border border-steel-light/10 font-mono text-[9px] text-steel-light/50">
                    {ex}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Key Entities */}
      <div className="mb-8">
        <h3 className="font-mono text-xs text-amber-dim tracking-[0.2em] mb-4">KEY ENTITIES</h3>
        <div className="space-y-2">
          {keyEntities.map((entity, i) => (
            <div
              key={i}
              className="border card-hover cursor-pointer"
              style={{ borderColor: `${entity.color}20` }}
              onClick={() => setOpenEntity(openEntity === i ? null : i)}
            >
              <div className="flex items-center gap-4 p-4">
                <div className="w-10 h-10 flex items-center justify-center shrink-0 border" style={{ borderColor: `${entity.color}30` }}>
                  <Skull size={14} style={{ color: entity.color }} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <h4 className="font-mono text-xs tracking-wider text-foreground">{entity.name}</h4>
                    <span className="font-mono text-[9px] px-1.5 py-0.5" style={{ background: `${entity.color}15`, color: entity.color }}>
                      {entity.tier}
                    </span>
                    <span className="font-mono text-[9px] text-steel-light/40">{entity.level}</span>
                  </div>
                  <p className="text-[11px] text-steel-light/60 truncate">{entity.desc}</p>
                </div>
                <span className="font-mono text-[9px] text-steel-light/40 shrink-0 hidden md:block">{entity.threat}</span>
                <span className="text-steel-light/30">
                  {openEntity === i ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                </span>
              </div>
              {openEntity === i && (
                <div className="px-4 pb-4 border-t" style={{ borderColor: `${entity.color}10` }}>
                  <div className="pt-3">
                    <p className="text-xs text-foreground/70 leading-relaxed">{entity.desc}</p>
                    <div className="mt-2 flex items-center gap-2">
                      <AlertTriangle size={10} className="text-amber-dim" />
                      <span className="font-mono text-[9px] text-amber-dim">THREAT LEVEL: {entity.threat.toUpperCase()}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Timeline */}
      <div className="mb-8">
        <h3 className="font-mono text-xs text-amber-dim tracking-[0.2em] mb-4">HISTORICAL TIMELINE</h3>
        <div className="relative">
          <div className="absolute left-4 top-0 bottom-0 w-px bg-amber/10" />
          <div className="space-y-3">
            {loreTimeline.map((t, i) => (
              <div key={i} className="flex items-start gap-4 pl-4">
                <div className="w-2 h-2 bg-amber/30 rounded-full shrink-0 mt-1.5 relative z-10" />
                <div>
                  <span className="font-mono text-[10px] text-amber-dim tracking-wider">{t.year}</span>
                  <p className="text-xs text-foreground/70 mt-0.5">{t.event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Narrative foundations */}
      <div>
        <h3 className="font-mono text-xs text-amber-dim tracking-[0.2em] mb-4">NARRATIVE FOUNDATIONS</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { title: "The Mission Was A Lie", desc: "Async knew extraction was impossible. The soldiers are test subjects." },
            { title: "The Backrooms Are Alive", desc: "The space responds, learns, adapts. It is a process, not a place." },
            { title: "Survival Is Not Victory", desc: "No triumphant ending. The best possible outcome is escape, and escape may not mean what the player thinks." },
          ].map((n, i) => (
            <div key={i} className="bg-steel-dark/30 border border-tactical-red/10 p-5">
              <h4 className="font-mono text-xs tracking-wider text-tactical-red mb-2">{n.title.toUpperCase()}</h4>
              <p className="text-xs text-foreground/70 leading-relaxed">{n.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
