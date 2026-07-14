"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";

const TRAVEL_QUOTES = [
  // Inspirational
  { text: "Not all who wander are lost ✨", emoji: "🧭" },
  { text: "Collect moments, not things 📸", emoji: "💫" },
  { text: "Adventure is out there! 🎈", emoji: "🏔️" },
  { text: "Take only memories, leave only footprints 👣", emoji: "🌿" },
  { text: "Life is short and the world is wide 🌍", emoji: "🌅" },
  { text: "Go where you feel most alive 🌊", emoji: "🏖️" },
  { text: "Travel far enough to meet yourself 🪞", emoji: "🌸" },
  // Funny & cheeky
  { text: "My wallet is crying but my soul is vibing 💸", emoji: "😂" },
  { text: "I need vitamin SEA 🌊", emoji: "🐠" },
  { text: "Jet lag is just your soul catching up with your body ✈️", emoji: "😴" },
  { text: "Will travel for food. Literally. 🍕", emoji: "🤤" },
  { text: "Sorry, I can't hear you over the sound of the ocean 🌊", emoji: "🐚" },
  { text: "BRB… chasing sunsets again 🏃‍♀️", emoji: "🌇" },
  { text: "My favorite exercise? Running through airports! 🏃", emoji: "✈️" },
  { text: "I googled my symptoms. Turns out I just need a vacation 🩺", emoji: "🏖️" },
  { text: "Calories don't count when you're traveling. Science. 🧪", emoji: "🍦" },
  { text: "Out of office. Out of country. Out of my mind. 🤪", emoji: "🌴" },
  { text: "Current mood: somewhere between 'pack everything' and 'lose my passport' 🧳", emoji: "😅" },
  { text: "Do I need another trip? No. Am I booking one? Absolutely. 💅", emoji: "🛫" },
  { text: "Plot twist: the best souvenir is the tan lines 😎", emoji: "☀️" },
  // Sweet & cute
  { text: "Wander often, wonder always 💭", emoji: "🦋" },
  { text: "Every sunset is an opportunity to reset 🌇", emoji: "🧡" },
  { text: "Jobs fill your pocket, adventures fill your soul 💛", emoji: "🎒" },
  { text: "I haven't been everywhere, but it's on my list 📝", emoji: "🗺️" },
  { text: "Somewhere between here and happy 🥰", emoji: "💕" },
  { text: "Getting lost is just another way of finding yourself 🔮", emoji: "🌌" },
  { text: "Passport stamps > everything else in life 🛂", emoji: "🌟" },
  { text: "The only trip you'll regret is the one you don't take 💫", emoji: "🧳" },
  { text: "You've got a friend in every timezone now! 🕐", emoji: "💛" },
  // Silly observations
  { text: "Packing tip: bring half the clothes and twice the snacks 🍿", emoji: "🎒" },
  { text: "Google Maps says 5 minutes… sure, Jan 😒", emoji: "📍" },
  { text: "Airplane mode: the only mode I want in life ✈️", emoji: "📱" },
  { text: "Just realized 'travel light' doesn't mean fewer feelings 💀", emoji: "🧳" },
  { text: "WiFi password is the first thing I ask at any hotel 👀", emoji: "🏨" },
  { text: "My suitcase: 70% outfits I won't wear, 30% panic 😂", emoji: "👗" },
];

/* Positions where toasts can appear — keeps it dynamic and fun */
const POSITIONS = [
  { className: "fixed bottom-6 left-6", from: { x: -40, y: 20 } },
  { className: "fixed bottom-6 left-1/2 -translate-x-1/2", from: { x: 0, y: 40 } },
  { className: "fixed top-20 right-6", from: { x: 40, y: -20 } },
  { className: "fixed top-20 left-6", from: { x: -40, y: -20 } },
  { className: "fixed top-1/3 right-6", from: { x: 40, y: 0 } },
  { className: "fixed bottom-24 right-20", from: { x: 40, y: 20 } },
];

export default function FunQuoteToast() {
  const [visible, setVisible] = useState(false);
  const [quote, setQuote] = useState(TRAVEL_QUOTES[0]);
  const [position, setPosition] = useState(POSITIONS[0]);
  const usedIndices = useRef<Set<number>>(new Set());

  useEffect(() => {
    const showQuote = () => {
      // Pick a quote she hasn't seen recently
      if (usedIndices.current.size >= TRAVEL_QUOTES.length) {
        usedIndices.current.clear();
      }
      const available = TRAVEL_QUOTES.map((_, i) => i).filter(
        (i) => !usedIndices.current.has(i)
      );
      const pick = available[Math.floor(Math.random() * available.length)];
      usedIndices.current.add(pick);

      setQuote(TRAVEL_QUOTES[pick]);
      setPosition(POSITIONS[Math.floor(Math.random() * POSITIONS.length)]);
      setVisible(true);
      setTimeout(() => setVisible(false), 4500);
    };

    // First quote after 8 seconds
    const initialTimer = setTimeout(showQuote, 8000);

    // Then every 20–35 seconds
    const interval = setInterval(
      showQuote,
      20000 + Math.random() * 15000
    );

    return () => {
      clearTimeout(initialTimer);
      clearInterval(interval);
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className={`${position.className} z-[55] max-w-xs cursor-pointer`}
          initial={{
            opacity: 0,
            x: position.from.x,
            y: position.from.y,
            scale: 0.7,
            rotate: (Math.random() - 0.5) * 10,
          }}
          animate={{
            opacity: 1,
            x: 0,
            y: 0,
            scale: 1,
            rotate: 0,
          }}
          exit={{
            opacity: 0,
            scale: 0.7,
            y: position.from.y * 0.5,
          }}
          transition={{ type: "spring", damping: 18, stiffness: 180 }}
          onClick={() => setVisible(false)}
        >
          <div className="rounded-2xl border-2 border-dashed border-kraft bg-card/95 px-4 py-3 shadow-postcard backdrop-blur-sm">
            <div className="flex items-start gap-3">
              <motion.span
                className="text-2xl flex-shrink-0 mt-0.5"
                animate={{
                  rotate: [0, 12, -12, 8, 0],
                  scale: [1, 1.15, 1, 1.1, 1],
                }}
                transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 0.5 }}
              >
                {quote.emoji}
              </motion.span>
              <div>
                <p className="font-hand text-lg leading-snug text-ink">
                  {quote.text}
                </p>
                <p className="mt-1 text-xs text-ink-soft/50">tap to dismiss</p>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
