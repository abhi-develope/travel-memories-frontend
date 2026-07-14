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

/* ─── Card style variations ─── */
const CARD_STYLES = [
  // Polaroid style
  "rounded-sm bg-white p-2 pb-12 shadow-[4px_6px_16px_rgba(0,0,0,0.15)]",
  // Postcard style
  "rounded-lg border-2 border-dashed border-kraft bg-card p-3 shadow-postcard",
  // Soft rounded
  "rounded-2xl bg-card p-3 shadow-postcard border border-kraft/50",
  // Stamp style
  "rounded-md bg-white p-2 shadow-stamp stamp-border",
  // Notebook torn-page
  "rounded-lg bg-[#fffef5] p-3 shadow-postcard border-l-4 border-rose/40",
];

/* ─── Tilt rotation variety ─── */
const TILTS = [
  "-rotate-3", "rotate-2", "-rotate-1", "rotate-3",
  "-rotate-2", "rotate-1", "rotate-0", "-rotate-[1.5deg]",
  "rotate-[2.5deg]", "-rotate-[0.5deg]",
];

/* ─── Washi tape decoration config ─── */
const TAPE_DECORATIONS = [
  { className: "washi-tape washi-tape-1", style: { top: "-10px", left: "10%", transform: "rotate(-15deg)", width: "70px" } },
  { className: "washi-tape washi-tape-2", style: { top: "-8px", right: "8%", transform: "rotate(12deg)", width: "75px" } },
  { className: "washi-tape washi-tape-3", style: { top: "-10px", left: "25%", transform: "rotate(-6deg)", width: "85px" } },
  { className: "washi-tape washi-tape-4", style: { top: "-8px", right: "20%", transform: "rotate(16deg)", width: "65px" } },
  // Double tape — two strips
  { className: "washi-tape washi-tape-1", style: { top: "-8px", left: "5%", transform: "rotate(-20deg)", width: "60px" } },
  { className: "washi-tape washi-tape-3", style: { top: "-6px", right: "5%", transform: "rotate(10deg)", width: "60px" } },
];

/* ─── Pin decoration config ─── */
const PIN_STYLES = [
  { bg: "from-[#ff6b6b] to-[#c0392b]", style: { top: "-6px", left: "50%", marginLeft: "-7px" } },
  { bg: "from-[#ffd700] to-[#f0a500]", style: { top: "-6px", right: "18px" } },
  { bg: "from-[#6FA6B8] to-[#4a90a4]", style: { top: "-6px", left: "18px" } },
  { bg: "from-[#a78bfa] to-[#7c3aed]", style: { top: "-6px", left: "35%" } },
];

/* ─── Stickers that appear on cards ─── */
const CORNER_STICKERS = [
  { emoji: "⭐", pos: "-bottom-2 -left-2" },
  { emoji: "💖", pos: "-bottom-1 -right-1" },
  { emoji: "🌸", pos: "-bottom-2 -right-2" },
  { emoji: "🦋", pos: "-bottom-1 -left-1" },
  { emoji: "✨", pos: "-top-2 -right-2" },
  { emoji: "🌈", pos: "-bottom-2 left-1/2 -translate-x-1/2" },
  { emoji: "🐚", pos: "-bottom-1 -right-2" },
  { emoji: "🌺", pos: "-bottom-2 -left-1" },
  { emoji: "☀️", pos: "-top-2 -left-2" },
  { emoji: "💫", pos: "-bottom-1 -right-1" },
  { emoji: "🎀", pos: "-top-1 -right-1" },
  { emoji: "🍦", pos: "-bottom-2 -right-2" },
];

/* ─── Fun hover messages ─── */
const HOVER_MSGS = [
  "what a vibe! 🤙", "i LOVE this one 😍", "core memory 🧠✨",
  "so aesthetic!! 🌿", "frame-worthy 🖼️", "need this on a postcard 💌",
  "obsessed 💅", "this >> everything", "main character energy 👑",
  "crying this is so good 😭", "wallpaper material 📱", "10/10 no notes 💯",
];

