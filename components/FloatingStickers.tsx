"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

type Sticker = {
  top: string;
  left: string;
  size: number;
  x: string;
  y: string;
  delay: number;
  rotate: number;
};

export default function FloatingStickers({
  src,
  stickers
}: {
  src: string;
  stickers: Sticker[];
}) {
  const reduce = useReducedMotion();

  return (
    <div className="pointer-events-none absolute inset-0 hidden lg:block">
      {stickers.map((s, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{ top: s.top, left: s.left, width: s.size, height: s.size }}
          initial={reduce ? false : { opacity: 0, y: 10 }}
          animate={reduce ? {} : { opacity: 1, y: [0, -10, 0] }}
          transition={
            reduce
              ? {}
              : {
                  duration: 4 + (i % 3),
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: s.delay
                }
          }
        >
          <div
            className="relative h-full w-full overflow-hidden rounded-3xl border border-white/40 bg-white/30 shadow-glow backdrop-blur"
            style={{ transform: `rotate(${s.rotate}deg)` }}
          >
            <Image
              src={src}
              alt="sticker"
              fill
              className="object-cover"
              style={{
                objectPosition: `${s.x} ${s.y}`,
                transform: "scale(1.85)"
              }}
            />
          </div>
        </motion.div>
      ))}
    </div>
  );
}