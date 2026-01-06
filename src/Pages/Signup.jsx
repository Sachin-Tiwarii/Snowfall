import { useNavigate } from "react-router-dom";
import rajwada from "../assets/rajwada.png";

export default function Signup() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen relative overflow-hidden">

      {/* Background Image */}
      <img
        src={rajwada}
        alt="Rajwada Indore"
        className="absolute inset-0 w-full h-full object-cover opacity-40"
      />

      {/* SINGLE overlay */}
      <div className="absolute inset-0 bg-white/60" />

      {/* Signup Card */}
      <div className="relative z-10 min-h-screen flex items-center justify-center">
        <div className="bg-gradient-to-br from-white/10 to-white/10 backdrop-blur-xl w-[420px] p-8 rounded-3xl shadow-2xl border border-white/40">

          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-12 h-12 mx-auto rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold shadow-md mb-3">
              CS
            </div>
            <h2 className="text-2xl font-extrabold text-slate-900">
              Create Account
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Join CivicSetu · Indore
            </p>
          </div>

          {/* Inputs */}
          <div className="space-y-4">
            <input
              className="w-full p-3.5 border border-slate-300 rounded-xl bg-white/80 focus:outline-none focus:ring-2 focus:ring-emerald-600"
              placeholder="Username"
            />

            <input
              className="w-full p-3.5 border border-slate-300 rounded-xl bg-white/80 focus:outline-none focus:ring-2 focus:ring-emerald-600"
              placeholder="Mobile Number"
            />

            <input
              className="w-full p-3.5 border border-slate-300 rounded-xl bg-white/80 focus:outline-none focus:ring-2 focus:ring-emerald-600"
              placeholder="City (Indore)"
            />

            <input
              type="password"
              className="w-full p-3.5 border border-slate-300 rounded-xl bg-white/80 focus:outline-none focus:ring-2 focus:ring-emerald-600"
              placeholder="Password"
            />
          </div>

          {/* Create Account */}
          <button
            onClick={() => navigate("/dashboard")}
            className="w-full mt-6 bg-emerald-600 hover:bg-emerald-700 transition text-white py-3.5 rounded-xl font-semibold shadow-lg shadow-emerald-600/25"
          >
            Create Account
          </button>

          {/* Footer */}
          <p className="text-center text-sm text-slate-500 mt-6">
            Already have an account?{" "}
            <span
              className="text-emerald-600 hover:underline cursor-pointer font-semibold"
              onClick={() => navigate("/login")}
            >
              Login
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
