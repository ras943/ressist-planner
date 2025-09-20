import { GoogleGenAI, Type } from "@google/genai";
import { Strategy } from '../types';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const strategySchema = {
  type: Type.OBJECT,
  properties: {
    title: {
      type: Type.STRING,
      description: "A catchy and descriptive title for the overall strategy."
    },
    overview: {
      type: Type.STRING,
      description: "A concise, high-level summary of the entire strategy."
    },
    targetAudienceAnalysis: {
        type: Type.STRING,
        description: "A brief analysis of the target audience, including their needs, motivations, and potential pain points related to the topic and goal."
    },
    steps: {
      type: Type.ARRAY,
      description: "A list of actionable steps to implement the strategy.",
      items: {
        type: Type.OBJECT,
        properties: {
          title: {
            type: Type.STRING,
            description: "A clear and concise title for this specific step."
          },
          description: {
            type: Type.STRING,
            description: "A detailed description of the actions to be taken in this step."
          },
          rationale: {
            type: Type.STRING,
            description: "An explanation of why this step is important and how it contributes to the overall goal."
          }
        },
        required: ["title", "description", "rationale"]
      }
    }
  },
  required: ["title", "overview", "targetAudienceAnalysis", "steps"]
};

export const generateStrategy = async (input: { topic: string; goal: string; audience: string }): Promise<Strategy> => {
  const { topic, goal, audience } = input;

  const prompt = `
    Act as a world-class strategist. Your task is to generate a comprehensive, actionable strategy based on the following inputs.
    The strategy should be clear, concise, and tailored to the specified audience.

    **Topic:** ${topic}
    **Primary Goal:** ${goal}
    **Target Audience:** ${audience}

    Please generate a strategy with the following components:
    1.  A compelling title.
    2.  A brief overview of the strategy.
    3.  An analysis of the target audience.
    4.  A minimum of 3 and a maximum of 5 distinct, actionable steps. Each step must include:
        - A clear title.
        - A detailed description of what to do.
        - A rationale explaining why the step is necessary.

    Provide the output in the structured JSON format specified.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: strategySchema,
      },
    });

    const jsonText = response.text.trim();
    const parsedStrategy: Strategy = JSON.parse(jsonText);
    return parsedStrategy;
  } catch (error) {
    console.error("Error generating strategy from Gemini API:", error);
    throw new Error("Failed to parse or receive a valid strategy from the AI.");
  }
};