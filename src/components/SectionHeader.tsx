"use client";

import { ReactNode } from "react";

interface SectionHeaderProps {
  code: string;
  title: string;
  subtitle?: string;
  children?: ReactNode;
}

export default function SectionHeader({ code, title, subtitle, children }: SectionHeaderProps) {
  return (
    <div className="mb-12 md:mb-16">
      <div className="flex items-center gap-3 mb-4">
        <span className="font-mono text-[10px] text-amber-dim/60 tracking-[0.3em]">SECTION {code}</span>
        <div className="flex-1 h-px bg-amber/10" />
        <div className="w-1.5 h-1.5 bg-amber/40 rotate-45" />
      </div>
      <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground mb-3">
        {title}
      </h2>
      {subtitle && (
        <p className="font-mono text-sm text-steel-light tracking-wide max-w-2xl">
          {subtitle}
        </p>
      )}
      {children}
    </div>
  );
}
