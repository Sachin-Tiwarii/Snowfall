import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Camera, MapPin, Loader2, UploadCloud, Hash, Zap, AlertCircle } from "lucide-react";

export default function StreetLightComplaint() {
  const [isOpen, setIsOpen] = useState(true);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    image: null,
    preview: null,
    poleId: "",
    lightType: "",
    description: "",
    location: "Fetching location...",
    lat: null,
    lng: null
  });

  // 📍 Auto-Fetch GPS
  const fetchLocation = () => {
    setFormData(prev => ({ ...prev, location: "Locating..." }));
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setFormData(prev => ({
          ...prev,
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          location: `${position.coords.latitude.toFixed(4)}, ${position.coords.longitude.toFixed(4)}`
        }));
      },
      () => setFormData(prev => ({ ...prev, location: "Location access denied" }))
    );
  };

  // 📸 Image Upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        image: file,
        preview: URL.createObjectURL(file)
      }));
      fetchLocation();
    }
  };

  // 🚀 Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    setTimeout(() => {
      setLoading(false);
      alert("Street Light Complaint Submitted! 🚀\n\nPole ID: " + formData.poleId + "\nLocation: " + formData.location);
      setIsOpen(false);
      // window.location.href = "/"; // Redirect to home
    }, 1500);
  };

  if (!isOpen) return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center">
      <button 
        className="px-8 py-4 bg-emerald-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all"
        onClick={() => setIsOpen(true)}
      >
        Report Street Light Issue
      </button>
    </div>
  );

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        >
          {/* Header - Street Light Specific */}
          <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-gradient-to-r from-emerald-50 to-slate-50">
            <div className="flex items-center gap-2">
              <Zap className="text-amber-500" size={20} />
              <h2 className="font-bold text-slate-800 text-lg">Street Light Issue</h2>
            </div>
            <button onClick={() => setIsOpen(false)} className="p-1 hover:bg-slate-200 rounded-full">
              <X size={20} className="text-slate-500" />
            </button>
          </div>

          {/* Body */}
          <div className="p-6 overflow-y-auto">
            
            {/* Photo Upload - Night Optimized */}
            {!formData.preview ? (
              <label className="flex flex-col items-center justify-center h-52 border-2 border-dashed border-slate-300 rounded-xl bg-gradient-to-br from-slate-50 to-slate-100 cursor-pointer hover:bg-slate-50 hover:border-emerald-400 transition-all group">
                <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-md mb-4 group-hover:scale-110 transition-transform">
                  <Camera className="text-emerald-600" size={28} />
                </div>
                <p className="text-sm font-bold text-slate-600 mb-1">Upload Street Light Photo</p>
                <p className="text-xs text-slate-400">Night photos work best • JPG, PNG</p>
                <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
              </label>
            ) : (
              <div className="relative h-52 rounded-xl overflow-hidden mb-6">
                <img src={formData.preview} alt="Street light preview" className="w-full h-full object-cover brightness-105 contrast-110" />
                <button 
                  onClick={() => setFormData(prev => ({ ...prev, preview: null }))}
                  className="absolute top-3 right-3 bg-black/60 text-white p-2 rounded-full hover:bg-red-500 transition-colors backdrop-blur-sm"
                >
                  <X size={18} />
                </button>
                <div className="absolute bottom-3 left-3 bg-black/70 text-white px-4 py-2 rounded-full text-xs font-bold flex items-center gap-1 backdrop-blur-sm">
                  <MapPin size={12} /> {formData.location}
                </div>
              </div>
            )}

            {/* Street Light Specific Form */}
            {formData.preview && (
              <motion.form 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                onSubmit={handleSubmit}
                className="space-y-4"
              >
                
                {/* Pole ID - Streetlight Specific */}
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase mb-2 block flex items-center gap-1">
                    <Hash className="w-3 h-3 text-amber-500" />
                    Pole ID (if visible)
                  </label>
                  <input 
                    type="text" 
                    placeholder="SL-IND-1234 or leave blank" 
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                    value={formData.poleId}
                    onChange={(e) => setFormData({ ...formData, poleId: e.target.value })}
                  />
                </div>

                {/* Light Type */}
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase mb-2 block">Light Type</label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { id: 'led', label: 'LED', icon: '💡' },
                      { id: 'sodium', label: 'Sodium', icon: '🟡' },
                      { id: 'tube', label: 'Tube Light', icon: '📏' },
                      { id: 'unknown', label: 'Unknown', icon: '❓' }
                    ].map(light => (
                      <button
                        type="button"
                        key={light.id}
                        onClick={() => setFormData({ ...formData, lightType: light.label })}
                        className={`py-3 px-4 text-sm font-bold rounded-lg border transition-all flex items-center gap-2 ${
                          formData.lightType === light.label 
                            ? 'bg-emerald-600 text-white border-emerald-600 shadow-md' 
                            : 'bg-white text-slate-600 border-slate-200 hover:border-emerald-300 hover:shadow-sm'
                        }`}
                      >
                        {light.icon} {light.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase mb-2 block flex items-center gap-1">
                    <AlertCircle className="w-3 h-3 text-amber-500" />
                    Issue Details
                  </label>
                  <textarea 
                    placeholder="Flickering? Completely off? Multiple lights?..." 
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 resize-none h-24"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  />
                </div>

                {/* Safety Notice */}
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-3">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="text-amber-500 mt-0.5 w-5 h-5 flex-shrink-0" />
                    <div>
                      <p className="text-xs font-bold text-amber-800 mb-1">Safety Priority</p>
                      <p className="text-xs text-amber-700">Street light issues are marked as high priority for immediate action.</p>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <button 
                  type="submit" 
                  disabled={!formData.lightType || loading}
                  className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl font-bold shadow-xl shadow-emerald-600/20 transition-all flex items-center justify-center gap-2 text-sm"
                >
                  {loading ? (
                    <>
                      <Loader2 className="animate-spin" size={20} /> Processing...
                    </>
                  ) : (
                    <>
                      <UploadCloud size={20} /> Submit Street Light Complaint
                    </>
                  )}
                </button>
              </motion.form>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
//StreetLightComplaint