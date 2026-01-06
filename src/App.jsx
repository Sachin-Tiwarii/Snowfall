import { Routes, Route } from "react-router-dom";

import Landing from "./Pages/Landing";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Dashboard from "./Pages/Dashboard";
import AdminDashboard from "./Pages/AdminDashboard";
import GarbageReports from "./Pages/GarbageReports";
import StreetLightComplaint from "./Pages/StreetLightComplaint"

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Citizen Dashboard */}
      <Route path="/dashboard" element={<Dashboard />} />

      {/* Admin Dashboard */}
      <Route path="/admin" element={<AdminDashboard />} />

      {/* Category Pages */}
      <Route path="/reports/garbage" element={<GarbageReports />} />
    </Routes>
  );
}
