"use client";

import { useState } from "react";
import SectionHeader from "@/components/SectionHeader";
import { ChevronDown, ChevronRight } from "lucide-react";

const levels = [
  {
    id: "0",
    name: "The Lobby",
    subtitle: "The Breach",
    duration: "60–90 min",
    difficulty: "Low",
    color: "#d4a017",
    environment: "Mono-yellow wallpaper, moist carpet, fluorescent lighting",
    tone: "Confident, tactical, slightly uncanny",
    description: "Tutorial/Tactical Intro. The squad enters the Backrooms with full confidence. Movement is crisp, weapons are powerful, squad AI is responsive. The first signs of wrongness appear at the edges.",
    encounters: [
      "First Lurker sighting (peripheral vision only)",
      "First Hound encounter in the Atrium (combat tutorial)",
      "Hound pack encounter",
      "Smiler introduction in dark corridor",
      "Extraction failure discovery",
    ],
    scripted: [
      "Opening cinematic — military transport to yellow wall",
      "The 'first wrongness' — Lurker silhouette",
      "Kade counting flights: 'I counted four flights down. But the door says Level One.'",
      "Extraction point discovery with dead Async specialist",
      "Radio death",
    ],
    tacticalStatus: "Full functionality. Squad responsive. Comms clear.",
    keyDesign: "Open, navigable spaces. Warm yellow palette. Confidence before the fall.",
  },
  {
    id: "1",
    name: "Habitable Zone",
    subtitle: "Reality Check",
    duration: "90–120 min",
    difficulty: "Medium",
    color: "#e67e22",
    environment: "Industrial warehouse spaces, concrete, metal shelving",
    tone: "Unease, first real threats",
    description: "Industrial Horror. The environment becomes hostile. Equipment fails, the Survivor reveals the 3.7% statistic, and Dr. Thorne begins to crack.",
    encounters: [
      "Rattler in elevator shaft",
      "Power restoration puzzle (fuse boxes + hacking)",
      "The Survivor encounter (human(?) who reveals the 3.7% statistic, walks through a wall)",
      "Adult Rattler in Boiler Room",
      "Smiler combat with light management",
      "Equipment failure (blackout + Reyes displacement)",
      "Thorne's partial confession",
    ],
    scripted: [
      "90-second elevator descent with scratching sounds",
      "The Survivor's prophecy about Thorne",
      "Reyes's temporal displacement (60 seconds in Level 0 during blackout)",
      "Dr. Voss's carving: 'I'm sorry. I thought I could control it.'",
      "Descent to Level 2 through climbing shaft",
    ],
    tacticalStatus: "Comms occasionally static. Squad AI hesitates.",
    keyDesign: "Three-zone structure fully realized. Player choice in routing.",
  },
  {
    id: "2",
    name: "Pipe Dreams",
    subtitle: "Suffocation",
    duration: "90–120 min",
    difficulty: "High",
    color: "#c0392b",
    environment: "Narrow maintenance corridors, exposed piping, ankle-deep fluid",
    tone: "Claustrophobic, desperate",
    description: "Claustrophobic Survival. Corridors narrow progressively. Kade is separated and returns changed. The Pipe Crawler nest is a masterclass in tension.",
    encounters: [
      "Pipe Crawler observation and hostile activation",
      "Flooded section with Drowned hand grab",
      "Kade's separation and return (20 minutes alone, returns singing)",
      "Pipe Crawler nest stealth sequence",
      "Machine Heart room with Drowned combat",
      "Rising water escape",
      "Elevator skip to Level 4",
    ],
    scripted: [
      "Kade's first panic attack: 'The walls are getting closer'",
      "Kade's transformation: 'I heard singing. My mama's church.'",
      "Thorne's empathy moment with a Drowned",
      "Kade's moment of clarity with the Pipe Crawler",
      "Level 3 skip: 'The floor indicator counts up: 2...3...4...Then letters: A...B...C...Then symbols that don't exist.'",
    ],
    tacticalStatus: "Formations impossible. Comms break up. Revive time extended to 12s.",
    keyDesign: "Progressive corridor narrowing (1.5m → 1.2m → 1.0m → 0.9m). Single-file-only movement.",
  },
  {
    id: "4",
    name: "Abandoned Office",
    subtitle: "Descent",
    duration: "90–120 min",
    difficulty: "Extreme",
    color: "#2980b9",
    environment: "Desaturated office park, cubicles, conference rooms",
    tone: "Psychological warfare, paranoia",
    description: "Psychological Warfare. The Backrooms know the squad personally. Doppelgangers mimic them. Reyes disappears. Thorne confesses everything.",
    encounters: [
      "Doppelganger Vance introduction (perfect mimicry)",
      "The Meeting entity (T-4 conference room trap)",
      "Thorne's full confession (player choice: spare or execute)",
      "Reyes's server room defense",
      "Reyes's disappearance (steps into wall)",
      "Personal memory buildings (each squad member's past)",
      "Doppelganger gauntlet (glass walkway ambush)",
      "Grand Staircase",
    ],
    scripted: [
      "Vance finding her own desk and foster brother's photo",
      "Kade finding his childhood church bulletin",
      "Conference room PowerPoint about squad's psychological profiles and casualty projections",
      "Reyes's final moments: 'The hum isn't noise. It's music. And I finally know the words.'",
      "Vance's pre-Level 11 speech",
    ],
    tacticalStatus: "Squad AI unreliable. Doppelgangers mimic squad callouts.",
    keyDesign: "Personal horror. The environment uses squad members' memories against them.",
  },
  {
    id: "11",
    name: "The Infinite City",
    subtitle: "Terminus",
    duration: "60–90 min",
    difficulty: "Maximum",
    color: "#8e44ad",
    environment: "Endless urban landscape",
    tone: "Apocalyptic, resigned, transcendent",
    description: "Urban Apocalypse. The final level. An infinite city stretches in every direction. The squad confronts the truth about Operation THRESHOLD and makes their final choice.",
    encounters: [
      "Emergence onto empty city streets",
      "The Other Squad (Russian expedition, all dead of fear)",
      "The Working Cafe (perfectly maintained, no people)",
      "First Citizens encounter (walk through squad without acknowledgment)",
      "The Architect's indirect influence (buildings rearranging)",
      "Plaza of Bodies (dozens of previous expedition members)",
      "Kade's departure (walks into a door to his mother's church)",
      "The Statue (SCP-173-style, optional)",
      "The Tower approach",
      "The Threshold Room",
    ],
    scripted: [
      "The Threshold Room: 'BREACH REQUIRES LIVING MASS + CONSCIOUS INTENT. SACRIFICE MANDATORY. ONE ENTERS. OTHERS EXIT.'",
      "Five possible endings",
    ],
    tacticalStatus: "No formations. Comms one-way only. Stealth detection nearly impossible.",
    keyDesign: "Overwhelming scale. The horror of infinity. The final choice.",
  },
];

