"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const stats = [
  { label: "LEVELS", value: "5" },
  { label: "CHARACTERS", value: "5" },
  { label: "ENTITIES", value: "200+" },
  { label: "DIALOGUE", value: "2.4K" },
  { label: "EXTRACTION", value: "3.7%" },
  { label: "RUNTIME", value: "72H" },
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
      {/* Section tag */}
      <span className="font-mono text-[10px] text-foreground/15 tracking-[0.3em] block mb-12">
        00 / HOME
      </span>

      {/* Title */}
      <div className="mb-8">
        <h1 className="text-6xl md:text-8xl lg:text-[10rem] font-light tracking-tighter text-foreground/90 leading-[0.85]">
          THRESH
          <span className="text-amber/70">OLD</span>
        </h1>
      </div>

      {/* Tagline */}
      <div className="mb-16 max-w-xl">
        <p className="text-base md:text-lg text-foreground/25 font-light leading-relaxed">
          &quot;{typedText}
          <span className="cursor-blink text-foreground/40">|</span>&quot;
        </p>
      </div>

      {/* Stats — clean horizontal */}
      <div className="flex flex-wrap gap-x-10 gap-y-4 mb-16">
        {stats.map((stat) => (
          <div key={stat.label}>
            <span className="font-mono text-[9px] text-foreground/15 tracking-[0.2em] block mb-1">
              {stat.label}
            </span>
            <span className="text-xl font-light text-foreground/60 tabular-nums">
              {stat.value}
            </span>
          </div>
        ))}
      </div>

      {/* Feature lines */}
      <div className="mb-16 max-w-2xl space-y-3">
        {[
          "Tonal shift — the only tactical shooter that becomes survival-horror while you play it.",
          "Adaptive squad AI — teammates develop stress responses and can psychologically break.",
          "Reality-bending environments — corridors stretch, rooms rearrange, distance becomes meaningless.",
          "Co-op horror — communication degrades as equipment fails, creating real isolation.",
        ].map((f, i) => (
          <p key={i} className="text-[13px] text-foreground/20 font-light leading-relaxed">
            {f}
          </p>
        ))}
      </div>

      {/* CTA */}
      <div className="flex flex-wrap gap-6">
        <Link
          href="/overview"
          className="font-mono text-[11px] tracking-[0.15em] text-foreground/40 hover:text-foreground/70 transition-colors duration-300"
        >
          ENTER BRIEFING &rarr;
        </Link>
        <Link
          href="/characters"
          className="font-mono text-[11px] tracking-[0.15em] text-foreground/20 hover:text-foreground/40 transition-colors duration-300"
        >
          MEET THE SQUAD
        </Link>
      </div>

      {/* Bottom meta */}
      <div className="mt-auto pt-24 pb-8 font-mono text-[9px] text-foreground/10 tracking-[0.15em] flex gap-6">
        <span>NORTHEM DEVELOPMENTS</span>
        <span>UE5</span>
        <span>SEPT 2027</span>
        <span>$49.99</span>
      </div>
    </div>
  );
}
