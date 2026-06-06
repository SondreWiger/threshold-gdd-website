"use client";

import { ReactNode } from "react";

interface DataCardProps {
  label: string;
  value: string | number;
  sub?: string;
  icon?: ReactNode;
  color?: "amber" | "green" | "red" | "blue";
}

const colorMap = {
  amber: "border-amber/20 text-amber",
  green: "border-tactical-green/20 text-tactical-green",
  red: "border-tactical-red/20 text-tactical-red",
  blue: "border-info/20 text-info",
};

export default function DataCard({ label, value, sub, icon, color = "amber" }: DataCardProps) {
  return (
    <div className={`bg-steel-dark/50 border ${colorMap[color]} p-4 corner-brackets card-hover`}>
      <div className="flex items-start justify-between mb-2">
        <span className="data-label">{label}</span>
        {icon && <span className="opacity-50">{icon}</span>}
      </div>
      <div className={`text-2xl md:text-3xl font-bold font-mono ${colorMap[color].split(" ")[1]}`}>
        {value}
      </div>
      {sub && (
        <p className="mt-1 font-mono text-[10px] text-steel-light/60 tracking-wider">{sub}</p>
      )}
    </div>
  );
}
