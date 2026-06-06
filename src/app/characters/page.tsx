"use client";

import { useState } from "react";
import SectionHeader from "@/components/SectionHeader";
import { ChevronDown, ChevronRight } from "lucide-react";

const characters = [
  {
    name: "Sgt. Mara Vance",
    role: "Team Leader",
    age: 34,
    class: "Player Character",
    voiceRef: "Sigourney Weaver, Regina King",
    color: "#d4a017",
    background: "Detroit, foster care, Army at 18, Special Forces at 24. Three combat deployments.",
    personality: "Professional, decisive, protective. Lowers her voice when angry. Remembers every face she has seen die.",
    arc: "Confident leader → Concerned → Claustrophobic/panicking → Broken by finding her own desk in Level 4 → Resigned determination in Level 11.",
    asyncNote: "Anomalous sensitivity — 'feeling watched' in empty rooms, recurring dreams of yellow hallways since childhood.",
    endings: ["The Sacrifice (holds exit open)", "The Escape (bittersweet)", "The Break (refuses to leave)", "The Truth (secret whistleblower ending)"],
    stats: { combat: 95, leadership: 98, sanity: 70, stealth: 80 },
    keyMoment: "Finding her own desk in Level 4 with her foster brother's photo — the Backrooms knew her before she knew them.",
  },
  {
    name: "Cpl. Elias Kade",
    role: "Point Man",
    age: 24,
    class: "Assault",
    voiceRef: "Michael B. Jordan, Jonathan Majors",
    color: "#3a7d44",
    background: "Mobile, Alabama. Pentecostal family. Enlisted at 20. First real operation.",
    personality: "Eager, faithful, the squad's heart. His faith is the load-bearing wall of his psychology.",
    arc: "Eager → Concerned → Separated in Level 2, returns changed, singing hymns → Preaching → Fanatical, serene, possibly prophetic.",
    asyncNote: "In Level 2, separated for 20 minutes, found sitting among Drowned who did not touch him. 'They don't want me yet.'",
    endings: ["The Prophet (walks into city, voice on radio)", "The Broken Believer (survives, institutionalized)", "The Martyr (dies protecting squad)"],
    stats: { combat: 85, leadership: 60, sanity: 55, stealth: 70 },
    keyMoment: "Level 11 sermon: 'The test isn't to escape. The test is to be worth taking. And I am.'",
  },
  {
    name: "Lt. Darius Holt",
    role: "Tactician",
    age: 36,
    class: "Overwatch/Sniper",
    voiceRef: "Idris Elba, Mahershala Ali",
    color: "#2980b9",
    background: "Boston, working-class. Green Beret. Two combat deployments + classified CIA operation.",
    personality: "The cynic, the rock. Dry humor under pressure. Fear is boring to him.",
    arc: "Skeptical → Concerned but masking → Steady, supporting Vance → Suspicious, methodical → Betrayed by CIA reveal, exhausted, still leading.",
    asyncNote: "In 2019, participated in a classified operation in Kazakhstan containing a localized noclip event. He has been in a Backrooms-adjacent situation before and did not tell the squad.",
    endings: ["The Captain (assumes command)", "The Confession (tells squad everything)", "The Stay (refuses to leave without everyone)"],
    stats: { combat: 90, leadership: 85, sanity: 90, stealth: 95 },
    keyMoment: "Resumes playing chess alone in Level 11 after Reyes's disappearance — moving both sides of the board.",
  },
  {
    name: "Spec. Juno Reyes",
    role: "Tech Specialist",
    age: 26,
    class: "Engineer",
    voiceRef: "Tessa Thompson, Rosa Salazar",
    color: "#8e44ad",
    background: "East LA. Caltech CS graduate. Recruited for anomalous systems interfacing. 94% success rate with Async equipment.",
    personality: "The nerd, the witness. Makes pop culture references, gets excited about entity behavior. Documents everything. The only person who finds the Backrooms genuinely interesting.",
    arc: "Excited/curious → Professional concern → Fascinated and frightened → Disappears in Level 4.",
    asyncNote: "Steps into a wall that ripples like water. Her camera continues recording for 47 minutes. Final recording: 'The hum isn't noise. It's music. And I finally know the words.'",
    endings: ["Legacy continues through voice echoes, notes, and a chess set in Level 11"],
    stats: { combat: 55, leadership: 50, sanity: 85, stealth: 75 },
    keyMoment: "Disappearance in Level 4 — steps into a wall that ripples like water, camera recording for 47 minutes.",
  },
  {
    name: "Dr. Aris Thorne",
    role: "Async Liaison",
    age: 41,
    class: "Anomalist",
    voiceRef: "Tom Hiddleston, Andrew Scott",
    color: "#c0392b",
    background: "Cambridge, England. PhD at 24. 14 voluntary Backrooms expeditions. Carries a classified data transmitter — his primary mission objective.",
    personality: "The professional, the guilty man. Polite, precise, slightly condescending. Voluntarily came on a mission where he knew the squad would likely die.",
    arc: "Superior/detached → Concerned → Frightened → Full confession when transmitter destroyed → Redeemed or damned.",
    asyncNote: "Operation THRESHOLD was never a security mission — it was a data-gathering exercise. The 'extraction point' was theoretical. The squad were test subjects.",
    endings: ["The Redemption (sacrifices himself to open exit)", "The Whistleblower (leaks Async data)", "The Acclimation (stays in Backrooms, becomes part of it)"],
    stats: { combat: 40, leadership: 70, sanity: 60, stealth: 45 },
    keyMoment: "Confession: 'Operation THRESHOLD was never a security mission... The extraction point was theoretical. You were never supposed to come home.'",
  },
];

