import React from 'react';
import CodeIcon from './icons/CodeIcon';
import LightbulbIcon from './icons/LightbulbIcon';
import ChartIcon from './icons/ChartIcon';

interface WelcomeProps {
    onMouseMove: (e: React.MouseEvent<HTMLDivElement>) => void;
    onMouseLeave: (e: React.MouseEvent<HTMLDivElement>) => void;
}

const FeatureCard: React.FC<{ icon: React.ReactNode; title: string; description: string }> = ({ icon, title, description }) => (
  <div className="flex flex-col items-center text-center p-4">
    <div className="bg-black/10 dark:bg-gray-900/50 p-4 rounded-full mb-4 border border-white/10">
      {icon}
    </div>
    <h3 className="font-semibold text-lg text-[var(--text-color-primary)] mb-2">{title}</h3>
    <p className="text-[var(--text-color-secondary)] text-sm">{description}</p>
  </div>
);

const Welcome: React.FC<WelcomeProps> = ({ onMouseMove, onMouseLeave }) => {
  return (
    <div onMouseMove={onMouseMove} onMouseLeave={onMouseLeave} className="text-center p-8 glass-card rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-[var(--text-color-primary)] glowing-text">Welcome to the AI Repo Analyzer</h2>
      <p className="text-[var(--text-color-secondary)] mb-8 max-w-2xl mx-auto">
        Paste a public GitHub repository URL above, choose your analysis depth, and click "Analyze" to get an AI-generated breakdown of the project.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <FeatureCard 
          icon={<ChartIcon className="w-8 h-8 text-blue-400" />}
          title="Project Summary"
          description="Understand the repository's purpose and main features at a glance."
        />
        <FeatureCard 
          icon={<CodeIcon className="w-8 h-8 text-green-400" />}
          title="Tech Stack"
          description="Identify the key languages, frameworks, and libraries used in the project."
        />
        <FeatureCard 
          icon={<LightbulbIcon className="w-8 h-8 text-purple-400" />}
          title="Actionable Insights"
          description="Receive a code quality score and concrete suggestions for improvement."
        />
      </div>
    </div>
  );
};

export default Welcome;