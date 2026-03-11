"use client";

import { motion } from "framer-motion";
import {
  MapPin,
  ScanLine,
  Shield,
  ArrowRight,
  Sparkles,
  Activity,
  Zap,
} from "lucide-react";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0">
        {/* Grid */}
        <div className="absolute inset-0 bg-grid opacity-40" />
        {/* Radial Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-hero-glow rounded-full blur-3xl" />
        {/* Floating orbs */}
        <motion.div
          animate={{ y: [-20, 20, -20], x: [-10, 10, -10] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/4 w-2 h-2 bg-primary rounded-full blur-sm"
        />
        <motion.div
          animate={{ y: [20, -20, 20], x: [10, -10, 10] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/3 right-1/3 w-3 h-3 bg-primary-glow rounded-full blur-sm opacity-50"
        />
        <motion.div
          animate={{ y: [15, -15, 15] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-1/3 left-1/3 w-1.5 h-1.5 bg-accent-cyan rounded-full blur-sm opacity-60"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <div className="text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-primary/20 mb-8"
          >
            <Sparkles className="w-4 h-4 text-primary-light" />
            <span className="text-sm text-gray-400">
              Healthcare Trust & Financial Lifeline
            </span>
            <Activity className="w-4 h-4 text-primary-light animate-pulse" />
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl sm:text-6xl lg:text-8xl font-bold tracking-tight mb-6"
          >
            <span className="text-white">Your Health.</span>
            <br />
            <span className="gradient-text">Your Shield.</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            From finding the right emergency hospital to exposing fraudulent
            medical bills —{" "}
            <span className="text-white font-medium">TrueCare</span> protects
            your family, physically and financially.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          >
            <a
              href="#navigator"
              className="group relative inline-flex items-center gap-2 px-8 py-4 bg-primary hover:bg-primary-light text-white rounded-xl font-semibold text-lg transition-all duration-300 glow-blue hover:glow-blue-intense"
            >
              <MapPin className="w-5 h-5" />
              Find Emergency Hospital
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#truebill"
              className="group inline-flex items-center gap-2 px-8 py-4 border border-surface-border hover:border-primary/50 text-white rounded-xl font-semibold text-lg transition-all duration-300 hover:bg-white/5"
            >
              <ScanLine className="w-5 h-5 text-primary-light" />
              Scan Your Bill
              <Zap className="w-5 h-5 text-primary-light group-hover:text-yellow-400 transition-colors" />
            </a>
          </motion.div>

          {/* Stats Row */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto"
          >
            {[
              {
                icon: MapPin,
                stat: "10,000+",
                label: "Hospitals Mapped",
                color: "text-primary-light",
              },
              {
                icon: Shield,
                stat: "100%",
                label: "Financial Protection",
                color: "text-accent-green",
              },
              {
                icon: ScanLine,
                stat: "AI-Powered",
                label: "Bill Fraud Detection",
                color: "text-accent-cyan",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                className="glass rounded-xl p-5 card-hover group"
              >
                <item.icon
                  className={`w-6 h-6 ${item.color} mx-auto mb-2 group-hover:scale-110 transition-transform`}
                />
                <div className="text-2xl font-bold text-white mb-1">
                  {item.stat}
                </div>
                <div className="text-sm text-gray-500">{item.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-6 h-10 border-2 border-gray-700 rounded-full flex items-start justify-center p-1.5"
          >
            <div className="w-1.5 h-1.5 bg-primary rounded-full" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