function StatBar({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex items-center gap-3">
      <span className="font-mono text-[9px] text-foreground/15 w-14 tracking-wider">{label}</span>
      <div className="flex-1 h-[2px] bg-foreground/[0.04] overflow-hidden">
        <div
          className="h-full bg-foreground/20 transition-all"
          style={{ width: `${value}%` }}
        />
      </div>
      <span className="font-mono text-[10px] text-foreground/20 w-6 text-right tabular-nums">{value}</span>
    </div>
  );
}

function CharacterCard({ char, isOpen, onToggle }: { char: typeof characters[0]; isOpen: boolean; onToggle: () => void }) {
  return (
    <div className="py-6">
      <button onClick={onToggle} className="w-full text-left group">
        <div className="flex items-baseline gap-4 mb-1">
          <h3 className="text-lg font-light text-foreground/70 group-hover:text-foreground/90 transition-colors">
            {char.name}
          </h3>
          {isOpen ? (
            <ChevronDown size={14} className="text-foreground/15" />
          ) : (
            <ChevronRight size={14} className="text-foreground/15" />
          )}
        </div>
        <div className="flex items-baseline gap-3">
          <span className="font-mono text-[9px] text-foreground/15 tracking-[0.15em]">{char.role}</span>
          <span className="font-mono text-[9px] text-foreground/10">AGE {char.age}</span>
          <span className="font-mono text-[9px] text-foreground/10">{char.class}</span>
        </div>
      </button>

      {isOpen && (
        <div className="mt-6 ml-0 md:ml-8 space-y-6">
          {/* Background */}
          <div>
            <span className="font-mono text-[9px] text-foreground/15 tracking-[0.2em] block mb-2">BACKGROUND</span>
            <p className="text-[13px] text-foreground/40 font-light leading-relaxed">{char.background}</p>
          </div>

          {/* Personality */}
          <div>
            <span className="font-mono text-[9px] text-foreground/15 tracking-[0.2em] block mb-2">PERSONALITY</span>
            <p className="text-[13px] text-foreground/40 font-light leading-relaxed">{char.personality}</p>
          </div>

          {/* Character Arc */}
          <div>
            <span className="font-mono text-[9px] text-foreground/15 tracking-[0.2em] block mb-2">CHARACTER ARC</span>
            <p className="text-[13px] text-foreground/40 font-light leading-relaxed">{char.arc}</p>
          </div>

          {/* Async Note */}
          <div>
            <span className="font-mono text-[9px] text-foreground/15 tracking-[0.2em] block mb-2">ASYNC FILE NOTE</span>
            <p className="text-[13px] text-amber/40 font-light leading-relaxed italic">{char.asyncNote}</p>
          </div>

          {/* Key Moment */}
          <div>
            <span className="font-mono text-[9px] text-foreground/15 tracking-[0.2em] block mb-2">KEY MOMENT</span>
            <p className="text-[13px] text-foreground/40 font-light leading-relaxed">{char.keyMoment}</p>
          </div>

          {/* Stats */}
          <div>
            <span className="font-mono text-[9px] text-foreground/15 tracking-[0.2em] block mb-3">CAPABILITY ASSESSMENT</span>
            <div className="space-y-2">
              <StatBar label="COMBAT" value={char.stats.combat} />
              <StatBar label="LEADER" value={char.stats.leadership} />
              <StatBar label="SANITY" value={char.stats.sanity} />
              <StatBar label="STEALTH" value={char.stats.stealth} />
            </div>
          </div>

          {/* Endings */}
          <div>
            <span className="font-mono text-[9px] text-foreground/15 tracking-[0.2em] block mb-2">POSSIBLE ENDINGS</span>
            <div className="flex flex-wrap gap-x-4 gap-y-1">
              {char.endings.map((e, i) => (
                <span key={i} className="text-[11px] text-foreground/20 font-light">
                  {e}
                </span>
              ))}
            </div>
          </div>

          {/* Voice Reference */}
          <div className="font-mono text-[9px] text-foreground/10 tracking-wider pt-2">
            VOICE REFERENCE: {char.voiceRef}
          </div>
        </div>
      )}

      <div className="mt-6 h-px bg-foreground/[0.04]" />
    </div>
  );
}

