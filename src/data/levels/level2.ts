import { LevelMap } from "@/components/maps/MapViewer";

const W = 3200;
const H = 2800;

// Level 2: Pipe Dreams - Claustrophobic corridors, progressive narrowing
// Entry at top, exit at bottom. Corridors get tighter as you go deeper.

const boundary = [
  { x1: 0, y1: 0, x2: W, y2: 0 },
  { x1: W, y1: 0, x2: W, y2: H },
  { x1: W, y1: H, x2: 0, y2: H },
  { x1: 0, y1: H, x2: 0, y2: 0 },
];

// Entry corridor - widest section (1.5m equivalent)
const entryCorridor = [
  // Top walls
  { x1: 800, y1: 100, x2: 1800, y2: 100 },
  { x1: 800, y1: 250, x2: 1800, y2: 250 },
  // Left wall
  { x1: 800, y1: 100, x2: 800, y2: 250 },
  // Right wall with door
  { x1: 1800, y1: 100, x2: 1800, y2: 170 },
  { x1: 1800, y1: 230, x2: 1800, y2: 250 },
  // Pipe on ceiling
  { x1: 850, y1: 120, x2: 1750, y2: 120, type: "pipe" },
  { x1: 850, y1: 230, x2: 1750, y2: 230, type: "pipe" },
];

// Main pipe network - vertical section (1.2m equivalent)
const mainPipeSection = [
  // Corridor down
  { x1: 1100, y1: 250, x2: 1100, y2: 800 },
  { x1: 1500, y1: 250, x2: 1500, y2: 800 },
  // Exposed pipes on both walls
  { x1: 1120, y1: 270, x2: 1120, y2: 780, type: "pipe" },
  { x1: 1480, y1: 270, x2: 1480, y2: 780, type: "pipe" },
  // Cross pipes
  { x1: 1120, y1: 400, x2: 1480, y2: 400, type: "pipe" },
  { x1: 1120, y1: 550, x2: 1480, y2: 550, type: "pipe" },
  { x1: 1120, y1: 700, x2: 1480, y2: 700, type: "pipe" },
  // Branch left
  { x1: 800, y1: 500, x2: 1100, y2: 500 },
  { x1: 800, y1: 580, x2: 1100, y2: 580 },
  // Branch right
  { x1: 1500, y1: 400, x2: 1900, y2: 400 },
  { x1: 1500, y1: 480, x2: 1900, y2: 480 },
];

// Narrowing section 1 (1.0m equivalent)
const narrowSection1 = [
  // Main path narrows
  { x1: 1150, y1: 800, x2: 1150, y2: 1300 },
  { x1: 1450, y1: 800, x2: 1450, y2: 1300 },
  // Tighter pipe spacing
  { x1: 1165, y1: 820, x2: 1165, y2: 1280, type: "pipe" },
  { x1: 1435, y1: 820, x2: 1435, y2: 1280, type: "pipe" },
  // More cross pipes (claustrophobic)
  { x1: 1165, y1: 900, x2: 1435, y2: 900, type: "pipe" },
  { x1: 1165, y1: 1000, x2: 1435, y2: 1000, type: "pipe" },
  { x1: 1165, y1: 1100, x2: 1435, y2: 1100, type: "pipe" },
  { x1: 1165, y1: 1200, x2: 1435, y2: 1200, type: "pipe" },
  // Side alcove (Pipe Crawler nest)
  { x1: 800, y1: 900, x2: 800, y2: 1100 },
  { x1: 800, y1: 1100, x2: 1150, y2: 1100 },
  { x1: 800, y1: 900, x2: 1000, y2: 900 },
];

