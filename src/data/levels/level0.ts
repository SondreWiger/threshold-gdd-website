import { LevelMap, MapMarker } from "@/components/maps/MapViewer";

// Level 0: The Lobby — Connected floor plan
// Backrooms office: interconnected rooms, looping corridors, dead ends.
// Everything shares walls. Nothing floats.

const W = 2800;
const H = 2200;

// === OUTER BOUNDARY ===
const boundary = [
  { x1: 0, y1: 0, x2: W, y2: 0, type: "thick" as const },
  { x1: W, y1: 0, x2: W, y2: H, type: "thick" as const },
  { x1: W, y1: H, x2: 0, y2: H, type: "thick" as const },
  { x1: 0, y1: H, x2: 0, y2: 0, type: "thick" as const },
];

// === ROOMS (filled rectangles, shared walls) ===
// Each room is defined by its rect. Walls are generated from shared edges.

interface RoomDef {
  x: number; y: number; w: number; h: number;
  label?: string; type?: string;
}

const rooms: RoomDef[] = [
  // === ENTRY SUITE (top-left) ===
  { x: 60, y: 60, w: 320, h: 200, label: "ENTRY", type: "key" },
  { x: 60, y: 260, w: 200, h: 160, label: "OFFICE A", type: "office" },
  { x: 260, y: 260, w: 180, h: 160, label: "OFFICE B", type: "office" },
  { x: 60, y: 420, w: 180, h: 140, label: "OFFICE C", type: "office" },
  { x: 240, y: 420, w: 140, h: 140, label: "", type: "office" },

  // === NORTH CORRIDOR (horizontal spine) ===
  { x: 380, y: 120, w: 800, h: 80, label: "CORRIDOR", type: "corridor" },
  // Offices along north corridor
  { x: 380, y: 200, w: 160, h: 120, label: "OFFICE D", type: "office" },
  { x: 540, y: 200, w: 160, h: 120, label: "OFFICE E", type: "office" },
  { x: 700, y: 200, w: 160, h: 120, label: "OFFICE F", type: "office" },
  { x: 860, y: 200, w: 160, h: 120, label: "OFFICE G", type: "office" },
  { x: 1020, y: 200, w: 160, h: 120, label: "OFFICE H", type: "office" },

  // === ATRIUM (large open space) ===
  { x: 1180, y: 60, w: 440, h: 320, label: "ATRIUM", type: "atrium" },

  // === EAST WING (corridor + rooms) ===
  { x: 1620, y: 60, w: 80, h: 500, label: "", type: "corridor" },
  { x: 1700, y: 60, w: 280, h: 200, label: "OFFICE I", type: "office" },
  { x: 1700, y: 260, w: 280, h: 200, label: "OFFICE J", type: "office" },
  { x: 1980, y: 60, w: 80, h: 400, label: "", type: "corridor" },
  { x: 1700, y: 460, w: 280, h: 160, label: "OFFICE K", type: "office" },

  // === CENTRAL CORRIDOR (vertical spine) ===
  { x: 1180, y: 380, w: 80, h: 700, label: "", type: "corridor" },
  // Offices along central corridor
  { x: 1000, y: 380, w: 180, h: 140, label: "OFFICE L", type: "office" },
  { x: 1000, y: 520, w: 180, h: 140, label: "OFFICE M", type: "office" },
  { x: 1260, y: 380, w: 180, h: 140, label: "OFFICE N", type: "office" },
  { x: 1260, y: 520, w: 180, h: 140, label: "OFFICE O", type: "office" },

  // === SOUTH-CENTRAL AREA ===
  { x: 1000, y: 660, w: 440, h: 80, label: "CORRIDOR", type: "corridor" },
  { x: 800, y: 740, w: 200, h: 180, label: "STORAGE", type: "industrial" },
  { x: 1000, y: 740, w: 200, h: 180, label: "OFFICE P", type: "office" },
  { x: 1200, y: 740, w: 240, h: 180, label: "OFFICE Q", type: "office" },

  // === DARK CORRIDOR (leading to extraction) ===
  { x: 1440, y: 740, w: 340, h: 60, label: "DARK CORRIDOR", type: "corridor" },
  { x: 1440, y: 800, w: 60, h: 300, label: "", type: "corridor" },
  { x: 1500, y: 800, w: 280, h: 60, label: "", type: "corridor" },

  // === EXTRACTION ROOM (dead end) ===
  { x: 1500, y: 860, w: 280, h: 200, label: "EXTRACTION", type: "extraction" },

  // === WEST WING (maze section) ===
  { x: 60, y: 560, w: 200, h: 200, label: "OFFICE R", type: "office" },
  { x: 260, y: 560, w: 160, h: 120, label: "OFFICE S", type: "office" },
  { x: 260, y: 680, w: 160, h: 120, label: "OFFICE T", type: "office" },
  { x: 60, y: 760, w: 200, h: 160, label: "OFFICE U", type: "office" },
  { x: 260, y: 800, w: 160, h: 120, label: "OFFICE V", type: "office" },
  // Dead end alcove
  { x: 420, y: 560, w: 120, h: 120, label: "DEAD END", type: "empty" },
  // Corridor connecting west wing to center
  { x: 420, y: 680, w: 80, h: 300, label: "", type: "corridor" },
  { x: 500, y: 880, w: 300, h: 60, label: "CORRIDOR", type: "corridor" },

  // === LOWER CORRIDOR (horizontal) ===
  { x: 60, y: 920, w: 740, h: 60, label: "LOWER CORRIDOR", type: "corridor" },
  // Rooms below lower corridor
  { x: 60, y: 980, w: 200, h: 140, label: "OFFICE W", type: "office" },
  { x: 260, y: 980, w: 160, h: 140, label: "OFFICE X", type: "office" },
  { x: 420, y: 980, w: 200, h: 140, label: "OFFICE Y", type: "office" },
  { x: 620, y: 980, w: 180, h: 140, label: "OFFICE Z", type: "office" },

  // === BOTTOM SECTION (maze of narrow corridors) ===
  { x: 60, y: 1120, w: 60, h: 400, label: "", type: "corridor" },
  { x: 120, y: 1120, w: 200, h: 80, label: "", type: "corridor" },
  { x: 120, y: 1200, w: 80, h: 200, label: "", type: "corridor" },
  { x: 200, y: 1200, w: 160, h: 80, label: "", type: "corridor" },
  { x: 280, y: 1280, w: 80, h: 200, label: "", type: "corridor" },
  { x: 360, y: 1360, w: 200, h: 80, label: "", type: "corridor" },
  // Dead end rooms in maze
  { x: 120, y: 1400, w: 160, h: 120, label: "ALCOVE", type: "empty" },
  { x: 280, y: 1480, w: 160, h: 100, label: "", type: "empty" },

  // === BOTTOM CORRIDOR ===
  { x: 360, y: 1440, w: 800, h: 60, label: "", type: "corridor" },
  // Rooms along bottom corridor
  { x: 560, y: 1120, w: 180, h: 160, label: "OFFICE \u03B1", type: "office" },
  { x: 740, y: 1120, w: 180, h: 160, label: "OFFICE \u03B2", type: "office" },
  { x: 560, y: 1280, w: 180, h: 80, label: "", type: "corridor" },
  { x: 740, y: 1280, w: 180, h: 80, label: "", type: "corridor" },
  { x: 560, y: 1360, w: 180, h: 80, label: "", type: "corridor" },
  { x: 740, y: 1360, w: 180, h: 80, label: "", type: "corridor" },
  // South offices
  { x: 920, y: 1120, w: 200, h: 160, label: "OFFICE \u03B3", type: "office" },
  { x: 920, y: 1280, w: 200, h: 160, label: "OFFICE \u03B4", type: "office" },
  { x: 1120, y: 1120, w: 200, h: 160, label: "OFFICE \u03B5", type: "office" },
  { x: 1120, y: 1280, w: 200, h: 160, label: "OFFICE \u03B6", type: "office" },

  // === BOTTOM-RIGHT SECTION ===
  { x: 1320, y: 1120, w: 60, h: 380, label: "", type: "corridor" },
  { x: 1380, y: 1120, w: 300, h: 160, label: "OFFICE \u03B7", type: "office" },
  { x: 1380, y: 1280, w: 300, h: 160, label: "OFFICE \u03B8", type: "office" },
  { x: 1680, y: 1120, w: 60, h: 320, label: "", type: "corridor" },
  { x: 1380, y: 1440, w: 360, h: 60, label: "CORRIDOR", type: "corridor" },

  // === FAR EAST LOWER ===
  { x: 1740, y: 620, w: 300, h: 200, label: "OFFICE \u03B9", type: "office" },
  { x: 1740, y: 820, w: 60, h: 300, label: "", type: "corridor" },
  { x: 1800, y: 820, w: 240, h: 60, label: "", type: "corridor" },
  { x: 1800, y: 880, w: 240, h: 200, label: "OFFICE \u03BA", type: "office" },
  { x: 2040, y: 620, w: 60, h: 460, label: "", type: "corridor" },
  { x: 1740, y: 1120, w: 360, h: 160, label: "OFFICE \u03BB", type: "office" },
  { x: 1740, y: 1280, w: 360, h: 160, label: "OFFICE \u03BC", type: "office" },
];

