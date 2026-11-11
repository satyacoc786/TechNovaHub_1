# TECHNOVA HUB

> **"Discover Opportunities. Master Technology. Build Your Future."**

**TECHNOVA HUB** is a full-stack technology ecosystem engineered specifically for engineering students, diploma students, computer science undergraduates, and aspiring developers. It bridges the gap between campus academics and real-world tech careers by providing verified opportunities, comprehensive programming academies, visual 10-stage career roadmaps, real-time technology intelligence, and an AI-powered engineering mentor.

---

## 🎨 1. Brand Identity & Design System

- **Black**: `#09090B` (Root Dark Canvas)
- **Dark Charcoal**: `#15171C` (Card Surfaces & Panels)
- **Vibrant Accent Orange**: `#FF7900` (Call to Action, Highlights, Badges)
- **Electric Blue**: `#168BFF` (Data Accents, Links, Infrastructure)
- **Pure White**: `#FFFFFF` (Primary Typography)
- **Grey / Muted**: `#A1A1AA` & `#71717A` (Descriptions & Metadata)
- **Design Philosophy**: Futuristic technology interface with subtle glassmorphism, responsive grids, sleek borders, smooth card interactions, and accessible mobile controls.

---

## 🚀 2. Architecture & Modules

```
c:\TechnovaHub/
├── client/                     # Frontend Application (React 18 + Vite + TypeScript)
│   ├── src/
│   │   ├── components/         # Reusable UI modules (Navbar, Footer, SearchModal, Cards, Quiz, CodeBlock)
│   │   │   ├── common/         # Navbar, Footer, SearchModal
│   │   │   ├── opportunities/  # OpportunityCard, OpportunityModal
│   │   │   ├── learning/       # CodeBlock, QuizCard
│   │   │   └── roadmaps/       # RoadmapTimeline, StageDetail
│   │   ├── contexts/           # AuthContext, BookmarkContext
│   │   ├── pages/              # 16+ Dedicated Full-Stack Pages
│   │   │   ├── HomePage.tsx
│   │   │   ├── OpportunitiesPage.tsx
│   │   │   ├── HackathonsPage.tsx
│   │   │   ├── TechathonsPage.tsx
│   │   │   ├── LearningCenterPage.tsx
│   │   │   ├── LanguageLearningPage.tsx
│   │   │   ├── RoadmapsPage.tsx
│   │   │   ├── RoadmapDetailPage.tsx
│   │   │   ├── TechNewsPage.tsx
│   │   │   ├── ArticleDetailPage.tsx
│   │   │   ├── AIToolsPage.tsx
│   │   │   ├── AIAssistantPage.tsx
│   │   │   ├── CommunityPage.tsx
│   │   │   ├── LoginPage.tsx
│   │   │   ├── RegisterPage.tsx
│   │   │   ├── UserDashboardPage.tsx
│   │   │   └── AdminDashboardPage.tsx
│   │   ├── services/           # Axios API services (auth, opportunities, learning, roadmaps, news, AI)
│   │   ├── types/              # TypeScript interfaces
│   │   └── index.css           # Tailwind + Custom futuristic scrollbars and glows
│   ├── package.json
│   └── vite.config.ts
├── server/                     # Backend API (Node.js + Express + TypeScript + MongoDB)
│   ├── src/
│   │   ├── config/             # MongoDB connection with resilient fallback
│   │   ├── controllers/        # Express REST controllers (auth, opps, learning, roadmaps, news, AI, admin)
│   │   ├── middleware/         # JWT verification, Admin authorization, Zod validation, Error handler
│   │   ├── models/             # Mongoose Schemas (User, Opportunity, Roadmap, Tutorial, Article, AITool, etc.)
│   │   ├── routes/             # REST API routers
│   │   ├── services/           # Gemini API + Fallback Mentor Engine, Database Seeding
│   │   └── server.ts           # Server bootstrap and middleware pipeline
│   ├── package.json
│   ├── tsconfig.json
│   └── .env
├── shared/                     # Shared TypeScript types between frontend and backend
├── package.json                # Root package with concurrently dev scripts
└── README.md                   # Full documentation & setup guide
```

---

## 🛠️ 3. Technology Stack

- **Frontend**: React 18, TypeScript, Vite, Tailwind CSS, Lucide React icons, Recharts, Framer Motion, Axios, React Router Dom v7.
- **Backend**: Node.js, Express.js, TypeScript, MongoDB, Mongoose, JWT (`jsonwebtoken`), Password Hashing (`bcryptjs`), Request Validation (`zod`), Morgan logger.
- **AI Engine**: Google Gemini API via secure backend integration with dual-engine fallback (built-in offline engineering mentor if API key is not supplied).
- **Database**: MongoDB v8.0+ with indexed schemas and relationships.

---

## 🔑 4. Demo & Test Credentials

The database comes pre-seeded with ready-to-test accounts. Quick-fill buttons are also available on the `/login` screen.

| Account Type | Email | Password | Role | Features |
| :--- | :--- | :--- | :--- | :--- |
| **Demo Student** | `student@technovahub.com` | `Student@123` | `user` | Student dashboard, roadmap progress, saved bookmarks, quiz history |
| **Super Admin** | `admin@technovahub.com` | `Admin@123` | `admin` | Admin control panel, CRUD opportunities, manage users, review reports |

---

## 📦 5. Installation & Setup Instructions

