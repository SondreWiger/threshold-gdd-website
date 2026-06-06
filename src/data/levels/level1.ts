import { LevelMap } from "@/components/maps/MapViewer";

function roomWalls(x: number, y: number, w: number, h: number, exclude?: string[]) {
  const e = exclude || [];
  const walls = [];
  if (!e.includes("top")) walls.push({ x1: x, y1: y, x2: x + w, y2: y });
  if (!e.includes("bottom")) walls.push({ x1: x, y1: y + h, x2: x + w, y2: y + h });
  if (!e.includes("left")) walls.push({ x1: x, y1: y, x2: x, y2: y + h });
  if (!e.includes("right")) walls.push({ x1: x + w, y1: y, x2: x + w, y2: y + h });
  return walls;
}

const W = 3400;
const H = 2600;

// Warehouse section - large open spaces with metal shelving
const warehouseWalls: { x1: number; y1: number; x2: number; y2: number; type?: string }[] = [];

// Main warehouse halls
const halls = [
  { x: 80, y: 120, w: 700, h: 500 },
  { x: 80, y: 700, w: 500, h: 400 },
  { x: 660, y: 700, w: 400, h: 350 },
];

for (const hall of halls) {
  warehouseWalls.push(...roomWalls(hall.x, hall.y, hall.w, hall.h, ["right"]));
}

// Connecting corridors between halls
warehouseWalls.push(
  // Hall 1 to Hall 2
  { x1: 200, y1: 620, x2: 200, y2: 700 },
  { x1: 350, y1: 620, x2: 350, y2: 700 },
  // Hall 2 to Hall 3
  { x1: 580, y1: 850, x2: 660, y2: 850 },
  { x1: 580, y1: 950, x2: 660, y2: 950 },
);

// Metal shelving rows inside halls (industrial texture)
const shelvingRows: { x1: number; y1: number; x2: number; y2: number; type: string }[] = [];
for (let i = 0; i < 4; i++) {
  shelvingRows.push({ x1: 140 + i * 160, y1: 200, x2: 140 + i * 160, y2: 560, type: "debris" });
  shelvingRows.push({ x1: 180 + i * 160, y1: 200, x2: 180 + i * 160, y2: 560, type: "debris" });
}
for (let i = 0; i < 2; i++) {
  shelvingRows.push({ x1: 140 + i * 160, y1: 780, x2: 140 + i * 160, y2: 1060, type: "debris" });
  shelvingRows.push({ x1: 180 + i * 160, y1: 780, x2: 180 + i * 160, y2: 1060, type: "debris" });
}

// Industrial corridor system - spine
const industrialCorridor = [
  // Main horizontal corridor
  { x1: 80, y1: 1200, x2: 2200, y2: 1200 },
  { x1: 80, y1: 1280, x2: 2200, y2: 1280 },
  // Openings into corridor
  { x1: 200, y1: 1200, x2: 200, y2: 1200 },
  { x1: 200, y1: 1280, x2: 200, y2: 1280 },
];

// Elevator shaft
const elevatorShaft: { x1: number; y1: number; x2: number; y2: number; type?: string }[] = [
  ...roomWalls(2100, 200, 150, 300),
  // Interior rails
  { x1: 2140, y1: 220, x2: 2140, y2: 480, type: "pipe" },
  { x1: 2210, y1: 220, x2: 2210, y2: 480, type: "pipe" },
  // Door opening
  { x1: 2100, y1: 320, x2: 2100, y2: 380, type: "door" },
];

// Boiler room
const boilerRoom = roomWalls(2100, 600, 400, 350, ["left"]);
// Boiler pipes
const boilerPipes: { x1: number; y1: number; x2: number; y2: number; type: string }[] = [];
for (let i = 0; i < 3; i++) {
  boilerPipes.push({ x1: 2200 + i * 80, y1: 620, x2: 2200 + i * 80, y2: 930, type: "pipe" });
}

