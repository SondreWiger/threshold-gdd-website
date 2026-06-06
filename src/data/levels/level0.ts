import { LevelMap } from "@/components/maps/MapViewer";

// Helper to generate walls from room rect
function roomWalls(x: number, y: number, w: number, h: number, exclude?: string[]) {
  const e = exclude || [];
  const walls = [];
  if (!e.includes("top")) walls.push({ x1: x, y1: y, x2: x + w, y2: y });
  if (!e.includes("bottom")) walls.push({ x1: x, y1: y + h, x2: x + w, y2: y + h });
  if (!e.includes("left")) walls.push({ x1: x, y1: y, x2: x, y2: y + h });
  if (!e.includes("right")) walls.push({ x1: x + w, y1: y, x2: x + w, y2: y + h });
  return walls;
}

function corridorWalls(x: number, y: number, w: number, h: number, openings: { side: string; pos: number; width: number }[]) {
  const walls: { x1: number; y1: number; x2: number; y2: number; type?: string }[] = [];

  // Top wall with openings
  let topSegments = [{ start: x, end: x + w }];
  for (const o of openings.filter(s => s.side === "top")) {
    topSegments = topSegments.flatMap(seg => {
      if (o.pos >= seg.start && o.pos + o.width <= seg.end) {
        const parts = [];
        if (o.pos > seg.start) parts.push({ start: seg.start, end: o.pos });
        if (o.pos + o.width < seg.end) parts.push({ start: o.pos + o.width, end: seg.end });
        return parts;
      }
      return [seg];
    });
  }
  for (const seg of topSegments) {
    walls.push({ x1: seg.start, y1: y, x2: seg.end, y2: y });
  }

  // Bottom wall with openings
  let bottomSegments = [{ start: x, end: x + w }];
  for (const o of openings.filter(s => s.side === "bottom")) {
    bottomSegments = bottomSegments.flatMap(seg => {
      if (o.pos >= seg.start && o.pos + o.width <= seg.end) {
        const parts = [];
        if (o.pos > seg.start) parts.push({ start: seg.start, end: o.pos });
        if (o.pos + o.width < seg.end) parts.push({ start: o.pos + o.width, end: seg.end });
        return parts;
      }
      return [seg];
    });
  }
  for (const seg of bottomSegments) {
    walls.push({ x1: seg.start, y1: y + h, x2: seg.end, y2: y + h });
  }

  // Left wall with openings
  let leftSegments = [{ start: y, end: y + h }];
  for (const o of openings.filter(s => s.side === "left")) {
    leftSegments = leftSegments.flatMap(seg => {
      if (o.pos >= seg.start && o.pos + o.width <= seg.end) {
        const parts = [];
        if (o.pos > seg.start) parts.push({ start: seg.start, end: o.pos });
        if (o.pos + o.width < seg.end) parts.push({ start: o.pos + o.width, end: seg.end });
        return parts;
      }
      return [seg];
    });
  }
  for (const seg of leftSegments) {
    walls.push({ x1: x, y1: seg.start, x2: x, y2: seg.end });
  }

  // Right wall with openings
  let rightSegments = [{ start: y, end: y + h }];
  for (const o of openings.filter(s => s.side === "right")) {
    rightSegments = rightSegments.flatMap(seg => {
      if (o.pos >= seg.start && o.pos + o.width <= seg.end) {
        const parts = [];
        if (o.pos > seg.start) parts.push({ start: seg.start, end: o.pos });
        if (o.pos + o.width < seg.end) parts.push({ start: o.pos + o.width, end: seg.end });
        return parts;
      }
      return [seg];
    });
  }
  for (const seg of rightSegments) {
    walls.push({ x1: x + w, y1: seg.start, x2: x + w, y2: seg.end });
  }

  return walls;
}

// Level 0: The Lobby
// Yellow office labyrinth. Backrooms-style: repeating offices, long corridors,
// an open atrium, dark corridors, and a dead-end extraction point.

const W = 3200;
const H = 2400;

// Offices grid - left section (incoherent backrooms grid)
const officeGridWalls: { x1: number; y1: number; x2: number; y2: number; type?: string }[] = [];
const officeSize = 120;
const officeGap = 16;
const cols = 8;
const rows = 6;

