"use client";

import { motion } from "motion/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import FlightPath from "./FlightPath";
import SurpriseButton from "./SurpriseButton";
import { Button } from "@/components/ui/button";
import { Camera, Loader2 } from "lucide-react";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const BOUNCING_EMOJIS = [
  { emoji: "✈️", left: "8%", top: "15%", delay: 0 },
  { emoji: "🌴", right: "10%", top: "20%", delay: 0.3 },
  { emoji: "🗺️", left: "5%", bottom: "30%", delay: 0.6 },
  { emoji: "🏖️", right: "6%", bottom: "25%", delay: 0.9 },
  { emoji: "📸", left: "15%", top: "50%", delay: 1.2 },
  { emoji: "🌍", right: "15%", top: "45%", delay: 0.5 },
];

export default function Hero() {
  const router = useRouter();
  const [navigatingTo, setNavigatingTo] = useState<string | null>(null);

  useEffect(() => {
    // Prefetch both routes on mount
    router.prefetch("/upload");
    router.prefetch("/memories");
    setNavigatingTo(null);
  }, [router]);

  const handleNavigate = (href: string) => {
    setNavigatingTo(href);
    router.push(href);
  };

  return (
    <section className="relative overflow-hidden px-6 pb-10 pt-16 sm:pt-24">
      {/* Bouncing travel emojis scattered around the hero */}
      {BOUNCING_EMOJIS.map((e, i) => (
        <motion.span
          key={i}
          className="absolute hidden sm:block text-2xl md:text-3xl select-none pointer-events-none"
          style={{
            left: e.left,
            right: e.right,
            top: e.top,
            bottom: e.bottom,
          }}
          animate={{
            y: [0, -14, 0],
            rotate: [0, 8, -8, 0],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            delay: e.delay,
            ease: "easeInOut",
          }}
        >
          {e.emoji}
        </motion.span>
      ))}

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="mx-auto max-w-3xl text-center"
      >
        {/* Waving hand + tag */}
        <motion.h2
          variants={item}
          animate={{
            y: [0, -3, 0],
            rotate: [0, -0.4, 0.4, 0],
            scale: [1, 1.01, 1],
          }}
          transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
          className="mx-auto mt-3 max-w-3xl rounded-[2rem] border border-rose/20 bg-gradient-to-r from-paper-dark/90 via-[#fdf8ef] to-paper-dark/90 px-4 py-3 font-hand text-xl leading-relaxed tracking-[0.01em] text-ink shadow-[0_10px_24px_-16px_rgba(34,68,63,0.35)] sm:px-6 sm:py-4 sm:text-2xl"
        >
          <span className="text-rose">तुझ्यासोबतचे क्षणच</span> माझ्या
          आयुष्यातील सर्वात सुंदर प्रवास आहेत.
          <span className="ml-2 inline-block text-xl text-mustard">✨</span>
        </motion.h2>
        <motion.span
          variants={item}
          className="inline-flex items-center gap-2 rounded-full border-2 border-dashed border-kraft bg-paper-dark px-4 py-1 font-hand text-lg text-ink-soft mt-3"
        >
          <motion.span
            animate={{ rotate: [0, 14, -8, 14, -4, 10, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 1 }}
            className="inline-block origin-[70%_70%]"
          >
            👋
          </motion.span>
          a little postcard, just for you
        </motion.span>

        {/* Gradient shimmer title */}
        <motion.h1
          variants={item}
          className="mt-6 font-display text-4xl italic leading-tight sm:text-6xl text-balance"
        >
          <span className="text-gradient-shimmer">Wish you were here</span> —
          <br className="hidden sm:block" /> but I love that you're{" "}
          <motion.span
            className="text-rose not-italic inline-block"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            out there
          </motion.span>
          .
        </motion.h1>

        <motion.p
          variants={item}
          className="mx-auto mt-5 max-w-xl text-base text-ink-soft sm:text-lg"
        >
          A shared scrapbook for us — the trips we've already had, and every
          new one you're about to collect. Add photos as you go, and I'll be
          right here, cheering from your phone screen. 💛
        </motion.p>

        <motion.div
          variants={item}
          className="mt-8 flex flex-wrap items-center justify-center gap-4"
        >
          <Button
            size="lg"
            variant="default"
            className="rounded-full group"
            onClick={() => handleNavigate("/upload")}
            onMouseEnter={() => router.prefetch("/upload")}
            onFocus={() => router.prefetch("/upload")}
          >
            {navigatingTo === "/upload" ? (
              <Loader2 size={18} className="animate-spin" />
            ) : (
              <motion.span
                className="inline-block"
                whileHover={{ rotate: 15 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Camera size={18} />
              </motion.span>
            )}
            Drop a new memory
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="rounded-full"
            onClick={() => handleNavigate("/memories")}
            onMouseEnter={() => router.prefetch("/memories")}
            onFocus={() => router.prefetch("/memories")}
          >
            {navigatingTo === "/memories" ? (
              <>
                <Loader2 size={18} className="animate-spin mr-1" />
              </>
            ) : (
              "📖"
            )}
            Browse memories
          </Button>
        </motion.div>

        {/* Surprise button with pulsing glow */}
        <motion.div variants={item} className="mt-6 flex justify-center">
          <div className="animate-pulse-glow rounded-full">
            <SurpriseButton />
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="mt-16"
      >
        <FlightPath />
      </motion.div>
    </section>
  );
}
