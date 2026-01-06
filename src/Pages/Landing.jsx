import { useNavigate } from "react-router-dom";
import { useMemo } from "react";
import { motion } from "framer-motion";
import {
  FiCamera,
  FiMapPin,
  FiCpu,
  FiAward,
  FiArrowRight
} from "react-icons/fi";

/* ================= HEADER ================= */
function Header({ cityConfig, onStart }) {
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-slate-200"
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center gap-3 group cursor-pointer">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-500 text-white flex items-center justify-center font-bold shadow-md">
            CS
          </div>
          <h1 className="text-xl font-extrabold tracking-tight">
            <span className="text-slate-900">Civic</span>
            <span className="text-emerald-600">Setu</span>
            <span className="block text-[10px] text-slate-500 font-semibold tracking-widest">
              Smart Civic Platform • {cityConfig.name}
            </span>
          </h1>
        </div>

        {/* CTA */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          onClick={onStart}
          className="bg-emerald-600 text-white px-6 py-2.5 rounded-lg font-semibold shadow-lg shadow-emerald-600/30 hover:bg-emerald-700"
        >
          Get Started
        </motion.button>
      </div>
    </motion.header>
  );
}

/* ================= HERO ================= */
function Hero({ cityConfig, onStart }) {
  const steps = [
    {
      icon: FiCamera,
      title: "Capture Issue",
      desc: "Photo proof with timestamp"
    },
    {
      icon: FiMapPin,
      title: "Auto Location",
      desc: "GPS-tagged reports"
    },
    {
      icon: FiCpu,
      title: "AI Verification",
      desc: "Spam & duplicate filtering"
    },
    {
      icon: FiAward,
      title: "Earn Rewards",
      desc: "Points & leaderboard"
    }
  ];

  return (
    <section className="pt-32 pb-20 px-6 max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
      {/* LEFT */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <span className="inline-flex items-center gap-2 mb-4 text-xs font-bold bg-emerald-100 text-emerald-700 px-4 py-1.5 rounded-full">
          ● Live in {cityConfig.name}
        </span>

        <h2 className="text-5xl lg:text-6xl font-extrabold text-slate-900 mb-6 leading-tight">
          Report Civic Issues.
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">
            Earn Rewards.
          </span>
        </h2>

        <p className="text-lg text-slate-600 max-w-xl mb-8 leading-relaxed">
          A smart civic reporting platform for Indore.
          Report garbage, roads, water & streetlight issues with verified proof.
        </p>

        <motion.button
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.98 }}
          onClick={onStart}
          className="inline-flex items-center gap-3 bg-emerald-600 text-white px-8 py-4 rounded-xl text-lg font-bold shadow-xl shadow-emerald-600/30 hover:bg-emerald-700"
        >
          Start Reporting
          <FiArrowRight />
        </motion.button>
      </motion.div>

      {/* RIGHT – HOW IT WORKS */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="relative"
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-emerald-100 to-teal-100 rounded-3xl blur-2xl opacity-60"></div>

        <div className="relative bg-white rounded-3xl shadow-2xl p-8 border border-slate-100">
          <h3 className="text-xl font-bold mb-6 text-slate-900">
            How CivicSetu Works
          </h3>

          <div className="grid gap-4">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.03 }}
                className="flex items-center gap-4 p-4 rounded-xl border border-slate-100 hover:border-emerald-200 hover:bg-emerald-50/50 transition-all cursor-pointer"
              >
                <div className="w-12 h-12 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center text-xl">
                  <step.icon />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900">
                    {step.title}
                  </h4>
                  <p className="text-sm text-slate-600">
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}

/* ================= STATS ================= */
function Stats() {
  const stats = [
    { value: "14,000+", label: "Verified Reports" },
    { value: "48 hrs", label: "Avg Resolution Time" },
    { value: "8,500+", label: "Active Youth" }
  ];

  return (
    <section className="bg-slate-900 py-20 text-white">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-8 text-center">
        {stats.map((s, i) => (
          <motion.div
            key={i}
            whileHover={{ y: -6 }}
            className="p-6 rounded-xl bg-slate-800/60 border border-slate-700"
          >
            <div className="text-4xl font-extrabold mb-2">{s.value}</div>
            <div className="text-slate-400">{s.label}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ================= MAIN ================= */
export default function Landing() {
  const navigate = useNavigate();

  const CITY_CONFIG = useMemo(() => ({
    name: "Indore"
  }), []);

  return (
    <div className="min-h-screen bg-slate-50">
      <Header
        cityConfig={CITY_CONFIG}
        onStart={() => navigate("/login")}
      />

      <Hero
        cityConfig={CITY_CONFIG}
        onStart={() => navigate("/login")}
      />

      <Stats />
    </div>
  );
}
