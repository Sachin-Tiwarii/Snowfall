import {
  FaTrash,
  FaLightbulb,
  FaRoad,
  FaWater,
  FaVolumeUp,
  FaParking,
  FaMapMarkerAlt,
  FaTrophy,
} from "react-icons/fa";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  const categories = [
    { name: "Garbage", icon: <FaTrash />, path: "/reports/garbage" },
    { name: "Street Light", icon: <FaLightbulb /> },
    { name: "Road Damage", icon: <FaRoad /> },
    { name: "Water Supply", icon: <FaWater /> },
    { name: "Noise", icon: <FaVolumeUp /> },
    { name: "Parking", icon: <FaParking /> },
  ];

  const demoReports = [
    { title: "Garbage Overflow", location: "Rajwada Sq", status: "Pending" },
    { title: "Street Light Not Working", location: "Vijay Nagar", status: "Resolved" },
    { title: "Road Pothole", location: "Palasia Zone", status: "Verified" },
  ];

  const leaderboard = [
    { name: "Amit", points: 320 },
    { name: "Neha", points: 290 },
    { name: "Rahul", points: 250 },
    { name: "Pooja", points: 210 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-slate-50 px-6 py-10">
      <div className="max-w-7xl mx-auto space-y-10">

        {/* HEADER */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-xl p-6 flex flex-col md:flex-row md:items-center md:justify-between border border-slate-100"
        >
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900">
              Civic<span className="text-emerald-600">Setu</span>
            </h1>
            <p className="text-sm text-slate-500 flex items-center gap-2 mt-1">
              <FaMapMarkerAlt className="text-emerald-600" />
              Indore, Madhya Pradesh
            </p>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-4 md:mt-0 bg-emerald-600 hover:bg-emerald-700 transition text-white px-8 py-3 rounded-xl text-lg font-semibold shadow-lg shadow-emerald-600/25"
          >
            Report an Issue
          </motion.button>
        </motion.div>

        {/* QUICK CATEGORIES */}
        <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-slate-100">
          <h2 className="text-xl font-bold text-slate-800 mb-6">
            Quick Report Categories
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6">
            {categories.map((cat, i) => (
              <motion.div
                key={cat.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ y: -6, scale: 1.05 }}
                onClick={() => cat.path && navigate(cat.path)}
                className="group bg-gradient-to-br from-white to-slate-50 border border-slate-200 rounded-2xl p-6 flex flex-col items-center text-center cursor-pointer hover:border-emerald-500 hover:shadow-xl transition"
              >
                <div className="text-emerald-600 text-3xl mb-3 group-hover:scale-110 transition">
                  {cat.icon}
                </div>
                <span className="text-sm font-semibold text-slate-700">
                  {cat.name}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* RECENT REPORTS */}
        <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-slate-100">
          <h2 className="text-xl font-bold text-slate-800 mb-6">
            Recent Reports
          </h2>

          <div className="space-y-4">
            {demoReports.map((r, i) => (
              <motion.div
                key={i}
                whileHover={{ x: 6 }}
                className="flex items-center justify-between p-4 rounded-xl border border-slate-200 bg-white hover:shadow-md transition"
              >
                <div>
                  <p className="font-semibold text-slate-800">{r.title}</p>
                  <p className="text-sm text-slate-500">{r.location}</p>
                </div>

                <span
                  className={`text-xs font-bold px-3 py-1 rounded-full ${
                    r.status === "Pending"
                      ? "bg-amber-100 text-amber-700"
                      : r.status === "Resolved"
                      ? "bg-emerald-100 text-emerald-700"
                      : "bg-blue-100 text-blue-700"
                  }`}
                >
                  {r.status}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* LEADERBOARD */}
        <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-xl p-6 max-w-xl border border-slate-100">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
            <FaTrophy className="text-amber-500" /> City Leaderboard
          </h2>

          <div className="space-y-4">
            {leaderboard.map((user, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.02 }}
                className="p-4 rounded-xl border border-slate-200 bg-white hover:shadow-md transition"
              >
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-slate-700">
                    {i === 0 && "🥇 "}
                    {i === 1 && "🥈 "}
                    {i === 2 && "🥉 "}
                    #{i + 1} {user.name}
                  </span>
                  <span className="font-bold text-emerald-600">
                    {user.points} pts
                  </span>
                </div>

                <div className="mt-3 h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-emerald-500 rounded-full"
                    style={{ width: `${(user.points / 320) * 100}%` }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
