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
                whileHover={{ y: -6, scale: 1.05 }}
                onClick={() => cat.path && navigate(cat.path)}
                className="group bg-gradient-to-br from-white to-slate-50 border border-slate-200 rounded-2xl p-6 flex flex-col items-center text-center cursor-pointer hover:border-emerald-500 hover:shadow-xl transition"
              >
                <div className="text-emerald-600 text-3xl mb-3">
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

        {/* 🔥 LEADERBOARD + RIGHT PANEL */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* LEADERBOARD */}
          <div className="bg-gradient-to-br from-white/90 to-emerald-50/70 backdrop-blur-xl rounded-3xl shadow-2xl p-6 border border-slate-100">
            <h2 className="text-xl font-extrabold mb-6 flex items-center gap-3">
              <FaTrophy className="text-amber-500 text-2xl" />
              Top Civic Contributors
            </h2>

            <div className="space-y-5">
              {leaderboard.map((user, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.04 }}
                  className="rounded-2xl p-4 bg-white border shadow-md"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-bold text-slate-800">
                        #{i + 1} {user.name}
                      </p>
                      <p className="text-xs text-slate-500">Civic Impact</p>
                    </div>
                    <p className="font-extrabold text-emerald-600">
                      {user.points} pts
                    </p>
                  </div>

                  <div className="mt-3 h-2 bg-slate-100 rounded-full">
                    <div
                      className="h-full bg-emerald-500 rounded-full"
                      style={{ width: `${(user.points / 320) * 100}%` }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* RIGHT SIDE CONTENT */}
          <div className="space-y-6">

            {/* USER IMPACT */}
            <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-xl p-6 border">
              <h3 className="font-bold text-slate-800 mb-4">
                Your Civic Impact
              </h3>

              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="bg-emerald-50 rounded-xl p-4">
                  <p className="text-2xl font-extrabold text-emerald-600">12</p>
                  <p className="text-xs text-slate-500">Reports</p>
                </div>
                <div className="bg-blue-50 rounded-xl p-4">
                  <p className="text-2xl font-extrabold text-blue-600">9</p>
                  <p className="text-xs text-slate-500">Resolved</p>
                </div>
                <div className="bg-amber-50 rounded-xl p-4">
                  <p className="text-2xl font-extrabold text-amber-600">₹120</p>
                  <p className="text-xs text-slate-500">Rewards</p>
                </div>
              </div>
            </div>

            {/* MOTIVATION CARD */}
            <div className="bg-gradient-to-br from-emerald-600 to-emerald-700 text-white rounded-3xl p-6 shadow-xl">
              <h3 className="font-extrabold text-lg mb-2">
                Make Indore Better 🌱
              </h3>
              <p className="text-sm text-emerald-100">
                Report issues, earn rewards, and climb the leaderboard by helping your city.
              </p>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
