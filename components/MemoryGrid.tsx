"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { fetchMemories } from "@/lib/api";
import type { Memory, MemoryCategory } from "@/types/memory";
import MemoryCard from "./MemoryCard";
import { Button } from "@/components/ui/button";
import { Compass, RefreshCcw } from "lucide-react";

type Filter = "all" | MemoryCategory;

const FILTER_CONFIG: { value: Filter; label: string; emoji: string }[] = [
  { value: "all", label: "Everything", emoji: "📸" },
  { value: "us", label: "Our Adventures", emoji: "✨" },
  { value: "her", label: "Solo Adventures", emoji: "🌎" },
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
    <section className="mx-auto max-w-6xl px-6 py-12">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <h2 className="font-display text-3xl italic text-ink">
          <span className="squiggly-underline">The Scrapbook</span>{" "}
          <motion.span
            className="inline-block text-2xl"
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
          >
            📒
          </motion.span>
        </h2>
        <div className="flex gap-2">
          {FILTER_CONFIG.map((f) => (
            <motion.div
              key={f.value}
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.05 }}
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

      {loading && (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="aspect-[4/5] animate-pulse rounded-lg border border-kraft bg-paper-dark"
            />
          ))}
        </div>
      )}

      {!loading && error && (
        <div className="flex flex-col items-center gap-4 rounded-lg border-2 border-dashed border-kraft py-16 text-center">
          <p className="text-ink-soft">{error}</p>
          <Button variant="outline" onClick={load}>
            <RefreshCcw size={16} /> Try again
          </Button>
        </div>
      )}

      {!loading && !error && memories.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center gap-4 rounded-lg border-2 border-dashed border-kraft py-20 text-center"
        >
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          >
            <Compass size={32} className="text-ink-soft" />
          </motion.div>
          <p className="font-hand text-2xl text-ink-soft">
            No memories here yet — the first stamp on this passport is waiting for you. ✈️
          </p>
          <Link href="/upload">
            <Button className="rounded-full">🎒 Add the first one</Button>
          </Link>
        </motion.div>
      )}

      {!loading && !error && memories.length > 0 && (
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {memories.map((memory, i) => (
            <MemoryCard key={memory._id} memory={memory} index={i} />
          ))}
        </div>
      )}
    </section>
  );
}
