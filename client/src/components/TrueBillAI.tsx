"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ScanLine,
  Upload,
  FileCheck,
  AlertTriangle,
  CheckCircle,
  XCircle,
  IndianRupee,
  TrendingDown,
  Eye,
  Camera,
} from "lucide-react";

const mockBillItems = [
  {
    item: "Paracetamol 500mg (Strip/10)",
    billed: 85,
    actual: 32,
    status: "overcharged",
    gst: "Exempt",
    billedGst: "12%",
  },
  {
    item: "ICU Charges (Per Day)",
    billed: 18000,
    actual: 15000,
    status: "overcharged",
    gst: "N/A",
    billedGst: "N/A",
  },
  {
    item: "Blood Test - CBC",
    billed: 600,
    actual: 600,
    status: "fair",
    gst: "N/A",
    billedGst: "N/A",
  },
  {
    item: "Surgical Gloves (Pair)",
    billed: 120,
    actual: 25,
    status: "overcharged",
    gst: "12%",
    billedGst: "18%",
  },
  {
    item: "Consultation Fee",
    billed: 1500,
    actual: 1500,
    status: "fair",
    gst: "18%",
    billedGst: "18%",
  },
  {
    item: "Nebulization",
    billed: 800,
    actual: 350,
    status: "overcharged",
    gst: "Exempt",
    billedGst: "5%",
  },
  {
    item: "Room Rent (General Ward)",
    billed: 4000,
    actual: 2500,
    status: "overcharged",
    gst: "N/A",
    billedGst: "N/A",
  },
  {
    item: "IV Fluids (NS 500ml)",
    billed: 250,
    actual: 250,
    status: "fair",
    gst: "12%",
    billedGst: "12%",
  },
];

