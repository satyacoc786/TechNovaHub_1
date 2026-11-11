export type UserRole = 'user' | 'admin';

export interface User {
  _id: string;
  name: string;
  email: string;
  role: UserRole;
  education?: string;
  interests?: string[];
  skills?: string[];
  careerGoal?: string;
  avatar?: string;
  createdAt?: string;
}

export type OpportunityType = 'Internship' | 'Hackathon' | 'Techathon' | 'Job';
export type WorkplaceType = 'Remote' | 'Hybrid' | 'On-site';

export interface Opportunity {
  _id: string;
  title: string;
  company: string;
  description: string;
  type: OpportunityType;
  category: string;
  location: string;
  workplaceType: WorkplaceType;
  isPaid?: boolean;
  stipend?: string;
  duration?: string;
  eligibility: string;
  skillsRequired: string[];
  deadline: string;
  applyUrl: string;
  sourceUrl?: string;
  isExpired?: boolean;
  isFeatured?: boolean;
  prizes?: string;
  teamSize?: string;
  startDate?: string;
  endDate?: string;
  organizer?: string;
  createdAt?: string;
}

export interface ProgrammingLanguage {
  _id: string;
  slug: string;
  name: string;
  icon: string;
  tagline: string;
  description: string;
  category: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  popularity: number;
  totalTopics?: number;
  docsUrl: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface Tutorial {
  _id: string;
  languageSlug: string;
  title: string;
  slug: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  order: number;
  section: string;
  content: string;
  codeSnippet?: string;
  codeLanguage?: string;
  keyTakeaways: string[];
  quizzes?: QuizQuestion[];
}

export interface RoadmapStage {
  stageNumber: number;
  title: string;
  description: string;
  learningObjectives: string[];
  skillsRequired: string[];
  recommendedTechnologies: string[];
  freeResources: {
    title: string;
    url: string;
    type: 'article' | 'video' | 'doc' | 'course';
  }[];
  practicalExercises: string[];
  projectSuggestions: {
    title: string;
    description: string;
    difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  }[];
  checklist: string[];
}

export interface Roadmap {
  _id: string;
  slug: string;
  title: string;
  tagline: string;
  description: string;
  icon: string;
  category: string;
  estimatedMonths: number;
  stages: RoadmapStage[];
}

export interface Article {
  _id: string;
  slug: string;
  title: string;
  summary: string;
  content: string;
  category: string;
  author: string;
  source: string;
  sourceUrl: string;
  readTime: string;
  imageUrl?: string;
  tags: string[];
  publishedAt: string;
}

export interface AITool {
  _id: string;
  name: string;
  tagline: string;
  description: string;
  category: string;
  pricing: 'Free' | 'Freemium' | 'Paid';
  websiteUrl: string;
  tags: string[];
  featured?: boolean;
  rating?: number;
}

export interface UserRoadmapProgress {
  _id: string;
  userId: string;
  roadmapSlug: string;
  completedStages: number[];
  isSaved: boolean;
  roadmap?: Roadmap;
  progressPercent: number;
}
