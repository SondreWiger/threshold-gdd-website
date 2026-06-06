"use client";

import { ReactNode } from "react";

interface DataCardProps {
  label: string;
  value: string | number;
  sub?: string;
  icon?: ReactNode;
}

export default function DataCard({ label, value, sub }: DataCardProps) {
  return (
    <div className="py-4">
      <span className="font-mono text-[9px] text-foreground/20 tracking-[0.2em] block mb-2">
        {label}
      </span>
      <div className="text-2xl md:text-3xl font-light text-foreground/80 tabular-nums">
        {value}
      </div>
      {sub && (
        <p className="mt-1 font-mono text-[10px] text-foreground/15 tracking-wider">{sub}</p>
      )}
    </div>
  );
}