// === Generate walls from rooms ===
// For each room, draw its 4 edges. Skip edges that are shared with adjacent rooms.

function generateWalls(rooms: RoomDef[]) {
  const walls: { x1: number; y1: number; x2: number; y2: number; type: "wall" }[] = [];
  const edgeKey = (x1: number, y1: number, x2: number, y2: number) => {
    const min = Math.min(x1, x2) + "," + Math.min(y1, y2);
    const max = Math.max(x1, x2) + "," + Math.max(y1, y2);
    return min + "|" + max;
  };
  const edgeCount = new Map<string, number>();

  // Count edges
  for (const room of rooms) {
    const edges = [
      edgeKey(room.x, room.y, room.x + room.w, room.y),
      edgeKey(room.x, room.y + room.h, room.x + room.w, room.y + room.h),
      edgeKey(room.x, room.y, room.x, room.y + room.h),
      edgeKey(room.x + room.w, room.y, room.x + room.w, room.y + room.h),
    ];
    for (const e of edges) {
      edgeCount.set(e, (edgeCount.get(e) || 0) + 1);
    }
  }

  // Draw edges that appear exactly once (boundary) or mark shared edges
  for (const room of rooms) {
    const edges = [
      { x1: room.x, y1: room.y, x2: room.x + room.w, y2: room.y },
      { x1: room.x, y1: room.y + room.h, x2: room.x + room.w, y2: room.y + room.h },
      { x1: room.x, y1: room.y, x2: room.x, y2: room.y + room.h },
      { x1: room.x + room.w, y1: room.y, x2: room.x + room.w, y2: room.y + room.h },
    ];
    for (const e of edges) {
      const k = edgeKey(e.x1, e.y1, e.x2, e.y2);
      if (edgeCount.get(k) === 1) {
        // Boundary wall
        walls.push({ ...e, type: "wall" });
      }
      // Skip shared walls (count > 1) — rooms share them
    }
  }

  return walls;
}

