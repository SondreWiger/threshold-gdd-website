"use client";

import Link from "next/link";
import SectionHeader from "@/components/SectionHeader";

const phases = [
  {
    num: "01",
    title: "FOUNDATION",
    duration: "MONTHS 1–3",
    status: "NOT STARTED",
    statusColor: "text-foreground/15",
    tasks: [
      "Install UE5 and learn core systems",
      "Complete 3 tutorial projects (twin-stick, third-person, FPS)",
      "Basic C++ and Blueprints proficiency",
      "Set up project structure",
      "Build first greybox prototype",
    ],
    deliverable: "Playable FPS prototype in test level",
    risk: "Learning curve slower than expected",
    relatedTechnical: "/technical",
    relatedGameplay: "/gameplay",
  },
  {
    num: "02",
    title: "CORE MECHANICS",
    duration: "MONTHS 4–7",
    status: "NOT STARTED",
    statusColor: "text-foreground/15",
    tasks: [
      "Implement movement system (walk, run, crouch, prone)",
      "Build weapon system with ammo management",
      "Create first enemy type (Hounds) with basic AI",
      "Implement stress system prototype",
      "Build squad command system",
      "Basic inventory system",
    ],
    deliverable: "Playtestable combat loop against one enemy type",
    risk: "AI complexity, stress system tuning",
    relatedGameplay: "/gameplay",
    relatedCharacters: "/characters",
  },
  {
    num: "03",
    title: "CONTENT & POLISH",
    duration: "MONTHS 8–12",
    status: "NOT STARTED",
    statusColor: "text-foreground/15",
    tasks: [
      "Build Level 1 (The Office Complex) with greyboxing",
      "Implement 3 more enemy types",
      "Add dialogue system and character voices",
      "Build first 2 campaign missions",
      "Implement lighting and atmosphere",
      "Sound design pass",
    ],
    deliverable: "First playable campaign chapter",
    risk: "Content pipeline, scope creep",
    relatedLevels: "/levels",
    relatedLore: "/lore",
  },
  {
    num: "04",
    title: "MULTIPLAYER & TESTING",
    duration: "MONTHS 13–15",
    status: "NOT STARTED",
    statusColor: "text-foreground/15",
    tasks: [
      "Implement co-op networking",
      "Build 4-player campaign mode",
      "External playtesting sessions",
      "Bug fixing and balance pass",
      "Platform certification (if targeting consoles)",
    ],
    deliverable: "Complete co-op campaign for testing",
    risk: "Netcode complexity, platform requirements",
    relatedGameplay: "/gameplay",
    relatedTechnical: "/technical",
  },
  {
    num: "05",
    title: "SHIP IT",
    duration: "MONTHS 16–18",
    status: "NOT STARTED",
    statusColor: "text-foreground/15",
    tasks: [
      "Final polish and optimization",
      "Marketing push (trailers, demos)",
      "Store page setup (Steam, Epic)",
      "Launch Day patch",
      "Post-launch support plan",
    ],
    deliverable: "THRESHOLD available on PC",
    risk: "Launch competition, marketing reach",
    relatedTimeline: "/timeline",
  },
];

