"use client";

import { useRef, useState, useCallback, useEffect, ReactNode } from "react";
import { ZoomIn, ZoomOut, Maximize2, Info, X } from "lucide-react";

export interface Wall {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  type?: "wall" | "door" | "glass" | "pipe" | "debris" | "outline";
}

export interface Room {
  x: number;
  y: number;
  w: number;
  h: number;
  label?: string;
  type?: "office" | "corridor" | "atrium" | "maintenance" | "hazard" | "key" | "extraction" | "empty" | "industrial" | "pipe" | "flooded" | "city" | "building" | "street" | "cafe" | "tower";
  fill?: string;
}

export interface Zone {
  path: string;
  color: string;
  label: string;
  opacity?: number;
}

export interface MapMarker {
  x: number;
  y: number;
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
  gridColor?: string;
  wallColor?: string;
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

const markerColors: Record<MapMarker["type"], string> = {
  encounter: "#f39c12",
  scripted: "#d4a017",
  item: "#3498db",
  danger: "#e74c3c",
  objective: "#27ae60",
  start: "#2ecc71",
  end: "#e74c3c",
  entity: "#e74c3c",
  choice: "#8e44ad",
  landmark: "#95a5a6",
};

const markerIcons: Record<MapMarker["type"], string> = {
  encounter: "!",
  scripted: "S",
  item: "I",
  danger: "D",
  objective: "O",
  start: ">",
  end: "X",
  entity: "E",
  choice: "?",
  landmark: "L",
};

export default function MapViewer({ level }: { level: LevelMap }) {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState({ x: 0, y: 0, scale: 1 });
  const [isPanning, setIsPanning] = useState(false);
  const [panStart, setPanStart] = useState({ x: 0, y: 0 });
  const [selectedMarker, setSelectedMarker] = useState<MapMarker | null>(null);
  const [hoveredMarker, setHoveredMarker] = useState<MapMarker | null>(null);
  const [showZones, setShowZones] = useState(true);
  const [showMarkers, setShowMarkers] = useState(true);
  const [showGrid, setShowGrid] = useState(true);
  const lastTouchDistance = useRef<number>(0);

  // Center map on load
  useEffect(() => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const scaleX = (rect.width - 40) / level.width;
      const scaleY = (rect.height - 40) / level.height;
      const initialScale = Math.min(scaleX, scaleY, 1.5);
      setTransform({
        x: (rect.width - level.width * initialScale) / 2,
        y: (rect.height - level.height * initialScale) / 2,
        scale: initialScale,
      });
    }
  }, [level.width, level.height]);

  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault();
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const zoomFactor = e.deltaY > 0 ? 0.9 : 1.1;
    const newScale = Math.max(0.1, Math.min(5, transform.scale * zoomFactor));
    const ratio = newScale / transform.scale;

    setTransform({
      x: mouseX - (mouseX - transform.x) * ratio,
      y: mouseY - (mouseY - transform.y) * ratio,
      scale: newScale,
    });
  }, [transform]);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (e.button !== 0) return;
    setIsPanning(true);
    setPanStart({ x: e.clientX - transform.x, y: e.clientY - transform.y });
  }, [transform]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isPanning) return;
    setTransform(prev => ({
      ...prev,
      x: e.clientX - panStart.x,
      y: e.clientY - panStart.y,
    }));
  }, [isPanning, panStart]);

  const handleMouseUp = useCallback(() => {
    setIsPanning(false);
  }, []);

  // Touch handling
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      setIsPanning(true);
      setPanStart({
        x: e.touches[0].clientX - transform.x,
        y: e.touches[0].clientY - transform.y,
      });
    } else if (e.touches.length === 2) {
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      lastTouchDistance.current = Math.hypot(dx, dy);
    }
  }, [transform]);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    e.preventDefault();
    if (e.touches.length === 1 && isPanning) {
      setTransform(prev => ({
        ...prev,
        x: e.touches[0].clientX - panStart.x,
        y: e.touches[0].clientY - panStart.y,
      }));
    } else if (e.touches.length === 2) {
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      const dist = Math.hypot(dx, dy);
      if (lastTouchDistance.current > 0) {
        const rect = containerRef.current?.getBoundingClientRect();
        if (!rect) return;
        const centerX = (e.touches[0].clientX + e.touches[1].clientX) / 2 - rect.left;
        const centerY = (e.touches[0].clientY + e.touches[1].clientY) / 2 - rect.top;
        const ratio = dist / lastTouchDistance.current;
        const newScale = Math.max(0.1, Math.min(5, transform.scale * ratio));
        const scaleRatio = newScale / transform.scale;
        setTransform({
          x: centerX - (centerX - transform.x) * scaleRatio,
          y: centerY - (centerY - transform.y) * scaleRatio,
          scale: newScale,
        });
      }
      lastTouchDistance.current = dist;
    }
  }, [isPanning, panStart, transform]);

  const handleTouchEnd = useCallback(() => {
    setIsPanning(false);
    lastTouchDistance.current = 0;
  }, []);

  const zoomIn = () => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const newScale = Math.min(5, transform.scale * 1.3);
    const ratio = newScale / transform.scale;
    setTransform({
      x: cx - (cx - transform.x) * ratio,
      y: cy - (cy - transform.y) * ratio,
      scale: newScale,
    });
  };

  const zoomOut = () => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const newScale = Math.max(0.1, transform.scale * 0.7);
    const ratio = newScale / transform.scale;
    setTransform({
      x: cx - (cx - transform.x) * ratio,
      y: cy - (cy - transform.y) * ratio,
      scale: newScale,
    });
  };

  const resetView = () => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const scaleX = (rect.width - 40) / level.width;
    const scaleY = (rect.height - 40) / level.height;
    const s = Math.min(scaleX, scaleY, 1.5);
    setTransform({
      x: (rect.width - level.width * s) / 2,
      y: (rect.height - level.height * s) / 2,
      scale: s,
    });
  };

  const roomFills: Record<string, string> = {
    office: "rgba(212, 160, 23, 0.08)",
    corridor: "rgba(212, 160, 23, 0.04)",
    atrium: "rgba(212, 160, 23, 0.12)",
    maintenance: "rgba(230, 126, 34, 0.08)",
    hazard: "rgba(192, 57, 43, 0.1)",
    key: "rgba(212, 160, 23, 0.15)",
    extraction: "rgba(192, 57, 43, 0.15)",
    empty: "rgba(42, 45, 53, 0.3)",
    industrial: "rgba(230, 126, 34, 0.06)",
    pipe: "rgba(192, 57, 43, 0.06)",
    flooded: "rgba(41, 128, 185, 0.1)",
    city: "rgba(142, 68, 173, 0.04)",
    building: "rgba(142, 68, 173, 0.08)",
    street: "rgba(42, 45, 53, 0.2)",
    cafe: "rgba(212, 160, 23, 0.1)",
    tower: "rgba(142, 68, 173, 0.15)",
  };

  return (
    <div className="relative w-full h-full bg-steel-dark/80 border border-steel-light/10 overflow-hidden select-none"
      ref={containerRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onWheel={handleWheel}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      style={{ cursor: isPanning ? "grabbing" : "grab", touchAction: "none" }}
    >
      {/* Controls */}
      <div className="absolute top-3 left-3 z-20 flex flex-col gap-1">
        <button onClick={zoomIn} className="w-8 h-8 bg-background/90 border border-steel-light/20 flex items-center justify-center text-amber-dim hover:text-amber hover:border-amber/30 transition-colors">
          <ZoomIn size={14} />
        </button>
        <button onClick={zoomOut} className="w-8 h-8 bg-background/90 border border-steel-light/20 flex items-center justify-center text-amber-dim hover:text-amber hover:border-amber/30 transition-colors">
          <ZoomOut size={14} />
        </button>
        <button onClick={resetView} className="w-8 h-8 bg-background/90 border border-steel-light/20 flex items-center justify-center text-amber-dim hover:text-amber hover:border-amber/30 transition-colors">
          <Maximize2 size={14} />
        </button>
        <div className="w-8 h-px bg-steel-light/10 my-1" />
        <button
          onClick={() => setShowZones(!showZones)}
          className={`w-8 h-8 bg-background/90 border flex items-center justify-center text-[10px] font-mono transition-colors ${showZones ? "border-amber/30 text-amber" : "border-steel-light/20 text-steel-light/40"}`}
          title="Toggle zones"
        >
          Z
        </button>
        <button
          onClick={() => setShowMarkers(!showMarkers)}
          className={`w-8 h-8 bg-background/90 border flex items-center justify-center text-[10px] font-mono transition-colors ${showMarkers ? "border-amber/30 text-amber" : "border-steel-light/20 text-steel-light/40"}`}
          title="Toggle markers"
        >
          M
        </button>
        <button
          onClick={() => setShowGrid(!showGrid)}
          className={`w-8 h-8 bg-background/90 border flex items-center justify-center text-[10px] font-mono transition-colors ${showGrid ? "border-amber/30 text-amber" : "border-steel-light/20 text-steel-light/40"}`}
          title="Toggle grid"
        >
          G
        </button>
      </div>

      {/* Level info */}
      <div className="absolute top-3 right-3 z-20 text-right">
        <div className="bg-background/90 border border-steel-light/20 px-3 py-2">
          <div className="font-mono text-[10px] text-amber-dim tracking-[0.2em]">LEVEL {level.id}</div>
          <div className="font-mono text-xs text-foreground tracking-wider">{level.name}</div>
          <div className="font-mono text-[9px] text-steel-light/50 mt-0.5">{level.meta.environment}</div>
        </div>
      </div>

      {/* Zoom indicator */}
      <div className="absolute bottom-3 left-3 z-20">
        <div className="bg-background/90 border border-steel-light/20 px-2 py-1 font-mono text-[9px] text-steel-light/50">
          {Math.round(transform.scale * 100)}%
        </div>
      </div>

      {/* Marker tooltip */}
      {hoveredMarker && !selectedMarker && (
        <div className="absolute bottom-3 right-3 z-20 bg-background/95 border border-steel-light/30 px-3 py-2 max-w-[250px]">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-2 h-2 rounded-full" style={{ background: markerColors[hoveredMarker.type] }} />
            <span className="font-mono text-[10px] tracking-wider" style={{ color: markerColors[hoveredMarker.type] }}>
              {hoveredMarker.type.toUpperCase()}
            </span>
          </div>
          <div className="font-mono text-xs text-foreground">{hoveredMarker.label}</div>
        </div>
      )}

      {/* Selected marker panel */}
      {selectedMarker && (
        <div className="absolute bottom-3 right-3 z-20 bg-background/95 border border-steel-light/30 w-72 max-h-[300px] overflow-y-auto">
          <div className="p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ background: markerColors[selectedMarker.type] }} />
                <span className="font-mono text-[10px] tracking-wider" style={{ color: markerColors[selectedMarker.type] }}>
                  {selectedMarker.type.toUpperCase()}
                </span>
              </div>
              <button onClick={() => setSelectedMarker(null)} className="text-steel-light/40 hover:text-foreground transition-colors">
                <X size={14} />
              </button>
            </div>
            <h4 className="font-mono text-sm text-foreground mb-1">{selectedMarker.label}</h4>
            <p className="text-xs text-steel-light/70 leading-relaxed">{selectedMarker.description}</p>
          </div>
        </div>
      )}

      {/* SVG */}
      <svg
        ref={svgRef}
        width="100%"
        height="100%"
        className="absolute inset-0"
      >
        <defs>
          <pattern id={`grid-${level.id}`} width={50} height={50} patternUnits="userSpaceOnUse"
            patternTransform={`translate(${transform.x},${transform.y}) scale(${transform.scale})`}>
            <path d={`M ${50} 0 L 0 0 0 ${50}`} fill="none" stroke={level.gridColor || "rgba(212,160,23,0.06)"} strokeWidth={0.5 / transform.scale} />
          </pattern>
        </defs>

        <g transform={`translate(${transform.x},${transform.y}) scale(${transform.scale})`}>
          {/* Background */}
          <rect x={-500} y={-500} width={level.width + 1000} height={level.height + 1000} fill={level.bgColor || "#0d0d10"} />

          {/* Grid */}
          {showGrid && (
            <rect x={0} y={0} width={level.width} height={level.height} fill={`url(#grid-${level.id})`} />
          )}

          {/* Zones */}
          {showZones && level.zones.map((zone, i) => (
            <path
              key={`zone-${i}`}
              d={zone.path}
              fill={zone.color}
              fillOpacity={zone.opacity || 0.15}
              stroke={zone.color}
              strokeWidth={0.5}
              strokeOpacity={0.3}
            />
          ))}

          {/* Rooms */}
          {level.rooms.map((room, i) => (
            <g key={`room-${i}`}>
              <rect
                x={room.x}
                y={room.y}
                width={room.w}
                height={room.h}
                fill={room.fill || roomFills[room.type || "empty"] || roomFills.empty}
                stroke={level.wallColor || "rgba(212,160,23,0.15)"}
                strokeWidth={0.5}
              />
              {room.label && transform.scale > 0.6 && (
                <text
                  x={room.x + room.w / 2}
                  y={room.y + room.h / 2}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill="rgba(212,160,23,0.25)"
                  fontSize={Math.min(10, room.w / room.label.length * 1.2)}
                  fontFamily="monospace"
                  letterSpacing="0.1em"
                >
                  {room.label}
                </text>
              )}
            </g>
          ))}

          {/* Walls */}
          {level.walls.map((wall, i) => {
            const wallStroke = wall.type === "door" ? "rgba(212,160,23,0.4)" :
              wall.type === "glass" ? "rgba(100,200,255,0.3)" :
              wall.type === "pipe" ? "rgba(150,150,150,0.3)" :
              wall.type === "debris" ? "rgba(120,80,40,0.3)" :
              wall.type === "outline" ? "rgba(212,160,23,0.1)" :
              level.wallColor || "rgba(212,160,23,0.35)";

            const wallWidth = wall.type === "pipe" ? 2 :
              wall.type === "glass" ? 1 :
              wall.type === "debris" ? 1.5 :
              wall.type === "outline" ? 0.5 :
              2;

            return (
              <line
                key={`wall-${i}`}
                x1={wall.x1}
                y1={wall.y1}
                x2={wall.x2}
                y2={wall.y2}
                stroke={wallStroke}
                strokeWidth={wallWidth}
                strokeLinecap={wall.type === "debris" ? "round" : "square"}
              />
            );
          })}

          {/* Markers */}
          {showMarkers && level.markers.map((marker, i) => {
            const color = markerColors[marker.type];
            const icon = markerIcons[marker.type];
            const isSelected = selectedMarker === marker;
            const isHovered = hoveredMarker === marker;
            const r = isSelected ? 10 : isHovered ? 8 : 6;

            return (
              <g
                key={`marker-${i}`}
                className="cursor-pointer"
                onClick={(e) => { e.stopPropagation(); setSelectedMarker(isSelected ? null : marker); }}
                onMouseEnter={() => setHoveredMarker(marker)}
                onMouseLeave={() => setHoveredMarker(null)}
              >
                {/* Pulse ring */}
                <circle cx={marker.x} cy={marker.y} r={r + 4} fill={color} fillOpacity={isSelected ? 0.2 : 0.08} />
                {/* Main circle */}
                <circle cx={marker.x} cy={marker.y} r={r} fill={color} fillOpacity={0.9} stroke={color} strokeWidth={1} strokeOpacity={0.5} />
                {/* Icon */}
                <text
                  x={marker.x}
                  y={marker.y}
                  textAnchor="middle"
                  dominantBaseline="central"
                  fill="#000"
                  fontSize={isSelected ? 8 : 7}
                  fontFamily="monospace"
                  fontWeight="bold"
                >
                  {icon}
                </text>
                {/* Label */}
                {transform.scale > 0.8 && (
                  <text
                    x={marker.x + r + 4}
                    y={marker.y + 1}
                    fill={color}
                    fontSize={7}
                    fontFamily="monospace"
                    fillOpacity={0.7}
                    letterSpacing="0.05em"
                  >
                    {marker.label}
                  </text>
                )}
              </g>
            );
          })}
        </g>
      </svg>
    </div>
  );
}