// Three-path junction
const junctionWalls = [
  // Junction room
  { x1: 1200, y1: 1200, x2: 1200, y2: 1400 },
  { x1: 1500, y1: 1200, x2: 1500, y2: 1400 },
  { x1: 1200, y1: 1400, x2: 1500, y2: 1400 },
  // Path 1: Storage (left) - wider, more open
  { x1: 900, y1: 1300, x2: 1200, y2: 1300 },
  { x1: 900, y1: 1380, x2: 1200, y2: 1380 },
  // Path 2: Maintenance (center) - narrow
  { x1: 1300, y1: 1400, x2: 1300, y2: 1800 },
  { x1: 1400, y1: 1400, x2: 1400, y2: 1800 },
  // Path 3: Administration (right) - clean
  { x1: 1500, y1: 1280, x2: 1900, y2: 1280 },
  { x1: 1500, y1: 1360, x2: 1900, y2: 1360 },
];

// Storage wing (Path 1)
const storageWalls = [
  ...roomWalls(600, 1300, 320, 400),
  // Shelving
  { x1: 650, y1: 1320, x2: 650, y2: 1680, type: "debris" },
  { x1: 750, y1: 1320, x2: 750, y2: 1680, type: "debris" },
  { x1: 850, y1: 1320, x2: 850, y2: 1680, type: "debris" },
];

// Maintenance corridor (Path 2) - tight, with pipes
const maintenanceWalls = [
  ...roomWalls(1250, 1400, 200, 500),
  // Pipes on walls
  { x1: 1270, y1: 1420, x2: 1270, y2: 1880, type: "pipe" },
  { x1: 1430, y1: 1420, x2: 1430, y2: 1880, type: "pipe" },
  // Cross pipes
  { x1: 1270, y1: 1550, x2: 1430, y2: 1550, type: "pipe" },
  { x1: 1270, y1: 1700, x2: 1430, y2: 1700, type: "pipe" },
];

// Administration wing (Path 3)
const adminWalls = [
  ...roomWalls(1500, 1200, 400, 240),
  // Desks (small rectangles)
  { x1: 1560, y1: 1240, x2: 1640, y2: 1240 },
  { x1: 1560, y1: 1240, x2: 1560, y2: 1280 },
  { x1: 1640, y1: 1240, x2: 1640, y2: 1280 },
  { x1: 1560, y1: 1280, x2: 1640, y2: 1280 },
  { x1: 1720, y1: 1240, x2: 1800, y2: 1240 },
  { x1: 1720, y1: 1240, x2: 1720, y2: 1280 },
  { x1: 1800, y1: 1240, x2: 1800, y2: 1280 },
  { x1: 1720, y1: 1280, x2: 1800, y2: 1280 },
];

// Fuse box room (power restoration puzzle)
const fuseBoxRoom = roomWalls(1600, 1600, 200, 150, ["top"]);
// Fuse boxes on wall
const fuseBoxes: { x1: number; y1: number; x2: number; y2: number; type: string }[] = [
  { x1: 1620, y1: 1620, x2: 1660, y2: 1620, type: "debris" },
  { x1: 1720, y1: 1620, x2: 1760, y2: 1620, type: "debris" },
];

// Pipe Crawler territory - lower section
const pipeCrawlerZone = [
  // Narrow pipe corridors
  { x1: 400, y1: 1900, x2: 400, y2: 2300 },
  { x1: 500, y1: 1900, x2: 500, y2: 2300 },
  { x1: 400, y1: 2100, x2: 500, y2: 2100 },
  // Pipe crawlers run along these
  { x1: 410, y1: 1920, x2: 410, y2: 2280, type: "pipe" },
  { x1: 490, y1: 1920, x2: 490, y2: 2280, type: "pipe" },
];

// Descent shaft to Level 2
const descentShaft: { x1: number; y1: number; x2: number; y2: number; type?: string }[] = [
  ...roomWalls(2400, 1800, 120, 200),
  // Ladder
  { x1: 2440, y1: 1820, x2: 2440, y2: 1980, type: "pipe" },
  { x1: 2500, y1: 1820, x2: 2500, y2: 1980, type: "pipe" },
  // Rungs
  ...Array.from({ length: 8 }, (_, i) => ({
    x1: 2440, y1: 1830 + i * 20, x2: 2500, y2: 1830 + i * 20, type: "pipe" as const,
  })),
];