for (let r = 0; r < rows; r++) {
  for (let c = 0; c < cols; c++) {
    const ox = 80 + c * (officeSize + officeGap);
    const oy = 200 + r * (officeSize + officeGap);

    // Skip some walls to create openings (backrooms-style inconsistent gaps)
    const skipTop = (r === 0) || (c === 3 && r % 2 === 0) || (c === 6 && r === 2);
    const skipBottom = (r === rows - 1) || (c === 1 && r % 2 === 1) || (c === 5 && r === 4);
    const skipLeft = (c === 0) || (r === 2 && c % 2 === 0) || (r === 5 && c === 4);
    const skipRight = (c === cols - 1) || (r === 1 && c % 3 === 1) || (r === 4 && c === 7);

    const exclude = [
      skipTop ? "top" : "",
      skipBottom ? "bottom" : "",
      skipLeft ? "left" : "",
      skipRight ? "right" : "",
    ].filter(Boolean);

    officeGridWalls.push(...roomWalls(ox, oy, officeSize, officeSize, exclude));
  }
}

// Main corridor - horizontal spine
const mainCorridorWalls = corridorWalls(60, 1100, 1800, 100, [
  { side: "top", pos: 200, width: 60 },
  { side: "top", pos: 500, width: 60 },
  { side: "top", pos: 800, width: 80 },
  { side: "top", pos: 1200, width: 60 },
  { side: "top", pos: 1600, width: 60 },
  { side: "bottom", pos: 150, width: 60 },
  { side: "bottom", pos: 400, width: 60 },
  { side: "bottom", pos: 700, width: 80 },
  { side: "bottom", pos: 1100, width: 60 },
  { side: "bottom", pos: 1500, width: 60 },
]);

// Vertical corridor connecting offices to main corridor
const vertCorridor1Walls = corridorWalls(400, 680, 60, 440, [
  { side: "top", pos: 720, width: 50 },
  { side: "bottom", pos: 720, width: 50 },
  { side: "left", pos: 780, width: 60 },
  { side: "right", pos: 850, width: 60 },
]);

const vertCorridor2Walls = corridorWalls(900, 700, 60, 420, [
  { side: "top", pos: 740, width: 50 },
  { side: "bottom", pos: 740, width: 50 },
  { side: "left", pos: 820, width: 60 },
  { side: "right", pos: 900, width: 60 },
]);

// Atrium - large open space
const atriumWalls = corridorWalls(1300, 600, 400, 500, [
  { side: "top", pos: 1440, width: 80 },
  { side: "bottom", pos: 1400, width: 80 },
  { side: "left", pos: 750, width: 80 },
  { side: "right", pos: 800, width: 80 },
  { side: "right", pos: 950, width: 60 },
]);

// Dark corridor - leading to extraction (narrower, winding)
const darkCorridorWalls = [
  // Horizontal section
  ...corridorWalls(1800, 1100, 600, 70, [
    { side: "top", pos: 1950, width: 50 },
    { side: "bottom", pos: 2100, width: 50 },
  ]),
  // Turn down
  ...corridorWalls(2350, 1100, 70, 400, [
    { side: "top", pos: 2380, width: 50 },
    { side: "bottom", pos: 2380, width: 50 },
    { side: "left", pos: 1250, width: 50 },
    { side: "right", pos: 1200, width: 60 },
    { side: "right", pos: 1350, width: 50 },
  ]),
  // Turn left
  ...corridorWalls(1900, 1450, 520, 60, [
    { side: "top", pos: 2000, width: 50 },
    { side: "bottom", pos: 2150, width: 50 },
    { side: "left", pos: 1470, width: 50 },
  ]),
];

// Extraction room - dead end
const extractionRoomWalls = corridorWalls(1750, 1600, 250, 200, [
  { side: "top", pos: 1850, width: 60 },
  { side: "bottom", pos: 1850, width: 0 },
]);

// Scattered irregular rooms (backrooms randomness)
const irregularRooms: { x1: number; y1: number; x2: number; y2: number; type?: string }[] = [
  // Room that doesn't connect to anything
  ...roomWalls(100, 1500, 180, 140),
  // Room with only two walls
  { x1: 1600, y1: 200, x2: 1800, y2: 200 },
  { x1: 1600, y1: 200, x2: 1600, y2: 400 },
  // Isolated corridor segment
  ...roomWalls(2200, 400, 200, 60),
  // L-shaped room
  { x1: 2600, y1: 600, x2: 2900, y2: 600 },
  { x1: 2600, y1: 600, x2: 2600, y2: 900 },
  { x1: 2600, y1: 900, x2: 2800, y2: 900 },
  { x1: 2800, y1: 750, x2: 2800, y2: 900 },
  { x1: 2800, y1: 750, x2: 2900, y2: 750 },
  { x1: 2900, y1: 600, x2: 2900, y2: 750 },
  // Narrow passage
  { x1: 2500, y1: 1000, x2: 2500, y2: 1200 },
  { x1: 2560, y1: 1000, x2: 2560, y2: 1200 },
  // Dead end alcove
  ...roomWalls(2700, 1300, 100, 150),
  // Backrooms "wrong" room (walls at odd angles suggested by offset rects)
  { x1: 300, y1: 1800, x2: 500, y2: 1800 },
  { x1: 500, y1: 1800, x2: 500, y2: 2050 },
  { x1: 300, y1: 2050, x2: 500, y2: 2050 },
  { x1: 300, y1: 1800, x2: 300, y2: 2050 },
  // Interior wall creating narrow passage
  { x1: 350, y1: 1800, x2: 350, y2: 1950 },
  { x1: 450, y1: 1900, x2: 450, y2: 2050 },
];

