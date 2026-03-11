"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Priya Sharma",
    role: "Mother of two, Delhi",
    avatar: "PS",
    rating: 5,
    text: "My son had a severe asthma attack at midnight. TrueCare found us the nearest hospital that accepted Ayushman Bharat within 3 minutes. The bill scanner later saved us ₹12,000 in overcharges.",
    highlight: "Saved ₹12,000",
  },
  {
    name: "Rajesh Kumar",
    role: "Senior Citizen, Mumbai",
    avatar: "RK",
    rating: 5,
    text: "After my knee surgery, the hospital charged me ₹2.8 lakhs. TrueBill AI flagged 14 overcharged items and missing GST. I got a corrected bill of ₹1.9 lakhs. Thank you, TrueCare!",
    highlight: "14 errors flagged",
  },
  {
    name: "Dr. Anita Desai",
    role: "Healthcare Advocate, Bangalore",
    avatar: "AD",
    rating: 5,
    text: "As a healthcare professional, I recommend TrueCare to all my patients. The transparency it brings to medical billing is revolutionary. India needed this.",
    highlight: "Doctor recommended",
  },
  {
    name: "Suresh Patel",
    role: "Small Business Owner, Ahmedabad",
    avatar: "SP",
    rating: 5,
    text: "When my father was in an emergency, I had no idea which hospital would accept CGHS. TrueCare navigated us through the entire process seamlessly.",
    highlight: "Emergency resolved",
  },
  {
    name: "Meera Nair",
    role: "Teacher, Kochi",
    avatar: "MN",
    rating: 5,
    text: "I was being quoted ₹75,000 for a procedure that should cost ₹30,000. TrueCare's market rate comparison gave me the confidence to negotiate. This app is a lifesaver!",
    highlight: "60% saved",
  },
];

export default function TestimonialSlider() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);

  const next = useCallback(() => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % testimonials.length);
  }, []);

  const prev = useCallback(() => {
    setDirection(-1);
    setCurrent(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  }, []);

  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next]);

  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.9,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (dir: number) => ({
      x: dir < 0 ? 300 : -300,
      opacity: 0,
      scale: 0.9,
    }),
  };

  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-30" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-medium tracking-wider uppercase bg-primary/10 text-primary-light border border-primary/20 mb-4">
            Real Stories
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Trusted by <span className="gradient-text">Thousands</span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            Real people, real savings, real impact on healthcare transparency.
          </p>
        </motion.div>

        {/* Testimonial card */}
        <div className="relative min-h-[320px] flex items-center justify-center">
          <AnimatePresence custom={direction} mode="wait">
            <motion.div
              key={current}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.3 },
              }}
              className="w-full max-w-2xl mx-auto"
            >
              <div className="glass rounded-2xl p-8 sm:p-10 relative">
                <Quote className="absolute top-6 right-6 w-10 h-10 text-primary/10" />

                {/* Stars */}
                <div className="flex gap-1 mb-6">
                  {Array.from({ length: testimonials[current].rating }).map(
                    (_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-yellow-500 text-yellow-500"
                      />
                    )
                  )}
                </div>

                {/* Quote text */}
                <p className="text-lg sm:text-xl text-gray-200 leading-relaxed mb-8 italic">
                  &ldquo;{testimonials[current].text}&rdquo;
                </p>

                <div className="flex items-center justify-between">
                  {/* Author */}
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center text-sm font-bold text-primary-light">
                      {testimonials[current].avatar}
                    </div>
                    <div>
                      <p className="font-semibold text-white">
                        {testimonials[current].name}
                      </p>
                      <p className="text-sm text-gray-400">
                        {testimonials[current].role}
                      </p>
                    </div>
                  </div>

                  {/* Highlight badge */}
                  <span className="hidden sm:block px-3 py-1 rounded-full text-xs font-semibold bg-green-500/10 text-green-400 border border-green-500/20">
                    {testimonials[current].highlight}
                  </span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation controls */}
        <div className="flex items-center justify-center gap-6 mt-8">
          <button
            onClick={prev}
            className="p-3 rounded-full glass hover:bg-white/10 transition-colors"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Indicators */}
          <div className="flex gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setDirection(i > current ? 1 : -1);
                  setCurrent(i);
                }}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === current
                    ? "w-8 bg-primary"
                    : "w-2 bg-gray-600 hover:bg-gray-500"
                }`}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>

          <button
            onClick={next}
            className="p-3 rounded-full glass hover:bg-white/10 transition-colors"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
