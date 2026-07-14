"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { Lock, X, Heart, KeyRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import ConfettiBurst from "./ConfettiBurst";
import HeartRain from "./HeartRain";

/**
 * ✏️ PERSONALIZE THESE:
 * 1. SECRET_CODE — the word she needs to type to unlock
 * 2. PHOTO_PATH — path to your special photo in /public
 * 3. LOVE_LETTER — your personal message to her
 * 4. HINT_TEXT — the hint shown to help her guess the code
 */
const SECRET_CODE = "smile";
const PHOTO_PATH = "/secret-photo.jpeg";
const HINT_TEXT = "I'm the fan of your... 💛";
const LOVE_LETTER = `This photo means the world to me.
Every time I look at it, I remember exactly how I felt —
grateful, happy, and so lucky to have you in my life.

No matter how far you travel, no matter how many stamps
fill your passport — just know that this moment, right here,
is my favorite place in the universe.

You and me. Always. 💛`;

const WRONG_RESPONSES = [
  "Hmm, not quite! Try again 💭",
  "So close... but nope! 🙈",
  "That's not it! Here's a hint 👀",
  "Nice try! Think harder 🤔",
  "Nope! But don't give up 💪",
];

export default function SecretPhotoReveal() {
  const [stage, setStage] = useState<
    "hidden" | "lock" | "code" | "revealing" | "revealed"
  >("hidden");
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [attempts, setAttempts] = useState(0);
  const [burst, setBurst] = useState(false);
  const [heartRain, setHeartRain] = useState(false);
  const [showTrigger, setShowTrigger] = useState(false);

  // Show the trigger icon after 30 seconds of browsing
  useEffect(() => {
    const timer = setTimeout(() => setShowTrigger(true), 30000);
    return () => clearTimeout(timer);
  }, []);

  const handleUnlock = () => {
    if (code.trim().toLowerCase() === SECRET_CODE.toLowerCase()) {
      setStage("revealing");
      setBurst(true);
      setHeartRain(true);
      setTimeout(() => setBurst(false), 1600);
      setTimeout(() => setStage("revealed"), 1500);
      setTimeout(() => setHeartRain(false), 6000);
    } else {
      setAttempts((a) => a + 1);
      setError(WRONG_RESPONSES[attempts % WRONG_RESPONSES.length]);
      setCode("");
    }
  };

  const handleClose = () => {
    setStage("hidden");
    setCode("");
    setError("");
  };

  return (
    <>
      {/* ─── Secret trigger: tiny lock icon in bottom-left ─── */}
      <AnimatePresence>
        {showTrigger && stage === "hidden" && (
          <motion.button
            className="fixed bottom-6 left-6 z-[999] flex h-14 w-14 items-center justify-center rounded-full shadow-2xl shadow-glow-rose ring-4 ring-white/80 transition-all hover:brightness-125 hover:scale-110 sm:bottom-8 sm:left-8"
            style={{ background: "linear-gradient(135deg, #E1637A, #E3A23C)" }}
            initial={{ opacity: 0, scale: 0, rotate: -180 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ type: "spring", damping: 15, delay: 0.5 }}
            onClick={() => setStage("lock")}
            aria-label="Secret"
          >
            <motion.div
              animate={{ rotate: [0, -10, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
            >
              <div className="rounded-full bg-white p-1 shadow-lg">
                <Lock size={24} style={{ color: "#E1637A" }} />
              </div>
            </motion.div>
            {/* Strong glow pulse */}
            <motion.div
              className="absolute inset-0 rounded-full border-4"
              style={{ borderColor: "#E3A23C" }}
              animate={{ scale: [1, 1.6, 1], opacity: [0.8, 0, 0.8] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </motion.button>
        )}
      </AnimatePresence>

      {/* ─── Lock teaser modal ─── */}
      <AnimatePresence>
        {stage === "lock" && (
          <motion.div
            className="fixed inset-0 z-[80] flex items-center justify-center bg-ink/50 px-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setStage("hidden")}
          >
            <motion.div
              className="relative max-w-sm w-full rounded-2xl bg-card p-8 shadow-postcard text-center border-2 border-dashed border-kraft"
              initial={{ opacity: 0, scale: 0.6, rotate: -5 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.6 }}
              transition={{ type: "spring", damping: 18 }}
              onClick={(e) => e.stopPropagation()}
            >
              <motion.div
                className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full shadow-glow-rose"
                style={{
                  background: "linear-gradient(135deg, #E1637A, #E3A23C)",
                }}
                animate={{ rotate: [0, -8, 8, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
              >
                <div className="rounded-full bg-white p-2 shadow-lg">
                  <Lock size={28} style={{ color: "#E1637A" }} />
                </div>
              </motion.div>

              <h3 className="font-display text-2xl italic text-ink">
                You found a secret! 🤫
              </h3>
              <p className="mt-2 font-hand text-lg text-ink-soft">
                There&apos;s something very special hidden here...
                <br />
                Do you know the secret word?
              </p>

              <Button
                variant="rose"
                className="mt-5 rounded-full"
                onClick={() => setStage("code")}
              >
                <KeyRound size={16} /> I think I know it!
              </Button>
              <button
                className="mt-3 block w-full text-center text-sm text-ink-soft/60 hover:text-ink-soft"
                onClick={() => setStage("hidden")}
              >
                Maybe later...
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── Code entry modal ─── */}
      <AnimatePresence>
        {stage === "code" && (
          <motion.div
            className="fixed inset-0 z-[80] flex items-center justify-center bg-ink/50 px-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setStage("hidden")}
          >
            <motion.div
              className="relative max-w-sm w-full rounded-2xl bg-card p-8 shadow-postcard text-center border-2 border-dashed border-kraft"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
              transition={{ type: "spring", damping: 18 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                <ConfettiBurst active={burst} />
              </div>

              <motion.span
                className="text-4xl inline-block mb-3"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                🔐
              </motion.span>

              <h3 className="font-display text-xl italic text-ink">
                Enter the secret word
              </h3>
              <p className="mt-1 font-hand text-base text-ink-soft/70">
                Hint: {HINT_TEXT}
              </p>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleUnlock();
                }}
                className="mt-5"
              >
                <input
                  type="text"
                  value={code}
                  onChange={(e) => {
                    setCode(e.target.value);
                    setError("");
                  }}
                  placeholder="Type the secret word..."
                  className="w-full rounded-full border-2 border-kraft bg-paper px-5 py-3 text-center font-hand text-xl text-ink placeholder:text-ink-soft/40 focus:border-rose focus:outline-none"
                  autoFocus
                />
                {error && (
                  <motion.p
                    className="mt-2 font-hand text-base text-rose"
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    {error}
                  </motion.p>
                )}
                <Button
                  type="submit"
                  variant="rose"
                  className="mt-4 w-full rounded-full"
                  disabled={!code.trim()}
                >
                  <Heart size={16} /> Unlock
                </Button>
              </form>

              <button
                className="mt-3 text-sm text-ink-soft/50 hover:text-ink-soft"
                onClick={() => setStage("hidden")}
              >
                Go back
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── Heart rain ─── */}
      <HeartRain active={heartRain} />

      {/* ─── The grand reveal ─── */}
      <AnimatePresence>
        {(stage === "revealing" || stage === "revealed") && (
          <motion.div
            className="fixed inset-0 z-[90] flex items-center justify-center overflow-y-auto bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460] px-4 py-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Close button */}
            <button
              onClick={handleClose}
              className="fixed top-5 right-5 z-[95] text-white/50 hover:text-white transition-colors"
              aria-label="Close"
            >
              <X size={24} />
            </button>

            <motion.div
              className="relative w-full max-w-6xl"
              initial={{ opacity: 0, y: 40, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
            >
              {/* Sparkles around the photo */}
              {["✨", "⭐", "💫", "🌟", "✨", "💛"].map((s, i) => (
                <motion.span
                  key={i}
                  className="absolute text-xl pointer-events-none"
                  style={{
                    left: `${(i * 20 + 5) % 95}%`,
                    top: `${(i * 15) % 80}%`,
                  }}
                  animate={{
                    opacity: [0, 1, 0],
                    scale: [0.5, 1.3, 0.5],
                    rotate: [0, 180, 360],
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    delay: i * 0.4,
                  }}
                >
                  {s}
                </motion.span>
              ))}

              <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:gap-8">
                {/* Photo frame */}
                <motion.div
                  className="relative mx-auto w-full max-w-[520px] overflow-hidden rounded-[1.75rem] bg-[#fffaf2] p-2 shadow-[0_20px_60px_rgba(0,0,0,0.4)] sm:p-3 lg:w-[46%] lg:flex-shrink-0"
                  initial={{ rotateY: 90 }}
                  animate={{ rotateY: 0 }}
                  transition={{ delay: 0.8, duration: 0.8, ease: "easeOut" }}
                  style={{ transformPerspective: 1200 }}
                >
                  {/* Golden border glow */}
                  <div className="absolute inset-0 rounded-[1.75rem] border-4 border-[#ffd700]/30 pointer-events-none z-10" />

                  <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[1.2rem] border border-[#eadfcf] bg-[#f8f1e6] shadow-inner sm:aspect-[3/4] lg:aspect-[4/5]">
                    <Image
                      src={PHOTO_PATH}
                      alt="Our special memory"
                      fill
                      className="object-contain"
                      sizes="(max-width: 640px) 90vw, 500px"
                      priority
                      style={{ objectPosition: "center" }}
                    />
                    <div className="pointer-events-none absolute inset-0 rounded-[1.2rem] bg-gradient-to-t from-black/5 via-transparent to-white/20" />
                  </div>

                  {/* "Us" badge on the photo */}
                  <motion.div
                    className="absolute top-4 right-4 z-20 flex items-center gap-1.5 rounded-full bg-gradient-to-r from-rose to-[#ff8fab] px-4 py-1.5 font-hand text-base text-white shadow-lg sm:top-5 sm:right-5"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 1.5, type: "spring" }}
                  >
                    <motion.span
                      animate={{ scale: [1, 1.3, 1] }}
                      transition={{ duration: 1.4, repeat: Infinity }}
                    >
                      ❤️‍🔥
                    </motion.span>
                    Us, forever
                  </motion.div>
                </motion.div>

                {/* Love letter */}
                <motion.div
                  className="w-full rounded-2xl border-2 border-dashed border-white/20 bg-white/10 p-6 backdrop-blur-sm lg:w-[54%]"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.8, duration: 0.8 }}
                >
                  <motion.div
                    className="mb-3 flex justify-center"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 2, type: "spring" }}
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-rose/20">
                      <Heart size={24} className="text-rose" fill="#E1637A" />
                    </div>
                  </motion.div>

                  <motion.p
                    className="font-hand text-xl leading-relaxed text-white/90 whitespace-pre-line text-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2.3, duration: 0.8 }}
                  >
                    {LOVE_LETTER}
                  </motion.p>

                  <motion.p
                    className="mt-5 text-center font-display italic text-white/50 text-lg"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 3 }}
                  >
                    — your{" "}
                    <span className="font-bold text-red-600">chutiya</span>,
                    always and forever 💛
                  </motion.p>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
