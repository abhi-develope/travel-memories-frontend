"use client";

import { motion } from "motion/react";
import Link from "next/link";
import FlightPath from "./FlightPath";
import SurpriseButton from "./SurpriseButton";
import { Button } from "@/components/ui/button";
import { Camera } from "lucide-react";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function Hero() {
  return (
    <section className="relative overflow-hidden px-6 pb-10 pt-16 sm:pt-24">
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="mx-auto max-w-3xl text-center"
      >
        <motion.span
          variants={item}
          className="inline-block rounded-full border-2 border-dashed border-kraft bg-paper-dark px-4 py-1 font-hand text-lg text-ink-soft"
        >
          a little postcard, just for you
        </motion.span>

        <motion.h1
          variants={item}
          className="mt-6 font-display text-4xl italic leading-tight text-ink sm:text-6xl text-balance"
        >
          Wish you were here —
          <br className="hidden sm:block" /> but I love that you're{" "}
          <span className="text-rose not-italic">out there</span>.
        </motion.h1>

        <motion.p
          variants={item}
          className="mx-auto mt-5 max-w-xl text-base text-ink-soft sm:text-lg"
        >
          A shared scrapbook for us — the trips we've already had, and every
          new one you're about to collect. Add photos as you go, and I'll be
          right here, cheering from your phone screen.
        </motion.p>

        <motion.div variants={item} className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link href="/upload">
            <Button size="lg" variant="default" className="rounded-full">
              <Camera size={18} />
              Drop a new memory
            </Button>
          </Link>
          <Link href="/memories">
            <Button size="lg" variant="outline" className="rounded-full">
              Browse memories
            </Button>
          </Link>
        </motion.div>

        <motion.div variants={item} className="mt-6 flex justify-center">
          <SurpriseButton />
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="mt-16"
      >
        <FlightPath />
      </motion.div>
    </section>
  );
}
