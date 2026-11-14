"use client";

import { motion, useReducedMotion } from "framer-motion";
import { usePreferences } from "@/context/preferences";

export function Reveal({ children, className }: { children: React.ReactNode; className?: string }) {
  const systemReduce = useReducedMotion();
  const { prefs } = usePreferences();
  if (systemReduce || prefs.motion === "off") {
    return <div className={className}>{children}</div>;
  }
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.35, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
