import { IRoadmapStageDoc } from '../models/Roadmap';

interface RoadmapDefinition {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  icon: string;
  category: string;
  estimatedMonths: number;
  stageFocus: {
    foundations: string;
    programming: string;
    coreTech: string;
    frameworks: string;
    projects: { title: string; desc: string }[];
    interviewFocus: string;
  };
}

const rawRoadmaps: RoadmapDefinition[] = [
  {
    slug: 'software-engineer',
    title: 'Software Engineer',
    tagline: 'Design resilient systems, scalable algorithms, and enterprise software.',
    description: 'A comprehensive path to becoming a versatile software engineer capable of architecting complex distributed systems, solving algorithmic problems, and writing robust maintainable code.',
    icon: 'Terminal',
    category: 'Core Engineering',
    estimatedMonths: 8,
    stageFocus: {
      foundations: 'Computer Science Fundamentals, Discrete Math, Boolean Logic, OS & Memory Hierarchy',
      programming: 'C++, Java, or Go for Algorithmic Thinking and OOP',
      coreTech: 'Data Structures (Trees, Graphs, Hash Maps), Algorithms (Dynamic Programming, Greedy), Linux & Git',
      frameworks: 'Clean Code principles, Design Patterns (Factory, Strategy, Observer), Docker & CI/CD',
      projects: [
        { title: 'Distributed Key-Value Store', desc: 'Build an in-memory key-value cache with Raft consensus protocol.' },
        { title: 'High-Concurrency Task Scheduler', desc: 'Implement a thread pool and task queue with rate-limiting and retry logic.' },
      ],
      interviewFocus: 'LeetCode Medium/Hard DSA, Low-Level Design (LLD), Object-Oriented Design, and System Architecture',
    },
  },
  {
    slug: 'frontend-developer',
    title: 'Frontend Developer',
    tagline: 'Craft blazing-fast, responsive, and visually stunning web applications.',
    description: 'Master modern frontend engineering from semantic HTML, responsive CSS, and TypeScript to modern React, Next.js, Web Performance, and state architecture.',
    icon: 'Layout',
    category: 'Web Development',
    estimatedMonths: 6,
    stageFocus: {
      foundations: 'HTML5 Semantic Markup, CSS3 Grid/Flexbox, DOM Tree, Web Standards & Accessibility (WCAG)',
      programming: 'Modern JavaScript (ES6+), Closures, Event Loop, TypeScript Generics and Typing',
      coreTech: 'React 18+, Component Lifecycle, Custom Hooks, Tailwind CSS, State Management (Zustand/Redux)',
      frameworks: 'Next.js App Router, SSR/SSG, Vite, GSAP / Framer Motion, TanStack Query, Web Vitals Optimization',
      projects: [
        { title: 'Interactive Analytics Dashboard', desc: 'Real-time charts, filterable tables, and dark mode using React, Tailwind, and Recharts.' },
        { title: 'E-Commerce Platform with Cart & Checkout', desc: 'Complete storefront with optimistic UI, debounce search, and Stripe checkout integration.' },
      ],
      interviewFocus: 'Frontend System Design, Virtual DOM internals, React render cycle, CSS positioning, and JS prototypes',
    },
  },
  {
    slug: 'backend-developer',
    title: 'Backend Developer',
    tagline: 'Architect high-throughput APIs, microservices, and reliable databases.',
    description: 'Learn to design scalable REST and GraphQL APIs, master SQL and NoSQL data modeling, handle concurrency, and deploy containerized services on cloud infrastructure.',
    icon: 'Server',
    category: 'Backend & Cloud',
    estimatedMonths: 7,
    stageFocus: {
      foundations: 'HTTP/HTTPS Protocols, Networking (TCP/IP, UDP), Operating Systems, Concurrency & Threads',
      programming: 'Node.js/TypeScript, Go, or Java for backend services',
      coreTech: 'RESTful API Design, Relational DBs (PostgreSQL), NoSQL (MongoDB), In-Memory Caching (Redis)',
      frameworks: 'Express.js / Fastify / Spring Boot, ORMs (Prisma, Mongoose), Docker, Message Brokers (RabbitMQ/Kafka)',
      projects: [
        { title: 'Scalable Microservices E-Commerce API', desc: 'Auth, Product Catalog, and Order processing with Redis caching and JWT.' },
        { title: 'Real-Time Messaging & Presence Engine', desc: 'WebSockets with Redis Pub/Sub handling horizontal scaling across nodes.' },
      ],
      interviewFocus: 'System Design (Scale from 0 to 1M users), Database Indexing, ACID vs BASE, and Microservice patterns',
    },
  },
  {
    slug: 'full-stack-developer',
    title: 'Full-Stack Developer',
    tagline: 'Bridge frontend user experience with scalable backend architectures.',
    description: 'Become the complete developer capable of building end-to-end applications from scratch, deploying to production, and maintaining full systems.',
    icon: 'Layers',
    category: 'Full-Stack',
    estimatedMonths: 8,
    stageFocus: {
      foundations: 'Web Architecture, Client-Server model, DNS, Version Control with Git & GitHub workflows',
      programming: 'TypeScript (across client and server), JavaScript ESNext, Python',
      coreTech: 'React.js, Node.js, Express, MongoDB, PostgreSQL, REST APIs, JSON Web Tokens',
      frameworks: 'Next.js, Tailwind CSS, Docker, GitHub Actions, AWS/Vercel Deployment, Zod validation',
      projects: [
        { title: 'Collaborative Project Workspace', desc: 'Kanban boards, real-time team comments, role-based auth, and activity feeds.' },
        { title: 'Dev Community Platform', desc: 'Article publishing, markdown editor, syntax highlighter, and bookmarking system.' },
      ],
      interviewFocus: 'End-to-end feature delivery, API contract design, full-stack debugging, and database optimization',
    },
  },
  {
    slug: 'python-developer',
    title: 'Python Developer',
    tagline: 'Harness the versatility of Python for backend APIs, automation, and data.',
    description: 'Master Python from idiomatic syntax and OOP to building asynchronous microservices with FastAPI, automating workflows, and working with data pipelines.',
    icon: 'Binary',
    category: 'Language Specialist',
    estimatedMonths: 6,
    stageFocus: {
      foundations: 'Pythonic idioms, Iterators, Generators, Decorators, Context Managers, Virtual Environments',
      programming: 'Object-Oriented Python, Functional Programming, Type Hints, Concurrency with asyncio',
      coreTech: 'FastAPI, Django, PostgreSQL, SQLAlchemy ORM, Celery background tasks, Redis',
      frameworks: 'Pytest, Docker, Poetry package manager, Pandas basics, REST & gRPC APIs',
      projects: [
        { title: 'Async Web Scraper & Intelligence Aggregator', desc: 'Scrape, parse, and analyze market trends concurrently with httpx and BeautifulSoup.' },
        { title: 'High-Performance REST API with FastAPI', desc: 'Pydantic models, async endpoints, JWT auth, and automated Swagger documentation.' },
      ],
      interviewFocus: 'Python GIL (Global Interpreter Lock), memory management, async/await event loop, and Pytest coverage',
    },
  },
  {
    slug: 'java-developer',
    title: 'Java Developer',
    tagline: 'Enterprise-grade backends, microservices, and robust Spring Boot systems.',
    description: 'Specialize in Java and Spring Boot to power mission-critical banking, enterprise backends, and high-concurrency cloud systems.',
    icon: 'Coffee',
    category: 'Enterprise & Backend',
    estimatedMonths: 7,
    stageFocus: {
      foundations: 'Java Syntax, JVM Architecture, Memory Model, Garbage Collection algorithms, Multithreading',
      programming: 'Java 17/21+, OOP principles, Generics, Stream API, Lambdas, Optional, Concurrency package',
      coreTech: 'Spring Boot, Spring MVC, Spring Security, Spring Data JPA / Hibernate, PostgreSQL, MySQL',
      frameworks: 'Maven/Gradle, JUnit 5, Mockito, Kafka, Docker, Microservices with Spring Cloud',
      projects: [
        { title: 'Banking & Wallet Microservice', desc: 'Idempotent money transfer API with distributed database transactions and JWT auth.' },
        { title: 'Inventory Management System', desc: 'Event-driven order placement and stock deduction using Apache Kafka.' },
      ],
      interviewFocus: 'JVM tuning, garbage collectors (G1, ZGC), Java Memory Model, Spring Bean lifecycle, and ACID transactions',
    },
  },
  {
    slug: 'data-analyst',
    title: 'Data Analyst',
    tagline: 'Turn raw data into actionable insights, dashboards, and strategic decisions.',
    description: 'Master SQL, statistical analysis, Python data libraries, and business intelligence tools like PowerBI and Tableau to communicate data-driven recommendations.',
    icon: 'BarChart2',
    category: 'Data & Analytics',
    estimatedMonths: 5,
    stageFocus: {
      foundations: 'Descriptive & Inferential Statistics, Probability, Business KPIs, Exploratory Data Analysis',
      programming: 'SQL (Complex Joins, Window Functions, CTEs) and Python (Pandas, NumPy)',
      coreTech: 'Data Cleaning, Data Modeling, Star/Snowflake schemas, Matplotlib, Seaborn',
      frameworks: 'Power BI, Tableau, Excel Advanced (VLOOKUP, Pivot, Macros), Snowflake / BigQuery',
      projects: [
        { title: 'Customer Churn Analysis Dashboard', desc: 'Identify churn indicators across 10,000+ customer records with interactive PowerBI visuals.' },
        { title: 'E-Commerce Sales Trend & Cohort Study', desc: 'Perform cohort analysis, retention rate calculation, and seasonal forecast in Python.' },
      ],
      interviewFocus: 'SQL query optimization, A/B testing interpretation, metrics definition, and business case studies',
    },
  },
  {
    slug: 'data-scientist',
    title: 'Data Scientist',
    tagline: 'Extract patterns, build predictive machine learning models, and solve business problems.',
    description: 'Combine advanced mathematics, machine learning algorithms, deep learning, and statistical modeling to generate predictive insights from massive datasets.',
    icon: 'TrendingUp',
    category: 'Data & AI',
    estimatedMonths: 8,
    stageFocus: {
      foundations: 'Linear Algebra, Multivariate Calculus, Probability Distributions, Hypothesis Testing',
      programming: 'Python (NumPy, SciPy, Pandas), R, Jupyter notebooks',
      coreTech: 'Supervised & Unsupervised ML (Regression, Random Forest, XGBoost, K-Means), Scikit-Learn',
      frameworks: 'TensorFlow / PyTorch, MLflow, Feature Engineering, Hyperparameter Tuning (Optuna)',
      projects: [
        { title: 'Predictive Medical Diagnosis Classifier', desc: 'Multi-class classification pipeline with ROC-AUC evaluation and SHAP interpretability.' },
        { title: 'Recommendation Engine', desc: 'Collaborative filtering and matrix factorization model for movie or product recommendations.' },
      ],
      interviewFocus: 'Bias-Variance tradeoff, precision vs recall, gradient descent optimization, and cross-validation techniques',
    },
  },
  {
    slug: 'data-engineer',
    title: 'Data Engineer',
    tagline: 'Construct robust data pipelines, data lakes, and distributed processing engines.',
    description: 'Build reliable infrastructure that ingests, cleans, and transforms terabytes of data using Apache Spark, Kafka, Airflow, and cloud data warehouses.',
    icon: 'Database',
    category: 'Data & Cloud',
    estimatedMonths: 8,
    stageFocus: {
      foundations: 'Database Internals, Distributed Systems principles, CAP Theorem, Data Warehousing',
      programming: 'Python, SQL, Scala or Java',
      coreTech: 'Apache Spark (PySpark), Apache Kafka, Apache Airflow for DAG scheduling, PostgreSQL',
      frameworks: 'Snowflake / BigQuery, dbt (data build tool), Docker, Delta Lake / Apache Parquet',
      projects: [
        { title: 'Real-Time Streaming ETL Pipeline', desc: 'Ingest simulated clickstream events via Kafka, process with Spark Streaming into Snowflake.' },
        { title: 'Automated Daily Data Warehouse DAG', desc: 'Airflow orchestration extracting data from APIs, transforming with dbt, and running data quality checks.' },
      ],
      interviewFocus: 'Spark execution graph, partition skew, Kafka offset management, and dimensional modeling',
    },
  },
  {
    slug: 'ai-engineer',
    title: 'AI Engineer',
    tagline: 'Harness LLMs, Generative AI, RAG, and vector databases for smart applications.',
    description: 'Build modern AI-native applications utilizing Large Language Models, embeddings, Retrieval-Augmented Generation (RAG), and agentic workflows.',
    icon: 'Sparkles',
    category: 'Artificial Intelligence',
    estimatedMonths: 6,
    stageFocus: {
      foundations: 'Transformer Architecture, Attention Mechanism, Prompt Engineering, Tokenization',
      programming: 'Python, TypeScript for AI apps, REST APIs',
      coreTech: 'Gemini API, OpenAI API, Vector Databases (Pinecone, Chroma, Qdrant), Embeddings',
      frameworks: 'LangChain, LlamaIndex, Hugging Face, vLLM / Ollama for local model inference',
      projects: [
        { title: 'Enterprise RAG Document Q&A System', desc: 'Semantic search over PDF knowledge bases with hybrid search and citation sources.' },
        { title: 'Autonomous Multi-Agent Researcher', desc: 'Agentic workflow utilizing tool calling, web search, and structured report synthesis.' },
      ],
      interviewFocus: 'RAG hallucination mitigation, vector chunking strategies, prompt injection defenses, and fine-tuning vs RAG',
    },
  },
  {
    slug: 'machine-learning-engineer',
    title: 'Machine Learning Engineer',
    tagline: 'Deploy, scale, and monitor production machine learning models and pipelines.',
    description: 'Bridge data science and software engineering by operationalizing ML models (MLOps), optimizing inference latency, and building scalable serving endpoints.',
    icon: 'Cpu',
    category: 'Artificial Intelligence',
    estimatedMonths: 8,
    stageFocus: {
      foundations: 'Mathematical Foundations, Linear Algebra, Optimization, Loss Functions, Gradient Descent',
      programming: 'Python (Advanced), C++ basics for inference optimization',
      coreTech: 'PyTorch, Scikit-learn, ONNX, TensorRT, Triton Inference Server',
      frameworks: 'Docker, Kubernetes, MLflow, Kubeflow, FastAPI for model serving, DVC (Data Version Control)',
      projects: [
        { title: 'Low-Latency Computer Vision Inference API', desc: 'Deploy a YOLOv8 object detector optimized with ONNX and served on Docker with FastAPI.' },
        { title: 'End-to-End MLOps Pipeline', desc: 'Automated model retraining on drift detection, metric tracking with MLflow, and CI/CD deployment.' },
      ],
      interviewFocus: 'Model latency optimization, quantization, data drift vs concept drift, and distributed training',
    },
  },
  {
    slug: 'devops-engineer',
    title: 'DevOps Engineer',
    tagline: 'Automate deployments, scale infrastructure, and guarantee 99.99% reliability.',
    description: 'Master CI/CD pipelines, Infrastructure as Code, Kubernetes cluster orchestration, and observability to streamline software delivery.',
    icon: 'Settings',
    category: 'Cloud & Infrastructure',
    estimatedMonths: 7,
    stageFocus: {
      foundations: 'Linux Internals, Bash Scripting, Networking (DNS, Load Balancing, Subnets), Security',
      programming: 'Bash, Python, Go for custom tooling',
      coreTech: 'Git, Docker, Kubernetes (K8s), Helm, Terraform (IaC)',
      frameworks: 'GitHub Actions, GitLab CI, Prometheus, Grafana, AWS (EC2, EKS, S3, IAM)',
      projects: [
        { title: 'Multi-Stage CI/CD Pipeline', desc: 'GitHub Actions pipeline running unit tests, linting, Docker build, vulnerability scan, and auto-deploy.' },
        { title: 'Automated Kubernetes Cluster with Terraform', desc: 'Provision VPC, subnets, and EKS cluster on AWS with Prometheus/Grafana monitoring.' },
      ],
      interviewFocus: 'Kubernetes architecture (Control plane, pods, kubelet), 12-factor apps, zero-downtime deployments, and incident post-mortems',
    },
  },
  {
    slug: 'cloud-engineer',
    title: 'Cloud Engineer',
    tagline: 'Design resilient, secure, and cost-optimized cloud architectures on AWS/Azure/GCP.',
    description: 'Specialize in cloud services, serverless computing, cloud networking, identity and access management, and high availability systems.',
    icon: 'Cloud',
    category: 'Cloud & Infrastructure',
    estimatedMonths: 6,
    stageFocus: {
      foundations: 'Cloud Computing Models (IaaS, PaaS, SaaS), Virtualization, Cloud Security & Compliance',
      programming: 'Python (boto3 SDK) or TypeScript (AWS CDK), Bash',
      coreTech: 'AWS / Azure / GCP Core Services: Compute, Storage, Databases, Virtual Networks (VPC/VNet)',
      frameworks: 'Terraform, CloudFormation / AWS CDK, Serverless (AWS Lambda, API Gateway), CloudWatch',
      projects: [
        { title: 'Serverless Event-Driven Image Processor', desc: 'S3 upload triggers Lambda to resize images and store metadata in DynamoDB.' },
        { title: 'High-Availability Multi-Tier Web App on AWS', desc: 'Auto-Scaling Group behind Application Load Balancer across multi-AZ with RDS replica.' },
      ],
      interviewFocus: 'Cloud architecture design for disaster recovery, cost optimization, IAM least-privilege, and CDN caching',
    },
  },
  {
    slug: 'cybersecurity-analyst',
    title: 'Cybersecurity Analyst',
    tagline: 'Defend systems, hunt threats, analyze vulnerabilities, and safeguard digital assets.',
    description: 'Master defensive security (Blue Team), network packet analysis, vulnerability management, SIEM tools, and incident response.',
    icon: 'Shield',
    category: 'Security',
    estimatedMonths: 7,
    stageFocus: {
      foundations: 'TCP/IP Architecture, Cryptography (Symmetric, Asymmetric, Hashing), Security Principles (CIA Triad)',
      programming: 'Python for Security Scripting, Bash, PowerShell',
      coreTech: 'Wireshark packet analysis, Nmap, Burp Suite basics, Linux hardening, Active Directory fundamentals',
      frameworks: 'Splunk / ELK SIEM, Snort IDS, MITRE ATT&CK framework, NIST Cybersecurity Framework',
      projects: [
        { title: 'SOC Lab & Threat Detection SIEM', desc: 'Set up an Elastic Stack SIEM analyzing simulated brute-force and malware attacks in virtualized labs.' },
        { title: 'Automated Vulnerability Scanner Script', desc: 'Python script auditing open ports, outdated SSL ciphers, and unpatched CVE services.' },
      ],
      interviewFocus: 'Incident response lifecycle, analyzing PCAP files, OWASP Top 10 vulnerabilities, and defense-in-depth strategies',
    },
  },
  {
    slug: 'mobile-app-developer',
    title: 'Mobile App Developer',
    tagline: 'Build sleek, high-performance iOS and Android applications.',
    description: 'Master cross-platform or native mobile development using React Native or Flutter, local storage, native device hardware APIs, and app store deployment.',
    icon: 'Smartphone',
    category: 'Mobile Development',
    estimatedMonths: 6,
    stageFocus: {
      foundations: 'Mobile UX/UI Guidelines (Apple HIG & Material Design), Mobile Lifecycles, Offline-first patterns',
      programming: 'TypeScript / JavaScript (React Native) or Dart (Flutter)',
      coreTech: 'React Native / Flutter, State Management, Navigation, Local Storage (SQLite, MMKV)',
      frameworks: 'Expo, Native Modules, Push Notifications, Camera/Location APIs, App Store & Play Store publishing',
      projects: [
        { title: 'Fitness & Habit Tracker Mobile App', desc: 'Offline-first app with animated progress rings, streak tracking, and local push notifications.' },
        { title: 'Campus Community & Events App', desc: 'Event discovery, QR code ticket scanner, and student discussion forum with real-time updates.' },
      ],
      interviewFocus: 'Mobile app performance profiling, memory leaks in views, background tasks, and bridging native modules',
    },
  },
  {
    slug: 'ui-ux-designer',
    title: 'UI/UX Designer',
    tagline: 'Design intuitive, accessible, and breathtaking digital experiences.',
    description: 'Master user research, wireframing, interactive prototyping in Figma, design systems, and design-to-code handoff for modern web and mobile apps.',
    icon: 'Palette',
    category: 'Design & UX',
    estimatedMonths: 5,
    stageFocus: {
      foundations: 'Design Principles, Visual Hierarchy, Typography, Color Theory, Accessibility (Contrast, WCAG)',
      programming: 'Understanding HTML/CSS/Tailwind to design realistic developer-friendly components',
      coreTech: 'Figma (Auto Layout, Variants, Component Sets, Interactive Components), FigJam',
      frameworks: 'Design Systems (Tokens, Atoms to Organisms), Usability Testing, Heuristic Evaluation',
      projects: [
        { title: 'Complete Fintech Mobile App Design System', desc: 'Full design tokens, 30+ reusable components, and interactive high-fidelity prototype.' },
        { title: 'Student Learning Platform Redesign', desc: 'User persona research, wireframing, journey mapping, and usability testing report.' },
      ],
      interviewFocus: 'Design rationale walkthrough, trade-off defense, user research methodologies, and handoff collaboration',
    },
  },
  {
    slug: 'qa-automation-engineer',
    title: 'QA Automation Engineer',
    tagline: 'Ensure bulletproof software quality through automated test frameworks.',
    description: 'Learn modern test automation strategies covering unit, integration, API, and End-to-End browser testing with Playwright, Cypress, and CI integration.',
    icon: 'CheckCircle',
    category: 'Testing & QA',
    estimatedMonths: 5,
    stageFocus: {
      foundations: 'Software Testing Life Cycle (STLC), Test Pyramid, Black-box & White-box techniques',
      programming: 'JavaScript/TypeScript, Python, or Java for automated test scripts',
      coreTech: 'Playwright, Cypress, Selenium WebDriver, Postman / Newman for API testing',
      frameworks: 'Jest / Vitest, CI test pipelines in GitHub Actions, Performance testing with k6',
      projects: [
        { title: 'E2E Test Suite with Playwright', desc: 'Comprehensive test suite for authentication, shopping cart, and checkout with video artifacts.' },
        { title: 'Automated REST API Test Automation Framework', desc: 'Data-driven API test framework with schema validation and HTML reporting in CI.' },
      ],
      interviewFocus: 'Page Object Model (POM), handling flaky tests, test pyramid strategy, and API contract testing',
    },
  },
  {
    slug: 'embedded-systems-engineer',
    title: 'Embedded Systems Engineer',
    tagline: 'Program microcontrollers, sensors, IoT devices, and real-time hardware.',
    description: 'Interface software directly with physical hardware using C, C++, FreeRTOS, and microcontrollers like STM32, ESP32, and Arduino.',
    icon: 'HardDrive',
    category: 'Hardware & IoT',
    estimatedMonths: 8,
    stageFocus: {
      foundations: 'Digital Electronics, Microprocessor Architecture (ARM Cortex, RISC-V), Memory Mapping, Datasheets',
      programming: 'Embedded C, Modern C++, Assembly basics',
      coreTech: 'Hardware Protocols (I2C, SPI, UART, CAN), GPIOs, Timers, Interrupt Service Routines (ISRs)',
      frameworks: 'FreeRTOS, ESP-IDF, Keil / STM32CubeIDE, Logic Analyzers, Oscilloscope basics',
      projects: [
        { title: 'IoT Weather Station with ESP32 & MQTT', desc: 'Read environmental sensors via I2C, publish data via MQTT to cloud dashboard with low-power sleep.' },
        { title: 'Real-Time Motor Controller with FreeRTOS', desc: 'Multitasking RTOS application regulating motor RPM using PWM and encoder feedback with PID.' },
      ],
      interviewFocus: 'Handling hardware race conditions, priority inversion in RTOS, memory constraints, and reading hardware schematics',
    },
  },
  {
    slug: 'game-developer',
    title: 'Game Developer',
    tagline: 'Create captivating worlds, physics simulations, and immersive game mechanics.',
    description: 'Learn game mathematics, 2D/3D graphics, physics engines, and game development pipelines using Unity (C#) or Unreal Engine (C++).',
    icon: 'Gamepad2',
    category: 'Creative Tech',
    estimatedMonths: 8,
    stageFocus: {
      foundations: 'Game Math (Vectors, Matrices, Quaternions), Game Loop architecture, Physics (Collision, Rigid Bodies)',
      programming: 'C# (for Unity) or C++ (for Unreal Engine)',
      coreTech: 'Game Engines (Unity / Unreal / Godot), Shaders, Audio systems, Animation state machines',
      frameworks: 'Blender basics for 3D assets, Particle Systems, Multiplayer networking, Game optimization',
      projects: [
        { title: '2D Action Platformer with Particle FX', desc: 'Player controller, enemy AI state machines, tilemaps, and sound management.' },
        { title: '3D Arena Combat Game in Unity/Unreal', desc: 'Third-person camera, melee attack combos, physics ragdolls, and score tracking.' },
      ],
      interviewFocus: 'Game loop lifecycle, spatial partitioning (Octrees, BVH), draw call optimization, and garbage collection in games',
    },
  },
  {
    slug: 'blockchain-developer',
    title: 'Blockchain Developer',
    tagline: 'Architect decentralized applications (dApps), smart contracts, and Web3 protocols.',
    description: 'Master cryptographic consensus, EVM internals, Solidity smart contract development, security audits, and decentralized finance (DeFi) protocols.',
    icon: 'Key',
    category: 'Web3 & Security',
    estimatedMonths: 7,
    stageFocus: {
      foundations: 'Cryptographic Hashing, Asymmetric Keys, Merkle Trees, Consensus (Proof of Stake, Proof of Work)',
      programming: 'Solidity, JavaScript/TypeScript, Python',
      coreTech: 'Ethereum Virtual Machine (EVM), Smart Contracts, Web3.js / Ethers.js, IPFS',
      frameworks: 'Hardhat, Foundry, OpenZeppelin contract libraries, The Graph protocol for indexing',
      projects: [
        { title: 'Decentralized Crowdfunding dApp', desc: 'Solidity contract with milestone payouts, refund logic, and Next.js frontend with MetaMask.' },
        { title: 'ERC-20 Token & Staking Protocol', desc: 'Yield-bearing staking pool audited against reentrancy and integer overflow attacks.' },
      ],
      interviewFocus: 'Reentrancy attacks, gas optimization techniques, EVM storage layout, and flash loan mechanics',
    },
  },
];

