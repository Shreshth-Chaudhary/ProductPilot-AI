import { NextRequest, NextResponse } from 'next/server';
import { MockAIEngine } from '@/lib/ai/mock-ai-engine';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { productName, productDescription, targetUsers, problemStatement, goal } = body;

    // Optional: Real LLM Integration slot (e.g., Google Gemini or OpenAI)
    const apiKey = process.env.GEMINI_API_KEY || process.env.OPENAI_API_KEY;

    if (apiKey) {
      // Future integration placeholder:
      // const response = await callLLMApi({ apiKey, prompt: ... });
      // return NextResponse.json(response);
    }

    // Default to structured mock engine output
    const result = await MockAIEngine.generatePRD({
      productName,
      productDescription,
      targetUsers,
      problemStatement,
      goal,
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error('API Error in /api/generate/prd:', error);
    return NextResponse.json(
      { error: 'Failed to generate PRD. Please check your inputs and try again.' },
      { status: 500 }
    );
  }
}
