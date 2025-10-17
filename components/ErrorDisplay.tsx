import React from 'react';

interface ErrorDisplayProps {
  message: string;
}

const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ message }) => {
  return (
    <div className="bg-red-500/10 border border-red-500/30 text-red-800 dark:text-red-300 px-4 py-3 rounded-lg relative glass-card" role="alert">
      <strong className="font-bold text-red-900 dark:text-red-200">Error: </strong>
      <span className="block sm:inline">{message}</span>
    </div>
  );
};

export default ErrorDisplay;