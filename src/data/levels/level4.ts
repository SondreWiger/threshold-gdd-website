import { LevelMap } from "@/components/maps/MapViewer";

const W = 3600;
const H = 3000;

const boundary = [
  { x1: 0, y1: 0, x2: W, y2: 0 },
  { x1: W, y1: 0, x2: W, y2: H },
  { x1: W, y1: H, x2: 0, y2: H },
  { x1: 0, y1: H, x2: 0, y2: 0 },
];

// Entry from elevator
const entryArea = [
  { x1: 1500, y1: 80, x2: 2100, y2: 80 },
  { x1: 1500, y1: 80, x2: 1500, y2: 300 },
  { x1: 2100, y1: 80, x2: 2100, y2: 300 },
  { x1: 1500, y1: 300, x2: 1700, y2: 300 },
  { x1: 1900, y1: 300, x2: 2100, y2: 300 },
];

// Office park grid - cubicle world (desaturated, wrong)
// Irregular grid of cubicle walls - not aligned, some at wrong angles
const cubicleWalls: { x1: number; y1: number; x2: number; y2: number; type?: string }[] = [];

// Row 1 - cubicles
for (let i = 0; i < 6; i++) {
  const x = 200 + i * 250;
  const y = 400;
  // Each cubicle slightly different size (wrong)
  const w = 180 + (i % 3) * 20;
  const h = 150 + (i % 2) * 30;
  cubicleWalls.push(
    { x1: x, y1: y, x2: x + w, y2: y },
    { x1: x, y1: y, x2: x, y2: y + h },
    { x1: x + w, y1: y, x2: x + w, y2: y + h },
    { x1: x, y1: y + h, x2: x + w * 0.4, y2: y + h },
    { x1: x + w * 0.6, y1: y + h, x2: x + w, y2: y + h },
  );
}

// Row 2 - offset, different sizes
for (let i = 0; i < 5; i++) {
  const x = 350 + i * 280;
  const y = 650;
  const w = 200 + (i % 2) * 40;
  const h = 130 + (i % 3) * 25;
  cubicleWalls.push(
    { x1: x, y1: y, x2: x + w, y2: y },
    { x1: x, y1: y, x2: x, y2: y + h },
    { x1: x + w, y1: y, x2: x + w, y2: y + h },
    { x1: x, y1: y + h, x2: x + w * 0.5, y2: y + h },
    { x1: x + w * 0.7, y1: y + h, x2: x + w, y2: y + h },
  );
}

// Row 3 - even more irregular
for (let i = 0; i < 7; i++) {
  const x = 100 + i * 220;
  const y = 880;
  const w = 160 + (i % 4) * 15;
  const h = 120 + (i % 2) * 40;
  cubicleWalls.push(
    { x1: x, y1: y, x2: x + w, y2: y },
    { x1: x, y1: y, x2: x, y2: y + h },
    { x1: x + w, y1: y, x2: x + w, y2: y + h },
    { x1: x, y1: y + h, x2: x + w * 0.3, y2: y + h },
    { x1: x + w * 0.5, y1: y + h, x2: x + w, y2: y + h },
  );
}

// Conference rooms (The Meeting entity territory)
const conferenceRooms = [
  // Room 1 - normal-ish
  { x1: 2400, y1: 400, x2: 2400, y2: 700 },
  { x1: 2400, y1: 700, x2: 2900, y2: 700 },
  { x1: 2900, y1: 400, x2: 2900, y2: 700 },
  { x1: 2400, y1: 400, x2: 2900, y2: 400 },
  // Door
  { x1: 2600, y1: 700, x2: 2700, y2: 700, type: "door" },
  // Conference table inside
  { x1: 2520, y1: 500, x2: 2520, y2: 620 },
  { x1: 2780, y1: 500, x2: 2780, y2: 620 },
  { x1: 2520, y1: 500, x2: 2780, y2: 500 },
  { x1: 2520, y1: 620, x2: 2780, y2: 620 },

  // Room 2 - wrong (The Meeting entity)
  { x1: 2400, y1: 800, x2: 2400, y2: 1200 },
  { x1: 2400, y1: 1200, x2: 3000, y2: 1200 },
  { x1: 3000, y1: 800, x2: 3000, y2: 1200 },
  { x1: 2400, y1: 800, x2: 3000, y2: 800 },
  // The Meeting's table - larger, more chairs
  { x1: 2500, y1: 900, x2: 2500, y2: 1100 },
  { x1: 2900, y1: 900, x2: 2900, y2: 1100 },
  { x1: 2500, y1: 900, x2: 2900, y2: 900 },
  { x1: 2500, y1: 1100, x2: 2900, y2: 1100 },
  // PowerPoint screen
  { x1: 2650, y1: 810, x2: 2750, y2: 810, type: "glass" },
];

