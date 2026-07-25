import { NextRequest, NextResponse } from 'next/server';
import { MockAIEngine } from '@/lib/ai/mock-ai-engine';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { featureName, featureDescription, targetUserRole } = body;

    const result = await MockAIEngine.generateUserStories({
      featureName,
      featureDescription,
      targetUserRole,
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error('API Error in /api/generate/stories:', error);
    return NextResponse.json(
      { error: 'Failed to generate User Stories. Please try again.' },
      { status: 500 }
    );
  }
}
