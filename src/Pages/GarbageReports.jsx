import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ReportModal from './ReportModal.jsx';
import { ArrowLeft } from 'lucide-react';

const ReportGarbage = () => {
    const navigate = useNavigate();
    // Always true since this is a dedicated page for the report
    const [isOpen, setIsOpen] = useState(true);

    const handleClose = () => {
        setIsOpen(false);
        // Navigate back to home or previous page after transition
        setTimeout(() => navigate('/'), 300);
    };

    const handleSubmitSuccess = () => {
        // Navigate back to home or a success page
        setTimeout(() => navigate('/'), 2000); // Give time for success message
    };

    return (
        <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
            {/* Background fallback in case modal has transparency issues or for better UX */}
            <div className="text-center">
                <h1 className="text-xl font-bold text-slate-400 mb-4">Opening Report Form...</h1>
                <button
                    onClick={() => navigate('/')}
                    className="flex items-center gap-2 text-slate-500 hover:text-slate-700 mx-auto"
                >
                    <ArrowLeft size={16} /> Back to Home
                </button>
            </div>

            <ReportModal
                isOpen={isOpen}
                onClose={handleClose}
                onSubmitSuccess={handleSubmitSuccess}
            />
        </div>
    );
};

export default ReportGarbage;