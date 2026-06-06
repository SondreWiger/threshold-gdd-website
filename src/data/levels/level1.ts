import { LevelMap } from "@/components/maps/MapViewer";

const W = 3000;
const H = 2400;

// Level 1: Habitable Zone — Connected industrial floor plan
// Warehouses, corridors, elevator, boiler room, three-path junction.

const rooms = [
  // === ENTRY / WAREHOUSE A ===
  { x: 60, y: 60, w: 500, h: 350, label: "WAREHOUSE A", type: "industrial" },
  // Shelving inside
  { x: 120, y: 100, w: 4, h: 270, type: "empty" },
  { x: 200, y: 100, w: 4, h: 270, type: "empty" },
  { x: 280, y: 100, w: 4, h: 270, type: "empty" },
  { x: 360, y: 100, w: 4, h: 270, type: "empty" },
  { x: 440, y: 100, w: 4, h: 270, type: "empty" },

  // === WAREHOUSE B ===
  { x: 60, y: 490, w: 400, h: 300, label: "WAREHOUSE B", type: "industrial" },
  { x: 120, y: 530, w: 4, h: 220, type: "empty" },
  { x: 200, y: 530, w: 4, h: 220, type: "empty" },
  { x: 280, y: 530, w: 4, h: 220, type: "empty" },

  // === WAREHOUSE C ===
  { x: 540, y: 490, w: 350, h: 260, label: "WAREHOUSE C", type: "industrial" },

  // === CORRIDOR: A→B connection ===
  { x: 180, y: 410, w: 100, h: 80, label: "", type: "corridor" },
  // === CORRIDOR: B→C connection ===
  { x: 460, y: 560, w: 80, h: 100, label: "", type: "corridor" },

  // === MAIN HORIZONTAL CORRIDOR (spine) ===
  { x: 60, y: 860, w: 1800, h: 80, label: "MAIN CORRIDOR", type: "corridor" },
  // Corridor openings from warehouses
  { x: 180, y: 790, w: 100, h: 70, label: "", type: "corridor" },
  { x: 600, y: 750, w: 100, h: 110, label: "", type: "corridor" },

  // === ELEVATOR SHAFT ===
  { x: 1920, y: 60, w: 160, h: 300, label: "ELEVATOR", type: "key" },
  // Elevator interior rails
  { x: 1960, y: 80, w: 4, h: 260, type: "empty" },
  { x: 2040, y: 80, w: 4, h: 260, type: "empty" },
  // Connection to main corridor
  { x: 1960, y: 360, w: 80, h: 500, label: "", type: "corridor" },

  // === BOILER ROOM ===
  { x: 1920, y: 440, w: 400, h: 300, label: "BOILER ROOM", type: "hazard" },
  // Boiler pipes
  { x: 1980, y: 460, w: 4, h: 260, type: "empty" },
  { x: 2060, y: 460, w: 4, h: 260, type: "empty" },
  { x: 2140, y: 460, w: 4, h: 260, type: "empty" },
  { x: 2220, y: 460, w: 4, h: 260, type: "empty" },
  // Connection to elevator corridor
  { x: 1920, y: 540, w: 40, h: 100, label: "", type: "corridor" },

  // === THREE-PATH JUNCTION ===
  { x: 1000, y: 860, w: 200, h: 160, label: "JUNCTION", type: "key" },
  // Junction exits
  { x: 1000, y: 940, w: 40, h: 80, label: "", type: "corridor" }, // left
  { x: 1160, y: 1020, w: 40, h: 80, label: "", type: "corridor" }, // center
  { x: 1160, y: 940, w: 40, h: 80, label: "", type: "corridor" }, // right

  // === PATH 1: STORAGE (left) ===
  { x: 600, y: 1020, w: 400, h: 300, label: "STORAGE", type: "industrial" },
  // Shelving
  { x: 660, y: 1060, w: 4, h: 220, type: "empty" },
  { x: 740, y: 1060, w: 4, h: 220, type: "empty" },
  { x: 820, y: 1060, w: 4, h: 220, type: "empty" },
  { x: 900, y: 1060, w: 4, h: 220, type: "empty" },
  // Connection
  { x: 960, y: 1100, w: 40, h: 100, label: "", type: "corridor" },

  // === PATH 2: MAINTENANCE (center, narrow) ===
  { x: 1160, y: 1100, w: 120, h: 400, label: "MAINTENANCE", type: "maintenance" },
  // Pipes on walls
  { x: 1175, y: 1120, w: 4, h: 360, type: "empty" },
  { x: 1261, y: 1120, w: 4, h: 360, type: "empty" },
  // Cross pipes
  { x: 1175, y: 1200, x2: 1265, y2: 1200 } as any,
  { x: 1175, y: 1300, x2: 1265, y2: 1300 } as any,
  { x: 1175, y: 1400, x2: 1265, y2: 1400 } as any,

  // === PATH 3: ADMINISTRATION (right) ===
  { x: 1200, y: 860, w: 360, h: 160, label: "ADMINISTRATION", type: "office" },
  // Desks
  { x: 1240, y: 890, w: 60, h: 40, type: "empty" },
  { x: 1340, y: 890, w: 60, h: 40, type: "empty" },
  { x: 1240, y: 950, w: 60, h: 40, type: "empty" },
  { x: 1340, y: 950, w: 60, h: 40, type: "empty" },
  // Connection down
  { x: 1340, y: 1020, w: 80, h: 80, label: "", type: "corridor" },

  // === FUSE BOX ROOM ===
  { x: 1400, y: 1100, w: 200, h: 150, label: "FUSE BOX", type: "key" },
  // Fuse boxes on wall
  { x: 1420, y: 1120, w: 40, h: 4, type: "empty" },
  { x: 1500, y: 1120, w: 40, h: 4, type: "empty" },
  // Connection
  { x: 1400, y: 1160, w: 40, h: 60, label: "", type: "corridor" },

  // === SURVIVOR'S ROOM ===
  { x: 600, y: 1420, w: 200, h: 160, label: "SURVIVOR", type: "key" },
  // Connection
  { x: 600, y: 1320, w: 80, h: 100, label: "", type: "corridor" },

  // === VOSS CORRIDOR ===
  { x: 800, y: 1480, w: 120, h: 200, label: "VOSS", type: "corridor" },
  // Carving on wall
  { x: 810, y: 1560, w: 100, h: 4, type: "empty" },

  // === PIPE ZONE (lower) ===
  { x: 60, y: 1700, w: 200, h: 350, label: "PIPE ZONE", type: "pipe" },
  // Pipes
  { x: 80, y: 1720, w: 4, h: 310, type: "empty" },
  { x: 180, y: 1720, w: 4, h: 310, type: "empty" },
  // Connection
  { x: 140, y: 1650, w: 80, h: 50, label: "", type: "corridor" },

  // === DESCENT SHAFT ===
  { x: 1800, y: 1400, w: 160, h: 200, label: "DESCENT", type: "key" },
  // Ladder
  { x: 1840, y: 1420, w: 4, h: 160, type: "empty" },
  { x: 1920, y: 1420, w: 4, h: 160, type: "empty" },
  // Rungs
  ...Array.from({ length: 8 }, (_, i) => ({
    x: 1840, y: 1430 + i * 20, w: 80, h: 4, type: "empty" as const,
  })),
  // Connection
  { x: 1840, y: 1340, w: 80, h: 60, label: "", type: "corridor" },

  // === LOWER CORRIDOR ===
  { x: 60, y: 1320, w: 540, h: 60, label: "", type: "corridor" },
  { x: 60, y: 1650, w: 740, h: 50, label: "", type: "corridor" },

  // === BOTTOM CORRIDOR ===
  { x: 60, y: 2050, w: 1900, h: 60, label: "BOTTOM CORRIDOR", type: "corridor" },
  // Connections to bottom corridor
  { x: 60, y: 2000, w: 80, h: 50, label: "", type: "corridor" },
  { x: 600, y: 1580, w: 80, h: 470, label: "", type: "corridor" },
  { x: 1800, y: 1600, w: 80, h: 450, label: "", type: "corridor" },

  // === BOTTOM ROOMS ===
  { x: 200, y: 2110, w: 200, h: 150, label: "OFFICE \u03B1", type: "office" },
  { x: 440, y: 2110, w: 200, h: 150, label: "OFFICE \u03B2", type: "office" },
  { x: 680, y: 2110, w: 200, h: 150, label: "OFFICE \u03B3", type: "office" },
  { x: 920, y: 2110, w: 200, h: 150, label: "OFFICE \u03B4", type: "office" },
  { x: 1160, y: 2110, w: 200, h: 150, label: "OFFICE \u03B5", type: "office" },
  { x: 1400, y: 2110, w: 200, h: 150, label: "OFFICE \u03B6", type: "office" },
  { x: 1640, y: 2110, w: 200, h: 150, label: "OFFICE \u03B7", type: "office" },
  { x: 1880, y: 2110, w: 200, h: 150, label: "OFFICE \u03B8", type: "office" },
];

