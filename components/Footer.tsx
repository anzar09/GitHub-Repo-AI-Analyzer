
import React from 'react';
import StarIcon from './icons/StarIcon';
import TwitterIcon from './icons/TwitterIcon';

const Footer: React.FC = () => {
    // IMPORTANT: Replace this with your actual GitHub repository URL
    const repoUrl = "https://github.com/YOUR-USERNAME/YOUR-REPONAME"; 

    // Dynamically get the app's URL for sharing
    const appUrl = window.location.href.split('?')[0];
    const appName = "GitHub Repo AI Analyzer";
    const shareText = `Check out this ${appName}! Get instant AI-powered insights into any public GitHub repository.`;

    return (
        <footer className="w-full max-w-4xl mx-auto mt-12 text-center text-[var(--text-color-secondary)] text-sm">
            <div className="py-6 border-t border-[var(--card-border-color)] flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
                <a href={repoUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-[var(--text-color-primary)] transition-colors">
                    <StarIcon className="w-5 h-5" />
                    <span>Star on GitHub</span>
                </a>
                <a 
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(appUrl)}`}
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center gap-2 hover:text-[var(--text-color-primary)] transition-colors"
                >
                    <TwitterIcon className="w-5 h-5" />
                    <span>Share on X</span>
                </a>
            </div>
            <div className="pb-8">
                <p className="italic">
                    This project is proudly supported by the community. For feedback or support, please{' '}
                    <a href={repoUrl} target="_blank" rel="noopener noreferrer" className="underline hover:text-[var(--text-color-primary)]">
                        visit our GitHub repository
                    </a>.
                    The AI analysis provides a high-level overview and is a great starting point for exploration.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