// Outer boundary
const boundaryWalls = [
  { x1: 0, y1: 0, x2: W, y2: 0 },
  { x1: W, y1: 0, x2: W, y2: H },
  { x1: W, y1: H, x2: 0, y2: H },
  { x1: 0, y1: H, x2: 0, y2: 0 },
];

// Extra walls for texture - ceiling tiles, carpet seams, fluorescent light fixtures
const detailWalls: { x1: number; y1: number; x2: number; y2: number; type: string }[] = [];
// Fluorescent light fixtures (parallel lines in corridors)
for (let x = 100; x < 1800; x += 200) {
  detailWalls.push({ x1: x, y1: 1120, x2: x + 120, y2: 1120, type: "outline" });
  detailWalls.push({ x1: x, y1: 1180, x2: x + 120, y2: 1180, type: "outline" });
}

// Carpet seams in offices
for (let r = 0; r < rows; r++) {
  for (let c = 0; c < cols; c++) {
    const ox = 80 + c * (officeSize + officeGap);
    const oy = 200 + r * (officeSize + officeGap);
    detailWalls.push({ x1: ox + 30, y1: oy + officeSize / 2, x2: ox + officeSize - 30, y2: oy + officeSize / 2, type: "outline" });
  }
}

export const level0: LevelMap = {
  id: "0",
  name: "The Lobby",
  subtitle: "The Breach",
  width: W,
  height: H,
  bgColor: "#0c0b08",
  wallColor: "rgba(180,140,40,0.35)",
  gridColor: "rgba(180,140,40,0.04)",
  walls: [
    ...boundaryWalls,
    ...officeGridWalls,
    ...mainCorridorWalls,
    ...vertCorridor1Walls,
    ...vertCorridor2Walls,
    ...atriumWalls,
    ...darkCorridorWalls,
    ...extractionRoomWalls,
    ...irregularRooms,
    ...detailWalls,
  ],
  rooms: [
    // Office grid rooms
    ...Array.from({ length: rows }, (_, r) =>
      Array.from({ length: cols }, (_, c) => ({
        x: 80 + c * (officeSize + officeGap),
        y: 200 + r * (officeSize + officeGap),
        w: officeSize,
        h: officeSize,
        type: "office" as const,
        label: (r === 0 && c === 0) ? "START" : undefined,
      }))
    ).flat(),
    // Main corridor
    { x: 60, y: 1100, w: 1800, h: 100, type: "corridor" as const, label: "MAIN CORRIDOR" },
    // Vertical corridors
    { x: 400, y: 680, w: 60, h: 440, type: "corridor" as const },
    { x: 900, y: 700, w: 60, h: 420, type: "corridor" as const },
    // Atrium
    { x: 1300, y: 600, w: 400, h: 500, type: "atrium" as const, label: "ATRIUM" },
    // Dark corridor
    { x: 1800, y: 1100, w: 600, h: 70, type: "corridor" as const, label: "DARK CORRIDOR" },
    { x: 2350, y: 1100, w: 70, h: 400, type: "corridor" as const },
    { x: 1900, y: 1450, w: 520, h: 60, type: "corridor" as const },
    // Extraction room
    { x: 1750, y: 1600, w: 250, h: 200, type: "extraction" as const, label: "EXTRACTION" },
    // Irregular rooms
    { x: 100, y: 1500, w: 180, h: 140, type: "empty" as const },
    { x: 1600, y: 200, w: 200, h: 200, type: "empty" as const },
    { x: 2200, y: 400, w: 200, h: 60, type: "empty" as const },
    { x: 2600, y: 600, w: 300, h: 300, type: "office" as const, label: "L-ROOM" },
    { x: 2500, y: 1000, w: 60, h: 200, type: "corridor" as const },
    { x: 2700, y: 1300, w: 100, h: 150, type: "empty" as const },
    { x: 300, y: 1800, w: 200, h: 250, type: "office" as const, label: "WRONG" },
  ],
  zones: [
    {
      path: "M 60 180 L 1100 180 L 1100 700 L 60 700 Z",
      color: "#d4a017",
      label: "OFFICE GRID",
      opacity: 0.05,
    },
    {
      path: "M 60 1060 L 1900 1060 L 1900 1240 L 60 1240 Z",
      color: "#d4a017",
      label: "MAIN CORRIDOR",
      opacity: 0.06,
    },
    {
      path: "M 1260 560 L 1740 560 L 1740 1140 L 1260 1140 Z",
      color: "#f39c12",
      label: "ATRIUM ZONE",
      opacity: 0.08,
    },
    {
      path: "M 1760 1060 L 2460 1060 L 2460 1560 L 1760 1560 Z",
      color: "#2c3e50",
      label: "DARK ZONE",
      opacity: 0.12,
    },
    {
      path: "M 1710 1560 L 2040 1560 L 2040 1840 L 1710 1840 Z",
      color: "#c0392b",
      label: "EXTRACTION",
      opacity: 0.1,
    },
  ],
  markers: [
    {
      x: 140, y: 260,
      type: "start",
      label: "Insertion Point",
      description: "Fireteam THRESHOLD materializes in a yellow-wallpapered office. The wall they came through is gone. Radio contact with Async confirms: explore, document, extract at designated point.",
    },
    {
      x: 620, y: 340,
      type: "encounter",
      label: "First Lurker Sighting",
      description: "A humanoid silhouette appears in peripheral vision at the far end of a corridor. When you look directly, nothing is there. It never approaches. It never retreats.",
    },
    {
      x: 1450, y: 800,
      type: "encounter",
      label: "Hound Encounter — Atrium",
      description: "The Atrium opens up — first large space. A quadrupedal Hound with yellowed-wallpaper skin bursts from behind a pillar. Combat tutorial: photophobic, explosive bursts. First real fight.",
    },
    {
      x: 1500, y: 950,
      type: "danger",
      label: "Hound Pack",
      description: "Multiple Hounds. The pack hunts in coordinated bursts. Light discipline becomes critical. The squad's confidence is still high — this feels manageable.",
    },
    {
      x: 2100, y: 1130,
      type: "encounter",
      label: "Dark Corridor — Smiler Introduction",
      description: "Lights fail. The corridor is pitch black. A wide grin appears in the darkness — impossibly wide, impossibly white. The Smiler. Photophobic. Extremely fast in darkness. First encounter with something that feels intelligent.",
    },
    {
      x: 1870, y: 1700,
      type: "end",
      label: "Extraction Point — FAILURE",
      description: "The extraction beacon. A dead Async specialist lies on the ground, data pad still clutched in hand. The beacon is dead. Radio contact dissolves into static. The squad realizes: extraction was never coming.",
    },
    {
      x: 850, y: 260,
      type: "item",
      label: "Async Field Manual",
      description: "Collectible: A waterproof manual found wedged behind a fluorescent light fixture. Contains basic entity identification and survival protocols. Async branding on every page.",
    },
    {
      x: 350, y: 1580,
      type: "item",
      label: "Survivor Journal (Page 1)",
      description: "Collectible: A water-damaged journal from a previous wanderer. Entry reads: 'Day 3. The yellow is everywhere. I can hear breathing in the walls. The lights buzz louder when I'm afraid.'",
    },
    {
      x: 2750, y: 680,
      type: "item",
      label: "Reyes's Photo 1",
      description: "Collectible: A photograph from Reyes's camera. Shows the squad walking through a corridor. There's a sixth figure behind them. None of them remember anyone else being there.",
    },
    {
      x: 500, y: 1130,
      type: "scripted",
      label: "Kade's Counting",
      description: "Scripted: Kade counts flights of stairs. 'I counted four flights down. But the door says Level One.' The first explicit acknowledgment that spatial logic doesn't apply here.",
    },
    {
      x: 1200, y: 1130,
      type: "landmark",
      label: "Fluorescent Grid",
      description: "A long corridor section with perfectly aligned fluorescent lights stretching into distance. The hum is loudest here. Carpet is damp. The walls sweat.",
    },
    {
      x: 2380, y: 1300,
      type: "danger",
      label: "Dead End Alcove",
      description: "A corridor that ends abruptly in a blank wall. The temperature drops. The fluorescent light above flickers in a pattern that almost looks like Morse code.",
    },
    {
      x: 1050, y: 1130,
      type: "scripted",
      label: "Radio Death",
      description: "Scripted: The radio crackles with a transmission from the dead specialist's beacon. It's a recording, on loop: '...do not attempt extraction. Repeat, do not attempt...'",
    },
  ],
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
