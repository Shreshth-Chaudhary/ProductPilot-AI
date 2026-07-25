export type TemplateCategory = 'saas' | 'mobile' | 'ai' | 'api' | 'ecommerce' | 'custom';

export type AIReasoningStage =
  | 'UNDERSTANDING'
  | 'STRATEGY'
  | 'PERSONAS'
  | 'REQUIREMENTS'
  | 'STORIES'
  | 'RICE'
  | 'VALIDATION'
  | 'COMPLETE';

export interface PRDPipelineProgress {
  stage: AIReasoningStage;
  progressPercent: number;
  currentStageName: string;
  reasoningDetail: string;
}

export interface PRDInput {
  productName: string;
  productDescription?: string;
  targetUsers?: string;
  problemStatement?: string;
  goal?: string;
  templateCategory?: TemplateCategory;
}

export interface UserStoryInput {
  featureName: string;
  featureDescription?: string;
  targetUserRole?: string;
}

export interface AcceptanceCriteriaInput {
  featureName: string;
  userStory: string;
}

export interface UserPersona {
  name: string;
  role: string;
  painPoints: string[];
}

export interface RICEData {
  reach: number;
  impact: number; // 1-5 scale
  confidence: number; // percentage (e.g. 80, 90, 100)
  effort: number; // person-weeks
  score: number; // calculated score: (reach * impact * (confidence/100)) / effort
  explanation?: string; // AI rationale for estimation
}

export interface FunctionalRequirement {
  id: string;
  title: string;
  description: string;
  priority: 'High' | 'Medium' | 'Low';
  rice?: RICEData;
}

export interface UserStory {
  id: string;
  userRole: string;
  goal: string;
  benefit: string;
  priority: 'High' | 'Medium' | 'Low';
  estimatedEffort: string;
  formattedStory: string;
}

export interface UserStoriesOutput {
  featureName: string;
  stories: UserStory[];
}

export interface AcceptanceCriteriaItem {
  id: string;
  given: string;
  when: string;
  then: string;
  checklistItems: string[];
}

export interface AcceptanceCriteriaOutput {
  featureName: string;
  userStory: string;
  criteria: AcceptanceCriteriaItem[];
}

export interface RiskItem {
  risk: string;
  mitigation: string;
}

// 11 Core Sections of PRD Output
export interface PRDOutput {
  productOverview: string;
  problemStatement: string;
  businessGoals: string[];
  userPersonas: UserPersona[];
  userJourney: string[];
  functionalRequirements: FunctionalRequirement[];
  nonFunctionalRequirements: string[];
  userStories: UserStory[];
  acceptanceCriteria: AcceptanceCriteriaItem[];
  successMetrics: string[];
  risks: RiskItem[];
}

export interface DocumentVersion {
  id: string;
  timestamp: string;
  note: string;
  content: PRDOutput;
}

export interface SavedDocument {
  id: string;
  title: string;
  type: 'PRD' | 'UserStory' | 'AcceptanceCriteria';
  content: PRDOutput | UserStoriesOutput | AcceptanceCriteriaOutput;
  createdAt: string;
  summary: string;
}
