"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronRight, Shield, Skull, Eye, Radio } from "lucide-react";

const stats = [
  { label: "LEVELS", value: "5", sub: "Distinct environments" },
  { label: "CHARACTERS", value: "5", sub: "Fireteam THRESHOLD" },
  { label: "ENTITIES", value: "200+", sub: "Documented types" },
  { label: "DIALOGUE", value: "2.4K", sub: "Scripted lines" },
  { label: "EXTRACTION RATE", value: "3.7%", sub: "Historical average" },
  { label: "RUNTIME", value: "72H", sub: "In-game timeline" },
];

const features = [
  {
    icon: <Shield size={20} />,
    title: "Tonal Shift",
    desc: "The only tactical shooter that becomes a survival-horror game while you are playing it.",
  },
  {
    icon: <Skull size={20} />,
    title: "Adaptive Squad AI",
    desc: "Teammates learn from your tactics, develop stress responses, and can psychologically break.",
  },
  {
    icon: <Eye size={20} />,
    title: "Reality-Bending",
    desc: "Corridors stretch, rooms rearrange, and distance becomes meaningless.",
  },
  {
    icon: <Radio size={20} />,
    title: "Co-op Horror",
    desc: "Communication degrades as equipment fails, creating real isolation between players.",
  },
];

export default function Hero() {
  const [typedText, setTypedText] = useState("");
  const fullText = "We thought we were the hunters. The Backrooms corrected us.";

  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      if (i <= fullText.length) {
        setTypedText(fullText.slice(0, i));
        i++;
      } else {
        clearInterval(timer);
      }
    }, 40);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative min-h-[calc(100vh-48px)]">
      {/* Scan line effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-px bg-amber/20 animate-scan" />
      </div>

      {/* Hero content */}
      <div className="relative z-10 flex flex-col justify-center min-h-[calc(100vh-48px)] px-6 md:px-16 lg:px-24">
        {/* Classification header */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber/5 border border-amber/20">
            <div className="w-1.5 h-1.5 bg-amber rounded-full animate-pulse-amber" />
            <span className="font-mono text-[10px] text-amber-dim tracking-[0.3em]">
              CLASSIFIED // EYES ONLY
            </span>
          </div>
        </div>

        {/* Title */}
        <div className="mb-6">
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter text-foreground leading-none mb-2">
            THRESH
            <span className="text-amber glow-text">OLD</span>
          </h1>
          <div className="flex items-center gap-4 mt-4">
            <div className="h-px flex-1 max-w-[120px] bg-amber/30" />
            <span className="font-mono text-[10px] text-steel-light tracking-[0.4em]">
              GAME DESIGN DOCUMENT
            </span>
          </div>
        </div>

        {/* Tagline */}
        <div className="mb-12 max-w-xl">
          <p className="font-mono text-sm md:text-base text-amber-dim/80 leading-relaxed">
            &quot;{typedText}<span className="cursor-blink text-amber">|</span>&quot;
          </p>
        </div>

        {/* Quick stats */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-12">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-steel-dark/30 border border-steel-light/10 p-3 corner-brackets">
              <span className="data-label block mb-1">{stat.label}</span>
              <span className="text-xl font-bold font-mono text-amber">{stat.value}</span>
              <p className="font-mono text-[9px] text-steel-light/50 mt-0.5">{stat.sub}</p>
            </div>
          ))}
        </div>

        {/* Feature cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {features.map((f, i) => (
            <div key={i} className="bg-steel-dark/20 border border-steel-light/10 p-4 card-hover group">
              <div className="text-amber-dim group-hover:text-amber transition-colors mb-3">
                {f.icon}
              </div>
              <h3 className="font-mono text-xs tracking-wider text-foreground mb-1">{f.title}</h3>
              <p className="text-xs text-steel-light/70 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="flex flex-wrap gap-3">
          <Link
            href="/overview"
            className="inline-flex items-center gap-2 px-6 py-3 bg-amber/10 border border-amber/30 text-amber font-mono text-xs tracking-wider hover:bg-amber/20 transition-all group"
          >
            ENTER BRIEFING
            <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="/characters"
            className="inline-flex items-center gap-2 px-6 py-3 border border-steel-light/20 text-steel-light font-mono text-xs tracking-wider hover:border-amber-dim/30 hover:text-amber-dim transition-all"
          >
            MEET THE SQUAD
          </Link>
        </div>

        {/* Bottom meta */}
        <div className="absolute bottom-8 left-6 md:left-16 font-mono text-[9px] text-steel-light/30 tracking-wider">
          <span>NORTHEM DEVELOPMENTS</span>
          <span className="mx-2">|</span>
          <span>UNREAL ENGINE 5</span>
          <span className="mx-2">|</span>
          <span>SEPT 2027</span>
          <span className="mx-2">|</span>
          <span>$49.99 USD</span>
        </div>
      </div>
    </div>
  );
}
