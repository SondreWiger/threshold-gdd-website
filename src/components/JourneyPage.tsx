"use client";

import { useState, useCallback } from "react";
import { ChevronDown, ChevronRight, Check } from "lucide-react";
import { journey, getTotalTasks, getPhaseTaskCount, type Phase, type Goal } from "@/data/journey";

const STORAGE_KEY = "threshold-journey-progress";

function loadProgress(): Record<string, boolean> {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveProgress(progress: Record<string, boolean>) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch {
    // silently fail
  }
}

function getCompletionMessage(percent: number): string {
  if (percent === 0) return "Awaiting deployment.";
  if (percent < 10) return "Mission initiated.";
  if (percent < 25) return "Foundation laid.";
  if (percent < 50) return "Making progress.";
  if (percent < 75) return "Over halfway.";
  if (percent < 100) return "Almost there.";
  return "Complete.";
}

function TaskCheckbox({
  taskId,
  label,
  checked,
  onToggle,
}: {
  taskId: string;
  label: string;
  checked: boolean;
  onToggle: (id: string) => void;
}) {
  return (
    <button
      onClick={() => onToggle(taskId)}
      className="group flex items-center gap-4 w-full text-left py-2 transition-all duration-300"
    >
      <div
        className={`flex-shrink-0 w-[14px] h-[14px] rounded-sm border transition-all duration-300 flex items-center justify-center ${
          checked
            ? "bg-foreground border-foreground"
            : "border-foreground/20 group-hover:border-foreground/40"
        }`}
      >
        {checked && <Check size={9} className="text-background" strokeWidth={3} />}
      </div>
      <span
        className={`text-[13px] leading-none transition-all duration-300 ${
          checked ? "text-foreground/75 line-through" : "text-foreground/95 group-hover:text-foreground/95"
        }`}
      >
        {label}
      </span>
    </button>
  );
}

function GoalCard({
  goal,
  progress,
  onToggle,
}: {
  goal: Goal;
  progress: Record<string, boolean>;
  onToggle: (id: string) => void;
}) {
  const [isOpen, setIsOpen] = useState(true);
  const completed = goal.tasks.filter((t) => progress[t.id]).length;
  const total = goal.tasks.length;
  const isComplete = completed === total;

  return (
    <div className="py-6">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center gap-4 text-left group"
      >
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3">
            <h4
              className={`text-[13px] font-medium tracking-wide transition-colors duration-300 ${
                isComplete ? "text-foreground/55" : "text-foreground/80"
              }`}
            >
              {goal.title}
            </h4>
            {isComplete && (
              <span className="font-mono text-[9px] text-foreground/65 tracking-[0.15em]">
                DONE
              </span>
            )}
          </div>
          <p className="font-mono text-[10px] text-foreground/65 mt-1 tracking-wide">
            {goal.description}
          </p>
        </div>

        <div className="flex items-center gap-3 flex-shrink-0">
          <span className="font-mono text-[10px] text-foreground/65">
            {completed}/{total}
          </span>
          {isOpen ? (
            <ChevronDown size={12} className="text-foreground/55" />
          ) : (
            <ChevronRight size={12} className="text-foreground/55" />
          )}
        </div>
      </button>

      {isOpen && (
        <div className="mt-4 ml-1">
          {goal.tasks.map((task) => (
            <TaskCheckbox
              key={task.id}
              taskId={task.id}
              label={task.label}
              checked={!!progress[task.id]}
              onToggle={onToggle}
            />
          ))}
        </div>
      )}

      <div className="mt-6 h-px bg-foreground/[0.08]" />
    </div>
  );
}

