import { LevelMap } from "@/components/maps/MapViewer";

const W = 3600;
const H = 3200;

// Level 11: The Infinite City — Connected urban floor plan
// City blocks, streets, the cafe, plaza of bodies, the tower, threshold room.

const rooms = [
  // === ENTRY STREET ===
  { x: 1400, y: 60, w: 600, h: 200, label: "ENTRY STREET", type: "street" },
  // Buildings flanking entry
  { x: 1000, y: 60, w: 400, h: 200, type: "building" },
  { x: 2000, y: 60, w: 400, h: 200, type: "building" },

  // === BLOCK A (top-left) ===
  { x: 100, y: 360, w: 600, h: 400, label: "BLOCK A", type: "building" },
  // Interior walls
  { x: 300, y: 360, w: 4, h: 400, type: "empty" },
  { x: 500, y: 360, w: 4, h: 400, type: "empty" },
  { x: 100, y: 560, w: 600, h: 4, type: "empty" },

  // === BLOCK B (top-center) ===
  { x: 800, y: 360, w: 500, h: 300, label: "BLOCK B", type: "building" },
  { x: 1050, y: 360, w: 4, h: 300, type: "empty" },

  // === BLOCK C (top-right) ===
  { x: 2400, y: 360, w: 600, h: 400, label: "BLOCK C", type: "building" },
  { x: 2700, y: 360, w: 4, h: 400, type: "empty" },
  { x: 2400, y: 560, w: 600, h: 4, type: "empty" },

  // === WORKING CAFE ===
  { x: 800, y: 800, w: 400, h: 300, label: "WORKING CAFE", type: "cafe" },
  // Counter
  { x: 850, y: 900, w: 300, h: 4, type: "empty" },
  // Tables
  { x: 860, y: 950, w: 60, h: 60, type: "empty" },
  { x: 1060, y: 950, w: 60, h: 60, type: "empty" },
  { x: 860, y: 1030, w: 60, h: 60, type: "empty" },
  { x: 1060, y: 1030, w: 60, h: 60, type: "empty" },

  // === OTHER SQUAD (Russian expedition) ===
  { x: 2400, y: 800, w: 600, h: 400, label: "OTHER SQUAD", type: "building" },
  { x: 2600, y: 800, w: 4, h: 400, type: "empty" },
  { x: 2800, y: 800, w: 4, h: 400, type: "empty" },
  { x: 2400, y: 1000, w: 600, h: 4, type: "empty" },

  // === BLOCK D (mid-left) ===
  { x: 100, y: 900, w: 500, h: 400, label: "BLOCK D", type: "building" },
  { x: 350, y: 900, w: 4, h: 400, type: "empty" },
  { x: 100, y: 1100, w: 500, h: 4, type: "empty" },

  // === BLOCK E (mid-center) ===
  { x: 800, y: 1200, w: 400, h: 400, label: "BLOCK E", type: "building" },
  { x: 1000, y: 1200, w: 4, h: 400, type: "empty" },
  { x: 800, y: 1400, w: 400, h: 4, type: "empty" },

  // === PLAZA OF BODIES ===
  { x: 1500, y: 1200, w: 600, h: 600, label: "PLAZA OF BODIES", type: "street" },
  // Scattered bodies (small marks)
  { x: 1560, y: 1300, w: 4, h: 20, type: "empty" },
  { x: 1700, y: 1400, w: 4, h: 20, type: "empty" },
  { x: 1850, y: 1350, w: 4, h: 20, type: "empty" },
  { x: 1600, y: 1550, w: 4, h: 20, type: "empty" },
  { x: 1800, y: 1600, w: 4, h: 20, type: "empty" },
  { x: 1950, y: 1500, w: 4, h: 20, type: "empty" },
  { x: 1650, y: 1700, w: 4, h: 20, type: "empty" },
  { x: 1900, y: 1700, w: 4, h: 20, type: "empty" },

  // === BLOCK F (mid-right) ===
  { x: 2400, y: 1300, w: 500, h: 400, label: "BLOCK F", type: "building" },
  { x: 2650, y: 1300, w: 4, h: 400, type: "empty" },

  // === BLOCK G (bottom-left) ===
  { x: 100, y: 1500, w: 400, h: 400, label: "BLOCK G", type: "building" },
  { x: 300, y: 1500, w: 4, h: 400, type: "empty" },

  // === BLOCK H (bottom-center — Kade's departure) ===
  { x: 800, y: 1800, w: 500, h: 400, label: "BLOCK H", type: "building" },
  { x: 1050, y: 1800, w: 4, h: 400, type: "empty" },
  { x: 800, y: 2000, w: 500, h: 4, type: "empty" },

  // === THE TOWER ===
  { x: 1500, y: 1900, w: 600, h: 800, label: "THE TOWER", type: "tower" },
  // Inner structure
  { x: 1580, y: 1980, w: 440, h: 640, type: "empty" },
  // Threshold Room (octagon approximated as rectangle with chamfered corners)
  { x: 1620, y: 2100, w: 360, h: 400, label: "THRESHOLD ROOM", type: "key" },

  // === BLOCK I (bottom-right) ===
  { x: 2400, y: 1900, w: 500, h: 400, label: "BLOCK I", type: "building" },
  { x: 2650, y: 1900, w: 4, h: 400, type: "empty" },

  // === STREETS (connecting blocks) ===
  // Main horizontal street
  { x: 100, y: 300, w: 3200, h: 60, label: "", type: "street" },
  // Mid horizontal street
  { x: 100, y: 800, w: 700, h: 60, label: "", type: "street" },
  { x: 1300, y: 800, w: 1100, h: 60, label: "", type: "street" },
  // Lower horizontal street
  { x: 100, y: 1300, w: 700, h: 60, label: "", type: "street" },
  { x: 1200, y: 1300, w: 300, h: 60, label: "", type: "street" },
  { x: 2100, y: 1300, w: 300, h: 60, label: "", type: "street" },
  // Bottom horizontal street
  { x: 100, y: 1700, w: 3400, h: 60, label: "", type: "street" },
  // Bottom lower
  { x: 100, y: 2300, w: 3400, h: 60, label: "", type: "street" },

  // Vertical streets
  { x: 700, y: 300, w: 60, h: 500, label: "", type: "street" },
  { x: 1300, y: 300, w: 100, h: 500, label: "", type: "street" },
  { x: 2100, y: 300, w: 60, h: 500, label: "", type: "street" },
  { x: 3100, y: 300, w: 60, h: 2400, label: "", type: "street" },
  { x: 700, y: 860, w: 60, h: 440, label: "", type: "street" },
  { x: 1300, y: 860, w: 60, h: 440, label: "", type: "street" },
  { x: 2100, y: 860, w: 60, h: 440, label: "", type: "street" },
  { x: 700, y: 1360, w: 60, h: 340, label: "", type: "street" },
  { x: 2100, y: 1360, w: 60, h: 340, label: "", type: "street" },
  { x: 1300, y: 1760, w: 60, h: 140, label: "", type: "street" },
  { x: 2100, y: 1760, w: 60, h: 140, label: "", type: "street" },
  { x: 1300, y: 2360, w: 60, h: 800, label: "", type: "street" },
  { x: 2100, y: 2360, w: 60, h: 800, label: "", type: "street" },
];

