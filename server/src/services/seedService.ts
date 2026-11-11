import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { User } from '../models/User';
import { Opportunity } from '../models/Opportunity';
import { ProgrammingLanguage } from '../models/ProgrammingLanguage';
import { Tutorial } from '../models/Tutorial';
import { Roadmap } from '../models/Roadmap';
import { Article } from '../models/Article';
import { AITool } from '../models/AITool';
import { connectDB } from '../config/db';

import { defaultLanguages } from './seedLanguages';
import { defaultTutorials } from './seedTutorials';
import { defaultRoadmaps } from './seedRoadmaps';
import { defaultOpportunities } from './seedOpportunities';
import { defaultArticles, defaultAITools } from './seedArticlesAndTools';

dotenv.config();

export const seedDatabase = async (force: boolean = false): Promise<void> => {
  console.log('[Seed] Starting database seeding process...');

  if (force) {
    console.log('[Seed] Force mode active: Cleaning existing collections...');
    await Promise.all([
      User.deleteMany({}),
      Opportunity.deleteMany({}),
      ProgrammingLanguage.deleteMany({}),
      Tutorial.deleteMany({}),
      Roadmap.deleteMany({}),
      Article.deleteMany({}),
      AITool.deleteMany({}),
    ]);
  }

  // 1. Seed Users (Admin + Demo Student)
  const adminCount = await User.countDocuments({ email: 'admin@technovahub.com' });
  if (adminCount === 0) {
    await User.create({
      name: 'Technova Administrator',
      email: 'admin@technovahub.com',
      password: 'Admin@123',
      role: 'admin',
      education: 'Master of Technology in Computer Science',
      interests: ['System Architecture', 'Cloud Infrastructure', 'Cybersecurity', 'Generative AI'],
      skills: ['TypeScript', 'Node.js', 'Go', 'Docker', 'Kubernetes', 'MongoDB', 'React'],
      careerGoal: 'Principal Systems Architect & Platform Director',
    });
    console.log('[Seed] ✅ Admin user created: admin@technovahub.com / Admin@123');
  }

  const studentCount = await User.countDocuments({ email: 'student@technovahub.com' });
  if (studentCount === 0) {
    await User.create({
      name: 'Rohan Sharma',
      email: 'student@technovahub.com',
      password: 'Student@123',
      role: 'user',
      education: 'B.Tech in Computer Science & Engineering (3rd Year)',
      interests: ['Full-Stack Development', 'AI/ML', 'Competitive Programming'],
      skills: ['JavaScript', 'TypeScript', 'React', 'Python', 'C++', 'SQL'],
      careerGoal: 'Full-Stack Software Engineer',
    });
    console.log('[Seed] ✅ Demo student created: student@technovahub.com / Student@123');
  }

  // 2. Seed Programming Languages
  const langCount = await ProgrammingLanguage.countDocuments();
  if (langCount === 0 || force) {
    await ProgrammingLanguage.insertMany(defaultLanguages);
    console.log(`[Seed] ✅ Seeded ${defaultLanguages.length} programming languages.`);
  }

  // 3. Seed Tutorials
  const tutorialCount = await Tutorial.countDocuments();
  if (tutorialCount === 0 || force) {
    await Tutorial.insertMany(defaultTutorials);
    console.log(`[Seed] ✅ Seeded ${defaultTutorials.length} tutorials and quizzes.`);
  }

  // 4. Seed 20 Career Roadmaps
  const roadmapCount = await Roadmap.countDocuments();
  if (roadmapCount === 0 || force) {
    await Roadmap.insertMany(defaultRoadmaps);
    console.log(`[Seed] ✅ Seeded ${defaultRoadmaps.length} comprehensive 10-stage career roadmaps.`);
  }

  // 5. Seed Opportunities (Internships, Hackathons, Techathons, Jobs)
  const oppCount = await Opportunity.countDocuments();
  if (oppCount === 0 || force) {
    await Opportunity.insertMany(defaultOpportunities);
    console.log(`[Seed] ✅ Seeded ${defaultOpportunities.length} verified opportunities.`);
  }

  // 6. Seed Tech News Articles
  const articleCount = await Article.countDocuments();
  if (articleCount === 0 || force) {
    await Article.insertMany(defaultArticles);
    console.log(`[Seed] ✅ Seeded ${defaultArticles.length} tech news articles.`);
  }

  // 7. Seed AI Tools
  const toolCount = await AITool.countDocuments();
  if (toolCount === 0 || force) {
    await AITool.insertMany(defaultAITools);
    console.log(`[Seed] ✅ Seeded ${defaultAITools.length} developer AI tools.`);
  }

  console.log('[Seed] 🚀 Database seeding completed successfully!\n');
};

export const autoSeedIfEmpty = async (): Promise<void> => {
  const oppCount = await Opportunity.countDocuments();
  const langCount = await ProgrammingLanguage.countDocuments();
  const roadmapCount = await Roadmap.countDocuments();

  if (oppCount === 0 || langCount === 0 || roadmapCount === 0) {
    console.log('[Seed] Detected empty or partial database collections. Running initial seed...');
    await seedDatabase(false);
  }
};

// If run directly from CLI: npm run seed
if (require.main === module) {
  (async () => {
    try {
      await connectDB();
      const isForce = process.argv.includes('--force');
      await seedDatabase(isForce);
      process.exit(0);
    } catch (err) {
      console.error('[Seed] Error during seeding:', err);
      process.exit(1);
    }
  })();
}