function PhaseSection({
  phase,
  progress,
  onToggle,
}: {
  phase: Phase;
  progress: Record<string, boolean>;
  onToggle: (id: string) => void;
}) {
  const [isOpen, setIsOpen] = useState(true);
  const totalTasks = getPhaseTaskCount(phase.id);
  const completedTasks = phase.goals.reduce(
    (acc, goal) => acc + goal.tasks.filter((t) => progress[t.id]).length,
    0
  );
  const percent = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
  const isComplete = completedTasks === totalTasks;
  const isActive = completedTasks > 0 && !isComplete;

  return (
    <div className="py-10 md:py-14">
      {/* Phase header */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-left group"
      >
        <div className="flex items-baseline gap-4 mb-2">
          <span className="font-mono text-[10px] text-foreground/65 tracking-[0.2em]">
            {phase.code}
          </span>
          <h2
            className={`text-2xl md:text-3xl font-light tracking-tight transition-colors duration-300 ${
              isComplete ? "text-foreground/55" : "text-foreground/95"
            }`}
          >
            {phase.title}
          </h2>
          {isComplete && (
            <span className="font-mono text-[9px] text-foreground/55 tracking-[0.2em] ml-2">
              COMPLETE
            </span>
          )}
          {isActive && (
            <span className="font-mono text-[9px] text-amber/75 tracking-[0.2em] ml-2">
              ACTIVE
            </span>
          )}
        </div>

        <p className="font-mono text-[11px] text-foreground/75 tracking-wide max-w-xl leading-relaxed">
          {phase.subtitle}
        </p>

        {/* Progress bar — minimal */}
        <div className="flex items-center gap-4 mt-4">
          <div className="flex-1 h-px bg-foreground/[0.06] overflow-hidden">
            <div
              className={`h-full transition-all duration-700 ${
                isComplete ? "bg-foreground/20" : "bg-amber/40"
              }`}
              style={{ width: `${percent}%` }}
            />
          </div>
          <span className="font-mono text-[10px] text-foreground/65 tabular-nums">
            {completedTasks}/{totalTasks}
          </span>
        </div>
      </button>

      {/* Phase content */}
      {isOpen && (
        <div className="mt-6">
          <p className="font-mono text-[11px] text-foreground/65 leading-relaxed max-w-2xl mb-4">
            {phase.description}
          </p>
          <div className="font-mono text-[10px] text-foreground/55 tracking-wider mb-2">
            {phase.estimatedWeeks}
          </div>

          {phase.goals.map((goal) => (
            <GoalCard
              key={goal.id}
              goal={goal}
              progress={progress}
              onToggle={onToggle}
            />
          ))}
        </div>
      )}

      {/* Section divider */}
      <div className="h-px bg-foreground/[0.06]" />
    </div>
  );
}

export default function JourneyPage() {
  const [progress, setProgress] = useState<Record<string, boolean>>(() => {
    if (typeof window === "undefined") return {};
    return loadProgress();
  });

  const toggleTask = useCallback((taskId: string) => {
    setProgress((prev) => {
      const next = { ...prev, [taskId]: !prev[taskId] };
      saveProgress(next);
      return next;
    });
  }, []);

  const resetProgress = useCallback(() => {
    if (confirm("Reset all progress?")) {
      setProgress({});
      saveProgress({});
    }
  }, []);

  const totalTasks = getTotalTasks();
  const completedTasks = Object.values(progress).filter(Boolean).length;
  const overallPercent = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return (
    <div className="min-h-screen">
      {/* Hero — large whitespace */}
      <div className="px-6 md:px-12 lg:px-24 pt-20 md:pt-32 pb-16 md:pb-24">
        <div className="max-w-3xl">
          <span className="font-mono text-[10px] text-foreground/55 tracking-[0.3em] block mb-8">
            09 / JOURNEY
          </span>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-light tracking-tight text-foreground/95 mb-6">
            Dev Journey
          </h1>
          <p className="text-base md:text-lg text-foreground/55 font-light leading-relaxed max-w-xl">
            From zero UE5 knowledge to a playable demo.
            Check off tasks as you go. Progress saves locally.
          </p>
        </div>
      </div>

      {/* Overall progress — clean, minimal */}
      <div className="px-6 md:px-12 lg:px-24 pb-16 md:pb-24">
        <div className="max-w-3xl">
          <div className="flex items-baseline justify-between mb-4">
            <span className="font-mono text-[10px] text-foreground/65 tracking-[0.2em]">
              OVERALL
            </span>
            <span className="font-mono text-3xl md:text-4xl font-light text-foreground/80 tabular-nums">
              {overallPercent}
              <span className="text-foreground/65">%</span>
            </span>
          </div>

          <div className="w-full h-[3px] bg-foreground/[0.08] rounded-full overflow-hidden mb-4">
            <div
              className="h-full rounded-full transition-all duration-700 ease-out"
              style={{
                width: `${overallPercent}%`,
                background: overallPercent === 100
                  ? "rgba(232, 230, 227, 0.4)"
                  : "rgba(212, 160, 23, 0.5)",
              }}
            />
          </div>

          <div className="flex items-center justify-between">
            <span className="font-mono text-[11px] text-foreground/65">
              {getCompletionMessage(overallPercent)}
            </span>
            <div className="flex items-center gap-6">
              <span className="font-mono text-[10px] text-foreground/55 tabular-nums">
                {completedTasks} / {totalTasks}
              </span>
              <button
                onClick={resetProgress}
                className="font-mono text-[10px] text-foreground/55 hover:text-foreground/65 transition-colors tracking-[0.15em]"
              >
                RESET
              </button>
            </div>
          </div>

          {/* Phase segments */}
          <div className="flex gap-[2px] mt-8">
            {journey.map((phase) => {
              const phaseTotal = getPhaseTaskCount(phase.id);
              const phaseCompleted = phase.goals.reduce(
                (acc, goal) => acc + goal.tasks.filter((t) => progress[t.id]).length,
                0
              );
              const phasePercent = phaseTotal > 0 ? (phaseCompleted / phaseTotal) * 100 : 0;
              return (
                <div
                  key={phase.id}
                  className="flex-1 h-[2px] rounded-full overflow-hidden bg-foreground/[0.08]"
                  title={`${phase.title}: ${Math.round(phasePercent)}%`}
                >
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${phasePercent}%`,
                      background: phasePercent === 100
                        ? "rgba(232, 230, 227, 0.25)"
                        : "rgba(212, 160, 23, 0.4)",
                    }}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Phases */}
      <div className="px-6 md:px-12 lg:px-24">
        <div className="max-w-3xl">
          {journey.map((phase) => (
            <PhaseSection
              key={phase.id}
              phase={phase}
              progress={progress}
              onToggle={toggleTask}
            />
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="px-6 md:px-12 lg:px-24 py-16 md:py-24">
        <div className="max-w-3xl">
          <div className="h-px bg-foreground/[0.06] mb-8" />
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <span className="font-mono text-[9px] text-foreground/75 tracking-[0.2em]">
              THRESHOLD — NORTHEM DEVELOPMENTS
            </span>
            <span className="font-mono text-[9px] text-foreground/75 tracking-[0.2em]">
              {new Date().toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