export default function CharactersPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="px-6 md:px-12 lg:px-24 py-16 md:py-24">
      <SectionHeader
        code="02 / CHARACTERS"
        title="Characters"
        subtitle="Fireteam THRESHOLD — Five individuals. One mission. Zero guarantees."
      />

      {/* Relationship note */}
      <div className="mb-12">
        <p className="font-mono text-[11px] text-foreground/20 leading-relaxed max-w-2xl">
          Dynamic trust web — relationships evolve dramatically from campaign start to end.
          Vance starts "Respects" Holt and "Protective" of Kade; ends "Depends on" Holt and "Barely speaks to" Kade.
        </p>
      </div>

      {/* Character cards */}
      <div>
        {characters.map((char, i) => (
          <CharacterCard
            key={char.name}
            char={char}
            isOpen={openIndex === i}
            onToggle={() => setOpenIndex(openIndex === i ? null : i)}
          />
        ))}
      </div>

      {/* Multiplayer Operatives */}
      <div className="mt-20">
        <h3 className="font-mono text-[10px] text-foreground/20 tracking-[0.2em] mb-8">
          MULTIPLAYER OPERATIVES
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { name: "ROOK", role: "Former Async Security", ability: "Veteran's Eye — highlights entity weak points" },
            { name: "VEX", role: "Civilian Survivor", ability: "Wanderer's Path — reveals safe routes" },
            { name: "SAINT", role: "Military Chaplain", ability: "Counsel — restores ally sanity" },
            { name: "NULL", role: "Async Black Ops", ability: "Sanitize — instantly kills T-2 entities in radius" },
          ].map((op) => (
            <div key={op.name}>
              <h4 className="text-[13px] font-medium text-foreground/60 mb-1">{op.name}</h4>
              <span className="font-mono text-[9px] text-foreground/15 tracking-[0.15em] block mb-2">{op.role}</span>
              <p className="text-[12px] text-foreground/25 font-light">{op.ability}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
