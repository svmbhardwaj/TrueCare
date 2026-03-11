import type { Metadata } from "next";
import TrueBillAI from "@/components/TrueBillAI";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "TrueBill AI Scanner — TrueCare",
  description:
    "Upload your hospital or pharmacy bill and let our AI detect overcharges, incorrect GST, and inflated MRPs instantly.",
};

export default function TrueBillPage() {
  return (
    <div className="relative min-h-screen bg-black pt-20">
      <TrueBillAI />
      <Footer />
    </div>
  );
}
