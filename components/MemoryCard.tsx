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

/* ─── Washi tape decoration config ─── */
const TAPE_POSITIONS = [
  { className: "washi-tape washi-tape-1", style: { top: "-10px", left: "10%", transform: "rotate(-15deg)" } },
  { className: "washi-tape washi-tape-2", style: { top: "-8px", right: "8%", transform: "rotate(12deg)" } },
  { className: "washi-tape washi-tape-3", style: { top: "-10px", left: "20%", transform: "rotate(-8deg)" } },
  { className: "washi-tape washi-tape-4", style: { top: "-8px", right: "15%", transform: "rotate(18deg)" } },
];

/* ─── Pin decoration config ─── */
const PIN_POSITIONS = [
  { style: { top: "-5px", left: "50%", marginLeft: "-6px" } },
  { style: { top: "-5px", right: "20px" } },
  { style: { top: "-5px", left: "20px" } },
];

export default function MemoryCard({ memory, index }: { memory: Memory; index: number }) {
  // Alternate a gentle tilt so the grid feels like scattered postcards, not a rigid table
  const tilt = index % 3 === 0 ? "-rotate-2" : index % 3 === 1 ? "rotate-1" : "-rotate-1";

  // Pick a washi tape decoration based on card index
  const tape = TAPE_POSITIONS[index % TAPE_POSITIONS.length];
  // Alternate between tape and pin decorations
  const usePin = index % 5 === 0;
  const pin = PIN_POSITIONS[index % PIN_POSITIONS.length];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.3, rotate: -8 }}
      whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 0.5,
        ease: [0.68, -0.55, 0.27, 1.55],
        delay: (index % 6) * 0.08,
      }}
      whileHover={{
        y: -8,
        rotate: 0,
        scale: 1.04,
        transition: { duration: 0.3 },
      }}
      className={`postcard-tilt group relative rounded-lg border border-kraft bg-card p-3 shadow-postcard ${tilt}`}
    >
      {/* Washi tape or pin decoration */}
      {usePin ? (
        <div className="pin-dot" style={pin.style} />
      ) : (
        <div className={tape.className} style={tape.style} />
      )}

      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-md bg-paper-dark">
        <Image
          src={memory.imageUrl}
          alt={memory.title}
          fill
          sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 30vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Category badge — funky redesigned */}
        {memory.category === "us" ? (
          <motion.span
            className="absolute right-2 top-2 flex items-center gap-1 rounded-full bg-gradient-to-r from-rose to-[#ff8fab] px-3 py-1 font-hand text-sm text-white shadow-lg"
            animate={{ scale: [1, 1.08, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <motion.span
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 1.4, repeat: Infinity }}
            >
              ❤️‍🔥
            </motion.span>
            Us
          </motion.span>
        ) : (
          <span className="absolute right-2 top-2 flex items-center gap-1 rounded-full bg-gradient-to-r from-sky to-[#87ceeb] px-3 py-1 font-hand text-sm text-white shadow-lg">
            <motion.span
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              className="inline-block"
            >
              🧭
            </motion.span>
            Solo Explorer
          </span>
        )}
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

      {/* Decorative corner star sticker on every 4th card */}
      {index % 4 === 0 && (
        <motion.span
          className="absolute -bottom-2 -left-2 text-xl pointer-events-none select-none"
          animate={{ rotate: [0, 15, -15, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          ⭐
        </motion.span>
      )}

      {/* Heart sticker on every 3rd card */}
      {index % 3 === 1 && (
        <motion.span
          className="absolute -bottom-1 -right-1 text-lg pointer-events-none select-none"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1.4, repeat: Infinity }}
        >
          💖
        </motion.span>
      )}
    </motion.div>
  );
}