/* ─── Doodle stamps overlayed on some cards ─── */
const STAMP_MARKS = [
  { text: "✓ APPROVED", color: "text-sky", rotate: "-rotate-12" },
  { text: "★ FAVORITE", color: "text-rose", rotate: "rotate-6" },
  { text: "♡ LOVE IT", color: "text-rose", rotate: "-rotate-6" },
  { text: "✈ WANDERLUST", color: "text-ink-soft", rotate: "rotate-12" },
  { text: "☆ BEST DAY", color: "text-mustard", rotate: "-rotate-3" },
];

/* ─── Seeded pseudo-random from index (deterministic per card) ─── */
function seeded(index: number, offset: number = 0): number {
  const x = Math.sin((index + 1) * 9301 + offset * 4297) * 49297;
  return x - Math.floor(x);
}

export default function MemoryCard({ memory, index }: { memory: Memory; index: number }) {
  const tilt = TILTS[index % TILTS.length];
  const cardStyle = CARD_STYLES[index % CARD_STYLES.length];
  const isPolaroid = index % CARD_STYLES.length === 0;

  // Decorations — deterministic per card
  const tapeIdx = Math.floor(seeded(index, 1) * TAPE_DECORATIONS.length);
  const tape = TAPE_DECORATIONS[tapeIdx];
  const pinIdx = Math.floor(seeded(index, 2) * PIN_STYLES.length);
  const pin = PIN_STYLES[pinIdx];

  // Decide decoration type: tape (60%), pin (25%), double tape (15%)
  const decoRoll = seeded(index, 3);
  const decoType = decoRoll < 0.6 ? "tape" : decoRoll < 0.85 ? "pin" : "double";
  const tape2 = TAPE_DECORATIONS[(tapeIdx + 3) % TAPE_DECORATIONS.length];

  // Sticker selection — each card gets 1-2 stickers
  const sticker1 = CORNER_STICKERS[index % CORNER_STICKERS.length];
  const sticker2 = CORNER_STICKERS[(index * 7 + 3) % CORNER_STICKERS.length];
  const showSticker2 = seeded(index, 4) > 0.55;

  // Stamp mark on ~25% of cards
  const showStamp = seeded(index, 5) < 0.25;
  const stamp = STAMP_MARKS[index % STAMP_MARKS.length];

  // Hover message
  const hoverMsg = HOVER_MSGS[index % HOVER_MSGS.length];

  // Entry animation variation
  const entryVariants = [
    { initial: { opacity: 0, scale: 0.3, rotate: -12 }, inView: { opacity: 1, scale: 1, rotate: 0 } },
    { initial: { opacity: 0, x: -60, rotate: 5 }, inView: { opacity: 1, x: 0, rotate: 0 } },
    { initial: { opacity: 0, x: 60, rotate: -5 }, inView: { opacity: 1, x: 0, rotate: 0 } },
    { initial: { opacity: 0, y: 40, scale: 0.8 }, inView: { opacity: 1, y: 0, scale: 1 } },
    { initial: { opacity: 0, scale: 0.5, rotate: 8 }, inView: { opacity: 1, scale: 1, rotate: 0 } },
  ];
  const entry = entryVariants[index % entryVariants.length];

  return (
    <motion.div
      initial={entry.initial}
      whileInView={entry.inView}
      viewport={{ once: true, margin: "-30px" }}
      transition={{
        duration: 0.55,
        ease: [0.68, -0.55, 0.27, 1.55],
        delay: (index % 6) * 0.07,
      }}
      whileHover={{
        y: -10,
        rotate: 0,
        scale: 1.05,
        transition: { duration: 0.3 },
      }}
      className={`group relative ${tilt} ${cardStyle}`}
      style={{ transformOrigin: "center center" }}
    >
      {/* ─── Decorations ─── */}
      {decoType === "tape" && (
        <div className={tape.className} style={tape.style} />
      )}
      {decoType === "pin" && (
        <div
          className="absolute z-10 pointer-events-none"
          style={pin.style}
        >
          <div className={`w-[14px] h-[14px] rounded-full bg-gradient-to-br ${pin.bg} shadow-[0_2px_4px_rgba(0,0,0,0.3),inset_0_1px_2px_rgba(255,255,255,0.4)]`} />
        </div>
      )}
      {decoType === "double" && (
        <>
          <div className={tape.className} style={tape.style} />
          <div className={tape2.className} style={tape2.style} />
        </>
      )}

      {/* ─── Image ─── */}
      <div className={`relative w-full overflow-hidden bg-paper-dark ${isPolaroid ? "aspect-square rounded-sm" : "aspect-[4/5] rounded-md"}`}>
        <Image
          src={memory.imageUrl}
          alt={memory.title}
          fill
          sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 30vw"
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />

        {/* Category badge */}
        {memory.category === "us" ? (
          <motion.span
            className="absolute right-2 top-2 flex items-center gap-1 rounded-full bg-gradient-to-r from-rose to-[#ff8fab] px-3 py-1 font-hand text-sm text-white shadow-lg"
            animate={{ scale: [1, 1.08, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <motion.span animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 1.4, repeat: Infinity }}>
              ❤️‍🔥
            </motion.span>
            Us
          </motion.span>
        ) : (
          <span className="absolute right-2 top-2 flex items-center gap-1 rounded-full bg-gradient-to-r from-mustard to-[#f0c060] px-3 py-1 font-hand text-sm text-white shadow-lg">
            <motion.span
              animate={{ y: [0, -3, 0], rotate: [0, 8, -8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="inline-block"
            >
              🌏
            </motion.span>
            Other Trip
          </span>
        )}

        {/* Stamp mark overlay on some cards */}
        {showStamp && (
          <div className={`absolute bottom-3 left-3 ${stamp.rotate} pointer-events-none select-none`}>
            <span className={`font-hand text-xl font-bold ${stamp.color} opacity-40 tracking-wider`}>
              {stamp.text}
            </span>
          </div>
        )}

        {/* Hover message — appears on hover */}
        <motion.div
          className="absolute inset-0 flex items-end justify-center bg-gradient-to-t from-ink/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-md pointer-events-none"
        >
          <span className="mb-4 rounded-full bg-white/90 px-4 py-1.5 font-hand text-base text-ink shadow-lg">
            {hoverMsg}
          </span>
        </motion.div>
      </div>

      {/* ─── Text info ─── */}
      <div className={isPolaroid ? "px-1 pt-2" : "px-1 pb-1 pt-3"}>
        <h3 className={`font-display text-ink ${isPolaroid ? "text-center text-base" : "text-lg"}`}>
          {memory.title}
        </h3>
        {memory.caption && !isPolaroid && (
          <p className="mt-1 line-clamp-2 font-hand text-lg leading-snug text-ink-soft">
            {memory.caption}
          </p>
        )}
        <div className={`mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-ink-soft ${isPolaroid ? "justify-center" : ""}`}>
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

      {/* ─── Corner stickers ─── */}
      <motion.span
        className={`absolute ${sticker1.pos} text-xl pointer-events-none select-none`}
        animate={{ rotate: [0, 12, -12, 0], scale: [1, 1.15, 1] }}
        transition={{ duration: 3 + seeded(index, 6), repeat: Infinity }}
      >
        {sticker1.emoji}
      </motion.span>
      {showSticker2 && (
        <motion.span
          className={`absolute ${sticker2.pos} text-lg pointer-events-none select-none`}
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1.5 + seeded(index, 7), repeat: Infinity }}
        >
          {sticker2.emoji}
        </motion.span>
      )}
    </motion.div>
  );
}
