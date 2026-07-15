"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Gamepad2 } from "lucide-react";
import TravelMatchGame from "./TravelMatchGame";

export default function FloatingGameButton() {
  const [gameOpen, setGameOpen] = useState(false);

  return (
    <>
      {/* Floating button — fixed bottom-right */}
      <motion.button
        onClick={() => setGameOpen(true)}
        className="fixed bottom-4 right-4 z-[50] flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-gradient-to-br from-rose to-[#ff8fab] text-white shadow-lg hover:shadow-xl transition-shadow"
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.9 }}
        animate={{
          y: [0, -6, 0],
          boxShadow: [
            "0 4px 14px rgba(225, 99, 122, 0.3)",
            "0 8px 24px rgba(225, 99, 122, 0.5)",
            "0 4px 14px rgba(225, 99, 122, 0.3)",
          ],
        }}
        transition={{
          y: { duration: 2, repeat: Infinity, ease: "easeInOut" },
          boxShadow: { duration: 2, repeat: Infinity, ease: "easeInOut" },
        }}
        aria-label="Play a fun game"
      >
        <Gamepad2 size={24} />
        {/* Notification dot */}
        <motion.span
          className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-mustard text-[10px] font-bold text-ink"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          !
        </motion.span>
      </motion.button>

      {/* Tooltip that appears on first load */}
      <GameTooltip />

      {/* Game modal */}
      <AnimatePresence>
        {gameOpen && <TravelMatchGame onClose={() => setGameOpen(false)} />}
      </AnimatePresence>
    </>
  );
}

function GameTooltip() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => setShow(false), 6000);

    return () => window.clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed bottom-[72px] right-4 z-[50] max-w-[180px] sm:bottom-[84px] sm:right-6"
          initial={{ opacity: 0, y: 10, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.9 }}
          transition={{ delay: 2, type: "spring" }}
        >
          <div className="rounded-xl bg-ink px-3 py-2 text-center text-xs text-paper shadow-lg">
            <p className="font-hand text-sm">Psst! Play a game 🎮✨</p>
            {/* Arrow */}
            <div className="absolute -bottom-1.5 right-4 h-3 w-3 rotate-45 bg-ink" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
