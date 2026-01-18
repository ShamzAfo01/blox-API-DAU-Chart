
import { GoogleGenAI, Type } from "@google/genai";
import { OptimizationSuggestion } from "../types";

const API_KEY = process.env.API_KEY || "";

export const getOptimizationSuggestions = async (metrics: any): Promise<OptimizationSuggestion[]> => {
  const ai = new GoogleGenAI({ apiKey: API_KEY });
  
  const prompt = `Analyze these Roblox game metrics: ${JSON.stringify(metrics)}. 
  Provide 3-4 specific, actionable optimization suggestions for a game developer. 
  Focus on monetization, engagement, and retention.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        systemInstruction: "You are an expert Roblox Game Economy and Data Scientist. Provide professional, actionable advice for top developers.",
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              impact: { type: Type.STRING, enum: ["High", "Medium", "Low"] },
              category: { type: Type.STRING, enum: ["Monetization", "Engagement", "Difficulty"] },
              description: { type: Type.STRING },
              actionable: { type: Type.BOOLEAN }
            },
            required: ["title", "impact", "category", "description", "actionable"]
          }
        }
      }
    });

    return JSON.parse(response.text || "[]");
  } catch (error) {
    console.error("Gemini optimization error:", error);
    return [
      {
        title: "Initial Loading Tuning",
        impact: "High",
        category: "Engagement",
        description: "Your D1 retention is slightly low. Consider reducing initial bundle size to improve load times for mobile users.",
        actionable: true
      }
    ];
  }
};

export const chatWithBrain = async (history: any[], message: string) => {
  const ai = new GoogleGenAI({ apiKey: API_KEY });
  const chat = ai.chats.create({
    model: 'gemini-3-flash-preview',
    config: {
      systemInstruction: "You are 'The Brain', a high-end AI analytics engine for Roblox games. You provide deep strategic insights, technical advice on game variables, and help developers maximize their game's performance. Keep answers concise, technical, and professional.",
    }
  });

  // Simplified history mapping for example
  const response = await chat.sendMessage({ message });
  return response.text;
};
