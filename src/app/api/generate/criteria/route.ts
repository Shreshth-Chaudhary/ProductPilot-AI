import { NextRequest, NextResponse } from 'next/server';
import { MockAIEngine } from '@/lib/ai/mock-ai-engine';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { featureName, userStory } = body;

    const result = await MockAIEngine.generateAcceptanceCriteria({
      featureName,
      userStory,
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error('API Error in /api/generate/criteria:', error);
    return NextResponse.json(
      { error: 'Failed to generate Acceptance Criteria. Please try again.' },
      { status: 500 }
    );
  }
}
