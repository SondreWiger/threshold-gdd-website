"use client";

import SectionHeader from "@/components/SectionHeader";
import { Calendar, Users, Target, TrendingUp } from "lucide-react";

const phases = [
  {
    phase: 1,
    name: "Prototype",
    months: "Months 1-3",
    dates: "Apr-Jun 2026",
    team: "8-12",
    goal: "Validate core mechanics, playable Level 0 slice (10-15 min)",
    color: "#27ae60",
    milestones: [
      "Core movement and combat prototype",
      "Basic squad AI command system",
      "Level 0 playable slice (10-15 min)",
      "Sanity system proof of concept",
      "Entity AI behavior tree foundation",
    ],
  },
  {
    phase: 2,
    name: "Vertical Slice",
    months: "Months 4-6",
    dates: "Jul-Sep 2026",
    team: "15-20",
    goal: "Full Level 0+1, tonal shift demonstrated, 3 entities, 5 characters",
    color: "#f39c12",
    milestones: [
      "Complete Level 0 and Level 1",
      "Tonal shift mechanic demonstrated",
      "3 entity types implemented",
      "5 character models and voice acting",
      "Co-op foundation (2 players)",
      "First external playtest",
    ],
  },
  {
    phase: 3,
    name: "Alpha",
    months: "Months 7-12",
    dates: "Oct 2026 - Mar 2027",
    team: "30-45 (peak)",
    goal: "All 5 levels content-complete, co-op, Operation Mode, all systems",
    color: "#e74c3c",
    milestones: [
      "All 5 levels content-complete",
      "Full co-op support (2-4 players)",
      "Operation Mode prototype",
      "All weapon and combat systems",
      "Full sanity and hallucination system",
      "Entity Director AI system",
      "Dialogue system with 800+ variants",
      "Monthly external horror testing",
    ],
  },
  {
    phase: 4,
    name: "Beta",
    months: "Months 13-15",
    dates: "Apr-Jun 2027",
    team: "30-40",
    goal: "Polish, optimize, bug fix, accessibility, platform certification",
    color: "#3498db",
    milestones: [
      "Performance optimization across all platforms",
      "Bug fixing and polish pass",
      "Accessibility features implementation",
      "Platform certification (PS5, Xbox)",
      "Containment Mode implementation",
      "\"The Watcher\" asymmetrical mode",
      "Public beta testing",
    ],
  },
  {
    phase: 5,
    name: "Gold",
    months: "Months 16-18",
    dates: "Jul-Sep 2027",
    team: "20-30",
    goal: "Certification, day-one patch, launch, live ops setup",
    color: "#d4a017",
    milestones: [
      "Final platform certification",
      "Day-one patch preparation",
      "Launch marketing campaign",
      "Live ops infrastructure setup",
      "Post-launch content pipeline",
      "LAUNCH: September 2027",
    ],
  },
];

const postLaunch = [
  { week: "Week 1-2", task: "Hotfix window (target <1% crash rate)", color: "#e74c3c" },
  { week: "Month 1", task: "First content update (2-3 Operation Mode missions)", color: "#f39c12" },
  { week: "Month 2-3", task: "New Containment Mode arena, new operative, community features", color: "#3498db" },
  { week: "Month 4-6", task: "\"Lost Squads\" DLC development (if sales justify)", color: "#8e44ad" },
];

const successMetrics = [
  { metric: "Units Sold", target: "500,000+", period: "First 6 months", icon: <TrendingUp size={14} /> },
  { metric: "Steam Rating", target: "85%+ Positive", period: "At launch", icon: <Target size={14} /> },
  { metric: "Campaign Completion", target: ">40%", period: "Player average", icon: <TrendingUp size={14} /> },
  { metric: "Co-op Active Players", target: "10,000+", period: "Concurrent", icon: <Users size={14} /> },
  { metric: "Content Creator Coverage", target: "1,000+", period: "Videos/streams", icon: <TrendingUp size={14} /> },
];

