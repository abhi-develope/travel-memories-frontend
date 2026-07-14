"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { MapPin, CalendarDays } from "lucide-react";
import type { Memory } from "@/types/memory";

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function MemoryCard({ memory, index }: { memory: Memory; index: number }) {
  // Alternate a gentle tilt so the grid feels like scattered postcards, not a rigid table
  const tilt = index % 3 === 0 ? "-rotate-2" : index % 3 === 1 ? "rotate-1" : "-rotate-1";

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`postcard-tilt group relative rounded-lg border border-kraft bg-card p-3 shadow-postcard ${tilt}`}
    >
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-md bg-paper-dark">
        <Image
          src={memory.imageUrl}
          alt={memory.title}
          fill
          sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 30vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute right-2 top-2 rounded-full border-2 border-ink/70 bg-paper/90 px-2 py-0.5 font-hand text-sm text-ink">
          {memory.category === "us" ? "us ✨" : "her trip 🌍"}
        </span>
      </div>
      <div className="px-1 pb-1 pt-3">
        <h3 className="font-display text-lg text-ink">{memory.title}</h3>
        {memory.caption && (
          <p className="mt-1 line-clamp-2 font-hand text-lg leading-snug text-ink-soft">
            {memory.caption}
          </p>
        )}
        <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-ink-soft">
          {memory.location && (
            <span className="flex items-center gap-1">
              <MapPin size={12} /> {memory.location}
            </span>
          )}
          <span className="flex items-center gap-1">
            <CalendarDays size={12} /> {formatDate(memory.date)}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