// Narrowing section 2 (0.9m equivalent - near single file)
const narrowSection2 = [
  // Very tight
  { x1: 1180, y1: 1300, x2: 1180, y2: 1800 },
  { x1: 1420, y1: 1300, x2: 1420, y2: 1800 },
  // Pipes everywhere
  { x1: 1190, y1: 1320, x2: 1190, y2: 1780, type: "pipe" },
  { x1: 1410, y1: 1320, x2: 1410, y2: 1780, type: "pipe" },
  { x1: 1200, y1: 1350, x2: 1200, y2: 1750, type: "pipe" },
  { x1: 1400, y1: 1350, x2: 1400, y2: 1750, type: "pipe" },
  // Cross pipes every 80 units
  ...Array.from({ length: 6 }, (_, i) => ({
    x1: 1190, y1: 1340 + i * 80, x2: 1410, y2: 1340 + i * 80, type: "pipe" as const,
  })),
  // Drowned wall section - organic growth on walls
  { x1: 1195, y1: 1500, x2: 1195, y2: 1650, type: "debris" },
  { x1: 1405, y1: 1500, x2: 1405, y2: 1650, type: "debris" },
];

// Machine Heart room - larger chamber
const machineHeart = [
  // Chamber
  { x1: 900, y1: 1800, x2: 900, y2: 2100 },
  { x1: 1700, y1: 1800, x2: 1700, y2: 2100 },
  { x1: 900, y1: 2100, x2: 1700, y2: 2100 },
  // Entry from narrow section
  { x1: 1180, y1: 1800, x2: 1420, y2: 1800 },
  // Machine in center (rectangular)
  { x1: 1150, y1: 1900, x2: 1150, y2: 2000 },
  { x1: 1450, y1: 1900, x2: 1450, y2: 2000 },
  { x1: 1150, y1: 1900, x2: 1450, y2: 1900 },
  { x1: 1150, y1: 2000, x2: 1450, y2: 2000 },
  // Pipes from machine
  { x1: 1300, y1: 2000, x2: 1300, y2: 2100, type: "pipe" },
  { x1: 1350, y1: 2000, x2: 1350, y2: 2100, type: "pipe" },
];

// Rising water section
const risingWater = [
  // T-junction
  { x1: 1300, y1: 2100, x2: 1300, y2: 2400 },
  { x1: 1400, y1: 2100, x2: 1400, y2: 2400 },
  // Left branch (dead end)
  { x1: 800, y1: 2200, x2: 1300, y2: 2200 },
  { x1: 800, y1: 2300, x2: 1300, y2: 2300 },
  // Right branch (exit path)
  { x1: 1400, y1: 2200, x2: 1900, y2: 2200 },
  { x1: 1400, y1: 2300, x2: 1900, y2: 2300 },
  // Exit corridor
  { x1: 1700, y1: 2300, x2: 1700, y2: 2600 },
  { x1: 1800, y1: 2300, x2: 1800, y2: 2600 },
];

// Exit elevator/door to Level 4
const exitDoor = [
  { x1: 1650, y1: 2550, x2: 1850, y2: 2550 },
  { x1: 1650, y1: 2550, x2: 1650, y2: 2650 },
  { x1: 1850, y1: 2550, x2: 1850, y2: 2650 },
  { x1: 1650, y1: 2650, x2: 1850, y2: 2650 },
];

// Side rooms (dead ends, wrong turns - backrooms confusion)
const sideRooms = [
  // Dead end room
  { x1: 400, y1: 400, x2: 400, y2: 600 },
  { x1: 400, y1: 600, x2: 700, y2: 600 },
  { x1: 700, y1: 400, x2: 700, y2: 600 },
  { x1: 400, y1: 400, x2: 700, y2: 400 },
  // Wrong turn room
  { x1: 2000, y1: 600, x2: 2000, y2: 800 },
  { x1: 2000, y1: 800, x2: 2300, y2: 800 },
  { x1: 2300, y1: 600, x2: 2300, y2: 800 },
  { x1: 2000, y1: 600, x2: 2300, y2: 600 },
  // Narrow side passage
  { x1: 2200, y1: 1200, x2: 2200, y2: 1600 },
  { x1: 2280, y1: 1200, x2: 2280, y2: 1600 },
  // Flooded room
  { x1: 400, y1: 1400, x2: 400, y2: 1700 },
  { x1: 700, y1: 1400, x2: 700, y2: 1700 },
  { x1: 400, y1: 1700, x2: 700, y2: 1700 },
  { x1: 400, y1: 1400, x2: 700, y2: 1400 },
  // Pipe junction room
  { x1: 2000, y1: 1600, x2: 2000, y2: 1900 },
  { x1: 2300, y1: 1600, x2: 2300, y2: 1900 },
  { x1: 2000, y1: 1900, x2: 2300, y2: 1900 },
  { x1: 2000, y1: 1600, x2: 2300, y2: 1600 },
];

