import { GoogleGenAI, Type } from "@google/genai";
import { AdVariation } from "../types";

// Initialize Gemini
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateAdVariations = async (base64Image: string): Promise<AdVariation[]> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            inlineData: {
              data: base64Image,
              mimeType: 'image/jpeg',
            },
          },
          {
            text: `You are a viral marketing expert for a food app called "Grab-It". 
            Analyze this food image and generate 3 distinct "TikTok-style" video ad concepts.
            
            1. "The Viral Hit": High energy, hype music, fast cuts.
            2. "Foodie ASMR": Focus on texture, slow visuals, sensory details.
            3. "Urgency/Deal": Focus on the discount, scarcity, and "Act Now".

            For each concept, provide:
            - A punchy overlay title (max 5 words).
            - A short description/caption (max 15 words).
            - 3 trending hashtags.
            - A music vibe description (e.g. "Lo-fi Hip Hop", "High Tempo Phonk").
            - A visual animation style (choose one: 'zoom', 'pan', 'pulse').
            - A suggested hex accent color for the text overlay.

            Return ONLY a JSON array of these objects.`
          },
        ],
      },
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.STRING },
              styleName: { type: Type.STRING },
              title: { type: Type.STRING },
              description: { type: Type.STRING },
              tags: { type: Type.ARRAY, items: { type: Type.STRING } },
              musicVibe: { type: Type.STRING },
              animationStyle: { type: Type.STRING, enum: ['zoom', 'pan', 'pulse'] },
              accentColor: { type: Type.STRING }
            },
            required: ['id', 'styleName', 'title', 'description', 'tags', 'musicVibe', 'animationStyle', 'accentColor']
          }
        }
      }
    });

    if (response.text) {
      const data = JSON.parse(response.text);
      // Ensure IDs are unique if the model hallucinates duplicates or simple integers
      return data.map((item: any, index: number) => ({
        ...item,
        id: item.id || `var-${index}`,
        animationStyle: ['zoom', 'pan', 'pulse'].includes(item.animationStyle) ? item.animationStyle : 'zoom'
      }));
    }
    throw new Error("No response from AI");

  } catch (error) {
    console.error("Gemini Error:", error);
    // Fallback mock data
    return [
      {
        id: "v1",
        styleName: "The Viral Hit",
        title: "Must Try Alert! 🚨",
        description: "This is not a drill. Best in town.",
        tags: ["#Viral", "#Foodie", "#GrabIt"],
        musicVibe: "Upbeat Pop",
        animationStyle: "pulse",
        accentColor: "#FF0055"
      },
      {
        id: "v2",
        styleName: "Foodie Heaven",
        title: "Pure Deliciousness ✨",
        description: "Melt in your mouth goodness.",
        tags: ["#Yum", "#Tasty", "#ChefMode"],
        musicVibe: "Chill Lo-fi",
        animationStyle: "zoom",
        accentColor: "#00FF41"
      },
      {
        id: "v3",
        styleName: "Flash Deal",
        title: "50% OFF NOW ⚡️",
        description: "Only 5 left. Run don't walk!",
        tags: ["#Steal", "#Discount", "#Run"],
        musicVibe: "High Energy Trap",
        animationStyle: "pan",
        accentColor: "#FF6B00"
      }
    ];
  }
};