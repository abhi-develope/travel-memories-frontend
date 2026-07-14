"use client";

import { useEffect, useState } from "react";

const TRAVEL_EMOJIS = [
  "✈️", "🌍", "🧳", "🗺️", "🏖️", "⛰️", "🌸", "🐚",
  "🎒", "📸", "🌅", "🏔️", "🚂", "🌺", "🦋", "⭐",
  "🌙", "🎠", "🧭", "🪁", "🎪", "🌈", "☀️", "🍦",
];

interface FloatingItem {
  id: number;
  emoji: string;
  left: number;
  size: number;
  duration: number;
  delay: number;
  animClass: string;
  swayX: number;
}

function generateItems(count: number): FloatingItem[] {
  const animations = ["animate-float-1", "animate-float-2", "animate-float-3"];
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    emoji: TRAVEL_EMOJIS[i % TRAVEL_EMOJIS.length],
    left: Math.random() * 100,
    size: 16 + Math.random() * 20,
    duration: 14 + Math.random() * 18,
    delay: Math.random() * 20,
    animClass: animations[i % animations.length],
    swayX: (Math.random() - 0.5) * 120,
  }));
}

export default function FloatingElements() {
  const [items, setItems] = useState<FloatingItem[]>([]);

  useEffect(() => {
    setItems(generateItems(20));
  }, []);

  if (items.length === 0) return null;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      aria-hidden="true"
    >
      {items.map((item) => (
        <span
          key={item.id}
          className={item.animClass}
          style={{
            position: "absolute",
            left: `${item.left}%`,
            bottom: `-${40 + Math.random() * 30}px`,
            fontSize: `${item.size}px`,
            animationDuration: `${item.duration}s`,
            animationDelay: `${item.delay}s`,
            filter: "blur(0.3px)",
          }}
        >
          {item.emoji}
        </span>
      ))}
    </div>
  );
}
