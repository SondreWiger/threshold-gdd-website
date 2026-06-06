"use client";

import { useState } from "react";
import SectionHeader from "@/components/SectionHeader";
import { Crosshair, Shield, Brain, Radio, Eye, Zap } from "lucide-react";

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
  { range: "100%", label: "Calm", effect: "Normal operation", color: "#27ae60" },
  { range: "75%", label: "Uneasy", effect: "Slight desaturation, distant whispers", color: "#f39c12" },
  { range: "50%", label: "Distressed", effect: "Vignette darkening, clearer whispers, heartbeat audible, squad callouts delayed", color: "#e67e22" },
  { range: "25%", label: "Breaking", effect: "Visual distortions, phantom movement, whispered dialogue, false UI indicators", color: "#e74c3c" },
  { range: "0%", label: "Broken", effect: "Black-and-white vision, hallucinated enemies indistinguishable from real, AI squad members may flee or attack", color: "#c0392b" },
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
    { id: "combat" as const, label: "COMBAT", icon: <Crosshair size={14} /> },
    { id: "sanity" as const, label: "SANITY", icon: <Brain size={14} /> },
    { id: "tactical" as const, label: "TACTICAL", icon: <Shield size={14} /> },
    { id: "coop" as const, label: "CO-OP", icon: <Radio size={14} /> },
  ];

  return (
    <div className="px-6 md:px-16 lg:px-24 py-16 md:py-24">
      <SectionHeader
        code="04"
        title="GAMEPLAY SYSTEMS"
        subtitle="Realistic combat. Adaptive AI. The tonal shift mechanic."
      />

      {/* Tab navigation */}
      <div className="flex gap-1 mb-8 overflow-x-auto pb-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 font-mono text-[10px] tracking-[0.2em] whitespace-nowrap transition-all ${
              activeTab === tab.id
                ? "text-amber bg-amber/10 border border-amber/30"
                : "text-steel-light border border-transparent hover:text-amber-dim hover:bg-steel-dark/50"
            }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Combat tab */}
      {activeTab === "combat" && (
        <div className="space-y-8">
          {/* Core mechanics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-steel-dark/30 border border-steel-light/10 p-5 corner-brackets">
              <h3 className="font-mono text-xs text-amber-dim tracking-[0.2em] mb-3">MOVEMENT</h3>
              <ul className="space-y-1.5 text-xs text-foreground/70">
                <li>• WASD + sprint (15 stamina/sec, entities hear from 2x range)</li>
                <li>• Crouch + prone + vault/mantle + combat roll + lean</li>
                <li>• Stamina pool: 100 units, 10 units/sec regen</li>
                <li>• Yellow carpet = silent; fluid = -30% speed; metal grating = +50% detection</li>
              </ul>
            </div>
            <div className="bg-steel-dark/30 border border-steel-light/10 p-5 corner-brackets">
              <h3 className="font-mono text-xs text-amber-dim tracking-[0.2em] mb-3">HEALTH</h3>
              <ul className="space-y-1.5 text-xs text-foreground/70">
                <li>• 100 HP base, no natural regeneration</li>
                <li>• Bleeding: 30% chance, 2 HP/sec</li>
                <li>• Injury states: Functional (100-75%) → Crawling (25-0%)</li>
                <li>• Field Dressing, Medkit (+40), Trauma Kit (+70), Stabilizer (+25 HP, +20 sanity)</li>
              </ul>
            </div>
            <div className="bg-steel-dark/30 border border-steel-light/10 p-5 corner-brackets">
              <h3 className="font-mono text-xs text-amber-dim tracking-[0.2em] mb-3">DAMAGE MODEL</h3>
              <ul className="space-y-1.5 text-xs text-foreground/70">
                <li>• Hit-location based: Head = instant (T-2/T-3), Limb = 40%, Torso = 100%</li>
                <li>• Material-based penetration</li>
                <li>• Weapon jam: 2% base chance per shot</li>
                <li>• Magazine-based reloading (tactical vs. empty)</li>
              </ul>
            </div>
          </div>

          {/* Weapon roster */}
          <div>
            <h3 className="font-mono text-xs text-amber-dim tracking-[0.2em] mb-4">WEAPON ROSTER</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-steel-light/20">
                    <th className="text-left font-mono text-[10px] text-amber-dim tracking-wider py-2 pr-4">WEAPON</th>
                    <th className="text-left font-mono text-[10px] text-amber-dim tracking-wider py-2 pr-4">CLASS</th>
                    <th className="text-left font-mono text-[10px] text-amber-dim tracking-wider py-2 pr-4">RPM</th>
                    <th className="text-left font-mono text-[10px] text-amber-dim tracking-wider py-2 pr-4">MAG</th>
                    <th className="text-left font-mono text-[10px] text-amber-dim tracking-wider py-2">NOTE</th>
                  </tr>
                </thead>
                <tbody>
                  {weapons.map((w, i) => (
                    <tr key={i} className="border-b border-steel-light/5">
                      <td className="py-2.5 pr-4 font-mono text-foreground/80">{w.name}</td>
                      <td className="py-2.5 pr-4 text-steel-light/60">{w.class}</td>
                      <td className="py-2.5 pr-4 font-mono text-amber-dim/60">{w.rpm}</td>
                      <td className="py-2.5 pr-4 font-mono text-steel-light/60">{w.mag}</td>
                      <td className="py-2.5 text-steel-light/40 text-[10px]">{w.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Suppression & Stealth */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-steel-dark/30 border border-steel-light/10 p-5">
              <h3 className="font-mono text-xs text-amber-dim tracking-[0.2em] mb-3">SUPPRESSION</h3>
              <p className="text-xs text-foreground/70 leading-relaxed">
                Near-misses cause screen blur, accuracy penalty, movement penalty. 3+ suppressors cause Pinning.
              </p>
            </div>
            <div className="bg-steel-dark/30 border border-steel-light/10 p-5">
              <h3 className="font-mono text-xs text-amber-dim tracking-[0.2em] mb-3">STEALTH</h3>
              <p className="text-xs text-foreground/70 leading-relaxed">
                Entity detection states: Unaware → Alerted → Searching → Combat. Sound propagation: walking on carpet = 5m, unsuppressed gunshot = 60m.
              </p>
            </div>
          </div>

          {/* Difficulty */}
          <div>
            <h3 className="font-mono text-xs text-amber-dim tracking-[0.2em] mb-4">DIFFICULTY PRESETS</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {difficulties.map((d) => (
                <div key={d.name} className="bg-steel-dark/30 border border-steel-light/10 p-4 card-hover">
                  <div className="font-mono text-xs font-bold text-foreground mb-1">{d.name}</div>
                  <div className="data-label mb-2">{d.desc}</div>
                  <div className="space-y-1 text-[10px] text-steel-light/50 font-mono">
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
        <div className="space-y-8">
          {/* Sanity levels */}
          <div>
            <h3 className="font-mono text-xs text-amber-dim tracking-[0.2em] mb-4">SANITY DEGRADATION</h3>
            <div className="space-y-2">
              {sanityLevels.map((s, i) => (
                <div key={i} className="flex items-center gap-4 bg-steel-dark/30 border border-steel-light/10 p-4">
                  <div className="w-16 shrink-0">
                    <div className="font-mono text-lg font-bold" style={{ color: s.color }}>{s.range}</div>
                  </div>
                  <div className="w-24 shrink-0">
                    <span className="font-mono text-[10px] tracking-wider" style={{ color: s.color }}>{s.label.toUpperCase()}</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-foreground/70">{s.effect}</p>
                  </div>
                  <div className="w-32 shrink-0 hidden md:block">
                    <div className="h-1.5 bg-steel-dark rounded-full overflow-hidden">
                      <div className="h-full rounded-full" style={{ width: `${100 - i * 25}%`, background: s.color }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Proximity */}
          <div className="bg-steel-dark/30 border border-amber/10 p-5 corner-brackets">
            <h3 className="font-mono text-xs text-amber-dim tracking-[0.2em] mb-3">SQUAD SANITY PROXIMITY</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { members: "1 nearby", rate: "75% damage rate" },
                { members: "2 nearby", rate: "50% damage rate" },
                { members: "3+ nearby", rate: "40% damage rate" },
                { members: "Alone", rate: "150% damage rate" },
              ].map((p, i) => (
                <div key={i} className="text-center">
                  <div className="font-mono text-lg font-bold text-amber">{p.members}</div>
                  <div className="font-mono text-[10px] text-steel-light/60">{p.rate}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Hallucinations */}
          <div className="bg-steel-dark/30 border border-steel-light/10 p-5">
            <h3 className="font-mono text-xs text-amber-dim tracking-[0.2em] mb-3">HALLUCINATION TYPES</h3>
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
                <div key={i} className="flex items-center gap-2 text-xs text-foreground/70">
                  <Eye size={10} className="text-tactical-red shrink-0" />
                  {h}
                </div>
              ))}
            </div>
          </div>

          {/* Reality Check */}
          <div className="bg-steel-dark/30 border border-amber/10 p-5">
            <h3 className="font-mono text-xs text-amber-dim tracking-[0.2em] mb-3">THE "REALITY CHECK" MECHANIC</h3>
            <p className="text-xs text-foreground/70 leading-relaxed">
              Players can verify reality by checking squad status, firing at phantoms, or using Async scanning equipment — but these take time, and standing still is dangerous.
            </p>
          </div>
        </div>
      )}

      {/* Tactical tab */}
      {activeTab === "tactical" && (
        <div className="space-y-8">
          {/* Command wheel */}
          <div className="bg-steel-dark/30 border border-steel-light/10 p-5 corner-brackets">
            <h3 className="font-mono text-xs text-amber-dim tracking-[0.2em] mb-3">TACTICAL COMMAND WHEEL (Hold Q)</h3>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
              {["Move To", "Hold", "Breach", "Cover Me", "Search", "Regroup"].map((cmd) => (
                <div key={cmd} className="text-center p-3 bg-steel-dark/50 border border-steel-light/10">
                  <div className="font-mono text-[10px] text-foreground/70">{cmd}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Tactical degradation */}
          <div>
            <h3 className="font-mono text-xs text-amber-dim tracking-[0.2em] mb-4">TACTICAL DEGRADATION (THE TONAL SHIFT)</h3>
            <div className="space-y-2">
              {tacticalDegradation.map((t, i) => (
                <div key={i} className="flex items-start gap-4 bg-steel-dark/30 border border-steel-light/10 p-4">
                  <div className="w-20 shrink-0">
                    <span className="font-mono text-xs text-amber-dim">{t.level}</span>
                  </div>
                  <div className="w-32 shrink-0">
                    <span className={`font-mono text-[10px] tracking-wider ${
                      i === 0 ? "text-tactical-green" :
                      i === 1 ? "text-warning" :
                      i === 2 ? "text-amber" :
                      i === 3 ? "text-tactical-red" :
                      "text-danger"
                    }`}>
                      {t.status.toUpperCase()}
                    </span>
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-foreground/70">{t.details}</p>
                  </div>
                  <div className="w-32 shrink-0 hidden md:block">
                    <div className="h-1.5 bg-steel-dark rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all"
                        style={{
                          width: `${100 - i * 25}%`,
                          background: i === 0 ? "#27ae60" : i === 1 ? "#f39c12" : i === 2 ? "#d4a017" : i === 3 ? "#e74c3c" : "#c0392b",
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Advanced commands */}
          <div className="bg-steel-dark/30 border border-steel-light/10 p-5">
            <h3 className="font-mono text-xs text-amber-dim tracking-[0.2em] mb-3">ADVANCED COMMANDS (Level 1+)</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-foreground/70">
              <div>
                <span className="data-label block mb-1">FORMATION</span>
                <p>Diamond / Wedge / Column</p>
              </div>
              <div>
                <span className="data-label block mb-1">LIGHT DISCIPLINE</span>
                <p>Toggle on/off</p>
              </div>
              <div>
                <span className="data-label block mb-1">FIRE CONTROL</span>
                <p>Hold / Free</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Co-op tab */}
      {activeTab === "coop" && (
        <div className="space-y-8">
          {/* Modes */}
          <div>
            <h3 className="font-mono text-xs text-amber-dim tracking-[0.2em] mb-4">MULTIPLAYER MODES</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { name: "Cooperative Campaign", players: "2-4", desc: "Full campaign playable with friends. Enemy count +50% per player. Shared resource pool." },
                { name: "Operation Mode", players: "1-4", desc: "Procedural missions. 6 types: Recon, Retrieval, Containment, Survival, Escort, Sanitize." },
                { name: "Containment Mode", players: "1-4", desc: "Horde-style survival. 10/20/Endless waves. 4 arena types." },
                { name: "\"The Watcher\" Mode", players: "2-5", desc: "Asymmetrical — one player is an entity controller (top-down view), 2-4 players are the squad." },
              ].map((mode) => (
                <div key={mode.name} className="bg-steel-dark/30 border border-steel-light/10 p-5 card-hover">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-mono text-xs tracking-wider text-foreground">{mode.name}</h4>
                    <span className="font-mono text-[9px] text-amber-dim">{mode.players} PLAYERS</span>
                  </div>
                  <p className="text-xs text-steel-light/70 leading-relaxed">{mode.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Comms degradation */}
          <div className="bg-steel-dark/30 border border-tactical-red/10 p-5">
            <h3 className="font-mono text-xs text-tactical-red tracking-[0.2em] mb-3">
              <Radio size={12} className="inline mr-2" />
              CO-OP COMMS DEGRADATION
            </h3>
            <div className="space-y-2">
              {[
                { level: "Levels 0-1", status: "Full quality voice chat" },
                { level: "Level 2", status: "Voice chat breaks up at >10m distance" },
                { level: "Level 4", status: "Intermittent drops with 'fake' pre-recorded messages" },
                { level: "Level 11", status: "Whisper range only" },
              ].map((d, i) => (
                <div key={i} className="flex items-center gap-4 text-xs">
                  <span className="font-mono text-amber-dim w-20">{d.level}</span>
                  <span className="text-foreground/70">{d.status}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Shared hallucinations */}
          <div className="bg-steel-dark/30 border border-steel-light/10 p-5">
            <h3 className="font-mono text-xs text-amber-dim tracking-[0.2em] mb-3">SHARED HORROR MECHANICS</h3>
            <ul className="space-y-1.5 text-xs text-foreground/70">
              <li>• <strong>Shared Hallucinations:</strong> All players in proximity may experience the same hallucination</li>
              <li>• <strong>Fake Co-op Messages:</strong> During voice chat drops, pre-recorded lines play ("I'm right behind you" when teammate is 50m away)</li>
              <li>• <strong>Squad Depletion Score:</strong> Score thins as teammates are lost — music gets lonelier</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
