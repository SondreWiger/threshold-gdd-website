import { LevelMap } from "@/components/maps/MapViewer";

const W = 3200;
const H = 3000;

// Level 4: Abandoned Office — Connected psychological horror floor plan
// Desaturated office park. Cubicles, conference rooms, memory spaces, glass walkway.

const rooms = [
  // === ENTRY ===
  { x: 1300, y: 60, w: 400, h: 160, label: "ENTRY", type: "corridor" },

  // === CUBICLE GRID (irregular, offset) ===
  // Row 1
  { x: 100, y: 300, w: 160, h: 120, label: "", type: "office" },
  { x: 280, y: 300, w: 140, h: 130, label: "", type: "office" },
  { x: 440, y: 300, w: 170, h: 110, label: "", type: "office" },
  { x: 630, y: 300, w: 130, h: 140, label: "", type: "office" },
  { x: 780, y: 300, w: 160, h: 120, label: "", type: "office" },
  { x: 960, y: 300, w: 140, h: 130, label: "", type: "office" },
  // Row 2 (offset)
  { x: 140, y: 460, w: 150, h: 110, label: "", type: "office" },
  { x: 310, y: 460, w: 160, h: 120, label: "", type: "office" },
  { x: 490, y: 460, w: 130, h: 130, label: "", type: "office" },
  { x: 640, y: 460, w: 170, h: 110, label: "", type: "office" },
  { x: 830, y: 460, w: 140, h: 120, label: "", type: "office" },
  { x: 990, y: 460, w: 150, h: 130, label: "", type: "office" },
  // Row 3
  { x: 100, y: 610, w: 140, h: 120, label: "", type: "office" },
  { x: 260, y: 610, w: 170, h: 110, label: "", type: "office" },
  { x: 450, y: 610, w: 130, h: 130, label: "", type: "office" },
  { x: 600, y: 610, w: 160, h: 120, label: "", type: "office" },
  { x: 780, y: 610, w: 140, h: 110, label: "", type: "office" },
  { x: 940, y: 610, w: 170, h: 130, label: "", type: "office" },

  // === CONFERENCE ROOMS (The Meeting territory) ===
  { x: 2000, y: 300, w: 400, h: 250, label: "CONFERENCE A", type: "office" },
  // Table
  { x: 2080, y: 360, w: 240, h: 120, type: "empty" },
  // The Meeting room
  { x: 2000, y: 580, w: 500, h: 350, label: "THE MEETING", type: "key" },
  // Meeting table
  { x: 2100, y: 660, w: 300, h: 160, type: "empty" },
  // PowerPoint screen
  { x: 2200, y: 590, w: 100, h: 4, type: "empty" },

  // === DOPPELGANGER CORRIDOR ===
  { x: 1300, y: 800, w: 120, h: 500, label: "DOPPEL CORRIDOR", type: "corridor" },
  // Wrong interior walls
  { x: 1320, y: 900, w: 4, h: 200, type: "empty" },
  { x: 1396, y: 1000, w: 4, h: 200, type: "empty" },

  // === MEMORY BUILDINGS ===
  // Vance's desk
  { x: 100, y: 1000, w: 300, h: 250, label: "VANCE'S DESK", type: "key" },
  // Desk
  { x: 160, y: 1080, w: 180, h: 80, type: "empty" },
  // Kade's church
  { x: 500, y: 1000, w: 400, h: 250, label: "KADE'S CHURCH", type: "key" },
  // Pews
  { x: 540, y: 1100, w: 320, h: 4, type: "empty" },
  { x: 540, y: 1160, w: 320, h: 4, type: "empty" },
  { x: 540, y: 1220, w: 320, h: 4, type: "empty" },

  // === HOLT'S ROOM ===
  { x: 100, y: 1350, w: 350, h: 250, label: "HOLT'S ROOM", type: "office" },
  // Chess set
  { x: 200, y: 1440, w: 80, h: 80, type: "empty" },

  // === SERVER ROOM (Reyes) ===
  { x: 550, y: 1350, w: 450, h: 300, label: "SERVER ROOM", type: "key" },
  // Server racks
  { x: 600, y: 1400, w: 4, h: 200, type: "empty" },
  { x: 680, y: 1400, w: 4, h: 200, type: "empty" },
  { x: 760, y: 1400, w: 4, h: 200, type: "empty" },
  { x: 840, y: 1400, w: 4, h: 200, type: "empty" },
  { x: 920, y: 1400, w: 4, h: 200, type: "empty" },

  // === THORNE'S ROOM ===
  { x: 2000, y: 1100, w: 400, h: 250, label: "THORNE'S ROOM", type: "key" },

  // === GLASS WALKWAY ===
  { x: 1300, y: 1400, w: 80, h: 600, label: "GLASS WALK", type: "corridor" },
  // Glass panels
  ...Array.from({ length: 8 }, (_, i) => ({
    x: 1300, y: 1450 + i * 70, w: 80, h: 4, type: "empty" as const,
  })),

  // === GRAND STAIRCASE ===
  { x: 1500, y: 2000, w: 400, h: 500, label: "GRAND STAIR", type: "key" },
  // Steps
  ...Array.from({ length: 10 }, (_, i) => ({
    x: 1520, y: 2020 + i * 48, w: 360, h: 4, type: "empty" as const,
  })),

  // === EXIT ===
  { x: 1600, y: 2500, w: 200, h: 100, label: "EXIT", type: "extraction" },

  // === CONNECTING CORRIDORS ===
  // Entry to cubicles
  { x: 1300, y: 220, w: 120, h: 80, label: "", type: "corridor" },
  // Cubicles to conference
  { x: 1120, y: 400, w: 180, h: 80, label: "", type: "corridor" },
  // Down from cubicles
  { x: 500, y: 770, w: 80, h: 230, label: "", type: "corridor" },
  // Memory buildings to glass walkway
  { x: 1000, y: 1100, w: 300, h: 80, label: "", type: "corridor" },
  // Glass walkway to staircase
  { x: 1380, y: 1900, w: 120, h: 100, label: "", type: "corridor" },
  // Conference to Thorne
  { x: 2200, y: 930, w: 80, h: 170, label: "", type: "corridor" },

  // === WRONGNESS (floating wall fragments) ===
  { x: 1800, y: 400, w: 4, h: 150, type: "empty" },
  { x: 1100, y: 650, w: 200, h: 4, type: "empty" },
  { x: 2600, y: 800, w: 4, h: 400, type: "empty" },
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
  { x: 60, y: 260, w: 1080, h: 500, color: "#2980b9", label: "CUBICLE ZONE" },
  { x: 1960, y: 260, w: 580, h: 700, color: "#8e44ad", label: "CONFERENCE ZONE" },
  { x: 60, y: 960, w: 960, h: 720, color: "#2980b9", label: "MEMORY ZONE" },
  { x: 1260, y: 760, w: 200, h: 580, color: "#c0392b", label: "DOPPELGANGER" },
  { x: 1260, y: 1360, w: 160, h: 680, color: "#e74c3c", label: "GLASS WALK" },
  { x: 1460, y: 1960, w: 480, h: 580, color: "#d4a017", label: "STAIRCASE" },
];