const generatedWalls = generateWalls(rooms);

// === DETAIL WALLS (interior partitions, furniture, fixtures) ===
const detailWalls: { x1: number; y1: number; x2: number; y2: number; type: "thin" | "thick" }[] = [
  // Fluorescent light fixtures in corridors
  ...[420, 520, 620, 720, 820, 920, 1020, 1120].flatMap(x => [
    { x1: x, y1: 148, x2: x + 60, y2: 148, type: "thin" as const },
    { x1: x, y1: 172, x2: x + 60, y2: 172, type: "thin" as const },
  ]),
  // Atrium columns
  { x1: 1280, y1: 140, x2: 1280, y2: 160, type: "thick" },
  { x1: 1380, y1: 140, x2: 1380, y2: 160, type: "thick" },
  { x1: 1280, y1: 260, x2: 1280, y2: 280, type: "thick" },
  { x1: 1380, y1: 260, x2: 1380, y2: 280, type: "thick" },
  // Extraction room interior detail
  { x1: 1560, y1: 920, x2: 1560, y2: 1000, type: "thin" },
  { x1: 1700, y1: 920, x2: 1700, y2: 1000, type: "thin" },
];

// === ZONES ===
const zones = [
  { x: 20, y: 20, w: 460, h: 600, color: "#d4a017", label: "ENTRY SUITE" },
  { x: 360, y: 40, w: 860, h: 300, color: "#d4a017", label: "NORTH CORRIDOR" },
  { x: 1160, y: 20, w: 480, h: 380, color: "#f5a623", label: "ATRIUM" },
  { x: 1600, y: 20, w: 460, h: 560, color: "#d4a017", label: "EAST WING" },
  { x: 20, y: 540, w: 460, h: 400, color: "#d4a017", label: "WEST WING" },
  { x: 1420, y: 720, w: 340, h: 380, color: "#2c3e50", label: "DARK ZONE" },
  { x: 1480, y: 840, w: 320, h: 240, color: "#c0392b", label: "EXTRACTION" },
  { x: 40, y: 1080, w: 400, h: 460, color: "#d4a017", label: "LOWER MAZE" },
  { x: 540, y: 1080, w: 800, h: 400, color: "#d4a017", label: "SOUTH OFFICES" },
];

