import { LevelMap } from "@/components/maps/MapViewer";

const W = 2800;
const H = 3000;

// Level 2: Pipe Dreams — Connected claustrophobic floor plan
// Progressive corridor narrowing. Dense pipe networks. Fluid everywhere.

const rooms = [
  // === ENTRY CORRIDOR (widest section) ===
  { x: 800, y: 60, w: 600, h: 120, label: "ENTRY", type: "corridor" },
  // Ceiling pipes
  { x: 830, y: 72, w: 540, h: 4, type: "empty" },
  { x: 830, y: 168, w: 540, h: 4, type: "empty" },

  // === MAIN PIPE CORRIDOR (vertical, 1.2m wide) ===
  { x: 950, y: 180, w: 300, h: 500, label: "MAIN PIPES", type: "pipe" },
  // Wall pipes
  { x: 965, y: 200, w: 4, h: 460, type: "empty" },
  { x: 1231, y: 200, w: 4, h: 460, type: "empty" },
  // Cross pipes
  { x: 965, y: 300, x2: 1235, y2: 300 } as any,
  { x: 965, y: 420, x2: 1235, y2: 420 } as any,
  { x: 965, y: 540, x2: 1235, y2: 540 } as any,

  // === BRANCH LEFT (dead end room) ===
  { x: 500, y: 300, w: 450, h: 80, label: "", type: "corridor" },
  { x: 300, y: 200, w: 200, h: 280, label: "DEAD END", type: "empty" },
  // Connection
  { x: 500, y: 340, w: 50, h: 80, label: "", type: "corridor" },

  // === BRANCH RIGHT (dead end room) ===
  { x: 1250, y: 300, w: 450, h: 80, label: "", type: "corridor" },
  { x: 1700, y: 200, w: 200, h: 280, label: "DEAD END", type: "empty" },
  // Connection
  { x: 1650, y: 340, w: 50, h: 80, label: "", type: "corridor" },

  // === NARROWING SECTION 1 (1.0m) ===
  { x: 1000, y: 680, w: 200, h: 500, label: "NARROWING", type: "pipe" },
  // Tighter pipes
  { x: 1012, y: 700, w: 4, h: 460, type: "empty" },
  { x: 1184, y: 700, w: 4, h: 460, type: "empty" },
  // Cross pipes every 80
  ...Array.from({ length: 6 }, (_, i) => ({
    x: 1012, y: 720 + i * 80, w: 176, h: 4, type: "empty" as const,
  })),

  // === PIPE CRAWLER NEST (side alcove) ===
  { x: 500, y: 780, w: 500, h: 200, label: "CRAWLER NEST", type: "hazard" },
  { x: 500, y: 880, w: 500, h: 4, type: "empty" }, // nest texture
  { x: 500, y: 830, w: 500, h: 4, type: "empty" },
  // Connection
  { x: 950, y: 830, w: 50, h: 100, label: "", type: "corridor" },

  // === NARROWING SECTION 2 (0.9m — near single file) ===
  { x: 1030, y: 1180, w: 140, h: 500, label: "TIGHT", type: "pipe" },
  // Very tight pipes
  { x: 1040, y: 1200, w: 4, h: 460, type: "empty" },
  { x: 1156, y: 1200, w: 4, h: 460, type: "empty" },
  { x: 1050, y: 1220, w: 4, h: 420, type: "empty" },
  { x: 1146, y: 1220, w: 4, h: 420, type: "empty" },
  // Cross pipes dense
  ...Array.from({ length: 8 }, (_, i) => ({
    x: 1040, y: 1210 + i * 55, w: 120, h: 4, type: "empty" as const,
  })),
  // Drowned wall section (organic growth)
  { x: 1045, y: 1350, w: 4, h: 150, type: "empty" },
  { x: 1151, y: 1350, w: 4, h: 150, type: "empty" },

  // === MACHINE HEART (larger chamber) ===
  { x: 700, y: 1680, w: 800, h: 300, label: "MACHINE HEART", type: "key" },
  // Machine in center
  { x: 950, y: 1760, w: 300, h: 140, type: "empty" },
  // Pipes from machine
  { x: 1050, y: 1900, w: 4, h: 80, type: "empty" },
  { x: 1150, y: 1900, w: 4, h: 80, type: "empty" },
  // Connection from narrowing
  { x: 1030, y: 1630, w: 140, h: 50, label: "", type: "corridor" },

  // === T-JUNCTION (rising water) ===
  { x: 1050, y: 1980, w: 100, h: 300, label: "", type: "corridor" },
  { x: 700, y: 2100, w: 400, h: 80, label: "DEAD END", type: "corridor" },
  { x: 1150, y: 2100, w: 500, h: 80, label: "", type: "corridor" },

  // === EXIT CORRIDOR ===
  { x: 1500, y: 2100, w: 100, h: 300, label: "", type: "corridor" },

  // === EXIT DOOR ===
  { x: 1400, y: 2400, w: 300, h: 120, label: "EXIT", type: "extraction" },

  // === SIDE ROOMS (dead ends, wrong turns) ===
  { x: 200, y: 1000, w: 200, h: 200, label: "WRONG TURN", type: "empty" },
  { x: 200, y: 1400, w: 300, h: 200, label: "FLOODED", type: "flooded" },
  { x: 1800, y: 1000, w: 200, h: 200, label: "", type: "empty" },
  { x: 1800, y: 1400, w: 300, h: 300, label: "PIPE ROOM", type: "pipe" },

  // === BOTTOM CORRIDOR ===
  { x: 60, y: 2600, w: 2680, h: 60, label: "", type: "corridor" },
  { x: 60, y: 2400, w: 100, h: 200, label: "", type: "corridor" },
  { x: 1640, y: 2400, w: 100, h: 200, label: "", type: "corridor" },
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

const pipeFixes: { x1: number; y1: number; x2: number; y2: number; type: "thin" }[] = [
  { x1: 965, y1: 300, x2: 1235, y2: 300, type: "thin" },
  { x1: 965, y1: 420, x2: 1235, y2: 420, type: "thin" },
  { x1: 965, y1: 540, x2: 1235, y2: 540, type: "thin" },
];

const zones = [
  { x: 760, y: 20, w: 680, h: 180, color: "#c0392b", label: "ENTRY" },
  { x: 910, y: 140, w: 380, h: 580, color: "#c0392b", label: "PIPE NETWORK" },
  { x: 460, y: 740, w: 540, h: 280, color: "#c0392b", label: "CRAWLER NEST" },
  { x: 990, y: 640, w: 240, h: 580, color: "#e74c3c", label: "NARROWING" },
  { x: 1000, y: 1140, w: 180, h: 580, color: "#c0392b", label: "TIGHT PASSAGE" },
  { x: 660, y: 1640, w: 880, h: 380, color: "#d4a017", label: "MACHINE HEART" },
  { x: 660, y: 2060, w: 1040, h: 160, color: "#2980b9", label: "RISING WATER" },
];

const markers = [
  { x: 1100, y: 120, type: "start" as const, label: "Entry from Level 1", description: "The squad descends a climbing shaft into narrow corridors. The air is cold. Water drips from exposed pipes." },
  { x: 1100, y: 400, type: "scripted" as const, label: "Kade's First Panic Attack", description: "'The walls are getting closer.' Kade's breathing quickens. Something about the pipes, the dripping, the dark — it feels like it's closing in." },
  { x: 1100, y: 550, type: "entity" as const, label: "Pipe Crawler Activation", description: "A Pipe Crawler drops from a ceiling vent. Kade shoots. The gunshot echoes through every pipe. Every entity now knows where they are." },
  { x: 700, y: 880, type: "danger" as const, label: "Pipe Crawler Nest", description: "Dozens of Pipe Crawlers line the walls, dormant. Kade whispers: 'Peace be with you.' One Crawler stirs... then settles." },
  { x: 350, y: 1500, type: "danger" as const, label: "Flooded Section — Drowned", description: "Ankle-deep water becomes knee-deep. A hand grabs from below — a Drowned, reaching for warmth." },
  { x: 1100, y: 1400, type: "scripted" as const, label: "Kade's Separation", description: "Kade is separated during a Pipe Crawler ambush. 20 minutes without him. When he returns, he's sitting among Drowned who didn't touch him." },
  { x: 1100, y: 1830, type: "encounter" as const, label: "Machine Heart Room", description: "A massive chamber. A machine pulses at the center. Drowned cling to its surfaces. Combat is possible but costly." },
  { x: 1100, y: 2200, type: "danger" as const, label: "Rising Water Escape", description: "Water begins rising. Fast. Navigate the T-junction and reach the exit before the corridor floods." },
  { x: 1550, y: 2460, type: "end" as const, label: "Elevator to Level 4", description: "An old freight elevator. The floor indicator counts up: 2...3...4...Then letters: A...B...C...Then symbols that don't exist." },
  { x: 1100, y: 1000, type: "scripted" as const, label: "Kade's Moment of Clarity", description: "'They're just like us. Lost. Scared. Lashing out.' For a moment, the horror pauses." },
  { x: 350, y: 300, type: "item" as const, label: "Survivor Journal (Page 2)", description: "'Day 7. I can hear them in the pipes. Not crawling — walking. Like they used to be people. Some of them still say please.'" },
];

export const level2: LevelMap = {
  id: "2",
  name: "Pipe Dreams",
  subtitle: "Suffocation",
  width: W,
  height: H,
  walls: [...boundary, ...generateWalls(rooms), ...pipeFixes],
  rooms: rooms.map(r => ({ ...r, fill: undefined })),
  zones,
  markers,
  meta: {
    environment: "Narrow maintenance corridors, exposed piping, ankle-deep fluid",
    duration: "90-120 min",
    difficulty: "High",
    entityDensity: "High",
    combatViability: "Medium",
    sanityImpact: "Significant stress",
    tacticalStatus: "Formations impossible. Comms break up. Revive time extended to 12s.",
    keyDesign: "Progressive corridor narrowing (1.5m → 1.2m → 1.0m → 0.9m). Single-file-only movement.",
    colorProgression: "Rust browns, pipe metal, darkness, emergency red (claustrophobia)",
  },
};
