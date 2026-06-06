"use client";

import { useState } from "react";
import SectionHeader from "@/components/SectionHeader";
import { ChevronDown, ChevronRight } from "lucide-react";

const entityTiers = [
  {
    tier: "T-1",
    name: "Environmental",
    desc: "Environmental hazards. May be alive. Cannot be killed.",
    examples: ["The Hum", "Spatial distortions", "Reality fluctuations"],
  },
  {
    tier: "T-2",
    name: "Fauna",
    desc: "Animal-like. Can be avoided or destroyed.",
    examples: ["The Hound", "The Rattler", "The Lurker"],
  },
  {
    tier: "T-3",
    name: "Humanoid",
    desc: "Resembling humans. Unpredictable. Often intelligent. Extremely dangerous.",
    examples: ["The Smiler", "The Doppelganger", "The Pipe Crawler", "The Citizens"],
  },
  {
    tier: "T-4",
    name: "Apex",
    desc: "Rare, powerful. Define the level they inhabit.",
    examples: ["The Architect", "The Meeting"],
  },
  {
    tier: "T-X",
    name: "Transcendent",
    desc: "May not be entities at all. Possibly the Backrooms themselves.",
    examples: ["\"The Designer\""],
  },
];

const keyEntities = [
  { name: "The Lurker", tier: "T-2", level: "Level 0", desc: "Humanoid silhouette visible only in peripheral vision. Never approaches, never retreats.", threat: "Observation" },
  { name: "The Hound", tier: "T-2", level: "Level 0", desc: "Quadrupedal, elongated, skin resembling yellowed wallpaper. Hunts in explosive bursts. Photophobic.", threat: "Predatory" },
  { name: "The Smiler", tier: "T-3", level: "Level 1", desc: "Humanoid with impossibly wide grin. Photophobic. Extremely fast in darkness.", threat: "Predatory" },
  { name: "The Rattler", tier: "T-2/T-3", level: "Level 1", desc: "Metallic serpentine entity in pipes/vents. Territory-defensive.", threat: "Territorial" },
  { name: "The Pipe Crawler", tier: "T-3", level: "Level 2", desc: "Emaciated humanoid moving through pipes. Ambush predator.", threat: "Ambush" },
  { name: "The Drowned", tier: "T-2/T-3", level: "Level 2", desc: "Humanoid shapes fused to pipe walls. Reach for warmth.", threat: "Passive/Reactive" },
  { name: "The Doppelganger", tier: "T-3", level: "Level 4", desc: "Perfect visual and vocal mimicry of squad members. Creates paranoia.", threat: "Psychological" },
  { name: "The Meeting", tier: "T-4", level: "Level 4", desc: "A conference room that traps visitors in increasingly irrational scenarios.", threat: "Containment" },
  { name: "The Architect", tier: "T-4", level: "Level 11", desc: "Massive, never directly observed. Reshapes the city.", threat: "Environmental" },
  { name: "The Citizens", tier: "T-3", level: "Level 11", desc: "Humanoid shapes walking streets in patterns. Completely passive. Ignore everything.", threat: "None" },
  { name: "The Statue", tier: "T-3", level: "Level 11", desc: "2.5m tall, moves when unobserved. Direct SCP-173 reference.", threat: "Predatory" },
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

export default function LorePage() {
  const [openEntity, setOpenEntity] = useState<number | null>(null);

  return (
    <div className="px-6 md:px-12 lg:px-24 py-16 md:py-24">
      <SectionHeader
        code="05 / LORE"
        title="Lore & Entities"
        subtitle="The Backrooms are not a place — they are a spatial anomaly."
      />

      {/* The Backrooms */}
      <div className="mb-16">
        <h3 className="font-mono text-[10px] text-foreground/20 tracking-[0.2em] mb-4">THE BACKROOMS</h3>
        <p className="text-[13px] text-foreground/40 font-light leading-relaxed max-w-2xl mb-6">
          A seemingly infinite labyrinth of liminal spaces that exist adjacent to, beneath, or outside conventional reality.
          Entry is unplanned and exit is unguaranteed.
        </p>
        <div className="space-y-2">
          {[
            "Non-Euclidean Geometry — Two doors in the same room may lead to entirely different levels",
            "Temporal Instability — Time does not flow consistently between squad members",
            "The Hum — Omnipresent low-frequency ambient sound. Constant, sourceless, psychologically taxing",
            "Entity Presence — Populated by phenomena displaying awareness, agency, and variably hostility",
            "Level Structure — Organized into discrete 'Levels' with entrances, exits, entities, and properties",
            "Immune Response — The Backrooms behave like a body responding to infection",
          ].map((prop, i) => (
            <div key={i} className="flex items-start gap-3">
              <span className="text-foreground/10 mt-0.5 shrink-0">—</span>
              <span className="text-[12px] text-foreground/30 font-light">{prop}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Membrane Theory */}
      <div className="mb-16">
        <h3 className="font-mono text-[10px] text-foreground/20 tracking-[0.2em] mb-3">THE MEMBRANE THEORY</h3>
        <p className="text-[12px] text-foreground/30 font-light leading-relaxed max-w-2xl">
          Reality is a thin boundary separating &quot;here&quot; from &quot;elsewhere.&quot; The Backrooms are the absence of place — the architectural
          equivalent of the space between thoughts. When reality &quot;noclips,&quot; it does not transport matter — it reveals what was always underneath.
        </p>
      </div>

      {/* Async Technologies */}
      <div className="mb-16">
        <h3 className="font-mono text-[10px] text-foreground/20 tracking-[0.2em] mb-6">ASYNC TECHNOLOGIES</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-6">
          {[
            { label: "LEVELS", value: "47" },
            { label: "ENTITIES", value: "200+" },
            { label: "EXTRACTION", value: "3.7%" },
            { label: "CIVILIAN AVG", value: "72 hours" },
            { label: "MILITARY AVG", value: "14 days" },
            { label: "FOUNDED", value: "1978" },
          ].map((s) => (
            <div key={s.label}>
              <span className="font-mono text-[9px] text-foreground/15 tracking-[0.2em] block mb-1">{s.label}</span>
              <span className="text-xl font-light text-foreground/50">{s.value}</span>
            </div>
          ))}
        </div>
        <div>
          <span className="font-mono text-[9px] text-tactical-red/40 tracking-[0.2em] block mb-2">THE TRUTH</span>
          <p className="text-[12px] text-foreground/30 font-light leading-relaxed max-w-2xl">
            Async knew extraction was statistically improbable. The squad was sent to <strong className="text-foreground/50">stress-test the Threshold Theory</strong> —
            gathering data on whether sustained military engagement in deep levels would trigger measurable reality fluctuations.
            The soldiers are <strong className="text-foreground/50">sensors with guns</strong>.
          </p>
        </div>
      </div>

      {/* Entity Classification */}
      <div className="mb-16">
        <h3 className="font-mono text-[10px] text-foreground/20 tracking-[0.2em] mb-6">VOSS-CHEN CLASSIFICATION SYSTEM</h3>
        <div className="space-y-0">
          {entityTiers.map((tier) => (
            <div key={tier.tier} className="py-4 border-b border-foreground/[0.04]">
              <div className="flex items-baseline gap-4 mb-2">
                <span className="font-mono text-sm text-foreground/30 shrink-0">{tier.tier}</span>
                <span className="font-mono text-[10px] text-foreground/20 tracking-wider shrink-0">{tier.name}</span>
                <p className="text-[12px] text-foreground/30 font-light flex-1">{tier.desc}</p>
              </div>
              <div className="ml-12 flex flex-wrap gap-x-3 gap-y-1">
                {tier.examples.map((ex) => (
                  <span key={ex} className="text-[11px] text-foreground/15 font-light">{ex}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Key Entities */}
      <div className="mb-16">
        <h3 className="font-mono text-[10px] text-foreground/20 tracking-[0.2em] mb-6">KEY ENTITIES</h3>
        <div className="space-y-0">
          {keyEntities.map((entity, i) => (
            <div key={i} className="py-3 border-b border-foreground/[0.04]">
              <button
                onClick={() => setOpenEntity(openEntity === i ? null : i)}
                className="w-full text-left group"
              >
                <div className="flex items-baseline gap-3">
                  <span className="text-[13px] text-foreground/50 group-hover:text-foreground/70 transition-colors">{entity.name}</span>
                  <span className="font-mono text-[9px] text-foreground/15">{entity.tier}</span>
                  <span className="font-mono text-[9px] text-foreground/10">{entity.level}</span>
                  <span className="font-mono text-[9px] text-foreground/10 hidden md:inline">{entity.threat}</span>
                  {openEntity === i ? (
                    <ChevronDown size={12} className="text-foreground/10 ml-auto" />
                  ) : (
                    <ChevronRight size={12} className="text-foreground/10 ml-auto" />
                  )}
                </div>
                {openEntity !== i && (
                  <p className="text-[11px] text-foreground/20 font-light mt-1 truncate">{entity.desc}</p>
                )}
              </button>
              {openEntity === i && (
                <div className="mt-2 ml-4">
                  <p className="text-[12px] text-foreground/30 font-light leading-relaxed">{entity.desc}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Timeline */}
      <div className="mb-16">
        <h3 className="font-mono text-[10px] text-foreground/20 tracking-[0.2em] mb-6">HISTORICAL TIMELINE</h3>
        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-px bg-foreground/[0.06]" />
          <div className="space-y-4">
            {loreTimeline.map((t, i) => (
              <div key={i} className="flex items-start gap-4 pl-4">
                <div className="w-1.5 h-1.5 bg-foreground/15 rounded-full shrink-0 mt-1.5 relative z-10" />
                <div>
                  <span className="font-mono text-[10px] text-foreground/20 tracking-wider">{t.year}</span>
                  <p className="text-[12px] text-foreground/30 font-light mt-0.5">{t.event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Narrative foundations */}
      <div>
        <h3 className="font-mono text-[10px] text-foreground/20 tracking-[0.2em] mb-6">NARRATIVE FOUNDATIONS</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: "The Mission Was A Lie", desc: "Async knew extraction was impossible. The soldiers are test subjects." },
            { title: "The Backrooms Are Alive", desc: "The space responds, learns, adapts. It is a process, not a place." },
            { title: "Survival Is Not Victory", desc: "No triumphant ending. The best possible outcome is escape, and escape may not mean what the player thinks." },
          ].map((n, i) => (
            <div key={i}>
              <h4 className="text-[13px] font-medium text-foreground/50 mb-2">{n.title}</h4>
              <p className="text-[12px] text-foreground/25 font-light leading-relaxed">{n.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
