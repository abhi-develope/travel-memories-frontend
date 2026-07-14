"use client";

import { useEffect, useState } from "react";

interface HeartItem {
  id: number;
  emoji: string;
  left: number;
  size: number;
  duration: number;
  delay: number;
}

const HEART_EMOJIS = ["❤️", "💛", "💖", "💕", "💗", "🧡", "💜", "💝", "💘"];

function generateHearts(count: number): HeartItem[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    emoji: HEART_EMOJIS[i % HEART_EMOJIS.length],
    left: Math.random() * 100,
    size: 16 + Math.random() * 24,
    duration: 2.5 + Math.random() * 3,
    delay: Math.random() * 2,
  }));
}

export default function HeartRain({ active }: { active: boolean }) {
  const [hearts, setHearts] = useState<HeartItem[]>([]);

  useEffect(() => {
    if (active) {
      setHearts(generateHearts(30));
    } else {
      setHearts([]);
    }
  }, [active]);

  if (!active || hearts.length === 0) return null;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[60] overflow-hidden"
      aria-hidden="true"
    >
      {hearts.map((heart) => (
        <span
          key={heart.id}
          className="absolute animate-heart-fall"
          style={{
            left: `${heart.left}%`,
            top: "-30px",
            fontSize: `${heart.size}px`,
            animationDuration: `${heart.duration}s`,
            animationDelay: `${heart.delay}s`,
          }}
        >
          {heart.emoji}
        </span>
      ))}
    </div>
  );
}
