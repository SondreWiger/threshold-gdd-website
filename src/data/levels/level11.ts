import { LevelMap } from "@/components/maps/MapViewer";

const W = 4000;
const H = 3400;

const boundary = [
  { x1: 0, y1: 0, x2: W, y2: 0 },
  { x1: W, y1: 0, x2: W, y2: H },
  { x1: W, y1: H, x2: 0, y2: H },
  { x1: 0, y1: H, x2: 0, y2: 0 },
];

// Entry from Level 4 - emerges onto a street
const entryStreet = [
  // Building walls flanking the emergence point
  { x1: 1600, y1: 60, x2: 1600, y2: 400 },
  { x1: 2400, y1: 60, x2: 2400, y2: 400 },
  // Street surface
  { x1: 1600, y1: 400, x2: 2400, y2: 400 },
];

// City grid - streets and buildings
// Streets are the negative space between buildings
const buildings: { x1: number; y1: number; x2: number; y2: number }[] = [];

// Block 1 - top left (abandoned buildings)
buildings.push(
  { x1: 100, y1: 100, x2: 700, y2: 500 },
  { x1: 100, y1: 100, x2: 100, y2: 500 },
  { x1: 700, y1: 100, x2: 700, y2: 500 },
  { x1: 100, y1: 100, x2: 700, y2: 100 },
  { x1: 100, y1: 500, x2: 700, y2: 500 },
  // Interior walls
  { x1: 300, y1: 100, x2: 300, y2: 500 },
  { x1: 500, y1: 100, x2: 500, y2: 500 },
  { x1: 100, y1: 300, x2: 700, y2: 300 },
);

// Block 2 - top center
buildings.push(
  { x1: 900, y1: 100, x2: 1400, y2: 400 },
  { x1: 900, y1: 100, x2: 900, y2: 400 },
  { x1: 1400, y1: 100, x2: 1400, y2: 400 },
  { x1: 900, y1: 100, x2: 1400, y2: 100 },
  { x1: 900, y1: 400, x2: 1400, y2: 400 },
  // Interior
  { x1: 1150, y1: 100, x2: 1150, y2: 400 },
);

// Block 3 - top right
buildings.push(
  { x1: 2600, y1: 100, x2: 3200, y2: 500 },
  { x1: 2600, y1: 100, x2: 2600, y2: 500 },
  { x1: 3200, y1: 100, x2: 3200, y2: 500 },
  { x1: 2600, y1: 100, x2: 3200, y2: 100 },
  { x1: 2600, y1: 500, x2: 3200, y2: 500 },
  // Interior
  { x1: 2900, y1: 100, x2: 2900, y2: 500 },
  { x1: 2600, y1: 300, x2: 3200, y2: 300 },
);

// Block 4 - mid left
buildings.push(
  { x1: 100, y1: 700, x2: 600, y2: 1100 },
  { x1: 100, y1: 700, x2: 100, y2: 1100 },
  { x1: 600, y1: 700, x2: 600, y2: 1100 },
  { x1: 100, y1: 700, x2: 600, y2: 700 },
  { x1: 100, y1: 1100, x2: 600, y2: 1100 },
  // Interior
  { x1: 350, y1: 700, x2: 350, y2: 1100 },
  { x1: 100, y1: 900, x2: 600, y2: 900 },
);

// Block 5 - The Working Cafe (perfectly maintained)
buildings.push(
  { x1: 900, y1: 600, x2: 1300, y2: 900 },
  { x1: 900, y1: 600, x2: 900, y2: 900 },
  { x1: 1300, y1: 600, x2: 1300, y2: 900 },
  { x1: 900, y1: 600, x2: 1300, y2: 600 },
  { x1: 900, y1: 900, x2: 1300, y2: 900 },
  // Counter
  { x1: 950, y1: 750, x2: 1250, y2: 750 },
  // Tables
  { x1: 950, y1: 800, x2: 1000, y2: 800 },
  { x1: 950, y1: 800, x2: 950, y2: 850 },
  { x1: 1000, y1: 800, x2: 1000, y2: 850 },
  { x1: 950, y1: 850, x2: 1000, y2: 850 },
  { x1: 1150, y1: 800, x2: 1200, y2: 800 },
  { x1: 1150, y1: 800, x2: 1150, y2: 850 },
  { x1: 1200, y1: 800, x2: 1200, y2: 850 },
  { x1: 1150, y1: 850, x2: 1200, y2: 850 },
);