// Memory buildings (personal spaces)
const memoryBuildings = [
  // Vance's desk
  { x1: 200, y1: 1200, x2: 200, y2: 1500 },
  { x1: 200, y1: 1500, x2: 500, y2: 1500 },
  { x1: 500, y1: 1200, x2: 500, y2: 1500 },
  { x1: 200, y1: 1200, x2: 500, y2: 1200 },
  // Desk inside
  { x1: 280, y1: 1300, x2: 280, y2: 1400 },
  { x1: 420, y1: 1300, x2: 420, y2: 1400 },
  { x1: 280, y1: 1300, x2: 420, y2: 1300 },
  { x1: 280, y1: 1400, x2: 420, y2: 1400 },

  // Kade's church
  { x1: 700, y1: 1200, x2: 700, y2: 1500 },
  { x1: 700, y1: 1500, x2: 1100, y2: 1500 },
  { x1: 1100, y1: 1200, x2: 1100, y2: 1500 },
  { x1: 700, y1: 1200, x2: 1100, y2: 1200 },
  // Pew rows
  { x1: 750, y1: 1300, x2: 1050, y2: 1300 },
  { x1: 750, y1: 1370, x2: 1050, y2: 1370 },
  { x1: 750, y1: 1440, x2: 1050, y2: 1440 },

  // Holt's briefing room
  { x1: 200, y1: 1700, x2: 200, y2: 2000 },
  { x1: 200, y1: 2000, x2: 600, y2: 2000 },
  { x1: 600, y1: 1700, x2: 600, y2: 2000 },
  { x1: 200, y1: 1700, x2: 600, y2: 1700 },

  // Reyes's server room
  { x1: 800, y1: 1700, x2: 800, y2: 2100 },
  { x1: 800, y1: 2100, x2: 1300, y2: 2100 },
  { x1: 1300, y1: 1700, x2: 1300, y2: 2100 },
  { x1: 800, y1: 1700, x2: 1300, y2: 1700 },
  // Server racks
  { x1: 850, y1: 1800, x2: 850, y2: 2000, type: "debris" },
  { x1: 950, y1: 1800, x2: 950, y2: 2000, type: "debris" },
  { x1: 1050, y1: 1800, x2: 1050, y2: 2000, type: "debris" },
  { x1: 1150, y1: 1800, x2: 1150, y2: 2000, type: "debris" },
];

// Glass walkway (Doppelganger gauntlet)
const glassWalkway = [
  { x1: 1500, y1: 1600, x2: 1500, y2: 2200 },
  { x1: 1600, y1: 1600, x2: 1600, y2: 2200 },
  // Glass panels
  ...Array.from({ length: 6 }, (_, i) => ({
    x1: 1500, y1: 1650 + i * 90, x2: 1600, y2: 1650 + i * 90, type: "glass" as const,
  })),
];

// Grand Staircase
const grandStaircase = [
  { x1: 1800, y1: 2200, x2: 1800, y2: 2700 },
  { x1: 2200, y1: 2200, x2: 2200, y2: 2700 },
  { x1: 1800, y1: 2700, x2: 2200, y2: 2700 },
  { x1: 1800, y1: 2200, x2: 2200, y2: 2200 },
  // Steps
  ...Array.from({ length: 10 }, (_, i) => ({
    x1: 1820, y1: 2220 + i * 48, x2: 2180, y2: 2220 + i * 48, type: "outline" as const,
  })),
];

// Doppelganger corridors (wrong versions of known spaces)
const doppelgangerCorridors = [
  // Corridor that mimics Level 0 but wrong
  { x1: 1500, y1: 1000, x2: 1500, y2: 1500 },
  { x1: 1650, y1: 1000, x2: 1650, y2: 1500 },
  // Interior walls that don't match
  { x1: 1520, y1: 1100, x2: 1520, y2: 1300 },
  { x1: 1630, y1: 1200, x2: 1630, y2: 1400 },
];

// Thorne's confession room
const thorneRoom = [
  { x1: 2400, y1: 1400, x2: 2400, y2: 1700 },
  { x1: 2400, y1: 1700, x2: 2800, y2: 1700 },
  { x1: 2800, y1: 1400, x2: 2800, y2: 1700 },
  { x1: 2400, y1: 1400, x2: 2800, y2: 1400 },
];

