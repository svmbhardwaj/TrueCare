"use client";

import { motion } from "framer-motion";
import {
  Shield,
  MapPin,
  ScanLine,
  BadgeCheck,
  Heart,
  Zap,
  Users,
  FileCheck,
} from "lucide-react";

const items = [
  { icon: Shield, text: "End-to-End Protection" },
  { icon: MapPin, text: "10,000+ Hospitals" },
  { icon: ScanLine, text: "AI Bill Scanner" },
  { icon: BadgeCheck, text: "Community Verified" },
  { icon: Heart, text: "Patient First" },
  { icon: Zap, text: "Instant Results" },
  { icon: Users, text: "50K+ Users" },
  { icon: FileCheck, text: "Tax Validation" },
];

export default function Marquee() {
  return (
    <div className="relative py-8 overflow-hidden border-y border-surface-border bg-surface/50">
      {/* Left fade */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black to-transparent z-10" />
      {/* Right fade */}
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black to-transparent z-10" />

      <motion.div
        animate={{ x: [0, -1600] }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 30,
            ease: "linear",
          },
        }}
        className="flex gap-8 whitespace-nowrap"
      >
        {/* Duplicate items for seamless loop */}
        {[...items, ...items, ...items].map((item, i) => (
          <div
            key={i}
            className="flex items-center gap-2 px-4 py-2 rounded-full glass border border-surface-border"
          >
            <item.icon className="w-4 h-4 text-primary-light" />
            <span className="text-sm text-gray-400 font-medium">
              {item.text}
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
