"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import SectionHeader from "@/components/SectionHeader";
import { levels } from "@/data/levels";
import { LevelMap } from "@/data/levels";

const MapViewer = dynamic(() => import("@/components/maps/MapViewer"), { ssr: false });

const levelColors: Record<string, string> = {
  "0": "#d4a017",
  "1": "#e67e22",
  "2": "#c0392b",
  "4": "#2980b9",
  "11": "#8e44ad",
};

const markerLegend = [
  { type: "start" as const, label: "Start/Entry" },
  { type: "end" as const, label: "Exit/End" },
  { type: "encounter" as const, label: "Encounter" },
  { type: "entity" as const, label: "Entity" },
  { type: "danger" as const, label: "Danger" },
  { type: "scripted" as const, label: "Scripted Moment" },
  { type: "item" as const, label: "Collectible" },
  { type: "objective" as const, label: "Objective" },
  { type: "choice" as const, label: "Player Choice" },
  { type: "landmark" as const, label: "Landmark" },
];

export default function MapsPage() {
  const [selectedLevel, setSelectedLevel] = useState<LevelMap>(levels[0]);
  const [showLegend, setShowLegend] = useState(false);

  return (
    <div className="flex flex-col h-[calc(100vh-48px)]">
      {/* Header */}
      <div className="px-6 md:px-12 py-6 border-b border-foreground/[0.08] bg-background/80 backdrop-blur-xl shrink-0">
        <div className="flex items-start justify-between mb-6">
          <SectionHeader
            code="08 / MAPS"
            title="Level Maps"
            subtitle="Interactive 2D maps. Wall-for-wall. Zoom and explore."
          />
          <button
            onClick={() => setShowLegend(!showLegend)}
            className="font-mono text-[10px] tracking-[0.12em] text-foreground/65 hover:text-foreground/65 transition-colors mt-4"
          >
            {showLegend ? "HIDE" : "SHOW"} LEGEND
          </button>
        </div>

        {/* Level selector — minimal pills */}
        <div className="flex flex-wrap gap-0.5 mb-4">
          {levels.map((level) => (
            <button
              key={level.id}
              onClick={() => setSelectedLevel(level)}
              className={`px-4 py-1.5 font-mono text-[10px] tracking-[0.12em] transition-all duration-300 rounded-full ${
                selectedLevel.id === level.id
                  ? "bg-amber/8 text-amber"
                  : "text-foreground/65 hover:text-foreground/65"
              }`}
            >
              <span className="inline-block w-1.5 h-1.5 rounded-full mr-2 align-middle" style={{ background: levelColors[level.id] }} />
              LEVEL {level.id}
              <span className="hidden sm:inline ml-1 opacity-60">— {level.name}</span>
            </button>
          ))}
        </div>

        {/* Level meta */}
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-[10px] font-mono text-foreground/55">
          <span>{selectedLevel.meta.environment}</span>
          <span>·</span>
          <span>{selectedLevel.meta.duration}</span>
          <span>·</span>
          <span>{selectedLevel.meta.difficulty}</span>
          <span>·</span>
          <span>{selectedLevel.markers.length} markers</span>
        </div>

        {/* Legend */}
        {showLegend && (
          <div className="mt-4 flex flex-wrap gap-4 py-3 border-t border-foreground/[0.08]">
            {markerLegend.map((m) => (
              <div key={m.type} className="flex items-center gap-1.5">
                <span className="font-mono text-[9px] text-foreground/65">•</span>
                <span className="font-mono text-[9px] text-foreground/55">{m.label}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Map */}
      <div className="flex-1 min-h-0">
        <MapViewer level={selectedLevel} />
      </div>
    </div>
  );
}
