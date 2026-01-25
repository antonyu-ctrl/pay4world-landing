"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ReactNode } from "react";

export function Reveal({
  children,
  delay = 0
}: {
  children: ReactNode;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 18 }}
      whileInView={reduce ? {} : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: "easeOut", delay }}
    >
      {children}
    </motion.div>
  );
}

export function Float({
  children,
  delay = 0
}: {
  children: ReactNode;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 10 }}
      animate={reduce ? {} : { opacity: 1, y: [0, -10, 0] }}
      transition={
        reduce
          ? {}
          : { duration: 4.2, repeat: Infinity, ease: "easeInOut", delay }
      }
    >
      {children}
    </motion.div>
  );
}