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
  { type: "start" as const, label: "Start/Entry", color: "#2ecc71" },
  { type: "end" as const, label: "Exit/End", color: "#e74c3c" },
  { type: "encounter" as const, label: "Encounter", color: "#f39c12" },
  { type: "entity" as const, label: "Entity", color: "#e74c3c" },
  { type: "danger" as const, label: "Danger", color: "#e74c3c" },
  { type: "scripted" as const, label: "Scripted Moment", color: "#d4a017" },
  { type: "item" as const, label: "Collectible", color: "#3498db" },
  { type: "objective" as const, label: "Objective", color: "#27ae60" },
  { type: "choice" as const, label: "Player Choice", color: "#8e44ad" },
  { type: "landmark" as const, label: "Landmark", color: "#95a5a6" },
];

export default function MapsPage() {
  const [selectedLevel, setSelectedLevel] = useState<LevelMap>(levels[0]);
  const [showLegend, setShowLegend] = useState(false);

  return (
    <div className="flex flex-col h-[calc(100vh-48px)]">
      {/* Header */}
      <div className="px-6 md:px-12 py-6 border-b border-steel-light/10 bg-background/80 backdrop-blur-sm shrink-0">
        <div className="flex items-center justify-between mb-4">
          <SectionHeader
            code="08"
            title="LEVEL MAPS"
            subtitle="Interactive 2D maps. Wall-for-wall. Zoom and explore."
          />
          <button
            onClick={() => setShowLegend(!showLegend)}
            className="px-3 py-1.5 font-mono text-[10px] tracking-wider border border-steel-light/20 text-steel-light hover:border-amber/30 hover:text-amber transition-colors"
          >
            {showLegend ? "HIDE" : "SHOW"} LEGEND
          </button>
        </div>

        {/* Level selector */}
        <div className="flex flex-wrap gap-2 mb-4">
          {levels.map((level) => (
            <button
              key={level.id}
              onClick={() => setSelectedLevel(level)}
              className={`flex items-center gap-2 px-4 py-2 font-mono text-xs tracking-wider transition-all border ${
                selectedLevel.id === level.id
                  ? "border-current bg-current/10"
                  : "border-steel-light/20 text-steel-light hover:border-steel-light/40"
              }`}
              style={selectedLevel.id === level.id ? { color: levelColors[level.id] } : undefined}
            >
              <div className="w-2 h-2 rounded-full" style={{ background: levelColors[level.id] }} />
              <span>LEVEL {level.id}</span>
              <span className="hidden sm:inline text-[10px] opacity-60">— {level.name}</span>
            </button>
          ))}
        </div>

        {/* Level meta */}
        <div className="flex flex-wrap gap-x-6 gap-y-1 text-[10px] font-mono text-steel-light/50">
          <span>{selectedLevel.meta.environment}</span>
          <span>•</span>
          <span>{selectedLevel.meta.duration}</span>
          <span>•</span>
          <span>Difficulty: {selectedLevel.meta.difficulty}</span>
          <span>•</span>
          <span>Entities: {selectedLevel.meta.entityDensity}</span>
          <span>•</span>
          <span>{selectedLevel.markers.length} markers</span>
          <span>•</span>
          <span>{selectedLevel.walls.length} walls</span>
        </div>

        {/* Legend */}
        {showLegend && (
          <div className="mt-4 flex flex-wrap gap-3 p-3 bg-steel-dark/30 border border-steel-light/10">
            {markerLegend.map((m) => (
              <div key={m.type} className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full flex items-center justify-center" style={{ background: m.color }}>
                  <span className="text-[6px] font-mono font-bold text-black">
                    {m.type === "start" ? ">" : m.type === "end" ? "X" : m.type === "encounter" ? "!" : m.type === "entity" ? "E" : m.type === "danger" ? "D" : m.type === "scripted" ? "S" : m.type === "item" ? "I" : m.type === "objective" ? "O" : m.type === "choice" ? "?" : "L"}
                  </span>
                </div>
                <span className="font-mono text-[9px] text-steel-light/60">{m.label}</span>
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
