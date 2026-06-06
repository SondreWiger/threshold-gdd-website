"use client";

import SectionHeader from "@/components/SectionHeader";

const phases = [
  {
    phase: 1,
    name: "Prototype",
    months: "Months 1–3",
    dates: "Apr–Jun 2026",
    team: "8–12",
    goal: "Validate core mechanics, playable Level 0 slice (10–15 min)",
    milestones: [
      "Core movement and combat prototype",
      "Basic squad AI command system",
      "Level 0 playable slice (10–15 min)",
      "Sanity system proof of concept",
      "Entity AI behavior tree foundation",
    ],
  },
  {
    phase: 2,
    name: "Vertical Slice",
    months: "Months 4–6",
    dates: "Jul–Sep 2026",
    team: "15–20",
    goal: "Full Level 0+1, tonal shift demonstrated, 3 entities, 5 characters",
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
    months: "Months 7–12",
    dates: "Oct 2026 – Mar 2027",
    team: "30–45 (peak)",
    goal: "All 5 levels content-complete, co-op, Operation Mode, all systems",
    milestones: [
      "All 5 levels content-complete",
      "Full co-op support (2–4 players)",
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
    months: "Months 13–15",
    dates: "Apr–Jun 2027",
    team: "30–40",
    goal: "Polish, optimize, bug fix, accessibility, platform certification",
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
    months: "Months 16–18",
    dates: "Jul–Sep 2027",
    team: "20–30",
    goal: "Certification, day-one patch, launch, live ops setup",
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
  { week: "Week 1–2", task: "Hotfix window (target <1% crash rate)" },
  { week: "Month 1", task: "First content update (2–3 Operation Mode missions)" },
  { week: "Month 2–3", task: "New Containment Mode arena, new operative, community features" },
  { week: "Month 4–6", task: "\"Lost Squads\" DLC development (if sales justify)" },
];

const successMetrics = [
  { metric: "Units Sold", target: "500,000+", period: "First 6 months" },
  { metric: "Steam Rating", target: "85%+ Positive", period: "At launch" },
  { metric: "Campaign Completion", target: ">40%", period: "Player average" },
  { metric: "Co-op Active Players", target: "10,000+", period: "Concurrent" },
  { metric: "Content Creator Coverage", target: "1,000+", period: "Videos/streams" },
];

export default function TimelinePage() {
  return (
    <div className="px-6 md:px-12 lg:px-24 py-16 md:py-24">
      <SectionHeader
        code="07 / TIMELINE"
        title="Production Timeline"
        subtitle="18 months. 5 phases. From prototype to launch."
      />

      {/* Timeline visualization */}
      <div className="mb-16">
        <div className="flex gap-[2px] h-1">
          {phases.map((p, i) => (
            <div
              key={i}
              className="flex-1 bg-foreground/[0.08]"
            />
          ))}
        </div>
        <div className="flex justify-between mt-2">
          <span className="font-mono text-[8px] text-foreground/10">APR 2026</span>
          <span className="font-mono text-[8px] text-foreground/10">SEP 2027</span>
        </div>
      </div>

      {/* Phases */}
      <div className="space-y-12 mb-16">
        {phases.map((phase) => (
          <div key={phase.phase} className="py-8 border-b border-foreground/[0.04]">
            <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-4 mb-3">
              <span className="font-mono text-[10px] text-foreground/15 tracking-[0.2em]">P{phase.phase}</span>
              <h3 className="text-lg font-light text-foreground/70">{phase.name}</h3>
              <span className="font-mono text-[10px] text-foreground/15">{phase.months}</span>
              <span className="font-mono text-[10px] text-foreground/10 hidden md:inline">{phase.dates}</span>
              <span className="font-mono text-[10px] text-foreground/10 ml-auto hidden md:inline">{phase.team} people</span>
            </div>

            <p className="text-[13px] text-foreground/30 font-light mb-4 max-w-2xl">{phase.goal}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
              {phase.milestones.map((m, i) => (
                <div key={i} className="flex items-start gap-2">
                  <span className="text-foreground/10 mt-0.5 shrink-0">—</span>
                  <span className="text-[12px] text-foreground/25 font-light">{m}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Post-Launch */}
      <div className="mb-16">
        <h3 className="font-mono text-[10px] text-foreground/20 tracking-[0.2em] mb-6">POST-LAUNCH PLAN</h3>
        <div className="space-y-0">
          {postLaunch.map((pl, i) => (
            <div key={i} className="flex items-center gap-6 py-3 border-b border-foreground/[0.04]">
              <span className="font-mono text-[10px] text-foreground/20 w-20 shrink-0 tracking-wider">{pl.week}</span>
              <p className="text-[12px] text-foreground/30 font-light">{pl.task}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Success Metrics */}
      <div className="mb-16">
        <h3 className="font-mono text-[10px] text-foreground/20 tracking-[0.2em] mb-6">SUCCESS METRICS</h3>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          {successMetrics.map((m, i) => (
            <div key={i}>
              <span className="font-mono text-[9px] text-foreground/15 tracking-[0.15em] block mb-1">{m.metric}</span>
              <div className="text-xl font-light text-foreground/50 mb-1">{m.target}</div>
              <span className="font-mono text-[9px] text-foreground/10">{m.period}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Script Stats */}
      <div>
        <h3 className="font-mono text-[10px] text-foreground/20 tracking-[0.2em] mb-6">SCRIPT STATISTICS</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
          {[
            { label: "DIALOGUE LINES", value: "~2,400" },
            { label: "BRANCHING DECISIONS", value: "47" },
            { label: "CONDITIONAL VARIANTS", value: "~800" },
            { label: "INTEL DOCUMENTS", value: "45" },
            { label: "AUDIO LOGS", value: "25" },
          ].map((s) => (
            <div key={s.label}>
              <span className="font-mono text-[9px] text-foreground/15 tracking-[0.2em] block mb-1">{s.label}</span>
              <span className="text-xl font-light text-foreground/50">{s.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
