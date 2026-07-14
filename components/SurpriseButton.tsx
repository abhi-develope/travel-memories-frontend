"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Gift, X, Heart } from "lucide-react";
import ConfettiBurst from "./ConfettiBurst";
import HeartRain from "./HeartRain";
import { Button } from "@/components/ui/button";

/**
 * ✏️ Personalize this! Swap in your own message for her — this is the
 * emotional payoff of the whole site, so make it sound like *you*.
 */
const SURPRISE_MESSAGE = `Wherever this trip takes you — I hope it's full of ridiculous stories,
new favorite foods, and skies worth stopping for. I'm so proud of you for going.
This little corner of the internet is yours: drop every photo, every "you won't
believe what just happened," every tiny memory here. I'll be refreshing it more
than I'll ever admit. Missing you already. Go have the time of your life. 💛`;

export default function SurpriseButton() {
  const [open, setOpen] = useState(false);
  const [burst, setBurst] = useState(false);
  const [heartRain, setHeartRain] = useState(false);

  const handleTap = () => {
    setBurst(true);
    setHeartRain(true);
    setOpen(true);
    window.setTimeout(() => setBurst(false), 1600);
    window.setTimeout(() => setHeartRain(false), 5000);
  };

  return (
    <div className="relative flex flex-col items-center">
      <div className="relative">
        <ConfettiBurst active={burst} />
        <motion.div
          animate={!open ? { rotate: [0, -3, 3, -3, 0] } : { rotate: 0 }}
          transition={{ duration: 1.6, repeat: open ? 0 : Infinity, repeatDelay: 2 }}
        >
          {/* Rainbow shimmer border wrapper */}
          <div className="rainbow-shimmer-border rounded-full">
            <Button
              variant="rose"
              size="lg"
              onClick={handleTap}
              className="rounded-full shadow-postcard relative z-10"
            >
              <motion.span
                animate={{ rotate: [0, -10, 10, -10, 0] }}
                transition={{ duration: 1, repeat: Infinity, repeatDelay: 2 }}
                className="inline-block"
              >
                <Gift size={20} />
              </motion.span>
              Tap for a surprise 🎁
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Heart rain overlay */}
      <HeartRain active={heartRain} />

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-ink/40 px-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          >
            <motion.div
              className="relative max-w-md rounded-lg border-2 border-dashed border-kraft bg-card p-8 shadow-postcard overflow-hidden"
              initial={{ opacity: 0, rotateY: 90, scale: 0.85 }}
              animate={{ opacity: 1, rotateY: 0, scale: 1 }}
              exit={{ opacity: 0, rotateY: -90, scale: 0.85 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              style={{ transformPerspective: 1000 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Decorative corner hearts */}
              <motion.span
                className="absolute top-2 left-2 text-xl pointer-events-none"
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 1.4, repeat: Infinity }}
              >
                💕
              </motion.span>
              <motion.span
                className="absolute bottom-2 right-2 text-xl pointer-events-none"
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 1.4, repeat: Infinity, delay: 0.7 }}
              >
                💕
              </motion.span>

              {/* XOXO wax seal stamp */}
              <motion.div
                className="absolute -top-4 -right-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-rose to-[#c94a5e] shadow-lg"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
              >
                <span className="font-hand text-sm font-bold text-white">XOXO</span>
              </motion.div>

              <button
                onClick={() => setOpen(false)}
                aria-label="Close"
                className="absolute right-4 top-4 text-ink-soft transition-colors hover:text-ink z-10"
              >
                <X size={20} />
              </button>

              {/* Love stamp icon */}
              <motion.div
                className="mb-4 flex justify-center"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-rose/10">
                  <Heart size={24} className="text-rose" fill="#E1637A" />
                </div>
              </motion.div>

              <motion.p
                className="font-hand text-2xl leading-relaxed text-ink whitespace-pre-line"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                {SURPRISE_MESSAGE}
              </motion.p>
              <motion.p
                className="mt-4 text-right font-display italic text-ink-soft"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                — always in your corner 💛
              </motion.p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
