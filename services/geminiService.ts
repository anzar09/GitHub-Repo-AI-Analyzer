
// FIX: Corrected typo from GoogleGenai to GoogleGenAI.
import { GoogleGenAI, Type } from "@google/genai";
import type { AnalysisResult, AnalysisDepth } from '../types';

const API_KEY = process.env.API_KEY;
if (!API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

// FIX: Corrected typo from GoogleGenai to GoogleGenAI.
const ai = new GoogleGenAI({ apiKey: API_KEY });

const baseSchema = {
    summary: {
      type: Type.STRING,
      description: "A brief, one-paragraph summary of the repository's purpose and key features. Use markdown for formatting."
    },
    technologies: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "A list of key technologies, frameworks, and languages used in the project."
    },
    codeQuality: {
      type: Type.OBJECT,
      properties: {
        score: {
          type: Type.NUMBER,
          description: "An estimated code quality score from 1 to 10, based on factors like documentation, structure, and common practices inferred from the repo's metadata."
        },
        comments: {
          type: Type.STRING,
          description: "A brief explanation for the code quality score, highlighting strengths and weaknesses."
        }
      },
      required: ['score', 'comments']
    },
    suggestions: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "A list of 2-3 actionable suggestions for improvement (e.g., 'Add more comprehensive testing', 'Improve CI/CD pipeline')."
    },
    structure: {
        type: Type.STRING,
        description: "A brief overview of the project's likely directory structure and the purpose of key folders, formatted as a markdown code block."
    }
};

const deepDiveSchema = {
    ...baseSchema,
    security: {
        type: Type.ARRAY,
        items: { type: Type.STRING },
        description: "A list of 2-3 potential security considerations or vulnerabilities based on the technology stack (e.g., 'Risk of XSS attacks if using older React versions', 'Ensure proper secret management')."
    },
    performance: {
        type: Type.ARRAY,
        items: { type: Type.STRING },
        description: "A list of 2-3 potential performance considerations (e.g., 'Large bundle size with this framework', 'Potential for database query bottlenecks')."
    },
    scalability: {
        type: Type.STRING,
        description: "A brief comment on the project's potential scalability based on its architecture and tech stack."
    }
}

export const analyzeRepo = async (repoUrl: string, depth: AnalysisDepth): Promise<AnalysisResult> => {
  const model = 'gemini-2.5-pro';

  const isDeepDive = depth === 'deep';

  const systemInstruction = `You are an expert software architect and senior developer with 20 years of experience. Your task is to analyze GitHub repositories based on their URL and provide a concise, structured, and insightful overview. Your analysis should be based on public information, READMEs, and common knowledge about the repository. You cannot access the code directly. Your response must be in JSON format matching the provided schema. ${isDeepDive ? 'You will perform a deep-dive analysis, including security, performance, and scalability.' : ''}`;

  const userPrompt = `Analyze the GitHub repository at this URL: ${repoUrl}. Provide your analysis in a strict JSON format. Do not include any text outside of the JSON object. Perform a ${isDeepDive ? 'deep-dive' : 'quick'} analysis.`;
  
  const analysisSchema = {
      type: Type.OBJECT,
      properties: isDeepDive ? deepDiveSchema : baseSchema,
      required: isDeepDive ? ['summary', 'technologies', 'codeQuality', 'suggestions', 'structure', 'security', 'performance', 'scalability'] : ['summary', 'technologies', 'codeQuality', 'suggestions', 'structure']
  }

  try {
    const response = await ai.models.generateContent({
        model: model,
        // FIX: The user prompt should be the value of the `contents` property.
        contents: userPrompt,
        config: {
            systemInstruction: systemInstruction,
            responseMimeType: "application/json",
            responseSchema: analysisSchema,
            temperature: 0.2,
        }
    });

    const jsonText = response.text.trim();
    return JSON.parse(jsonText) as AnalysisResult;

  } catch (error) {
    console.error("Error analyzing repository:", error);
    throw new Error("Failed to get analysis from Gemini API.");
  }
};
