"use client";

import { useEffect, useRef, useCallback } from "react";

interface Sparkle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  createdAt: number;
}

const SPARKLE_COLORS = ["#E1637A", "#E3A23C", "#6FA6B8", "#FFD700", "#FF69B4"];
const SPARKLE_LIFETIME = 700;

export default function SparkleTrail() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sparklesRef = useRef<Sparkle[]>([]);
  const idCounter = useRef(0);
  const lastPos = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);

  const cleanup = useCallback(() => {
    const now = Date.now();
    sparklesRef.current = sparklesRef.current.filter(
      (s) => now - s.createdAt < SPARKLE_LIFETIME
    );
  }, []);

  const render = useCallback(() => {
    cleanup();
    const container = containerRef.current;
    if (!container) return;

    // Remove old DOM elements
    const children = container.children;
    for (let i = children.length - 1; i >= 0; i--) {
      const el = children[i] as HTMLElement;
      const id = parseInt(el.dataset.id || "0");
      if (!sparklesRef.current.find((s) => s.id === id)) {
        container.removeChild(el);
      }
    }

    // Add new DOM elements
    sparklesRef.current.forEach((s) => {
      if (!container.querySelector(`[data-id="${s.id}"]`)) {
        const el = document.createElement("span");
        el.dataset.id = String(s.id);
        el.textContent = "✨";
        el.style.cssText = `
          position: fixed;
          left: ${s.x}px;
          top: ${s.y}px;
          font-size: ${s.size}px;
          pointer-events: none;
          z-index: 9999;
          animation: sparkle 0.7s ease-out forwards;
        `;
        container.appendChild(el);
      }
    });

    rafRef.current = requestAnimationFrame(render);
  }, [cleanup]);

  useEffect(() => {
    let throttle = false;

    const handleMouseMove = (e: MouseEvent) => {
      if (throttle) return;
      throttle = true;
      setTimeout(() => (throttle = false), 60);

      const dx = e.clientX - lastPos.current.x;
      const dy = e.clientY - lastPos.current.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < 20) return;

      lastPos.current = { x: e.clientX, y: e.clientY };

      const sparkle: Sparkle = {
        id: idCounter.current++,
        x: e.clientX + (Math.random() - 0.5) * 20,
        y: e.clientY + (Math.random() - 0.5) * 20,
        size: 10 + Math.random() * 12,
        color: SPARKLE_COLORS[Math.floor(Math.random() * SPARKLE_COLORS.length)],
        createdAt: Date.now(),
      };

      sparklesRef.current.push(sparkle);
    };

    window.addEventListener("mousemove", handleMouseMove);
    rafRef.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, [render]);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none fixed inset-0 z-[9999]"
      aria-hidden="true"
    />
  );
}