function generateWalls(rooms: { x: number; y: number; w: number; h: number }[]) {
  const walls: { x1: number; y1: number; x2: number; y2: number; type: "wall" | "thin" }[] = [];
  const edgeKey = (x1: number, y1: number, x2: number, y2: number) => {
    const a = Math.min(x1, x2), b = Math.min(y1, y2);
    const c = Math.max(x1, x2), d = Math.max(y1, y2);
    return `${a},${b}|${c},${d}`;
  };
  const edgeCount = new Map<string, number>();
  for (const room of rooms) {
    const edges = [
      edgeKey(room.x, room.y, room.x + room.w, room.y),
      edgeKey(room.x, room.y + room.h, room.x + room.w, room.y + room.h),
      edgeKey(room.x, room.y, room.x, room.y + room.h),
      edgeKey(room.x + room.w, room.y, room.x + room.w, room.y + room.h),
    ];
    for (const e of edges) edgeCount.set(e, (edgeCount.get(e) || 0) + 1);
  }
  for (const room of rooms) {
    const edges = [
      { x1: room.x, y1: room.y, x2: room.x + room.w, y2: room.y },
      { x1: room.x, y1: room.y + room.h, x2: room.x + room.w, y2: room.y + room.h },
      { x1: room.x, y1: room.y, x2: room.x, y2: room.y + room.h },
      { x1: room.x + room.w, y1: room.y, x2: room.x + room.w, y2: room.y + room.h },
    ];
    for (const e of edges) {
      if (edgeCount.get(edgeKey(e.x1, e.y1, e.x2, e.y2)) === 1) walls.push({ ...e, type: "wall" });
    }
  }
  return walls;
}

