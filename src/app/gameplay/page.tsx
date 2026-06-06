"use client";

import { useState } from "react";
import SectionHeader from "@/components/SectionHeader";

const weapons = [
  { name: "M4A1", class: "Assault Rifle", rpm: 750, mag: 30, note: "Async-Issue" },
  { name: "MK18 CQBR", class: "Carbine", rpm: 800, mag: 30, note: "CQB optimized" },
  { name: "M870 Breacher", class: "Shotgun", rpm: "Pump", mag: 6, note: "Breaching tool" },
  { name: "MP7A1", class: "SMG", rpm: 950, mag: 40, note: "High fire rate" },
  { name: "M110 SASS", class: "DMR", rpm: "Semi", mag: 20, note: "Precision" },
  { name: "M9A3", class: "Pistol", rpm: "Semi", mag: 15, note: "Sidearm" },
  { name: "Combat Knife", class: "Melee", rpm: "—", mag: "—", note: "Silent" },
];

const sanityLevels = [
  { range: "100%", label: "Calm", effect: "Normal operation" },
  { range: "75%", label: "Uneasy", effect: "Slight desaturation, distant whispers" },
  { range: "50%", label: "Distressed", effect: "Vignette darkening, clearer whispers, heartbeat audible, squad callouts delayed" },
  { range: "25%", label: "Breaking", effect: "Visual distortions, phantom movement, whispered dialogue, false UI indicators" },
  { range: "0%", label: "Broken", effect: "Black-and-white vision, hallucinated enemies indistinguishable from real, AI squad members may flee or attack" },
];

const tacticalDegradation = [
  { level: "Level 0", status: "Full functionality", details: "Squad responsive. Comms clear." },
  { level: "Level 1", status: "Minor degradation", details: "Comms occasionally static. Squad AI hesitates." },
  { level: "Level 2", status: "Significant loss", details: "Formations impossible. Comms break up. Revive time extended to 12s." },
  { level: "Level 4", status: "Critical", details: "Squad AI unreliable. Doppelgangers mimic squad callouts." },
  { level: "Level 11", status: "Near-total failure", details: "No formations. Comms one-way only. Stealth detection nearly impossible." },
];

const difficulties = [
  { name: "RECRUIT", ammo: "2x", health: "2x", desc: "Story mode" },
  { name: "OPERATIVE", ammo: "1x", health: "1x", desc: "Standard" },
  { name: "VETERAN", ammo: "0.5x", health: "1x", desc: "Permadeath for AI" },
  { name: "NIGHTMARE", ammo: "0.25x", health: "1x", desc: "Full permadeath, no UI" },
];

