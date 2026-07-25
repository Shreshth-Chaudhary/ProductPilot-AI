import { MockAIEngine } from './mock-ai-engine';
import {
  PRDInput,
  PRDOutput,
  UserStoryInput,
  UserStoriesOutput,
  AcceptanceCriteriaInput,
  AcceptanceCriteriaOutput,
} from './types';

export class AIService {
  /**
   * Main entry point for PRD Generation.
   * If process.env.NEXT_PUBLIC_USE_REAL_AI is true and API key is present, calls API endpoint.
   * Otherwise uses MockAIEngine.
   */
  static async generatePRD(input: PRDInput): Promise<PRDOutput> {
    try {
      if (process.env.NEXT_PUBLIC_USE_REAL_AI === 'true') {
        const response = await fetch('/api/generate/prd', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(input),
        });
        if (!response.ok) {
          throw new Error(`API error: ${response.statusText}`);
        }
        return await response.json();
      }
    } catch (err) {
      console.warn('Falling back to AI Service Mock Engine:', err);
    }
    return MockAIEngine.generatePRD(input);
  }

  /**
   * Main entry point for User Stories Generation.
   */
  static async generateUserStories(input: UserStoryInput): Promise<UserStoriesOutput> {
    try {
      if (process.env.NEXT_PUBLIC_USE_REAL_AI === 'true') {
        const response = await fetch('/api/generate/stories', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(input),
        });
        if (!response.ok) {
          throw new Error(`API error: ${response.statusText}`);
        }
        return await response.json();
      }
    } catch (err) {
      console.warn('Falling back to AI Service Mock Engine:', err);
    }
    return MockAIEngine.generateUserStories(input);
  }

  /**
   * Main entry point for Acceptance Criteria Generation.
   */
  static async generateAcceptanceCriteria(
    input: AcceptanceCriteriaInput
  ): Promise<AcceptanceCriteriaOutput> {
    try {
      if (process.env.NEXT_PUBLIC_USE_REAL_AI === 'true') {
        const response = await fetch('/api/generate/criteria', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(input),
        });
        if (!response.ok) {
          throw new Error(`API error: ${response.statusText}`);
        }
        return await response.json();
      }
    } catch (err) {
      console.warn('Falling back to AI Service Mock Engine:', err);
    }
    return MockAIEngine.generateAcceptanceCriteria(input);
  }
}
