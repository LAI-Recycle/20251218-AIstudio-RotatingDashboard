
import { GoogleGenAI } from "@google/genai";

export class GeminiService {
  private cache: Map<string, string> = new Map();

  async getSmartInsight(metricLabel: string, value: string, unit: string) {
    const cacheKey = `${metricLabel}-${value}-${unit}`;
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey);
    }

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Provide a short, 1-sentence futuristic system status update for a metric named "${metricLabel}" which is currently at ${value} ${unit}. Make it sound like an advanced AI assistant. Keep it under 15 words.`,
      });
      
      const text = response.text || "Monitoring system integrity... all protocols normal.";
      this.cache.set(cacheKey, text);
      return text;
    } catch (error: any) {
      // Handle quota or other API errors gracefully
      if (error?.message?.includes("429") || error?.message?.includes("quota")) {
        console.warn("Gemini API: Quota exceeded. Using local fallback.");
        return `System module ${metricLabel} is currently operating within expected parameters.`;
      }
      
      console.error("Gemini Insight Error:", error);
      return "Analyzing module dependencies and routing protocols.";
    }
  }
}

export const geminiService = new GeminiService();