const boundary = [
  { x1: 0, y1: 0, x2: W, y2: 0, type: "thick" as const },
  { x1: W, y1: 0, x2: W, y2: H, type: "thick" as const },
  { x1: W, y1: H, x2: 0, y2: H, type: "thick" as const },
  { x1: 0, y1: H, x2: 0, y2: 0, type: "thick" as const },
];

const zones = [
  { x: 60, y: 320, w: 680, h: 480, color: "#8e44ad", label: "BLOCK A" },
  { x: 760, y: 320, w: 580, h: 380, color: "#8e44ad", label: "BLOCK B" },
  { x: 2360, y: 320, w: 680, h: 480, color: "#8e44ad", label: "BLOCK C" },
  { x: 760, y: 760, w: 480, h: 380, color: "#d4a017", label: "CAFE ZONE" },
  { x: 2360, y: 760, w: 680, h: 480, color: "#c0392b", label: "OTHER SQUAD" },
  { x: 1460, y: 1160, w: 680, h: 680, color: "#e74c3c", label: "PLAZA" },
  { x: 1460, y: 1860, w: 680, h: 880, color: "#d4a017", label: "THE TOWER" },
];

const markers = [
  { x: 1700, y: 160, type: "start" as const, label: "Emergence into the City", description: "Open sky. An infinite city stretches in every direction. Buildings, streets, sidewalks — all empty. The Hum is almost peaceful." },
  { x: 1000, y: 950, type: "landmark" as const, label: "The Working Cafe", description: "A perfectly maintained cafe. Coffee cups on tables, pastries in the display case. No people. The coffee is hot." },
  { x: 2700, y: 1000, type: "encounter" as const, label: "The Other Squad", description: "A Russian expedition. All dead. Not killed — dead of fear. One clutches a data pad: 'We found the city. The city found us first.'" },
  { x: 1800, y: 1500, type: "danger" as const, label: "Plaza of Bodies", description: "Dozens of bodies from previous expeditions. Some wear Async logos that haven't been designed yet." },
  { x: 300, y: 1100, type: "entity" as const, label: "Citizens — First Encounter", description: "Humanoid shapes walking in patterns. Completely passive. They don't breathe. They don't rustle. The absence of sound is the most terrifying thing." },
  { x: 1800, y: 2300, type: "entity" as const, label: "The Architect's Influence", description: "Buildings shift. A street that led north now leads east. The Architect is reshaping the city around the squad." },
  { x: 1050, y: 2000, type: "scripted" as const, label: "Kade's Departure", description: "'That's my mama's church.' He walks toward a door. 'Kade, that's not real.' 'It's the realest thing I've seen since we got here.' The door closes. It's gone." },
  { x: 2650, y: 2100, type: "entity" as const, label: "The Statue (Optional)", description: "2.5 meters tall. Moves when unobserved. If the squad looks away, it's closer." },
  { x: 1800, y: 2300, type: "objective" as const, label: "The Threshold Room", description: "Circular room with windows showing every level. Terminal reads: 'BREACH REQUIRES LIVING MASS + CONSCIOUS INTENT. SACRIFICE MANDATORY.'" },
  { x: 900, y: 960, type: "item" as const, label: "Reyes's Chess Set", description: "A chess set mid-game. White vs White. She was playing against herself. White wins. Black made no attempt to defend." },
  { x: 1700, y: 1000, type: "landmark" as const, label: "Endless Street", description: "A street stretching to the horizon. Perfectly maintained streetlights. Perfectly empty. The hum of the lights is the only sound." },
];

export const level11: LevelMap = {
  id: "11",
  name: "The Infinite City",
  subtitle: "Terminus",
  width: W,
  height: H,
  walls: [...boundary, ...generateWalls(rooms)],
  rooms: rooms.map(r => ({ ...r, fill: undefined })),
  zones,
  markers,
  meta: {
    environment: "Endless urban landscape",
    duration: "60-90 min",
    difficulty: "Maximum",
    entityDensity: "Variable",
    combatViability: "Desperate",
    sanityImpact: "Existential crisis",
    tacticalStatus: "No formations. Comms one-way only. Stealth detection nearly impossible.",
    keyDesign: "Overwhelming scale. The horror of infinity. The final choice.",
    colorProgression: "Ash grey, neon flickers, void black, fire orange (apocalypse)",
  },
};