// Block 6 - mid right (other squad - Russian expedition)
buildings.push(
  { x1: 2700, y1: 600, x2: 3300, y2: 1000 },
  { x1: 2700, y1: 600, x2: 2700, y2: 1000 },
  { x1: 3300, y1: 600, x2: 3300, y2: 1000 },
  { x1: 2700, y1: 600, x2: 3300, y2: 600 },
  { x1: 2700, y1: 1000, x2: 3300, y2: 1000 },
  // Interior - scattered bodies
  { x1: 2900, y1: 600, x2: 2900, y2: 1000 },
  { x1: 3100, y1: 600, x2: 3100, y2: 1000 },
  { x1: 2700, y1: 800, x2: 3300, y2: 800 },
);

// Block 7 - lower left (Citizens patrol area)
buildings.push(
  { x1: 100, y1: 1300, x2: 500, y2: 1700 },
  { x1: 100, y1: 1300, x2: 100, y2: 1700 },
  { x1: 500, y1: 1300, x2: 500, y2: 1700 },
  { x1: 100, y1: 1300, x2: 500, y2: 1300 },
  { x1: 100, y1: 1700, x2: 500, y2: 1700 },
  // Interior
  { x1: 300, y1: 1300, x2: 300, y2: 1700 },
);

// Block 8 - lower center
buildings.push(
  { x1: 800, y1: 1200, x2: 1200, y2: 1600 },
  { x1: 800, y1: 1200, x2: 800, y2: 1600 },
  { x1: 1200, y1: 1200, x2: 1200, y2: 1600 },
  { x1: 800, y1: 1200, x2: 1200, y2: 1200 },
  { x1: 800, y1: 1600, x2: 1200, y2: 1600 },
  // Interior
  { x1: 1000, y1: 1200, x2: 1000, y2: 1600 },
  { x1: 800, y1: 1400, x2: 1200, y2: 1400 },
);

// Plaza of Bodies - open area with scattered remains
const plazaOfBodies = [
  // Open square
  { x1: 1800, y1: 1200, x2: 1800, y2: 1800 },
  { x1: 2400, y1: 1200, x2: 2400, y2: 1800 },
  { x1: 1800, y1: 1800, x2: 2400, y2: 1800 },
  { x1: 1800, y1: 1200, x2: 2400, y2: 1200 },
];

// Block 9 - lower right
buildings.push(
  { x1: 2600, y1: 1300, x2: 3200, y2: 1700 },
  { x1: 2600, y1: 1300, x2: 2600, y2: 1700 },
  { x1: 3200, y1: 1300, x2: 3200, y2: 1700 },
  { x1: 2600, y1: 1300, x2: 3200, y2: 1300 },
  { x1: 2600, y1: 1700, x2: 3200, y2: 1700 },
  // Interior
  { x1: 2900, y1: 1300, x2: 2900, y2: 1700 },
);

// Block 10 - bottom left
buildings.push(
  { x1: 100, y1: 2000, x2: 600, y2: 2400 },
  { x1: 100, y1: 2000, x2: 100, y2: 2400 },
  { x1: 600, y1: 2000, x2: 600, y2: 2400 },
  { x1: 100, y1: 2000, x2: 600, y2: 2000 },
  { x1: 100, y1: 2400, x2: 600, y2: 2400 },
  // Interior
  { x1: 350, y1: 2000, x2: 350, y2: 2400 },
);

// Block 11 - bottom center (Kade's departure area)
buildings.push(
  { x1: 900, y1: 1900, x2: 1400, y2: 2300 },
  { x1: 900, y1: 1900, x2: 900, y2: 2300 },
  { x1: 1400, y1: 1900, x2: 1400, y2: 2300 },
  { x1: 900, y1: 1900, x2: 1400, y2: 1900 },
  { x1: 900, y1: 2300, x2: 1400, y2: 2300 },
  // Interior
  { x1: 1150, y1: 1900, x2: 1150, y2: 2300 },
);

// The Tower - massive structure at bottom
const tower = [
  // Tower base
  { x1: 1700, y1: 2000, x2: 1700, y2: 2800 },
  { x1: 2300, y1: 2000, x2: 2300, y2: 2800 },
  { x1: 1700, y1: 2800, x2: 2300, y2: 2800 },
  { x1: 1700, y1: 2000, x2: 2300, y2: 2000 },
  // Interior structure
  { x1: 1800, y1: 2100, x2: 1800, y2: 2700 },
  { x1: 2200, y1: 2100, x2: 2200, y2: 2700 },
  { x1: 1800, y1: 2100, x2: 2200, y2: 2100 },
  { x1: 1800, y1: 2700, x2: 2200, y2: 2700 },
  // Threshold Room at top
  { x1: 1850, y1: 2150, x2: 1850, y2: 2650 },
  { x1: 2150, y1: 2150, x2: 2150, y2: 2650 },
  { x1: 1850, y1: 2150, x2: 2150, y2: 2150 },
  { x1: 1850, y1: 2650, x2: 2150, y2: 2650 },
];