// Corridors connecting sections
const connectingCorridors = [
  // Entry to cubicles
  { x1: 1500, y1: 300, x2: 1500, y2: 400 },
  { x1: 1700, y1: 300, x2: 1700, y2: 400 },
  // Cubicles to conference
  { x1: 1600, y1: 400, x2: 1600, y2: 880 },
  // Down from cubicles
  { x1: 800, y1: 1000, x2: 800, y2: 1200 },
  { x1: 900, y1: 1000, x2: 900, y2: 1200 },
  // Memory buildings to glass walkway
  { x1: 1200, y1: 1500, x2: 1200, y2: 1600 },
  { x1: 1300, y1: 1500, x2: 1300, y2: 1600 },
  // Glass walkway to staircase
  { x1: 1500, y1: 2200, x2: 1800, y2: 2200 },
  { x1: 1600, y1: 2200, x2: 1600, y2: 2200 },
];

// Exit to Level 11
const exitArea = [
  { x1: 1900, y1: 2700, x2: 1900, y2: 2900 },
  { x1: 2100, y1: 2700, x2: 2100, y2: 2900 },
];

// Wrongness details - walls that don't connect, floating segments
const wrongness: { x1: number; y1: number; x2: number; y2: number; type: string }[] = [
  // Floating wall segment
  { x1: 1800, y1: 500, x2: 1800, y2: 650, type: "outline" },
  // Wall that ends in nothing
  { x1: 1200, y1: 800, x2: 1400, y2: 800, type: "outline" },
  // Parallel wall with no room
  { x1: 3000, y1: 1000, x2: 3000, y2: 1400, type: "outline" },
  // L-shape fragment
  { x1: 2200, y1: 1600, x2: 2400, y2: 1600, type: "outline" },
  { x1: 2200, y1: 1600, x2: 2200, y2: 1800, type: "outline" },
];