// Survivor's room
const survivorRoom = roomWalls(800, 1900, 200, 150);

// Dr. Voss carving corridor
const vossCorridor = [
  { x1: 1000, y1: 2000, x2: 1000, y2: 2200 },
  { x1: 1100, y1: 2000, x2: 1100, y2: 2200 },
];

// Boundary
const boundary = [
  { x1: 0, y1: 0, x2: W, y2: 0 },
  { x1: W, y1: 0, x2: W, y2: H },
  { x1: W, y1: H, x2: 0, y2: H },
  { x1: 0, y1: H, x2: 0, y2: 0 },
];

// Industrial detail - grating lines, pipe runs
const industrialDetail: { x1: number; y1: number; x2: number; y2: number; type: string }[] = [];
for (let x = 100; x < 2200; x += 150) {
  industrialDetail.push({ x1: x, y1: 1210, x2: x + 80, y2: 1210, type: "outline" });
  industrialDetail.push({ x1: x, y1: 1270, x2: x + 80, y2: 1270, type: "outline" });
}

export const level1: LevelMap = {
  id: "1",
  name: "Habitable Zone",
  subtitle: "Reality Check",
  width: W,
  height: H,
  bgColor: "#0a0a0c",
  wallColor: "rgba(160,130,80,0.35)",
  gridColor: "rgba(160,130,80,0.04)",
  walls: [
    ...boundary,
    ...warehouseWalls,
    ...shelvingRows,
    ...industrialCorridor,
    ...elevatorShaft,
    ...boilerRoom,
    ...boilerPipes,
    ...junctionWalls,
    ...storageWalls,
    ...maintenanceWalls,
    ...adminWalls,
    ...fuseBoxRoom,
    ...fuseBoxes,
    ...pipeCrawlerZone,
    ...descentShaft,
    ...survivorRoom,
    ...vossCorridor,
    ...industrialDetail,
  ],
  rooms: [
    { x: 80, y: 120, w: 700, h: 500, type: "industrial", label: "WAREHOUSE A" },
    { x: 80, y: 700, w: 500, h: 400, type: "industrial", label: "WAREHOUSE B" },
    { x: 660, y: 700, w: 400, h: 350, type: "industrial", label: "WAREHOUSE C" },
    { x: 80, y: 1200, w: 2120, h: 80, type: "corridor", label: "MAIN CORRIDOR" },
    { x: 2100, y: 200, w: 150, h: 300, type: "key", label: "ELEVATOR" },
    { x: 2100, y: 600, w: 400, h: 350, type: "hazard", label: "BOILER ROOM" },
    { x: 1200, y: 1200, w: 300, h: 200, type: "key", label: "JUNCTION" },
    { x: 600, y: 1300, w: 320, h: 400, type: "industrial", label: "STORAGE" },
    { x: 1250, y: 1400, w: 200, h: 500, type: "maintenance", label: "MAINTENANCE" },
    { x: 1500, y: 1200, w: 400, h: 240, type: "office", label: "ADMIN" },
    { x: 1600, y: 1600, w: 200, h: 150, type: "key", label: "FUSE BOX" },
    { x: 400, y: 1900, w: 100, h: 400, type: "pipe", label: "PIPE ZONE" },
    { x: 2400, y: 1800, w: 120, h: 200, type: "key", label: "DESCENT" },
    { x: 800, y: 1900, w: 200, h: 150, type: "key", label: "SURVIVOR" },
    { x: 1000, y: 2000, w: 100, h: 200, type: "corridor", label: "VOSS" },
  ],
  zones: [
    { path: "M 40 80 L 820 80 L 820 660 L 40 660 Z", color: "#e67e22", label: "WAREHOUSE ZONE", opacity: 0.06 },
    { path: "M 40 1160 L 2240 1160 L 2240 1320 L 40 1320 Z", color: "#e67e22", label: "INDUSTRIAL SPINE", opacity: 0.06 },
    { path: "M 2060 160 L 2540 160 L 2540 980 L 2060 980 Z", color: "#f39c12", label: "ELEVATOR/BOILER", opacity: 0.08 },
    { path: "M 1160 1160 L 1940 1160 L 1940 1440 L 1160 1440 Z", color: "#d4a017", label: "THREE-PATH JUNCTION", opacity: 0.08 },
    { path: "M 360 1860 L 540 1860 L 540 2340 L 360 2340 Z", color: "#c0392b", label: "PIPE ZONE", opacity: 0.1 },
  ],
  markers: [
    {
      x: 420, y: 360,
      type: "start",
      label: "Entry from Level 0",
      description: "The squad emerges from a climbing shaft into industrial space. The yellow wallpaper is gone. Replaced by concrete and metal. The Hum changes pitch.",
    },
    {
      x: 2175, y: 340,
      type: "encounter",
      label: "Rattler in Elevator Shaft",
      description: "The elevator is dead. Inside the shaft, something metallic shifts. The Rattler — a serpentine entity made of pipe and wire — coils around the rails. It's territorial. Don't wake it.",
    },
    {
      x: 2300, y: 770,
      type: "encounter",
      label: "Adult Rattler — Boiler Room",
      description: "The Boiler Room. Steam hisses from broken pipes. An adult Rattler — much larger than the one in the elevator — moves through the pipe network. The squad must navigate without triggering it.",
    },
    {
      x: 1650, y: 1670,
      type: "objective",
      label: "Power Restoration Puzzle",
      description: "Fuse boxes. The squad must restore power to progress. Three fuse boxes, correct combination opens the path. While working, the lights flicker — something is watching.",
    },
    {
      x: 1350, y: 1650,
      type: "danger",
      label: "Smiler Combat — Light Management",
      description: "A Smiler blocks the maintenance corridor. It's fast in darkness. The squad must manage light sources — flashlights, flares — to keep it at bay while moving through.",
    },
    {
      x: 470, y: 2100,
      type: "entity",
      label: "Pipe Crawler Observation",
      description: "Through a grate, the squad watches a Pipe Crawler move through the pipe network. Emaciated, fast, disturbingly human. It hasn't noticed them. Yet.",
    },
    {
      x: 870, y: 1970,
      type: "scripted",
      label: "The Survivor",
      description: "A human — or something wearing a human shape — sits in a small room. It speaks: '3.7 percent. That's the extraction rate. Always has been.' It stands, walks through a solid wall, and is gone.",
    },
    {
      x: 1050, y: 2100,
      type: "scripted",
      label: "Dr. Voss's Carving",
      description: "Carved into the maintenance shaft wall: 'I'm sorry. I thought I could control it.' — Dr. Elias Voss, founder of Async Technologies. The carving is decades old.",
    },
    {
      x: 300, y: 1240,
      type: "scripted",
      label: "90-Second Elevator Descent",
      description: "Scripted: The original elevator descent. Scratching sounds from inside the walls. The floor indicator counts down. The squad is silent. The Hum is deafening.",
    },
    {
      x: 2460, y: 1900,
      type: "end",
      label: "Descent to Level 2",
      description: "A climbing shaft leads down. The air gets colder. The walls get narrower. Below, the sound of dripping water. The squad descends into Pipe Dreams.",
    },
    {
      x: 1800, y: 1280,
      type: "choice",
      label: "Three-Path Junction",
      description: "Player choice: Storage (combat, resources), Maintenance (dangerous, entity-heavy), or Administration (lore, documents). Each path reconverges but with different consequences.",
    },
    {
      x: 1600, y: 260,
      type: "item",
      label: "Extraction Beacon Log",
      description: "A data pad on a dead Async specialist. The log shows extraction was scheduled, then cancelled, then rescheduled, then cancelled again. The last entry simply reads: 'They knew.'",
    },
  ],
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
