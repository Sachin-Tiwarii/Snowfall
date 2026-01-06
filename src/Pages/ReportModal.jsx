import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Camera, MapPin, Loader2, UploadCloud } from "lucide-react";

export default function ReportModal({ isOpen, onClose, onSubmitSuccess }) {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    image: null,
    preview: null,
    category: "",
    description: "",
    location: "Fetching location...",
    lat: null,
    lng: null
  });

  // 📍 1. Auto-Fetch Location
  const fetchLocation = () => {
    setFormData(prev => ({ ...prev, location: "Locating..." }));
    if (navigator.geolocation) {
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
    }
  };

  // 📸 2. Handle Image Upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        image: file,
        preview: URL.createObjectURL(file)
      }));
      fetchLocation(); // Auto-fetch location on image upload
    }
  };

  // 🚀 3. Submit Handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API Call (2 seconds)
    setTimeout(() => {
      setLoading(false);
      onSubmitSuccess(); // Triggers confetti in parent
      onClose(); // Close modal
      setStep(1); // Reset form
      setFormData({ image: null, preview: null, category: "", description: "", location: "" });
    }, 2000);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        >
          {/* Header */}
          <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
            <h2 className="font-bold text-slate-800 text-lg">New Report</h2>
            <button onClick={onClose} className="p-1 hover:bg-slate-200 rounded-full transition-colors">
              <X size={20} className="text-slate-500" />
            </button>
          </div>

          {/* Body */}
          <div className="p-6 overflow-y-auto">
            
            {/* Step 1: Image Upload */}
            {!formData.preview ? (
              <label className="flex flex-col items-center justify-center h-48 border-2 border-dashed border-slate-300 rounded-xl bg-slate-50 cursor-pointer hover:bg-slate-100 hover:border-emerald-400 transition-all group">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm mb-3 group-hover:scale-110 transition-transform">
                  <Camera className="text-emerald-600" size={24} />
                </div>
                <p className="text-sm font-bold text-slate-600">Tap to Snap Photo</p>
                <p className="text-xs text-slate-400 mt-1">Supports JPG, PNG</p>
                <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
              </label>
            ) : (
              <div className="relative h-48 rounded-xl overflow-hidden mb-6 group">
                <img src={formData.preview} alt="Preview" className="w-full h-full object-cover" />
                <button 
                  onClick={() => setFormData(prev => ({ ...prev, preview: null }))}
                  className="absolute top-2 right-2 bg-black/50 text-white p-1.5 rounded-full hover:bg-red-500 transition-colors"
                >
                  <X size={16} />
                </button>
                <div className="absolute bottom-2 left-2 bg-black/60 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 backdrop-blur-sm">
                  <MapPin size={10} /> {formData.location}
                </div>
              </div>
            )}

            {/* Form Fields (Only show after image is selected) */}
            {formData.preview && (
              <motion.form 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                onSubmit={handleSubmit}
                className="space-y-4"
              >
                {/* Category Grid */}
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase mb-2 block">Select Category</label>
                  <div className="grid grid-cols-3 gap-2">
                    {['Pothole', 'Garbage', 'Light', 'Water', 'Traffic', 'Other'].map(cat => (
                      <button
                        type="button"
                        key={cat}
                        onClick={() => setFormData({ ...formData, category: cat })}
                        className={`py-2 px-1 text-xs font-bold rounded-lg border transition-all ${
                          formData.category === cat 
                            ? 'bg-emerald-600 text-white border-emerald-600 shadow-md' 
                            : 'bg-white text-slate-600 border-slate-200 hover:border-emerald-300'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase mb-2 block">Description</label>
                  <textarea 
                    placeholder="Describe the issue..." 
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 resize-none h-24"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  />
                </div>

                {/* Submit Button */}
                <button 
                  type="submit" 
                  disabled={!formData.category || loading}
                  className="w-full py-3.5 bg-slate-900 text-white rounded-xl font-bold shadow-lg hover:bg-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 mt-2"
                >
                  {loading ? (
                    <>
                      <Loader2 className="animate-spin" size={18} /> Submitting...
                    </>
                  ) : (
                    <>
                      <UploadCloud size={18} /> Submit Report
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
// RpeotModel