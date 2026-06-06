"use client";

import SectionHeader from "@/components/SectionHeader";
import { Monitor, Cpu, Volume2, Palette, Layers, Wrench } from "lucide-react";

const platforms = [
  { platform: "PC (High)", res: "1440p-4K", fps: "60fps", quality: "Epic" },
  { platform: "PC (Recommended)", res: "1080p-1440p", fps: "60fps", quality: "High" },
  { platform: "PC (Minimum)", res: "1080p", fps: "30fps", quality: "Medium" },
  { platform: "PS5", res: "Dynamic 4K", fps: "60/30fps", quality: "High-Epic" },
  { platform: "Xbox Series X", res: "Dynamic 4K", fps: "60/30fps", quality: "High-Epic" },
  { platform: "Xbox Series S", res: "1080p-1440p", fps: "60fps", quality: "Medium" },
];

const ue5Features = [
  { name: "Nanite", desc: "High-detail environmental geometry without performance cost", icon: <Layers size={14} /> },
  { name: "Lumen", desc: "Dynamic global illumination — complete darkness when lights fail", icon: <Palette size={14} /> },
  { name: "Virtual Shadow Maps", desc: "Sharp, non-flickering shadows", icon: <Monitor size={14} /> },
  { name: "MetaSounds", desc: "Procedural audio for The Hum and environmental ambience", icon: <Volume2 size={14} /> },
  { name: "World Partition", desc: "Large world streaming for Level 11's infinite city", icon: <Layers size={14} /> },
  { name: "Chaos Physics", desc: "Destructible cover, ragdolls, environmental interactions", icon: <Cpu size={14} /> },
];

const customSystems = [
  { name: "Spatial Distortion Manager", type: "C++", desc: "Procedural room rearrangement without player detection" },
  { name: "Sanity Manager", type: "C++", desc: "Per-character sanity tracking with visual/audio corruption" },
  { name: "Entity Director", type: "C++", desc: "AI-driven entity spawning and behavior orchestration" },
  { name: "Dialogue Manager", type: "C++", desc: "Context-aware dialogue with 800+ conditional variants" },
  { name: "Inventory System", type: "C++", desc: "Magazine-based, weight-aware, injury-integrated" },
  { name: "Save System", type: "C++", desc: "Persistent world state including psychological degradation" },
  { name: "Co-op Netcode", type: "C++", desc: "Dedicated server architecture for 2-4 player co-op" },
];

const blueprintSystems = [
  "Command Wheel",
  "Minimap/Radar",
  "HUD System",
  "Level Streaming",
  "Interaction System",
  "Cinematic Sequences",
];

const soundDesign = [
  {
    layer: "TACTICAL",
    timing: "Early Game",
    desc: "Radio chatter, weapon mechanics, footsteps with reverb, equipment beeps",
    color: "#27ae60",
  },
  {
    layer: "ENVIRONMENTAL",
    timing: "Mid Game",
    desc: "Fluorescent buzz shifting pitch, distant sounds with no source, the Hum",
    color: "#f39c12",
  },
  {
    layer: "PSYCHOLOGICAL",
    timing: "Late Game",
    desc: "Heartbeat synced to controller, whispered dialogue, audio in one ear only",
    color: "#e74c3c",
  },
];

const humFrequencies = [
  { level: "Level 0", hz: "60Hz", note: "Fluorescent buzz" },
  { level: "Level 1", hz: "50Hz", note: "Industrial hum" },
  { level: "Level 2", hz: "40Hz", note: "Felt in chest" },
  { level: "Level 4", hz: "Variable", note: "With whispers" },
  { level: "Level 11", hz: "Infrasonic", note: "Physically felt as pressure" },
];

const artProcessors = [
  "Sanity-based visual corruption (desaturation, vignette, chromatic aberration, fisheye distortion)",
  "Level-specific effects (film grain, dust particles, water droplets, monitor flicker, infinite depth of field)",
  "Progressive character deterioration (5 visual states: Clean → Dusty → Damaged → Broken → Ruined)",
  "UE5 Nanite + Lumen for real-time environmental distortion",
];

