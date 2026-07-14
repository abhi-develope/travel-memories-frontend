"use client";

import { motion, AnimatePresence } from "motion/react";
import { Plane, Camera, Heart, Compass, Palmtree, Star } from "lucide-react";

const ICONS = [Plane, Camera, Heart, Compass, Palmtree, Star];
const COLORS = ["#E1637A", "#E3A23C", "#6FA6B8", "#22443F"];

interface Particle {
  id: number;
  Icon: (typeof ICONS)[number];
  color: string;
  x: number;
  rotate: number;
  delay: number;
  size: number;
}

function makeParticles(count: number): Particle[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    Icon: ICONS[i % ICONS.length],
    color: COLORS[i % COLORS.length],
    x: (Math.random() - 0.5) * 420,
    rotate: (Math.random() - 0.5) * 200,
    delay: Math.random() * 0.15,
    size: 16 + Math.random() * 14,
  }));
}

export default function ConfettiBurst({ active }: { active: boolean }) {
  const particles = active ? makeParticles(18) : [];

  return (
    <div className="pointer-events-none absolute inset-0 overflow-visible">
      <AnimatePresence>
        {active &&
          particles.map((p) => (
            <motion.span
              key={p.id}
              className="absolute left-1/2 top-1/2"
              style={{ color: p.color }}
              initial={{ opacity: 1, x: 0, y: 0, rotate: 0, scale: 0.6 }}
              animate={{
                opacity: 0,
                x: p.x,
                y: -160 - Math.random() * 100,
                rotate: p.rotate,
                scale: 1,
              }}
              transition={{ duration: 1.4, delay: p.delay, ease: "easeOut" }}
            >
              <p.Icon size={p.size} fill={p.color} strokeWidth={1} />
            </motion.span>
          ))}
      </AnimatePresence>
    </div>
  );
}
