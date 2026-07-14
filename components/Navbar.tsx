"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Plane } from "lucide-react";

const links = [
  { href: "/", label: "Home" },
  { href: "/memories", label: "Memories" },
  { href: "/upload", label: "Add a Memory" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b-2 border-dashed border-kraft bg-paper/90 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2 font-display text-lg italic text-ink">
          <span className="grid h-9 w-9 place-items-center rounded-full border-2 border-ink bg-mustard text-ink">
            <Plane size={16} />
          </span>
          Wish You Were Here
        </Link>
        <div className="flex items-center gap-1 sm:gap-2">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-paper-dark",
                pathname === link.href ? "text-rose" : "text-ink-soft"
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
