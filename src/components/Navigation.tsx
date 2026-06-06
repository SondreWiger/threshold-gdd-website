"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronRight } from "lucide-react";

const navItems = [
  { href: "/", label: "HOME", code: "00" },
  { href: "/overview", label: "OVERVIEW", code: "01" },
  { href: "/characters", label: "CHARACTERS", code: "02" },
  { href: "/levels", label: "LEVELS", code: "03" },
  { href: "/gameplay", label: "GAMEPLAY", code: "04" },
  { href: "/lore", label: "LORE & ENTITIES", code: "05" },
  { href: "/technical", label: "TECHNICAL", code: "06" },
  { href: "/timeline", label: "TIMELINE", code: "07" },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      {/* Top bar */}
      <header className="fixed top-0 left-0 right-0 z-50 h-12 bg-background/90 backdrop-blur-md border-b border-amber/20">
        <div className="flex items-center justify-between h-full px-4 md:px-8">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-2 h-2 bg-amber rounded-full animate-pulse-amber" />
            <span className="font-mono text-xs tracking-[0.3em] text-amber-dim group-hover:text-amber transition-colors">
              THRESHOLD
            </span>
            <span className="hidden sm:inline font-mono text-[10px] text-steel-light tracking-wider">
              // GDD v1.0
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`px-3 py-1.5 font-mono text-[10px] tracking-[0.2em] transition-all duration-200 ${
                  pathname === item.href
                    ? "text-amber bg-amber/10 border border-amber/30"
                    : "text-steel-light hover:text-amber-dim hover:bg-steel-dark/50"
                }`}
              >
                <span className="text-amber-dim/50 mr-1">{item.code}</span>
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Mobile toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-amber-dim hover:text-amber transition-colors p-1"
          >
            {isOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </header>

      {/* Mobile nav */}
      {isOpen && (
        <div className="fixed inset-0 z-40 bg-background/95 backdrop-blur-md md:hidden">
          <div className="pt-20 px-6">
            <nav className="flex flex-col gap-1">
              {navItems.map((item, i) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 font-mono text-xs tracking-[0.2em] transition-all duration-200 border-l-2 ${
                    pathname === item.href
                      ? "text-amber border-amber bg-amber/5"
                      : "text-steel-light border-transparent hover:text-amber-dim hover:border-amber-dim/30 hover:bg-steel-dark/30"
                  }`}
                  style={{ animationDelay: `${i * 50}ms` }}
                >
                  <span className="text-amber-dim/40 text-[10px]">[{item.code}]</span>
                  {item.label}
                  <ChevronRight size={12} className="ml-auto opacity-30" />
                </Link>
              ))}
            </nav>
            <div className="mt-8 pt-6 border-t border-steel-dark">
              <p className="font-mono text-[10px] text-steel-light/50 tracking-wider">
                NORTHEM DEVELOPMENTS // CLASSIFIED
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Spacer */}
      <div className="h-12" />
    </>
  );
}
