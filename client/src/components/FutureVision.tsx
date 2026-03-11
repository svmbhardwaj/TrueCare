"use client";

import { motion } from "framer-motion";
import {
  Plug,
  Building2,
  Rocket,
  Bot,
  Wifi,
} from "lucide-react";

const visionItems = [
  {
    icon: Bot,
    title: "WhatsApp Emergency Bot",
    description:
      "In a real emergency, nobody downloads apps. Drop your live location on WhatsApp and get instant hospital routing. Send a bill photo for AI fraud detection — right in the chat.",
    status: "Beta Testing",
    statusColor: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
    gradient: "from-green-500/10 to-emerald-600/5",
    borderColor: "border-green-500/20",
  },
  {
    icon: Plug,
    title: "Direct Insurance API Hooks",
    description:
      "Enter your policy number and instantly see your exact room-rent capping, covered procedures, and available benefits at the nearest hospital — before you arrive.",
    status: "In Development",
    statusColor: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    gradient: "from-blue-500/10 to-indigo-600/5",
    borderColor: "border-blue-500/20",
  },
  {
    icon: Building2,
    title: "B2B Auditing SaaS",
    description:
      "Selling the TrueBill ML pipeline to insurance companies to help them automatically detect fraudulent, inflated claims from hospitals at scale.",
    status: "Planned",
    statusColor: "bg-purple-500/10 text-purple-400 border-purple-500/20",
    gradient: "from-purple-500/10 to-violet-600/5",
    borderColor: "border-purple-500/20",
  },
  {
    icon: Wifi,
    title: "Offline-First Emergency Mode",
    description:
      "Pre-cached hospital data that works without internet. Basic hospital discovery and routing will function even in zero-connectivity scenarios.",
    status: "Planned",
    statusColor: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
    gradient: "from-cyan-500/10 to-teal-600/5",
    borderColor: "border-cyan-500/20",
  },
];

export default function FutureVision() {
  return (
    <section id="future" className="relative py-24 lg:py-32">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-surface to-black" />
        <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-primary/5 rounded-full blur-3xl" />
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
          <span className="inline-flex items-center gap-2 px-3 py-1 text-xs font-medium text-primary-light border border-primary/20 rounded-full mb-4 tracking-wider uppercase">
            <Rocket className="w-3 h-3" />
            Future Roadmap
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            What&apos;s Coming{" "}
            <span className="gradient-text-blue">Next</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            TrueCare is just getting started. Here&apos;s our vision for scaling
            healthcare protection across India.
          </p>
        </motion.div>

        {/* Vision Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {visionItems.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className={`rounded-2xl border ${item.borderColor} bg-gradient-to-br ${item.gradient} p-6 card-hover`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                    <item.icon className="w-5 h-5 text-primary-light" />
                  </div>
                  <h3 className="font-semibold text-white">{item.title}</h3>
                </div>
                <span
                  className={`px-2.5 py-1 text-[10px] font-medium rounded-full border ${item.statusColor}`}
                >
                  {item.status}
                </span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>


      </div>
    </section>
  );
}
