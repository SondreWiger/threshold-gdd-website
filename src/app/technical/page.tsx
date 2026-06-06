"use client";

import SectionHeader from "@/components/SectionHeader";

const platforms = [
  { platform: "PC (High)", res: "1440p–4K", fps: "60fps", quality: "Epic" },
  { platform: "PC (Recommended)", res: "1080p–1440p", fps: "60fps", quality: "High" },
  { platform: "PC (Minimum)", res: "1080p", fps: "30fps", quality: "Medium" },
  { platform: "PS5", res: "Dynamic 4K", fps: "60/30fps", quality: "High–Epic" },
  { platform: "Xbox Series X", res: "Dynamic 4K", fps: "60/30fps", quality: "High–Epic" },
  { platform: "Xbox Series S", res: "1080p–1440p", fps: "60fps", quality: "Medium" },
];

const ue5Features = [
  { name: "Nanite", desc: "High-detail environmental geometry without performance cost" },
  { name: "Lumen", desc: "Dynamic global illumination — complete darkness when lights fail" },
  { name: "Virtual Shadow Maps", desc: "Sharp, non-flickering shadows" },
  { name: "MetaSounds", desc: "Procedural audio for The Hum and environmental ambience" },
  { name: "World Partition", desc: "Large world streaming for Level 11's infinite city" },
  { name: "Chaos Physics", desc: "Destructible cover, ragdolls, environmental interactions" },
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

const soundDesign = [
  { layer: "TACTICAL", timing: "Early Game", desc: "Radio chatter, weapon mechanics, footsteps with reverb, equipment beeps" },
  { layer: "ENVIRONMENTAL", timing: "Mid Game", desc: "Fluorescent buzz shifting pitch, distant sounds with no source, the Hum" },
  { layer: "PSYCHOLOGICAL", timing: "Late Game", desc: "Heartbeat synced to controller, whispered dialogue, audio in one ear only" },
];

const humFrequencies = [
  { level: "Level 0", hz: "60Hz", note: "Fluorescent buzz" },
  { level: "Level 1", hz: "50Hz", note: "Industrial hum" },
  { level: "Level 2", hz: "40Hz", note: "Felt in chest" },
  { level: "Level 4", hz: "Variable", note: "With whispers" },
  { level: "Level 11", hz: "Infrasonic", note: "Physically felt as pressure" },
];

export default function TechnicalPage() {
  return (
    <div className="px-6 md:px-12 lg:px-24 py-16 md:py-24">
      <SectionHeader
        code="06 / TECHNICAL"
        title="Technical & Audio-Visual"
        subtitle="Unreal Engine 5.4+. Dedicated servers. Adaptive horror."
      />

      {/* Engine */}
      <div className="mb-16">
        <h3 className="font-mono text-[10px] text-foreground/20 tracking-[0.2em] mb-6">ENGINE & CONFIGURATION</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {[
            { label: "ENGINE", value: "UE 5.4+" },
            { label: "RENDERER", value: "Deferred" },
            { label: "NETCODE", value: "Dedicated" },
            { label: "AUDIO", value: "Wwise" },
            { label: "SCM", value: "Perforce" },
            { label: "PHYSICS", value: "Chaos" },
          ].map((s) => (
            <div key={s.label}>
              <span className="font-mono text-[9px] text-foreground/15 tracking-[0.2em] block mb-1">{s.label}</span>
              <span className="text-lg font-light text-foreground/50">{s.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* UE5 Features */}
      <div className="mb-16">
        <h3 className="font-mono text-[10px] text-foreground/20 tracking-[0.2em] mb-6">UE5 FEATURES</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ue5Features.map((f) => (
            <div key={f.name}>
              <h4 className="text-[13px] font-medium text-foreground/50 mb-1">{f.name}</h4>
              <p className="text-[12px] text-foreground/25 font-light leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Performance targets */}
      <div className="mb-16">
        <h3 className="font-mono text-[10px] text-foreground/20 tracking-[0.2em] mb-6">PERFORMANCE TARGETS</h3>
        <div className="space-y-0">
          {platforms.map((p, i) => (
            <div key={i} className="flex items-center gap-6 py-3 border-b border-foreground/[0.04]">
              <span className="text-[13px] text-foreground/50 w-40 shrink-0">{p.platform}</span>
              <span className="text-[12px] text-foreground/20 w-24 shrink-0">{p.res}</span>
              <span className="font-mono text-[11px] text-foreground/20 w-16 shrink-0 tabular-nums">{p.fps}</span>
              <span className="text-[12px] text-foreground/20">{p.quality}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Custom Systems */}
      <div className="mb-16">
        <h3 className="font-mono text-[10px] text-foreground/20 tracking-[0.2em] mb-6">CUSTOM C++ SYSTEMS</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {customSystems.map((s) => (
            <div key={s.name}>
              <div className="flex items-baseline gap-2 mb-1">
                <h4 className="text-[13px] font-medium text-foreground/50">{s.name}</h4>
                <span className="font-mono text-[8px] text-foreground/15 tracking-wider">{s.type}</span>
              </div>
              <p className="text-[12px] text-foreground/25 font-light">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Sound Design */}
      <div className="mb-16">
        <h3 className="font-mono text-[10px] text-foreground/20 tracking-[0.2em] mb-6">THREE-LAYER HORROR SOUND MODEL</h3>
        <div className="space-y-0">
          {soundDesign.map((s, i) => (
            <div key={i} className="flex items-start gap-6 py-4 border-b border-foreground/[0.04]">
              <div className="w-1 h-8 bg-foreground/10 shrink-0" />
              <div className="w-28 shrink-0">
                <span className="font-mono text-[10px] text-foreground/25 tracking-wider block">{s.layer}</span>
                <span className="font-mono text-[9px] text-foreground/10">{s.timing}</span>
              </div>
              <p className="text-[12px] text-foreground/30 font-light">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* The Hum */}
      <div className="mb-16">
        <h3 className="font-mono text-[10px] text-foreground/20 tracking-[0.2em] mb-6">THE HUM — FREQUENCY PROGRESSION</h3>
        <div className="flex items-end gap-2 h-24">
          {humFrequencies.map((h, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-1">
              <span className="font-mono text-[9px] text-foreground/20">{h.hz}</span>
              <div
                className="w-full bg-foreground/[0.06] rounded-t"
                style={{ height: `${80 - i * 15}px` }}
              />
              <span className="font-mono text-[8px] text-foreground/10">{h.level}</span>
            </div>
          ))}
        </div>
        <p className="mt-3 text-[10px] text-foreground/15 font-mono leading-relaxed">
          Each entity has unique sound signatures. The Smiler is absolutely silent (horror of silence).
          The Citizens have perfectly normal footsteps but no breathing, no rustling — the absence of expected human sounds.
        </p>
      </div>

      {/* PS5 DualSense */}
      <div className="mb-16">
        <h3 className="font-mono text-[10px] text-foreground/20 tracking-[0.2em] mb-6">PS5 DUALSENSE</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { feature: "Adaptive Triggers", desc: "Weapon jam resistance and heartbeat pulse" },
            { feature: "Haptic Feedback", desc: "The Hum and entity proximity" },
            { feature: "Tempest Engine", desc: "3D audio positioning" },
          ].map((d) => (
            <div key={d.feature}>
              <span className="text-[13px] font-medium text-foreground/50 block mb-1">{d.feature}</span>
              <p className="text-[12px] text-foreground/25 font-light">{d.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Technical Challenges */}
      <div>
        <h3 className="font-mono text-[10px] text-foreground/20 tracking-[0.2em] mb-6">KEY TECHNICAL CHALLENGES</h3>
        <div className="space-y-6">
          {[
            { challenge: "Procedural Room Rearrangement", desc: "Seamlessly swapping room modules without player noticing — room cells with standardized connections, visual distraction during swap." },
            { challenge: "Co-op Sanity Synchronization", desc: "All players experience same hallucinations simultaneously — server-authoritative sanity, seed-based generation." },
            { challenge: "Level 11 Infinite City Streaming", desc: "World Partition with aggressive LOD, procedural building generation at distance, handcrafted 'hero' areas near player." },
            { challenge: "Tonal Shift Implementation", desc: "Hundreds of small variable adjustments over time, no single 'switch'. The transformation must feel organic." },
          ].map((c, i) => (
            <div key={i}>
              <h4 className="text-[13px] font-medium text-foreground/50 mb-1">{c.challenge}</h4>
              <p className="text-[12px] text-foreground/25 font-light leading-relaxed max-w-2xl">{c.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
