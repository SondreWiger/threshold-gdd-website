"use client";

import { useState } from "react";
import SectionHeader from "@/components/SectionHeader";
import { ChevronDown, ChevronUp, AlertTriangle, Clock, Users, Crosshair } from "lucide-react";

const levels = [
  {
    id: "0",
    name: "The Lobby",
    subtitle: "The Breach",
    duration: "60-90 min",
    difficulty: "Low",
    entityDensity: "Very Low",
    combatViability: "High",
    sanityImpact: "Mild unease",
    color: "#d4a017",
    bg: "rgba(212, 160, 23, 0.06)",
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
    collectibles: "6 items: Async Field Manual, Survivor Journal pages, Extraction Beacon Log, Reyes's Photo 1 (shows a sixth figure behind the squad)",
    colorProgression: "Warm yellows, sterile whites, tactical greens (confidence)",
    tacticalStatus: "Full functionality. Squad responsive. Comms clear.",
    keyDesign: "Open, navigable spaces. Warm yellow palette. Confidence before the fall.",
  },
  {
    id: "1",
    name: "Habitable Zone",
    subtitle: "Reality Check",
    duration: "90-120 min",
    difficulty: "Medium",
    entityDensity: "Moderate",
    combatViability: "Medium-High",
    sanityImpact: "Growing paranoia",
    color: "#e67e22",
    bg: "rgba(230, 126, 34, 0.06)",
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
    collectibles: "Three-path junction choice (Storage/combat, Maintenance/dangerous, Administration/lore)",
    colorProgression: "Industrial greys, warning oranges, cold fluorescents (unease)",
    tacticalStatus: "Comms occasionally static. Squad AI hesitates.",
    keyDesign: "Three-zone structure fully realized. Player choice in routing.",
  },
  {
    id: "2",
    name: "Pipe Dreams",
    subtitle: "Suffocation",
    duration: "90-120 min",
    difficulty: "High",
    entityDensity: "High",
    combatViability: "Medium",
    sanityImpact: "Significant stress",
    color: "#c0392b",
    bg: "rgba(192, 57, 43, 0.06)",
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
    collectibles: "Valve puzzle (4 valves, correct combination opens path)",
    colorProgression: "Rust browns, pipe metal, darkness, emergency red (claustrophobia)",
    tacticalStatus: "Formations impossible. Comms break up. Revive time extended to 12s.",
    keyDesign: "Progressive corridor narrowing (1.5m → 1.2m → 1.0m → 0.9m). Single-file-only movement.",
  },
  {
    id: "4",
    name: "Abandoned Office",
    subtitle: "Descent",
    duration: "90-120 min",
    difficulty: "Extreme",
    entityDensity: "Moderate but deceptive",
    combatViability: "Low",
    sanityImpact: "Severe degradation",
    color: "#2980b9",
    bg: "rgba(41, 128, 185, 0.06)",
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
    collectibles: "Player choice: Spare or execute Thorne (affects endings and Async tech availability)",
    colorProgression: "Muted blues, sickly greens, shadow, monitor glow (paranoia)",
    tacticalStatus: "Squad AI unreliable. Doppelgangers mimic squad callouts.",
    keyDesign: "Personal horror. The environment uses squad members' memories against them.",
  },
  {
    id: "11",
    name: "The Infinite City",
    subtitle: "Terminus",
    duration: "60-90 min",
    difficulty: "Maximum",
    entityDensity: "Variable",
    combatViability: "Desperate",
    sanityImpact: "Existential crisis",
    color: "#8e44ad",
    bg: "rgba(142, 68, 173, 0.06)",
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
    collectibles: "Five endings: Thorne Sacrifices, Holt Sacrifices, Vance Sacrifices, The Tear (secret), The Acclimation",
    colorProgression: "Ash grey, neon flickers, void black, fire orange (apocalypse)",
    tacticalStatus: "No formations. Comms one-way only. Stealth detection nearly impossible.",
    keyDesign: "Overwhelming scale. The horror of infinity. The final choice.",
  },
];

