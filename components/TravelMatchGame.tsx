"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Sparkles, RotateCcw, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import ConfettiBurst from "./ConfettiBurst";

/* ─── Config ─── */
const GOAL = 20;

const BALLOON_EMOJIS = [
  "✈️", "🌴", "📸", "🏖️", "🐚", "🍦", "🎒", "⭐",
  "🌺", "🦋", "🌅", "🧳", "🗺️", "🌈", "☀️", "🌍",
];

const BALLOON_COLORS = [
  "from-rose to-[#ff8fab]",
  "from-sky to-[#87ceeb]",
  "from-mustard to-[#f0c060]",
  "from-[#a78bfa] to-[#c4b5fd]",
  "from-[#6ee7b7] to-[#34d399]",
  "from-[#fda4af] to-[#fb7185]",
  "from-[#93c5fd] to-[#60a5fa]",
  "from-[#fdba74] to-[#fb923c]",
];

const BONUS_MESSAGES = [
  "You're a ray of sunshine! ☀️",
  "The world smiles when you do! 😊",
  "You make everything better! ✨",
  "You're absolutely wonderful! 💫",
  "Keep shining, superstar! 🌟",
  "You're one in a million! 💎",
];

const WIN_MESSAGES = [
  "You're not just a traveler — you're a memory collector, and every memory you make is pure magic 💛",
  "If happiness were a place, you'd be the one everyone wants to visit. Keep exploring, beautiful soul ✨",
  "The world is so much brighter because you're in it, exploring it, loving it. Never stop 🌍💖",
  "You don't just travel places — you leave a little piece of your sparkle everywhere you go 🌟",
  "Home isn't a place — it's the feeling people get when they're around you 🏡💕",
  "Some people look for beautiful places. You ARE the beautiful place 🌺",
  "If adventures had a queen, it would 100% be you 👑✈️",
  "You collect sunsets the way some people collect stamps — and I love that about you 🌅",
  "The map doesn't know how lucky it is to have your footprints on it 🗺️💛",
  "I hope every stranger you meet becomes a story you tell forever 📖✨",
  "You make even airports feel like magic. That's a real superpower 🦸‍♀️💫",
  "Somewhere out there, a place is waiting to become your new favorite memory 🌄",
  "You don't need a compass — your heart already knows the way 💖🧭",
  "Every photo you take is proof the universe shows off when you're watching 📸🌌",
  "Distance means nothing when someone means everything. Missing you always 💌",
  "You're the kind of person postcards wish they could describe ✉️🌷",
  "The best views in the world still can't compete with your smile 😊🏔️",
  "Keep wandering — the world needs your kind of wonder in it 🌍🦋",
  "One day we'll look back at all these memories and our hearts will be so full 💛📒",
  "You turn every trip into a fairy tale, and I'm your biggest fan forever 🧚‍♀️💫",
];

interface Balloon {
  id: number;
  emoji: string;
  x: number;
  color: string;
  size: number;
  speed: number;
  wobble: number;
  isGolden: boolean;
  createdAt: number;
}

interface PopEffect {
  id: number;
  x: number;
  y: number;
  emoji: string;
  bonusMsg?: string;
}

let balloonIdCounter = 0;

function createBalloon(speedMultiplier: number): Balloon {
  const isGolden = Math.random() < 0.15; // 15% chance for golden balloon
  return {
    id: balloonIdCounter++,
    emoji: BALLOON_EMOJIS[Math.floor(Math.random() * BALLOON_EMOJIS.length)],
    x: 8 + Math.random() * 84, // 8% to 92% from left
    color: BALLOON_COLORS[Math.floor(Math.random() * BALLOON_COLORS.length)],
    size: 48 + Math.random() * 20,
    speed: (6 + Math.random() * 4) / speedMultiplier,
    wobble: 10 + Math.random() * 20,
    isGolden,
    createdAt: Date.now(),
  };
}

