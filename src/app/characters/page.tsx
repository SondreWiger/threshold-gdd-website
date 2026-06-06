"use client";

import { useState } from "react";
import Link from "next/link";
import SectionHeader from "@/components/SectionHeader";
import DataCard from "@/components/DataCard";

const characters = [
  {
    name: "MAYA \"VIPER\" OSEI",
    role: "Squad Leader / Recon Specialist",
    unit: "THRESHOLD-1",
    arc: "Determined leader watching her unit break down. Decisions carry weight.",
    arcDetail: "Maya begins confident and controlled, issuing orders and maintaining morale. As the campaign progresses and the squad's sanity frays, she's forced to choose between mission objectives and protecting her people. Her arc culminates in a decision that defines whether THRESHOLD survives as a unit — or as individuals.",
    stats: { loyalty: 92, aggression: 68, sanity: 85 },
    voice: "Command, Viper. Level 4 is compromised. We've lost the exit point — the geometry changed while we were inside.",
    relatedLevel: "/levels",
    relatedGameplay: "/gameplay",
  },
  {
    name: "DIEGO \"HARDHAT\" RAMIREZ",
    role: "Combat Engineer / Heavy Weapons",
    unit: "THRESHOLD-1",
    arc: "Steady professional slowly unraveling as the environment warps.",
    arcDetail: "Diego's calm under fire makes him the squad's anchor. But the Backrooms specifically target his sense of order — things that should be straight aren't, distances don't match, and his engineering precision becomes a liability when the rules change. His paranoia threatens to turn the squad's strongest member into its greatest danger.",
    stats: { loyalty: 88, aggression: 95, sanity: 72 },
    voice: "The hallway we came through is gone. Not blocked — gone. I measured it. It was 47 meters. Now it's nothing.",
    relatedLevel: "/levels",
    relatedLore: "/lore",
  },
  {
    name: "ZHENYA \"SPECTR\" VOLKOV",
    role: "Intelligence / Anomalous Tech Specialist",
    unit: "THRESHOLD-2",
    arc: "Cold operative hiding a deeper connection to the Backrooms.",
    arcDetail: "Zhenya's knowledge of Async Technologies and the Backrooms makes her invaluable — and suspicious. She knows more than she reveals, her technical expertise bordering on prescient. The squad must decide whether to trust her mysterious competence or treat her as a corporate liability. Her knowledge of Async's experiments hints at a personal history.",
    stats: { loyalty: 55, aggression: 42, sanity: 91 },
    voice: "This isn't random. The entities are following a script. Someone wrote this behavior — and Async has the manual.",
    relatedLevel: "/levels",
    relatedLore: "/lore",
  },
  {
    name: "JAMES \"BISHOP\" KOWALSKI",
    role: "Medic / Psychological Operations",
    unit: "THRESHOLD-2",
    arc: "Medic treating injuries that shouldn't exist in reality.",
    arcDetail: "Bishop's medical training doesn't cover wounds caused by non-Euclidean geometry or psychological damage from seeing things that can't exist. He watches his teammates suffer injuries that defy explanation and struggles to maintain his own mental health while being everyone's caretaker. His journals become increasingly unhinged.",
    stats: { loyalty: 94, aggression: 35, sanity: 68 },
    voice: "Viper, I can't treat what I can't understand. Diego's vitals are impossible — his heart rate is negative. That's not medically possible.",
    relatedLevel: "/levels",
    relatedGameplay: "/gameplay",
  },
  {
    name: "RIVER \"GLITCH\" TANAKA",
    role: "Communications / Electronic Warfare",
    unit: "THRESHOLD-2",
    arc: "Comms tech who starts receiving transmissions from herself.",
    arcDetail: "River's job is maintaining contact with Async Command. But the Backrooms interfere with communications in increasingly personal ways — she begins receiving messages that appear to come from herself, describing events that haven't happened yet. Is the Backrooms showing her the future, or is she losing her grip on reality?",
    stats: { loyalty: 82, aggression: 38, sanity: 52 },
    voice: "Command, this is Glitch. I'm receiving... myself. These transmissions are dated three days from now. They're describing exactly what's happening right now.",
    relatedLevel: "/levels",
    relatedLore: "/lore",
  },
];