function LevelCard({ level, isOpen, onToggle }: { level: typeof levels[0]; isOpen: boolean; onToggle: () => void }) {
  return (
    <div
      className="border card-hover"
      style={{ borderColor: `${level.color}25`, background: level.bg }}
    >
      <button onClick={onToggle} className="w-full p-5 text-left">
        <div className="flex items-center gap-4">
          <div
            className="w-14 h-14 flex flex-col items-center justify-center shrink-0"
            style={{ border: `1px solid ${level.color}40` }}
          >
            <span className="font-mono text-[8px] text-steel-light/40 tracking-wider">LEVEL</span>
            <span className="font-mono text-lg font-bold" style={{ color: level.color }}>{level.id}</span>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-mono text-sm tracking-wider text-foreground">{level.name}</h3>
              <span className="font-mono text-[9px] text-steel-light/40">— {level.subtitle}</span>
            </div>
            <div className="flex flex-wrap items-center gap-3 text-[10px]">
              <span className="flex items-center gap-1 font-mono text-steel-light/50">
                <Clock size={10} /> {level.duration}
              </span>
              <span className="flex items-center gap-1 font-mono text-steel-light/50">
                <AlertTriangle size={10} /> {level.difficulty}
              </span>
              <span className="flex items-center gap-1 font-mono text-steel-light/50">
                <Users size={10} /> {level.entityDensity}
              </span>
              <span className="flex items-center gap-1 font-mono text-steel-light/50">
                <Crosshair size={10} /> {level.combatViability}
              </span>
            </div>
          </div>
          <span className="text-steel-light/30">
            {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </span>
        </div>
      </button>

      {isOpen && (
        <div className="px-5 pb-5 space-y-5 border-t" style={{ borderColor: `${level.color}10` }}>
          <div className="pt-4">
            {/* Environment & Tone */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="bg-steel-dark/50 p-3">
                <span className="data-label block mb-1">ENVIRONMENT</span>
                <p className="text-xs text-foreground/70">{level.environment}</p>
              </div>
              <div className="bg-steel-dark/50 p-3">
                <span className="data-label block mb-1">TONE</span>
                <p className="text-xs text-foreground/70">{level.tone}</p>
              </div>
            </div>

            {/* Description */}
            <p className="text-sm text-foreground/80 leading-relaxed mb-4">{level.description}</p>

            {/* Tactical Status */}
            <div className="bg-steel-dark/50 p-3 border border-amber/10 mb-4">
              <span className="data-label block mb-1">TACTICAL SYSTEM STATUS</span>
              <p className="text-xs text-amber-dim/80">{level.tacticalStatus}</p>
            </div>

            {/* Color Progression */}
            <div className="mb-4">
              <span className="data-label block mb-1">COLOR PROGRESSION</span>
              <p className="text-xs text-foreground/60">{level.colorProgression}</p>
            </div>

            {/* Key Encounters */}
            <div className="mb-4">
              <span className="data-label block mb-2">KEY ENCOUNTERS</span>
              <div className="space-y-1.5">
                {level.encounters.map((e, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <span className="font-mono text-[9px] mt-0.5" style={{ color: `${level.color}60` }}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-xs text-foreground/70">{e}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Scripted Moments */}
            <div className="mb-4">
              <span className="data-label block mb-2">SCRIPTED MOMENTS</span>
              <div className="space-y-1.5">
                {level.scripted.map((s, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <span className="text-amber-dim/30 mt-0.5">▸</span>
                    <span className="text-xs text-foreground/60 italic">{s}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Key Design */}
            <div className="bg-steel-dark/30 p-3 border-l-2" style={{ borderColor: level.color }}>
              <span className="data-label block mb-1">KEY DESIGN PHILOSOPHY</span>
              <p className="text-xs text-foreground/70">{level.keyDesign}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function LevelsPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="px-6 md:px-16 lg:px-24 py-16 md:py-24">
      <SectionHeader
        code="03"
        title="LEVELS"
        subtitle="Five levels. No maps. No GPS. No mercy."
      />

      {/* Design philosophy */}
      <div className="bg-steel-dark/30 border border-amber/10 p-5 mb-8 corner-brackets">
        <h3 className="font-mono text-xs text-amber-dim tracking-[0.2em] mb-3">DESIGN PHILOSOPHY</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-xs text-foreground/70">
          <div>
            <span className="data-label block mb-1">THREE-ZONE STRUCTURE</span>
            <p>Every level has Safe-ish → Tension → Climax zones at macro, mid, and micro scales.</p>
          </div>
          <div>
            <span className="data-label block mb-1">THE BACKROOMS ARE THE ENEMY</span>
            <p>Level geometry itself is hostile before entities.</p>
          </div>
          <div>
            <span className="data-label block mb-1">NO MAPS</span>
            <p>No minimap (Level 2+), compass spins (Level 4+), GPS never works. Landmark-based navigation.</p>
          </div>
          <div>
            <span className="data-label block mb-1">TONAL SHIFT IN ARCHITECTURE</span>
            <p>Open/navigable → Claustrophobic → Personal/wrong → Overwhelming/infinite.</p>
          </div>
        </div>
      </div>

      {/* Level progression visualization */}
      <div className="mb-8">
        <div className="flex items-center gap-1 h-8">
          {levels.map((level, i) => (
            <div key={i} className="flex-1 h-full relative group cursor-pointer" onClick={() => setOpenIndex(i)}>
              <div
                className="absolute inset-0 opacity-30 group-hover:opacity-60 transition-opacity"
                style={{ background: level.color }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-mono text-[9px] text-white/80 tracking-wider">{level.id}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-1">
          <span className="font-mono text-[8px] text-steel-light/30">CONFIDENCE</span>
          <span className="font-mono text-[8px] text-steel-light/30">AFTERMATH</span>
        </div>
      </div>

      {/* Level cards */}
      <div className="space-y-3">
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
      <div className="mt-16">
        <h3 className="font-mono text-xs text-amber-dim tracking-[0.2em] mb-6">THE FIVE ENDINGS</h3>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
          {[
            { name: "Thorne Sacrifices", desc: "Opens exit, dies screaming/laughing. Post-credits: his voice from inside.", color: "#c0392b" },
            { name: "Holt Sacrifices", desc: "Restrains Vance, steps in. 'Tell my mother I wasn't running.'", color: "#2980b9" },
            { name: "Vance Sacrifices", desc: "Steps in, sees David/Reyes/Kade. Becomes a guardian for future wanderers.", color: "#d4a017" },
            { name: "The Tear", desc: "Secret, 100% completion. Reyes's formula widens breach without sacrifice. Everyone escapes, but Backrooms leaks into reality forever.", color: "#8e44ad" },
            { name: "The Acclimation", desc: "Save Kade + choose to stay. Entire squad becomes citizens of the infinite city.", color: "#3a7d44" },
          ].map((ending) => (
            <div key={ending.name} className="bg-steel-dark/30 border p-4 card-hover" style={{ borderColor: `${ending.color}30` }}>
              <div className="w-full h-1 mb-3" style={{ background: ending.color }} />
              <h4 className="font-mono text-xs tracking-wider text-foreground mb-2">{ending.name}</h4>
              <p className="text-[10px] text-steel-light/60 leading-relaxed">{ending.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
