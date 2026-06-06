"use client";

import { useState, useCallback } from "react";
import { ChevronDown, ChevronRight, Check, Sparkles, Target, Clock } from "lucide-react";
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
  if (percent === 0) return "Awaiting deployment...";
  if (percent < 10) return "Mission initiated. Stay focused.";
  if (percent < 25) return "Foundation laid. Keep building.";
  if (percent < 50) return "Making real progress. The Backrooms are waiting.";
  if (percent < 75) return "Over halfway there. You're doing something right.";
  if (percent < 100) return "Almost there. Don't stop now.";
  return "MISSION COMPLETE. You shipped it.";
}

function TaskCheckbox({
  taskId,
  label,
  hint,
  checked,
  onToggle,
}: {
  taskId: string;
  label: string;
  hint?: string;
  checked: boolean;
  onToggle: (id: string) => void;
}) {
  return (
    <button
      onClick={() => onToggle(taskId)}
      className={`group flex items-start gap-3 w-full text-left px-3 py-2.5 rounded transition-all duration-200 ${
        checked
          ? "bg-tactical-green/5 border border-tactical-green/20"
          : "bg-steel-dark/30 border border-steel-light/5 hover:border-steel-light/15 hover:bg-steel-dark/50"
      }`}
    >
      <div className={`mt-0.5 flex-shrink-0 w-4 h-4 rounded border flex items-center justify-center transition-all duration-200 ${
        checked
          ? "bg-tactical-green border-tactical-green"
          : "border-steel-light/30 group-hover:border-amber-dim/50"
      }`}>
        {checked && <Check size={10} className="text-white" />}
      </div>
      <div className="flex-1 min-w-0">
        <span className={`text-sm leading-relaxed transition-all duration-200 ${
          checked ? "text-steel-light/50 line-through" : "text-foreground/90"
        }`}>
          {label}
        </span>
        {hint && (
          <span className="block mt-0.5 font-mono text-[10px] text-steel-light/40 tracking-wider">
            {hint}
          </span>
        )}
      </div>
      {checked && (
        <Sparkles size={12} className="mt-0.5 text-tactical-green/60 flex-shrink-0" />
      )}
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
  const percent = total > 0 ? Math.round((completed / total) * 100) : 0;
  const isComplete = completed === total;

  return (
    <div className={`border rounded transition-all duration-300 ${
      isComplete
        ? "border-tactical-green/30 bg-tactical-green/5"
        : "border-steel-light/10 bg-steel-dark/20"
    }`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center gap-3 px-4 py-3 text-left"
      >
        <div className={`flex-shrink-0 w-5 h-5 rounded flex items-center justify-center transition-all ${
          isComplete
            ? "bg-tactical-green"
            : "bg-steel-dark border border-steel-light/20"
        }`}>
          {isComplete ? (
            <Check size={12} className="text-white" />
          ) : (
            <span className="font-mono text-[9px] text-amber-dim">{completed}/{total}</span>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <h4 className={`text-sm font-medium ${isComplete ? "text-tactical-green/80" : "text-foreground"}`}>
            {goal.title}
          </h4>
          <p className="font-mono text-[10px] text-steel-light/50 mt-0.5">{goal.description}</p>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          <div className="w-16 h-1 bg-steel-dark rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                isComplete ? "bg-tactical-green" : "bg-amber"
              }`}
              style={{ width: `${percent}%` }}
            />
          </div>
          <span className="font-mono text-[10px] text-steel-light/40 w-8 text-right">{percent}%</span>
          {isOpen ? (
            <ChevronDown size={14} className="text-steel-light/30" />
          ) : (
            <ChevronRight size={14} className="text-steel-light/30" />
          )}
        </div>
      </button>

      {isOpen && (
        <div className="px-4 pb-3 grid gap-1">
          {goal.tasks.map((task) => (
            <TaskCheckbox
              key={task.id}
              taskId={task.id}
              label={task.label}
              hint={task.hint}
              checked={!!progress[task.id]}
              onToggle={onToggle}
            />
          ))}
        </div>
      )}
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
    <div className={`border rounded-lg transition-all duration-300 ${
      isComplete
        ? "border-tactical-green/30"
        : isActive
        ? "border-amber/30 glow-amber"
        : "border-steel-light/10"
    }`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center gap-4 px-5 py-4 text-left"
      >
        {/* Phase number */}
        <div className={`flex-shrink-0 w-10 h-10 rounded flex items-center justify-center font-mono text-sm font-bold ${
          isComplete
            ? "bg-tactical-green/20 text-tactical-green border border-tactical-green/30"
            : isActive
            ? "bg-amber/20 text-amber border border-amber/30"
            : "bg-steel-dark text-steel-light/50 border border-steel-light/10"
        }`}>
          {isComplete ? <Check size={18} /> : phase.code}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className={`text-lg font-bold ${isComplete ? "text-tactical-green/80" : "text-foreground"}`}>
              {phase.title}
            </h3>
            {isComplete && (
              <span className="px-2 py-0.5 bg-tactical-green/10 border border-tactical-green/20 font-mono text-[9px] text-tactical-green tracking-wider">
                COMPLETE
              </span>
            )}
            {isActive && (
              <span className="px-2 py-0.5 bg-amber/10 border border-amber/20 font-mono text-[9px] text-amber tracking-wider animate-pulse-amber">
                ACTIVE
              </span>
            )}
          </div>
          <p className="font-mono text-[11px] text-steel-light/50 mt-0.5">{phase.subtitle}</p>
        </div>

        <div className="flex items-center gap-3 flex-shrink-0">
          <div className="hidden sm:flex items-center gap-2 text-steel-light/40">
            <Clock size={12} />
            <span className="font-mono text-[10px]">{phase.estimatedWeeks}</span>
          </div>
          <div className="w-24 h-1.5 bg-steel-dark rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-700 ${
                isComplete ? "bg-tactical-green" : "bg-amber"
              }`}
              style={{ width: `${percent}%` }}
            />
          </div>
          <span className="font-mono text-xs text-steel-light/50 w-12 text-right">
            {completedTasks}/{totalTasks}
          </span>
          {isOpen ? (
            <ChevronDown size={16} className="text-steel-light/30" />
          ) : (
            <ChevronRight size={16} className="text-steel-light/30" />
          )}
        </div>
      </button>

      {isOpen && (
        <div className="px-5 pb-5 space-y-3">
          <p className="font-mono text-xs text-steel-light/40 leading-relaxed">
            {phase.description}
          </p>
          <div className="space-y-3">
            {phase.goals.map((goal) => (
              <GoalCard
                key={goal.id}
                goal={goal}
                progress={progress}
                onToggle={onToggle}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function JourneyPage() {
  const [progress, setProgress] = useState<Record<string, boolean>>(() => {
    if (typeof window === "undefined") return {};
    return loadProgress();
  });
  const [celebrateId, setCelebrateId] = useState<string | null>(null);

  const toggleTask = useCallback((taskId: string) => {
    setProgress((prev) => {
      const next = { ...prev, [taskId]: !prev[taskId] };
      saveProgress(next);

      if (next[taskId]) {
        setCelebrateId(taskId);
        setTimeout(() => setCelebrateId(null), 600);
      }

      return next;
    });
  }, []);

  const resetProgress = useCallback(() => {
    if (confirm("Reset all progress? This cannot be undone.")) {
      setProgress({});
      saveProgress({});
    }
  }, []);

  const totalTasks = getTotalTasks();
  const completedTasks = Object.values(progress).filter(Boolean).length;
  const overallPercent = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return (
    <div className="min-h-screen px-4 md:px-8 lg:px-16 py-8 md:py-12">
      {/* Header */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-4">
          <span className="font-mono text-[10px] text-amber-dim/60 tracking-[0.3em]">SECTION 09</span>
          <div className="flex-1 h-px bg-amber/10" />
          <div className="w-1.5 h-1.5 bg-amber/40 rotate-45" />
        </div>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground mb-3">
          Dev <span className="text-amber glow-text">Journey</span>
        </h1>
        <p className="font-mono text-sm text-steel-light tracking-wide max-w-2xl">
          From zero UE5 knowledge to a playable THRESHOLD demo. Check off tasks as you go.
          Progress saves locally in your browser.
        </p>
      </div>

      {/* Overall Progress Bar */}
      <div className="mb-10 bg-steel-dark/30 border border-steel-light/10 rounded-lg p-5 corner-brackets">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Target size={16} className="text-amber" />
            <span className="font-mono text-xs text-amber-dim tracking-wider">OVERALL PROGRESS</span>
          </div>
          <span className="font-mono text-2xl font-bold text-amber">{overallPercent}%</span>
        </div>

        <div className="w-full h-3 bg-steel-dark rounded-full overflow-hidden mb-3">
          <div
            className="h-full rounded-full transition-all duration-700 ease-out"
            style={{
              width: `${overallPercent}%`,
              background: overallPercent === 100
                ? "linear-gradient(90deg, #27ae60, #2ecc71)"
                : "linear-gradient(90deg, #8b6914, #d4a017)",
            }}
          />
        </div>

        <div className="flex items-center justify-between">
          <p className="font-mono text-[11px] text-steel-light/50">
            {getCompletionMessage(overallPercent)}
          </p>
          <div className="flex items-center gap-4">
            <span className="font-mono text-[10px] text-steel-light/40">
              {completedTasks} / {totalTasks} tasks
            </span>
            <button
              onClick={resetProgress}
              className="font-mono text-[10px] text-tactical-red/50 hover:text-tactical-red transition-colors tracking-wider"
            >
              RESET
            </button>
          </div>
        </div>

        {/* Phase dots */}
        <div className="flex gap-1 mt-4">
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
                className="flex-1 h-1 rounded-full overflow-hidden bg-steel-dark"
                title={`${phase.title}: ${Math.round(phasePercent)}%`}
              >
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    phasePercent === 100 ? "bg-tactical-green" : "bg-amber"
                  }`}
                  style={{ width: `${phasePercent}%` }}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* Celebration flash */}
      {celebrateId && (
        <div className="fixed inset-0 pointer-events-none z-50">
          <div className="absolute inset-0 bg-tactical-green/5 animate-pulse" />
        </div>
      )}

      {/* Phases */}
      <div className="space-y-4">
        {journey.map((phase) => (
          <PhaseSection
            key={phase.id}
            phase={phase}
            progress={progress}
            onToggle={toggleTask}
          />
        ))}
      </div>

      {/* Footer */}
      <div className="mt-12 pt-6 border-t border-steel-light/10">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="font-mono text-[10px] text-steel-light/30 tracking-wider">
            <span>THRESHOLD — DEV JOURNEY</span>
            <span className="mx-2">|</span>
            <span>PROGRESS SAVED LOCALLY</span>
            <span className="mx-2">|</span>
            <span>NORTHEM DEVELOPMENTS</span>
          </div>
          <div className="font-mono text-[10px] text-steel-light/20">
            {new Date().toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
