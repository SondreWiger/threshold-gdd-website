"use client";

import { useState } from "react";
import SectionHeader from "@/components/SectionHeader";
import { ChevronDown, ChevronUp } from "lucide-react";

const characters = [
  {
    name: "Sgt. Mara Vance",
    role: "Team Leader",
    age: 34,
    class: "Player Character",
    voiceRef: "Sigourney Weaver, Regina King",
    color: "#d4a017",
    bg: "rgba(212, 160, 23, 0.08)",
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
    bg: "rgba(58, 125, 68, 0.08)",
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
    bg: "rgba(41, 128, 185, 0.08)",
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
    bg: "rgba(142, 68, 173, 0.08)",
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
    bg: "rgba(192, 57, 43, 0.08)",
    background: "Cambridge, England. PhD at 24. 14 voluntary Backrooms expeditions. Carries a classified data transmitter — his primary mission objective.",
    personality: "The professional, the guilty man. Polite, precise, slightly condescending. Voluntarily came on a mission where he knew the squad would likely die.",
    arc: "Superior/detached → Concerned → Frightened → Full confession when transmitter destroyed → Redeemed or damned.",
    asyncNote: "Operation THRESHOLD was never a security mission — it was a data-gathering exercise. The 'extraction point' was theoretical. The squad were test subjects.",
    endings: ["The Redemption (sacrifices himself to open exit)", "The Whistleblower (leaks Async data)", "The Acclimation (stays in Backrooms, becomes part of it)"],
    stats: { combat: 40, leadership: 70, sanity: 60, stealth: 45 },
    keyMoment: "Confession: 'Operation THRESHOLD was never a security mission... The extraction point was theoretical. You were never supposed to come home.'",
  },
];

function StatBar({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="font-mono text-[9px] text-steel-light/50 w-16 tracking-wider">{label}</span>
      <div className="flex-1 stat-bar">
        <div className="stat-bar-fill" style={{ width: `${value}%`, background: color }} />
      </div>
      <span className="font-mono text-[10px] text-steel-light/60 w-6 text-right">{value}</span>
    </div>
  );
}

function CharacterCard({ char, isOpen, onToggle }: { char: typeof characters[0]; isOpen: boolean; onToggle: () => void }) {
  return (
    <div
      className="border card-hover"
      style={{ borderColor: `${char.color}20`, background: char.bg }}
    >
      <button
        onClick={onToggle}
        className="w-full p-5 text-left flex items-start gap-4"
      >
        <div
          className="w-10 h-10 flex items-center justify-center font-mono text-sm font-bold shrink-0"
          style={{ border: `1px solid ${char.color}40`, color: char.color }}
        >
          {char.name.split(" ").pop()?.[0]}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-mono text-sm tracking-wider text-foreground">{char.name}</h3>
          </div>
          <div className="flex items-center gap-3">
            <span className="data-label">{char.role}</span>
            <span className="font-mono text-[9px] text-steel-light/40">AGE {char.age}</span>
            <span className="font-mono text-[9px] text-steel-light/40">{char.class.toUpperCase()}</span>
          </div>
        </div>
        <span className="text-steel-light/30 mt-1">
          {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </span>
      </button>

      {isOpen && (
        <div className="px-5 pb-5 border-t" style={{ borderColor: `${char.color}10` }}>
          <div className="pt-4 space-y-4">
            {/* Background */}
            <div>
              <span className="data-label block mb-1">BACKGROUND</span>
              <p className="text-xs text-foreground/70 leading-relaxed">{char.background}</p>
            </div>

            {/* Personality */}
            <div>
              <span className="data-label block mb-1">PERSONALITY</span>
              <p className="text-xs text-foreground/70 leading-relaxed">{char.personality}</p>
            </div>

            {/* Character Arc */}
            <div>
              <span className="data-label block mb-1">CHARACTER ARC</span>
              <p className="text-xs text-foreground/70 leading-relaxed">{char.arc}</p>
            </div>

            {/* Async Note */}
            <div className="bg-steel-dark/50 p-3 border border-amber/10">
              <span className="data-label block mb-1">ASYNC FILE NOTE</span>
              <p className="text-xs text-amber-dim/80 leading-relaxed italic">{char.asyncNote}</p>
            </div>

            {/* Key Moment */}
            <div>
              <span className="data-label block mb-1">KEY MOMENT</span>
              <p className="text-xs text-foreground/70 leading-relaxed">{char.keyMoment}</p>
            </div>

            {/* Stats */}
            <div>
              <span className="data-label block mb-2">CAPABILITY ASSESSMENT</span>
              <div className="space-y-2">
                <StatBar label="COMBAT" value={char.stats.combat} color={char.color} />
                <StatBar label="LEADER" value={char.stats.leadership} color={char.color} />
                <StatBar label="SANITY" value={char.stats.sanity} color={char.color} />
                <StatBar label="STEALTH" value={char.stats.stealth} color={char.color} />
              </div>
            </div>

            {/* Endings */}
            <div>
              <span className="data-label block mb-2">POSSIBLE ENDINGS</span>
              <div className="flex flex-wrap gap-1.5">
                {char.endings.map((e, i) => (
                  <span key={i} className="px-2 py-1 bg-steel-dark/50 border border-steel-light/10 font-mono text-[9px] text-steel-light/60">
                    {e}
                  </span>
                ))}
              </div>
            </div>

            {/* Voice Reference */}
            <div className="font-mono text-[9px] text-steel-light/30 tracking-wider">
              VOICE REFERENCE: {char.voiceRef}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function CharactersPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="px-6 md:px-16 lg:px-24 py-16 md:py-24">
      <SectionHeader
        code="02"
        title="CHARACTERS"
        subtitle="Fireteam THRESHOLD — Five individuals. One mission. Zero guarantees."
      />

      {/* Relationship note */}
      <div className="bg-steel-dark/30 border border-amber/10 p-4 mb-8 corner-brackets">
        <p className="font-mono text-[10px] text-amber-dim/70 tracking-wider">
          DYNAMIC TRUST WEB — Relationships evolve dramatically from campaign start to end.
          Vance starts &quot;Respects&quot; Holt and &quot;Protective&quot; of Kade; ends &quot;Depends on&quot; Holt and &quot;Barely speaks to&quot; Kade.
        </p>
      </div>

      {/* Character cards */}
      <div className="space-y-3">
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
      <div className="mt-16">
        <h3 className="font-mono text-xs text-amber-dim tracking-[0.2em] mb-6">MULTIPLAYER OPERATIVES</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            { name: "ROOK", role: "Former Async Security", class: "Tactical", ability: "Veteran's Eye — highlights entity weak points" },
            { name: "VEX", role: "Civilian Survivor", class: "Assault/Engineer", ability: "Wanderer's Path — reveals safe routes" },
            { name: "SAINT", role: "Military Chaplain", class: "Support", ability: "Counsel — restores ally sanity" },
            { name: "NULL", role: "Async Black Ops", class: "Assault/Tactical", ability: "Sanitize — instantly kills T-2 entities in radius" },
          ].map((op) => (
            <div key={op.name} className="bg-steel-dark/30 border border-steel-light/10 p-4 card-hover">
              <div className="font-mono text-sm font-bold text-foreground mb-1">{op.name}</div>
              <div className="data-label mb-2">{op.role} // {op.class}</div>
              <p className="text-[10px] text-steel-light/60 leading-relaxed">{op.ability}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
