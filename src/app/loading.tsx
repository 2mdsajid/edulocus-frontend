import React from 'react'

type Props = {}

const loading = (props: Props) => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      {/* Loading container */}
      <div className="flex flex-col items-center space-y-6">
        {/* Pulsating Circle Animation */}
        <div className="relative flex items-center justify-center">
          <div className="bg-blue-500 rounded-full h-24 w-24 animate-ping-once opacity-75"></div>
          <div className="absolute bg-blue-600 rounded-full h-20 w-20 animate-pulse-slow"></div>
          <div className="absolute bg-blue-700 rounded-full h-16 w-16"></div>
        </div>
        {/* Loading text */}
        <p className="text-gray-700 text-lg font-semibold animate-pulse">
          Loading... Please wait.
        </p>
      </div>

      {/* Custom Tailwind CSS animations for demonstration purposes */}
      <style>{`
        @keyframes ping-once {
          0% {
            transform: scale(0.2);
            opacity: 0.8;
          }
          80%, 100% {
            transform: scale(1.5);
            opacity: 0;
          }
        }
        @keyframes pulse-slow {
          0%, 100% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.1);
            opacity: 0.8;
          }
        }
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: .5;
          }
        }
        .animate-ping-once {
          animation: ping-once 2s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
        .animate-pulse-slow {
          animation: pulse-slow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
    </div>
  )
}

export default loading