// Threshold Room - circular represented as octagon
const thresholdRoom = [
  { x1: 1900, y1: 2250, x2: 2000, y2: 2200 },
  { x1: 2000, y1: 2200, x2: 2100, y2: 2250 },
  { x1: 2100, y1: 2250, x2: 2150, y2: 2350 },
  { x1: 2150, y1: 2350, x2: 2100, y2: 2500 },
  { x1: 2100, y1: 2500, x2: 2000, y2: 2550 },
  { x1: 2000, y1: 2550, x2: 1900, y2: 2500 },
  { x1: 1900, y1: 2500, x2: 1850, y2: 2350 },
  { x1: 1850, y1: 2350, x2: 1900, y2: 2250 },
];

// Block 12 - bottom right
buildings.push(
  { x1: 2600, y1: 2000, x2: 3200, y2: 2400 },
  { x1: 2600, y1: 2000, x2: 2600, y2: 2400 },
  { x1: 3200, y1: 2000, x2: 3200, y2: 2400 },
  { x1: 2600, y1: 2000, x2: 3200, y2: 2000 },
  { x1: 2600, y1: 2400, x2: 3200, y2: 2400 },
  // Interior
  { x1: 2900, y1: 2000, x2: 2900, y2: 2400 },
);

// Citizens patrol paths (dotted lines showing walking patterns)
const citizenPaths: { x1: number; y1: number; x2: number; y2: number; type: string }[] = [];
// Loop around block 7
for (let i = 0; i < 20; i++) {
  const angle = (i / 20) * Math.PI * 2;
  const cx = 300, cy = 1500;
  const rx = 350, ry = 350;
  const x = cx + Math.cos(angle) * rx;
  const y = cy + Math.sin(angle) * ry;
  const nextAngle = ((i + 1) / 20) * Math.PI * 2;
  const nx = cx + Math.cos(nextAngle) * rx;
  const ny = cy + Math.sin(nextAngle) * ry;
  citizenPaths.push({ x1: x, y1: y, x2: nx, y2: ny, type: "outline" });
}

// Street lines (road markings)
const streetLines: { x1: number; y1: number; x2: number; y2: number; type: string }[] = [];
// Horizontal streets
for (let y of [550, 1150, 1750, 2450]) {
  for (let x = 100; x < 3800; x += 200) {
    streetLines.push({ x1: x, y1: y, x2: x + 100, y2: y, type: "outline" });
  }
}
// Vertical streets
for (let x of [750, 1550, 2550, 3400]) {
  for (let y = 100; y < 3200; y += 200) {
    streetLines.push({ x1: x, y1: y, x2: x, y2: y + 100, type: "outline" });
  }
}

