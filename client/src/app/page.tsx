import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Features from "@/components/Features";
import HowItWorks from "@/components/HowItWorks";
import EmergencyNavigator from "@/components/EmergencyNavigator";
import TrueBillAI from "@/components/TrueBillAI";
import StatsCounter from "@/components/StatsCounter";
import TrustCommunity from "@/components/TrustCommunity";
import TestimonialSlider from "@/components/TestimonialSlider";
import WhyUs from "@/components/WhyUs";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-black">
      <Hero />
      <Marquee />
      <Features />
      <HowItWorks />
      <EmergencyNavigator />
      <TrueBillAI />
      <StatsCounter />
      <TrustCommunity />
      <TestimonialSlider />
      <WhyUs />
      <FAQ />
      <Footer />
    </div>
  );
}
