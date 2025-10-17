
import React, { useState } from 'react';
import type { AnalysisResult, DeepAnalysisResult, AnalysisDepth } from '../types';
import { marked } from 'marked';
import DOMPurify from 'dompurify';
import { encodeResultForUrl } from '../utils/share';
import CodeIcon from './icons/CodeIcon';
import LightbulbIcon from './icons/LightbulbIcon';
import FolderIcon from './icons/FolderIcon';
import ShieldIcon from './icons/ShieldIcon';
import RocketIcon from './icons/RocketIcon';
import ChartIcon from './icons/ChartIcon';
import CopyIcon from './icons/CopyIcon';
import ShareIcon from './icons/ShareIcon';
import DownloadIcon from './icons/DownloadIcon';

interface AnalysisDisplayProps {
  result: AnalysisResult;
  repoUrl: string;
  depth: AnalysisDepth;
  onMouseMove: (e: React.MouseEvent<HTMLDivElement>) => void;
  onMouseLeave: (e: React.MouseEvent<HTMLDivElement>) => void;
}

type SectionColor = 'blue' | 'green' | 'yellow' | 'indigo' | 'purple' | 'red' | 'cyan' | 'orange';

const colorStyles: Record<SectionColor, string> = {
    blue: 'border-t-blue-500 shadow-blue-500/10 hover:shadow-blue-500/20',
    green: 'border-t-green-500 shadow-green-500/10 hover:shadow-green-500/20',
    yellow: 'border-t-yellow-500 shadow-yellow-500/10 hover:shadow-yellow-500/20',
    indigo: 'border-t-indigo-500 shadow-indigo-500/10 hover:shadow-indigo-500/20',
    purple: 'border-t-purple-500 shadow-purple-500/10 hover:shadow-purple-500/20',
    red: 'border-t-red-500 shadow-red-500/10 hover:shadow-red-500/20',
    cyan: 'border-t-cyan-500 shadow-cyan-500/10 hover:shadow-cyan-500/20',
    orange: 'border-t-orange-500 shadow-orange-500/10 hover:shadow-orange-500/20',
};

const SectionCard: React.FC<{ title: string; icon: React.ReactNode; children: React.ReactNode; color: SectionColor, onMouseMove: (e: React.MouseEvent<HTMLDivElement>) => void; onMouseLeave: (e: React.MouseEvent<HTMLDivElement>) => void; }> = ({ title, icon, children, color, onMouseMove, onMouseLeave }) => (
    <div onMouseMove={onMouseMove} onMouseLeave={onMouseLeave} className={`glass-card p-6 rounded-lg border-t-2 shadow-lg transition-all duration-300 ${colorStyles[color]}`}>
        <div className="flex items-center mb-4">
            {icon}
            <h3 className="text-xl font-semibold text-[var(--text-color-primary)] ml-3">{title}</h3>
        </div>
        <div className="text-[var(--text-color-secondary)] space-y-2 prose prose-sm max-w-none prose-p:my-1 prose-ul:my-1 prose-li:my-0.5 dark:prose-invert">
            {children}
        </div>
    </div>
);

const CodeBlock: React.FC<{ code: string }> = ({ code }) => {
    const [copied, setCopied] = useState(false);
    const handleCopy = () => {
        navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="relative bg-black/20 dark:bg-gray-900 rounded-md p-4 my-2">
            <button onClick={handleCopy} className="absolute top-2 right-2 p-1.5 bg-gray-500/20 dark:bg-gray-700 rounded-md hover:bg-gray-500/40 dark:hover:bg-gray-600 transition-colors" title="Copy code">
                <CopyIcon className="w-4 h-4 text-[var(--text-color-secondary)]" />
            </button>
            <pre><code className="text-xs text-[var(--text-color-secondary)] font-mono whitespace-pre-wrap">{code}</code></pre>
            {copied && <span className="absolute bottom-2 right-2 text-xs text-green-500 dark:text-green-400">Copied!</span>}
        </div>
    );
};

