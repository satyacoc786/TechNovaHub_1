export type UserRole = 'user' | 'admin';

export interface IUser {
  _id?: string;
  name: string;
  email: string;
  role: UserRole;
  education?: string;
  interests?: string[];
  skills?: string[];
  careerGoal?: string;
  avatar?: string;
  createdAt?: string;
  updatedAt?: string;
}

export type OpportunityType = 'Internship' | 'Hackathon' | 'Techathon' | 'Job';
export type WorkplaceType = 'Remote' | 'Hybrid' | 'On-site';

export interface IOpportunity {
  _id?: string;
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
  // Specific for Hackathons / Techathons
  prizes?: string;
  teamSize?: string;
  startDate?: string;
  endDate?: string;
  organizer?: string;
  createdAt?: string;
}

export interface IProgrammingLanguage {
  _id?: string;
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

export interface IQuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface ITutorial {
  _id?: string;
  languageSlug: string;
  title: string;
  slug: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  order: number;
  section: string; // e.g., 'Syntax', 'OOP', 'Data Structures', 'Interview Questions', 'Projects'
  content: string;
  codeSnippet?: string;
  codeLanguage?: string;
  keyTakeaways: string[];
  quizzes?: IQuizQuestion[];
}

export interface IRoadmapStage {
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

export interface IRoadmap {
  _id?: string;
  slug: string;
  title: string;
  tagline: string;
  description: string;
  icon: string;
  category: string;
  estimatedMonths: number;
  stages: IRoadmapStage[];
}

export interface IArticle {
  _id?: string;
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
  createdAt?: string;
}

export interface IAITool {
  _id?: string;
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

export interface ILearningProgress {
  _id?: string;
  userId: string;
  languageSlug: string;
  completedTutorials: string[]; // tutorial IDs or slugs
  quizScores: {
    [tutorialSlugOrId: string]: {
      score: number;
      total: number;
      passed: boolean;
      completedAt: string;
    };
  };
}

export interface IRoadmapProgress {
  _id?: string;
  userId: string;
  roadmapSlug: string;
  completedStages: number[];
  isSaved: boolean;
  updatedAt?: string;
}

export interface IBookmark {
  _id?: string;
  userId: string;
  itemType: 'opportunity' | 'article' | 'roadmap';
  itemId: string;
  createdAt?: string;
  itemData?: any;
}
