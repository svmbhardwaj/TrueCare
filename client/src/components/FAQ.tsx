"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle, MessageCircle } from "lucide-react";

const faqs = [
  {
    question: "Is TrueCare free to use?",
    answer:
      "Yes! The Emergency Hospital Navigator and basic TrueBill scanning are completely free for all users. We believe healthcare protection should be accessible to everyone. Premium features like detailed PDF reports and historical bill tracking may have a nominal fee in the future.",
  },
  {
    question: "How accurate is the bill scanning AI?",
    answer:
      "Our OCR + NLP pipeline achieves 95%+ accuracy on printed hospital bills and 85%+ on handwritten pharmacy receipts. The AI cross-references items against government MRP databases, standard tax brackets, and crowdsourced pricing data. We always recommend using the True Bill report as a starting point for discussions with the hospital billing department.",
  },
  {
    question: "Which insurance schemes and providers do you support?",
    answer:
      "We currently support Ayushman Bharat (PM-JAY), CGHS, ESIC, and 30+ private cashless insurance providers including Star Health, Niva Bupa, ICICI Lombard, HDFC ERGO, Bajaj Allianz, Care Health, and more. We're continuously adding new providers based on user demand.",
  },
  {
    question: "How are hospitals verified?",
    answer:
      "Hospitals earn Trust Badges through our crowdsourced verification system. When patients confirm that a hospital successfully processed their insurance/scheme without issues, the hospital earns trust points. Hospitals with consistent positive reports earn Platinum, Gold, or Silver badges. This is supplemented with official data from NHA (National Health Authority) and state health departments.",
  },
  {
    question: "Can I use TrueCare in an offline/low-connectivity area?",
    answer:
      "The Emergency Navigator caches nearby hospital data when you first open the app, so basic hospital information works with limited connectivity. For full AI bill scanning, you'll need an internet connection. Our upcoming WhatsApp bot will work on extremely low bandwidth, making it accessible even in rural areas.",
  },
  {
    question: "What should I do if I find overcharges on my bill?",
    answer:
      "Download the True Bill PDF report and present it to the hospital's billing department. Under the Consumer Protection Act 2019, you have the right to dispute inflated charges. If the hospital doesn't respond, you can file a complaint with the District Consumer Forum. Our report serves as documented evidence of pricing anomalies.",
  },
  {
    question: "How is my medical and billing data protected?",
    answer:
      "We take data privacy extremely seriously. All bill images are processed in real-time and NOT stored on our servers. User data is encrypted using AES-256, and we comply with India's Digital Personal Data Protection Act. We never share your medical or financial information with third parties.",
  },
  {
    question: "When is the WhatsApp bot launching?",
    answer:
      "The WhatsApp bot is currently in beta testing and will be available to all users as the immediate next phase. You'll be able to share your live location to get nearby scheme-approved hospitals, or send a bill photo directly in chat for instant AI fraud detection.",
  },
];

export default function FAQ() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section id="faq" className="relative py-24 lg:py-32">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-surface to-black" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Clickable FAQ Title — toggles all questions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-full group"
          >
            <div className="rounded-2xl border border-surface-border bg-surface-card p-8 sm:p-10 text-center transition-all duration-300 hover:border-primary/20">
              <span className="inline-flex items-center gap-2 px-3 py-1 text-xs font-medium text-primary-light border border-primary/20 rounded-full mb-4 tracking-wider uppercase">
                <HelpCircle className="w-3 h-3" />
                FAQ
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-3">
                Frequently Asked{" "}
                <span className="gradient-text-blue">Questions</span>
              </h2>
              <p className="text-gray-400 max-w-xl mx-auto mb-4">
                Everything you need to know about TrueCare and how it protects
                your family.
              </p>
              <div className="inline-flex items-center gap-2 text-sm text-primary-light">
                <span>{isOpen ? "Click to collapse" : "Click to expand"}</span>
                <ChevronDown
                  className={`w-5 h-5 transition-transform duration-300 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </div>
            </div>
          </button>
        </motion.div>

        {/* All questions revealed on click */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" as const }}
              className="overflow-hidden"
            >
              <div className="mt-6 rounded-2xl border border-surface-border bg-surface-card overflow-hidden divide-y divide-surface-border">
                {faqs.map((faq, i) => (
                  <div key={i} className="px-6 py-5">
                    <div className="flex items-start gap-3">
                      <MessageCircle className="w-4 h-4 text-primary-light mt-0.5 flex-shrink-0" />
                      <div>
                        <h3 className="text-sm font-semibold text-white mb-2">
                          {faq.question}
                        </h3>
                        <p className="text-gray-400 text-sm leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Contact CTA */}
              <div className="mt-8 text-center">
                <p className="text-gray-500 text-sm mb-3">
                  Still have questions?
                </p>
                <a
                  href="mailto:support@truecare.in"
                  className="inline-flex items-center gap-2 px-6 py-2.5 text-sm border border-surface-border hover:border-primary/30 text-gray-300 hover:text-white rounded-xl transition-all"
                >
                  <MessageCircle className="w-4 h-4" />
                  Contact Support
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
