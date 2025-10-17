
import React from 'react';

const Loader: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center p-8 min-h-[400px]">
        <div className="w-16 h-16 relative animate-spin-slow">
            <div className="absolute top-0 left-0 w-8 h-8 bg-blue-500/50 rounded-full animate-pulse-delay-1"></div>
            <div className="absolute top-0 right-0 w-8 h-8 bg-green-500/50 rounded-full animate-pulse-delay-2"></div>
            <div className="absolute bottom-0 left-0 w-8 h-8 bg-purple-500/50 rounded-full animate-pulse-delay-3"></div>
            <div className="absolute bottom-0 right-0 w-8 h-8 bg-yellow-500/50 rounded-full animate-pulse-delay-4"></div>
        </div>
        <h2 className="text-2xl font-semibold text-white mt-8 glowing-text">Analyzing Repository...</h2>
        <p className="text-gray-400 mt-2">The AI is warming up its circuits. This may take a moment.</p>
        <style>{`
            .animate-spin-slow {
                animation: spin 3s linear infinite;
            }
            @keyframes pulse-delay {
                0%, 100% { transform: scale(0.8); opacity: 0.7; }
                50% { transform: scale(1.1); opacity: 1; }
            }
            .animate-pulse-delay-1 { animation: pulse-delay 2s infinite ease-in-out; }
            .animate-pulse-delay-2 { animation: pulse-delay 2s infinite ease-in-out 0.25s; }
            .animate-pulse-delay-3 { animation: pulse-delay 2s infinite ease-in-out 0.5s; }
            .animate-pulse-delay-4 { animation: pulse-delay 2s infinite ease-in-out 0.75s; }
        `}</style>
    </div>
  );
};

export default Loader;
