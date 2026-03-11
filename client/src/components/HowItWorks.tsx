"use client";

import { motion } from "framer-motion";
import {
  MapPin,
  Camera,
  Cpu,
  FileCheck,
  Navigation,
  ShieldCheck,
  ArrowDown,
} from "lucide-react";

const steps = [
  {
    phase: "Emergency Navigator",
    color: "from-blue-500 to-blue-700",
    borderColor: "border-blue-500/30",
    bgColor: "bg-blue-500/5",
    steps: [
      {
        icon: MapPin,
        title: "Select Your Need",
        description:
          "Choose your medical requirement — Trauma, ICU, Maternity, Neurology, Orthopedic, or General Medicine.",
        detail: "One-tap selection designed for high-stress situations",
      },
      {
        icon: ShieldCheck,
        title: "Choose Your Coverage",
        description:
          "Select your insurance or government scheme — Ayushman Bharat, CGHS, ESIC, Star Health, HDFC ERGO, and more.",
        detail: "We support 50+ insurance providers & government schemes",
      },
      {
        icon: Navigation,
        title: "Get Instant Routes",
        description:
          "See only hospitals that match BOTH your medical need AND your financial coverage, sorted by distance.",
        detail: "Real-time navigation with estimated arrival times",
      },
    ],
  },
  {
    phase: "TrueBill AI Pipeline",
    color: "from-cyan-500 to-blue-600",
    borderColor: "border-cyan-500/30",
    bgColor: "bg-cyan-500/5",
    steps: [
      {
        icon: Camera,
        title: "Snap Your Bill",
        description:
          "Take a photo of your hospital or pharmacy bill. Supports printed bills, handwritten receipts, and PDFs.",
        detail: "OCR handles low-light, angled, and crumpled documents",
      },
      {
        icon: Cpu,
        title: "AI Analyzes Everything",
        description:
          "Our ML pipeline extracts every line item, cross-references government tax brackets, MRP databases, and market pricing.",
        detail: "NLP + Computer Vision + Tax Rule Engine working in parallel",
      },
      {
        icon: FileCheck,
        title: "Get Your True Bill",
        description:
          'A transparent side-by-side comparison highlighting overcharges in red, incorrect GST applications, and inflated MRPs.',
        detail: "Download a PDF report to dispute fraudulent charges",
      },
    ],
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="relative py-24 lg:py-32">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-surface to-black" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="inline-block px-3 py-1 text-xs font-medium text-primary-light border border-primary/20 rounded-full mb-4 tracking-wider uppercase">
            How It Works
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            Simple Steps,{" "}
            <span className="gradient-text-blue">Powerful Protection</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Designed for moments of panic. Every interaction is intentionally
            minimal — because in an emergency, every second counts.
          </p>
        </motion.div>

        {/* Two Phase Flows */}
        <div className="space-y-20">
          {steps.map((phase, phaseIdx) => (
            <motion.div
              key={phaseIdx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              {/* Phase Header */}
              <div className="flex items-center gap-3 mb-10">
                <div
                  className={`w-10 h-10 rounded-xl bg-gradient-to-br ${phase.color} flex items-center justify-center text-white font-bold text-sm`}
                >
                  {phaseIdx + 1}
                </div>
                <h3 className="text-2xl font-bold text-white">{phase.phase}</h3>
                <div className="flex-1 h-px bg-gradient-to-r from-surface-border to-transparent ml-4" />
              </div>

              {/* Steps */}
              <div className="grid md:grid-cols-3 gap-6 relative">
                {/* Connecting lines (desktop) */}
                <div className="hidden md:block absolute top-16 left-[calc(33.33%-12px)] w-[calc(33.33%+24px)] h-0.5 bg-gradient-to-r from-primary/20 via-primary/40 to-primary/20" />
                <div className="hidden md:block absolute top-16 left-[calc(66.66%-12px)] w-[calc(33.33%+24px)] h-0.5 bg-gradient-to-r from-primary/20 via-primary/40 to-primary/20" />

                {phase.steps.map((step, stepIdx) => (
                  <motion.div
                    key={stepIdx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: stepIdx * 0.15, duration: 0.5 }}
                    className="relative"
                  >
                    <div
                      className={`rounded-2xl ${phase.bgColor} border ${phase.borderColor} p-6 card-hover h-full`}
                    >
                      {/* Step Number + Icon */}
                      <div className="flex items-center gap-3 mb-5">
                        <div
                          className={`w-12 h-12 rounded-xl bg-gradient-to-br ${phase.color} flex items-center justify-center shadow-lg relative z-10`}
                        >
                          <step.icon className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono text-gray-600">
                            STEP {String(stepIdx + 1).padStart(2, "0")}
                          </span>
                        </div>
                      </div>

                      {/* Content */}
                      <h4 className="text-lg font-semibold text-white mb-2">
                        {step.title}
                      </h4>
                      <p className="text-gray-400 text-sm leading-relaxed mb-3">
                        {step.description}
                      </p>
                      <p className="text-xs text-gray-600 italic flex items-center gap-1.5">
                        <span className="w-1 h-1 bg-primary rounded-full" />
                        {step.detail}
                      </p>
                    </div>

                    {/* Arrow between steps (mobile) */}
                    {stepIdx < phase.steps.length - 1 && (
                      <div className="md:hidden flex justify-center my-3">
                        <ArrowDown className="w-5 h-5 text-primary/40" />
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
