import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import RepoInput from './components/RepoInput';
import AnalysisDisplay from './components/AnalysisDisplay';
import Welcome from './components/Welcome';
import Loader from './components/Loader';
import ErrorDisplay from './components/ErrorDisplay';
import History from './components/History';
import HistoryIcon from './components/icons/HistoryIcon';
import Footer from './components/Footer';
import { analyzeRepo } from './services/geminiService';
import type { AnalysisResult, AnalysisDepth, HistoryItem } from './types';
import { decodeResultFromUrl } from './utils/share';

type Theme = 'light' | 'dark';

const App: React.FC = () => {
  const [repoUrl, setRepoUrl] = useState('');
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [depth, setDepth] = useState<AnalysisDepth>('quick');
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [theme, setTheme] = useState<Theme>('dark');

  useEffect(() => {
    // Check for shared analysis in URL
    const urlParams = new URLSearchParams(window.location.search);
    const sharedAnalysis = urlParams.get('analysis');
    if (sharedAnalysis) {
      try {
        const decodedData = decodeResultFromUrl(sharedAnalysis);
        setAnalysisResult(decodedData.result);
        setRepoUrl(decodedData.repoUrl);
        setDepth(decodedData.depth);
        // Clear the URL parameter to avoid re-triggering
        window.history.replaceState({}, document.title, window.location.pathname);
      } catch (e) {
        console.error("Failed to decode shared analysis from URL", e);
        setError("The shared analysis link is invalid or corrupted.");
      }
    }

    // Theme initialization
    const savedTheme = localStorage.getItem('theme') as Theme | null;
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');
    setTheme(initialTheme);

    // History initialization
    try {
      const storedHistory = localStorage.getItem('analysisHistory');
      if (storedHistory) {
        setHistory(JSON.parse(storedHistory));
      }
    } catch (e) {
      console.error("Failed to parse history from localStorage", e);
      localStorage.removeItem('analysisHistory');
    }
  }, []);

  useEffect(() => {
    if (theme === 'light') {
      document.body.classList.remove('dark');
      document.documentElement.classList.remove('dark');
      document.body.classList.add('light');
      document.documentElement.classList.add('light');
    } else {
      document.body.classList.remove('light');
      document.documentElement.classList.remove('light');
      document.body.classList.add('dark');
      document.documentElement.classList.add('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);
  
  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const saveToHistory = (item: HistoryItem) => {
    const updatedHistory = [item, ...history].slice(0, 20); // Keep last 20
    setHistory(updatedHistory);
    localStorage.setItem('analysisHistory', JSON.stringify(updatedHistory));
  };

  const handleAnalyze = async () => {
    if (!repoUrl.trim() || !/^https:\/\/github\.com\/[^\/]+\/[^\/]+/.test(repoUrl)) {
      setError('Please enter a valid GitHub repository URL (e.g., https://github.com/owner/repo).');
      return;
    }

    setIsLoading(true);
    setError(null);
    setAnalysisResult(null);
    setShowHistory(false);

    try {
      const result = await analyzeRepo(repoUrl, depth);
      setAnalysisResult(result);
      saveToHistory({
        id: new Date().toISOString() + Math.random(),
        repoUrl,
        timestamp: new Date().toISOString(),
        result,
        depth
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleExampleClick = (url: string) => {
    setRepoUrl(url);
    if (url !== repoUrl) {
      setAnalysisResult(null); // Clear previous result if URL changes
      setError(null);
      setShowHistory(false);
    }
  };

  const handleHistorySelect = (item: HistoryItem) => {
    setRepoUrl(item.repoUrl);
    setDepth(item.depth);
    setAnalysisResult(item.result);
    setError(null);
    setShowHistory(false);
  };
  
  const handleClearHistory = () => {
    setHistory([]);
    localStorage.removeItem('analysisHistory');
  }
  
  const handleCardPerspective = (e: React.MouseEvent<HTMLDivElement>) => {
      const card = e.currentTarget;
      const { top, left, width, height } = card.getBoundingClientRect();
      const x = (e.clientX - left - width / 2) / 25;
      const y = (e.clientY - top - height / 2) / -25;
      card.style.transform = `perspective(1000px) rotateY(${x}deg) rotateX(${y}deg)`;
  };

  const handleCardLeave = (e: React.MouseEvent<HTMLDivElement>) => {
      e.currentTarget.style.transform = 'perspective(1000px) rotateY(0) rotateX(0)';
  };

  return (
    <div className="min-h-screen p-4 sm:p-8 font-sans bg-grid flex flex-col">
      <div className="max-w-4xl mx-auto w-full flex-grow">
        <Header theme={theme} toggleTheme={toggleTheme} />
        <main className="space-y-6">
          <div onMouseMove={handleCardPerspective} onMouseLeave={handleCardLeave} className="glass-card rounded-lg">
            <RepoInput
              value={repoUrl}
              onChange={(e) => setRepoUrl(e.target.value)}
              onAnalyze={handleAnalyze}
              isLoading={isLoading}
              depth={depth}
              onDepthChange={setDepth}
              onExampleClick={handleExampleClick}
            />
          </div>

          <div className="relative text-right">
            <button
              onClick={() => {
                  setShowHistory(!showHistory);
                  setAnalysisResult(null);
                  setError(null);
              }}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-[var(--text-color-secondary)] dark:bg-gray-800 bg-white/50 border border-[var(--card-border-color)] rounded-md hover:bg-gray-700/10 dark:hover:bg-gray-700 transition-colors"
              title="View analysis history"
            >
              <HistoryIcon className="w-5 h-5" />
              History
            </button>
          </div>
          
          <div className="min-h-[400px]">
            {isLoading ? (
              <Loader />
            ) : error ? (
              <ErrorDisplay message={error} />
            ) : showHistory ? (
              <History items={history} onSelect={handleHistorySelect} onClear={handleClearHistory} onMouseMove={handleCardPerspective} onMouseLeave={handleCardLeave} />
            ) : analysisResult ? (
              <AnalysisDisplay result={analysisResult} repoUrl={repoUrl} depth={depth} onMouseMove={handleCardPerspective} onMouseLeave={handleCardLeave} />
            ) : (
              <Welcome onMouseMove={handleCardPerspective} onMouseLeave={handleCardLeave} />
            )}
          </div>
        </main>
      </div>
      <Footer />
       <style>{`
        .bg-grid {
          background-image: linear-gradient(var(--grid-line-color) 1px, transparent 1px), linear-gradient(90deg, var(--grid-line-color) 1px, transparent 1px);
          background-size: 2rem 2rem;
        }
       `}</style>
    </div>
  );
};

export default App;