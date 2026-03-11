import type { Metadata } from "next";
import EmergencyNavigator from "@/components/EmergencyNavigator";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Emergency Navigator — TrueCare",
  description:
    "Find emergency hospitals near you that match your medical needs AND accept your insurance or government scheme.",
};

export default function NavigatorPage() {
  return (
    <div className="relative min-h-screen bg-black pt-20">
      <EmergencyNavigator />
      <Footer />
    </div>
  );
}
