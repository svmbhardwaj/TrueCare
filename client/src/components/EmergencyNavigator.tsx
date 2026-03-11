"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  Search,
  Navigation,
  Hospital,
  BadgeCheck,
  Star,
  Clock,
  ChevronRight,
  Heart,
  Baby,
  Brain,
  Bone,
  Stethoscope,
  Ambulance,
} from "lucide-react";

const medicalNeeds = [
  { id: "trauma", label: "Trauma / Emergency", icon: Ambulance, color: "bg-red-500/10 text-red-400 border-red-500/20" },
  { id: "icu", label: "ICU / Critical Care", icon: Heart, color: "bg-blue-500/10 text-blue-400 border-blue-500/20" },
  { id: "maternity", label: "Maternity", icon: Baby, color: "bg-pink-500/10 text-pink-400 border-pink-500/20" },
  { id: "neuro", label: "Neurology", icon: Brain, color: "bg-purple-500/10 text-purple-400 border-purple-500/20" },
  { id: "ortho", label: "Orthopedic", icon: Bone, color: "bg-orange-500/10 text-orange-400 border-orange-500/20" },
  { id: "general", label: "General Medicine", icon: Stethoscope, color: "bg-green-500/10 text-green-400 border-green-500/20" },
];

const insuranceSchemes = [
  { id: "ayushman", label: "Ayushman Bharat", badge: "GOV" },
  { id: "cghs", label: "CGHS", badge: "GOV" },
  { id: "esic", label: "ESIC", badge: "GOV" },
  { id: "star", label: "Star Health", badge: "PVT" },
  { id: "max-bupa", label: "Niva Bupa", badge: "PVT" },
  { id: "icici", label: "ICICI Lombard", badge: "PVT" },
  { id: "hdfc", label: "HDFC ERGO", badge: "PVT" },
  { id: "bajaj", label: "Bajaj Allianz", badge: "PVT" },
];

const mockHospitals = [
  {
    name: "AIIMS Emergency Wing",
    distance: "2.3 km",
    rating: 4.8,
    verified: true,
    schemes: ["Ayushman Bharat", "CGHS"],
    specialties: ["Trauma", "ICU", "Neurology"],
    waitTime: "~15 min",
    beds: 12,
  },
  {
    name: "Max Super Speciality Hospital",
    distance: "3.1 km",
    rating: 4.6,
    verified: true,
    schemes: ["Star Health", "HDFC ERGO", "CGHS"],
    specialties: ["Trauma", "Maternity", "Orthopedic"],
    waitTime: "~8 min",
    beds: 24,
  },
  {
    name: "Fortis Healthcare",
    distance: "4.7 km",
    rating: 4.5,
    verified: false,
    schemes: ["Niva Bupa", "ICICI Lombard", "Bajaj Allianz"],
    specialties: ["ICU", "General Medicine", "Neurology"],
    waitTime: "~20 min",
    beds: 8,
  },
];

