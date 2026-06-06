export interface Task {
  id: string;
  label: string;
  hint?: string;
}

export interface Goal {
  id: string;
  title: string;
  description: string;
  tasks: Task[];
}

export interface Phase {
  id: string;
  code: string;
  title: string;
  subtitle: string;
  description: string;
  estimatedWeeks: string;
  color: string;
  goals: Goal[];
}

export const journey: Phase[] = [
  {
    id: "foundation",
    code: "01",
    title: "Foundation",
    subtitle: "Learn the engine before you build the game",
    description: "UE5 fundamentals. You can't architect what you don't understand. Spend time here — it saves months later.",
    estimatedWeeks: "Weeks 1–3",
    color: "amber",
    goals: [
      {
        id: "install-ue5",
        title: "Install & Navigate UE5",
        description: "Get comfortable with the editor interface",
        tasks: [
          { id: "install-ue54", label: "Install Unreal Engine 5.4+" },
          { id: "editor-nav", label: "Learn editor navigation (viewport, outliner, details panel)" },
          { id: "content-browser", label: "Understand the Content Browser" },
          { id: "play-in-editor", label: "Master Play In Editor (PIE) workflow" },
        ],
      },
      {
        id: "blueprint-basics",
        title: "Blueprint Fundamentals",
        description: "The visual scripting system you'll use for everything",
        tasks: [
          { id: "bp-variables", label: "Variables, types, and casting" },
          { id: "bp-events", label: "Event graphs and execution flow" },
          { id: "bp-functions", label: "Functions and macros" },
          { id: "bp-components", label: "Components and actor composition" },
          { id: "bp-interfaces", label: "Blueprint interfaces for communication" },
        ],
      },
      {
        id: "actor-types",
        title: "Actor Types & Lifecycle",
        description: "Know which class to use when",
        tasks: [
          { id: "actor-vs-pawn", label: "Actor vs Pawn vs Character — when to use which" },
          { id: "game-mode", label: "GameMode and GameState basics" },
          { id: "player-controller", label: "PlayerController role" },
          { id: "actor-lifecycle", label: "Actor lifecycle (BeginPlay, Tick, EndPlay)" },
        ],
      },
      {
        id: "mini-project-1",
        title: "Mini-Project: Hallway",
        description: "Build a simple hallway with doors that open",
        tasks: [
          { id: "hallway-create", label: "Create a new project from First Person template" },
          { id: "hallway BSP", label: "Build a hallway with BSP geometry" },
          { id: "hallway-door", label: "Add a door that opens on interaction" },
          { id: "hallway-light", label: "Place basic lighting" },
        ],
      },
      {
        id: "mini-project-2",
        title: "Mini-Project: Enemy Chase",
        description: "A simple AI that detects and chases you",
        tasks: [
          { id: "ai-controller", label: "Create a basic AI Controller" },
          { id: "behavior-tree", label: "Build a Behavior Tree (patrol → chase)" },
          { id: "ai-perception", label: "AI Perception (sight + hearing)" },
          { id: "ai-nav", label: "NavMesh and pathfinding" },
        ],
      },
      {
        id: "mini-project-3",
        title: "Mini-Project: Dark Room",
        description: "Flashlight, darkness, atmosphere",
        tasks: [
          { id: "flashlight", label: "Flashlight component on player" },
          { id: "dark-room", label: "Dark room with minimal lighting" },
          { id: "post-process", label: "Post-process volume basics" },
          { id: "niagara-intro", label: "Niagara particle system intro" },
        ],
      },
    ],
  },
  {
    id: "prototype",
    code: "02",
    title: "Prototype",
    subtitle: "Graybox Level 0 — get something playable",
    description: "Block out the level. No art, no polish. Just corridors, rooms, and a character walking through them. If it's not fun in graybox, it won't be fun with art.",
    estimatedWeeks: "Weeks 4–9",
    color: "tactical-green",
    goals: [
      {
        id: "player-character",
        title: "Player Character",
        description: "The core movement and interaction feel",
        tasks: [
          { id: "char-create", label: "Create player character blueprint" },
          { id: "char-wasd", label: "WASD movement + mouse look" },
          { id: "char-sprint", label: "Sprint with stamina" },
          { id: "char-crouch", label: "Crouch toggle" },
          { id: "char-interact", label: "Interaction system (line trace, E key)" },
        ],
      },
      {
        id: "level0-graybox",
        title: "Level 0 Graybox",
        description: "The Lobby — block it out with simple shapes",
        tasks: [
          { id: "l0-corridors", label: "Modular corridor pieces (3-4 variations)" },
          { id: "l0-rooms", label: "Room modules (small, medium, safe room)" },
          { id: "l0-layout", label: "Block out full Level 0 layout" },
          { id: "l0-flow", label: "Validate flow: can you walk start to finish?" },
          { id: "l0-timing", label: "Target: 10-15 minutes to complete" },
        ],
      },
      {
        id: "basic-weapons",
        title: "Weapon System (Basic)",
        description: "One gun. It shoots. That's it for now.",
        tasks: [
          { id: "weapon-create", label: "Create weapon actor blueprint" },
          { id: "weapon-fire", label: "Line trace shooting" },
          { id: "weapon-ammo", label: "Ammo counter (UI)" },
          { id: "weapon-reload", label: "Reload mechanic" },
          { id: "weapon-switch", label: "Weapon pickup / switch" },
        ],
      },
      {
        id: "basic-hud",
        title: "Basic HUD",
        description: "Health, ammo, interaction prompt — the minimum",
        tasks: [
          { id: "hud-health", label: "Health display" },
          { id: "hud-ammo", label: "Ammo counter" },
          { id: "hud-interact", label: "Interaction prompt ('Press E')" },
          { id: "hud-minimap", label: "Simple minimap (optional)" },
        ],
      },
      {
        id: "doors-containers",
        title: "Doors & Containers",
        description: "Interactive world objects",
        tasks: [
          { id: "door-push", label: "Push-to-open door" },
          { id: "door-locked", label: "Locked door (keycard or puzzle)" },
          { id: "loot-container", label: "Loot container (ammo, health)" },
          { id: "loot-spawn", label: "Randomized loot spawn points" },
        ],
      },
    ],
  },
  {
    id: "ai-interaction",
    code: "03",
    title: "AI & Interaction",
    subtitle: "The Hound. The Lurker. Make them real.",
    description: "Time to add the things that want to kill you. Start with the Hound — it's your core enemy. Then add the Lurker for ambient dread.",
    estimatedWeeks: "Weeks 10–14",
    color: "tactical-red",
    goals: [
      {
        id: "hound",
        title: "The Hound",
        description: "Your first real enemy — patrol, detect, attack",
        tasks: [
          { id: "hound-model", label: "Placeholder Hound mesh (any shape works)" },
          { id: "hound-ai", label: "Hound AI: patrol → investigate → chase → attack" },
          { id: "hound-detect", label: "Sight + sound detection" },
          { id: "hound-attack", label: "Attack behavior (damage player)" },
          { id: "hound-flee", label: "Flee when damaged (runs away)" },
          { id: "hound-audio", label: "Basic Hound sounds (growl, footsteps)" },
        ],
      },
      {
        id: "lurker",
        title: "The Lurker",
        description: "Ambient dread — appears in peripheral, vanishes on look",
        tasks: [
          { id: "lurker-spawn", label: "Lurker spawn system (random positions)" },
          { id: "lurker-appear", label: "Appears only in peripheral vision" },
          { id: "lurker-vanish", label: "Disappears when directly looked at" },
          { id: "lurker-audio", label: "Subtle audio cue" },
        ],
      },
      {
        id: "entity-systems",
        title: "Entity Systems",
        description: "Shared systems for all enemies",
        tasks: [
          { id: "entity-spawning", label: "Entity spawn manager" },
          { id: "entity-nav", label: "NavMesh setup for all level areas" },
          { id: "entity-damage", label: "Entity damage system" },
          { id: "entity-death", label: "Entity death/despawn" },
        ],
      },
      {
        id: "encounters",
        title: "Encounter Design",
        description: "Place and script the encounters in Level 0",
        tasks: [
          { id: "encounter-1", label: "First Lurker sighting (the 'wrongness' moment)" },
          { id: "encounter-2", label: "First Hound encounter (controlled environment)" },
          { id: "encounter-3", label: "Hound chase sequence" },
          { id: "encounter-pacing", label: "Pacing: tension → scare → recovery → tension" },
        ],
      },
    ],
  },
  {
    id: "atmosphere",
    code: "04",
    title: "Atmosphere",
    subtitle: "Make it feel like the Backrooms",
    description: "Art pass, lighting, sound. This is where graybox becomes creepy. Yellow wallpaper, buzzing lights, distant sounds.",
    estimatedWeeks: "Weeks 15–19",
    color: "level-0",
    goals: [
      {
        id: "environment-art",
        title: "Environment Art",
        description: "Replace graybox with real assets",
        tasks: [
          { id: "wallpaper", label: "Yellow wallpaper material (tileable)" },
          { id: "carpet", label: "Carpet material (tileable, damp look)" },
          { id: "ceiling", label: "Drop ceiling tiles" },
          { id: "doors-art", label: "Door meshes (push-to-open style)" },
          { id: "props", label: "Basic props (desks, chairs, water cooler)" },
          { id: "trim", label: "Baseboards and trim" },
        ],
      },
      {
        id: "lighting",
        title: "Lighting",
        description: "Fluorescent hell — the signature look",
        tasks: [
          { id: "fluorescent", label: "Fluorescent light fixtures (emissive material)" },
          { id: "flicker", label: "Light flicker system" },
          { id: "lumen", label: "Lumen global illumination setup" },
          { id: "mood", label: "Level 0 mood: oppressive, sterile, wrong" },
        ],
      },
      {
        id: "materials",
        title: "Materials & Details",
        description: "The small things that sell the space",
        tasks: [
          { id: "decals", label: "Decal system (stains, grime, water damage)" },
          { id: "normal-maps", label: "Normal maps for surface detail" },
          { id: "emissive", label: "Emissive materials (lights, signs)" },
        ],
      },
      {
        id: "environmental-storytelling",
        title: "Environmental Storytelling",
        description: "The world tells a story without words",
        tasks: [
          { id: "abandoned-items", label: "Abandoned items (backpacks, notes, coffee cups)" },
          { id: "wall-writing", label: "Wall writing / graffiti" },
          { id: "damage-details", label: "Damage and wear details" },
        ],
      },
    ],
  },
  {
    id: "audio-vfx",
    code: "05",
    title: "Audio & VFX",
    subtitle: "Sound is 50% of horror",
    description: "The Hum. Footsteps. Distant crashes. Audio makes or breaks horror. Add VFX for sanity effects and entity feedback.",
    estimatedWeeks: "Weeks 20–23",
    color: "level-4",
    goals: [
      {
        id: "ambient-audio",
        title: "Ambient Audio",
        description: "The soundscape of Level 0",
        tasks: [
          { id: "the-hum", label: "The Hum (60Hz fluorescent buzz loop)" },
          { id: "ambient-layers", label: "Ambient layers (air conditioning, distant drips)" },
          { id: "spatial-audio", label: "Spatial audio setup" },
        ],
      },
      {
        id: "sfx",
        title: "Sound Effects",
        description: "Every action needs a sound",
        tasks: [
          { id: "sfx-footsteps", label: "Footstep sounds (carpet, tile)" },
          { id: "sfx-doors", label: "Door open/close sounds" },
          { id: "sfx-weapon", label: "Weapon fire + reload sounds" },
          { id: "sfx-loot", label: "Loot pickup sounds" },
          { id: "sfx-hound", label: "Hound vocalizations" },
          { id: "sfx-lurker", label: "Lurker ambient sound" },
        ],
      },
      {
        id: "vfx",
        title: "Visual Effects",
        description: "Particles and post-processing",
        tasks: [
          { id: "vfx-muzzle", label: "Muzzle flash" },
          { id: "vfx-dust", label: "Dust particles in light beams" },
          { id: "vfx-drip", label: "Water drip effect" },
          { id: "vfx-vignette", label: "Sanity vignette effect (damage feedback)" },
        ],
      },
      {
        id: "music",
        title: "Music",
        description: "Adaptive audio — tension layers",
        tasks: [
          { id: "music-ambient", label: "Level 0 ambient music track" },
          { id: "music-tension", label: "Tension layer (entity proximity)" },
          { id: "music-implementation", label: "Audio component implementation" },
        ],
      },
    ],
  },
  {
    id: "polish",
    code: "06",
    title: "Polish",
    subtitle: "The last 10% that makes it feel finished",
    description: "Juice it up. Screen effects, camera shake, transitions. Make the player feel things without knowing why.",
    estimatedWeeks: "Weeks 24–27",
    color: "level-11",
    goals: [
      {
        id: "camera-effects",
        title: "Camera & Feel",
        description: "Camera work that sells impact",
        tasks: [
          { id: "cam-shake", label: "Camera shake (damage, explosions)" },
          { id: "cam-fov", label: "FOV changes (sprint, fear)" },
          { id: "cam-proximity", label: "Camera proximity effects (tight corridors)" },
        ],
      },
      {
        id: "sanity-visuals",
        title: "Sanity Effects (Simplified)",
        description: "Visual feedback for the horror",
        tasks: [
          { id: "sanity-desat", label: "Desaturation effect" },
          { id: "sanity-distort", label: "Screen distortion" },
          { id: "sanity-whispers", label: "Whisper audio layer" },
        ],
      },
      {
        id: "transitions",
        title: "Transitions & Flow",
        description: "Smooth experience from start to end",
        tasks: [
          { id: "transition-start", label: "Game start sequence" },
          { id: "transition-death", label: "Death screen + retry" },
          { id: "transition-end", label: "Level end / demo complete screen" },
          { id: "transition-pause", label: "Pause menu" },
        ],
      },
      {
        id: "final-juice",
        title: "Final Juice",
        description: "The small details that elevate everything",
        tasks: [
          { id: "juice-screenshake", label: "Impact feedback on enemy kills" },
          { id: "juice-particles", label: "Environmental particles (dust, light motes)" },
          { id: "juice-sound-mix", label: "Final sound mix pass" },
        ],
      },
    ],
  },
  {
    id: "ship",
    code: "07",
    title: "Ship It",
    subtitle: "Record, share, be proud",
    description: "You have a 15-minute playable demo of Level 0. That's an achievement. Record it, share it, get feedback.",
    estimatedWeeks: "Week 28+",
    color: "amber",
    goals: [
      {
        id: "capture",
        title: "Capture",
        description: "Record your demo for the world to see",
        tasks: [
          { id: "capture-video", label: "Record gameplay footage (OBS or similar)" },
          { id: "capture-screenshots", label: "Take key screenshots" },
          { id: "capture-build", label: "Package a playable build" },
        ],
      },
      {
        id: "share",
        title: "Share",
        description: "Get it in front of people",
        tasks: [
          { id: "share-itch", label: "Upload to itch.io" },
          { id: "share-twitter", label: "Post on Twitter/X with footage" },
          { id: "share-reddit", label: "Post to r/indiegaming or r/unrealengine" },
          { id: "share-discord", label: "Share in UE5 Discord communities" },
        ],
      },
      {
        id: "feedback",
        title: "Collect Feedback",
        description: "Learn what works and what doesn't",
        tasks: [
          { id: "feedback-form", label: "Create feedback form (Google Forms)" },
          { id: "feedback-5", label: "Get 5+ people to play it" },
          { id: "feedback-review", label: "Review feedback and plan next steps" },
        ],
      },
      {
        id: "next-steps",
        title: "Plan What's Next",
        description: "Level 1? Multiplayer? Full game?",
        tasks: [
          { id: "next-decide", label: "Decide: expand demo or start full game" },
          { id: "next-gdd", label: "Update GDD based on learnings" },
          { id: "next-codecks", label: "Update Codecks with new tasks" },
        ],
      },
    ],
  },
];

export function getTotalTasks(): number {
  return journey.reduce(
    (acc, phase) =>
      acc +
      phase.goals.reduce((acc2, goal) => acc2 + goal.tasks.length, 0),
    0
  );
}

export function getPhaseTaskCount(phaseId: string): number {
  const phase = journey.find((p) => p.id === phaseId);
  if (!phase) return 0;
  return phase.goals.reduce((acc, goal) => acc + goal.tasks.length, 0);
}

export function getGoalTaskCount(goalId: string): number {
  for (const phase of journey) {
    const goal = phase.goals.find((g) => g.id === goalId);
    if (goal) return goal.tasks.length;
  }
  return 0;
}