const endings = [
  { name: "Thorne Sacrifices", desc: "Opens exit, dies screaming/laughing. Post-credits: his voice from inside.", color: "#c0392b" },
  { name: "Holt Sacrifices", desc: "Restrains Vance, steps in. 'Tell my mother I wasn't running.'", color: "#2980b9" },
  { name: "Vance Sacrifices", desc: "Steps in, sees David/Reyes/Kade. Becomes a guardian for future wanderers.", color: "#d4a017" },
  { name: "The Tear", desc: "Secret, 100% completion. Reyes's formula widens breach without sacrifice. Everyone escapes, but Backrooms leaks into reality forever.", color: "#8e44ad" },
  { name: "The Acclimation", desc: "Save Kade + choose to stay. Entire squad becomes citizens of the infinite city.", color: "#3a7d44" },
];

function LevelCard({ level, isOpen, onToggle }: { level: typeof levels[0]; isOpen: boolean; onToggle: () => void }) {
  return (
    <div className="py-8">
      <button onClick={onToggle} className="w-full text-left group">
        <div className="flex items-baseline gap-4 mb-1">
          <span className="font-mono text-[10px] text-foreground/15 tracking-[0.2em] shrink-0">LEVEL {level.id}</span>
          <h3 className="text-lg font-light text-foreground/70 group-hover:text-foreground/90 transition-colors">
            {level.name}
          </h3>
          <span className="text-[13px] text-foreground/20 font-light hidden sm:inline">— {level.subtitle}</span>
          {isOpen ? (
            <ChevronDown size={14} className="text-foreground/15 ml-auto" />
          ) : (
            <ChevronRight size={14} className="text-foreground/15 ml-auto" />
          )}
        </div>
        <div className="flex items-baseline gap-4 mt-1">
          <span className="font-mono text-[9px] text-foreground/10">{level.duration}</span>
          <span className="font-mono text-[9px] text-foreground/10">{level.difficulty}</span>
        </div>
      </button>

      {isOpen && (
        <div className="mt-6 ml-0 md:ml-8 space-y-6">
          <p className="text-[13px] text-foreground/40 font-light leading-relaxed max-w-2xl">
            {level.description}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <span className="font-mono text-[9px] text-foreground/15 tracking-[0.2em] block mb-2">ENVIRONMENT</span>
              <p className="text-[12px] text-foreground/30 font-light">{level.environment}</p>
            </div>
            <div>
              <span className="font-mono text-[9px] text-foreground/15 tracking-[0.2em] block mb-2">TONE</span>
              <p className="text-[12px] text-foreground/30 font-light">{level.tone}</p>
            </div>
          </div>

          <div>
            <span className="font-mono text-[9px] text-foreground/15 tracking-[0.2em] block mb-2">TACTICAL STATUS</span>
            <p className="text-[12px] text-amber/30 font-light">{level.tacticalStatus}</p>
          </div>

          <div>
            <span className="font-mono text-[9px] text-foreground/15 tracking-[0.2em] block mb-3">KEY ENCOUNTERS</span>
            <div className="space-y-1.5">
              {level.encounters.map((e, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="font-mono text-[9px] text-foreground/10 mt-0.5 shrink-0">{String(i + 1).padStart(2, "0")}</span>
                  <span className="text-[12px] text-foreground/30 font-light">{e}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <span className="font-mono text-[9px] text-foreground/15 tracking-[0.2em] block mb-3">SCRIPTED MOMENTS</span>
            <div className="space-y-1.5">
              {level.scripted.map((s, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="text-foreground/10 mt-0.5 shrink-0">—</span>
                  <span className="text-[12px] text-foreground/25 font-light italic">{s}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-2">
            <span className="font-mono text-[9px] text-foreground/15 tracking-[0.2em] block mb-2">DESIGN PHILOSOPHY</span>
            <p className="text-[12px] text-foreground/30 font-light">{level.keyDesign}</p>
          </div>
        </div>
      )}

      <div className="mt-8 h-px bg-foreground/[0.04]" />
    </div>
  );
}

export default function LevelsPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="px-6 md:px-12 lg:px-24 py-16 md:py-24">
      <SectionHeader
        code="03 / LEVELS"
        title="Levels"
        subtitle="Five levels. No maps. No GPS. No mercy."
      />

      {/* Design philosophy */}
      <div className="mb-16">
        <h3 className="font-mono text-[10px] text-foreground/20 tracking-[0.2em] mb-6">DESIGN PHILOSOPHY</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { label: "THREE-ZONE STRUCTURE", desc: "Every level has Safe-ish → Tension → Climax zones at macro, mid, and micro scales." },
            { label: "THE BACKROOMS ARE THE ENEMY", desc: "Level geometry itself is hostile before entities." },
            { label: "NO MAPS", desc: "No minimap (Level 2+), compass spins (Level 4+), GPS never works. Landmark-based navigation." },
            { label: "TONAL SHIFT IN ARCHITECTURE", desc: "Open/navigable → Claustrophobic → Personal/wrong → Overwhelming/infinite." },
          ].map((p) => (
            <div key={p.label}>
              <span className="font-mono text-[9px] text-foreground/15 tracking-[0.15em] block mb-2">{p.label}</span>
              <p className="text-[12px] text-foreground/25 font-light leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Level progression */}
      <div className="mb-12">
        <div className="flex gap-[2px] h-1">
          {levels.map((level, i) => (
            <div
              key={i}
              className="flex-1 cursor-pointer transition-opacity hover:opacity-100 opacity-60"
              style={{ background: level.color }}
              onClick={() => setOpenIndex(i)}
            />
          ))}
        </div>
        <div className="flex justify-between mt-2">
          <span className="font-mono text-[8px] text-foreground/10">CONFIDENCE</span>
          <span className="font-mono text-[8px] text-foreground/10">AFTERMATH</span>
        </div>
      </div>

      {/* Level cards */}
      <div>
        {levels.map((level, i) => (
          <LevelCard
            key={level.id}
            level={level}
            isOpen={openIndex === i}
            onToggle={() => setOpenIndex(openIndex === i ? null : i)}
          />
        ))}
      </div>

      {/* Endings */}
      <div className="mt-20">
        <h3 className="font-mono text-[10px] text-foreground/20 tracking-[0.2em] mb-8">THE FIVE ENDINGS</h3>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          {endings.map((ending) => (
            <div key={ending.name}>
              <div className="w-full h-[2px] mb-4" style={{ background: `${ending.color}40` }} />
              <h4 className="text-[13px] font-medium text-foreground/50 mb-2">{ending.name}</h4>
              <p className="text-[11px] text-foreground/20 font-light leading-relaxed">{ending.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
