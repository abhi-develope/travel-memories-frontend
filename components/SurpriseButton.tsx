"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Gift, X } from "lucide-react";
import ConfettiBurst from "./ConfettiBurst";
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

  const handleTap = () => {
    setBurst(true);
    setOpen(true);
    window.setTimeout(() => setBurst(false), 1600);
  };

  return (
    <div className="relative flex flex-col items-center">
      <div className="relative">
        <ConfettiBurst active={burst} />
        <motion.div
          animate={!open ? { rotate: [0, -3, 3, -3, 0] } : { rotate: 0 }}
          transition={{ duration: 1.6, repeat: open ? 0 : Infinity, repeatDelay: 2 }}
        >
          <Button
            variant="rose"
            size="lg"
            onClick={handleTap}
            className="rounded-full shadow-postcard"
          >
            <Gift size={20} />
            Tap for a surprise
          </Button>
        </motion.div>
      </div>

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
              className="relative max-w-md rounded-lg border-2 border-dashed border-kraft bg-card p-8 shadow-postcard"
              initial={{ opacity: 0, rotateY: 90, scale: 0.85 }}
              animate={{ opacity: 1, rotateY: 0, scale: 1 }}
              exit={{ opacity: 0, rotateY: -90, scale: 0.85 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              style={{ transformPerspective: 1000 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setOpen(false)}
                aria-label="Close"
                className="absolute right-4 top-4 text-ink-soft transition-colors hover:text-ink"
              >
                <X size={20} />
              </button>
              <p className="font-hand text-2xl leading-relaxed text-ink whitespace-pre-line">
                {SURPRISE_MESSAGE}
              </p>
              <p className="mt-4 text-right font-display italic text-ink-soft">— always in your corner</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
