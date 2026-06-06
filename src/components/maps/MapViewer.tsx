"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { ZoomIn, ZoomOut, Maximize2, X } from "lucide-react";

export interface Wall {
  x1: number; y1: number; x2: number; y2: number;
  type?: "wall" | "door" | "glass" | "pipe" | "thin" | "thick";
}

export interface Room {
  x: number; y: number; w: number; h: number;
  label?: string;
  type?: string;
  fill?: string;
  rotation?: number;
}

export interface Zone {
  x?: number; y?: number; w?: number; h?: number;
  path?: string;
  color: string;
  label: string;
  opacity?: number;
}

export interface MapMarker {
  x: number; y: number;
  type: "encounter" | "scripted" | "item" | "danger" | "objective" | "start" | "end" | "entity" | "choice" | "landmark";
  label: string;
  description: string;
}

export interface LevelMap {
  id: string;
  name: string;
  subtitle: string;
  width: number;
  height: number;
  walls: Wall[];
  rooms: Room[];
  zones: Zone[];
  markers: MapMarker[];
  bgColor?: string;
  wallColor?: string;
  gridColor?: string;
  meta: {
    environment: string;
    duration: string;
    difficulty: string;
    entityDensity: string;
    combatViability: string;
    sanityImpact: string;
    tacticalStatus: string;
    keyDesign: string;
    colorProgression: string;
  };
}

const markerColors: Record<string, string> = {
  encounter: "#f5a623", scripted: "#d4a017", item: "#4a9eff", danger: "#ff4757",
  objective: "#2ed573", start: "#2ed573", end: "#ff4757", entity: "#ff6b81",
  choice: "#a855f7", landmark: "#94a3b8",
};

const markerGlyphs: Record<string, string> = {
  encounter: "\u26A0", scripted: "\u2605", item: "\u25C6", danger: "\u2716",
  objective: "\u25CF", start: "\u25B6", end: "\u2718", entity: "\u2620",
  choice: "?", landmark: "\u25CB",
};

