"use client";

import { motion } from "motion/react";

const BOUNCING_EMOJIS = [
  { emoji: "✈️", delay: 0 },
  { emoji: "🌍", delay: 0.2 },
  { emoji: "📸", delay: 0.4 },
  { emoji: "🧳", delay: 0.6 },
  { emoji: "🌴", delay: 0.8 },
  { emoji: "⭐", delay: 1.0 },
  { emoji: "🏖️", delay: 1.2 },
];

export default function Footer() {
  return (
    <footer className="relative z-10 border-t-2 border-dashed border-kraft py-8 text-center">
      {/* Bouncing travel emoji row */}
      <div className="mb-4 flex items-center justify-center gap-3">
        {BOUNCING_EMOJIS.map((e, i) => (
          <motion.span
            key={i}
            className="text-xl sm:text-2xl"
            animate={{
              y: [0, -12, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: e.delay,
              ease: "easeInOut",
            }}
          >
            {e.emoji}
          </motion.span>
        ))}
      </div>
      <motion.p
        className="font-hand text-2xl text-ink-soft"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        made with{" "}
        <motion.span
          className="inline-block"
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ duration: 1.4, repeat: Infinity }}
        >
          ❤️
        </motion.span>{" "}
        for wherever you land next ✈️
      </motion.p>
      <motion.p
        className="mt-2 font-hand text-lg text-ink-soft/60"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        — your biggest fan, always 💛
      </motion.p>
    </footer>
  );
}