// Fluid/water lines (ankle-deep fluid visualization)
const fluidLines: { x1: number; y1: number; x2: number; y2: number; type: string }[] = [];
for (let y = 260; y < 2600; y += 40) {
  if (y > 100 && y < 250) continue; // Skip entry
  fluidLines.push({ x1: 1110, y1: y, x2: 1115, y2: y + 20, type: "outline" });
  fluidLines.push({ x1: 1490, y1: y, x2: 1485, y2: y + 20, type: "outline" });
}

export const level2: LevelMap = {
  id: "2",
  name: "Pipe Dreams",
  subtitle: "Suffocation",
  width: W,
  height: H,
  bgColor: "#080808",
  wallColor: "rgba(140,100,60,0.4)",
  gridColor: "rgba(140,100,60,0.03)",
  walls: [
    ...boundary,
    ...entryCorridor,
    ...mainPipeSection,
    ...narrowSection1,
    ...narrowSection2,
    ...machineHeart,
    ...risingWater,
    ...exitDoor,
    ...sideRooms,
    ...fluidLines,
  ],
  rooms: [
    { x: 800, y: 100, w: 1000, h: 150, type: "corridor", label: "ENTRY" },
    { x: 1100, y: 250, w: 400, h: 550, type: "pipe", label: "MAIN PIPES" },
    { x: 800, y: 500, w: 300, h: 80, type: "corridor" },
    { x: 1500, y: 400, w: 400, h: 80, type: "corridor" },
    { x: 1150, y: 800, w: 300, h: 500, type: "pipe", label: "NARROWING" },
    { x: 800, y: 900, w: 350, h: 200, type: "hazard", label: "CRAWLER NEST" },
    { x: 1180, y: 1300, w: 240, h: 500, type: "pipe", label: "TIGHT" },
    { x: 900, y: 1800, w: 800, h: 300, type: "key", label: "MACHINE HEART" },
    { x: 1300, y: 2100, w: 100, h: 300, type: "corridor" },
    { x: 800, y: 2200, w: 500, h: 100, type: "corridor", label: "DEAD END" },
    { x: 1400, y: 2200, w: 500, h: 100, type: "corridor" },
    { x: 1700, y: 2300, w: 100, h: 300, type: "corridor" },
    { x: 1650, y: 2550, w: 200, h: 100, type: "extraction", label: "EXIT" },
    { x: 400, y: 400, w: 300, h: 200, type: "empty" },
    { x: 2000, y: 600, w: 300, h: 200, type: "empty" },
    { x: 2200, y: 1200, w: 80, h: 400, type: "corridor" },
    { x: 400, y: 1400, w: 300, h: 300, type: "flooded", label: "FLOODED" },
    { x: 2000, y: 1600, w: 300, h: 300, type: "pipe" },
  ],
  zones: [
    { path: "M 760 60 L 1840 60 L 1840 290 L 760 290 Z", color: "#c0392b", label: "ENTRY ZONE", opacity: 0.06 },
    { path: "M 1060 210 L 1540 210 L 1540 840 L 1060 840 Z", color: "#c0392b", label: "PIPE NETWORK", opacity: 0.06 },
    { path: "M 1110 760 L 1490 760 L 1490 1340 L 1110 1340 Z", color: "#e74c3c", label: "NARROWING", opacity: 0.08 },
    { path: "M 1140 1260 L 1460 1260 L 1460 1840 L 1140 1840 Z", color: "#c0392b", label: "TIGHT PASSAGE", opacity: 0.12 },
    { path: "M 860 1760 L 1740 1760 L 1740 2140 L 860 2140 Z", color: "#d4a017", label: "MACHINE HEART", opacity: 0.08 },
    { path: "M 1260 2060 L 1940 2060 L 1940 2440 L 1260 2440 Z", color: "#2980b9", label: "RISING WATER", opacity: 0.1 },
  ],
  markers: [
    {
      x: 1300, y: 175,
      type: "start",
      label: "Entry from Level 1",
      description: "The squad descends a climbing shaft into narrow corridors. The air is cold. Water drips from exposed pipes. The corridor is already tighter than anything above.",
    },
    {
      x: 1300, y: 470,
      type: "scripted",
      label: "Kade's First Panic Attack",
      description: "'The walls are getting closer.' Kade's breathing quickens. The corridor is objectively wider than some they've walked through. But something about the pipes, the dripping, the dark — it feels like it's closing in.",
    },
    {
      x: 1300, y: 620,
      type: "entity",
      label: "Pipe Crawler Activation",
      description: "A Pipe Crawler — emaciated humanoid — drops from a ceiling vent. Kade shoots. The gunshot echoes through every pipe in the level. Every entity now knows where they are.",
    },
    {
      x: 1300, y: 950,
      type: "danger",
      label: "Pipe Crawler Nest",
      description: "The squad enters the nest. Dozens of Pipe Crawlers line the walls, dormant. Kade whispers: 'Peace be with you.' One Crawler stirs... then settles. They pass through in silence.",
    },
    {
      x: 550, y: 1550,
      type: "danger",
      label: "Flooded Section — Drowned",
      description: "Ankle-deep water becomes knee-deep. A hand grabs from below — a Drowned, humanoid shapes fused to the pipe walls, reaching for warmth. The squad must fight through without being pulled under.",
    },
    {
      x: 1300, y: 1550,
      type: "scripted",
      label: "Kade's Separation",
      description: "Scripted: Kade is separated during a Pipe Crawler ambush. 20 minutes of real-time gameplay without him. When he returns, he's sitting among Drowned who didn't touch him. 'They don't want me yet.' He's singing hymns.",
    },
    {
      x: 1300, y: 1950,
      type: "encounter",
      label: "Machine Heart Room",
      description: "A massive chamber. A machine pulses at the center — organic, mechanical, both. Drowned cling to its surfaces. This is where they feel safe. Combat is possible but costly.",
    },
    {
      x: 1350, y: 2250,
      type: "danger",
      label: "Rising Water Escape",
      description: "Water begins rising. Fast. The squad must navigate the T-junction and reach the exit before the corridor floods completely. Time pressure. Entity pursuit.",
    },
    {
      x: 1750, y: 2600,
      type: "end",
      label: "Elevator to Level 4",
      description: "An old freight elevator. The floor indicator counts up: 2...3...4...Then letters: A...B...C...Then symbols that don't exist. The doors open to Abandoned Office.",
    },
    {
      x: 1300, y: 1100,
      type: "scripted",
      label: "Kade's Moment of Clarity",
      description: "After the nest, Kade turns to a dormant Pipe Crawler. 'They're just like us. Lost. Scared. Lashing out.' For a moment, the horror pauses. Then the water rises.",
    },
    {
      x: 550, y: 500,
      type: "item",
      label: "Survivor Journal (Page 2)",
      description: "Found in the dead-end room. 'Day 7. I can hear them in the pipes. Not crawling — walking. Like they used to be people. Some of them still say please.'",
    },
    {
      x: 2140, y: 1750,
      type: "item",
      label: "Reyes's Camera — Drowned Footage",
      description: "A memory card left in the pipe junction room. Shows footage of the Drowned — not attacking, but reaching. Holding. Like they're trying to remember what it felt like to touch someone.",
    },
  ],
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