// Generate walls from rooms (shared-wall approach)
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
      const k = edgeKey(e.x1, e.y1, e.x2, e.y2);
      if (edgeCount.get(k) === 1) walls.push({ ...e, type: "wall" });
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

const generatedWalls = generateWalls(rooms);

// Fix cross-pipes that used x2/y2 instead of w/h
const pipeFixes: { x1: number; y1: number; x2: number; y2: number; type: "wall" | "thin" }[] = [
  { x1: 1175, y1: 1200, x2: 1265, y2: 1200, type: "thin" },
  { x1: 1175, y1: 1300, x2: 1265, y2: 1300, type: "thin" },
  { x1: 1175, y1: 1400, x2: 1265, y2: 1400, type: "thin" },
];

const zones = [
  { x: 20, y: 20, w: 560, h: 430, color: "#e67e22", label: "WAREHOUSE A" },
  { x: 20, y: 450, w: 900, h: 380, color: "#e67e22", label: "WAREHOUSE B/C" },
  { x: 20, y: 820, w: 1860, h: 160, color: "#e67e22", label: "MAIN CORRIDOR" },
  { x: 1880, y: 20, w: 500, h: 760, color: "#f39c12", label: "ELEVATOR/BOILER" },
  { x: 960, y: 820, w: 420, h: 240, color: "#d4a017", label: "JUNCTION" },
  { x: 560, y: 980, w: 460, h: 380, color: "#e67e22", label: "STORAGE" },
  { x: 1120, y: 1060, w: 200, h: 480, color: "#c0392b", label: "MAINTENANCE" },
  { x: 1360, y: 1060, w: 280, h: 230, color: "#d4a017", label: "FUSE BOX" },
  { x: 20, y: 1660, w: 280, h: 430, color: "#c0392b", label: "PIPE ZONE" },
  { x: 1760, y: 1360, w: 240, h: 280, color: "#d4a017", label: "DESCENT" },
];

