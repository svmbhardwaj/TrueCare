"use client";

import { motion } from "framer-motion";
import {
  XCircle,
  CheckCircle,
  Zap,
  ShieldCheck,
  Users,
  ArrowRight,
  Clock,
  Search,
  FileX,
  AlertTriangle,
} from "lucide-react";

const comparisons = [
  {
    competitor: "Practo & Similar Apps",
    icon: XCircle,
    problems: [
      "Built for elective check-ups, not emergencies",
      "Cluttered UI useless at 2 AM panic",
      "No insurance/scheme filtering",
      "Zero post-admission protection",
    ],
  },
  {
    competitor: "Government Portals",
    icon: XCircle,
    problems: [
      "Notoriously outdated hospital listings",
      "Expired empanelments still shown",
      "No real-time bed availability",
      "No financial auditing tools",
    ],
  },
  {
    competitor: "Insurance Company Apps",
    icon: XCircle,
    problems: [
      "Only show their own network",
      "No cross-scheme comparison",
      "No fraud detection for patients",
      "Not designed for emergencies",
    ],
  },
];

const usps = [
  {
    icon: Zap,
    title: "Total Financial Predictability",
    description:
      "The only platform ensuring financial safety from start to finish — routing you to in-network hospitals first, auditing bills with AI later.",
    color: "text-blue-400",
    gradient: "from-blue-500/10 to-blue-600/5",
  },
  {
    icon: ShieldCheck,
    title: "HealthTech + FinTech Fusion",
    description:
      "Not just a hospital directory — a consumer protection engine. Rigorous financial data-structuring applied to messy healthcare receipts.",
    color: "text-cyan-400",
    gradient: "from-cyan-500/10 to-blue-600/5",
  },
  {
    icon: Users,
    title: "Community-Verified Reality",
    description:
      "Because official data is often outdated, we use crowdsourced trust badges from real patients who've been there recently.",
    color: "text-green-400",
    gradient: "from-green-500/10 to-emerald-600/5",
  },
];

export default function WhyUs() {
  return (
    <section id="why-us" className="relative py-24 lg:py-32">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-surface to-black" />
        <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-red-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1 text-xs font-medium text-yellow-400 border border-yellow-500/20 rounded-full mb-4 tracking-wider uppercase">
            <AlertTriangle className="w-3 h-3" />
            Why Existing Platforms Fail
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            We Built What{" "}
            <span className="gradient-text-blue">Others Couldn&apos;t</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Existing solutions are fragmented, outdated, and abandon patients
            the moment they step into a hospital. TrueCare is different.
          </p>
        </motion.div>

        {/* Problem Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-20">
          {comparisons.map((comp, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="rounded-2xl border border-red-500/10 bg-red-500/[0.02] p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center">
                  <comp.icon className="w-5 h-5 text-red-400" />
                </div>
                <h3 className="font-semibold text-white">{comp.competitor}</h3>
              </div>
              <ul className="space-y-3">
                {comp.problems.map((problem, j) => (
                  <li
                    key={j}
                    className="flex items-start gap-2 text-sm text-gray-500"
                  >
                    <XCircle className="w-4 h-4 text-red-500/60 flex-shrink-0 mt-0.5" />
                    {problem}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Divider */}
        <div className="flex items-center gap-4 mb-16 max-w-lg mx-auto">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent to-primary/30" />
          <span className="text-primary-light text-sm font-medium px-4 py-1.5 border border-primary/20 rounded-full">
            TrueCare is Different
          </span>
          <div className="flex-1 h-px bg-gradient-to-l from-transparent to-primary/30" />
        </div>

        {/* USP Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {usps.map((usp, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`rounded-2xl border border-surface-border bg-gradient-to-br ${usp.gradient} p-6 card-hover`}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <usp.icon className={`w-5 h-5 ${usp.color}`} />
                </div>
                <h3 className="font-semibold text-white">{usp.title}</h3>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed mb-4">
                {usp.description}
              </p>
              <div className="flex items-center gap-1 text-sm text-primary-light">
                <CheckCircle className="w-4 h-4" />
                <span>Only on TrueCare</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Comparison Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <h3 className="text-xl font-semibold text-white text-center mb-8">
            Your Emergency Journey: Others vs TrueCare
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Without TrueCare */}
            <div className="rounded-2xl border border-red-500/10 bg-red-500/[0.02] p-6">
              <div className="flex items-center gap-2 mb-5 text-red-400">
                <FileX className="w-5 h-5" />
                <span className="font-semibold">Without TrueCare</span>
              </div>
              <div className="space-y-4">
                {[
                  { time: "0 min", text: "Emergency occurs", icon: AlertTriangle },
                  { time: "15 min", text: "Googling nearby hospitals", icon: Search },
                  { time: "45 min", text: "Hospital denies insurance", icon: XCircle },
                  { time: "60 min", text: "Searching for another hospital", icon: Clock },
                  { time: "After", text: "Overcharged bill goes unnoticed", icon: FileX },
                ].map((step, j) => (
                  <div key={j} className="flex items-center gap-3">
                    <div className="w-16 text-right text-xs text-gray-600 font-mono">
                      {step.time}
                    </div>
                    <div className="w-8 h-8 rounded-full bg-red-500/10 flex items-center justify-center flex-shrink-0">
                      <step.icon className="w-4 h-4 text-red-400" />
                    </div>
                    <span className="text-sm text-gray-400">{step.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* With TrueCare */}
            <div className="rounded-2xl border border-green-500/10 bg-green-500/[0.02] p-6">
              <div className="flex items-center gap-2 mb-5 text-green-400">
                <CheckCircle className="w-5 h-5" />
                <span className="font-semibold">With TrueCare</span>
              </div>
              <div className="space-y-4">
                {[
                  { time: "0 min", text: "Emergency occurs", icon: AlertTriangle },
                  { time: "1 min", text: "Open TrueCare → Select need + scheme", icon: Zap },
                  { time: "2 min", text: "Navigate to verified hospital", icon: CheckCircle },
                  { time: "3 min", text: "Admitted with confirmed coverage", icon: ShieldCheck },
                  { time: "After", text: "AI audits bill & catches overcharges", icon: CheckCircle },
                ].map((step, j) => (
                  <div key={j} className="flex items-center gap-3">
                    <div className="w-16 text-right text-xs text-gray-600 font-mono">
                      {step.time}
                    </div>
                    <div className="w-8 h-8 rounded-full bg-green-500/10 flex items-center justify-center flex-shrink-0">
                      <step.icon className="w-4 h-4 text-green-400" />
                    </div>
                    <span className="text-sm text-gray-400">{step.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <a
            href="#navigator"
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary hover:bg-primary-light text-white rounded-xl font-semibold text-lg transition-all duration-300 glow-blue hover:glow-blue-intense group"
          >
            Try TrueCare Now
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