export default function TimelinePage() {
  return (
    <div className="px-6 md:px-16 lg:px-24 py-16 md:py-24">
      <SectionHeader
        code="07"
        title="PRODUCTION TIMELINE"
        subtitle="18 months. 5 phases. From prototype to launch."
      />

      {/* Timeline visualization */}
      <div className="mb-12">
        <div className="flex items-center gap-1 h-10">
          {phases.map((p, i) => (
            <div
              key={i}
              className="flex-1 h-full relative group"
              style={{ background: `${p.color}20` }}
            >
              <div
                className="absolute bottom-0 left-0 right-0 transition-all group-hover:opacity-100 opacity-70"
                style={{ height: `${30 + i * 15}%`, background: p.color }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-mono text-[9px] text-foreground/60 tracking-wider">P{p.phase}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-1">
          <span className="font-mono text-[8px] text-steel-light/30">APR 2026</span>
          <span className="font-mono text-[8px] text-steel-light/30">SEP 2027</span>
        </div>
      </div>

      {/* Phases */}
      <div className="space-y-4 mb-12">
        {phases.map((phase) => (
          <div
            key={phase.phase}
            className="bg-steel-dark/30 border p-5 corner-brackets"
            style={{ borderColor: `${phase.color}25` }}
          >
            <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 flex items-center justify-center font-mono text-sm font-bold"
                  style={{ border: `1px solid ${phase.color}40`, color: phase.color }}
                >
                  P{phase.phase}
                </div>
                <div>
                  <h3 className="font-mono text-sm tracking-wider text-foreground">{phase.name.toUpperCase()}</h3>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[10px] text-steel-light/50">{phase.months}</span>
                    <span className="font-mono text-[10px] text-steel-light/30">|</span>
                    <span className="font-mono text-[10px] text-steel-light/50">{phase.dates}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 md:ml-auto">
                <Users size={12} className="text-steel-light/40" />
                <span className="font-mono text-[10px] text-steel-light/60">{phase.team} people</span>
              </div>
            </div>

            <p className="text-xs text-foreground/70 mb-4">{phase.goal}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
              {phase.milestones.map((m, i) => (
                <div key={i} className="flex items-start gap-2 text-[11px] text-steel-light/60">
                  <span className="mt-0.5" style={{ color: `${phase.color}60` }}>▸</span>
                  {m}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Post-Launch */}
      <div className="mb-12">
        <h3 className="font-mono text-xs text-amber-dim tracking-[0.2em] mb-4">POST-LAUNCH PLAN</h3>
        <div className="space-y-2">
          {postLaunch.map((pl, i) => (
            <div key={i} className="flex items-center gap-4 bg-steel-dark/30 border border-steel-light/10 p-4">
              <div className="w-20 shrink-0">
                <span className="font-mono text-[10px] tracking-wider" style={{ color: pl.color }}>{pl.week}</span>
              </div>
              <div className="w-1 h-6 rounded-full" style={{ background: pl.color }} />
              <p className="text-xs text-foreground/70">{pl.task}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Success Metrics */}
      <div className="mb-12">
        <h3 className="font-mono text-xs text-amber-dim tracking-[0.2em] mb-4">SUCCESS METRICS</h3>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
          {successMetrics.map((m, i) => (
            <div key={i} className="bg-steel-dark/30 border border-amber/10 p-4 card-hover corner-brackets">
              <div className="text-amber-dim mb-2">{m.icon}</div>
              <span className="data-label block mb-1">{m.metric.toUpperCase()}</span>
              <div className="font-mono text-xl font-bold text-amber mb-1">{m.target}</div>
              <span className="font-mono text-[9px] text-steel-light/40">{m.period}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Script Stats */}
      <div>
        <h3 className="font-mono text-xs text-amber-dim tracking-[0.2em] mb-4">SCRIPT STATISTICS</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {[
            { label: "DIALOGUE LINES", value: "~2,400" },
            { label: "BRANCHING DECISIONS", value: "47" },
            { label: "CONDITIONAL VARIANTS", value: "~800" },
            { label: "INTEL DOCUMENTS", value: "45" },
            { label: "AUDIO LOGS", value: "25" },
          ].map((s) => (
            <div key={s.label} className="bg-steel-dark/30 border border-steel-light/10 p-3 corner-brackets">
              <span className="data-label block mb-1">{s.label}</span>
              <span className="font-mono text-lg font-bold text-amber">{s.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