export default function TravelMatchGame({ onClose }: { onClose: () => void }) {
  const [balloons, setBalloons] = useState<Balloon[]>([]);
  const [pops, setPops] = useState<PopEffect[]>([]);
  const [score, setScore] = useState(0);
  const [missed, setMissed] = useState(0);
  const [won, setWon] = useState(false);
  const [burst, setBurst] = useState(false);
  const [winMsg, setWinMsg] = useState("");
  const [bonusToast, setBonusToast] = useState("");
  const gameAreaRef = useRef<HTMLDivElement>(null);
  const spawnIntervalRef = useRef<NodeJS.Timeout>();
  const gameActive = useRef(true);
  const usedWinMsgs = useRef<Set<number>>(new Set());

  // Speed increases as score goes up
  const speedMultiplier = 1 + score * 0.03;

  // Spawn balloons
  useEffect(() => {
    if (won) return;
    gameActive.current = true;

    const spawn = () => {
      if (!gameActive.current) return;
      setBalloons((prev) => {
        // Max 8 balloons at a time
        if (prev.length >= 8) return prev;
        return [...prev, createBalloon(speedMultiplier)];
      });
    };

    // Spawn every 800-1200ms
    spawnIntervalRef.current = setInterval(spawn, Math.max(600, 1000 - score * 15));

    return () => {
      gameActive.current = false;
      if (spawnIntervalRef.current) clearInterval(spawnIntervalRef.current);
    };
  }, [won, score, speedMultiplier]);

  // Remove balloons that floated off screen (missed)
  useEffect(() => {
    const cleanup = setInterval(() => {
      const now = Date.now();
      setBalloons((prev) => {
        const remaining: Balloon[] = [];
        let newMissed = 0;
        prev.forEach((b) => {
          const age = (now - b.createdAt) / 1000;
          if (age > b.speed + 1) {
            newMissed++;
          } else {
            remaining.push(b);
          }
        });
        if (newMissed > 0) {
          setMissed((m) => m + newMissed);
        }
        return remaining;
      });
    }, 500);
    return () => clearInterval(cleanup);
  }, []);

  // Pop a balloon
  const popBalloon = useCallback(
    (balloon: Balloon, e: React.MouseEvent | React.TouchEvent) => {
      if (won) return;

      // Get position for pop effect
      const rect = gameAreaRef.current?.getBoundingClientRect();
      let clientX: number, clientY: number;
      if ("touches" in e) {
        clientX = e.touches[0]?.clientX ?? 0;
        clientY = e.touches[0]?.clientY ?? 0;
      } else {
        clientX = e.clientX;
        clientY = e.clientY;
      }
      const x = rect ? clientX - rect.left : 0;
      const y = rect ? clientY - rect.top : 0;

      // Remove balloon
      setBalloons((prev) => prev.filter((b) => b.id !== balloon.id));

      // Add pop effect
      const popId = Date.now() + Math.random();
      const bonusMsg = balloon.isGolden
        ? BONUS_MESSAGES[Math.floor(Math.random() * BONUS_MESSAGES.length)]
        : undefined;

      setPops((prev) => [...prev, { id: popId, x, y, emoji: balloon.emoji, bonusMsg }]);
      setTimeout(() => setPops((prev) => prev.filter((p) => p.id !== popId)), 1200);

      // Show bonus toast for golden balloons
      if (bonusMsg) {
        setBonusToast(bonusMsg);
        setTimeout(() => setBonusToast(""), 2500);
      }

      // Update score
      const points = balloon.isGolden ? 3 : 1;
      setScore((s) => {
        const newScore = s + points;
        if (newScore >= GOAL) {
          setWon(true);
          setBurst(true);
          // Pick a message she hasn't seen yet
          if (usedWinMsgs.current.size >= WIN_MESSAGES.length) {
            usedWinMsgs.current.clear();
          }
          const available = WIN_MESSAGES.map((_, i) => i).filter(
            (i) => !usedWinMsgs.current.has(i)
          );
          const pick = available[Math.floor(Math.random() * available.length)];
          usedWinMsgs.current.add(pick);
          setWinMsg(WIN_MESSAGES[pick]);
          setTimeout(() => setBurst(false), 1600);
        }
        return newScore;
      });
    },
    [won]
  );

  const resetGame = () => {
    setBalloons([]);
    setPops([]);
    setScore(0);
    setMissed(0);
    setWon(false);
    setBurst(false);
    setBonusToast("");
    gameActive.current = true;
  };

  const progress = Math.min((score / GOAL) * 100, 100);

  return (
    <motion.div
      className="fixed inset-0 z-[70] flex items-center justify-center bg-ink/50 px-4 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="relative w-full max-w-md overflow-hidden rounded-2xl border-2 border-dashed border-kraft bg-card shadow-postcard"
        initial={{ opacity: 0, scale: 0.7, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.7, y: 40 }}
        transition={{ type: "spring", damping: 20, stiffness: 200 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative">
          <ConfettiBurst active={burst} />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-5 pt-4 pb-2">
          <div>
            <h3 className="font-display text-xl italic text-ink flex items-center gap-2">
              <motion.span
                animate={{ y: [0, -5, 0], rotate: [0, 5, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                🎈
              </motion.span>
              Pop the Bubbles!
            </h3>
            <p className="text-xs text-ink-soft mt-0.5">
              Tap the balloons before they fly away! ✨
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-ink-soft hover:text-ink transition-colors"
            aria-label="Close game"
          >
            <X size={20} />
          </button>
        </div>

        {/* Score bar */}
        <div className="mx-5 mb-2">
          <div className="flex items-center justify-between text-xs text-ink-soft mb-1">
            <span className="font-hand text-base">{score} / {GOAL} popped</span>
            <span className="font-hand text-base">escaped: {missed}</span>
          </div>
          <div className="h-3 w-full overflow-hidden rounded-full bg-paper-dark">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-rose via-mustard to-sky"
              animate={{ width: `${progress}%` }}
              transition={{ type: "spring", stiffness: 100 }}
            />
          </div>
          {/* Golden balloon hint */}
          <p className="mt-1 text-center text-[11px] text-ink-soft/60">
            ✨ Golden balloons = 3 points + bonus message!
          </p>
        </div>

        {/* Game area */}
        <AnimatePresence mode="wait">
          {!won ? (
            <motion.div
              key="game"
              ref={gameAreaRef}
              className="relative mx-3 mb-4 h-[340px] overflow-hidden rounded-xl bg-gradient-to-b from-sky/10 via-paper to-paper-dark/40 border border-kraft/40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* Decorative clouds */}
              <motion.span
                className="absolute top-4 left-[10%] text-3xl opacity-20 pointer-events-none select-none"
                animate={{ x: [0, 30, 0] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              >
                ☁️
              </motion.span>
              <motion.span
                className="absolute top-8 right-[15%] text-2xl opacity-15 pointer-events-none select-none"
                animate={{ x: [0, -20, 0] }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
              >
                ☁️
              </motion.span>

              {/* Balloons */}
              {balloons.map((balloon) => (
                <motion.button
                  key={balloon.id}
                  className={`absolute cursor-pointer select-none flex items-center justify-center rounded-full ${
                    balloon.isGolden
                      ? "bg-gradient-to-br from-[#ffd700] to-[#ffaa00] ring-2 ring-[#ffd700]/50"
                      : `bg-gradient-to-br ${balloon.color}`
                  } shadow-lg active:scale-90 transition-transform`}
                  style={{
                    width: balloon.size,
                    height: balloon.size,
                    left: `${balloon.x}%`,
                    bottom: 0,
                    fontSize: balloon.size * 0.45,
                    transform: "translateX(-50%)",
                  }}
                  initial={{ y: 0, opacity: 0, scale: 0.5 }}
                  animate={{
                    y: -(340 + balloon.size),
                    opacity: [0, 1, 1, 0.8],
                    scale: 1,
                    x: [0, balloon.wobble, -balloon.wobble, 0],
                  }}
                  transition={{
                    y: { duration: balloon.speed, ease: "linear" },
                    opacity: { duration: balloon.speed, times: [0, 0.05, 0.85, 1] },
                    scale: { duration: 0.3 },
                    x: { duration: 2, repeat: Infinity, ease: "easeInOut" },
                  }}
                  onClick={(e) => popBalloon(balloon, e)}
                  onTouchStart={(e) => popBalloon(balloon, e)}
                  whileHover={{ scale: 1.15 }}
                  aria-label={`Pop ${balloon.emoji} balloon`}
                >
                  <span className="drop-shadow-sm">{balloon.emoji}</span>
                  {balloon.isGolden && (
                    <motion.span
                      className="absolute -top-1 -right-1 text-xs"
                      animate={{ rotate: [0, 20, -20, 0], scale: [1, 1.2, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    >
                      ✨
                    </motion.span>
                  )}
                  {/* Balloon string */}
                  <span
                    className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-[1px] h-4 bg-ink/20"
                    style={{ borderRadius: "50%" }}
                  />
                </motion.button>
              ))}

              {/* Pop effects */}
              <AnimatePresence>
                {pops.map((pop) => (
                  <motion.div
                    key={pop.id}
                    className="absolute pointer-events-none z-10"
                    style={{ left: pop.x, top: pop.y }}
                    initial={{ opacity: 1, scale: 1 }}
                    animate={{ opacity: 0, scale: 2 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6 }}
                  >
                    {/* Burst particles */}
                    {[...Array(6)].map((_, i) => (
                      <motion.span
                        key={i}
                        className="absolute text-sm"
                        initial={{ x: 0, y: 0, opacity: 1 }}
                        animate={{
                          x: (Math.random() - 0.5) * 80,
                          y: (Math.random() - 0.5) * 80,
                          opacity: 0,
                          scale: 0.5,
                        }}
                        transition={{ duration: 0.5, delay: i * 0.03 }}
                      >
                        {i % 2 === 0 ? "✨" : pop.emoji}
                      </motion.span>
                    ))}
                    {/* Score popup */}
                    <motion.span
                      className="absolute -top-2 left-2 font-hand text-lg font-bold text-rose whitespace-nowrap"
                      initial={{ y: 0, opacity: 1 }}
                      animate={{ y: -30, opacity: 0 }}
                      transition={{ duration: 0.8 }}
                    >
                      {pop.bonusMsg ? "+3 ✨" : "+1"}
                    </motion.span>
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Bonus message toast */}
              <AnimatePresence>
                {bonusToast && (
                  <motion.div
                    className="absolute top-4 left-1/2 -translate-x-1/2 z-20 whitespace-nowrap"
                    initial={{ opacity: 0, y: -10, scale: 0.8 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.8 }}
                    transition={{ type: "spring", damping: 15 }}
                  >
                    <div className="rounded-full bg-gradient-to-r from-[#ffd700] to-[#ffaa00] px-4 py-2 font-hand text-sm text-ink shadow-lg">
                      ⭐ {bonusToast}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ) : (
            /* Win Screen */
            <motion.div
              key="win"
              className="flex flex-col items-center gap-4 px-6 py-8 text-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", damping: 15 }}
            >
              <motion.div
                animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-mustard to-[#f0c060] shadow-lg">
                  <Trophy size={36} className="text-white" />
                </div>
              </motion.div>

              <div>
                <h3 className="font-display text-2xl italic text-ink">
                  Amazing! 🎉🎈
                </h3>
                <p className="mt-1 font-hand text-lg text-ink-soft">
                  You popped {score} bubbles!
                </p>
              </div>

              <motion.div
                className="mx-2 rounded-xl border-2 border-dashed border-rose/30 bg-rose/5 p-5"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <motion.p
                  className="font-hand text-xl leading-relaxed text-ink"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                >
                  🎁 Your surprise message:
                </motion.p>
                <motion.p
                  className="mt-3 font-hand text-xl leading-relaxed text-rose"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.2 }}
                >
                  &ldquo;{winMsg}&rdquo;
                </motion.p>
              </motion.div>

              <div className="flex gap-3 mt-2">
                <Button variant="outline" className="rounded-full" onClick={resetGame}>
                  <RotateCcw size={16} /> Play Again
                </Button>
                <Button variant="rose" className="rounded-full" onClick={onClose}>
                  <Sparkles size={16} /> Love it! 💛
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