const dualSense = [
  { feature: "Adaptive Triggers", desc: "Weapon jam resistance and heartbeat pulse" },
  { feature: "Haptic Feedback", desc: "The Hum and entity proximity" },
  { feature: "Tempest Engine", desc: "3D audio positioning" },
];

export default function TechnicalPage() {
  return (
    <div className="px-6 md:px-16 lg:px-24 py-16 md:py-24">
      <SectionHeader
        code="06"
        title="TECHNICAL & AUDIO-VISUAL"
        subtitle="Unreal Engine 5.4+. Dedicated servers. Adaptive horror."
      />

      {/* Engine */}
      <div className="mb-8">
        <h3 className="font-mono text-xs text-amber-dim tracking-[0.2em] mb-4">ENGINE & CONFIGURATION</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-4">
          {[
            { label: "ENGINE", value: "UE 5.4+" },
            { label: "RENDERER", value: "Deferred" },
            { label: "NETCODE", value: "Dedicated" },
            { label: "AUDIO", value: "Wwise" },
            { label: "SCM", value: "Perforce" },
            { label: "PHYSICS", value: "Chaos" },
          ].map((s) => (
            <div key={s.label} className="bg-steel-dark/30 border border-steel-light/10 p-3 corner-brackets">
              <span className="data-label block mb-1">{s.label}</span>
              <span className="font-mono text-sm font-bold text-amber">{s.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* UE5 Features */}
      <div className="mb-8">
        <h3 className="font-mono text-xs text-amber-dim tracking-[0.2em] mb-4">UE5 FEATURES</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {ue5Features.map((f) => (
            <div key={f.name} className="bg-steel-dark/30 border border-steel-light/10 p-4 card-hover">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-amber-dim">{f.icon}</span>
                <span className="font-mono text-xs tracking-wider text-foreground">{f.name}</span>
              </div>
              <p className="text-[11px] text-steel-light/60 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Performance targets */}
      <div className="mb-8">
        <h3 className="font-mono text-xs text-amber-dim tracking-[0.2em] mb-4">PERFORMANCE TARGETS</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-steel-light/20">
                <th className="text-left font-mono text-[10px] text-amber-dim tracking-wider py-2 pr-4">PLATFORM</th>
                <th className="text-left font-mono text-[10px] text-amber-dim tracking-wider py-2 pr-4">RESOLUTION</th>
                <th className="text-left font-mono text-[10px] text-amber-dim tracking-wider py-2 pr-4">FRAMERATE</th>
                <th className="text-left font-mono text-[10px] text-amber-dim tracking-wider py-2">QUALITY</th>
              </tr>
            </thead>
            <tbody>
              {platforms.map((p, i) => (
                <tr key={i} className="border-b border-steel-light/5">
                  <td className="py-2.5 pr-4 font-mono text-foreground/80">{p.platform}</td>
                  <td className="py-2.5 pr-4 text-steel-light/60">{p.res}</td>
                  <td className="py-2.5 pr-4 font-mono text-amber-dim/60">{p.fps}</td>
                  <td className="py-2.5 text-steel-light/60">{p.quality}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Custom Systems */}
      <div className="mb-8">
        <h3 className="font-mono text-xs text-amber-dim tracking-[0.2em] mb-4">
          <Wrench size={12} className="inline mr-2" />
          CUSTOM C++ SYSTEMS
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {customSystems.map((s) => (
            <div key={s.name} className="bg-steel-dark/30 border border-steel-light/10 p-4 card-hover">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-mono text-xs tracking-wider text-foreground">{s.name}</span>
                <span className="font-mono text-[8px] px-1.5 py-0.5 bg-amber/10 text-amber-dim">C++</span>
              </div>
              <p className="text-[11px] text-steel-light/60">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Blueprint Systems */}
      <div className="mb-8">
        <h3 className="font-mono text-xs text-amber-dim tracking-[0.2em] mb-4">BLUEPRINT SYSTEMS</h3>
        <div className="flex flex-wrap gap-2">
          {blueprintSystems.map((b) => (
            <span key={b} className="px-3 py-1.5 bg-steel-dark/50 border border-steel-light/10 font-mono text-[10px] text-steel-light/60">
              {b}
            </span>
          ))}
        </div>
      </div>

      {/* Sound Design */}
      <div className="mb-8">
        <h3 className="font-mono text-xs text-amber-dim tracking-[0.2em] mb-4">THREE-LAYER HORROR SOUND MODEL</h3>
        <div className="space-y-2">
          {soundDesign.map((s, i) => (
            <div key={i} className="flex items-center gap-4 bg-steel-dark/30 border p-4" style={{ borderColor: `${s.color}20` }}>
              <div className="w-2 h-8 rounded-full" style={{ background: s.color }} />
              <div className="w-28 shrink-0">
                <span className="font-mono text-[10px] tracking-wider" style={{ color: s.color }}>{s.layer}</span>
                <div className="font-mono text-[9px] text-steel-light/40">{s.timing}</div>
              </div>
              <p className="text-xs text-foreground/70">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* The Hum */}
      <div className="mb-8">
        <h3 className="font-mono text-xs text-amber-dim tracking-[0.2em] mb-4">THE HUM — FREQUENCY PROGRESSION</h3>
        <div className="flex items-end gap-2 h-32">
          {humFrequencies.map((h, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-1">
              <span className="font-mono text-[9px] text-amber-dim">{h.hz}</span>
              <div
                className="w-full bg-amber/20 rounded-t"
                style={{ height: `${80 - i * 15}px` }}
              />
              <span className="font-mono text-[8px] text-steel-light/40">{h.level}</span>
            </div>
          ))}
        </div>
        <p className="mt-2 text-[10px] text-steel-light/50 font-mono text-center">
          Each entity has unique sound signatures. The Smiler is absolutely silent (horror of silence).
          The Citizens have perfectly normal footsteps but no breathing, no rustling — the absence of expected human sounds.
        </p>
      </div>

      {/* Visual Post-Processing */}
      <div className="mb-8">
        <h3 className="font-mono text-xs text-amber-dim tracking-[0.2em] mb-4">VISUAL POST-PROCESSING</h3>
        <div className="space-y-1.5">
          {artProcessors.map((a, i) => (
            <div key={i} className="flex items-start gap-2 text-xs text-foreground/70">
              <span className="text-amber-dim/40 mt-0.5">▸</span>
              {a}
            </div>
          ))}
        </div>
      </div>

      {/* PS5 DualSense */}
      <div className="mb-8">
        <h3 className="font-mono text-xs text-amber-dim tracking-[0.2em] mb-4">PS5 DUALSENSE</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {dualSense.map((d) => (
            <div key={d.feature} className="bg-steel-dark/30 border border-steel-light/10 p-4">
              <span className="font-mono text-xs tracking-wider text-foreground block mb-1">{d.feature}</span>
              <p className="text-[11px] text-steel-light/60">{d.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Technical Challenges */}
      <div>
        <h3 className="font-mono text-xs text-amber-dim tracking-[0.2em] mb-4">KEY TECHNICAL CHALLENGES</h3>
        <div className="space-y-3">
          {[
            { challenge: "Procedural Room Rearrangement", desc: "Seamlessly swapping room modules without player noticing — room cells with standardized connections, visual distraction during swap." },
            { challenge: "Co-op Sanity Synchronization", desc: "All players experience same hallucinations simultaneously — server-authoritative sanity, seed-based generation." },
            { challenge: "Level 11 Infinite City Streaming", desc: "World Partition with aggressive LOD, procedural building generation at distance, handcrafted 'hero' areas near player." },
            { challenge: "Tonal Shift Implementation", desc: "Hundreds of small variable adjustments over time, no single 'switch'. The transformation must feel organic." },
          ].map((c, i) => (
            <div key={i} className="bg-steel-dark/30 border border-tactical-red/10 p-4">
              <h4 className="font-mono text-xs tracking-wider text-tactical-red mb-1">{c.challenge}</h4>
              <p className="text-xs text-foreground/70 leading-relaxed">{c.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
