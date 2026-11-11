export interface SeedTutorial {
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
  quizzes: {
    id: string;
    question: string;
    options: string[];
    correctAnswer: number;
    explanation: string;
  }[];
}

export const defaultTutorials: SeedTutorial[] = [
  // C Tutorials
  {
    languageSlug: 'c',
    title: 'Introduction, Compilation & Memory Layout in C',
    slug: 'c-intro-compilation',
    level: 'Beginner',
    order: 1,
    section: 'Introduction & Setup',
    content: `C is a compiled, statically typed procedural language designed by Dennis Ritchie at Bell Labs. 
When you compile a C program, it passes through 4 distinct stages:
1. **Preprocessor (cpp)**: Expands macros (#define) and includes header files (#include).
2. **Compiler (gcc/clang)**: Translates preprocessed code into assembly instructions.
3. **Assembler (as)**: Translates assembly instructions into relocatable machine object code (.o/.obj).
4. **Linker (ld)**: Combines object files with system libraries into an executable binary.

Memory layout of a running C process consists of:
- **Text segment**: The read-only executable machine instructions.
- **Data segment (Initialized)**: Global and static variables with initial values.
- **BSS segment (Uninitialized)**: Global and static variables zero-initialized.
- **Heap**: Dynamically allocated memory managed via malloc(), calloc(), realloc(), and free().
- **Stack**: Automatic local variables, function frames, return addresses.`,
    codeSnippet: `#include <stdio.h>

int main(void) {
    printf("Welcome to Technova Hub - C Foundations!\\n");
    return 0;
}`,
    codeLanguage: 'c',
    keyTakeaways: [
      'C compiles directly to native architecture instructions.',
      'Memory is split into Text, Data, BSS, Heap, and Stack segments.',
      'Every C program begins execution in main().',
    ],
    quizzes: [
      {
        id: 'c-q1',
        question: 'Which compilation phase expands #include and #define directives?',
        options: ['Linker', 'Preprocessor', 'Assembler', 'Compiler'],
        correctAnswer: 1,
        explanation: 'The Preprocessor handles header inclusions and macro expansions before compilation.',
      },
      {
        id: 'c-q2',
        question: 'In which memory segment are uninitialized global variables stored?',
        options: ['Stack', 'Heap', 'BSS segment', 'Text segment'],
        correctAnswer: 2,
        explanation: 'The BSS (Block Started by Symbol) segment stores uninitialized global and static variables.',
      },
    ],
  },
  {
    languageSlug: 'c',
    title: 'Pointers, Memory Addresses & Dynamic Allocation',
    slug: 'c-pointers-memory',
    level: 'Intermediate',
    order: 2,
    section: 'Memory & Pointers',
    content: `Pointers are variables that store the memory address of another variable.
Understanding pointers is fundamental to C, OS development, and high-performance programming.

Key operators:
- Address-of operator (&): Returns the physical memory address of a variable.
- Dereference operator (*): Accesses the value stored at the address pointed to.

Dynamic Allocation:
- malloc(size): Allocates uninitialized memory on the heap.
- calloc(num, size): Allocates zero-initialized memory.
- free(ptr): Releases allocated heap memory back to the OS to prevent memory leaks. Always set freed pointer to NULL!`,
    codeSnippet: `#include <stdio.h>
#include <stdlib.h>

int main() {
    int size = 5;
    int *arr = (int *)malloc(size * sizeof(int));
    if (arr == NULL) {
        fprintf(stderr, "Allocation failed\\n");
        return 1;
    }

    for (int i = 0; i < size; i++) {
        arr[i] = (i + 1) * 10;
        printf("Element %d at %p = %d\\n", i, (void*)&arr[i], arr[i]);
    }

    free(arr);
    arr = NULL;
    return 0;
}`,
    codeLanguage: 'c',
    keyTakeaways: [
      'Pointers hold memory addresses, allowing direct hardware and RAM interaction.',
      'Every malloc() must have a matching free() to prevent leaks.',
      'Always check if malloc returns NULL before dereferencing.',
    ],
    quizzes: [
      {
        id: 'c-q3',
        question: 'What is the consequence of failing to call free() on heap-allocated memory?',
        options: ['Segmentation fault immediately', 'Memory leak', 'Compile error', 'Stack overflow'],
        correctAnswer: 1,
        explanation: 'Failing to release allocated memory leads to memory leaks, depleting system RAM.',
      },
    ],
  },

  // C++ Tutorials
  {
    languageSlug: 'cpp',
    title: 'Modern C++: OOP, Classes & RAII',
    slug: 'cpp-classes-raii',
    level: 'Beginner',
    order: 1,
    section: 'Object-Oriented Programming',
    content: `C++ enhances C with Object-Oriented Programming and RAII (Resource Acquisition Is Initialization).
RAII binds the life cycle of a resource (heap memory, file handles, mutex locks) to the lifetime of an object. When the object goes out of scope, its destructor is automatically called, guaranteeing cleanup even during exceptions.`,
    codeSnippet: `#include <iostream>
#include <string>
#include <vector>

class Developer {
private:
    std::string name;
    std::string techStack;

public:
    Developer(std::string n, std::string stack) : name(n), techStack(stack) {}
    
    void displayInfo() const {
        std::cout << "Developer: " << name << " | Speciality: " << techStack << std::endl;
    }
};

int main() {
    Developer dev("Aarav", "Full-Stack & C++");
    dev.displayInfo();
    return 0;
}`,
    codeLanguage: 'cpp',
    keyTakeaways: [
      'RAII prevents memory leaks by coupling resource management to object lifetime.',
      'Encapsulation hides internal implementation using private/public access specifiers.',
      'Modern C++ uses constructors and destructors for automated resource safety.',
    ],
    quizzes: [
      {
        id: 'cpp-q1',
        question: 'What does RAII stand for in C++?',
        options: [
          'Resource Allocation In Initialization',
          'Resource Acquisition Is Initialization',
          'Random Array Index Initialization',
          'Resource Access In Instance',
        ],
        correctAnswer: 1,
        explanation: 'RAII stands for Resource Acquisition Is Initialization, a cornerstone idiom of C++.',
      },
    ],
  },
  {
    languageSlug: 'cpp',
    title: 'Standard Template Library (STL) for Competitive Programming',
    slug: 'cpp-stl-dsa',
    level: 'Intermediate',
    order: 2,
    section: 'Data Structures & STL',
    content: `The C++ STL provides battle-tested algorithms and containers:
- **std::vector**: Dynamic array with amortized O(1) push_back.
- **std::unordered_map**: Hash table with average O(1) lookup.
- **std::map**: Self-balancing Red-Black tree with O(log N) operations.
- **std::priority_queue**: Max/min heap used in Dijkstra and Greedy algorithms.
- **std::sort**: Introsort (QuickSort + HeapSort + InsertionSort) with guaranteed O(N log N).`,
    codeSnippet: `#include <iostream>
#include <vector>
#include <algorithm>
#include <unordered_map>

int main() {
    std::vector<int> nums = {45, 12, 85, 32, 89, 39, 69, 44, 42, 1, 6, 8};
    std::sort(nums.begin(), nums.end());

    std::cout << "Sorted: ";
    for (int n : nums) std::cout << n << " ";
    std::cout << std::endl;
    return 0;
}`,
    codeLanguage: 'cpp',
    keyTakeaways: [
      'STL containers drastically reduce boilerplate in coding contests and interviews.',
      'std::unordered_map provides O(1) average lookup using hashing.',
      'std::sort executes in O(N log N) using introsort.',
    ],
    quizzes: [
      {
        id: 'cpp-q2',
        question: 'What is the worst-case time complexity of std::sort in C++11 and later?',
        options: ['O(N^2)', 'O(N log N)', 'O(N)', 'O(log N)'],
        correctAnswer: 1,
        explanation: 'Introsort guarantees O(N log N) worst-case time complexity by falling back to heapsort.',
      },
    ],
  },

  // Python Tutorials
  {
    languageSlug: 'python',
    title: 'Python Essentials: Data Structures, List Comprehensions & Lambdas',
    slug: 'python-core-structures',
    level: 'Beginner',
    order: 1,
    section: 'Python Core',
    content: `Python is dynamically typed and garbage collected with automatic reference counting and cyclic GC.
Key built-in collections:
- **Lists**: Ordered, mutable arrays [1, 2, 3].
- **Tuples**: Ordered, immutable sequences (1, 2, 3).
- **Dictionaries**: Key-value hash tables { 'key': 'val' }, O(1) lookups.
- **Sets**: Unordered unique element collections { 1, 2, 3 }.

List comprehensions provide an elegant syntax for transforming iterables concisely.`,
    codeSnippet: `# Pythonic data processing with list comprehensions
skills = ['React', 'Node.js', 'Python', 'Machine Learning', 'Docker', 'PostgreSQL']

# Filter skills containing 'o' in uppercase
filtered_skills = [s.upper() for s in skills if 'o' in s.lower()]
print("Selected Skills:", filtered_skills)

# Dictionary comprehension
skill_lengths = {s: len(s) for s in skills}
print("Length Map:", skill_lengths)`,
    codeLanguage: 'python',
    keyTakeaways: [
      'List & Dict comprehensions are more concise and faster than manual for-loops.',
      'Tuples are immutable, making them hashable and safe for dictionary keys.',
      'Dictionaries offer O(1) average time complexity for retrieval and insertion.',
    ],
    quizzes: [
      {
        id: 'py-q1',
        question: 'Which Python collection type is immutable?',
        options: ['List', 'Dictionary', 'Tuple', 'Set'],
        correctAnswer: 2,
        explanation: 'Tuples cannot be modified after creation, ensuring immutability.',
      },
      {
        id: 'py-q2',
        question: 'What is the average time complexity for key lookup in a Python dictionary?',
        options: ['O(1)', 'O(N)', 'O(log N)', 'O(N^2)'],
        correctAnswer: 0,
        explanation: 'Python dicts use an optimized hash table yielding O(1) average time complexity.',
      },
    ],
  },
  {
    languageSlug: 'python',
    title: 'Python for AI & APIs: FastAPIs, NumPy & Async Programming',
    slug: 'python-ai-apis',
    level: 'Intermediate',
    order: 2,
    section: 'Modern Python Ecosystem',
    content: `Modern Python shines in backend microservices and artificial intelligence:
- **FastAPI / Pydantic**: Async web framework with automatic OpenAPI documentation and data validation.
- **Asyncio / coroutines**: Non-blocking I/O handling thousands of concurrent requests with async/await.
- **NumPy & Vectorization**: C-optimized array calculations outperforming pure Python loops by 50x-100x.`,
    codeSnippet: `import asyncio

async def fetch_tech_opportunity(opp_id: int):
    print(f"Fetching opportunity #{opp_id}...")
    await asyncio.sleep(0.5)  # Simulate non-blocking network I/O
    return {"id": opp_id, "role": "AI Engineer Intern", "stipend": "₹45,000/mo"}

async def main():
    results = await asyncio.gather(
        fetch_tech_opportunity(101),
        fetch_tech_opportunity(102),
        fetch_tech_opportunity(103)
    )
    print("Fetched all concurrently:", results)

asyncio.run(main())`,
    codeLanguage: 'python',
    keyTakeaways: [
      'asyncio allows non-blocking I/O concurrency without thread overhead.',
      'NumPy uses contiguous C memory buffers for vectorized linear algebra.',
      'FastAPI leverages Python type hints for compile-free validation and automatic docs.',
    ],
    quizzes: [
      {
        id: 'py-q3',
        question: 'Which method runs multiple asyncio coroutines concurrently and waits for all to finish?',
        options: ['asyncio.wait_all()', 'asyncio.gather()', 'asyncio.run_parallel()', 'asyncio.combine()'],
        correctAnswer: 1,
        explanation: 'asyncio.gather() aggregates multiple coroutines into a single future.',
      },
    ],
  },

  // JavaScript Tutorials
  {
    languageSlug: 'javascript',
    title: 'Modern JavaScript (ES6+): Closures, Event Loop & Promises',
    slug: 'js-closures-event-loop',
    level: 'Beginner',
    order: 1,
    section: 'Core Architecture',
    content: `JavaScript is single-threaded, non-blocking, and asynchronous.
Key concepts:
1. **Closures**: A function retains access to its lexical scope even when executed outside that scope.
2. **Event Loop**: Coordinates the Call Stack, Web APIs (timers, fetch), Microtask Queue (Promises, queueMicrotask), and Macrotask Queue (setTimeout, setInterval).
3. **Promises & Async/Await**: Cleaner syntax for managing asynchronous workflows without callback hell.`,
    codeSnippet: `// Closure demonstration
function createCounter(initialValue = 0) {
    let count = initialValue;
    return {
        increment: () => ++count,
        decrement: () => --count,
        getCount: () => count
    };
}

const counter = createCounter(10);
console.log(counter.increment()); // 11
console.log(counter.increment()); // 12
console.log(counter.getCount());  // 12`,
    codeLanguage: 'javascript',
    keyTakeaways: [
      'Microtasks (Promises) always execute before Macrotasks (setTimeout) in the Event Loop.',
      'Closures enable private state and encapsulation in JavaScript.',
      'Always handle Promise rejections using try/catch with async/await.',
    ],
    quizzes: [
      {
        id: 'js-q1',
        question: 'Which queue has higher priority in the JavaScript Event Loop?',
        options: ['Macrotask Queue (setTimeout)', 'Microtask Queue (Promises)', 'Rendering Queue', 'Network Queue'],
        correctAnswer: 1,
        explanation: 'The Microtask queue is always completely drained before the next Macrotask is processed.',
      },
    ],
  },

  // TypeScript Tutorials
  {
    languageSlug: 'typescript',
    title: 'TypeScript Type System: Generics, Unions & Utility Types',
    slug: 'ts-generics-utility-types',
    level: 'Intermediate',
    order: 1,
    section: 'Advanced Typing',
    content: `TypeScript transforms JavaScript into a robust enterprise language by adding compile-time static type checking.
Key features:
- **Generics (<T>)**: Write reusable, type-safe functions and data structures.
- **Discriminated Unions**: Pattern match across polymorphic object shapes safely.
- **Utility Types**: Partial<T>, Pick<T, K>, Omit<T, K>, Record<K, V>, Readonly<T>.`,
    codeSnippet: `interface BaseOpportunity {
  id: string;
  title: string;
  company: string;
  deadline: Date;
}

interface Internship extends BaseOpportunity {
  type: 'internship';
  stipend: number;
}

interface Hackathon extends BaseOpportunity {
  type: 'hackathon';
  prizePool: string;
}

type TechEvent = Internship | Hackathon;

function processEvent(event: TechEvent) {
  if (event.type === 'internship') {
    console.log(\`Internship stipend: ₹\${event.stipend}\`);
  } else {
    console.log(\`Hackathon prizes: \${event.prizePool}\`);
  }
}`,
    codeLanguage: 'typescript',
    keyTakeaways: [
      'Discriminated unions ensure exhaustive type narrowing with the "type" tag.',
      'Generics prevent the need for "any" while keeping code modular.',
      'Utility types provide powerful transforms over existing interfaces.',
    ],
    quizzes: [
      {
        id: 'ts-q1',
        question: 'Which utility type constructs a type with all properties of T set to optional?',
        options: ['Required<T>', 'Partial<T>', 'Nullable<T>', 'Optional<T>'],
        correctAnswer: 1,
        explanation: 'Partial<T> makes all properties in type T optional.',
      },
    ],
  },

  // Java Tutorials
  {
    languageSlug: 'java',
    title: 'Core Java & JVM Internals: OOP, Memory & Collections',
    slug: 'java-core-collections',
    level: 'Beginner',
    order: 1,
    section: 'Core Architecture',
    content: `Java is an object-oriented, class-based language compiled to bytecode that runs on any JVM.
JVM Memory Architecture:
- **Heap Space**: Shared memory storing all instantiated objects. Divided into Young Generation (Eden, S0, S1) and Old (Tenured) Generation.
- **Stack Space**: Thread-isolated memory storing primitive local variables and references to heap objects.
- **Metaspace**: Stores loaded class metadata in native memory.

The Java Collections Framework includes ArrayList, LinkedList, HashMap, HashSet, and ConcurrentHashMap.`,
    codeSnippet: `import java.util.*;

public class StudentRegistry {
    public static void main(String[] args) {
        Map<String, String> studentGoals = new HashMap<>();
        studentGoals.put("Rohan", "Cybersecurity Analyst");
        studentGoals.put("Priya", "AI/ML Engineer");
        studentGoals.put("Vikram", "Full-Stack Developer");

        studentGoals.forEach((name, goal) -> {
            System.out.println(name + " -> Aiming for: " + goal);
        });
    }
}`,
    codeLanguage: 'java',
    keyTakeaways: [
      'Java bytecode is platform-independent thanks to the JVM.',
      'Young Gen GC (Minor GC) is fast, while Tenured GC (Major/Full GC) cleans long-lived objects.',
      'HashMap uses bucket arrays and transitions to Red-Black trees upon high hash collisions.',
    ],
    quizzes: [
      {
        id: 'java-q1',
        question: 'Which memory area in the JVM holds instantiated objects?',
        options: ['Stack', 'Heap', 'Metaspace', 'Program Counter Register'],
        correctAnswer: 1,
        explanation: 'All objects in Java are allocated on the Heap and managed by the Garbage Collector.',
      },
    ],
  },

  // Go Tutorials
  {
    languageSlug: 'go',
    title: 'Go Concurrency: Goroutines, Channels & Worker Pools',
    slug: 'go-concurrency-patterns',
    level: 'Intermediate',
    order: 1,
    section: 'Cloud & Concurrency',
    content: `Go was built from the ground up for concurrent cloud systems.
Instead of heavy OS threads (which require 1-2MB of stack space), Go uses **Goroutines**, which start with only 2KB of stack memory and are cooperatively scheduled across OS threads by the Go runtime scheduler (M:N model).
Channels provide type-safe message passing between goroutines without explicit lock mutexes:
*"Do not communicate by sharing memory; instead, share memory by communicating."*`,
    codeSnippet: `package main

import (
	"fmt"
	"sync"
	"time"
)

func worker(id int, jobs <-chan int, results chan<- int, wg *sync.WaitGroup) {
	defer wg.Done()
	for j := range jobs {
		fmt.Printf("Worker %d processing job %d\\n", id, j)
		time.Sleep(100 * time.Millisecond)
		results <- j * 2
	}
}

func main() {
	const numJobs = 5
	jobs := make(chan int, numJobs)
	results := make(chan int, numJobs)
	var wg sync.WaitGroup

	// Launch 3 worker goroutines
	for w := 1; w <= 3; w++ {
		wg.Add(1)
		go worker(w, jobs, results, &wg)
	}

	for j := 1; j <= numJobs; j++ {
		jobs <- j
	}
	close(jobs)

	wg.Wait()
	close(results)

	for r := range results {
		fmt.Printf("Result: %d\\n", r)
	}
}`,
    codeLanguage: 'go',
    keyTakeaways: [
      'Goroutines are ultra-lightweight, starting with just 2KB stack.',
      'Channels provide synchronization and safe communication between goroutines.',
      'sync.WaitGroup guarantees that main waits for all concurrent workers before exiting.',
    ],
    quizzes: [
      {
        id: 'go-q1',
        question: 'What is the initial stack size of a Go goroutine?',
        options: ['1 MB', '2 KB', '64 KB', '512 KB'],
        correctAnswer: 1,
        explanation: 'Goroutines start with an initial segmented stack of just 2KB, dynamically resizing as needed.',
      },
    ],
  },

  // Rust Tutorials
  {
    languageSlug: 'rust',
    title: 'Rust Ownership, Borrowing & Lifetimes',
    slug: 'rust-ownership-borrowing',
    level: 'Advanced',
    order: 1,
    section: 'Memory Safety',
    content: `Rust achieves memory safety without a garbage collector through 3 fundamental rules of Ownership:
1. Each value in Rust has an **owner**.
2. There can only be **one owner at a time**.
3. When the owner goes out of scope, the value is automatically dropped.

Borrowing rules:
- You may have any number of immutable references (&T).
- OR you may have exactly one mutable reference (&mut T) at any given time.
- References must always be valid (no dangling pointers).`,
    codeSnippet: `fn main() {
    let mut greeting = String::from("Hello Technova");
    
    // Pass by mutable reference (borrowing)
    append_future(&mut greeting);
    
    println!("{}", greeting);
}

fn append_future(s: &mut String) {
    s.push_str(" - Build Your Future!");
}`,
    codeLanguage: 'rust',
    keyTakeaways: [
      'Rust eliminates data races and memory leaks at compile time without a GC.',
      'Ownership transfers (moves) by default for non-Copy types.',
      'You can have multiple immutable borrows or one mutable borrow, never both simultaneously.',
    ],
    quizzes: [
      {
        id: 'rust-q1',
        question: 'Can you have a mutable reference and an immutable reference to the same data at the same time in Rust?',
        options: ['Yes, always', 'No, the compiler rejects it', 'Only in unsafe blocks', 'Only if multithreading is enabled'],
        correctAnswer: 1,
        explanation: 'Rust borrowing rules prohibit simultaneous mutable and immutable references to prevent data races.',
      },
    ],
  },

  // SQL Tutorials
  {
    languageSlug: 'sql',
    title: 'Advanced SQL: Joins, Window Functions, Grouping & Indexing',
    slug: 'sql-advanced-queries',
    level: 'Beginner',
    order: 1,
    section: 'Relational Databases',
    content: `SQL powers data analysis and backend data stores.
Key concepts:
- **INNER JOIN**: Returns rows with matching keys in both tables.
- **LEFT JOIN**: Returns all rows from left table and matched rows from right.
- **Window Functions**: OVER (PARTITION BY ... ORDER BY ...) computes running totals, rankings (DENSE_RANK, ROW_NUMBER) without collapsing rows like GROUP BY.
- **B-Tree Indexes**: Drastically accelerates SELECT queries from O(N) full table scans to O(log N).`,
    codeSnippet: `-- Ranking top student projects in each college
SELECT 
    student_name,
    college,
    project_score,
    DENSE_RANK() OVER (PARTITION BY college ORDER BY project_score DESC) as college_rank
FROM student_submissions;`,
    codeLanguage: 'sql',
    keyTakeaways: [
      'Window functions allow aggregations while preserving individual row identity.',
      'B-Tree indexes speed up lookups but add overhead to INSERT and UPDATE operations.',
      'Always analyze execution plans using EXPLAIN ANALYZE.',
    ],
    quizzes: [
      {
        id: 'sql-q1',
        question: 'Which window function assigns consecutive ranks without skipping numbers in case of ties?',
        options: ['RANK()', 'DENSE_RANK()', 'ROW_NUMBER()', 'NTILE()'],
        correctAnswer: 1,
        explanation: 'DENSE_RANK() does not skip rank values when multiple rows have identical values.',
      },
    ],
  },

  // HTML Tutorials
  {
    languageSlug: 'html',
    title: 'Semantic HTML5, Accessibility (a11y) & Web Standards',
    slug: 'html5-semantics-a11y',
    level: 'Beginner',
    order: 1,
    section: 'Web Fundamentals',
    content: `Semantic HTML provides meaning to web content for search engines, screen readers, and browser rendering engines.
Use dedicated semantic elements:
- <header>, <nav>, <main>, <article>, <section>, <aside>, <footer>
- Accessibility (ARIA) attributes for assistive technologies: aria-label, aria-expanded, role.`,
    codeSnippet: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Technova Opportunities</title>
</head>
<body>
    <header>
        <nav aria-label="Main Navigation">
            <a href="/opportunities">Opportunities</a>
            <a href="/roadmaps">Roadmaps</a>
        </nav>
    </header>
    <main>
        <article>
            <h1>Google Cloud Hackathon 2026</h1>
            <p>Compete and win ₹5,00,000 in prizes!</p>
        </article>
    </main>
</body>
</html>`,
    codeLanguage: 'html',
    keyTakeaways: [
      'Semantic tags improve SEO, reader mode, and screen-reader navigation.',
      'Always include the alt attribute on <img> tags.',
      'Use proper heading hierarchy (h1 through h6).',
    ],
    quizzes: [
      {
        id: 'html-q1',
        question: 'Which semantic element represents the central, unique content of a webpage?',
        options: ['<section>', '<article>', '<main>', '<div id="content">'],
        correctAnswer: 2,
        explanation: '<main> represents the dominant, non-repeated content of the <body>.',
      },
    ],
  },

  // CSS Tutorials
  {
    languageSlug: 'css',
    title: 'Modern CSS: Flexbox, CSS Grid & Responsive Design',
    slug: 'css-grid-flexbox-modern',
    level: 'Beginner',
    order: 1,
    section: 'Layout & Styling',
    content: `Flexbox is built for one-dimensional layouts (rows or columns), while CSS Grid excels at two-dimensional layouts (simultaneous rows and columns).
Combined with CSS variables (custom properties) and media queries, modern CSS allows building responsive, fluid user interfaces without heavy external dependencies.`,
    codeSnippet: `/* Responsive Card Grid */
.opportunities-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1.5rem;
    padding: 2rem;
}

.opportunity-card {
    background: #15171C;
    border: 1px solid #272B35;
    border-radius: 12px;
    padding: 1.5rem;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.opportunity-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 0 20px rgba(255, 121, 0, 0.2);
}`,
    codeLanguage: 'css',
    keyTakeaways: [
      'repeat(auto-fit, minmax(...)) creates responsive layouts without media queries.',
      'Flexbox is optimal for alignment along a single axis.',
      'CSS variables (--accent: #FF7900) allow instant theming.',
    ],
    quizzes: [
      {
        id: 'css-q1',
        question: 'Which CSS Grid property creates responsive auto-wrapping columns based on available space?',
        options: ['grid-auto-flow', 'repeat(auto-fit, minmax(...))', 'flex-wrap: wrap', 'columns: auto'],
        correctAnswer: 1,
        explanation: 'repeat(auto-fit, minmax(...)) automatically fits as many columns as possible.',
      },
    ],
  },

  // PHP Tutorials
  {
    languageSlug: 'php',
    title: 'Modern PHP 8+: Types, Attributes & MVC Frameworks',
    slug: 'php-modern-features',
    level: 'Beginner',
    order: 1,
    section: 'Modern Backend',
    content: `PHP 8 introduced named arguments, union types, constructor promotion, the match expression, and Just-In-Time (JIT) compilation.
With Laravel as the flagship framework, modern PHP powers enterprise eCommerce, SaaS backends, and robust REST APIs.`,
    codeSnippet: `<?php
declare(strict_types=1);

class Opportunity {
    // PHP 8 Constructor Property Promotion
    public function __construct(
        public readonly string $title,
        public readonly string $company,
        public readonly int $stipend
    ) {}

    public function getDetails(): string {
        return "{$this->title} at {$this->company} (₹{$this->stipend}/mo)";
    }
}

$opp = new Opportunity("Backend Developer", "Technova Labs", 35000);
echo $opp->getDetails();
?>`,
    codeLanguage: 'php',
    keyTakeaways: [
      'Constructor promotion reduces class boilerplate in PHP 8+.',
      'declare(strict_types=1) ensures strict type enforcement across functions.',
      'Match expressions provide type-safe, concise branching.',
    ],
    quizzes: [
      {
        id: 'php-q1',
        question: 'Which PHP 8 expression provides a safer and more concise alternative to switch-case?',
        options: ['match', 'choose', 'select', 'branch'],
        correctAnswer: 0,
        explanation: 'The match expression does strict type comparisons and returns a value without break statements.',
      },
    ],
  },
];