export const level4: LevelMap = {
  id: "4",
  name: "Abandoned Office",
  subtitle: "Descent",
  width: W,
  height: H,
  bgColor: "#0a0b0e",
  wallColor: "rgba(100,130,160,0.3)",
  gridColor: "rgba(100,130,160,0.03)",
  walls: [
    ...boundary,
    ...entryArea,
    ...cubicleWalls,
    ...conferenceRooms,
    ...memoryBuildings,
    ...glassWalkway,
    ...grandStaircase,
    ...doppelgangerCorridors,
    ...thorneRoom,
    ...connectingCorridors,
    ...exitArea,
    ...wrongness,
  ],
  rooms: [
    { x: 1500, y: 80, w: 600, h: 220, type: "corridor", label: "ENTRY" },
    ...Array.from({ length: 6 }, (_, i) => ({
      x: 200 + i * 250, y: 400, w: 180 + (i % 3) * 20, h: 150 + (i % 2) * 30, type: "office" as const,
    })),
    ...Array.from({ length: 5 }, (_, i) => ({
      x: 350 + i * 280, y: 650, w: 200 + (i % 2) * 40, h: 130 + (i % 3) * 25, type: "office" as const,
    })),
    ...Array.from({ length: 7 }, (_, i) => ({
      x: 100 + i * 220, y: 880, w: 160 + (i % 4) * 15, h: 120 + (i % 2) * 40, type: "office" as const,
    })),
    { x: 2400, y: 400, w: 500, h: 300, type: "office", label: "CONFERENCE A" },
    { x: 2400, y: 800, w: 600, h: 400, type: "key", label: "THE MEETING" },
    { x: 200, y: 1200, w: 300, h: 300, type: "key", label: "VANCE'S DESK" },
    { x: 700, y: 1200, w: 400, h: 300, type: "key", label: "KADE'S CHURCH" },
    { x: 200, y: 1700, w: 400, h: 300, type: "office", label: "HOLT'S ROOM" },
    { x: 800, y: 1700, w: 500, h: 400, type: "key", label: "SERVER ROOM" },
    { x: 1500, y: 1000, w: 150, h: 500, type: "corridor", label: "DOPPEL CORRIDOR" },
    { x: 1500, y: 1600, w: 100, h: 600, type: "corridor", label: "GLASS WALK" },
    { x: 1800, y: 2200, w: 400, h: 500, type: "key", label: "GRAND STAIR" },
    { x: 2400, y: 1400, w: 400, h: 300, type: "key", label: "THORNE'S ROOM" },
    { x: 1900, y: 2700, w: 200, h: 200, type: "extraction", label: "EXIT" },
  ],
  zones: [
    { path: "M 160 360 L 1660 360 L 1660 1040 L 160 1040 Z", color: "#2980b9", label: "CUBICLE ZONE", opacity: 0.05 },
    { path: "M 2360 360 L 3040 360 L 3040 1240 L 2360 1240 Z", color: "#8e44ad", label: "CONFERENCE ZONE", opacity: 0.08 },
    { path: "M 160 1160 L 1140 1160 L 1140 2140 L 160 2140 Z", color: "#2980b9", label: "MEMORY ZONE", opacity: 0.06 },
    { path: "M 1460 960 L 1690 960 L 1690 1540 L 1460 1540 Z", color: "#c0392b", label: "DOPPELGANGER", opacity: 0.1 },
    { path: "M 1460 1560 L 1640 1560 L 1640 2240 L 1460 2240 Z", color: "#e74c3c", label: "GLASS WALK", opacity: 0.1 },
    { path: "M 1760 2160 L 2240 2160 L 2240 2740 L 1760 2740 Z", color: "#d4a017", label: "STAIRCASE", opacity: 0.06 },
  ],
  markers: [
    {
      x: 1800, y: 180,
      type: "start",
      label: "Entry from Level 2",
      description: "The elevator opens to desaturated office space. Cubicles stretch in every direction. The fluorescent lights are the wrong color — more blue than yellow. The Hum has changed. It whispers now.",
    },
    {
      x: 400, y: 1350,
      type: "encounter",
      label: "Vance Finds Her Desk",
      description: "Her own desk. Her foster brother's photo still pinned to the cubicle wall. The Backrooms knew her before she knew them. This is personal. This is wrong. Sanity impact: severe.",
    },
    {
      x: 900, y: 1350,
      type: "encounter",
      label: "Kade Finds His Church Bulletin",
      description: "A childhood church bulletin on a desk in a cubicle in an infinite office. Kade's faith wavers — or deepens. He doesn't speak for ten minutes.",
    },
    {
      x: 2700, y: 1000,
      type: "entity",
      label: "The Meeting (T-4 Entity)",
      description: "A conference room that traps visitors in increasingly irrational scenarios. The PowerPoint presentation shows the squad's psychological profiles and projected casualty rates. It knows them. It's been waiting.",
    },
    {
      x: 1575, y: 1300,
      type: "danger",
      label: "Doppelganger Vance",
      description: "A perfect copy of Vance appears. Same voice, same mannerisms, same bandanna. It attacks with personal guilt — knows every face she's seen die, every failure she's buried. The real Vance must confront herself.",
    },
    {
      x: 2600, y: 1550,
      type: "scripted",
      label: "Thorne's Full Confession",
      description: "'Operation THRESHOLD was never a security mission... The extraction point was theoretical. You were never supposed to come home.' Player choice: spare or execute Thorne. This changes everything.",
    },
    {
      x: 1050, y: 1900,
      type: "encounter",
      label: "Reyes's Disappearance",
      description: "Reyes steps into a wall that ripples like water. Her camera continues recording for 47 minutes. Final recording: 'The hum isn't noise. It's music. And I finally know the words.' She's gone.",
    },
    {
      x: 1575, y: 1900,
      type: "danger",
      label: "Doppelganger Gauntlet",
      description: "The glass walkway. Below, nothing. On the walkway, Doppelgangers of the entire squad attack simultaneously. They use the real squad's tactics, voices, and weaknesses against them.",
    },
    {
      x: 2000, y: 2450,
      type: "objective",
      label: "Grand Staircase",
      description: "The only way forward. A massive staircase spiraling upward into darkness. Each step echoes differently. The squad ascends toward Level 11 — toward the end.",
    },
    {
      x: 2000, y: 2800,
      type: "end",
      label: "Exit to Level 11",
      description: "The top of the staircase opens to open sky — impossible, after underground levels. An infinite city stretches below. The squad steps out into the apocalypse.",
    },
    {
      x: 2700, y: 550,
      type: "scripted",
      label: "Conference Room PowerPoint",
      description: "The presentation auto-plays. Slide after slide of the squad's psychological profiles. Predicted breaking points. Projected casualties. The final slide: 'OPERATION THRESHOLD: STATUS — ONGOING.'",
    },
    {
      x: 350, y: 1850,
      type: "item",
      label: "Holt's Chess Set",
      description: "A chess set on a table in Holt's room. Mid-game. White has been playing against itself. The final move is checkmate — but no one was playing black.",
    },
    {
      x: 2000, y: 1550,
      type: "scripted",
      label: "Reyes's Final Recording",
      description: "From her camera, recovered from the server room: 'The hum isn't noise. It's music. And I finally know the words.' Static. Then silence. Then the Hum, perfectly clear, playing a melody.",
    },
  ],
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
