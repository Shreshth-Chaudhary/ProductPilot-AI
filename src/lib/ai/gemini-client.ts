import { PRDInput, PRDOutput } from './types';

export class GeminiClient {
  private static API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';

  /**
   * Calls Gemini REST API using process.env.GEMINI_API_KEY.
   * Returns parsed PRDOutput or throws error if key is invalid/missing.
   */
  static async generatePRDWithGemini(input: PRDInput, apiKey?: string): Promise<PRDOutput> {
    const key = apiKey || process.env.GEMINI_API_KEY;

    if (!key || key.trim() === '' || key.startsWith('AQ.')) {
      // If key is unconfigured or a placeholder token, throw to trigger resilient fallback engine
      throw new Error('Gemini API key is unconfigured or using fallback mode.');
    }

    const prompt = `You are a Senior AI Product Manager Assistant. Generate a complete, highly realistic 11-section Product Requirements Document (PRD) for the product: "${input.productName}".
Context:
- Product Scope: ${input.productDescription || 'N/A'}
- Problem Statement: ${input.problemStatement || 'N/A'}
- Business Goal: ${input.goal || 'N/A'}
- Target Users: ${input.targetUsers || 'N/A'}

REASONING RULES:
1. Understand the specific product domain deeply (e.g. Swiggy = Food Delivery, Netflix = Streaming, Uber = Ride-sharing, SaaS = B2B software).
2. NEVER use generic templates, hardcoded placeholders, or mentions of ProductPilot AI.
3. Every section MUST be completely tailored to this exact product idea.
4. RICE formula MUST be calculated as: Reach * Impact * (Confidence/100) / Effort.

Respond ONLY with a valid JSON object following this exact schema:
{
  "productOverview": "detailed string",
  "problemStatement": "detailed string",
  "businessGoals": ["string"],
  "userPersonas": [{"name": "string", "role": "string", "painPoints": ["string"]}],
  "userJourney": ["step 1 string", "step 2 string"],
  "functionalRequirements": [
    {
      "id": "FR-01",
      "title": "string",
      "description": "string",
      "priority": "High",
      "rice": {
        "reach": 10000,
        "impact": 5,
        "confidence": 90,
        "effort": 3,
        "score": 1500,
        "explanation": "string rationale"
      }
    }
  ],
  "nonFunctionalRequirements": ["string"],
  "userStories": [
    {
      "id": "US-01",
      "userRole": "string",
      "goal": "string",
      "benefit": "string",
      "priority": "High",
      "estimatedEffort": "2 person-weeks",
      "formattedStory": "As a [role], I want [goal] so that [benefit]."
    }
  ],
  "acceptanceCriteria": [
    {
      "id": "AC-01",
      "given": "string",
      "when": "string",
      "then": "string",
      "checklistItems": ["string"]
    }
  ],
  "successMetrics": ["string"],
  "risks": [{"risk": "string", "mitigation": "string"}]
}`;

    const endpoint = `${this.API_URL}?key=${encodeURIComponent(key)}`;

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.2,
          responseMimeType: 'application/json',
        },
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`Gemini API Error (${response.status}): ${errText}`);
    }

    const data = await response.json();
    const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!rawText) {
      throw new Error('Gemini API returned an empty response.');
    }

    return JSON.parse(rawText) as PRDOutput;
  }
}
