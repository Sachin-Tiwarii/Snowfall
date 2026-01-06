import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import {
  CheckCircle2,
  XCircle,
  MapPin,
  Search,
  Clock,
  ShieldCheck,
  BarChart3
} from "lucide-react";
import L from "leaflet";

/* ================= LEAFLET FIX ================= */
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

/* ================= MOCK DATA ================= */
const INITIAL_REPORTS = [
  {
    id: 1,
    type: "Pothole Risk",
    location: "Rajwada Sq",
    lat: 22.7196,
    lng: 75.8577,
    status: "pending",
  },
  {
    id: 2,
    type: "Waste Pileup",
    location: "Palasia Zone",
    lat: 22.7244,
    lng: 75.8839,
    status: "verified",
  },
  {
    id: 3,
    type: "Faulty Streetlight",
    location: "Vijay Nagar",
    lat: 22.7533,
    lng: 75.8937,
    status: "resolved",
  },
];

export default function AdminDashboard() {
  const [reports, setReports] = useState(INITIAL_REPORTS);
  const [filter, setFilter] = useState("all");
  const [selectedReport, setSelectedReport] = useState(null);

  const stats = useMemo(() => ({
    pending: reports.filter(r => r.status === "pending").length,
    verified: reports.filter(r => r.status === "verified").length,
    resolved: reports.filter(r => r.status === "resolved").length,
    avgTime: "4.2 hrs"
  }), [reports]);

  const updateStatus = (id, status) => {
    setReports(prev =>
      prev.map(r => (r.id === id ? { ...r, status } : r))
    );
    setSelectedReport(null);
  };

  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-slate-50 to-emerald-50/40">

      {/* HEADER */}
      <header className="h-16 bg-white/80 backdrop-blur border-b px-6 flex items-center justify-between">
        
        {/* 🔥 UPDATED LOGO + BRAND */}
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-500 text-white flex items-center justify-center font-extrabold text-lg shadow-xl">
            CS
          </div>

          <div className="leading-tight">
            <div className="text-lg font-extrabold tracking-tight text-slate-900">
              Civic<span className="text-emerald-600">Setu</span>
            </div>
            <div className="text-[11px] text-slate-400 font-semibold uppercase tracking-widest">
              Admin Portal · Indore
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-4">
          <span className="text-sm text-slate-600 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            System Operational
          </span>

          <div className="relative">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
            <input
              className="pl-9 pr-4 py-2 rounded-lg border border-slate-200 text-sm focus:ring-2 focus:ring-emerald-500/30"
              placeholder="Search reports..."
            />
          </div>
        </div>
      </header>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 p-6">
        <StatCard label="Pending Review" value={stats.pending} icon={<Clock />} color="amber" />
        <StatCard label="Verified Today" value={stats.verified} icon={<CheckCircle2 />} color="emerald" />
        <StatCard label="Resolved" value={stats.resolved} icon={<ShieldCheck />} color="blue" />
        <StatCard label="Avg Resolution" value={stats.avgTime} icon={<BarChart3 />} color="slate" />
      </div>

      {/* BODY */}
      <div className="flex-1 flex gap-6 px-6 pb-6 overflow-hidden">

        {/* REPORT LIST */}
        <div className="w-1/3 bg-white rounded-2xl border border-slate-100 shadow-lg overflow-y-auto">
          <div className="p-4 border-b flex justify-between items-center">
            <h2 className="font-bold text-slate-800">Incoming Reports</h2>
            <div className="flex gap-1">
              {["all", "pending", "verified"].map(f => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-3 py-1 text-xs rounded-lg transition ${
                    filter === f
                      ? "bg-emerald-600 text-white"
                      : "text-slate-500 hover:bg-slate-100"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          <div className="p-3 space-y-3">
            {reports
              .filter(r => filter === "all" || r.status === filter)
              .map(r => (
                <motion.div
                  key={r.id}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => setSelectedReport(r)}
                  className="p-3 rounded-xl border border-slate-100 cursor-pointer hover:shadow-md transition"
                >
                  <div className="font-semibold text-slate-900">{r.type}</div>
                  <div className="text-xs text-slate-500 flex items-center gap-1">
                    <MapPin size={12} /> {r.location}
                  </div>
                </motion.div>
              ))}
          </div>
        </div>

        {/* MAP */}
        <div className="flex-1 bg-white rounded-2xl border border-slate-100 shadow-lg overflow-hidden">
          <MapContainer
            center={[22.7196, 75.8577]}
            zoom={13}
            className="w-full h-full"
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {reports.map(r => (
              <Marker
                key={r.id}
                position={[r.lat, r.lng]}
                eventHandlers={{ click: () => setSelectedReport(r) }}
              />
            ))}
          </MapContainer>
        </div>
      </div>

      {/* ACTION SHEET */}
      <AnimatePresence>
        {selectedReport && (
          <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-xl p-6 rounded-2xl shadow-2xl w-[520px] z-50 border border-slate-100"
          >
            <div className="flex justify-between">
              <h3 className="font-bold text-slate-900">{selectedReport.type}</h3>
              <button onClick={() => setSelectedReport(null)}>
                <XCircle />
              </button>
            </div>

            <div className="mt-4 flex gap-3">
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => updateStatus(selectedReport.id, "verified")}
                className="flex-1 bg-emerald-600 text-white py-2.5 rounded-lg font-semibold shadow"
              >
                Verify
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => updateStatus(selectedReport.id, "rejected")}
                className="flex-1 border py-2.5 rounded-lg font-semibold"
              >
                Reject
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ================= STAT CARD ================= */
function StatCard({ label, value, icon, color }) {
  const colors = {
    amber: "bg-amber-50 text-amber-600",
    emerald: "bg-emerald-50 text-emerald-600",
    blue: "bg-blue-50 text-blue-600",
    slate: "bg-slate-100 text-slate-600",
  };

  return (
    <motion.div
      whileHover={{ y: -6 }}
      className="bg-white rounded-2xl border border-slate-100 p-4 flex items-center gap-4 shadow-lg"
    >
      <div className={`p-2 rounded-xl ${colors[color]}`}>
        {icon}
      </div>
      <div>
        <div className="text-2xl font-extrabold text-slate-900">{value}</div>
        <div className="text-xs uppercase text-slate-400 font-bold">
          {label}
        </div>
      </div>
    </motion.div>
  );
}
