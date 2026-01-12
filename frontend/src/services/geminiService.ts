// services/geminiService.ts
import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";

/**
 * IMPORTANT:
 * In your Vite config you defined `process.env.API_KEY`, so we can read it here.
 * (In production, do NOT expose API keys in the frontend. Use a backend proxy.)
 */
const API_KEY = (process.env.API_KEY as string | undefined) ?? "";

if (!API_KEY) {
  // Don’t hard-crash the whole app; just warn so UI can still load.
  console.warn(
    "[geminiService] Missing API key. Set GEMINI_API_KEY in .env so Vite defines process.env.API_KEY."
  );
}

const ai = new GoogleGenerativeAI({ apiKey: API_KEY });

function safeJsonParse<T>(text: string): T | null {
  try {
    return JSON.parse(text) as T;
  } catch {
    return null;
  }
}

export const geminiService = {
  /**
   * Generates a summary or suggestions for a booking based on user notes.
   */
  async analyzeBookingNotes(notes: string): Promise<string> {
    if (!notes?.trim()) return "No notes provided.";

    if (!API_KEY) return "AI Assistant is not configured (missing API key).";

    try {
      const model = ai.getGenerativeModel({ model: "gemini-1.5-flash" });
      const response = await model.generateContent(
        `Analyze these booking notes and provide a professional summary and any prep suggestions for the staff:\n\n"${notes}"`
      );

      return response.response.text()?.trim() || "Could not analyze notes.";
    } catch (error) {
      console.error("Gemini Error (analyzeBookingNotes):", error);
      return "AI Assistant is currently unavailable.";
    }
  },

  /**
   * Suggests the best service for a user based on their description of needs.
   */
  async suggestService(
    needs: string,
    availableServices: any[]
  ): Promise<{ serviceId: string; reasoning: string } | null> {
    if (!needs?.trim()) return null;

    if (!API_KEY) return null;

    try {
      const model = ai.getGenerativeModel({
        model: "gemini-1.5-flash",
        generationConfig: {
          responseMimeType: "application/json",
          responseSchema: {
            type: SchemaType.OBJECT,
            properties: {
              serviceId: { type: SchemaType.STRING },
              reasoning: { type: SchemaType.STRING },
            },
            required: ["serviceId", "reasoning"],
          },
        },
      });

      const response = await model.generateContent(
        `Based on the user's need: "${needs}", suggest the most appropriate service from this list (JSON):\n${JSON.stringify(
          availableServices
        )}\n\nReturn ONLY valid JSON with keys: serviceId, reasoning.`
      );

      const parsed = safeJsonParse<{ serviceId: string; reasoning: string }>(
        response.response.text() || ""
      );

      return parsed;
    } catch (error) {
      console.error("Gemini Error (suggestService):", error);
      return null;
    }
  },
};