export default function TrueBillAI() {
  const [isScanning, setIsScanning] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const handleScan = () => {
    setIsScanning(true);
    setShowResults(false);
    setTimeout(() => {
      setIsScanning(false);
      setShowResults(true);
    }, 2500);
  };

  const totalBilled = mockBillItems.reduce((sum, i) => sum + i.billed, 0);
  const totalActual = mockBillItems.reduce((sum, i) => sum + i.actual, 0);
  const overchargeCount = mockBillItems.filter(
    (i) => i.status === "overcharged"
  ).length;
  const savings = totalBilled - totalActual;

  return (
    <section id="truebill" className="relative py-24 lg:py-32">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-surface to-black" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl" />
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
          <span className="inline-flex items-center gap-2 px-3 py-1 text-xs font-medium text-cyan-400 border border-cyan-500/20 rounded-full mb-4 tracking-wider uppercase">
            <Eye className="w-3 h-3" />
            AI-Powered Bill Analysis
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            The <span className="gradient-text-blue">&quot;True Bill&quot;</span>{" "}
            Pipeline
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Upload any hospital or pharmacy bill. Our AI extracts every line
            item, cross-references government tax brackets & market pricing, and
            exposes hidden overcharges.
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto">
          {/* Upload Area */}
          {!showResults && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <div
                onClick={handleScan}
                onDragOver={(e) => {
                  e.preventDefault();
                  setDragActive(true);
                }}
                onDragLeave={() => setDragActive(false)}
                onDrop={(e) => {
                  e.preventDefault();
                  setDragActive(false);
                  handleScan();
                }}
                className={`relative cursor-pointer rounded-2xl border-2 border-dashed transition-all duration-300 p-12 text-center ${
                  dragActive
                    ? "border-primary bg-primary/5"
                    : "border-surface-border hover:border-primary/40 hover:bg-white/[0.02]"
                }`}
              >
                {isScanning ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col items-center"
                  >
                    <div className="relative w-16 h-16 mb-4">
                      <div className="absolute inset-0 border-4 border-primary/20 rounded-full" />
                      <div className="absolute inset-0 border-4 border-primary rounded-full border-t-transparent animate-spin" />
                      <ScanLine className="absolute inset-0 m-auto w-6 h-6 text-primary-light" />
                    </div>
                    <p className="text-white font-medium mb-1">
                      Analyzing your bill...
                    </p>
                    <p className="text-gray-500 text-sm">
                      Running OCR → Extracting items → Cross-referencing prices
                    </p>
                    <div className="mt-4 flex gap-2">
                      {["OCR", "NLP", "Tax Check", "Price Match"].map(
                        (step, i) => (
                          <motion.span
                            key={step}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.5 }}
                            className="px-2 py-1 text-xs bg-primary/10 text-primary-light border border-primary/20 rounded-full"
                          >
                            {step}
                          </motion.span>
                        )
                      )}
                    </div>
                  </motion.div>
                ) : (
                  <>
                    <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-surface-light border border-surface-border flex items-center justify-center group-hover:border-primary/30">
                      <Camera className="w-8 h-8 text-gray-500" />
                    </div>
                    <p className="text-white font-medium mb-1">
                      Drop your bill here or click to upload
                    </p>
                    <p className="text-gray-500 text-sm mb-4">
                      Supports photos, PDFs, and scanned documents
                    </p>
                    <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary/10 border border-primary/20 text-primary-light rounded-xl text-sm">
                      <Upload className="w-4 h-4" />
                      Upload Bill
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          )}

          {/* Results */}
          <AnimatePresence>
            {showResults && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                {/* Summary Cards */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                  {[
                    {
                      label: "Total Billed",
                      value: `₹${totalBilled.toLocaleString()}`,
                      icon: IndianRupee,
                      color: "text-red-400",
                      bg: "bg-red-500/10 border-red-500/20",
                    },
                    {
                      label: "True Price",
                      value: `₹${totalActual.toLocaleString()}`,
                      icon: FileCheck,
                      color: "text-green-400",
                      bg: "bg-green-500/10 border-green-500/20",
                    },
                    {
                      label: "Overcharges",
                      value: overchargeCount.toString(),
                      icon: AlertTriangle,
                      color: "text-yellow-400",
                      bg: "bg-yellow-500/10 border-yellow-500/20",
                    },
                    {
                      label: "You Save",
                      value: `₹${savings.toLocaleString()}`,
                      icon: TrendingDown,
                      color: "text-primary-light",
                      bg: "bg-primary/10 border-primary/20",
                    },
                  ].map((card, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className={`rounded-xl p-4 border ${card.bg}`}
                    >
                      <card.icon className={`w-5 h-5 ${card.color} mb-2`} />
                      <p className="text-2xl font-bold text-white">
                        {card.value}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">{card.label}</p>
                    </motion.div>
                  ))}
                </div>

                {/* Bill Table */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="rounded-2xl border border-surface-border overflow-hidden"
                >
                  <div className="p-4 border-b border-surface-border flex items-center justify-between">
                    <h3 className="font-semibold text-white flex items-center gap-2">
                      <ScanLine className="w-5 h-5 text-primary-light" />
                      Line-by-Line Analysis
                    </h3>
                    <span className="text-xs text-gray-500">
                      Powered by TrueCare AI
                    </span>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-surface-border bg-surface-card">
                          <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Item
                          </th>
                          <th className="text-right py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Billed
                          </th>
                          <th className="text-right py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                            True Price
                          </th>
                          <th className="text-center py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                            GST Check
                          </th>
                          <th className="text-center py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {mockBillItems.map((item, i) => (
                          <motion.tr
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4 + i * 0.05 }}
                            className={`border-b border-surface-border/50 ${
                              item.status === "overcharged"
                                ? "bg-red-500/[0.03]"
                                : ""
                            }`}
                          >
                            <td className="py-3 px-4 text-sm text-gray-300">
                              {item.item}
                            </td>
                            <td
                              className={`py-3 px-4 text-sm text-right font-mono ${
                                item.status === "overcharged"
                                  ? "text-red-400 line-through"
                                  : "text-gray-400"
                              }`}
                            >
                              ₹{item.billed}
                            </td>
                            <td className="py-3 px-4 text-sm text-right font-mono text-green-400 font-medium">
                              ₹{item.actual}
                            </td>
                            <td className="py-3 px-4 text-center">
                              {item.billedGst !== item.gst ? (
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] bg-red-500/10 text-red-400 border border-red-500/20 rounded-full">
                                  <XCircle className="w-3 h-3" />
                                  {item.billedGst} → {item.gst}
                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] bg-green-500/10 text-green-400 border border-green-500/20 rounded-full">
                                  <CheckCircle className="w-3 h-3" />
                                  Correct
                                </span>
                              )}
                            </td>
                            <td className="py-3 px-4 text-center">
                              {item.status === "overcharged" ? (
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 text-xs bg-red-500/10 text-red-400 rounded-full font-medium">
                                  <AlertTriangle className="w-3 h-3" />
                                  Overcharged
                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 text-xs bg-green-500/10 text-green-400 rounded-full font-medium">
                                  <CheckCircle className="w-3 h-3" />
                                  Fair
                                </span>
                              )}
                            </td>
                          </motion.tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Bottom summary bar */}
                  <div className="p-4 bg-surface-card border-t border-surface-border flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <span className="text-sm text-gray-400">
                        Total Saving:{" "}
                        <span className="text-green-400 font-bold text-lg">
                          ₹{savings.toLocaleString()}
                        </span>
                      </span>
                      <span className="text-sm text-gray-400">
                        ({Math.round((savings / totalBilled) * 100)}% inflated)
                      </span>
                    </div>
                    <div className="flex gap-3">
                      <button
                        onClick={() => {
                          setShowResults(false);
                          setIsScanning(false);
                        }}
                        className="px-4 py-2 text-sm border border-surface-border text-gray-400 rounded-lg hover:border-primary/30 hover:text-white transition-all"
                      >
                        Scan Another
                      </button>
                      <button className="px-4 py-2 text-sm bg-primary text-white rounded-lg glow-blue hover:bg-primary-light transition-all">
                        Download Report
                      </button>
                    </div>
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
