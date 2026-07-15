"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { fetchMemories } from "@/lib/api";
import type { Memory, MemoryCategory } from "@/types/memory";
import MemoryCard from "./MemoryCard";
import { Button } from "@/components/ui/button";
import { Compass, RefreshCcw } from "lucide-react";

type Filter = "all" | MemoryCategory;

const FILTER_CONFIG: { value: Filter; label: string; emoji: string }[] = [
  { value: "all", label: "Everything", emoji: "📸" },
  { value: "us", label: "Our Adventures", emoji: "✨" },
  { value: "her", label: "Other Trips", emoji: "🌏" },
];

/* ─── Random scrapbook doodles scattered between cards ─── */
const SCATTER_DOODLES = [
  "✈️", "💌", "🌸", "⭐", "📮", "🎫", "🏷️", "📎",
  "🖇️", "🌿", "🦋", "🐚", "🌻", "🎀", "💕", "🧵",
];

/* ─── Fun section divider messages ─── */
const DIVIDER_MESSAGES = [
  "...and the adventure continues! ✈️",
  "wait, there's more! 📸",
  "plot twist: it gets even better 👀",
  "okay this next one though... 🤩",
  "keep scrolling, it's worth it! 💛",
  "more memories, more love 💕",
  "the saga continues... 🗺️",
  "another page of our story 📖",
];

export default function MemoryGrid() {
  const [memories, setMemories] = useState<Memory[]>([]);
  const [filter, setFilter] = useState<Filter>("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchMemories(filter === "all" ? undefined : filter);
      setMemories(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Couldn't load memories");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  return (
    <section className="mx-auto max-w-6xl px-4 sm:px-6 py-12">
      {/* ─── Scrapbook header with decorative tape ─── */}
      <div className="relative mb-10">
        {/* Decorative tape on the title */}
        <div className="washi-tape washi-tape-2" style={{ top: "-8px", left: "5%", transform: "rotate(-8deg)", width: "60px" }} />
        <div className="washi-tape washi-tape-1" style={{ top: "-6px", right: "10%", transform: "rotate(14deg)", width: "55px" }} />

        <div className="flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center justify-between gap-4 rounded-xl border-2 border-dashed border-kraft bg-card/80 px-4 sm:px-6 py-5 shadow-postcard backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <motion.span
              className="text-4xl"
              animate={{ rotate: [0, 8, -8, 5, 0], scale: [1, 1.1, 1] }}
              transition={{ duration: 3, repeat: Infinity, repeatDelay: 1 }}
            >
              📒
            </motion.span>
            <div>
              <h2 className="font-display text-2xl sm:text-3xl italic text-ink">
                <span className="squiggly-underline">The Scrapbook</span>
              </h2>
              {!loading && !error && memories.length > 0 && (
                <motion.p
                  className="mt-0.5 font-hand text-base text-ink-soft"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  {memories.length} {memories.length === 1 ? "memory" : "memories"} and counting!{" "}
                  <motion.span
                    className="inline-block"
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ duration: 1.4, repeat: Infinity }}
                  >
                    💛
                  </motion.span>
                </motion.p>
              )}
            </div>
          </div>
          <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
            {FILTER_CONFIG.map((f) => (
              <motion.div
                key={f.value}
                whileTap={{ scale: 0.88 }}
                whileHover={{ scale: 1.08, rotate: [-1, 1, 0] }}
              >
                <Button
                  size="sm"
                  variant={filter === f.value ? "default" : "outline"}
                  className="rounded-full"
                  onClick={() => setFilter(f.value)}
                >
                  <span className="mr-1">{f.emoji}</span>
                  {f.label}
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* ─── Loading skeletons ─── */}
      {loading && (
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <motion.div
              key={i}
              className="aspect-[4/5] rounded-lg border border-kraft bg-paper-dark"
              animate={{ opacity: [0.4, 0.7, 0.4] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.15 }}
            />
          ))}
        </div>
      )}

      {/* ─── Error state ─── */}
      {!loading && error && (
        <div className="flex flex-col items-center gap-4 rounded-xl border-2 border-dashed border-kraft bg-card/60 py-16 text-center backdrop-blur-sm">
          <motion.span
            className="text-4xl"
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            😵‍💫
          </motion.span>
          <p className="text-ink-soft font-hand text-xl">{error}</p>
          <Button variant="outline" onClick={load} className="rounded-full">
            <RefreshCcw size={16} /> Try again
          </Button>
        </div>
      )}

      {/* ─── Empty state ─── */}
      {!loading && !error && memories.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center gap-5 rounded-xl border-2 border-dashed border-kraft bg-card/60 py-20 text-center backdrop-blur-sm"
        >
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          >
            <Compass size={40} className="text-ink-soft" />
          </motion.div>
          <div>
            <p className="font-hand text-3xl text-ink-soft">
              No memories here yet! 🗺️
            </p>
            <p className="mt-2 font-hand text-xl text-ink-soft/70">
              The first stamp on this passport is waiting for you ✈️
            </p>
          </div>
          <Link href="/upload">
            <Button className="rounded-full" size="lg">🎒 Add the first one</Button>
          </Link>
        </motion.div>
      )}

      {/* ─── Memory grid with scattered doodles ─── */}
      {!loading && !error && memories.length > 0 && (
        <div className="relative">
          {/* Scattered doodle stickers in the background */}
          {memories.length >= 3 &&
            SCATTER_DOODLES.slice(0, Math.min(memories.length, 12)).map((doodle, i) => (
              <motion.span
                key={`doodle-${i}`}
                className="absolute pointer-events-none select-none text-xl sm:text-2xl opacity-[0.12]"
                style={{
                  left: `${(i * 37 + 10) % 90}%`,
                  top: `${(i * 53 + 5) % 85}%`,
                }}
                animate={{
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 4 + (i % 3),
                  repeat: Infinity,
                  delay: i * 0.5,
                }}
              >
                {doodle}
              </motion.span>
            ))}

          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3 relative z-10">
            {memories.map((memory, i) => (
              <div key={memory._id}>
                <MemoryCard memory={memory} index={i} />

                {/* Fun divider message every 3 cards */}
                {i > 0 && i % 3 === 2 && i < memories.length - 1 && (
                  <motion.div
                    className="mt-6 flex items-center justify-center sm:col-span-2 lg:col-span-3"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4 }}
                  >
                    <div className="flex items-center gap-3">
                      <span className="h-[1px] w-8 bg-kraft" />
                      <span className="font-hand text-lg text-ink-soft/60 whitespace-nowrap">
                        {DIVIDER_MESSAGES[Math.floor(i / 3) % DIVIDER_MESSAGES.length]}
                      </span>
                      <span className="h-[1px] w-8 bg-kraft" />
                    </div>
                  </motion.div>
                )}
              </div>
            ))}
          </div>

          {/* Bottom flourish when there are many memories */}
          {memories.length >= 4 && (
            <motion.div
              className="mt-12 text-center"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <p className="font-hand text-xl text-ink-soft/50">
                {memories.length < 10
                  ? "this is just the beginning... keep adding! 🌱"
                  : memories.length < 20
                  ? "look at all these beautiful memories! 😍"
                  : "you two have a whole world of memories 🌍💛"}
              </p>
              <div className="mt-2 flex justify-center gap-2">
                {["📸", "🌴", "✈️", "💛", "🗺️"].map((e, i) => (
                  <motion.span
                    key={i}
                    className="text-lg opacity-30"
                    animate={{ y: [0, -6, 0] }}
                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                  >
                    {e}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      )}
    </section>
  );
}
