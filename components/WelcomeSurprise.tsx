"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

const SPARKLE_EMOJIS = ["✨", "⭐", "🌟", "💫", "✨", "⭐"];

export default function WelcomeSurprise() {
  const [show, setShow] = useState(false);
  const [phase, setPhase] = useState<"dark" | "message" | "reveal" | "done">("dark");

  useEffect(() => {
    const alreadySeen = sessionStorage.getItem("welcomeSurpriseSeen");
    if (!alreadySeen) {
      setShow(true);
      sessionStorage.setItem("welcomeSurpriseSeen", "true");

      // Phase timeline
      const t1 = setTimeout(() => setPhase("message"), 800);
      const t2 = setTimeout(() => setPhase("reveal"), 3500);
      const t3 = setTimeout(() => setPhase("done"), 5000);
      const t4 = setTimeout(() => setShow(false), 5500);

      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
        clearTimeout(t3);
        clearTimeout(t4);
      };
    }
  }, []);

  if (!show) return null;

  return (
    <AnimatePresence>
      {phase !== "done" && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Dark background with sparkles */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460]">
            {SPARKLE_EMOJIS.concat(SPARKLE_EMOJIS, SPARKLE_EMOJIS).map((emoji, i) => (
              <motion.span
                key={i}
                className="absolute text-2xl"
                style={{
                  left: `${10 + (i * 17) % 85}%`,
                  top: `${15 + (i * 23) % 70}%`,
                }}
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0.5, 1.2, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.3,
                  ease: "easeInOut",
                }}
              >
                {emoji}
              </motion.span>
            ))}
          </div>

          {/* Message phase */}
          <AnimatePresence>
            {(phase === "message" || phase === "reveal") && (
              <motion.div
                className="relative z-10 text-center px-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: phase === "reveal" ? 0 : 1, y: phase === "reveal" ? -30 : 0 }}
                transition={{ duration: 0.8 }}
              >
                <motion.p
                  className="text-4xl sm:text-5xl font-hand text-white leading-relaxed"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                >
                  Someone made this
                  <br />
                  just for you... 💛
                </motion.p>
                <motion.p
                  className="mt-4 text-xl font-hand text-white/60"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.8 }}
                >
                  ✈️ get ready for a little surprise ✈️
                </motion.p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Curtain effect */}
          {phase === "reveal" && (
            <>
              <motion.div
                className="absolute left-0 top-0 h-full w-1/2 bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460] z-20"
                initial={{ x: 0 }}
                animate={{ x: "-100%" }}
                transition={{ duration: 1.2, ease: [0.65, 0, 0.35, 1] }}
              />
              <motion.div
                className="absolute right-0 top-0 h-full w-1/2 bg-gradient-to-bl from-[#1a1a2e] via-[#16213e] to-[#0f3460] z-20"
                initial={{ x: 0 }}
                animate={{ x: "100%" }}
                transition={{ duration: 1.2, ease: [0.65, 0, 0.35, 1] }}
              />
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
