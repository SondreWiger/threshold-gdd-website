"use client";

import Link from "next/link";
import SectionHeader from "@/components/SectionHeader";
import DataCard from "@/components/DataCard";

export default function OverviewPage() {
  return (
    <div className="px-6 md:px-12 lg:px-24 py-16 md:py-24">
      <SectionHeader
        code="01 / OVERVIEW"
        title="Project Overview"
        subtitle="Squad-based tactical survival-horror FPS developed by Northem Developments"
      />

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-x-8 gap-y-6 mb-20">
        <DataCard label="Engine" value="UE5" sub="5.4+" />
        <DataCard label="Developer" value="Northem" sub="Developments" />
        <DataCard label="Players" value="1–4" sub="Campaign + Co-op" />
        <DataCard label="Platforms" value="3" sub="PC, PS5, Xbox" />
        <DataCard label="Timeline" value="18mo" sub="Development cycle" />
        <DataCard label="Price" value="$49" sub="No MTX" />
      </div>

      {/* Core Concept */}
      <div className="mb-20">
        <h3 className="font-mono text-[10px] text-foreground/20 tracking-[0.2em] mb-4">THE CORE CONCEPT</h3>
        <p className="text-sm text-foreground/50 leading-relaxed max-w-2xl">
          <span className="text-amber/70 font-medium">THRESHOLD</span> weaponizes <span className="text-amber/70 font-medium">tonal dissonance</span>. Players begin as an elite US military squad deployed by <span className="text-amber/70 font-medium">Async Technologies</span> to &quot;secure and contain&quot; the <Link href="/lore" className="text-amber/70 font-medium hover:text-amber transition-colors">Backrooms</Link> — confident, well-equipped, and in control. By the campaign&apos;s midpoint, that confidence is systematically destroyed.
        </p>
      </div>

      {/* Genre & Platforms */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
        <div>
          <h3 className="font-mono text-[10px] text-foreground/20 tracking-[0.2em] mb-3">GENRE</h3>
          <p className="text-sm text-foreground/50 font-light">
            <span className="text-amber/60 font-medium">Tactical Survival-Horror</span>, Squad-Based FPS. 1 player (Campaign) / 1–4 (Cooperative Multiplayer).
          </p>
        </div>
        <div>
          <h3 className="font-mono text-[10px] text-foreground/20 tracking-[0.2em] mb-3">TARGET PLATFORMS</h3>
          <p className="text-sm text-foreground/50 font-light">
            PC (<span className="text-amber/60 font-medium">Steam/Epic</span>), PlayStation 5, Xbox Series X|S
          </p>
        </div>
      </div>

      {/* Rating */}
      <div className="mb-20">
        <h3 className="font-mono text-[10px] text-foreground/20 tracking-[0.2em] mb-3">RATING & PRICE</h3>
        <p className="text-sm text-foreground/50 font-light max-w-2xl">
          <span className="text-amber/60 font-medium">M (Mature 17+)</span> — $49.99 USD. <span className="text-amber/60 font-medium">Premium single-purchase</span>. No battle pass, no loot boxes, no FOMO mechanics.
        </p>
      </div>

      {/* USPs with visual bars */}
      <div className="mb-20">
        <h3 className="font-mono text-[10px] text-foreground/20 tracking-[0.2em] mb-8">UNIQUE SELLING POINTS</h3>
        <div className="space-y-6">
          {[
            { num: "01", title: "Tonal Shift Gameplay", desc: "The only tactical shooter that becomes survival-horror while you play it.", link: "/gameplay" },
            { num: "02", title: "The Backrooms as Military Sci-Fi", desc: "Corporate-military conspiracy, structured lore, and squad dynamics in the liminal space phenomenon.", link: "/lore" },
            { num: "03", title: "Adaptive Squad AI", desc: "Teammates learn from your tactics, develop stress responses, and can psychologically break.", link: "/characters" },
            { num: "04", title: "Reality-Bending Environments", desc: "Procedural environmental distortion using UE5 — corridors stretch, rooms rearrange.", link: "/levels" },
            { num: "05", title: "True Cooperative Horror", desc: "Communication degrades as equipment fails, creating real isolation between players.", link: "/gameplay" },
          ].map((usp) => (
            <Link key={usp.num} href={usp.link} className="group flex gap-6 py-4 border-b border-foreground/[0.04] hover:border-amber/10 transition-colors">
              <span className="font-mono text-sm text-foreground/10 shrink-0 group-hover:text-amber/30 transition-colors">{usp.num}</span>
              <div className="flex-1">
                <h4 className="text-[13px] font-medium text-foreground/60 group-hover:text-amber/60 transition-colors mb-1">{usp.title}</h4>
                <p className="text-[12px] text-foreground/25 font-light leading-relaxed max-w-xl">{usp.desc}</p>
              </div>
              <span className="font-mono text-[9px] text-foreground/10 group-hover:text-amber/30 transition-colors shrink-0 mt-1">&rarr;</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Audience */}
      <div className="mb-20">
        <h3 className="font-mono text-[10px] text-foreground/20 tracking-[0.2em] mb-8">TARGET AUDIENCE</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { tier: "PRIMARY", age: "18–35", desc: "Players of Ready or Not, GTFO, Escape from Tarkov, Resident Evil, Silent Hill who want tactical gunplay with horror tension." },
            { tier: "SECONDARY", age: "16–30", desc: "The liminal space / Backrooms community — fans of Kane Pixels, analog horror, liminal space photography." },
            { tier: "TERTIARY", age: "18–40", desc: "Co-op horror enthusiasts (Phasmophobia, Left 4 Dead 2, Deep Rock Galactic) who want shared experiences that still unsettle." },
          ].map((a) => (
            <div key={a.tier}>
              <div className="flex items-baseline gap-3 mb-2">
                <span className="font-mono text-[9px] text-amber/40 tracking-[0.2em]">{a.tier}</span>
                <span className="font-mono text-[9px] text-foreground/10">AGE {a.age}</span>
              </div>
              <p className="text-[13px] text-foreground/30 font-light leading-relaxed">{a.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Risk Assessment */}
      <div className="mb-20">
        <h3 className="font-mono text-[10px] text-foreground/20 tracking-[0.2em] mb-8">RISK ASSESSMENT</h3>
        <div className="space-y-4">
          {[
            { risk: "UE5 procedural generation too demanding", prob: "MEDIUM", mitigation: "Early prototype validation" },
            { risk: "Co-op netcode for horror atmosphere", prob: "MEDIUM", mitigation: "Dedicated servers from Day 1" },
            { risk: "\"Not scary enough\" feedback", prob: "MEDIUM", mitigation: "Monthly external horror testing" },
            { risk: "Backrooms IP/community friction", prob: "LOW", mitigation: "Original lore, no direct IP use" },
          ].map((r, i) => (
            <div key={i} className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6 py-3 border-b border-foreground/[0.04]">
              <span className="text-[13px] text-foreground/40 flex-1">{r.risk}</span>
              <span className={`font-mono text-[9px] tracking-[0.15em] ${
                r.prob === "HIGH" ? "text-tactical-red/60" :
                r.prob === "MEDIUM" ? "text-amber/40" :
                "text-foreground/15"
              }`}>
                {r.prob}
              </span>
              <span className="text-[12px] text-foreground/20 font-light">{r.mitigation}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Inspirations */}
      <div className="mb-8">
        <h3 className="font-mono text-[10px] text-foreground/20 tracking-[0.2em] mb-6">REFERENCE WORKS</h3>
        <div className="flex flex-wrap gap-x-4 gap-y-2">
          {["Aliens (1986)", "Event Horizon (1997)", "Annihilation (2018)", "SCP Foundation", "Kane Pixels", "GTFO", "Resident Evil 7", "Control", "STALKER", "The Magnus Archives"].map((ref) => (
            <span key={ref} className="text-[12px] text-foreground/20 font-light hover:text-amber/40 transition-colors cursor-default">
              {ref}
            </span>
          ))}
        </div>
      </div>

      {/* Cross-links */}
      <div className="mt-16 pt-8 border-t border-foreground/[0.06]">
        <div className="flex flex-wrap gap-6">
          <Link href="/characters" className="font-mono text-[10px] text-foreground/15 hover:text-amber/50 transition-colors tracking-wider">
            MEET THE SQUAD &rarr;
          </Link>
          <Link href="/levels" className="font-mono text-[10px] text-foreground/15 hover:text-amber/50 transition-colors tracking-wider">
            EXPLORE THE LEVELS &rarr;
          </Link>
          <Link href="/lore" className="font-mono text-[10px] text-foreground/15 hover:text-amber/50 transition-colors tracking-wider">
            READ THE LORE &rarr;
          </Link>
          <Link href="/gameplay" className="font-mono text-[10px] text-foreground/15 hover:text-amber/50 transition-colors tracking-wider">
            GAMEPLAY SYSTEMS &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}
