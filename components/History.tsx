import React from 'react';
import type { HistoryItem } from '../types';
import GithubIcon from './icons/GithubIcon';
import TrashIcon from './icons/TrashIcon';

interface HistoryProps {
  items: HistoryItem[];
  onSelect: (item: HistoryItem) => void;
  onClear: () => void;
  onMouseMove: (e: React.MouseEvent<HTMLDivElement>) => void;
  onMouseLeave: (e: React.MouseEvent<HTMLDivElement>) => void;
}

const History: React.FC<HistoryProps> = ({ items, onSelect, onClear, onMouseMove, onMouseLeave }) => {
  if (items.length === 0) {
    return (
      <div onMouseMove={onMouseMove} onMouseLeave={onMouseLeave} className="text-center p-8 glass-card rounded-lg animate-fade-in-stagger">
        <h2 className="text-2xl font-bold mb-4 text-[var(--text-color-primary)] glowing-text">Analysis History is Empty</h2>
        <p className="text-[var(--text-color-secondary)] max-w-2xl mx-auto">
          Your analyzed repositories will appear here for quick access.
        </p>
      </div>
    );
  }

  return (
    <div onMouseMove={onMouseMove} onMouseLeave={onMouseLeave} className="glass-card p-6 rounded-lg space-y-4 animate-fade-in-stagger">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-[var(--text-color-primary)] glowing-text">Analysis History</h2>
        <button 
          onClick={onClear} 
          className="inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-red-300 bg-red-900/50 border border-red-500/30 rounded-md hover:bg-red-900/80 transition-colors"
          title="Clear all history"
        >
          <TrashIcon className="w-4 h-4" />
          Clear History
        </button>
      </div>
      <ul className="space-y-3 max-h-96 overflow-y-auto pr-2">
        {items.map((item) => (
          <li key={item.id}>
            <button
              onClick={() => onSelect(item)}
              className="w-full text-left p-4 bg-black/10 dark:bg-gray-800/50 rounded-lg hover:bg-black/20 dark:hover:bg-gray-700/70 border border-[var(--card-border-color)] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3 min-w-0">
                    <GithubIcon className="w-6 h-6 text-gray-500 dark:text-gray-400 flex-shrink-0" />
                    <div className="flex-grow min-w-0">
                        <p className="font-semibold text-blue-600 dark:text-blue-400 truncate">{item.repoUrl.replace('https://github.com/', '')}</p>
                        <p className="text-xs text-gray-600 dark:text-gray-500">
                        Analyzed on {new Date(item.timestamp).toLocaleDateString()} at {new Date(item.timestamp).toLocaleTimeString()}
                        </p>
                    </div>
                </div>
                <span className={`px-2 py-0.5 text-xs font-medium rounded-full flex-shrink-0 ${item.depth === 'deep' ? 'bg-purple-600 text-purple-100' : 'bg-blue-600 text-blue-100'}`}>
                    {item.depth === 'deep' ? 'Deep Dive' : 'Quick'}
                </span>
              </div>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default History;