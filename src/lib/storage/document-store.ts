import { SavedDocument, PRDOutput, UserStoriesOutput, AcceptanceCriteriaOutput } from '../ai/types';

const STORAGE_KEY = 'product_pilot_saved_documents';

// Initial sample seed document matching 11-section PRD Output
const INITIAL_PROJECTS: SavedDocument[] = [
  {
    id: 'doc-seed-1',
    title: 'Customer Feedback Insights Hub',
    type: 'PRD',
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    summary: 'PRD for real-time customer feedback categorization and sentiment analysis dashboard.',
    content: {
      productOverview: 'Customer Feedback Insights Hub aggregates support tickets, review site feedback, and NPS comments into a centralized real-time analytics portal.',
      problemStatement: 'Product teams spend hours reading unstructured feedback across multiple silos without real-time metric synthesis.',
      businessGoals: [
        'Automate feedback tagging by sentiment',
        'Reduce feedback synthesis cycle time by 75%',
      ],
      userPersonas: [
        {
          name: 'Elena Rostova',
          role: 'Lead Product Manager',
          painPoints: ['Manual survey tagging takes 15 hours every month.', 'Lack of real-time escalation alerts'],
        },
      ],
      userJourney: [
        'PM logs into Feedback Hub.',
        'NLP Engine ingests and tags customer tickets.',
        'PM reviews real-time sentiment alerts on dashboard.',
      ],
      functionalRequirements: [
        {
          id: 'FR-01',
          title: 'NLP Ingestion Pipeline',
          description: 'Stream ticket feeds every 15 mins.',
          priority: 'High',
          rice: {
            reach: 12000,
            impact: 5,
            confidence: 90,
            effort: 3,
            score: 1800,
            explanation: 'High volume pipeline for all incoming customer feedback.',
          },
        },
      ],
      nonFunctionalRequirements: [
        'Ingestion Latency: < 2 seconds',
        'Security: PII scrubbing prior to model analysis',
      ],
      userStories: [
        {
          id: 'US-01',
          userRole: 'Product Manager',
          goal: 'to view real-time sentiment trends',
          benefit: 'I can identify emerging bugs before they impact retention',
          priority: 'High',
          estimatedEffort: '2 person-weeks',
          formattedStory: 'As a Product Manager, I want to view real-time sentiment trends so that I can identify emerging bugs before they impact retention.',
        },
      ],
      acceptanceCriteria: [
        {
          id: 'AC-01',
          given: 'a customer ticket feed ingestion',
          when: 'the NLP engine tags a high-severity bug',
          then: 'an alert toast appears on the PM dashboard within 1 second.',
          checklistItems: ['Alert toast rendered', 'Audit log updated'],
        },
      ],
      successMetrics: ['NPS improvement by 12 points', '100% automated tagging accuracy'],
      risks: [{ risk: 'Data privacy compliance', mitigation: 'PII scrubbing prior to AI ingestion' }],
    } as PRDOutput,
  },
  {
    id: 'doc-seed-2',
    title: 'Smart Checkout Refactoring',
    type: 'UserStory',
    createdAt: new Date(Date.now() - 86400000 * 5).toISOString(),
    summary: 'User stories focusing on 1-click mobile checkout, address validation, and express payment options.',
    content: {
      featureName: 'Smart Checkout Refactoring',
      stories: [
        {
          id: 'US-101',
          userRole: 'Mobile Buyer',
          goal: 'pay using Apple Pay or Google Pay with 1 click',
          benefit: 'I can complete my order in seconds without entering credit card details',
          formattedStory: 'As a Mobile Buyer, I want to pay using Apple Pay or Google Pay with 1 click so that I can complete my order in seconds without entering credit card details.',
          priority: 'High',
          estimatedEffort: 'Medium (3-5d)',
        },
      ],
    } as UserStoriesOutput,
  },
];

export class DocumentStore {
  static getAll(): SavedDocument[] {
    if (typeof window === 'undefined') return INITIAL_PROJECTS;
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_PROJECTS));
        return INITIAL_PROJECTS;
      }
      return JSON.parse(stored);
    } catch (e) {
      console.error('Error reading saved documents from local storage:', e);
      return INITIAL_PROJECTS;
    }
  }

  static getById(id: string): SavedDocument | null {
    const docs = this.getAll();
    return docs.find((d) => d.id === id) || null;
  }

  static save(
    title: string,
    type: 'PRD' | 'UserStory' | 'AcceptanceCriteria',
    content: PRDOutput | UserStoriesOutput | AcceptanceCriteriaOutput,
    summary: string
  ): SavedDocument {
    const docs = this.getAll();
    const newDoc: SavedDocument = {
      id: `doc-${Date.now()}`,
      title,
      type,
      createdAt: new Date().toISOString(),
      content,
      summary,
    };
    const updated = [newDoc, ...docs];
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    }
    return newDoc;
  }

  static delete(id: string): SavedDocument[] {
    const docs = this.getAll().filter((d) => d.id !== id);
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(docs));
    }
    return docs;
  }
}