export default function GameplayPage() {
  const [activeTab, setActiveTab] = useState<"combat" | "sanity" | "tactical" | "coop">("combat");

  const tabs = [
    { id: "combat" as const, label: "Combat" },
    { id: "sanity" as const, label: "Sanity" },
    { id: "tactical" as const, label: "Tactical" },
    { id: "coop" as const, label: "Co-op" },
  ];

  return (
    <div className="px-6 md:px-12 lg:px-24 py-16 md:py-24">
      <SectionHeader
        code="04 / GAMEPLAY"
        title="Gameplay Systems"
        subtitle="Realistic combat. Adaptive AI. The tonal shift mechanic."
      />

      {/* Tab navigation — minimal pills */}
      <div className="flex gap-0.5 mb-16">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-1.5 font-mono text-[10px] tracking-[0.12em] transition-all duration-300 rounded-full ${
              activeTab === tab.id
                ? "text-amber bg-amber/8"
                : "text-foreground/20 hover:text-foreground/40"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Combat tab */}
      {activeTab === "combat" && (
        <div className="space-y-16">
          {/* Core mechanics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-mono text-[10px] text-foreground/20 tracking-[0.2em] mb-3">MOVEMENT</h3>
              <ul className="space-y-1.5 text-[12px] text-foreground/30 font-light">
                <li>WASD + sprint (15 stamina/sec, entities hear from 2x range)</li>
                <li>Crouch + prone + vault/mantle + combat roll + lean</li>
                <li>Stamina pool: 100 units, 10 units/sec regen</li>
                <li>Yellow carpet = silent; fluid = -30% speed; metal grating = +50% detection</li>
              </ul>
            </div>
            <div>
              <h3 className="font-mono text-[10px] text-foreground/20 tracking-[0.2em] mb-3">HEALTH</h3>
              <ul className="space-y-1.5 text-[12px] text-foreground/30 font-light">
                <li>100 HP base, no natural regeneration</li>
                <li>Bleeding: 30% chance, 2 HP/sec</li>
                <li>Injury states: Functional (100–75%) → Crawling (25–0%)</li>
                <li>Field Dressing, Medkit (+40), Trauma Kit (+70), Stabilizer (+25 HP, +20 sanity)</li>
              </ul>
            </div>
            <div>
              <h3 className="font-mono text-[10px] text-foreground/20 tracking-[0.2em] mb-3">DAMAGE MODEL</h3>
              <ul className="space-y-1.5 text-[12px] text-foreground/30 font-light">
                <li>Hit-location based: Head = instant (T-2/T-3), Limb = 40%, Torso = 100%</li>
                <li>Material-based penetration</li>
                <li>Weapon jam: 2% base chance per shot</li>
                <li>Magazine-based reloading (tactical vs. empty)</li>
              </ul>
            </div>
          </div>

          {/* Weapon roster */}
          <div>
            <h3 className="font-mono text-[10px] text-foreground/20 tracking-[0.2em] mb-6">WEAPON ROSTER</h3>
            <div className="space-y-0">
              {weapons.map((w, i) => (
                <div key={i} className="flex items-center gap-6 py-3 border-b border-foreground/[0.04]">
                  <span className="text-[13px] text-foreground/50 w-32 shrink-0">{w.name}</span>
                  <span className="text-[12px] text-foreground/20 w-24 shrink-0">{w.class}</span>
                  <span className="font-mono text-[11px] text-foreground/20 w-16 shrink-0 tabular-nums">{w.rpm}</span>
                  <span className="font-mono text-[11px] text-foreground/20 w-12 shrink-0 tabular-nums">{w.mag}</span>
                  <span className="text-[11px] text-foreground/15">{w.note}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Suppression & Stealth */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-mono text-[10px] text-foreground/20 tracking-[0.2em] mb-3">SUPPRESSION</h3>
              <p className="text-[12px] text-foreground/30 font-light leading-relaxed">
                Near-misses cause screen blur, accuracy penalty, movement penalty. 3+ suppressors cause Pinning.
              </p>
            </div>
            <div>
              <h3 className="font-mono text-[10px] text-foreground/20 tracking-[0.2em] mb-3">STEALTH</h3>
              <p className="text-[12px] text-foreground/30 font-light leading-relaxed">
                Entity detection states: Unaware → Alerted → Searching → Combat. Sound propagation: walking on carpet = 5m, unsuppressed gunshot = 60m.
              </p>
            </div>
          </div>

          {/* Difficulty */}
          <div>
            <h3 className="font-mono text-[10px] text-foreground/20 tracking-[0.2em] mb-6">DIFFICULTY PRESETS</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {difficulties.map((d) => (
                <div key={d.name}>
                  <h4 className="text-[13px] font-medium text-foreground/50 mb-1">{d.name}</h4>
                  <span className="font-mono text-[9px] text-foreground/15 tracking-[0.15em] block mb-2">{d.desc}</span>
                  <div className="space-y-0.5 font-mono text-[10px] text-foreground/15">
                    <div>AMMO: {d.ammo}</div>
                    <div>HEALTH: {d.health}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Sanity tab */}
      {activeTab === "sanity" && (
        <div className="space-y-16">
          {/* Sanity levels */}
          <div>
            <h3 className="font-mono text-[10px] text-foreground/20 tracking-[0.2em] mb-6">SANITY DEGRADATION</h3>
            <div className="space-y-0">
              {sanityLevels.map((s, i) => (
                <div key={i} className="flex items-center gap-6 py-4 border-b border-foreground/[0.04]">
                  <span className="font-mono text-lg text-foreground/40 w-16 shrink-0 tabular-nums">{s.range}</span>
                  <span className="font-mono text-[10px] text-foreground/20 w-24 shrink-0 tracking-wider">{s.label}</span>
                  <p className="text-[12px] text-foreground/30 font-light flex-1">{s.effect}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Proximity */}
          <div>
            <h3 className="font-mono text-[10px] text-foreground/20 tracking-[0.2em] mb-6">SQUAD SANITY PROXIMITY</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { members: "1 nearby", rate: "75% damage rate" },
                { members: "2 nearby", rate: "50% damage rate" },
                { members: "3+ nearby", rate: "40% damage rate" },
                { members: "Alone", rate: "150% damage rate" },
              ].map((p, i) => (
                <div key={i}>
                  <span className="text-lg font-light text-foreground/40 block">{p.members}</span>
                  <span className="font-mono text-[10px] text-foreground/15">{p.rate}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Hallucinations */}
          <div>
            <h3 className="font-mono text-[10px] text-foreground/20 tracking-[0.2em] mb-4">HALLUCINATION TYPES</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {[
                "Visual peripheral movement",
                "Phantom entities",
                "Environmental layout changes",
                "Doppelgangers of self/squad",
                "Audio whispers (including reading the player's real OS name)",
                "False callouts",
                "False UI elements",
              ].map((h, i) => (
                <span key={i} className="text-[12px] text-foreground/25 font-light">
                  {h}
                </span>
              ))}
            </div>
          </div>

          {/* Reality Check */}
          <div>
            <h3 className="font-mono text-[10px] text-foreground/20 tracking-[0.2em] mb-3">THE &quot;REALITY CHECK&quot; MECHANIC</h3>
            <p className="text-[12px] text-foreground/30 font-light leading-relaxed max-w-2xl">
              Players can verify reality by checking squad status, firing at phantoms, or using Async scanning equipment — but these take time, and standing still is dangerous.
            </p>
          </div>
        </div>
      )}

      {/* Tactical tab */}
      {activeTab === "tactical" && (
        <div className="space-y-16">
          {/* Command wheel */}
          <div>
            <h3 className="font-mono text-[10px] text-foreground/20 tracking-[0.2em] mb-4">TACTICAL COMMAND WHEEL (Hold Q)</h3>
            <div className="flex flex-wrap gap-3">
              {["Move To", "Hold", "Breach", "Cover Me", "Search", "Regroup"].map((cmd) => (
                <span key={cmd} className="px-4 py-2 font-mono text-[11px] text-foreground/30 bg-foreground/[0.02] border border-foreground/[0.04]">
                  {cmd}
                </span>
              ))}
            </div>
          </div>

          {/* Tactical degradation */}
          <div>
            <h3 className="font-mono text-[10px] text-foreground/20 tracking-[0.2em] mb-6">TACTICAL DEGRADATION (THE TONAL SHIFT)</h3>
            <div className="space-y-0">
              {tacticalDegradation.map((t, i) => (
                <div key={i} className="flex items-start gap-6 py-4 border-b border-foreground/[0.04]">
                  <span className="font-mono text-[11px] text-foreground/25 w-20 shrink-0">{t.level}</span>
                  <span className="font-mono text-[10px] text-foreground/20 w-32 shrink-0 tracking-wider">{t.status}</span>
                  <p className="text-[12px] text-foreground/30 font-light flex-1">{t.details}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Advanced commands */}
          <div>
            <h3 className="font-mono text-[10px] text-foreground/20 tracking-[0.2em] mb-4">ADVANCED COMMANDS (Level 1+)</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <span className="font-mono text-[9px] text-foreground/15 tracking-[0.15em] block mb-1">FORMATION</span>
                <p className="text-[12px] text-foreground/30 font-light">Diamond / Wedge / Column</p>
              </div>
              <div>
                <span className="font-mono text-[9px] text-foreground/15 tracking-[0.15em] block mb-1">LIGHT DISCIPLINE</span>
                <p className="text-[12px] text-foreground/30 font-light">Toggle on/off</p>
              </div>
              <div>
                <span className="font-mono text-[9px] text-foreground/15 tracking-[0.15em] block mb-1">FIRE CONTROL</span>
                <p className="text-[12px] text-foreground/30 font-light">Hold / Free</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Co-op tab */}
      {activeTab === "coop" && (
        <div className="space-y-16">
          {/* Modes */}
          <div>
            <h3 className="font-mono text-[10px] text-foreground/20 tracking-[0.2em] mb-6">MULTIPLAYER MODES</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                { name: "Cooperative Campaign", players: "2–4", desc: "Full campaign playable with friends. Enemy count +50% per player. Shared resource pool." },
                { name: "Operation Mode", players: "1–4", desc: "Procedural missions. 6 types: Recon, Retrieval, Containment, Survival, Escort, Sanitize." },
                { name: "Containment Mode", players: "1–4", desc: "Horde-style survival. 10/20/Endless waves. 4 arena types." },
                { name: "\"The Watcher\" Mode", players: "2–5", desc: "Asymmetrical — one player is an entity controller (top-down view), 2–4 players are the squad." },
              ].map((mode) => (
                <div key={mode.name}>
                  <div className="flex items-baseline gap-3 mb-1">
                    <h4 className="text-[13px] font-medium text-foreground/50">{mode.name}</h4>
                    <span className="font-mono text-[9px] text-foreground/15">{mode.players}</span>
                  </div>
                  <p className="text-[12px] text-foreground/25 font-light leading-relaxed">{mode.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Comms degradation */}
          <div>
            <h3 className="font-mono text-[10px] text-foreground/20 tracking-[0.2em] mb-4">CO-OP COMMS DEGRADATION</h3>
            <div className="space-y-0">
              {[
                { level: "Levels 0–1", status: "Full quality voice chat" },
                { level: "Level 2", status: "Voice chat breaks up at >10m distance" },
                { level: "Level 4", status: "Intermittent drops with 'fake' pre-recorded messages" },
                { level: "Level 11", status: "Whisper range only" },
              ].map((d, i) => (
                <div key={i} className="flex items-center gap-6 py-3 border-b border-foreground/[0.04]">
                  <span className="font-mono text-[11px] text-foreground/25 w-20 shrink-0">{d.level}</span>
                  <span className="text-[12px] text-foreground/30 font-light">{d.status}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Shared hallucinations */}
          <div>
            <h3 className="font-mono text-[10px] text-foreground/20 tracking-[0.2em] mb-3">SHARED HORROR MECHANICS</h3>
            <ul className="space-y-1.5 text-[12px] text-foreground/30 font-light">
              <li>Shared Hallucinations — All players in proximity may experience the same hallucination</li>
              <li>Fake Co-op Messages — During voice chat drops, pre-recorded lines play ("I'm right behind you" when teammate is 50m away)</li>
              <li>Squad Depletion Score — Score thins as teammates are lost — music gets lonelier</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
