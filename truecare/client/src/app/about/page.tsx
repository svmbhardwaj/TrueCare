"use client";

import { motion } from "framer-motion";
import {
  Shield,
  Heart,
  Target,
  Users,
  Lightbulb,
  Globe,
  Award,
  ArrowRight,
  Code2,
  GraduationCap,
} from "lucide-react";
import Footer from "@/components/Footer";

const team = [
  {
    name: "Team TrueCare",
    role: "India Innovates '26",
    avatar: "TC",
    description:
      "A passionate team of developers, designers, and healthcare advocates building technology that saves lives and money.",
  },
];

const values = [
  {
    icon: Heart,
    title: "Patient First",
    description:
      "Every design decision is made with a panicked family member in mind. We build for 2 AM emergencies, not casual browsing.",
    color: "text-red-400",
    bg: "bg-red-500/10 border-red-500/20",
  },
  {
    icon: Shield,
    title: "Financial Protection",
    description:
      "Healthcare shouldn't bankrupt families. We fight against hidden charges, inflated MRPs, and billing fraud with AI.",
    color: "text-blue-400",
    bg: "bg-blue-500/10 border-blue-500/20",
  },
  {
    icon: Target,
    title: "Radical Transparency",
    description:
      "No hidden agendas. Every hospital listing, every trust badge, and every bill analysis is based on verifiable data.",
    color: "text-green-400",
    bg: "bg-green-500/10 border-green-500/20",
  },
  {
    icon: Users,
    title: "Community Power",
    description:
      "Official data fails. Real patient experiences verify hospitals, creating a living, breathing trust network.",
    color: "text-purple-400",
    bg: "bg-purple-500/10 border-purple-500/20",
  },
];

const milestones = [
  { year: "2025", event: "Problem identified through personal healthcare experiences", icon: Lightbulb },
  { year: "2025", event: "Research & PRD — deep-dive into healthcare billing fraud in India", icon: GraduationCap },
  { year: "2026", event: "India Innovates '26 — TrueCare development begins", icon: Code2 },
  { year: "2026", event: "MVP Launch — Emergency Navigator + TrueBill AI Scanner", icon: Award },
  { year: "Future", event: "WhatsApp Bot, Insurance API Hooks, B2B SaaS Auditing", icon: Globe },
];

export default function AboutPage() {
  return (
    <div className="relative min-h-screen bg-black pt-20">
      {/* Hero */}
      <section className="relative py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-grid opacity-30" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-hero-glow rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 px-3 py-1 text-xs font-medium text-primary-light border border-primary/20 rounded-full mb-6 tracking-wider uppercase">
              <Heart className="w-3 h-3" />
              About TrueCare
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white mb-6">
              We&apos;re Building the{" "}
              <span className="gradient-text">Healthcare Safety Net</span>{" "}
              India Deserves
            </h1>
            <p className="text-lg text-gray-400 max-w-3xl mx-auto leading-relaxed">
              In a country where 55 million people are pushed into poverty
              annually due to healthcare costs, and billing fraud runs rampant —
              we decided to fight back with technology.
            </p>
          </motion.div>
        </div>
      </section>

      {/* The Problem */}
      <section className="relative py-20">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-surface to-black" />
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
              The Problem We&apos;re Solving
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="rounded-2xl border border-red-500/10 bg-red-500/[0.02] p-6">
                <h3 className="text-lg font-semibold text-red-400 mb-3">
                  The Information Maze
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  In an emergency, people don&apos;t know which nearby hospital is
                  equipped for their specific need. Worse, they don&apos;t know which
                  hospital will accept their government scheme like Ayushman card
                  or their private cashless insurance policy. Patients arrive at
                  hospitals only to be turned away — losing precious minutes.
                </p>
              </div>
              <div className="rounded-2xl border border-red-500/10 bg-red-500/[0.02] p-6">
                <h3 className="text-lg font-semibold text-red-400 mb-3">
                  The &quot;Vulnerability Tax&quot;
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Once admitted, families are in a panic and not scrutinizing
                  finances. Unethical pharmacies and billing departments exploit
                  this by adding hidden taxes, inflating MRPs, charging for
                  unprovided facilities, or applying GST to life-saving drugs
                  that are supposed to be tax-exempt.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Our Values */}
      <section className="relative py-20">
        <div className="absolute inset-0 bg-gradient-to-b from-surface via-black to-surface" />
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-10 text-center">
              What Drives Us
            </h2>
            <div className="grid sm:grid-cols-2 gap-6">
              {values.map((value, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className={`rounded-2xl border ${value.bg} p-6 card-hover`}
                >
                  <value.icon className={`w-8 h-8 ${value.color} mb-4`} />
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {value.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {value.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Timeline */}
      <section className="relative py-20">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-surface to-black" />
        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-10 text-center">
              Our Journey
            </h2>
            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-primary/50 via-primary/20 to-transparent" />

              <div className="space-y-8">
                {milestones.map((milestone, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-start gap-5 pl-2"
                  >
                    <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0 relative z-10">
                      <milestone.icon className="w-5 h-5 text-primary-light" />
                    </div>
                    <div className="pt-1">
                      <span className="text-xs font-mono text-primary-light">
                        {milestone.year}
                      </span>
                      <p className="text-gray-300 text-sm mt-1">
                        {milestone.event}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Team */}
      <section className="relative py-20">
        <div className="absolute inset-0 bg-gradient-to-b from-surface via-black to-surface" />
        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-10">
              The Team
            </h2>
            {team.map((member, i) => (
              <div
                key={i}
                className="glass rounded-2xl p-8 border border-surface-border max-w-md mx-auto"
              >
                <div className="w-20 h-20 rounded-2xl bg-primary/20 border border-primary/30 flex items-center justify-center text-2xl font-bold text-primary-light mx-auto mb-4">
                  {member.avatar}
                </div>
                <h3 className="text-xl font-bold text-white mb-1">
                  {member.name}
                </h3>
                <p className="text-primary-light text-sm mb-3">{member.role}</p>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {member.description}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-20">
        <div className="absolute inset-0 bg-gradient-to-b from-black to-surface" />
        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-white mb-4">
              Join Us in Making Healthcare Fair
            </h2>
            <p className="text-gray-400 mb-8">
              Whether you&apos;re a developer, healthcare professional, or someone
              who&apos;s been affected by billing fraud — we&apos;d love to hear from you.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="https://github.com/svmbhardwaj/TrueCare"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary-light text-white rounded-xl font-semibold transition-all glow-blue group"
              >
                Contribute on GitHub
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="/"
                className="inline-flex items-center gap-2 px-6 py-3 border border-surface-border hover:border-primary/30 text-gray-300 hover:text-white rounded-xl font-semibold transition-all"
              >
                Back to Home
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
