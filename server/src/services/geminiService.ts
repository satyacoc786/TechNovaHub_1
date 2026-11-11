export interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export const generateAIResponse = async (
  prompt: string,
  history: ChatMessage[] = [],
  userContext?: { name?: string; education?: string; careerGoal?: string; skills?: string[] }
): Promise<{ text: string; source: 'gemini' | 'fallback'; warning?: string }> => {
  const apiKey = process.env.GEMINI_API_KEY?.trim();

  // If Gemini API key is configured, try calling Google Gemini API
  if (apiKey && apiKey !== 'your_gemini_api_key_here') {
    try {
      const systemInstruction = `You are Technova AI, an expert technology career and programming mentor designed specifically for engineering, diploma, and computer science students.
You provide clear, empowering, practical advice on programming concepts, coding best practices, career roadmaps, technical interview preparation, project ideas, and resume optimization.
Format your responses using clean Markdown, bold headers, bullet points, and syntax-highlighted code blocks where applicable.
Student Context: ${userContext?.name ? `Student Name: ${userContext.name}, Goal: ${userContext.careerGoal || 'Tech Career'}, Skills: ${userContext.skills?.join(', ') || 'Various'}` : 'Aspiring Developer'}`;

      // Format contents for Gemini REST API
      const contents = [];

      // Add recent history (up to last 6 messages)
      const recentHistory = history.slice(-6);
      for (const msg of recentHistory) {
        contents.push({
          role: msg.role === 'assistant' ? 'model' : 'user',
          parts: [{ text: msg.content }],
        });
      }

      // Add current prompt
      contents.push({
        role: 'user',
        parts: [{ text: `${systemInstruction}\n\nUser Question:\n${prompt}` }],
      });

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents,
            generationConfig: {
              temperature: 0.7,
              topK: 40,
              topP: 0.95,
              maxOutputTokens: 2048,
            },
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        const candidate = data?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (candidate) {
          return { text: candidate, source: 'gemini' };
        }
      } else {
        const errBody = await response.text();
        console.warn('[Gemini API] Call failed with status:', response.status, errBody);
      }
    } catch (err: any) {
      console.warn('[Gemini API] Request error:', err.message);
    }
  }

  // Graceful Fallback Mentor Engine:
  // Provides rich, context-aware student guidance when API key is unconfigured or offline
  const fallbackResponse = generateIntelligentFallback(prompt, userContext);
  return {
    text: fallbackResponse,
    source: 'fallback',
    warning: !apiKey || apiKey === 'your_gemini_api_key_here'
      ? 'Note: Running in built-in offline mentor mode. To enable live Google Gemini API responses, set GEMINI_API_KEY in your server/.env file.'
      : undefined,
  };
};

