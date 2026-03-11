"use client";

import { motion } from "framer-motion";
import {
  MapPin,
  ScanLine,
  Shield,
  BadgeCheck,
  Smartphone,
  Zap,
} from "lucide-react";

const features = [
  {
    icon: MapPin,
    title: "Smart Emergency Navigator",
    description:
      "Filter nearby hospitals by medical need AND financial compatibility. Find trauma centers, ICUs, or maternity wards that accept your exact coverage.",
    color: "from-blue-500 to-blue-700",
    iconColor: "text-blue-400",
    borderColor: "border-blue-500/20",
    hoverGlow: "hover:shadow-blue-500/10",
  },
  {
    icon: ScanLine,
    title: 'AI "True Bill" Scanner',
    description:
      "Snap a photo of your hospital bill. Our ML pipeline extracts line items, cross-references tax rules, and exposes hidden overcharges instantly.",
    color: "from-cyan-500 to-blue-600",
    iconColor: "text-cyan-400",
    borderColor: "border-cyan-500/20",
    hoverGlow: "hover:shadow-cyan-500/10",
  },
  {
    icon: Shield,
    title: "End-to-End Protection",
    description:
      "From emergency routing to discharge billing — we protect your family's health and finances throughout the entire hospital journey.",
    color: "from-blue-600 to-indigo-600",
    iconColor: "text-blue-300",
    borderColor: "border-blue-400/20",
    hoverGlow: "hover:shadow-blue-400/10",
  },
  {
    icon: BadgeCheck,
    title: "Community Trust Badges",
    description:
      "Real users verify hospital claims. If a hospital successfully processes Ayushman cards without hassle, it earns a verified community trust badge.",
    color: "from-green-500 to-emerald-600",
    iconColor: "text-green-400",
    borderColor: "border-green-500/20",
    hoverGlow: "hover:shadow-green-500/10",
  },
  {
    icon: Smartphone,
    title: "WhatsApp Bot (Coming Soon)",
    description:
      "In a real emergency, nobody downloads apps. Drop your location on WhatsApp and get instant hospital routing and bill scanning.",
    color: "from-emerald-500 to-teal-600",
    iconColor: "text-emerald-400",
    borderColor: "border-emerald-500/20",
    hoverGlow: "hover:shadow-emerald-500/10",
  },
  {
    icon: Zap,
    title: "Insurance API Integration",
    description:
      "Enter your policy number and instantly see exact room-rent capping, covered procedures, and benefits at the nearest hospital.",
    color: "from-yellow-500 to-orange-500",
    iconColor: "text-yellow-400",
    borderColor: "border-yellow-500/20",
    hoverGlow: "hover:shadow-yellow-500/10",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

export default function Features() {
  return (
    <section id="features" className="relative py-24 lg:py-32">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-surface to-black" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-3 py-1 text-xs font-medium text-primary-light border border-primary/20 rounded-full mb-4 tracking-wider uppercase">
            Platform Features
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            A Complete Medical &{" "}
            <span className="gradient-text-blue">Financial Lifeline</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Two powerful systems working together to protect patients from the
            moment an emergency starts until the final bill is cleared.
          </p>
        </motion.div>

        {/* Feature Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              className={`group relative rounded-2xl border ${feature.borderColor} bg-surface-card p-7 card-hover ${feature.hoverGlow} hover:shadow-2xl`}
            >
              {/* Icon */}
              <div
                className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} mb-5 group-hover:scale-110 transition-transform duration-300`}
              >
                <feature.icon className="w-6 h-6 text-white" />
              </div>

              {/* Content */}
              <h3 className="text-lg font-semibold text-white mb-3 group-hover:text-primary-glow transition-colors">
                {feature.title}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                {feature.description}
              </p>

              {/* Hover line */}
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-b-2xl" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
