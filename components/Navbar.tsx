"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { Plane } from "lucide-react";

const links = [
  { href: "/", label: "Home", emoji: "🏠" },
  { href: "/memories", label: "Memories", emoji: "📸" },
  { href: "/upload", label: "Add a Memory", emoji: "✨" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b-2 border-dashed border-kraft bg-paper/80 backdrop-blur-md">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2 font-display text-lg italic text-ink group">
          <motion.span
            className="grid h-9 w-9 place-items-center rounded-full border-2 border-ink bg-mustard text-ink"
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          >
            <Plane size={16} />
          </motion.span>
          <span className="hidden sm:inline">Wish You Were Here</span>
          <span className="sm:hidden">WYAH</span>
        </Link>
        <div className="flex items-center gap-1 sm:gap-2">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "relative rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-paper-dark",
                pathname === link.href ? "text-rose" : "text-ink-soft"
              )}
            >
              <span className="mr-1 hidden sm:inline">{link.emoji}</span>
              {link.label}
              {/* Active link squiggly underline */}
              {pathname === link.href && (
                <motion.span
                  className="absolute bottom-0 left-2 right-2 h-[3px] rounded-full bg-rose"
                  layoutId="nav-underline"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