const markers = [
  { x: 300, y: 235, type: "start" as const, label: "Entry from Level 0", description: "The squad emerges from a climbing shaft into industrial space. The yellow wallpaper is gone. Replaced by concrete and metal. The Hum changes pitch." },
  { x: 2000, y: 200, type: "encounter" as const, label: "Rattler in Elevator Shaft", description: "The elevator is dead. Inside the shaft, something metallic shifts. The Rattler — a serpentine entity made of pipe and wire — coils around the rails." },
  { x: 2120, y: 590, type: "encounter" as const, label: "Adult Rattler — Boiler Room", description: "Steam hisses from broken pipes. An adult Rattler — much larger — moves through the pipe network. Navigate without triggering it." },
  { x: 1500, y: 1170, type: "objective" as const, label: "Power Restoration Puzzle", description: "Fuse boxes. Three fuse boxes, correct combination opens the path. While working, the lights flicker — something is watching." },
  { x: 1220, y: 1300, type: "danger" as const, label: "Smiler Combat — Light Management", description: "A Smiler blocks the maintenance corridor. Fast in darkness. Manage light sources to keep it at bay while moving through." },
  { x: 130, y: 1875, type: "entity" as const, label: "Pipe Crawler Observation", description: "Through a grate, the squad watches a Pipe Crawler move through the pipe network. Emaciated, fast, disturbingly human." },
  { x: 700, y: 1500, type: "scripted" as const, label: "The Survivor", description: "'3.7 percent. That's the extraction rate. Always has been.' It stands, walks through a solid wall, and is gone." },
  { x: 860, y: 1580, type: "scripted" as const, label: "Dr. Voss's Carving", description: "'I'm sorry. I thought I could control it.' — Dr. Elias Voss. The carving is decades old." },
  { x: 1880, y: 1500, type: "end" as const, label: "Descent to Level 2", description: "A climbing shaft leads down. The air gets colder. The walls get narrower. Below, the sound of dripping water." },
  { x: 1100, y: 940, type: "choice" as const, label: "Three-Path Junction", description: "Player choice: Storage (combat, resources), Maintenance (dangerous, entity-heavy), or Administration (lore, documents)." },
  { x: 2000, y: 160, type: "item" as const, label: "Extraction Beacon Log", description: "The last entry reads: 'They knew.'" },
];

export const level1: LevelMap = {
  id: "1",
  name: "Habitable Zone",
  subtitle: "Reality Check",
  width: W,
  height: H,
  walls: [...boundary, ...generatedWalls, ...pipeFixes],
  rooms: rooms.map(r => ({ ...r, fill: undefined })),
  zones,
  markers,
  meta: {
    environment: "Industrial warehouse spaces, concrete, metal shelving",
    duration: "90-120 min",
    difficulty: "Medium",
    entityDensity: "Moderate",
    combatViability: "Medium-High",
    sanityImpact: "Growing paranoia",
    tacticalStatus: "Comms occasionally static. Squad AI hesitates.",
    keyDesign: "Three-zone structure fully realized. Player choice in routing.",
    colorProgression: "Industrial greys, warning oranges, cold fluorescents (unease)",
  },
};
