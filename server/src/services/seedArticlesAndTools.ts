export const defaultArticles = [
  {
    slug: 'gemini-2-agentic-coding-revolution',
    title: 'How Gemini 2.0 and Agentic Coding Are Transforming Engineering Workflows',
    summary: 'A deep dive into autonomous multi-turn agents, code generation benchmarks, and how student developers can build with the latest Gemini APIs.',
    content: `Artificial intelligence is progressing from simple autocomplete tools into autonomous coding agents capable of analyzing full repositories, debugging complex race conditions, and executing end-to-end unit tests.

### What is Agentic Coding?
Traditional AI tools operate on a single prompt-response loop. In contrast, **agentic frameworks** possess:
1. **Tool Use & Execution**: The agent can run terminal commands, execute compilers, inspect stack traces, and fetch external API documentation.
2. **Autonomous Verification**: After making an edit, the agent runs tests, observes failure codes, and iterates until all constraints pass.
3. **Multi-Agent Swarms**: Subagents divide heavy research from code implementation and quality assurance.

### What This Means for Engineering Students
Students who master prompt architecture, agentic tool design, and API orchestration are positioning themselves at the cutting edge of tech recruitment. Rather than memorizing boilerplate code, tomorrow's engineers focus on high-level architecture, system reliability, and business logic.`,
    category: 'Artificial Intelligence',
    author: 'Dr. Siddharth Roy',
    source: 'Technova AI Insights',
    sourceUrl: 'https://deepmind.google/technologies/gemini/',
    readTime: '5 min read',
    imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
    tags: ['Gemini', 'AI Agents', 'DevTools', 'FutureOfWork'],
    publishedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
  },
  {
    slug: 'rust-in-linux-kernel-and-systems',
    title: 'Rust in the Linux Kernel: A New Era of Memory Safety',
    summary: 'The Linux kernel official adoption of Rust marks a paradigm shift in eliminating memory vulnerabilities at compile time.',
    content: `For decades, C was the undisputed king of systems programming. However, data from Microsoft and Google consistently reveals that over 70% of high-severity security vulnerabilities stem from memory safety bugs: buffer overflows, use-after-free, and dangling pointers.

### The Rust Advantage
Rust eliminates entire classes of bugs through its compile-time ownership model without the runtime performance overhead of a garbage collector. With Linus Torvalds and the Linux Foundation supporting Rust drivers and subsystems, knowledge of Rust has become an invaluable asset for firmware, OS, and cloud infrastructure engineers.`,
    category: 'Open Source',
    author: 'Ananya Sharma',
    source: 'Kernel Systems Review',
    sourceUrl: 'https://www.kernel.org/',
    readTime: '6 min read',
    imageUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80',
    tags: ['Rust', 'Linux', 'Memory Safety', 'Systems Programming'],
    publishedAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
  },
  {
    slug: 'post-quantum-cryptography-nist-standards',
    title: 'NIST Finalizes Post-Quantum Cryptography Standards: What Developers Must Know',
    summary: 'Quantum computers threaten RSA and ECC encryption. Here is what every cybersecurity analyst and software architect needs to understand about lattice-based cryptography.',
    content: `The National Institute of Standards and Technology (NIST) has released its first set of finalized post-quantum encryption standards: ML-KEM (Kyber) and ML-DSA (Dilithium).

Quantum computers utilizing Shor's algorithm will eventually be able to factorize large prime numbers in polynomial time, rendering conventional 2048-bit RSA and Elliptic Curve Cryptography obsolete. Modern web developers and cybersecurity teams must transition to quantum-resilient algorithms to defend against 'Harvest Now, Decrypt Later' threat models.`,
    category: 'Quantum Computing',
    author: 'Vikram Joshi',
    source: 'NIST Cryptography Bulletin',
    sourceUrl: 'https://www.nist.gov/cryptography/post-quantum-cryptography',
    readTime: '7 min read',
    imageUrl: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=800&q=80',
    tags: ['Quantum Computing', 'Cryptography', 'Cybersecurity', 'NIST'],
    publishedAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000),
  },
  {
    slug: 'web-development-react-19-server-actions',
    title: 'React 19 & Server Actions: Streamlining Full-Stack Web Development',
    summary: 'Explore the React 19 compiler, built-in form actions, useOptimistic, and how server actions simplify client-backend communications.',
    content: `React 19 fundamentally reshapes client-side architecture by introducing a dedicated compiler that automatically memoizes components (eliminating manual useMemo and useCallback boilerplate) alongside native Server Actions.

With Server Actions, developers can invoke asynchronous server-side functions directly from form handlers and event listeners without manually writing boilerplate REST endpoints or managing loading states.`,
    category: 'Web Development',
    author: 'Rohan Mehra',
    source: 'React Official Blog',
    sourceUrl: 'https://react.dev/blog',
    readTime: '4 min read',
    imageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
    tags: ['React', 'JavaScript', 'Frontend', 'WebDev'],
    publishedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
  },
  {
    slug: 'cloud-native-kubernetes-cost-optimization',
    title: 'The FinOps Revolution: Cutting Kubernetes Cloud Spend by 40%',
    summary: 'Practical strategies for cloud engineers to optimize pod resource requests, leverage Spot instances, and utilize Keda auto-scaling.',
    content: `As organizations scale their microservice architectures across AWS and GCP, unmanaged cloud bills often skyrocket. Enter **FinOps**: the practice of bringing financial accountability to the variable spend model of cloud engineering.

Key techniques include:
- Right-sizing container CPU/Memory requests using vertical pod autoscalers.
- Migrating non-critical batch jobs to AWS Graviton and EC2 Spot instances.
- Utilizing Prometheus metrics to eliminate idle staging environments outside business hours.`,
    category: 'Cloud Computing',
    author: 'Meera Nambiar',
    source: 'Cloud Architecture Weekly',
    sourceUrl: 'https://www.cncf.io/',
    readTime: '5 min read',
    imageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80',
    tags: ['DevOps', 'Kubernetes', 'Cloud', 'FinOps'],
    publishedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
  },
  {
    slug: 'cybersecurity-zero-trust-architecture-2026',
    title: 'Zero Trust Architecture in Modern Enterprise Defense',
    summary: 'Why traditional perimeter defenses fail and how the principle of "Never Trust, Always Verify" prevents lateral attacker movement.',
    content: `In a world of remote work and hybrid cloud infrastructures, the old concept of an 'internal corporate network' is dead. Zero Trust treats every network packet, user, and device as potentially compromised.

Core pillars include:
1. Microsegmentation to prevent lateral traversal.
2. Continuous identity verification with phishing-resistant FIDO2 hardware keys.
3. Least-privilege access enforced through dynamic conditional policies.`,
    category: 'Cybersecurity',
    author: 'Kunal Verma',
    source: 'Cyber Defense Review',
    sourceUrl: 'https://csrc.nist.gov/publications/detail/sp/800-207/final',
    readTime: '5 min read',
    imageUrl: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80',
    tags: ['Security', 'Zero Trust', 'Enterprise', 'Networking'],
    publishedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
  },
];