export default function TimelinePage() {
  return (
    <div className="px-6 md:px-12 lg:px-24 py-16 md:py-24">
      <SectionHeader
        code="07 / TIMELINE"
        title="Production Timeline"
        subtitle="18-month development schedule. Solo dev. Realistic milestones."
      />

      {/* Visual Timeline */}
      <div className="mb-20">
        <div className="space-y-0">
          {phases.map((phase, i) => (
            <div key={i} className="flex gap-6 py-6 border-b border-foreground/[0.04]">
              {/* Phase Number */}
              <div className="w-12 shrink-0">
                <span className="font-mono text-[10px] text-foreground/10 block mb-1">PHASE</span>
                <span className="font-mono text-lg text-foreground/20">{phase.num}</span>
              </div>

              {/* Progress Bar */}
              <div className="w-[2px] bg-foreground/[0.04] relative">
                <div className="absolute top-0 left-0 w-full h-1/2 bg-amber/10" />
              </div>

              {/* Content */}
              <div className="flex-1">
                <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6 mb-3">
                  <div>
                    <h3 className="text-[14px] font-medium text-foreground/60">{phase.title}</h3>
                    <span className="font-mono text-[9px] text-foreground/10 tracking-wider">{phase.duration}</span>
                  </div>
                  <span className={`font-mono text-[9px] tracking-[0.15em] ${phase.statusColor}`}>
                    {phase.status}
                  </span>
                </div>

                <ul className="space-y-1 mb-3">
                  {phase.tasks.map((task, j) => (
                    <li key={j} className="text-[12px] text-foreground/25 font-light flex items-start gap-2">
                      <span className="text-foreground/10 mt-0.5 shrink-0">—</span>
                      {task}
                    </li>
                  ))}
                </ul>

                <p className="text-[12px] text-amber/30 font-light mb-2">DELIVERABLE: {phase.deliverable}</p>
                <p className="text-[11px] text-foreground/15 font-light">RISK: {phase.risk}</p>

                <div className="flex gap-4 mt-3">
                  {phase.relatedTechnical && (
                    <Link href={phase.relatedTechnical} className="font-mono text-[9px] text-foreground/10 hover:text-amber/30 transition-colors tracking-wider">
                      TECHNICAL &rarr;
                    </Link>
                  )}
                  {phase.relatedGameplay && (
                    <Link href={phase.relatedGameplay} className="font-mono text-[9px] text-foreground/10 hover:text-amber/30 transition-colors tracking-wider">
                      GAMEPLAY &rarr;
                    </Link>
                  )}
                  {phase.relatedLevels && (
                    <Link href={phase.relatedLevels} className="font-mono text-[9px] text-foreground/10 hover:text-amber/30 transition-colors tracking-wider">
                      LEVELS &rarr;
                    </Link>
                  )}
                  {phase.relatedLore && (
                    <Link href={phase.relatedLore} className="font-mono text-[9px] text-foreground/10 hover:text-amber/30 transition-colors tracking-wider">
                      LORE &rarr;
                    </Link>
                  )}
                  {phase.relatedCharacters && (
                    <Link href={phase.relatedCharacters} className="font-mono text-[9px] text-foreground/10 hover:text-amber/30 transition-colors tracking-wider">
                      CHARACTERS &rarr;
                    </Link>
                  )}
                  {phase.relatedTimeline && (
                    <Link href={phase.relatedTimeline} className="font-mono text-[9px] text-foreground/10 hover:text-amber/30 transition-colors tracking-wider">
                      TIMELINE &rarr;
                    </Link>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Timeline Bar Visual */}
      <div className="mb-20">
        <h3 className="font-mono text-[10px] text-foreground/20 tracking-[0.2em] mb-6">18-MONTH ROADMAP</h3>
        <div className="h-[3px] bg-foreground/[0.04] overflow-hidden flex">
          {phases.map((_, i) => (
            <div
              key={i}
              className="h-full bg-amber/15 border-r border-foreground/[0.02]"
              style={{ width: `${[20, 25, 25, 17, 13][i]}%` }}
            />
          ))}
        </div>
        <div className="flex justify-between mt-2">
          <span className="font-mono text-[9px] text-foreground/10">MONTH 1</span>
          <span className="font-mono text-[9px] text-foreground/10">MONTH 9</span>
          <span className="font-mono text-[9px] text-foreground/10">MONTH 18</span>
        </div>
      </div>

      {/* Cross-links */}
      <div className="mt-16 pt-8 border-t border-foreground/[0.06]">
        <div className="flex flex-wrap gap-6">
          <Link href="/technical" className="font-mono text-[10px] text-foreground/15 hover:text-amber/50 transition-colors tracking-wider">
            TECHNICAL SPECS &rarr;
          </Link>
          <Link href="/gameplay" className="font-mono text-[10px] text-foreground/15 hover:text-amber/50 transition-colors tracking-wider">
            GAMEPLAY SYSTEMS &rarr;
          </Link>
          <Link href="/journey" className="font-mono text-[10px] text-foreground/15 hover:text-amber/50 transition-colors tracking-wider">
            DEV JOURNEY TRACKER &rarr;
          </Link>
          <Link href="/overview" className="font-mono text-[10px] text-foreground/15 hover:text-amber/50 transition-colors tracking-wider">
            PROJECT OVERVIEW &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}
