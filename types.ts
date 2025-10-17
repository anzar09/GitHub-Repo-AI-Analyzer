export type AnalysisDepth = 'quick' | 'deep';

export interface CodeQuality {
  score: number;
  comments: string;
}

export interface BaseAnalysisResult {
  summary: string;
  technologies: string[];
  codeQuality: CodeQuality;
  suggestions: string[];
  structure: string;
}

export interface DeepAnalysisResult extends BaseAnalysisResult {
  security: string[];
  performance: string[];
  scalability: string;
}

export type AnalysisResult = BaseAnalysisResult | DeepAnalysisResult;

export interface HistoryItem {
  id: string;
  repoUrl: string;
  timestamp: string;
  result: AnalysisResult;
  depth: AnalysisDepth;
}

export interface SharedAnalysisData {
  repoUrl: string;
  result: AnalysisResult;
  depth: AnalysisDepth;
}