### Prerequisites
- **Node.js** (v18+ or v22+ recommended)
- **npm** (v9+)
- **MongoDB** (Local instance on `mongodb://127.0.0.1:27017` or MongoDB Atlas URI)

### Step 1: Install Dependencies
Run the installation command from the repository root:
```bash
npm run install:all
```
*(Or install in each directory individually: `npm install`, `cd server && npm install`, `cd ../client && npm install`)*

### Step 2: Configure Environment Variables
Copy `.env.example` to `server/.env`:
```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/technovahub
JWT_SECRET=technova_super_secret_jwt_key_2026_secure
NODE_ENV=development
CLIENT_URL=http://localhost:5173

# Optional: Add your Gemini API Key for live Google Gemini LLM generation.
# If omitted or offline, the platform automatically utilizes its built-in intelligent mentor engine.
GEMINI_API_KEY=
```

### Step 3: Seed Database (Auto-Seeds on Startup or via CLI)
To manually populate all 12 programming languages, 20 roadmaps, 14 verified opportunities, articles, and AI tools:
```bash
npm run seed
```

---

## 💻 6. Running the Application

### Development Mode (Both Client and Server)
Run concurrently using a single command:
```bash
npm run dev
```
- **Frontend App**: `http://localhost:5173/`
- **Backend API**: `http://localhost:5000/api`
- **API Health Check**: `http://localhost:5000/api/health`

### Running Individually (Alternative)
- Start Backend Server:
  ```bash
  npm run dev:server
  ```
- Start Frontend Client:
  ```bash
  npm run dev:client
  ```

---

## 🧪 7. Features & Verified Capabilities

### 1. Opportunity Discovery Platform (`/opportunities`, `/hackathons`, `/techathons`)
- **Internships**: Stipend, eligibility, workplace type (Remote/Hybrid/On-site), duration, direct official portal links.
- **Hackathons**: Prize pool breakdown, team sizes, deadlines, official registrations.
- **Techathons**: Symposiums, coding challenges, and hardware exhibitions at premier institutes (IITs, NITs, IEEE).
- **Fresher Jobs**: Graduate engineer trainee cadres, associate software engineer positions.
- **Filtering & Search**: Real-time category filtering, search query matching, expired opportunity detection, broken link reporting system.

### 2. Programming Learning Center (`/learn` & `/learn/:langSlug`)
- **12 Dedicated Language Academies**: C, C++, Java, Python, JavaScript, TypeScript, HTML, CSS, SQL, PHP, Go, Rust.
- **Curriculum**: Memory models, syntax, data structures, concurrency, practical examples, interview questions.
- **Interactive Code Blocks**: Syntax highlighted with 1-click **Copy Code** button.
- **Interactive Concept Quizzes**: Multiple-choice quizzes with live score calculation, pass/fail thresholds, and detailed explanations.

### 3. Career Roadmap Center (`/roadmaps` & `/roadmaps/:slug`)
- **20 Structured Career Paths**: Software Engineer, Frontend, Backend, Full-Stack, Python, Java, Data Analyst, Data Scientist, Data Engineer, AI Engineer, Machine Learning Engineer, DevOps, Cloud Engineer, Cybersecurity Analyst, Mobile App Developer, UI/UX Designer, QA Automation, Embedded Systems, Game Developer, Blockchain.
- **10 Stages per Roadmap**: Foundations → Programming Skills → Core Technologies → Frameworks & Tools → Practical Projects → GitHub Portfolio → Resume Preparation → Interview Preparation → Internship Applications → Job Preparation & Negotiation.
- **Interactive Timeline**: Connected visual stage tracker, completion toggles, persistent task checklists.

### 4. Technology News & Discovery (`/news` & `/news/:slug`)
- 13 Technology categories: AI, Machine Learning, Generative AI, Robotics, Cybersecurity, Cloud Computing, Data Science, IoT, Blockchain, Quantum Computing, Web Development, Mobile Development, Open Source.
- Verified source attributions, reading times, and related article recommendations.

### 5. AI Tech & Career Assistant (`/ai-assistant`)
- Powered by Google Gemini API with fallback to built-in intelligent mentor.
- Resumes audit, interview prep, concept explanations, and custom learning plans.
- Suggested prompt pills for quick guidance.

### 6. Student Dashboard (`/dashboard`)
- Profile management (name, education, target role, skills).
- Live roadmap completion trackers with progress bars.
- Saved opportunities and quick application links.

### 7. Protected Admin Control Panel (`/admin`)
- Accessible only to authorized `admin` role accounts.
- Analytics counters and opportunity category distribution charts.
- Full CRUD operations for opportunities.
- User management (toggle user/admin role, delete user).
- Review and action reported links from students.

---

## 🔒 8. Security Architecture

1. **Password Security**: Passwords hashed with `bcryptjs` (salt rounds = 10) before database persistence.
2. **JWT Authorization**: Cryptographically signed tokens with expiration; strict role checks (`requireAdmin`).
3. **Validation**: All user inputs strictly validated with `Zod` schemas before controller execution.
4. **Link Integrity**: Dedicated student reporting mechanism to flag broken or expired third-party links for admin review.
5. **No Frontend Secrets**: AI API keys and database credentials strictly isolated to server environment variables.

---

## 🚢 9. Production Build

To compile both frontend and backend for production:
```bash
npm run build
```
Start production server:
```bash
npm start
```