export function buildRoadmapStages(focus: RoadmapDefinition['stageFocus']): IRoadmapStageDoc[] {
  return [
    {
      stageNumber: 1,
      title: 'Stage 1: Foundations',
      description: `Build the non-negotiable mental models and core theoretical grounding: ${focus.foundations}.`,
      learningObjectives: [
        'Understand foundational architectural principles and industry terminology.',
        'Establish command of terminal/CLI tools and developer workflows.',
        'Master problem-solving fundamentals and analytical reasoning.',
      ],
      skillsRequired: ['CLI Navigation', 'Logical Problem Solving', 'Git Basics'],
      recommendedTechnologies: ['Terminal/Bash', 'Git', 'Markdown'],
      freeResources: [
        { title: 'CS50: Introduction to Computer Science', url: 'https://cs50.harvard.edu/', type: 'course' },
        { title: 'Missing Semester of Your CS Education (MIT)', url: 'https://missing.csail.mit.edu/', type: 'course' },
      ],
      practicalExercises: [
        'Initialize a Git repository and configure SSH keys with GitHub.',
        'Write bash scripts to automate repetitive daily workflow tasks.',
      ],
      projectSuggestions: [
        { title: 'Interactive CLI Tool', description: 'Create a command-line script to organize files or fetch API data.', difficulty: 'Beginner' },
      ],
      checklist: ['Configured development environment', 'Mastered Git commits and branches', 'Completed fundamentals course'],
    },
    {
      stageNumber: 2,
      title: 'Stage 2: Programming Skills',
      description: `Achieve language fluency: ${focus.programming}.`,
      learningObjectives: [
        'Master variables, data structures, loops, and memory behavior.',
        'Implement clean code practices and modular functions.',
        'Understand type systems and error handling.',
      ],
      skillsRequired: ['Core Syntax', 'Data Manipulation', 'Debugging'],
      recommendedTechnologies: ['VS Code', 'Compiler/Runtime Tools', 'Linter'],
      freeResources: [
        { title: 'Official Documentation & Language Guide', url: 'https://developer.mozilla.org/', type: 'doc' },
        { title: 'FreeCodeCamp Core Tutorials', url: 'https://www.freecodecamp.org/', type: 'article' },
      ],
      practicalExercises: [
        'Solve 25 beginner algorithmic challenges on string and array manipulation.',
        'Implement a custom data structure (stack or queue) from scratch.',
      ],
      projectSuggestions: [
        { title: 'Text-Based Simulator or Parser', description: 'Build an interactive logic simulator or log analyzer.', difficulty: 'Beginner' },
      ],
      checklist: ['Mastered language syntax', 'Understands memory/variable scopes', 'Can solve basic algorithmic challenges'],
    },
    {
      stageNumber: 3,
      title: 'Stage 3: Core Technologies',
      description: `Master the essential industry technology stack: ${focus.coreTech}.`,
      learningObjectives: [
        'Work comfortably with core libraries, runtime engines, and database systems.',
        'Understand client-server data flow and state management.',
        'Apply relational or document data modeling effectively.',
      ],
      skillsRequired: ['Data Modeling', 'API Integration', 'Asynchronous Flow'],
      recommendedTechnologies: ['PostgreSQL', 'MongoDB', 'REST APIs'],
      freeResources: [
        { title: 'Full Stack Open', url: 'https://fullstackopen.com/en/', type: 'course' },
        { title: 'Roadmap.sh Interactive Guides', url: 'https://roadmap.sh/', type: 'article' },
      ],
      practicalExercises: [
        'Design a normalized database schema with foreign keys and indexes.',
        'Build CRUD operations with robust validation.',
      ],
      projectSuggestions: [
        { title: 'Full CRUD Management System', description: 'Build a secure data-driven system with relational integrity.', difficulty: 'Intermediate' },
      ],
      checklist: ['Connected application to a database', 'Implemented user authentication', 'Handled edge cases and error states'],
    },
    {
      stageNumber: 4,
      title: 'Stage 4: Frameworks and Tools',
      description: `Level up productivity with enterprise frameworks: ${focus.frameworks}.`,
      learningObjectives: [
        'Leverage modern frameworks to accelerate development.',
        'Containerize applications using Docker.',
        'Incorporate automated testing suites and CI workflows.',
      ],
      skillsRequired: ['Framework Architecture', 'Docker Basics', 'State Management'],
      recommendedTechnologies: ['Docker', 'Modern Framework', 'GitHub Actions'],
      freeResources: [
        { title: 'Official Framework Tutorials', url: 'https://react.dev/', type: 'doc' },
        { title: 'Docker 101 Documentation', url: 'https://docs.docker.com/get-started/', type: 'doc' },
      ],
      practicalExercises: [
        'Write a Dockerfile and docker-compose.yml for a multi-container app.',
        'Set up automated linting and unit testing in a GitHub Actions workflow.',
      ],
      projectSuggestions: [
        { title: 'Containerized Microservice / Web App', description: 'Deploy an app running inside Docker with environment variables.', difficulty: 'Intermediate' },
      ],
      checklist: ['Application containerized with Docker', 'CI/CD pipeline triggers on PRs', 'Code quality linters enforced'],
    },
    {
      stageNumber: 5,
      title: 'Stage 5: Practical Projects',
      description: `Build comprehensive production-grade projects: ${focus.projects.map((p) => p.title).join(' and ')}.`,
      learningObjectives: [
        'Synthesize theoretical knowledge into real, usable software.',
        'Implement real-time features, security measures, and caching.',
        'Deploy projects to live cloud environments with custom domains.',
      ],
      skillsRequired: ['End-to-End Development', 'Performance Tuning', 'Cloud Deployment'],
      recommendedTechnologies: ['Vercel / Render / AWS', 'Redis', 'PostgreSQL'],
      freeResources: [
        { title: 'Build Your Own X (GitHub)', url: 'https://github.com/codecrafters-io/build-your-own-x', type: 'article' },
      ],
      practicalExercises: [
        'Implement caching with Redis to achieve sub-50ms API response times.',
        'Set up rate limiting and CSRF/CORS protections.',
      ],
      projectSuggestions: focus.projects.map((p) => ({
        title: p.title,
        description: p.desc,
        difficulty: 'Advanced' as const,
      })),
      checklist: ['Built 2 full-scale projects', 'Live URLs accessible to recruiters', 'Comprehensive documentation in README'],
    },
    {
      stageNumber: 6,
      title: 'Stage 6: GitHub Portfolio',
      description: 'Transform your GitHub into an undeniable showcase of engineering competence.',
      learningObjectives: [
        'Structure repositories with professional READMEs, architecture diagrams, and license files.',
        'Demonstrate clean commit history with descriptive messages.',
        'Highlight live demo links, setup instructions, and test coverage badges.',
      ],
      skillsRequired: ['Technical Documentation', 'Git Workflow', 'Markdown'],
      recommendedTechnologies: ['GitHub', 'Mermaid.js', 'Shields.io'],
      freeResources: [
        { title: 'How to Write a Stellar GitHub README', url: 'https://github.com/matiassingers/awesome-readme', type: 'article' },
      ],
      practicalExercises: [
        'Create a GitHub Profile README with your tech stack badges and active stats.',
        'Record a 60-second Loom/GIF walkthrough of your top project and embed it in the README.',
      ],
      projectSuggestions: [
        { title: 'Personal Developer Portfolio Site', description: 'Fast, animated portfolio highlighting projects and achievements.', difficulty: 'Intermediate' },
      ],
      checklist: ['Pinned top 3 repositories', 'Professional README on every project', 'Clean commit history'],
    },
    {
      stageNumber: 7,
      title: 'Stage 7: Resume Preparation',
      description: 'Craft an ATS-optimized, single-page tech resume following the Google X-Y-Z formula.',
      learningObjectives: [
        'Formulate measurable project bullet points demonstrating impact.',
        'Pass Applicant Tracking Systems (ATS) tests with 90%+ parse accuracy.',
        'Highlight relevant coursework, hackathons, and certifications.',
      ],
      skillsRequired: ['Resume Optimization', 'Impact Quantification', 'ATS Formatting'],
      recommendedTechnologies: ['LaTeX / Overleaf', 'Jake Resume Template', 'PDF Export'],
      freeResources: [
        { title: 'Tech Resume Guide & Best Practices', url: 'https://www.careercup.com/resume', type: 'article' },
      ],
      practicalExercises: [
        'Rewrite 5 project bullet points using: "Accomplished [X] as measured by [Y] by doing [Z]".',
        'Run your resume through ATS scanners to verify formatting.',
      ],
      projectSuggestions: [
        { title: 'LaTeX Tech Resume', description: 'Single-page ATS-compliant resume compiled with clean formatting.', difficulty: 'Beginner' },
      ],
      checklist: ['1-page PDF format', 'Hyperlinked GitHub and live projects', 'Zero typos or grammar mistakes'],
    },
    {
      stageNumber: 8,
      title: 'Stage 8: Interview Preparation',
      description: `Targeted interview preparation: ${focus.interviewFocus}.`,
      learningObjectives: [
        'Master LeetCode Medium/Hard algorithmic patterns.',
        'Conduct mock system design or architecture walkthroughs.',
        'Prepare compelling STAR method behavioral stories.',
      ],
      skillsRequired: ['Algorithmic DSA', 'System Design', 'STAR Method Behavioral'],
      recommendedTechnologies: ['LeetCode', 'NeetCode 150', 'Excalidraw'],
      freeResources: [
        { title: 'NeetCode Roadmap & Patterns', url: 'https://neetcode.io/', type: 'course' },
        { title: 'System Design Primer', url: 'https://github.com/donnemartin/system-design-primer', type: 'article' },
      ],
      practicalExercises: [
        'Complete the Blind 75 / NeetCode 150 problem set.',
        'Conduct 3 peer mock technical interviews under timed conditions.',
      ],
      projectSuggestions: [
        { title: 'System Design Blueprint', description: 'Draw a complete architecture diagram for scaling to 1M users.', difficulty: 'Advanced' },
      ],
      checklist: ['Solved 100+ DSA problems', 'Prepared 5 behavioral STAR stories', 'Conducted mock interviews'],
    },
    {
      stageNumber: 9,
      title: 'Stage 9: Internship Applications',
      description: 'Strategic outreach, campus placement drives, and off-campus opportunity discovery.',
      learningObjectives: [
        'Leverage Technova Hub opportunity board to apply to verified internships.',
        'Reach out to hiring managers and alumni with personalized cold emails.',
        'Participate in national-level hackathons for direct recruitment fast-tracks.',
      ],
      skillsRequired: ['Cold Outreach', 'Networking', 'Application Tracking'],
      recommendedTechnologies: ['LinkedIn', 'GitHub', 'Technova Hub'],
      freeResources: [
        { title: 'Cold Email Templates for Tech Internships', url: 'https://github.com', type: 'article' },
      ],
      practicalExercises: [
        'Send 10 thoughtful outreach notes on LinkedIn to engineering managers.',
        'Apply to 20 curated opportunities on Technova Hub.',
      ],
      projectSuggestions: [
        { title: 'Job & Internship Application Tracker', description: 'Spreadsheet or dashboard monitoring status and interview dates.', difficulty: 'Beginner' },
      ],
      checklist: ['Applied to 20+ opportunities', 'Sent personalized messages', 'Participated in at least 1 hackathon'],
    },
    {
      stageNumber: 10,
      title: 'Stage 10: Job Preparation & Offer Negotiation',
      description: 'Final technical interview rounds, salary negotiation, and onboarding success.',
      learningObjectives: [
        'Excel in full-day interview loops and managerial rounds.',
        'Evaluate multiple offers and understand equity, bonuses, and CTC structure.',
        'Set up a 30-60-90 day onboarding plan for your first engineering role.',
      ],
      skillsRequired: ['Offer Negotiation', 'CTC Breakdown', 'Professional Communication'],
      recommendedTechnologies: ['Levels.fyi', 'Glassdoor', 'LinkedIn'],
      freeResources: [
        { title: 'Ten Rules for Negotiating a Job Offer', url: 'https://haseebq.com/my-ten-rules-for-negotiating-a-job-offer/', type: 'article' },
      ],
      practicalExercises: [
        'Analyze CTC versus in-hand salary calculations across multiple tech tiers.',
        'Draft counter-offer email templates emphasizing market research.',
      ],
      projectSuggestions: [
        { title: '30-60-90 Day Career Action Plan', description: 'Document goals, learning targets, and metrics for your new role.', difficulty: 'Beginner' },
      ],
      checklist: ['Reviewed full CTC terms', 'Negotiated respectfully with data', 'Prepared for Day 1 on the job'],
    },
  ];
}

export const defaultRoadmaps = rawRoadmaps.map((r) => ({
  slug: r.slug,
  title: r.title,
  tagline: r.tagline,
  description: r.description,
  icon: r.icon,
  category: r.category,
  estimatedMonths: r.estimatedMonths,
  stages: buildRoadmapStages(r.stageFocus),
}));