const markers = [
  { x: 1500, y: 140, type: "start" as const, label: "Entry from Level 2", description: "The elevator opens to desaturated office space. The fluorescent lights are the wrong color — more blue. The Hum whispers now." },
  { x: 250, y: 1125, type: "encounter" as const, label: "Vance Finds Her Desk", description: "Her own desk. Her foster brother's photo still pinned to the cubicle wall. The Backrooms knew her before she knew them." },
  { x: 700, y: 1125, type: "encounter" as const, label: "Kade Finds His Church Bulletin", description: "A childhood church bulletin on a desk in a cubicle in an infinite office." },
  { x: 2250, y: 750, type: "entity" as const, label: "The Meeting (T-4 Entity)", description: "A conference room that traps visitors in increasingly irrational scenarios. The PowerPoint shows the squad's psychological profiles." },
  { x: 1340, y: 1050, type: "danger" as const, label: "Doppelganger Vance", description: "A perfect copy of Vance. Same voice, same mannerisms, same bandanna. It attacks with personal guilt." },
  { x: 2200, y: 1225, type: "scripted" as const, label: "Thorne's Full Confession", description: "'Operation THRESHOLD was never a security mission... You were never supposed to come home.' Player choice: spare or execute." },
  { x: 775, y: 1500, type: "encounter" as const, label: "Reyes's Disappearance", description: "Reyes steps into a wall that ripples like water. Her camera continues recording for 47 minutes." },
  { x: 1340, y: 1700, type: "danger" as const, label: "Doppelganger Gauntlet", description: "The glass walkway. Doppelgangers of the entire squad attack simultaneously using the real squad's tactics." },
  { x: 1700, y: 2250, type: "objective" as const, label: "Grand Staircase", description: "The only way forward. A massive staircase spiraling upward into darkness." },
  { x: 1700, y: 2550, type: "end" as const, label: "Exit to Level 11", description: "The top opens to open sky. An infinite city stretches below." },
  { x: 2250, y: 425, type: "scripted" as const, label: "Conference Room PowerPoint", description: "The presentation auto-plays. Slide after slide of psychological profiles. Final slide: 'OPERATION THRESHOLD: STATUS — ONGOING.'" },
  { x: 275, y: 1480, type: "item" as const, label: "Holt's Chess Set", description: "A chess set mid-game. White has been playing against itself. The final move is checkmate." },
];

export const level4: LevelMap = {
  id: "4",
  name: "Abandoned Office",
  subtitle: "Descent",
  width: W,
  height: H,
  walls: [...boundary, ...generateWalls(rooms)],
  rooms: rooms.map(r => ({ ...r, fill: undefined })),
  zones,
  markers,
  meta: {
    environment: "Desaturated office park, cubicles, conference rooms",
    duration: "90-120 min",
    difficulty: "Extreme",
    entityDensity: "Moderate but deceptive",
    combatViability: "Low",
    sanityImpact: "Severe degradation",
    tacticalStatus: "Squad AI unreliable. Doppelgangers mimic squad callouts.",
    keyDesign: "Personal horror. The environment uses squad members' memories against them.",
    colorProgression: "Muted blues, sickly greens, shadow, monitor glow (paranoia)",
  },
};
