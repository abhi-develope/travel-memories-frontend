"use client";

import { motion } from "motion/react";
import { Plane, MapPin } from "lucide-react";

const PATH_D = "M20,140 Q220,10 420,120 T780,110";

/**
 * The site's signature visual: a hand-drawn dashed flight route with a
 * little plane gliding along it, and a pin marking where the journey
 * currently is. Deliberately calm — one loop, no jitter, nothing heavy.
 */
export default function FlightPath() {
  return (
    <div className="relative mx-auto w-full max-w-3xl">
      <svg
        viewBox="0 0 800 180"
        className="w-full"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d={PATH_D}
          stroke="#22443F"
          strokeWidth="2"
          className="flight-line"
          opacity="0.45"
        />
        <circle cx="20" cy="140" r="6" fill="#E1637A" />
        <circle cx="780" cy="110" r="6" fill="#E3A23C" />
      </svg>

      {/* Plane gliding along the dashed path */}
      <motion.div
        className="absolute left-0 top-0 text-ink"
        style={{
          offsetPath: `path('${PATH_D}')`,
          offsetRotate: "auto",
        }}
        initial={{ offsetDistance: "0%", opacity: 0 }}
        animate={{ offsetDistance: "100%", opacity: 1 }}
        transition={{
          offsetDistance: { duration: 5, ease: "easeInOut", repeat: Infinity, repeatDelay: 1.2 },
          opacity: { duration: 0.6 },
        }}
      >
        <Plane size={26} className="drop-shadow-sm" fill="#FBF4E6" strokeWidth={1.5} />
      </motion.div>

      {/* Little "you are here" style pin near the endpoint, gently bobbing */}
      <motion.div
        className="absolute -top-2 text-rose"
        style={{ left: "94%" }}
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        <MapPin size={22} fill="#E1637A" className="text-paper" />
      </motion.div>
    </div>
  );
}