export default function CharactersPage() {
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <div className="px-6 md:px-12 lg:px-24 py-16 md:py-24">
      <SectionHeader
        code="02 / CHARACTERS"
        title="Fireteam THRESHOLD"
        subtitle="Five soldiers deployed to secure and contain anomalous entities inside the Backrooms"
      />

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-x-8 gap-y-6 mb-20">
        <DataCard label="Squad" value="5" sub="Operators" />
        <DataCard label="Unit" value="THRESHOLD" sub="1 & 2" />
        <DataCard label="Loyalty" value="84%" sub="Average" />
        <DataCard label="Aggression" value="56%" sub="Average" />
        <DataCard label="Sanity" value="74%" sub="Average" />
        <DataCard label="Status" value="ACTIVE" sub="All operatives" />
      </div>

      {/* Character List */}
      <div className="space-y-0">
        {characters.map((char, i) => (
          <div
            key={i}
            className="py-6 border-b border-foreground/[0.04] cursor-pointer group"
            onClick={() => setExpanded(expanded === i ? null : i)}
          >
            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-8">
              <div className="flex-1">
                <div className="flex items-baseline gap-3 mb-1">
                  <h3 className="text-[14px] font-medium text-foreground/70 group-hover:text-amber/70 transition-colors">
                    {char.name}
                  </h3>
                  <span className="font-mono text-[9px] text-foreground/10 tracking-wider">{char.role}</span>
                </div>
                <p className="text-[13px] text-foreground/25 font-light leading-relaxed max-w-xl">
                  <span className="text-foreground/40">{char.arc}</span>
                </p>
              </div>

              {/* Visual stat bars */}
              <div className="flex gap-6 shrink-0">
                {Object.entries(char.stats).map(([key, val]) => (
                  <div key={key} className="w-16">
                    <div className="flex items-baseline justify-between mb-1">
                      <span className="font-mono text-[8px] text-foreground/15 tracking-wider uppercase">{key.slice(0, 4)}</span>
                      <span className="font-mono text-[9px] text-foreground/20">{val}</span>
                    </div>
                    <div className="h-[2px] bg-foreground/[0.04] overflow-hidden">
                      <div className="h-full bg-amber/30" style={{ width: `${val}%` }} />
                    </div>
                  </div>
                ))}
              </div>

              <span className="font-mono text-[10px] text-foreground/10 group-hover:text-amber/30 transition-colors">
                {expanded === i ? "−" : "+"}
              </span>
            </div>

            {/* Expanded Detail */}
            {expanded === i && (
              <div className="mt-4 pt-4 border-t border-foreground/[0.04] pl-4">
                <p className="text-[13px] text-foreground/35 font-light leading-relaxed mb-4 max-w-2xl">
                  {char.arcDetail}
                </p>
                <blockquote className="text-[13px] text-foreground/20 font-light italic border-l border-amber/10 pl-3 mb-4 max-w-xl">
                  &quot;{char.voice}&quot;
                </blockquote>
                <div className="flex gap-4">
                  <Link href={char.relatedLevel} className="font-mono text-[9px] text-foreground/15 hover:text-amber/40 transition-colors tracking-wider">
                    RELATED LEVELS &rarr;
                  </Link>
                  {char.relatedGameplay && (
                    <Link href={char.relatedGameplay} className="font-mono text-[9px] text-foreground/15 hover:text-amber/40 transition-colors tracking-wider">
                      COMBAT SYSTEMS &rarr;
                    </Link>
                  )}
                  {char.relatedLore && (
                    <Link href={char.relatedLore} className="font-mono text-[9px] text-foreground/15 hover:text-amber/40 transition-colors tracking-wider">
                      ASYNC LORE &rarr;
                    </Link>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Squad Relationships Visual */}
      <div className="mt-20">
        <h3 className="font-mono text-[10px] text-foreground/20 tracking-[0.2em] mb-8">SQUAD RELATIONSHIPS</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { from: "MAYA → DIEGO", type: "TRUST", strength: 95, desc: "Diego follows Maya without question. She sees him as the squad's backbone." },
            { from: "MAYA → ZHENYA", type: "SUSPICION", strength: 45, desc: "Maya respects Zhenya's competence but distrusts her loyalty. Their tension is constant." },
            { from: "JAMES → ZHENYA", type: "CONCERN", strength: 72, desc: "James worries Zhenya is manipulating the squad. He monitors her behavior closely." },
            { from: "RIVER → ZHENYA", type: "FEAR", strength: 30, desc: "River's transmissions suggest Zhenya knows more than she admits. The paranoia builds." },
            { from: "DIEGO → RIVER", type: "PROTECTION", strength: 88, desc: "Diego tries to shield River from the worst of it, but she's already seeing things." },
            { from: "DIEGO → JAMES", type: "RELIANCE", strength: 80, desc: "Diego depends on James to keep him grounded. When James falters, so does Diego." },
          ].map((rel, i) => (
            <div key={i} className="py-4 border-b border-foreground/[0.04]">
              <div className="flex items-baseline justify-between mb-2">
                <span className="font-mono text-[9px] text-foreground/25 tracking-wider">{rel.from}</span>
                <span className="font-mono text-[9px] text-amber/40 tracking-wider">{rel.type}</span>
              </div>
              <p className="text-[12px] text-foreground/25 font-light leading-relaxed mb-2">{rel.desc}</p>
              <div className="h-[2px] bg-foreground/[0.04] overflow-hidden">
                <div className="h-full bg-amber/20" style={{ width: `${rel.strength}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Cross-links */}
      <div className="mt-16 pt-8 border-t border-foreground/[0.06]">
        <div className="flex flex-wrap gap-6">
          <Link href="/levels" className="font-mono text-[10px] text-foreground/15 hover:text-amber/50 transition-colors tracking-wider">
            EXPLORE THE LEVELS &rarr;
          </Link>
          <Link href="/gameplay" className="font-mono text-[10px] text-foreground/15 hover:text-amber/50 transition-colors tracking-wider">
            COMBAT & SURVIVAL &rarr;
          </Link>
          <Link href="/lore" className="font-mono text-[10px] text-foreground/15 hover:text-amber/50 transition-colors tracking-wider">
            ASYNC TECHNOLOGIES &rarr;
          </Link>
          <Link href="/overview" className="font-mono text-[10px] text-foreground/15 hover:text-amber/50 transition-colors tracking-wider">
            PROJECT OVERVIEW &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}