export default function EmergencyNavigator() {
  const [selectedNeed, setSelectedNeed] = useState<string | null>(null);
  const [selectedScheme, setSelectedScheme] = useState<string | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [step, setStep] = useState(1);

  const handleSearch = () => {
    if (selectedNeed && selectedScheme) {
      setShowResults(true);
      setStep(3);
    }
  };

  const handleNeedSelect = (id: string) => {
    setSelectedNeed(id);
    setStep(2);
    setShowResults(false);
  };

  return (
    <section id="navigator" className="relative py-24 lg:py-32">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-surface to-black" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
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
          <span className="inline-flex items-center gap-2 px-3 py-1 text-xs font-medium text-red-400 border border-red-500/20 rounded-full mb-4 tracking-wider uppercase">
            <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            Emergency Navigator
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            Find the Right Hospital,{" "}
            <span className="gradient-text-blue">Instantly</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Select your medical need and insurance coverage. We&apos;ll show you only
            hospitals that match both — saving precious time in a crisis.
          </p>
        </motion.div>

        {/* Steps Progress */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center justify-center gap-4 mb-12"
        >
          {[
            { num: 1, label: "Medical Need" },
            { num: 2, label: "Coverage" },
            { num: 3, label: "Results" },
          ].map((s, i) => (
            <div key={s.num} className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                    step >= s.num
                      ? "bg-primary text-white glow-blue"
                      : "bg-surface-light text-gray-500 border border-surface-border"
                  }`}
                >
                  {s.num}
                </div>
                <span
                  className={`text-sm hidden sm:inline ${
                    step >= s.num ? "text-white" : "text-gray-600"
                  }`}
                >
                  {s.label}
                </span>
              </div>
              {i < 2 && (
                <ChevronRight className={`w-4 h-4 ${step > s.num ? "text-primary" : "text-gray-700"}`} />
              )}
            </div>
          ))}
        </motion.div>

        <div className="max-w-5xl mx-auto">
          {/* Step 1: Medical Need */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Hospital className="w-5 h-5 text-primary-light" />
              What do you need?
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {medicalNeeds.map((need) => (
                <button
                  key={need.id}
                  onClick={() => handleNeedSelect(need.id)}
                  className={`flex flex-col items-center gap-2 p-4 rounded-xl border transition-all duration-300 ${
                    selectedNeed === need.id
                      ? "border-primary bg-primary/10 text-white glow-blue"
                      : `${need.color} border hover:border-primary/30 hover:bg-white/5`
                  }`}
                >
                  <need.icon className="w-6 h-6" />
                  <span className="text-xs font-medium text-center">{need.label}</span>
                </button>
              ))}
            </div>
          </motion.div>

          {/* Step 2: Insurance */}
          <AnimatePresence>
            {step >= 2 && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-8"
              >
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <Search className="w-5 h-5 text-primary-light" />
                  Select your coverage
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {insuranceSchemes.map((scheme) => (
                    <button
                      key={scheme.id}
                      onClick={() => {
                        setSelectedScheme(scheme.id);
                        setShowResults(false);
                      }}
                      className={`flex items-center gap-3 p-3 rounded-xl border transition-all duration-300 ${
                        selectedScheme === scheme.id
                          ? "border-primary bg-primary/10 text-white glow-blue"
                          : "border-surface-border bg-surface-card text-gray-400 hover:border-primary/30 hover:bg-white/5"
                      }`}
                    >
                      <span
                        className={`px-1.5 py-0.5 text-[10px] font-bold rounded ${
                          scheme.badge === "GOV"
                            ? "bg-green-500/20 text-green-400"
                            : "bg-blue-500/20 text-blue-400"
                        }`}
                      >
                        {scheme.badge}
                      </span>
                      <span className="text-sm font-medium">{scheme.label}</span>
                    </button>
                  ))}
                </div>

                {/* Search Button */}
                {selectedScheme && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-6 text-center"
                  >
                    <button
                      onClick={handleSearch}
                      className="inline-flex items-center gap-2 px-8 py-3 bg-primary hover:bg-primary-light text-white rounded-xl font-semibold transition-all duration-300 glow-blue hover:glow-blue-intense"
                    >
                      <Navigation className="w-5 h-5" />
                      Find Hospitals Near Me
                    </button>
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Step 3: Results */}
          <AnimatePresence>
            {showResults && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="space-y-4"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-primary-light" />
                    Compatible Hospitals Nearby
                  </h3>
                  <span className="text-sm text-gray-500">
                    {mockHospitals.length} found
                  </span>
                </div>

                {mockHospitals.map((hospital, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.15 }}
                    className="group glass rounded-2xl p-5 card-hover border border-surface-border hover:border-primary/30"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="text-lg font-semibold text-white">
                            {hospital.name}
                          </h4>
                          {hospital.verified && (
                            <BadgeCheck className="w-5 h-5 text-primary-light" />
                          )}
                        </div>
                        <div className="flex flex-wrap items-center gap-3 text-sm text-gray-400 mb-3">
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5" />
                            {hospital.distance}
                          </span>
                          <span className="flex items-center gap-1">
                            <Star className="w-3.5 h-3.5 text-yellow-400" />
                            {hospital.rating}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5" />
                            {hospital.waitTime}
                          </span>
                          <span className="px-2 py-0.5 text-xs bg-green-500/10 text-green-400 rounded-full">
                            {hospital.beds} beds available
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {hospital.schemes.map((s, i) => (
                            <span
                              key={i}
                              className="px-2 py-0.5 text-xs bg-primary/10 text-primary-glow border border-primary/20 rounded-full"
                            >
                              {s}
                            </span>
                          ))}
                        </div>
                      </div>
                      <button className="flex items-center gap-2 px-5 py-2.5 bg-primary hover:bg-primary-light text-white rounded-xl font-medium text-sm transition-all duration-200 glow-blue whitespace-nowrap">
                        <Navigation className="w-4 h-4" />
                        Navigate
                      </button>
                    </div>
                  </motion.div>
                ))}

                {/* Map placeholder */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="mt-8 rounded-2xl border border-surface-border overflow-hidden"
                >
                  <div className="relative h-64 bg-surface-card flex items-center justify-center">
                    <div className="absolute inset-0 dot-pattern opacity-30" />
                    <div className="relative text-center">
                      <MapPin className="w-12 h-12 text-primary mx-auto mb-3 animate-bounce" />
                      <p className="text-gray-400 text-sm">Interactive Map View</p>
                      <p className="text-gray-600 text-xs mt-1">
                        Real-time hospital locations & routing
                      </p>
                    </div>
                    {/* Mock map dots */}
                    <div className="absolute top-1/4 left-1/3 w-3 h-3 bg-primary rounded-full animate-pulse" />
                    <div className="absolute top-1/2 right-1/4 w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                    <div className="absolute bottom-1/3 left-1/2 w-3 h-3 bg-primary-light rounded-full animate-pulse" />
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
