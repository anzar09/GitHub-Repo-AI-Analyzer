import React from 'react';
import type { AnalysisDepth } from '../types';

interface RepoInputProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onAnalyze: () => void;
  isLoading: boolean;
  depth: AnalysisDepth;
  onDepthChange: (depth: AnalysisDepth) => void;
  onExampleClick: (url: string) => void;
}

const exampleRepos = [
  { name: 'React', url: 'https://github.com/facebook/react' },
  { name: 'VS Code', url: 'https://github.com/microsoft/vscode' },
  { name: 'Tailwind CSS', url: 'https://github.com/tailwindlabs/tailwindcss' },
];

const RepoInput: React.FC<RepoInputProps> = ({ value, onChange, onAnalyze, isLoading, depth, onDepthChange, onExampleClick }) => {
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && !isLoading) {
      onAnalyze();
    }
  };

  return (
    <div className="p-6 rounded-lg space-y-4">
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <div className="w-full bg-transparent border border-gray-600/50 dark:border-gray-700 rounded-md transition-shadow glowing-input">
            <input
              type="text"
              value={value}
              onChange={onChange}
              onKeyDown={handleKeyDown}
              placeholder="e.g., https://github.com/facebook/react"
              className="w-full px-4 py-3 bg-transparent focus:outline-none text-[var(--text-color-primary)] placeholder-[var(--text-color-secondary)]"
              disabled={isLoading}
            />
        </div>
        <button
          onClick={onAnalyze}
          disabled={isLoading}
          className="w-full sm:w-auto px-6 py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:bg-gray-500 disabled:saturate-50 disabled:cursor-not-allowed flex items-center justify-center btn-3d"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Analyzing...
            </>
          ) : (
            'Analyze'
          )}
        </button>
      </div>
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-2">
        <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-[var(--text-color-secondary)]">Analysis Depth:</span>
            <div className="flex items-center bg-black/10 dark:bg-gray-800 rounded-full border border-[var(--card-border-color)] p-1">
                <button onClick={() => onDepthChange('quick')} className={`px-3 py-1 text-sm rounded-full ${depth === 'quick' ? 'bg-blue-600 text-white' : 'text-[var(--text-color-secondary)] hover:bg-black/10 dark:hover:bg-gray-700'} transition-colors`}>Quick Overview</button>
                <button onClick={() => onDepthChange('deep')} className={`px-3 py-1 text-sm rounded-full ${depth === 'deep' ? 'bg-blue-600 text-white' : 'text-[var(--text-color-secondary)] hover:bg-black/10 dark:hover:bg-gray-700'} transition-colors`}>Deep Dive</button>
            </div>
        </div>
        <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-[var(--text-color-secondary)]">Try an example:</span>
            {exampleRepos.map(repo => (
                <button key={repo.name} onClick={() => onExampleClick(repo.url)} disabled={isLoading} className="text-sm bg-black/10 dark:bg-gray-700 hover:bg-black/20 dark:hover:bg-gray-600 text-[var(--text-color-secondary)] px-2 py-1 rounded-md transition-colors disabled:opacity-50">
                    {repo.name}
                </button>
            ))}
        </div>
      </div>
    </div>
  );
};

export default RepoInput;