export const defaultAITools = [
  {
    name: 'Cursor AI',
    tagline: 'The AI-first Code Editor built on VS Code with seamless agentic editing.',
    description: 'Cursor understands your entire codebase, allows multi-file edits via natural language, and indexes repository symbols for instant accurate code completions.',
    category: 'Code Editor',
    pricing: 'Freemium' as const,
    websiteUrl: 'https://cursor.com/',
    tags: ['IDE', 'Code Generation', 'AI Editor', 'Productivity'],
    featured: true,
    rating: 4.9,
  },
  {
    name: 'v0 by Vercel',
    tagline: 'Generative UI system that outputs modern Tailwind CSS and React code.',
    description: 'Describe any web interface, dashboard, or card component and get production-ready accessible React, TypeScript, and Tailwind code instantly.',
    category: 'Generative UI',
    pricing: 'Freemium' as const,
    websiteUrl: 'https://v0.dev/',
    tags: ['UI Design', 'React', 'Tailwind', 'Frontend'],
    featured: true,
    rating: 4.8,
  },
  {
    name: 'Google Gemini CLI & Studio',
    tagline: 'Multimodal AI with 1M+ token context window and native multimodal reasoning.',
    description: 'Harness Google flagship Gemini models for complex codebase analysis, video processing, audio transcripts, and intelligent agent backends.',
    category: 'Multimodal AI',
    pricing: 'Free' as const,
    websiteUrl: 'https://aistudio.google.com/',
    tags: ['Gemini', 'LLM', 'Google', 'APIs'],
    featured: true,
    rating: 4.9,
  },
  {
    name: 'Anthropic Claude 3.7 Sonnet',
    tagline: 'Hybrid reasoning and instant response model built for complex coding.',
    description: 'Industry-leading benchmark scores in software engineering, multi-file code refactoring, and logical chain-of-thought analysis.',
    category: 'Reasoning AI',
    pricing: 'Paid' as const,
    websiteUrl: 'https://claude.ai/',
    tags: ['Reasoning', 'Coding', 'LLM', 'Anthropic'],
    featured: true,
    rating: 4.9,
  },
  {
    name: 'GitHub Copilot',
    tagline: 'Your AI pair programmer integrated into Visual Studio Code and JetBrains.',
    description: 'Context-aware autocompletions, automated pull request descriptions, test generation, and terminal command suggestions powered by OpenAI and Anthropic.',
    category: 'Code Assistant',
    pricing: 'Paid' as const,
    websiteUrl: 'https://github.com/features/copilot',
    tags: ['GitHub', 'Pair Programming', 'DevTools'],
    featured: true,
    rating: 4.7,
  },
  {
    name: 'Perplexity AI',
    tagline: 'Conversational answer engine with cited research and real-time sources.',
    description: 'Replaces conventional search engines with direct, synthesized answers and academic citations, perfect for technical research and learning new libraries.',
    category: 'Research Engine',
    pricing: 'Freemium' as const,
    websiteUrl: 'https://www.perplexity.ai/',
    tags: ['Search', 'Research', 'Citations', 'Knowledge'],
    featured: true,
    rating: 4.8,
  },
  {
    name: 'Ollama',
    tagline: 'Run large language models like Llama 3, DeepSeek, and Mistral locally.',
    description: 'Simple CLI and REST API to run open-weight AI models locally on your GPU without cloud dependency or API fees.',
    category: 'Local AI',
    pricing: 'Free' as const,
    websiteUrl: 'https://ollama.com/',
    tags: ['Open Source', 'Local LLM', 'Privacy', 'CLI'],
    featured: true,
    rating: 4.9,
  },
  {
    name: 'Lovable.dev',
    tagline: 'Full-stack software engineer agent that builds entire web applications.',
    description: 'Build complete web apps from conversational descriptions with integrated GitHub sync and Supabase backends.',
    category: 'Full-Stack Agent',
    pricing: 'Freemium' as const,
    websiteUrl: 'https://lovable.dev/',
    tags: ['Full Stack', 'No Code to Pro Code', 'Web Apps'],
    featured: false,
    rating: 4.7,
  },
];
