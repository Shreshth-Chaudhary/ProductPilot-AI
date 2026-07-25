import { NextRequest, NextResponse } from 'next/server';
import { GeminiClient } from '@/lib/ai/gemini-client';
import { MockAIEngine } from '@/lib/ai/mock-ai-engine';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { productName, productDescription, problemStatement, goal, targetUsers, templateCategory } = body;

    if (!productName || typeof productName !== 'string' || productName.trim() === '') {
      return NextResponse.json({ error: 'Product name is required' }, { status: 400 });
    }

    try {
      // 1. Attempt live Gemini API completion if key is present
      const prdOutput = await GeminiClient.generatePRDWithGemini(body);
      return NextResponse.json(prdOutput);
    } catch (geminiError) {
      console.warn('Gemini API call skipped or failed, falling back to local multi-stage reasoning engine:', geminiError);
      // 2. Fallback to resilient multi-stage reasoning engine
      const prdOutput = await MockAIEngine.generatePRD(body);
      return NextResponse.json(prdOutput);
    }
  } catch (error: any) {
    console.error('Error generating PRD:', error);
    return NextResponse.json(
      { error: error.message || 'An error occurred while generating the PRD.' },
      { status: 500 }
    );
  }
}
