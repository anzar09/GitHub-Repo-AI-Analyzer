import React from 'react';
import GithubIcon from './icons/GithubIcon';
import SunIcon from './icons/SunIcon';
import MoonIcon from './icons/MoonIcon';

interface HeaderProps {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const Header: React.FC<HeaderProps> = ({ theme, toggleTheme }) => {
  return (
    <header className="flex items-center justify-between mb-8 text-center w-full">
      <div className="w-12 h-12"></div> {/* Spacer */}
      <div className="flex flex-col items-center">
        <div className="flex items-center">
            <GithubIcon className="w-12 h-12 mr-4 text-[var(--text-color-primary)] drop-shadow-lg" />
            <div>
              <h1 className="text-4xl font-bold text-[var(--text-color-primary)] glowing-text">GitHub Repo AI Analyzer</h1>
              <p className="text-[var(--text-color-secondary)] mt-1">Get instant insights into any public repository</p>
            </div>
        </div>
      </div>
      <button 
        onClick={toggleTheme} 
        className="w-12 h-12 flex items-center justify-center rounded-full bg-[var(--card-bg-color)] border border-[var(--card-border-color)] transition-all hover:bg-gray-700/20"
        aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      >
        {theme === 'light' ? <MoonIcon className="w-6 h-6 text-yellow-500" /> : <SunIcon className="w-6 h-6 text-yellow-300" />}
      </button>
    </header>
  );
};

export default Header;