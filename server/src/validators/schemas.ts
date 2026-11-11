import { z } from 'zod';

export const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  education: z.string().optional(),
  interests: z.array(z.string()).optional(),
  skills: z.array(z.string()).optional(),
  careerGoal: z.string().optional(),
});

export const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
});

export const updateProfileSchema = z.object({
  name: z.string().min(2).optional(),
  education: z.string().optional(),
  interests: z.array(z.string()).optional(),
  skills: z.array(z.string()).optional(),
  careerGoal: z.string().optional(),
  avatar: z.string().optional(),
});

export const opportunitySchema = z.object({
  title: z.string().min(3),
  company: z.string().min(2),
  description: z.string().min(10),
  type: z.enum(['Internship', 'Hackathon', 'Techathon', 'Job']),
  category: z.string().min(2),
  location: z.string().min(2),
  workplaceType: z.enum(['Remote', 'Hybrid', 'On-site']),
  isPaid: z.boolean().optional(),
  stipend: z.string().optional(),
  duration: z.string().optional(),
  eligibility: z.string().min(2),
  skillsRequired: z.array(z.string()).optional(),
  deadline: z.string().or(z.date()),
  applyUrl: z.string().url('Must be a valid URL'),
  sourceUrl: z.string().optional(),
  prizes: z.string().optional(),
  teamSize: z.string().optional(),
  startDate: z.string().or(z.date()).optional(),
  endDate: z.string().or(z.date()).optional(),
  organizer: z.string().optional(),
  isFeatured: z.boolean().optional(),
});

export const quizSubmissionSchema = z.object({
  answers: z.record(z.number()), // map of questionId to selectedOptionIndex
});