const AnalysisDisplay: React.FC<AnalysisDisplayProps> = ({ result, repoUrl, depth, onMouseMove, onMouseLeave }) => {
  const isDeepDive = 'security' in result;
  const [shareStatus, setShareStatus] = useState<'idle' | 'copied'>('idle');
  
  const createMarkup = (markdownText: string) => {
    const rawMarkup = marked.parse(markdownText, { gfm: true, breaks: true });
    const sanitizedMarkup = DOMPurify.sanitize(rawMarkup as string);
    return { __html: sanitizedMarkup };
  };

  const exportToMarkdown = () => {
    const isDeep = 'security' in result;
    let markdown = `# AI Analysis for ${repoUrl.split('/').slice(-2).join('/')}\n\n`;
    markdown += `*Analysis performed on: ${new Date().toUTCString()}*\n\n`;

    markdown += `## 📝 Project Summary\n\n${result.summary}\n\n`;
    
    markdown += `## 💻 Technology Stack\n\n`;
    result.technologies.forEach(tech => {
      markdown += `- ${tech}\n`;
    });
    markdown += `\n`;

    markdown += `## ✨ Code Quality: ${result.codeQuality.score}/10\n\n`;
    markdown += `${result.codeQuality.comments}\n\n`;

    markdown += `## 📂 Directory Structure Overview\n\n\`\`\`\n${result.structure}\n\`\`\`\n\n`;

    markdown += `## 💡 Improvement Suggestions\n\n`;
    result.suggestions.forEach(suggestion => {
      markdown += `- ${suggestion}\n`;
    });
    markdown += `\n`;

    if (isDeep) {
        const deepResult = result as DeepAnalysisResult;
        markdown += `# Deep Dive Analysis\n\n`;
        markdown += `## 🛡️ Security Considerations\n\n`;
        deepResult.security.forEach(item => {
            markdown += `- ${item}\n`;
        });
        markdown += `\n`;

        markdown += `## 🚀 Performance Aspects\n\n`;
        deepResult.performance.forEach(item => {
            markdown += `- ${item}\n`;
        });
        markdown += `\n`;
        
        markdown += `## 📈 Scalability\n\n${deepResult.scalability}\n\n`;
    }

    const blob = new Blob([markdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", url);
    downloadAnchorNode.setAttribute("download", `${repoUrl.split('/').pop()}_analysis.md`);
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
    URL.revokeObjectURL(url);
  };

  const shareAnalysis = () => {
    const dataToEncode = { result, repoUrl, depth };
    const encodedData = encodeResultForUrl(dataToEncode);
    const shareUrl = `${window.location.origin}${window.location.pathname}?analysis=${encodedData}`;
    
    navigator.clipboard.writeText(shareUrl).then(() => {
        setShareStatus('copied');
        setTimeout(() => setShareStatus('idle'), 2000);
    });
  };

  const sections = [
    <SectionCard key="summary" color="blue" title="Project Summary" icon={<ChartIcon className="w-6 h-6 text-blue-400" />} onMouseMove={onMouseMove} onMouseLeave={onMouseLeave}>
        <div dangerouslySetInnerHTML={createMarkup(result.summary)} />
    </SectionCard>,

    <div key="tech-quality" className="grid md:grid-cols-2 gap-6">
        <SectionCard color="green" title="Technology Stack" icon={<CodeIcon className="w-6 h-6 text-green-400" />} onMouseMove={onMouseMove} onMouseLeave={onMouseLeave}>
            <ul className="list-none p-0 flex flex-wrap gap-2">
                {result.technologies.map((tech) => (
                    <li key={tech} className="bg-gray-500/20 dark:bg-gray-700/50 text-[var(--text-color-primary)] text-sm px-2 py-1 rounded-md">{tech}</li>
                ))}
            </ul>
        </SectionCard>
         <SectionCard color="yellow" title="Code Quality Score" icon={<LightbulbIcon className="w-6 h-6 text-yellow-400" />} onMouseMove={onMouseMove} onMouseLeave={onMouseLeave}>
            <div className="flex items-center gap-4">
                <div className="text-4xl font-bold text-green-500 dark:text-green-400">{result.codeQuality.score}/10</div>
                <p>{result.codeQuality.comments}</p>
            </div>
        </SectionCard>
    </div>,

    <SectionCard key="structure" color="indigo" title="Directory Structure Overview" icon={<FolderIcon className="w-6 h-6 text-indigo-400" />} onMouseMove={onMouseMove} onMouseLeave={onMouseLeave}>
        <CodeBlock code={result.structure} />
    </SectionCard>,

    <SectionCard key="suggestions" color="purple" title="Improvement Suggestions" icon={<LightbulbIcon className="w-6 h-6 text-purple-400" />} onMouseMove={onMouseMove} onMouseLeave={onMouseLeave}>
        <ul className="list-disc list-inside space-y-2">
            {result.suggestions.map((suggestion, index) => <li key={index}>{suggestion}</li>)}
        </ul>
    </SectionCard>,
  ];

  if (isDeepDive) {
    sections.push(
      <div key="deep-dive-title" className="pt-4 mt-4 border-t border-[var(--card-border-color)]">
        <h3 className="text-xl font-semibold text-[var(--text-color-primary)]">Deep Dive Analysis</h3>
      </div>
    );
    sections.push(
      <div key="security-performance" className="grid md:grid-cols-2 gap-6">
          <SectionCard color="red" title="Security Considerations" icon={<ShieldIcon className="w-6 h-6 text-red-400" />} onMouseMove={onMouseMove} onMouseLeave={onMouseLeave}>
              <ul className="list-disc list-inside space-y-2">
                  {(result as DeepAnalysisResult).security.map((item, index) => <li key={index}>{item}</li>)}
              </ul>
          </SectionCard>
          <SectionCard color="cyan" title="Performance Aspects" icon={<RocketIcon className="w-6 h-6 text-cyan-400" />} onMouseMove={onMouseMove} onMouseLeave={onMouseLeave}>
              <ul className="list-disc list-inside space-y-2">
                   {(result as DeepAnalysisResult).performance.map((item, index) => <li key={index}>{item}</li>)}
              </ul>
          </SectionCard>
      </div>
    );
    sections.push(
       <SectionCard key="scalability" color="orange" title="Scalability" icon={<ChartIcon className="w-6 h-6 text-orange-400" />} onMouseMove={onMouseMove} onMouseLeave={onMouseLeave}>
          <p>{(result as DeepAnalysisResult).scalability}</p>
      </SectionCard>
    );
  }

  return (
    <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 animate-fade-in-stagger">
             <h2 className="text-2xl font-bold text-[var(--text-color-primary)] glowing-text truncate">Analysis for: <a href={repoUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 dark:text-blue-400 hover:underline">{repoUrl.split('/').slice(-2).join('/')}</a></h2>
             <div className="relative flex items-center gap-2 flex-shrink-0">
                 <button onClick={shareAnalysis} title="Copy Shareable Link" className="p-2 bg-gray-500/20 dark:bg-gray-700 rounded-md hover:bg-gray-500/40 dark:hover:bg-gray-600 transition-colors"><ShareIcon className="w-5 h-5 text-[var(--text-color-secondary)]" /></button>
                 <button onClick={exportToMarkdown} title="Export to Markdown" className="p-2 bg-gray-500/20 dark:bg-gray-700 rounded-md hover:bg-gray-500/40 dark:hover:bg-gray-600 transition-colors"><DownloadIcon className="w-5 h-5 text-[var(--text-color-secondary)]" /></button>
                  {shareStatus === 'copied' && (
                    <div className="absolute -top-10 right-0 bg-green-600 text-white text-xs font-semibold px-2 py-1 rounded-md shadow-lg animate-fade-in-stagger">
                        Link Copied!
                    </div>
                 )}
             </div>
        </div>
      
        {sections.map((section, index) => (
            <div key={index} className="animate-fade-in-stagger" style={{ animationDelay: `${index * 100}ms` }}>
                {section}
            </div>
        ))}
    </div>
  );
};

export default AnalysisDisplay;
