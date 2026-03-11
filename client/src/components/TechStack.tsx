"use client";

import { motion } from "framer-motion";
import { Code2, Database, Brain, Globe, Layers, Server } from "lucide-react";

const stack = [
  {
    category: "Frontend",
    icon: Globe,
    color: "from-blue-500 to-blue-700",
    borderColor: "border-blue-500/20",
    techs: [
      { name: "Next.js", desc: "React framework for production" },
      { name: "TypeScript", desc: "Type-safe development" },
      { name: "Tailwind CSS", desc: "Utility-first styling" },
      { name: "Framer Motion", desc: "Smooth animations" },
    ],
  },
  {
    category: "Backend",
    icon: Server,
    color: "from-green-500 to-emerald-700",
    borderColor: "border-green-500/20",
    techs: [
      { name: "Node.js", desc: "JavaScript runtime" },
      { name: "Express.js", desc: "API routing & middleware" },
      { name: "JWT Auth", desc: "Secure user sessions" },
      { name: "REST APIs", desc: "Hospital & scheme data" },
    ],
  },
  {
    category: "ML / AI",
    icon: Brain,
    color: "from-purple-500 to-violet-700",
    borderColor: "border-purple-500/20",
    techs: [
      { name: "Python", desc: "ML microservice" },
      { name: "FastAPI", desc: "High-perf API server" },
      { name: "Tesseract OCR", desc: "Bill text extraction" },
      { name: "NLP Pipeline", desc: "Item classification" },
    ],
  },
  {
    category: "Database",
    icon: Database,
    color: "from-orange-500 to-amber-700",
    borderColor: "border-orange-500/20",
    techs: [
      { name: "PostgreSQL", desc: "Tax logic & relational data" },
      { name: "MongoDB", desc: "Hospital records & reviews" },
      { name: "Redis", desc: "Caching & sessions" },
      { name: "Prisma ORM", desc: "Type-safe DB queries" },
    ],
  },
  {
    category: "Infrastructure",
    icon: Layers,
    color: "from-cyan-500 to-teal-700",
    borderColor: "border-cyan-500/20",
    techs: [
      { name: "Docker", desc: "Containerized services" },
      { name: "Vercel", desc: "Frontend deployment" },
      { name: "AWS / GCP", desc: "ML model hosting" },
      { name: "GitHub Actions", desc: "CI/CD pipeline" },
    ],
  },
  {
    category: "APIs & SDKs",
    icon: Code2,
    color: "from-rose-500 to-pink-700",
    borderColor: "border-rose-500/20",
    techs: [
      { name: "Google Maps", desc: "Hospital routing" },
      { name: "WhatsApp API", desc: "Bot integration" },
      { name: "Insurance APIs", desc: "Policy verification" },
      { name: "GST Portal", desc: "Tax validation" },
    ],
  },
];

const architectureLayers = [
  { label: "Next.js Frontend", width: "100%", color: "bg-blue-500", delay: 0 },
  { label: "Node.js API Gateway", width: "85%", color: "bg-green-500", delay: 0.1 },
  { label: "Python ML Microservice", width: "65%", color: "bg-purple-500", delay: 0.2 },
  { label: "PostgreSQL + MongoDB", width: "75%", color: "bg-orange-500", delay: 0.3 },
  { label: "Cloud Infrastructure", width: "90%", color: "bg-cyan-500", delay: 0.4 },
];

export default function TechStack() {
  return (
    <section id="tech-stack" className="relative py-24 lg:py-32">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-surface to-black" />
        <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-3xl" />
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
          <span className="inline-flex items-center gap-2 px-3 py-1 text-xs font-medium text-purple-400 border border-purple-500/20 rounded-full mb-4 tracking-wider uppercase">
            <Code2 className="w-3 h-3" />
            Technology Stack
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            Built with{" "}
            <span className="gradient-text-blue">Serious Tech</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            A production-grade architecture leveraging distinct technologies for
            UI, data processing, and AI — designed for scale and reliability.
          </p>
        </motion.div>

        {/* Architecture Visualization */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto mb-16"
        >
          <h3 className="text-sm font-mono text-gray-500 uppercase tracking-wider mb-6 text-center">
            System Architecture
          </h3>
          <div className="space-y-3">
            {architectureLayers.map((layer, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scaleX: 0 }}
                whileInView={{ opacity: 1, scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ delay: layer.delay, duration: 0.6, ease: "easeOut" as const }}
                style={{ width: layer.width, originX: 0 }}
                className={`${layer.color}/10 border border-white/5 rounded-lg px-4 py-3 flex items-center gap-3`}
              >
                <div className={`w-2 h-2 rounded-full ${layer.color}`} />
                <span className="text-sm text-gray-300 font-medium">
                  {layer.label}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Tech Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stack.map((category, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className={`rounded-2xl border ${category.borderColor} bg-surface-card p-6 card-hover`}
            >
              {/* Category Header */}
              <div className="flex items-center gap-3 mb-5">
                <div
                  className={`w-10 h-10 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center`}
                >
                  <category.icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-semibold text-white">{category.category}</h3>
              </div>

              {/* Tech List */}
              <div className="space-y-3">
                {category.techs.map((tech, j) => (
                  <div
                    key={j}
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/[0.02] transition-colors group"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-primary group-hover:bg-primary-light transition-colors" />
                    <div>
                      <span className="text-sm text-white font-medium">
                        {tech.name}
                      </span>
                      <span className="text-xs text-gray-600 ml-2">
                        {tech.desc}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