export default function MapViewer({ level }: { level: LevelMap }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState({ x: 0, y: 0, scale: 1 });
  const [isPanning, setIsPanning] = useState(false);
  const [panStart, setPanStart] = useState({ x: 0, y: 0 });
  const [selectedMarker, setSelectedMarker] = useState<MapMarker | null>(null);
  const [hoveredMarker, setHoveredMarker] = useState<MapMarker | null>(null);
  const [showZones, setShowZones] = useState(true);
  const [showMarkers, setShowMarkers] = useState(true);
  const lastTouchDist = useRef(0);

  useEffect(() => {
    if (containerRef.current) {
      const r = containerRef.current.getBoundingClientRect();
      const sx = (r.width - 60) / level.width;
      const sy = (r.height - 60) / level.height;
      const s = Math.min(sx, sy, 2);
      setTransform({ x: (r.width - level.width * s) / 2, y: (r.height - level.height * s) / 2, scale: s });
    }
  }, [level.width, level.height]);

  const zoom = useCallback((factor: number, cx?: number, cy?: number) => {
    const r = containerRef.current?.getBoundingClientRect();
    if (!r) return;
    const centerX = cx ?? r.width / 2;
    const centerY = cy ?? r.height / 2;
    setTransform(prev => {
      const ns = Math.max(0.15, Math.min(6, prev.scale * factor));
      const ratio = ns / prev.scale;
      return { x: centerX - (centerX - prev.x) * ratio, y: centerY - (centerY - prev.y) * ratio, scale: ns };
    });
  }, []);

  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault();
    const r = containerRef.current?.getBoundingClientRect();
    if (!r) return;
    zoom(e.deltaY > 0 ? 0.92 : 1.08, e.clientX - r.left, e.clientY - r.top);
  }, [zoom]);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (e.button !== 0) return;
    setIsPanning(true);
    setPanStart({ x: e.clientX - transform.x, y: e.clientY - transform.y });
  }, [transform]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isPanning) return;
    setTransform(prev => ({ ...prev, x: e.clientX - panStart.x, y: e.clientY - panStart.y }));
  }, [isPanning, panStart]);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      setIsPanning(true);
      setPanStart({ x: e.touches[0].clientX - transform.x, y: e.touches[0].clientY - transform.y });
    } else if (e.touches.length === 2) {
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      lastTouchDist.current = Math.hypot(dx, dy);
    }
  }, [transform]);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    e.preventDefault();
    if (e.touches.length === 1 && isPanning) {
      setTransform(prev => ({ ...prev, x: e.touches[0].clientX - panStart.x, y: e.touches[0].clientY - panStart.y }));
    } else if (e.touches.length === 2) {
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      const dist = Math.hypot(dx, dy);
      if (lastTouchDist.current > 0) {
        const r = containerRef.current?.getBoundingClientRect();
        if (!r) return;
        const cx = (e.touches[0].clientX + e.touches[1].clientX) / 2 - r.left;
        const cy = (e.touches[0].clientY + e.touches[1].clientY) / 2 - r.top;
        zoom(dist / lastTouchDist.current, cx, cy);
      }
      lastTouchDist.current = dist;
    }
  }, [isPanning, panStart, zoom]);

  const handleTouchEnd = useCallback(() => { setIsPanning(false); lastTouchDist.current = 0; }, []);

  const resetView = () => {
    const r = containerRef.current?.getBoundingClientRect();
    if (!r) return;
    const sx = (r.width - 60) / level.width;
    const sy = (r.height - 60) / level.height;
    const s = Math.min(sx, sy, 2);
    setTransform({ x: (r.width - level.width * s) / 2, y: (r.height - level.height * s) / 2, scale: s });
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full overflow-hidden select-none"
      style={{ background: "#0a0a0c", cursor: isPanning ? "grabbing" : "grab", touchAction: "none" }}
      onMouseDown={handleMouseDown} onMouseMove={handleMouseMove}
      onMouseUp={() => setIsPanning(false)} onMouseLeave={() => setIsPanning(false)}
      onWheel={handleWheel}
      onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd}
    >
      {/* Controls */}
      <div className="absolute top-3 left-3 z-20 flex flex-col gap-1">
        <button onClick={() => zoom(1.3)} className="ctrl-btn"><ZoomIn size={14} /></button>
        <button onClick={() => zoom(0.7)} className="ctrl-btn"><ZoomOut size={14} /></button>
        <button onClick={resetView} className="ctrl-btn"><Maximize2 size={14} /></button>
        <div className="w-8 h-px bg-white/5 my-1" />
        <button onClick={() => setShowZones(!showZones)} className={`ctrl-btn ${showZones ? "active" : ""}`}>Z</button>
        <button onClick={() => setShowMarkers(!showMarkers)} className={`ctrl-btn ${showMarkers ? "active" : ""}`}>M</button>
      </div>

      {/* Level badge */}
      <div className="absolute top-3 right-3 z-20 bg-black/80 border border-white/10 px-3 py-2 backdrop-blur-sm">
        <div className="font-mono text-[9px] tracking-[0.3em] text-amber-500/60">LEVEL {level.id}</div>
        <div className="font-mono text-xs text-white/90 tracking-wide">{level.name}</div>
      </div>

      {/* Zoom */}
      <div className="absolute bottom-3 left-3 z-20 bg-black/60 border border-white/10 px-2 py-1 font-mono text-[9px] text-white/30">
        {Math.round(transform.scale * 100)}%
      </div>

      {/* Tooltip */}
      {hoveredMarker && !selectedMarker && (
        <div className="absolute bottom-3 right-3 z-20 bg-black/90 border border-white/15 px-3 py-2 max-w-[220px] backdrop-blur-sm">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-2 h-2 rounded-full" style={{ background: markerColors[hoveredMarker.type] }} />
            <span className="font-mono text-[9px] tracking-widest" style={{ color: markerColors[hoveredMarker.type] }}>
              {hoveredMarker.type.toUpperCase()}
            </span>
          </div>
          <div className="font-mono text-[11px] text-white/90">{hoveredMarker.label}</div>
        </div>
      )}

      {/* Selected panel */}
      {selectedMarker && (
        <div className="absolute bottom-3 right-3 z-20 bg-black/95 border border-white/15 w-80 max-h-[300px] overflow-y-auto backdrop-blur-sm">
          <div className="p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ background: markerColors[selectedMarker.type] }} />
                <span className="font-mono text-[9px] tracking-widest" style={{ color: markerColors[selectedMarker.type] }}>
                  {selectedMarker.type.toUpperCase()}
                </span>
              </div>
              <button onClick={() => setSelectedMarker(null)} className="text-white/30 hover:text-white/70"><X size={14} /></button>
            </div>
            <h4 className="font-mono text-sm text-white mb-2">{selectedMarker.label}</h4>
            <p className="text-xs text-white/50 leading-relaxed">{selectedMarker.description}</p>
          </div>
        </div>
      )}

      {/* SVG */}
      <svg width="100%" height="100%" className="absolute inset-0">
        <g transform={`translate(${transform.x},${transform.y}) scale(${transform.scale})`}>
          {/* Background */}
          <rect x={-100} y={-100} width={level.width + 200} height={level.height + 200} fill="#0a0a0c" />

          {/* Subtle grid */}
          <defs>
            <pattern id={`g-${level.id}`} width={50} height={50} patternUnits="userSpaceOnUse"
              patternTransform={`translate(${transform.x},${transform.y}) scale(${transform.scale})`}>
              <circle cx={25} cy={25} r={0.5} fill="rgba(255,255,255,0.03)" />
            </pattern>
          </defs>
          <rect x={0} y={0} width={level.width} height={level.height} fill={`url(#g-${level.id})`} />

          {/* Zones */}
          {showZones && level.zones.map((z, i) => (
            <g key={`z-${i}`}>
              {z.path ? (
                <path d={z.path} fill={z.color} fillOpacity={z.opacity || 0.08} stroke={z.color} strokeWidth={0.5} strokeOpacity={0.2} strokeDasharray="4 4" />
              ) : (
                <>
                  <rect x={z.x} y={z.y} width={z.w} height={z.h} fill={z.color} fillOpacity={0.08} rx={2} />
                  <rect x={z.x} y={z.y} width={z.w} height={z.h} fill="none" stroke={z.color} strokeWidth={0.5} strokeOpacity={0.2} strokeDasharray="4 4" rx={2} />
                </>
              )}
              {transform.scale > 0.5 && (
                <text x={(z.x || 0) + 8} y={(z.y || 0) + 14} fill={z.color} fillOpacity={0.35} fontSize={8} fontFamily="monospace" letterSpacing="0.15em">
                  {z.label}
                </text>
              )}
            </g>
          ))}

          {/* Rooms - filled shapes with borders */}
          {level.rooms.map((room, i) => {
            const fills: Record<string, string> = {
              office: "rgba(180,140,40,0.12)", corridor: "rgba(255,255,255,0.04)",
              atrium: "rgba(212,160,23,0.18)", maintenance: "rgba(200,120,40,0.1)",
              hazard: "rgba(200,60,40,0.12)", key: "rgba(212,160,23,0.2)",
              extraction: "rgba(200,40,30,0.18)", empty: "rgba(255,255,255,0.03)",
              industrial: "rgba(180,120,40,0.08)", pipe: "rgba(180,80,40,0.1)",
              flooded: "rgba(40,120,200,0.12)", building: "rgba(140,100,180,0.1)",
              street: "rgba(255,255,255,0.05)", cafe: "rgba(200,160,40,0.15)",
              tower: "rgba(140,68,173,0.2)", key_hazard: "rgba(200,60,40,0.15)",
            };
            const strokeColors: Record<string, string> = {
              office: "rgba(180,140,40,0.3)", corridor: "rgba(255,255,255,0.08)",
              atrium: "rgba(212,160,23,0.5)", key: "rgba(212,160,23,0.6)",
              extraction: "rgba(200,40,30,0.5)", industrial: "rgba(180,120,40,0.25)",
              pipe: "rgba(180,80,40,0.3)", flooded: "rgba(40,120,200,0.3)",
              building: "rgba(140,100,180,0.25)", cafe: "rgba(200,160,40,0.4)",
              tower: "rgba(140,68,173,0.5)", hazard: "rgba(200,60,40,0.35)",
              street: "rgba(255,255,255,0.08)",
            };
            const t = room.type || "empty";
            return (
              <g key={`r-${i}`}>
                <rect x={room.x} y={room.y} width={room.w} height={room.h}
                  fill={room.fill || fills[t] || fills.empty}
                  stroke={strokeColors[t] || "rgba(255,255,255,0.1)"}
                  strokeWidth={t === "corridor" ? 0.5 : 1}
                  rx={1}
                />
                {room.label && transform.scale > 0.4 && (
                  <text x={room.x + room.w / 2} y={room.y + room.h / 2}
                    textAnchor="middle" dominantBaseline="central"
                    fill={strokeColors[t] || "rgba(255,255,255,0.15)"}
                    fontSize={Math.min(9, Math.min(room.w, room.h) * 0.15)}
                    fontFamily="monospace" letterSpacing="0.12em" fontWeight="500"
                  >
                    {room.label}
                  </text>
                )}
              </g>
            );
          })}

          {/* Walls */}
          {level.walls.map((wall, i) => {
            const colors: Record<string, string> = {
              wall: "rgba(255,255,255,0.45)", door: "rgba(212,160,23,0.6)",
              glass: "rgba(100,200,255,0.35)", pipe: "rgba(160,140,100,0.3)",
              thin: "rgba(255,255,255,0.15)", thick: "rgba(255,255,255,0.6)",
            };
            const widths: Record<string, number> = {
              wall: 2, door: 2.5, glass: 1.5, pipe: 2.5, thin: 0.8, thick: 3,
            };
            const c = colors[wall.type || "wall"];
            const w = widths[wall.type || "wall"];
            return (
              <line key={`w-${i}`} x1={wall.x1} y1={wall.y1} x2={wall.x2} y2={wall.y2}
                stroke={c} strokeWidth={w} strokeLinecap="round"
              />
            );
          })}

          {/* Markers */}
          {showMarkers && level.markers.map((m, i) => {
            const c = markerColors[m.type];
            const g = markerGlyphs[m.type];
            const active = selectedMarker === m || hoveredMarker === m;
            const r = active ? 9 : 6;
            return (
              <g key={`m-${i}`} className="cursor-pointer"
                onClick={(e) => { e.stopPropagation(); setSelectedMarker(selectedMarker === m ? null : m); }}
                onMouseEnter={() => setHoveredMarker(m)} onMouseLeave={() => setHoveredMarker(null)}
              >
                <circle cx={m.x} cy={m.y} r={r + 6} fill={c} fillOpacity={active ? 0.15 : 0.06} />
                <circle cx={m.x} cy={m.y} r={r} fill={c} fillOpacity={0.9} stroke={c} strokeWidth={1.5} strokeOpacity={0.4} />
                <text x={m.x} y={m.y + 0.5} textAnchor="middle" dominantBaseline="central"
                  fill="#000" fontSize={active ? 8 : 6.5} fontFamily="monospace" fontWeight="bold"
                >{g}</text>
                {transform.scale > 0.7 && (
                  <text x={m.x + r + 5} y={m.y + 1} fill={c} fillOpacity={0.6}
                    fontSize={6.5} fontFamily="monospace" letterSpacing="0.05em"
                  >{m.label}</text>
                )}
              </g>
            );
          })}
        </g>
      </svg>

      <style jsx>{`
        .ctrl-btn { width: 32px; height: 32px; background: rgba(0,0,0,0.8); border: 1px solid rgba(255,255,255,0.1); display: flex; align-items: center; justify-content: center; color: rgba(255,255,255,0.4); transition: all 0.15s; }
        .ctrl-btn:hover { border-color: rgba(212,160,23,0.4); color: rgba(212,160,23,0.8); }
        .ctrl-btn.active { border-color: rgba(212,160,23,0.5); color: rgba(212,160,23,0.9); background: rgba(212,160,23,0.08); }
      `}</style>
    </div>
  );
}