// === MARKERS ===
const markers: MapMarker[] = [
  {
    x: 220, y: 160, type: "start", label: "Insertion Point",
    description: "Fireteam THRESHOLD materializes in a yellow-wallpapered office. The wall they came through is gone. Radio contact with Async confirms: explore, document, extract at designated point.",
  },
  {
    x: 600, y: 260, type: "encounter", label: "First Lurker Sighting",
    description: "A humanoid silhouette appears in peripheral vision at the far end of a corridor. When you look directly, nothing is there. It never approaches. It never retreats.",
  },
  {
    x: 1400, y: 220, type: "encounter", label: "Hound Encounter — Atrium",
    description: "The Atrium opens up — first large space. A quadrupedal Hound with yellowed-wallpaper skin bursts from behind a pillar. Combat tutorial: photophobic, explosive bursts.",
  },
  {
    x: 1280, y: 700, type: "danger", label: "Dark Corridor — Smiler",
    description: "Lights fail. The corridor is pitch black. A wide grin appears in the darkness — impossibly wide, impossibly white. The Smiler. Photophobic. Extremely fast in darkness.",
  },
  {
    x: 1660, y: 960, type: "end", label: "Extraction Point — FAILURE",
    description: "The extraction beacon. A dead Async specialist lies on the ground. The beacon is dead. Radio contact dissolves into static. Extraction was never coming.",
  },
  {
    x: 480, y: 260, type: "item", label: "Async Field Manual",
    description: "A waterproof manual wedged behind a fluorescent light. Contains basic entity identification and survival protocols. Async branding on every page.",
  },
  {
    x: 200, y: 840, type: "item", label: "Survivor Journal (Page 1)",
    description: "A water-damaged journal: 'Day 3. The yellow is everywhere. I can hear breathing in the walls. The lights buzz louder when I'm afraid.'",
  },
  {
    x: 1800, y: 160, type: "item", label: "Reyes's Photo 1",
    description: "A photograph showing the squad walking through a corridor. There's a sixth figure behind them. None of them remember anyone else being there.",
  },
  {
    x: 800, y: 160, type: "scripted", label: "Kade's Counting",
    description: "Kade counts flights: 'I counted four flights down. But the door says Level One.' The first explicit acknowledgment that spatial logic doesn't apply.",
  },
  {
    x: 1180, y: 160, type: "landmark", label: "Fluorescent Grid",
    description: "A long corridor with perfectly aligned fluorescent lights stretching into distance. The hum is loudest here. Carpet is damp. The walls sweat.",
  },
  {
    x: 900, y: 800, type: "scripted", label: "Radio Death",
    description: "The radio crackles with a recording, on loop: '...do not attempt extraction. Repeat, do not attempt...'",
  },
  {
    x: 200, y: 1300, type: "danger", label: "Dead End Alcove",
    description: "A corridor that ends abruptly. The temperature drops. The fluorescent light flickers in a pattern that almost looks like Morse code.",
  },
];

export const level0: LevelMap = {
  id: "0",
  name: "The Lobby",
  subtitle: "The Breach",
  width: W,
  height: H,
  walls: [...generatedWalls, ...detailWalls],
  rooms: rooms.map(r => ({ ...r, fill: undefined })),
  zones,
  markers,
  meta: {
    environment: "Mono-yellow wallpaper, moist carpet, fluorescent lighting",
    duration: "60-90 min",
    difficulty: "Low",
    entityDensity: "Very Low",
    combatViability: "High",
    sanityImpact: "Mild unease",
    tacticalStatus: "Full functionality. Squad responsive. Comms clear.",
    keyDesign: "Open, navigable spaces. Warm yellow palette. Confidence before the fall.",
    colorProgression: "Warm yellows, sterile whites, tactical greens (confidence)",
  },
};
