"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const stats = [
  { label: "LEVELS", value: "5", sub: "Distinct environments" },
  { label: "CHARACTERS", value: "5", sub: "Fireteam THRESHOLD" },
  { label: "ENTITIES", value: "200+", sub: "Documented types" },
  { label: "DIALOGUE", value: "2.4K", sub: "Scripted lines" },
  { label: "EXTRACTION", value: "3.7%", sub: "Historical average" },
  { label: "RUNTIME", value: "72H", sub: "In-game timeline" },
];

const features = [
  {
    title: "Tonal Shift",
    desc: "The only tactical shooter that becomes survival-horror while you play it.",
    href: "/gameplay",
  },
  {
    title: "Adaptive Squad AI",
    desc: "Teammates develop stress responses and can psychologically break.",
    href: "/characters",
  },
  {
    title: "Reality-Bending",
    desc: "Corridors stretch, rooms rearrange, distance becomes meaningless.",
    href: "/levels",
  },
  {
    title: "Co-op Horror",
    desc: "Communication degrades as equipment fails, creating real isolation.",
    href: "/gameplay",
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
    <div className="min-h-[calc(100vh-48px)] flex flex-col justify-center px-6 md:px-12 lg:px-24">
      <span className="font-mono text-[10px] text-foreground/55 tracking-[0.3em] block mb-12">
        00 / HOME
      </span>

      <div className="mb-8">
        <h1 className="text-6xl md:text-8xl lg:text-[10rem] font-light tracking-tighter text-foreground/95 leading-[0.85]">
          THRESH<span className="text-amber/85">OLD</span>
        </h1>
      </div>

      <div className="mb-16 max-w-xl">
        <p className="text-base md:text-lg text-foreground/75 font-light leading-relaxed">
          &quot;{typedText}
          <span className="cursor-blink text-foreground/65">|</span>&quot;
        </p>
      </div>

      {/* Stats with visual bars */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-16">
        {stats.map((stat) => (
          <div key={stat.label}>
            <span className="font-mono text-[9px] text-foreground/55 tracking-[0.2em] block mb-1">
              {stat.label}
            </span>
            <span className="text-2xl font-light text-foreground/95 tabular-nums block">
              {stat.value}
            </span>
            <span className="font-mono text-[9px] text-foreground/75">{stat.sub}</span>
            <div className="mt-2 h-[2px] bg-foreground/[0.08] overflow-hidden">
              <div
                className="h-full bg-amber/40"
                style={{ width: `${Math.min(parseInt(stat.value) || 50, 100)}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Feature cards with links */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        {features.map((f, i) => (
          <Link
            key={i}
            href={f.href}
            className="group py-4 border-t border-foreground/[0.12] hover:border-amber/20 transition-colors duration-300"
          >
            <h3 className="text-[13px] font-medium text-foreground/85 group-hover:text-amber/85 transition-colors mb-1">
              {f.title}
            </h3>
            <p className="text-[12px] text-foreground/65 font-light leading-relaxed">
              {f.desc}
            </p>
            <span className="font-mono text-[9px] text-foreground/75 group-hover:text-amber/45 transition-colors mt-2 inline-block">
              EXPLORE &rarr;
            </span>
          </Link>
        ))}
      </div>

      {/* CTA */}
      <div className="flex flex-wrap gap-6 mb-8">
        <Link
          href="/overview"
          className="font-mono text-[11px] tracking-[0.15em] text-foreground/65 hover:text-amber/75 transition-colors duration-300"
        >
          ENTER BRIEFING &rarr;
        </Link>
        <Link
          href="/characters"
          className="font-mono text-[11px] tracking-[0.15em] text-foreground/65 hover:text-foreground/65 transition-colors duration-300"
        >
          MEET THE SQUAD &rarr;
        </Link>
        <Link
          href="/journey"
          className="font-mono text-[11px] tracking-[0.15em] text-foreground/65 hover:text-foreground/65 transition-colors duration-300"
        >
          DEV JOURNEY &rarr;
        </Link>
      </div>

      <div className="mt-auto pt-24 pb-8 font-mono text-[9px] text-foreground/75 tracking-[0.15em] flex gap-6">
        <span>NORTHEM DEVELOPMENTS</span>
        <span>UE5</span>
        <span>SEPT 2027</span>
        <span>$49.99</span>
      </div>
    </div>
  );
}
