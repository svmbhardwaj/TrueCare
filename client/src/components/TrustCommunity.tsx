"use client";

import { motion } from "framer-motion";
import {
  BadgeCheck,
  Users,
  Star,
  ThumbsUp,
  MessageSquare,
  TrendingUp,
  ShieldCheck,
} from "lucide-react";

const testimonials = [
  {
    name: "Priya Sharma",
    location: "Delhi",
    rating: 5,
    text: "At 1 AM, my father had a cardiac episode. TrueCare showed us the nearest hospital that accepted our Ayushman card. We saved ₹2.3 lakhs in out-of-pocket costs.",
    scheme: "Ayushman Bharat",
    verified: true,
    avatar: "PS",
  },
  {
    name: "Rahul Mehta",
    location: "Mumbai",
    rating: 5,
    text: "The TrueBill scanner found ₹8,400 in overcharges on my wife's maternity bill. The pharmacy had inflated MRPs on basic medicines by 300%.",
    scheme: "Star Health",
    verified: true,
    avatar: "RM",
  },
  {
    name: "Anjali Gupta",
    location: "Bangalore",
    rating: 4,
    text: "After my accident, family used TrueCare to find an orthopedic hospital that took CGHS cashless. The community badges helped them trust the hospital choice.",
    scheme: "CGHS",
    verified: true,
    avatar: "AG",
  },
];

const trustStats = [
  { icon: Users, value: "50,000+", label: "Active Users", color: "text-blue-400" },
  { icon: BadgeCheck, value: "3,200+", label: "Verified Hospitals", color: "text-green-400" },
  { icon: MessageSquare, value: "12,000+", label: "Community Reviews", color: "text-cyan-400" },
  { icon: TrendingUp, value: "₹18Cr+", label: "Overcharges Detected", color: "text-yellow-400" },
];

const verifiedHospitals = [
  { name: "AIIMS Delhi", badge: "Platinum Trust", reviews: 2840, score: 98 },
  { name: "Max Healthcare", badge: "Gold Trust", reviews: 1560, score: 94 },
  { name: "Fortis Hospital", badge: "Gold Trust", reviews: 1200, score: 91 },
  { name: "Safdarjung Hospital", badge: "Silver Trust", reviews: 890, score: 87 },
];

export default function TrustCommunity() {
  return (
    <section id="trust" className="relative py-24 lg:py-32">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-surface to-black" />
        <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-green-500/5 rounded-full blur-3xl" />
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
          <span className="inline-flex items-center gap-2 px-3 py-1 text-xs font-medium text-green-400 border border-green-500/20 rounded-full mb-4 tracking-wider uppercase">
            <ShieldCheck className="w-3 h-3" />
            Community Verified
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            Trust Built by{" "}
            <span className="gradient-text-blue">Real Patients</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Official data is often outdated. Our crowdsourced trust system gives
            you real-time verification from patients who&apos;ve been there.
          </p>
        </motion.div>

        {/* Trust Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16"
        >
          {trustStats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center glass rounded-2xl p-6 card-hover"
            >
              <stat.icon className={`w-8 h-8 ${stat.color} mx-auto mb-3`} />
              <div className="text-3xl font-bold text-white mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-gray-500">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Two Column: Testimonials + Verified Hospitals */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Testimonials */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-primary-light" />
              Patient Stories
            </h3>
            <div className="space-y-4">
              {testimonials.map((t, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                  className="glass rounded-xl p-5 card-hover border border-surface-border"
                >
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center text-sm font-bold text-primary-light flex-shrink-0">
                      {t.avatar}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-white text-sm">
                          {t.name}
                        </span>
                        {t.verified && (
                          <BadgeCheck className="w-4 h-4 text-primary-light" />
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <span>{t.location}</span>
                        <span>•</span>
                        <span className="px-1.5 py-0.5 bg-primary/10 text-primary-light rounded text-[10px]">
                          {t.scheme}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-0.5">
                      {Array.from({ length: t.rating }).map((_, j) => (
                        <Star
                          key={j}
                          className="w-3 h-3 text-yellow-400 fill-yellow-400"
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    &ldquo;{t.text}&rdquo;
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Verified Hospitals Leaderboard */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
              <BadgeCheck className="w-5 h-5 text-green-400" />
              Top Verified Hospitals
            </h3>
            <div className="space-y-3">
              {verifiedHospitals.map((h, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="glass rounded-xl p-4 card-hover border border-surface-border flex items-center gap-4"
                >
                  <div className="w-10 h-10 rounded-xl bg-surface-light border border-surface-border flex items-center justify-center text-lg font-bold text-gray-500">
                    #{i + 1}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-white text-sm">
                        {h.name}
                      </span>
                      <BadgeCheck className="w-4 h-4 text-green-400" />
                    </div>
                    <div className="flex items-center gap-3 text-xs text-gray-500">
                      <span
                        className={`px-1.5 py-0.5 rounded text-[10px] font-medium ${
                          h.badge === "Platinum Trust"
                            ? "bg-blue-500/10 text-blue-400"
                            : h.badge === "Gold Trust"
                            ? "bg-yellow-500/10 text-yellow-400"
                            : "bg-gray-500/10 text-gray-400"
                        }`}
                      >
                        {h.badge}
                      </span>
                      <span className="flex items-center gap-1">
                        <ThumbsUp className="w-3 h-3" />
                        {h.reviews} reviews
                      </span>
                    </div>
                  </div>
                  {/* Trust Score */}
                  <div className="text-right">
                    <div className="text-2xl font-bold text-white">{h.score}</div>
                    <div className="text-[10px] text-gray-500 uppercase tracking-wider">
                      Trust Score
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* How trust badges work */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="mt-6 p-4 rounded-xl border border-primary/10 bg-primary/[0.03]"
            >
              <h4 className="text-sm font-semibold text-white mb-2 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-primary-light" />
                How Trust Badges Work
              </h4>
              <p className="text-xs text-gray-500 leading-relaxed">
                When patients confirm a hospital successfully processed their
                insurance or government scheme without issues, the hospital earns
                trust points. Hospitals with consistent positive reports earn
                Platinum, Gold, or Silver badges — giving you confidence in a
                crisis.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
