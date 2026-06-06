"use client";

import Link from "next/link";
import SectionHeader from "@/components/SectionHeader";
import DataCard from "@/components/DataCard";

const features = [
  {
    title: "Procedural Geometry Engine",
    desc: "Real-time corridor rearrangement, room duplication, and spatial impossibility using UE5 Nanite and procedural generation.",
    tech: ["Nanite", "Procedural Gen", "Custom Blueprints"],
    relatedLevels: "/levels",
  },
  {
    title: "Adaptive AI Director",
    desc: "Monitors player stress levels, squad dynamics, and progression to dynamically adjust entity spawns, pacing, and environmental events.",
    tech: ["Behavior Trees", "ML Integration", "UE5 AI"],
    relatedCharacters: "/characters",
  },
  {
    title: "Stress Response System",
    desc: "Physiological simulation of fear responses — heart rate, pupil dilation, tremors, and vocal changes based on proximity and exposure.",
    tech: ["Animation Blueprints", "Audio Synthesis", "Post-Processing"],
    relatedGameplay: "/gameplay",
  },
  {
    title: "Realistic Ballistics",
    desc: "Full bullet physics, ricochet simulation, and environmental destruction. Ammunition is scarce and every shot matters.",
    tech: ["Chaos Physics", "Destruction", "Ray Tracing"],
    relatedGameplay: "/gameplay",
  },
  {
    title: "Adaptive Sound Design",
    desc: "Procedural audio that responds to player state. Heartbeats increase under stress, ambient sounds distort near entities.",
    tech: ["MetaSounds", "FMOD Integration", "Spatial Audio"],
    relatedLevels: "/levels",
  },
];

const challenges = [
  { challenge: "Procedural geometry performance on mid-range hardware", risk: "HIGH", approach: "Aggressive LOD, Nanite optimization, platform-specific profiles" },
  { challenge: "Co-op latency in horror-critical moments", risk: "HIGH", approach: "Client-side prediction, server reconciliation, lag compensation" },
  { challenge: "AI director balance between challenge and frustration", risk: "MEDIUM", approach: "Playtesting across 100+ sessions, adaptive difficulty curves" },
  { challenge: "Cross-platform parity (PC/PS5/Xbox)", risk: "MEDIUM", approach: "Early platform testing, scalable quality presets" },
  { challenge: "Performance while maintaining atmosphere", risk: "HIGH", approach: "Dynamic resolution, frame generation, optimized lighting" },
];

export default function TechnicalPage() {
  return (
    <div className="px-6 md:px-12 lg:px-24 py-16 md:py-24">
      <SectionHeader
        code="06 / TECHNICAL"
        title="Technical Specifications"
        subtitle="Unreal Engine 5.4+. Nanite, Lumen, Chaos Physics, MetaSounds."
      />

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-x-8 gap-y-6 mb-20">
        <DataCard label="Engine" value="UE5" sub="5.4+" />
        <DataCard label="Renderer" value="DX12" sub="Ray Tracing" />
        <DataCard label="Physics" value="CHAOS" sub="Real-time" />
        <DataCard label="Audio" value="META" sub="Sounds" />
        <DataCard label="AI" value="BEHAVIOR" sub="Trees + ML" />
        <DataCard label="Net" value="DEDI" sub="Servers" />
      </div>

      {/* Core Features */}
      <div className="mb-20">
        <h3 className="font-mono text-[10px] text-foreground/65 tracking-[0.2em] mb-8">CORE FEATURES</h3>
        <div className="space-y-0">
          {features.map((f, i) => (
            <div key={i} className="py-6 border-b border-foreground/[0.08]">
              <div className="flex flex-col md:flex-row md:items-start gap-4">
                <div className="flex-1">
                  <h4 className="text-[14px] font-medium text-foreground/85 mb-1">{f.title}</h4>
                  <p className="text-[13px] text-foreground/75 font-light leading-relaxed max-w-xl">{f.desc}</p>
                </div>
                <div className="flex flex-wrap gap-2 shrink-0">
                  {f.tech.map((t) => (
                    <span key={t} className="font-mono text-[9px] text-amber/45 px-2 py-0.5 bg-amber/[0.05] tracking-wider">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              {f.relatedLevels && (
                <div className="flex gap-4 mt-3">
                  <Link href={f.relatedLevels} className="font-mono text-[9px] text-foreground/55 hover:text-amber/55 transition-colors tracking-wider">
                    {f.relatedLevels === "/levels" ? "LEVELS" : f.relatedLevels === "/characters" ? "CHARACTERS" : "GAMEPLAY"} &rarr;
                  </Link>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Platform Targets */}
      <div className="mb-20">
        <h3 className="font-mono text-[10px] text-foreground/65 tracking-[0.2em] mb-6">PLATFORM TARGETS</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { platform: "PC", specs: "Recommended: RTX 3070 / RX 6800, 16GB RAM, SSD. Target: 1440p60.", status: "PRIMARY" },
            { platform: "PS5", specs: "Native port. Ray tracing, DualSense haptics, 3D audio. Target: 4K30 / 1440p60.", status: "DAY ONE" },
            { platform: "XBOX SERIES X|S", specs: "Optimized. Smart Delivery, Game Pass consideration. Target: 4K30 / 1080p60.", status: "DAY ONE" },
          ].map((p) => (
            <div key={p.platform} className="py-4 border-b border-foreground/[0.08]">
              <div className="flex items-baseline gap-3 mb-2">
                <span className="text-[14px] text-foreground/75 font-medium">{p.platform}</span>
                <span className="font-mono text-[9px] text-amber/45 tracking-wider">{p.status}</span>
              </div>
              <p className="text-[12px] text-foreground/75 font-light leading-relaxed">{p.specs}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Technical Challenges */}
      <div className="mb-20">
        <h3 className="font-mono text-[10px] text-foreground/65 tracking-[0.2em] mb-8">TECHNICAL CHALLENGES</h3>
        <div className="space-y-4">
          {challenges.map((c, i) => (
            <div key={i} className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6 py-3 border-b border-foreground/[0.08]">
              <span className="text-[13px] text-foreground/65 flex-1">{c.challenge}</span>
              <span className={`font-mono text-[9px] tracking-[0.15em] ${
                c.risk === "HIGH" ? "text-amber/50" : "text-foreground/65"
              }`}>
                {c.risk}
              </span>
              <span className="text-[12px] text-foreground/65 font-light max-w-xs">{c.approach}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Cross-links */}
      <div className="mt-16 pt-8 border-t border-foreground/[0.12]">
        <div className="flex flex-wrap gap-6">
          <Link href="/gameplay" className="font-mono text-[10px] text-foreground/55 hover:text-amber/50 transition-colors tracking-wider">
            GAMEPLAY SYSTEMS &rarr;
          </Link>
          <Link href="/levels" className="font-mono text-[10px] text-foreground/55 hover:text-amber/50 transition-colors tracking-wider">
            LEVEL DESIGN &rarr;
          </Link>
          <Link href="/characters" className="font-mono text-[10px] text-foreground/55 hover:text-amber/50 transition-colors tracking-wider">
            CHARACTER AI &rarr;
          </Link>
          <Link href="/overview" className="font-mono text-[10px] text-foreground/55 hover:text-amber/50 transition-colors tracking-wider">
            PROJECT OVERVIEW &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}