function generateIntelligentFallback(
  prompt: string,
  userContext?: { name?: string; education?: string; careerGoal?: string; skills?: string[] }
): string {
  const p = prompt.toLowerCase();
  const userName = userContext?.name || 'Fellow Engineer';
  const goal = userContext?.careerGoal || 'Software Engineer';

  // Resume guidance
  if (p.includes('resume') || p.includes('cv') || p.includes('profile')) {
    return `### 📄 High-Impact Tech Resume Guide for ${userName}

To stand out for **${goal}** roles, follow the **Google X-Y-Z formula**: *"Accomplished [X], as measured by [Y], by doing [Z]"*.

#### 1. Core Structure
- **Header**: Name, LinkedIn, GitHub, Portfolio URL, Email, Phone, Location.
- **Technical Skills**: Group into *Languages* (Python, JS, C++), *Frameworks* (React, Node, Express), *Databases* (MongoDB, PostgreSQL), *Tools/DevOps* (Git, Docker, Linux).
- **Featured Projects (2-3 items)**:
  - Mention live demo link & GitHub repo.
  - Bullet 1: Problem solved and core stack used.
  - Bullet 2: Measurable achievement (e.g., *"Reduced latency by 35% through Redis caching"*).
- **Education**: Degree, College, Graduation Year, CGPA (if > 7.5/10).
- **Achievements & Certifications**: Hackathon wins, coding contest ratings (LeetCode, Codeforces).

#### 💡 Pro Tip:
Keep it strictly to **1 page** in clean single-column format. Ensure ATS-readiness by avoiding multi-column tables and fancy icons.`;
  }

  // Interview preparation
  if (p.includes('interview') || p.includes('dsa') || p.includes('leetcode')) {
    return `### 🎯 Technical Interview Preparation Masterplan

Here is a focused preparation strategy for campus placements and off-campus tech drives:

#### 1. Data Structures & Algorithms (Core Priority)
- **Arrays & Hashing**: Two Pointers, Sliding Window, Prefix Sum.
- **Linked Lists & Stacks/Queues**: Monotonic Stack, Cycle Detection.
- **Trees & Graphs**: DFS, BFS, Lowest Common Ancestor, Topological Sort, Dijkstra's algorithm.
- **Dynamic Programming**: 0/1 Knapsack, Longest Common Subsequence, Grid paths.

#### 2. Computer Science Core Subjects (For Technical Rounds)
- **DBMS**: ACID properties, Normalization (1NF to BCNF), Indexing (B+ Trees), SQL joins vs subqueries.
- **Operating Systems**: Processes vs Threads, CPU Scheduling, Deadlocks, Virtual Memory & Paging.
- **Computer Networks**: OSI vs TCP/IP model, HTTP/HTTPS, DNS resolution, TCP handshake.

#### 3. Behavioral / HR Questions
- Practice the **STAR method** (Situation, Task, Action, Result) for questions like *"Tell me about a time you resolved a difficult bug under a deadline"*.`;
  }

  // Project ideas
  if (p.includes('project') || p.includes('idea') || p.includes('build')) {
    return `### 🚀 Standout Project Ideas for ${goal}

Avoid generic clone apps (like basic to-do lists). Instead, build systems with **real architecture and distinct utility**:

1. **AI-Powered Code Reviewer & Security Linter**
   - **Stack**: React, Node.js, AST parser, Gemini API, GitHub Webhooks.
   - **Features**: Automatically comments on pull requests with optimization tips and security vulnerabilities.

2. **Distributed Real-Time Collaborative Canvas**
   - **Stack**: TypeScript, WebSockets (Socket.io), Redis Pub/Sub, Canvas API.
   - **Features**: Live multi-cursor whiteboard with undo/redo event-sourcing and export to SVG.

3. **High-Performance Event Ticket Booking Engine**
   - **Stack**: Next.js, Express, PostgreSQL, Redis distributed locks, Stripe/Razorpay.
   - **Challenge to highlight**: Concurrency management preventing race conditions and double bookings under high traffic.`;
  }

  // Roadmap & Career Advice
  if (p.includes('roadmap') || p.includes('career') || p.includes('learn') || p.includes('start')) {
    return `### 🗺️ Tailored Roadmap: Becoming a Successful ${goal}

Here is your 4-phase execution roadmap:

#### Phase 1: Foundational Programming (Months 1-2)
- Master **Data Structures & Algorithms** in your primary language (C++, Java, or Python/TypeScript).
- Version Control: **Git & GitHub** (Branching, Pull Requests, Merge Conflict resolution).
- Linux terminal essentials and HTTP basics.

#### Phase 2: Modern Full-Stack Specialization (Months 3-4)
- Frontend: **React with TypeScript**, Tailwind CSS, State Management, Responsive Design.
- Backend: **Node.js, Express, REST APIs**, Authentication (JWT, bcrypt), Database modeling (MongoDB/PostgreSQL).
- Clean Code, validation (Zod), and secure error handling.

#### Phase 3: Production Engineering & Cloud (Month 5)
- Containerization: **Docker basics**.
- Cloud Deployment: AWS / Vercel / Railway, CI/CD with GitHub Actions.
- Testing: Unit and integration testing.

#### Phase 4: Placements & Hackathons (Month 6)
- Participate in national hackathons (Smart India Hackathon, MLH).
- Polish your GitHub profile with 3 production-grade repositories with comprehensive READMEs.`;
  }

  // Default general tech guidance
  return `### 💡 Technova AI Career & Engineering Mentor

Hello **${userName}**! I am here to help you master programming, prepare for internships, and launch your career in **${goal}**.

Here are some high-impact ways I can assist you right now:
1. **Explain any Programming Concept**: Ask about closures, pointers, recursion, async/await, or Docker.
2. **Career Strategy**: Get a structured step-by-step roadmap from college to a top software engineering job.
3. **Project Review**: Share your project idea and I will give you architecture and API design suggestions.
4. **Interview Prep**: Practice mock interview questions in DSA, System Design, or Core CS subjects.
5. **Resume Optimization**: Get actionable suggestions to make your tech resume recruiter-friendly.

Feel free to ask a specific question or request a personalized plan!`;
}
