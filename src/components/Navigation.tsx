"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

const navItems = [
  { href: "/", label: "Home", code: "00" },
  { href: "/overview", label: "Overview", code: "01" },
  { href: "/characters", label: "Characters", code: "02" },
  { href: "/levels", label: "Levels", code: "03" },
  { href: "/gameplay", label: "Gameplay", code: "04" },
  { href: "/lore", label: "Lore", code: "05" },
  { href: "/technical", label: "Technical", code: "06" },
  { href: "/timeline", label: "Timeline", code: "07" },
  { href: "/maps", label: "Maps", code: "08" },
  { href: "/journey", label: "Journey", code: "09" },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      {/* Top bar — clean, minimal */}
      <header className="fixed top-0 left-0 right-0 z-50 h-12 bg-background/80 backdrop-blur-xl">
        <div className="flex items-center justify-between h-full px-6 md:px-12">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <span className="font-mono text-[11px] tracking-[0.25em] text-foreground/85 group-hover:text-amber transition-colors duration-300">
              THRESHOLD
            </span>
          </Link>

          {/* Desktop nav — pill style */}
          <nav className="hidden md:flex items-center gap-0.5">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3 py-1.5 font-mono text-[10px] tracking-[0.12em] transition-all duration-300 rounded-full ${
                    isActive
                      ? "text-amber bg-amber/8"
                      : "text-foreground/55 hover:text-foreground/85"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Mobile toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-foreground/65 hover:text-foreground/95 transition-colors p-1"
          >
            {isOpen ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>

        {/* Subtle bottom line */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-foreground/[0.08]" />
      </header>

      {/* Mobile nav — full screen, minimal */}
      {isOpen && (
        <div className="fixed inset-0 z-40 bg-background/98 backdrop-blur-2xl md:hidden">
          <div className="flex flex-col justify-center h-full px-10">
            <nav className="flex flex-col gap-1">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center gap-4 py-3 font-mono text-sm tracking-wide transition-all duration-300 ${
                      isActive
                        ? "text-amber"
                        : "text-foreground/75 hover:text-foreground/75"
                    }`}
                  >
                    <span className="text-[10px] text-foreground/55 w-5">{item.code}</span>
                    {item.label}
                  </Link>
                );
              })}
            </nav>
            <div className="mt-12">
              <p className="font-mono text-[9px] text-foreground/55 tracking-[0.2em]">
                NORTHEM DEVELOPMENTS
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
