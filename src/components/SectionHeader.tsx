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
    <div className="mb-16 md:mb-24">
      <span className="font-mono text-[10px] text-foreground/15 tracking-[0.3em] block mb-8">
        {code}
      </span>
      <h2 className="text-3xl md:text-5xl lg:text-6xl font-light tracking-tight text-foreground/90 mb-4">
        {title}
      </h2>
      {subtitle && (
        <p className="font-mono text-sm text-foreground/25 tracking-wide max-w-2xl leading-relaxed">
          {subtitle}
        </p>
      )}
      {children}
    </div>
  );
}