export const level11: LevelMap = {
  id: "11",
  name: "The Infinite City",
  subtitle: "Terminus",
  width: W,
  height: H,
  bgColor: "#08080a",
  wallColor: "rgba(120,120,140,0.3)",
  gridColor: "rgba(120,120,140,0.03)",
  walls: [
    ...boundary,
    ...entryStreet,
    ...buildings,
    ...plazaOfBodies,
    ...tower,
    ...thresholdRoom,
    ...citizenPaths,
    ...streetLines,
  ],
  rooms: [
    { x: 1600, y: 60, w: 800, h: 340, type: "street", label: "ENTRY STREET" },
    { x: 100, y: 100, w: 700, h: 400, type: "building" },
    { x: 900, y: 100, w: 500, h: 300, type: "building" },
    { x: 2600, y: 100, w: 600, h: 400, type: "building" },
    { x: 100, y: 700, w: 500, h: 400, type: "building" },
    { x: 900, y: 600, w: 400, h: 300, type: "cafe", label: "WORKING CAFE" },
    { x: 2700, y: 600, w: 600, h: 400, type: "building", label: "OTHER SQUAD" },
    { x: 100, y: 1300, w: 400, h: 400, type: "building" },
    { x: 800, y: 1200, w: 400, h: 400, type: "building" },
    { x: 1800, y: 1200, w: 600, h: 600, type: "street", label: "PLAZA OF BODIES" },
    { x: 2600, y: 1300, w: 600, h: 400, type: "building" },
    { x: 100, y: 2000, w: 500, h: 400, type: "building" },
    { x: 900, y: 1900, w: 500, h: 400, type: "building" },
    { x: 1700, y: 2000, w: 600, h: 800, type: "tower", label: "THE TOWER" },
    { x: 1850, y: 2150, w: 300, h: 500, type: "key", label: "THRESHOLD ROOM" },
    { x: 2600, y: 2000, w: 600, h: 400, type: "building" },
  ],
  zones: [
    { path: "M 60 60 L 760 60 L 760 560 L 60 560 Z", color: "#8e44ad", label: "BLOCK A", opacity: 0.05 },
    { path: "M 860 60 L 1460 60 L 1460 460 L 860 460 Z", color: "#8e44ad", label: "BLOCK B", opacity: 0.05 },
    { path: "M 860 560 L 1360 560 L 1360 960 L 860 960 Z", color: "#d4a017", label: "CAFE ZONE", opacity: 0.08 },
    { path: "M 2660 560 L 3360 560 L 3360 1060 L 2660 1060 Z", color: "#c0392b", label: "OTHER SQUAD", opacity: 0.08 },
    { path: "M 1760 1160 L 2460 1160 L 2460 1860 L 1760 1860 Z", color: "#e74c3c", label: "PLAZA", opacity: 0.08 },
    { path: "M 1660 1960 L 2360 1960 L 2360 2860 L 1660 2860 Z", color: "#d4a017", label: "THE TOWER", opacity: 0.1 },
  ],
  markers: [
    {
      x: 2000, y: 250,
      type: "start",
      label: "Emergence into the City",
      description: "The top of the Grand Staircase opens to open sky. An infinite city stretches in every direction. Buildings, streets, sidewalks — all empty. The Hum is different here. It's almost peaceful. Almost.",
    },
    {
      x: 1100, y: 750,
      type: "landmark",
      label: "The Working Cafe",
      description: "A perfectly maintained cafe. Coffee cups on tables, pastries in the display case, music playing. No people. The coffee is hot. Someone was just here. Someone is always just about to arrive.",
    },
    {
      x: 3000, y: 800,
      type: "encounter",
      label: "The Other Squad",
      description: "A Russian expedition. All dead. Not killed — dead of fear. Their faces are frozen in expressions of absolute terror. One of them clutches a data pad: 'We found the city. The city found us first.'",
    },
    {
      x: 2100, y: 1500,
      type: "danger",
      label: "Plaza of Bodies",
      description: "Dozens of bodies from previous expeditions. Different eras, different equipment. Some are old. Some are new. One of them is wearing Async Industries logos that haven't been designed yet.",
    },
    {
      x: 300, y: 1500,
      type: "entity",
      label: "Citizens — First Encounter",
      description: "Humanoid shapes walking the streets in perfect patterns. Completely passive. They walk through the squad without acknowledgment. They don't breathe. They don't rustle. The absence of expected human sounds is the most terrifying thing in the game.",
    },
    {
      x: 2000, y: 2400,
      type: "entity",
      label: "The Architect's Influence",
      description: "Buildings shift. A street that led north now leads east. A doorway that was there is gone. The Architect — massive, never directly observed — is reshaping the city around the squad. They are mice in a maze being rebuilt while they run.",
    },
    {
      x: 1150, y: 2100,
      type: "scripted",
      label: "Kade's Departure",
      description: "Kade stops. He looks at a door — just a door in a building. 'That's my mama's church.' He walks toward it. 'Kade, that's not real.' He turns, smiling. 'It's the realest thing I've seen since we got here.' He walks through the door. It closes. It's gone.",
    },
    {
      x: 3000, y: 2200,
      type: "entity",
      label: "The Statue (Optional)",
      description: "2.5 meters tall. Moves when unobserved. Direct SCP-173 reference. If the squad looks away, it's closer. If they look back, it hasn't moved. Except it has. The only way past: never stop looking at it while moving to the exit.",
    },
    {
      x: 2000, y: 2350,
      type: "objective",
      label: "The Threshold Room",
      description: "Circular room with windows showing every level. Center device pulses with orange light. Terminal reads: 'BREACH REQUIRES LIVING MASS + CONSCIOUS INTENT. SACRIFICE MANDATORY. ONE ENTERS. OTHERS EXIT.' The final choice.",
    },
    {
      x: 1600, y: 800,
      type: "item",
      label: "Reyes's Chess Set",
      description: "In the cafe, a chess set mid-game. White pieces are Reyes's. Black pieces are... also Reyes's. She was playing against herself. The final move is checkmate. White wins. But black made no attempt to defend.",
    },
    {
      x: 2000, y: 1000,
      type: "landmark",
      label: "Endless Street",
      description: "A street that stretches to the horizon in both directions. Perfectly maintained streetlights. Perfectly clean sidewalks. Perfectly empty. The hum of the lights is the only sound. It goes on forever.",
    },
    {
      x: 500, y: 2200,
      type: "item",
      label: "Holt's White Queen",
      description: "The white queen from Holt's chess set, found alone on a sidewalk. He's been playing both sides since Reyes disappeared. He set it down here. A goodbye.",
    },
  ],
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
