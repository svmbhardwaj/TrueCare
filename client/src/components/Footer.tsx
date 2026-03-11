"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Shield,
  Heart,
  MapPin,
  ScanLine,
  Github,
  Twitter,
  Linkedin,
  Mail,
  Phone,
  ArrowUpRight,
} from "lucide-react";

const footerLinks = {
  Product: [
    { label: "Emergency Navigator", href: "#navigator" },
    { label: "TrueBill AI", href: "#truebill" },
    { label: "Trust Badges", href: "#trust" },
    { label: "WhatsApp Bot", href: "#" },
  ],
  Resources: [
    { label: "How It Works", href: "#features" },
    { label: "Ayushman Bharat Info", href: "#" },
    { label: "CGHS Guidelines", href: "#" },
    { label: "GST on Healthcare", href: "#" },
  ],
  Company: [
    { label: "About Us", href: "#" },
    { label: "Our Mission", href: "#" },
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
  ],
};

export default function Footer() {
  return (
    <footer className="relative border-t border-surface-border">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-surface to-black" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* CTA Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative -mt-16 mb-16 rounded-2xl overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-primary/10 to-accent-cyan/20 blur-xl" />
          <div className="relative glass-strong rounded-2xl p-8 sm:p-12 text-center">
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3">
              Every Second Counts in an Emergency
            </h3>
            <p className="text-gray-400 max-w-xl mx-auto mb-6">
              Don&apos;t wait until a crisis hits. Bookmark TrueCare now and be
              prepared to find the right hospital instantly.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href="#navigator"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary-light text-white rounded-xl font-semibold transition-all glow-blue"
              >
                <MapPin className="w-5 h-5" />
                Find Hospital Now
              </a>
              <a
                href="#truebill"
                className="inline-flex items-center gap-2 px-6 py-3 border border-surface-border hover:border-primary/30 text-white rounded-xl font-semibold transition-all"
              >
                <ScanLine className="w-5 h-5 text-primary-light" />
                Scan a Bill
              </a>
            </div>
          </div>
        </motion.div>

        {/* Long-Term Mission */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 glass rounded-2xl p-8 sm:p-12 text-center border border-primary/10"
        >
          <div className="w-12 h-12 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-4">
            <Heart className="w-6 h-6 text-primary" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-3">
            The Long-Term Vision
          </h3>
          <p className="text-gray-400 max-w-2xl mx-auto leading-relaxed mb-6">
            A world where no family is financially destroyed by a medical
            emergency. Where every patient &mdash; regardless of income, literacy, or
            location &mdash; has instant access to verified hospitals and transparent
            billing. TrueCare is the first step towards that vision.
          </p>
          <a
            href="https://github.com/svmbhardwaj/TrueCare"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary-light text-white rounded-xl font-semibold transition-all glow-blue group"
          >
            <Heart className="w-5 h-5" />
            Join the Mission
            <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </motion.div>

        {/* Footer Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 pb-12">
          {/* Brand */}
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4 group">
              <div className="relative">
                <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center">
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <Heart className="w-3 h-3 text-white absolute -top-0.5 -right-0.5" />
              </div>
              <span className="text-xl font-bold">
                True<span className="text-primary-light">Care</span>
              </span>
            </Link>
            <p className="text-sm text-gray-500 max-w-xs mb-6 leading-relaxed">
              An end-to-end medical & financial lifeline platform that protects
              patients from emergency to discharge.
            </p>
            <div className="flex gap-3">
              {[
                { icon: Github, href: "https://github.com/svmbhardwaj/TrueCare" },
                { icon: Twitter, href: "#" },
                { icon: Linkedin, href: "#" },
                { icon: Mail, href: "#" },
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  className="w-9 h-9 rounded-lg bg-surface-light border border-surface-border flex items-center justify-center text-gray-500 hover:text-white hover:border-primary/30 transition-all"
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-sm font-semibold text-white mb-4">{title}</h4>
              <ul className="space-y-2.5">
                {links.map((link, i) => (
                  <li key={i}>
                    <a
                      href={link.href}
                      className="text-sm text-gray-500 hover:text-white transition-colors inline-flex items-center gap-1 group"
                    >
                      {link.label}
                      <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-surface-border py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-600">
            &copy; {new Date().getFullYear()} TrueCare. Built for India
            Innovates &apos;26.
          </p>
          <div className="flex items-center gap-4 text-xs text-gray-600">
            <a href="#" className="hover:text-gray-400 transition-colors">
              Privacy
            </a>
            <a href="#" className="hover:text-gray-400 transition-colors">
              Terms
            </a>
            <div className="flex items-center gap-1.5">
              <Phone className="w-3 h-3" />
              <span>Emergency: 112</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
