import type { DailyPlanDay } from '@/types';

export interface WeekPlan {
  week: number;
  label: string;
  daily: DailyPlanDay[];
}

export interface ModulePlan {
  weeks: WeekPlan[];
}

export interface Resource {
  name: string;
  url: string;
  type: 'free' | 'paid' | 'book' | 'video' | 'practice';
  note: string;
}

export interface ModuleRoadmap {
  key: string;
  label: string;
  icon: string;
  color: string;
  tagline: string;
  timeEstimate: string;
  weekRange: string;
  mustKnow: string[];
  resources: Resource[];
}

// ─────────────────────────────────────────────────────────────────────────────
// MODULE ROADMAPS WITH RESOURCES
// ─────────────────────────────────────────────────────────────────────────────
export const MODULE_ROADMAPS: ModuleRoadmap[] = [
  {
    key: 'dsa', label: 'DSA Practice', icon: '💡', color: '#00d4ff',
    tagline: 'Pattern recognition over problem memorisation',
    timeEstimate: '2h/day', weekRange: 'Weeks 1–24',
    mustKnow: [
      'Two Pointers & Sliding Window', 'Binary Search (standard + on answer)',
      'Fast & Slow Pointers', 'Tree BFS/DFS (recursive + iterative)',
      'Graph BFS/DFS + Topological Sort', 'Union-Find with path compression',
      'Dynamic Programming (1D, 2D, Knapsack)', 'Backtracking template',
      'Heap / Priority Queue (Top-K, Two-Heap)', 'Monotonic Stack',
      'Trie insert/search/startsWith', 'Dijkstra\'s algorithm',
    ],
    resources: [
      { name: 'NeetCode 150', url: 'https://neetcode.io/practice', type: 'practice', note: 'Best structured roadmap — follow in order' },
      { name: 'LeetCode', url: 'https://leetcode.com', type: 'practice', note: 'Primary practice platform. Use company filters.' },
      { name: 'NeetCode YouTube', url: 'https://www.youtube.com/@NeetCode', type: 'video', note: 'Best video explanations for every pattern' },
      { name: 'Blind 75 List', url: 'https://leetcode.com/discuss/general-discussion/460599/blind-75-leetcode-questions', type: 'free', note: 'Essential 75 must-solve problems' },
      { name: 'Grind 169', url: 'https://www.techinterviewhandbook.org/grind75', type: 'free', note: 'Updated Blind 75 with time filters' },
      { name: 'Algorithms (CLRS)', url: 'https://mitpress.mit.edu/books/introduction-algorithms', type: 'book', note: 'Reference for theory depth — not required cover-to-cover' },
      { name: 'Algo Expert', url: 'https://www.algoexpert.io', type: 'paid', note: 'Curated 160 problems with video solutions' },
      { name: 'Visualgo', url: 'https://visualgo.net', type: 'free', note: 'Visual animations of every algorithm' },
      { name: 'CS Dojo YouTube', url: 'https://www.youtube.com/@CSDojo', type: 'video', note: 'Excellent beginner-friendly algorithm explanations' },
    ],
  },
  {
    key: 'cs', label: 'CS Fundamentals', icon: '🖥️', color: '#9f7aea',
    tagline: 'The theory behind every system — often tested at senior levels',
    timeEstimate: '1h/day alongside DSA', weekRange: 'Weeks 3–14',
    mustKnow: [
      'Process vs Thread vs Coroutine', 'Deadlock: 4 Coffman conditions + prevention',
      'Virtual Memory: paging, TLB, page faults', 'CPU scheduling: CFS, MLFQ',
      'TCP 3-way handshake + flow/congestion control', 'HTTP/1.1 vs HTTP/2 vs HTTP/3',
      'TLS handshake + certificate chain', 'ACID properties + MVCC',
      'SQL: window functions, JOINs, indexes', 'B-tree index internals',
      'Transaction isolation levels (4 levels)', 'CAP theorem + BASE',
    ],
    resources: [
      { name: 'Operating Systems: Three Easy Pieces', url: 'https://pages.cs.wisc.edu/~remzi/OSTEP/', type: 'free', note: 'Free online textbook — best OS resource' },
      { name: 'Computer Networking: A Top-Down Approach', url: 'https://gaia.cs.umass.edu/kurose_ross/online_lectures.htm', type: 'book', note: 'Kurose & Ross — industry standard networking book' },
      { name: 'CMU Database Course (YouTube)', url: 'https://www.youtube.com/playlist?list=PLSE8ODhjZXjbj8BMuIrRcacnQh20hmY9g', type: 'video', note: 'CMU 15-445 — best free database course' },
      { name: 'Julia Evans: Networking Zines', url: 'https://wizardzines.com/', type: 'free', note: 'Excellent visual explanations of networking concepts' },
      { name: 'Cloudflare Learning Centre', url: 'https://www.cloudflare.com/learning/', type: 'free', note: 'Best free resource for HTTP, DNS, TLS, CDN' },
      { name: 'PostgreSQL Docs: MVCC', url: 'https://www.postgresql.org/docs/current/mvcc.html', type: 'free', note: 'Source of truth for transaction isolation' },
      { name: 'Use The Index, Luke', url: 'https://use-the-index-luke.com/', type: 'free', note: 'Best practical SQL indexing guide' },
      { name: 'InterviewBit CS Fundamentals', url: 'https://www.interviewbit.com/courses/computer-fundamentals/', type: 'free', note: 'Structured interview-focused CS prep' },
    ],
  },
  {
    key: 'sd', label: 'System Design', icon: '🏗️', color: '#ff6b00',
    tagline: 'Think in trade-offs, not correct answers',
    timeEstimate: '1.5h/day', weekRange: 'Weeks 9–28',
    mustKnow: [
      'Horizontal vs Vertical scaling', 'Load balancers (L4 vs L7)',
      'Caching: Redis strategies, eviction, consistency', 'CAP theorem + eventual consistency',
      'SQL vs NoSQL: when and why', 'Sharding + consistent hashing',
      'Message queues: Kafka partitions, consumer groups', 'CDN: push vs pull',
      'Rate limiting algorithms', 'URL shortener end-to-end',
      'Design at 10M+ user scale', 'Microservices patterns: circuit breaker, saga',
    ],
    resources: [
      { name: 'System Design Primer (GitHub)', url: 'https://github.com/donnemartin/system-design-primer', type: 'free', note: 'Most comprehensive free SD reference — bookmark this' },
      { name: 'Designing Data-Intensive Applications', url: 'https://dataintensive.net/', type: 'book', note: 'DDIA by Martin Kleppmann — the SD bible. Read it.' },
      { name: 'Grokking System Design (DesignGurus)', url: 'https://designgurus.io/course/grokking-the-system-design-interview', type: 'paid', note: 'Best structured SD interview course' },
      { name: 'ByteByteGo Newsletter', url: 'https://blog.bytebytego.com/', type: 'free', note: 'Alex Xu\'s diagrams — excellent visual system explanations' },
      { name: 'ByteByteGo YouTube', url: 'https://www.youtube.com/@ByteByteGo', type: 'video', note: 'Best SD YouTube channel. Watch all videos.' },
      { name: 'High Scalability Blog', url: 'http://highscalability.com/', type: 'free', note: 'Real-world architecture case studies (Netflix, Twitter, etc.)' },
      { name: 'Engineering Blogs Aggregator', url: 'https://github.com/kilimchoi/engineering-blogs', type: 'free', note: 'Links to all FAANG/unicorn engineering blogs' },
      { name: 'Exponent System Design', url: 'https://www.tryexponent.com/courses/system-design-interview', type: 'paid', note: 'Video walkthroughs of common SD questions' },
      { name: 'InfoQ Architecture Articles', url: 'https://www.infoq.com/architecture-design/', type: 'free', note: 'Conference talks from engineers at scale' },
    ],
  },
  {
    key: 'java', label: 'Java + Spring', icon: '☕', color: '#ffb800',
    tagline: 'Deep Java = JVM + Concurrency + Spring internals',
    timeEstimate: '1.5h/day', weekRange: 'Weeks 15–28',
    mustKnow: [
      'HashMap internals + Java 8 tree bin', 'Collections: LinkedHashMap, TreeMap, ConcurrentHashMap',
      'Java Memory Model + happens-before', 'synchronized vs ReentrantLock vs Atomic',
      'CompletableFuture composition', 'Stream API: groupingBy, collectors, parallel',
      'G1GC vs ZGC trade-offs', 'Spring IoC + Bean scopes',
      'Spring Security filter chain + JWT', 'JPA N+1 problem + fetch strategies',
      'Microservices: Circuit Breaker, Saga pattern', 'REST vs gRPC',
    ],
    resources: [
      { name: 'Effective Java (Bloch)', url: 'https://www.oreilly.com/library/view/effective-java/9780134686097/', type: 'book', note: 'Essential. Read items 1-20 for interviews.' },
      { name: 'Java Concurrency in Practice', url: 'https://jcip.net/', type: 'book', note: 'Goetz et al. — concurrency bible for Java' },
      { name: 'Spring Framework Docs', url: 'https://docs.spring.io/spring-framework/reference/', type: 'free', note: 'Official docs — always most accurate' },
      { name: 'Baeldung', url: 'https://www.baeldung.com/', type: 'free', note: 'Best practical Java/Spring articles on the internet' },
      { name: 'Jenkov Java Tutorials', url: 'https://jenkov.com/tutorials/java/index.html', type: 'free', note: 'Deep dives on concurrency and NIO' },
      { name: 'JVM Internals (javarevisited)', url: 'https://javarevisited.blogspot.com/', type: 'free', note: 'Good Java interview-focused articles' },
      { name: 'ByteByteGo Java Interview Guide', url: 'https://blog.bytebytego.com/p/java-interview-guide', type: 'free', note: 'Modern Java interview questions with visual explanations' },
      { name: 'Spring Boot in Action', url: 'https://www.manning.com/books/spring-boot-in-action', type: 'book', note: 'Best intro to Spring Boot for practical use' },
    ],
  },
  {
    key: 'react', label: 'React + Next.js', icon: '⚛️', color: '#00ffd0',
    tagline: 'Hooks, performance, rendering strategies',
    timeEstimate: '1.5h/day', weekRange: 'Weeks 19–32',
    mustKnow: [
      'useEffect: deps, cleanup, stale closures', 'useMemo vs useCallback: when each helps',
      'useReducer for complex state', 'Context vs Zustand: performance tradeoffs',
      'React Fiber + concurrent mode', 'Reconciliation + keys',
      'Next.js App Router: Server vs Client Components', 'SSG vs SSR vs ISR vs CSR',
      'Code splitting with lazy/Suspense', 'React.memo + shallow comparison',
      'Custom hooks for data fetching', 'Compound component pattern',
    ],
    resources: [
      { name: 'React Docs (react.dev)', url: 'https://react.dev/', type: 'free', note: 'Official docs — completely rewritten in 2023, excellent' },
      { name: 'Next.js Docs', url: 'https://nextjs.org/docs', type: 'free', note: 'App Router docs — the source of truth' },
      { name: 'Josh W Comeau Blog', url: 'https://www.joshwcomeau.com/', type: 'free', note: 'Best React/CSS articles — visual and deep' },
      { name: 'TkDodo\'s Blog (TanStack)', url: 'https://tkdodo.eu/blog/', type: 'free', note: 'Best React Query and practical React patterns blog' },
      { name: 'Epic React (Kent C. Dodds)', url: 'https://epicreact.dev/', type: 'paid', note: 'Most comprehensive React course — deep hooks coverage' },
      { name: 'Patterns.dev', url: 'https://www.patterns.dev/', type: 'free', note: 'Free book on React patterns, performance, rendering' },
      { name: 'React TypeScript Cheatsheet', url: 'https://react-typescript-cheatsheet.netlify.app/', type: 'free', note: 'Essential reference for React + TypeScript' },
      { name: 'Next.js Learn Course', url: 'https://nextjs.org/learn', type: 'free', note: 'Official interactive Next.js course — start here' },
    ],
  },
  {
    key: 'node', label: 'Node.js + Express', icon: '🟢', color: '#00ff94',
    tagline: 'Event loop internals + scalable API design',
    timeEstimate: '1h/day', weekRange: 'Weeks 21–32',
    mustKnow: [
      'Event loop 6 phases in order', 'nextTick vs Promise vs setImmediate priority',
      'Streams: backpressure, pipeline, Transform', 'Cluster vs Worker Threads',
      'Express middleware chain + error handling', 'async/await error propagation',
      'Memory leaks: closures, event emitters, globals', 'Security: helmet, rate-limiting, sanitization',
      'REST API: versioning, pagination, idempotency', 'WebSockets: ws library + Socket.io',
    ],
    resources: [
      { name: 'Node.js Docs (nodejs.org)', url: 'https://nodejs.org/en/docs/', type: 'free', note: 'Official docs — especially Event Loop and Streams guides' },
      { name: 'Node.js Design Patterns (Casciaro)', url: 'https://www.nodejsdesignpatterns.com/', type: 'book', note: 'Best Node.js book — patterns and best practices' },
      { name: 'Node.js Best Practices (GitHub)', url: 'https://github.com/goldbergyoni/nodebestpractices', type: 'free', note: '90+ Node.js best practices — star this repo' },
      { name: 'Clinic.js', url: 'https://clinicjs.org/', type: 'free', note: 'Profiling tool for Node.js performance issues' },
      { name: 'The Art of Node', url: 'https://github.com/maxogden/art-of-node', type: 'free', note: 'Excellent free introduction to Node.js concepts' },
      { name: 'Express.js Docs', url: 'https://expressjs.com/', type: 'free', note: 'Official Express docs — minimal but complete' },
      { name: 'Hapi.js vs Fastify vs Express Comparison', url: 'https://fastify.dev/benchmarks/', type: 'free', note: 'Understand framework trade-offs' },
    ],
  },
  {
    key: 'beh', label: 'Behavioral', icon: '🎭', color: '#ff00aa',
    tagline: 'Stories over theory — 10 polished STAR stories minimum',
    timeEstimate: '30min/day', weekRange: 'Weeks 30–48',
    mustKnow: [
      'STAR method: Situation, Task, Action, Result', '10+ prepared stories covering all LP dimensions',
      'Amazon 16 Leadership Principles mapping', 'Conflict resolution: data over opinions',
      'Failure stories: own it, show learning', 'Impact quantification: metrics, numbers',
      'Growth mindset signals', 'Influence without authority examples',
    ],
    resources: [
      { name: 'Amazon Leadership Principles', url: 'https://www.amazon.jobs/content/en/our-workplace/leadership-principles', type: 'free', note: 'Memorise all 16 LPs + prepare 1 story per principle' },
      { name: 'Grokking Behavioral Interview', url: 'https://designgurus.io/course/grokking-the-behavioral-interview', type: 'paid', note: 'Structured behavioral course with STAR templates' },
      { name: 'Exponent Behavioral', url: 'https://www.tryexponent.com/courses/behavioral-interview', type: 'paid', note: 'Video examples of real behavioral interviews' },
      { name: 'The Holloway Guide', url: 'https://www.holloway.com/g/technical-recruiting-hiring', type: 'free', note: 'Understanding how interviewers score behavioral rounds' },
      { name: 'Lenny\'s Newsletter: STAR', url: 'https://www.lennysnewsletter.com/p/the-star-method', type: 'free', note: 'Practical STAR method guide with examples' },
    ],
  },
  {
    key: 'aiml', label: 'AI / ML + Agents', icon: '🤖', color: '#7c3aed',
    tagline: 'LLM internals, RAG, and agent architecture',
    timeEstimate: '1h/day', weekRange: 'Weeks 33–42',
    mustKnow: [
      'Transformer self-attention mechanism', 'Pre-training → SFT → RLHF/DPO pipeline',
      'RAG architecture: chunking, embedding, retrieval', 'Vector databases: ANN, HNSW',
      'Agent patterns: ReAct, tool-calling, memory', 'Fine-tuning vs RAG trade-offs',
      'Bias-variance tradeoff', 'Precision vs Recall use cases',
      'ML system design: feature store, monitoring, A/B testing',
    ],
    resources: [
      { name: 'Andrej Karpathy: Neural Networks (YouTube)', url: 'https://www.youtube.com/@AndrejKarpathy', type: 'video', note: 'Best LLM fundamentals course on the internet. Free.' },
      { name: 'fast.ai Practical Deep Learning', url: 'https://fast.ai/', type: 'free', note: 'Top-down practical ML/DL course. Excellent.' },
      { name: 'Hugging Face NLP Course', url: 'https://huggingface.co/learn/nlp-course', type: 'free', note: 'Best free Transformers + NLP course' },
      { name: 'LangChain Docs', url: 'https://python.langchain.com/docs/get_started/introduction', type: 'free', note: 'Agent/RAG framework documentation' },
      { name: 'Chip Huyen: Designing ML Systems', url: 'https://www.oreilly.com/library/view/designing-machine-learning/9781098107956/', type: 'book', note: 'Best ML production systems book' },
      { name: 'RAGAS Framework', url: 'https://docs.ragas.io/', type: 'free', note: 'RAG evaluation framework — know this for interviews' },
      { name: 'AI Safety Fundamentals', url: 'https://aisafetyfundamentals.com/', type: 'free', note: 'Important for Meta/Google/Anthropic interviews' },
    ],
  },
  {
    key: 'cloud', label: 'Cloud + DevOps', icon: '☁️', color: '#0891b2',
    tagline: 'AWS core + Kubernetes + CI/CD + Observability',
    timeEstimate: '1h/day', weekRange: 'Weeks 35–44',
    mustKnow: [
      'EC2 vs Lambda vs ECS vs EKS decision matrix', 'S3 storage classes + lifecycle policies',
      'VPC: subnets, security groups, NACLs, NAT', 'RDS Multi-AZ vs Read Replicas',
      'Kubernetes: Pod/Deployment/StatefulSet/DaemonSet', 'K8s HPA + resource requests/limits',
      'CI/CD: blue-green vs canary vs feature flags', 'GitOps: ArgoCD + Flux',
      'SLI/SLO/SLA + error budgets', 'OpenTelemetry: logs/metrics/traces',
      'Docker multi-stage builds, non-root user', 'Terraform state management',
    ],
    resources: [
      { name: 'AWS Free Tier + Official Docs', url: 'https://docs.aws.amazon.com/', type: 'free', note: 'Hands-on > theory. Build things in free tier.' },
      { name: 'AWS Certified Solutions Architect (A Cloud Guru)', url: 'https://acloudguru.com/', type: 'paid', note: 'Best AWS course — even if you don\'t take the exam' },
      { name: 'Kubernetes Docs', url: 'https://kubernetes.io/docs/home/', type: 'free', note: 'Concepts section first. Then tasks.' },
      { name: 'Kubernetes The Hard Way', url: 'https://github.com/kelseyhightower/kubernetes-the-hard-way', type: 'free', note: 'Build K8s from scratch — deep understanding' },
      { name: 'Google SRE Book', url: 'https://sre.google/sre-book/table-of-contents/', type: 'free', note: 'Free online. SLO/error budget bible.' },
      { name: 'The DevOps Handbook', url: 'https://itrevolution.com/product/the-devops-handbook/', type: 'book', note: 'Culture + practices of DevOps transformation' },
      { name: 'CloudNative.tv YouTube', url: 'https://www.youtube.com/@CloudNativeTV', type: 'video', note: 'K8s, cloud-native, CNCF project tutorials' },
      { name: 'Terraform Learn', url: 'https://developer.hashicorp.com/terraform/tutorials', type: 'free', note: 'Official Terraform tutorials — hands-on IaC' },
    ],
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// DAILY PLANS — ALL 48 WEEKS ACROSS ALL MODULES
// ─────────────────────────────────────────────────────────────────────────────
type DPlanMap = Record<string, ModulePlan>;

export const DAILY_PLANS: DPlanMap = {

  // ══════════════════════════════════════════════════════════════════════════
  // DSA — 24 weeks (Weeks 1–24)
  // ══════════════════════════════════════════════════════════════════════════
  dsa: { weeks: [
    { week:1, label:'Big-O + Arrays', daily:[
      { day:'Mon', type:'theory', hours:2, task:'Big-O: time & space for every array operation. Master the cheat sheet. Analyse 5 code snippets for complexity.' },
      { day:'Tue', type:'practice', hours:2, task:'LeetCode: Two Sum (#1), Contains Duplicate (#217), Valid Anagram (#242). Brute force first, then optimise.' },
      { day:'Wed', type:'theory', hours:2, task:'Arrays deep dive: prefix sums, Kadane\'s algorithm (max subarray), in-place operations pattern.' },
      { day:'Thu', type:'practice', hours:2, task:'LeetCode: Best Time to Buy/Sell Stock (#121), Maximum Subarray (#53), Product of Array Except Self (#238).' },
      { day:'Fri', type:'theory', hours:1.5, task:'Strings: reversal, palindrome check, anagram detection, character frequency maps with examples.' },
      { day:'Sat', type:'practice', hours:3, task:'LeetCode: Valid Palindrome (#125), Longest Substring Without Repeating Characters (#3), Group Anagrams (#49).' },
      { day:'Sun', type:'review', hours:1, task:'Rewrite all 6 solutions from scratch. Write Big-O for each. Verify edge cases.' },
    ]},
    { week:2, label:'HashMaps + Two Pointers', daily:[
      { day:'Mon', type:'theory', hours:2, task:'HashMaps & Sets: frequency counting, grouping, complement lookup. How hash collisions work internally.' },
      { day:'Tue', type:'practice', hours:2, task:'LeetCode: Top K Frequent Elements (#347), Encode and Decode Strings (#271), Two Sum (hash map version).' },
      { day:'Wed', type:'theory', hours:1.5, task:'Two Pointers: when to use (sorted array, pair search). Left-right pointers vs slow-fast pointers.' },
      { day:'Thu', type:'practice', hours:2, task:'LeetCode: 3Sum (#15), Container With Most Water (#11), Trapping Rain Water (#42).' },
      { day:'Fri', type:'theory', hours:1.5, task:'Sliding Window: fixed-size vs variable-size. Template: expand right, shrink left. Identify window invariant.' },
      { day:'Sat', type:'practice', hours:3, task:'LeetCode: Minimum Window Substring (#76), Sliding Window Maximum (#239), Longest Repeating Char Replacement (#424).' },
      { day:'Sun', type:'review', hours:1, task:'Draw pointer movement diagrams for 3 Two Pointer problems. Explain sliding window invariant out loud.' },
    ]},
    { week:3, label:'Binary Search', daily:[
      { day:'Mon', type:'theory', hours:2, task:'Binary Search: the lo/hi/mid template. Left boundary vs right boundary search. Always verify termination.' },
      { day:'Tue', type:'practice', hours:2, task:'LeetCode: Binary Search (#704), Search a 2D Matrix (#74), Koko Eating Bananas (#875).' },
      { day:'Wed', type:'theory', hours:1.5, task:'Binary Search on answer space: min/max problems. Rotated arrays, peak finding.' },
      { day:'Thu', type:'practice', hours:2, task:'LeetCode: Find Min in Rotated Sorted Array (#153), Search in Rotated Sorted Array (#33), Time Based Key-Value (#981).' },
      { day:'Fri', type:'theory', hours:1, task:'Median of two sorted arrays concept. Binary search on floating point. Real-world examples.' },
      { day:'Sat', type:'practice', hours:3, task:'LeetCode: Median of Two Sorted Arrays (#4), Split Array Largest Sum (#410), Capacity to Ship Packages (#1011).' },
      { day:'Sun', type:'review', hours:1, task:'Implement binary search 3 ways (iterative, left-boundary, right-boundary) from memory. Verify edge cases.' },
    ]},
    { week:4, label:'Linked Lists', daily:[
      { day:'Mon', type:'theory', hours:1.5, task:'Linked List: node structure, traversal, insertion, deletion. Dummy head trick. Why O(n) access matters.' },
      { day:'Tue', type:'practice', hours:2, task:'LeetCode: Reverse Linked List (#206), Merge Two Sorted Lists (#21), Linked List Cycle (#141).' },
      { day:'Wed', type:'theory', hours:1.5, task:'Floyd\'s cycle detection: slow/fast pointer. Find middle. Why 2x speed works.' },
      { day:'Thu', type:'practice', hours:2, task:'LeetCode: Reorder List (#143), Remove Nth Node From End (#19), Copy List With Random Pointer (#138).' },
      { day:'Fri', type:'theory', hours:1.5, task:'Doubly linked lists, LRU cache structure. Merge sort on linked list approach.' },
      { day:'Sat', type:'practice', hours:3, task:'LeetCode: LRU Cache (#146), Merge K Sorted Lists (#23), Reverse Nodes in K-Group (#25).' },
      { day:'Sun', type:'review', hours:1, task:'Implement singly linked list from scratch: insert head/tail, delete, reverse, detect cycle.' },
    ]},
    { week:5, label:'Stacks + Monotonic Stack', daily:[
      { day:'Mon', type:'theory', hours:1.5, task:'Stack: LIFO, call stack model, when to use. Balanced brackets pattern. Implement with array.' },
      { day:'Tue', type:'practice', hours:2, task:'LeetCode: Valid Parentheses (#20), Min Stack (#155), Evaluate Reverse Polish Notation (#150).' },
      { day:'Wed', type:'theory', hours:1.5, task:'Monotonic stack: maintain increasing or decreasing order. Next Greater Element pattern.' },
      { day:'Thu', type:'practice', hours:2, task:'LeetCode: Daily Temperatures (#739), Car Fleet (#853), Largest Rectangle in Histogram (#84).' },
      { day:'Fri', type:'theory', hours:1.5, task:'Queues: FIFO, deque (double-ended). Sliding window maximum uses monotonic deque.' },
      { day:'Sat', type:'practice', hours:3, task:'LeetCode: Generate Parentheses (#22), Asteroid Collision (#735), Sliding Window Maximum (#239).' },
      { day:'Sun', type:'review', hours:1, task:'Draw monotonic stack state for Daily Temperatures([73,74,75,71,69,72,76,73]). Trace each step.' },
    ]},
    { week:6, label:'Recursion + Sorting', daily:[
      { day:'Mon', type:'theory', hours:2, task:'Recursion: call stack model, base case, recursive case. Tree recursion shape. Tail recursion.' },
      { day:'Tue', type:'practice', hours:2, task:'LeetCode: Climbing Stairs (#70), House Robber (#198), Fibonacci with memoisation (#509).' },
      { day:'Wed', type:'theory', hours:2, task:'Merge Sort: divide & conquer, merge step, O(n log n) guaranteed. Implement completely from scratch.' },
      { day:'Thu', type:'practice', hours:2, task:'Sort an Array (#912). Implement for custom objects. Trace merge sort on [5,2,4,6,1,3].' },
      { day:'Fri', type:'theory', hours:2, task:'QuickSort: partition (Lomuto vs Hoare), pivot choice, O(n log n) average O(n²) worst. In-place.' },
      { day:'Sat', type:'practice', hours:3, task:'Implement QuickSort from scratch. Sort Colors (#75 — Dutch National Flag), Kth Largest Element (#215).' },
      { day:'Sun', type:'review', hours:1, task:'Write Big-O table: Merge/Quick/Heap/Counting/Radix sort — best/avg/worst, stable?, space.' },
    ]},
    { week:7, label:'Trees: BFS + DFS', daily:[
      { day:'Mon', type:'theory', hours:2, task:'Binary Tree: node structure, height, depth, balanced. BFS with queue: level-order traversal.' },
      { day:'Tue', type:'practice', hours:2, task:'LeetCode: Invert Binary Tree (#226), Maximum Depth (#104), Same Tree (#100), Subtree of Another Tree (#572).' },
      { day:'Wed', type:'theory', hours:2, task:'Tree DFS: preorder (root-left-right), inorder (left-root-right), postorder (left-right-root). Iterative versions.' },
      { day:'Thu', type:'practice', hours:2, task:'LeetCode: Binary Tree Level Order Traversal (#102), Right Side View (#199), Diameter of Binary Tree (#543).' },
      { day:'Fri', type:'theory', hours:1.5, task:'BST: insert, delete (3 cases), validate (range approach), inorder = sorted, LCA.' },
      { day:'Sat', type:'practice', hours:3, task:'LeetCode: Validate BST (#98), LCA of BST (#235), Kth Smallest in BST (#230), BST Insert/Delete (#701).' },
      { day:'Sun', type:'review', hours:1, task:'Implement BFS level-order iteratively. Draw a BST and show inorder = sorted output.' },
    ]},
    { week:8, label:'Heaps + Tries', daily:[
      { day:'Mon', type:'theory', hours:2, task:'Heap: min-heap, max-heap, heapify up/down. Array representation. Python heapq, Java PriorityQueue API.' },
      { day:'Tue', type:'practice', hours:2, task:'LeetCode: Kth Largest Element in Array (#215), Last Stone Weight (#1046), K Closest Points (#973).' },
      { day:'Wed', type:'theory', hours:1.5, task:'Top-K pattern with heap. Two-heap approach for dynamic median. Merge K sorted lists strategy.' },
      { day:'Thu', type:'practice', hours:2, task:'LeetCode: Find Median from Data Stream (#295), Task Scheduler (#621), Design Twitter (#355).' },
      { day:'Fri', type:'theory', hours:1.5, task:'Tries (Prefix Trees): insert, search, startsWith. Use cases vs HashMap. Time/space trade-off.' },
      { day:'Sat', type:'practice', hours:3, task:'LeetCode: Implement Trie (#208), Design Add and Search Words (#211), Word Search II (#212).' },
      { day:'Sun', type:'review', hours:1, task:'Implement min-heap from scratch: insert (heapify up), extract-min (heapify down). Test on [3,1,4,1,5,9].' },
    ]},
    { week:9, label:'Graphs: BFS + DFS', daily:[
      { day:'Mon', type:'theory', hours:2, task:'Graph representations: adjacency list vs matrix. BFS: shortest path in unweighted graph. Visited array.' },
      { day:'Tue', type:'practice', hours:2, task:'LeetCode: Number of Islands (#200), Clone Graph (#133), Max Area of Island (#695).' },
      { day:'Wed', type:'theory', hours:2, task:'Graph DFS: connected components, cycle detection, path finding. BFS vs DFS: when to choose each.' },
      { day:'Thu', type:'practice', hours:2, task:'LeetCode: Pacific Atlantic Water Flow (#417), Surrounded Regions (#130), Rotting Oranges (#994).' },
      { day:'Fri', type:'theory', hours:1.5, task:'Topological Sort: Kahn\'s (BFS + indegree) and DFS-based (coloring: white/gray/black).' },
      { day:'Sat', type:'practice', hours:3, task:'LeetCode: Course Schedule (#207), Course Schedule II (#210), Alien Dictionary (#269).' },
      { day:'Sun', type:'review', hours:1, task:'Draw 6-node graph as adjacency list. Trace BFS (level by level) and DFS (recursion tree) manually.' },
    ]},
    { week:10, label:'Union-Find + Advanced Graphs', daily:[
      { day:'Mon', type:'theory', hours:2, task:'Union-Find: quick-find, quick-union, path compression, union by rank. O(α(n)) amortized.' },
      { day:'Tue', type:'practice', hours:2, task:'LeetCode: Number of Connected Components (#323), Redundant Connection (#684), Graph Valid Tree (#261).' },
      { day:'Wed', type:'theory', hours:2, task:'Dijkstra: shortest path in weighted graph. Priority queue implementation. Why BFS doesn\'t work here.' },
      { day:'Thu', type:'practice', hours:2, task:'LeetCode: Network Delay Time (#743), Cheapest Flights Within K Stops (#787), Path With Min Effort (#1631).' },
      { day:'Fri', type:'theory', hours:1.5, task:'Bellman-Ford (negative weights). Prim\'s MST, Kruskal\'s MST. Floyd-Warshall overview.' },
      { day:'Sat', type:'practice', hours:3, task:'LeetCode: Min Cost to Connect All Points (#1584), Swim in Rising Water (#778), Find Critical Connections (#1192).' },
      { day:'Sun', type:'review', hours:1, task:'Implement Union-Find with path compression from scratch. Trace Dijkstra on 5-node weighted graph.' },
    ]},
    { week:11, label:'DP Foundations', daily:[
      { day:'Mon', type:'theory', hours:2, task:'DP mindset: overlapping subproblems + optimal substructure. Fibonacci → Climbing Stairs → House Robber progression.' },
      { day:'Tue', type:'practice', hours:2, task:'LeetCode: Climbing Stairs (#70), House Robber (#198), House Robber II (#213) — top-down AND bottom-up both.' },
      { day:'Wed', type:'theory', hours:2, task:'DP patterns: unbounded knapsack (coin change), decision per step, minimum cost paths.' },
      { day:'Thu', type:'practice', hours:2, task:'LeetCode: Coin Change (#322), Min Cost Climbing Stairs (#746), Jump Game (#55), Jump Game II (#45).' },
      { day:'Fri', type:'theory', hours:1.5, task:'Memoisation vs tabulation: implement both for Coin Change. Space optimisation (1D array trick).' },
      { day:'Sat', type:'practice', hours:3, task:'LeetCode: Word Break (#139), Decode Ways (#91), Unique Paths (#62), Combination Sum IV (#377).' },
      { day:'Sun', type:'review', hours:1, task:'Draw DP table for Coin Change(amount=11, coins=[1,5,6]). Explain why greedy fails here.' },
    ]},
    { week:12, label:'DP: Sequences + 2D', daily:[
      { day:'Mon', type:'theory', hours:2, task:'2D DP: LCS (Longest Common Subsequence) — define subproblem, recurrence, table fill order.' },
      { day:'Tue', type:'practice', hours:2, task:'LeetCode: Longest Common Subsequence (#1143), Edit Distance (#72), Distinct Subsequences (#115).' },
      { day:'Wed', type:'theory', hours:2, task:'Knapsack variants: 0/1 knapsack, bounded, unbounded. Partition equal subset recognition.' },
      { day:'Thu', type:'practice', hours:2, task:'LeetCode: Partition Equal Subset Sum (#416), Target Sum (#494), Last Stone Weight II (#1049).' },
      { day:'Fri', type:'theory', hours:1.5, task:'LIS: O(n²) DP vs O(n log n) with patience sorting. Russian Doll Envelopes.' },
      { day:'Sat', type:'practice', hours:3, task:'LeetCode: Longest Increasing Subsequence (#300), Number of LIS (#673), Russian Doll Envelopes (#354).' },
      { day:'Sun', type:'review', hours:1, task:'Trace LCS table for \'ABCBDAB\' vs \'BDCAB\'. Backtrack to recover the actual subsequence.' },
    ]},
    { week:13, label:'Greedy + Intervals', daily:[
      { day:'Mon', type:'theory', hours:2, task:'Greedy strategy: prove local optimal → global optimal. Counter-examples where greedy fails.' },
      { day:'Tue', type:'practice', hours:2, task:'LeetCode: Jump Game (#55), Jump Game II (#45), Gas Station (#134), Hand of Straights (#846).' },
      { day:'Wed', type:'theory', hours:1.5, task:'Intervals: sort by start, merge overlapping, sweep line technique. Meeting Rooms pattern.' },
      { day:'Thu', type:'practice', hours:2, task:'LeetCode: Merge Intervals (#56), Insert Interval (#57), Non-Overlapping Intervals (#435), Meeting Rooms II (#253).' },
      { day:'Fri', type:'theory', hours:1.5, task:'Greedy on strings: remove duplicates, reorganize string, task scheduling intuition.' },
      { day:'Sat', type:'practice', hours:3, task:'LeetCode: Task Scheduler (#621), Reorganize String (#767), Partition Labels (#763), Min Arrows (#452).' },
      { day:'Sun', type:'review', hours:1, task:'Explain WHY greedy works for Jump Game II but NOT always. Write 2 counter-examples.' },
    ]},
    { week:14, label:'Backtracking', daily:[
      { day:'Mon', type:'theory', hours:2, task:'Backtracking template: choose → explore → unchoose. Decision tree visualisation. Base case identification.' },
      { day:'Tue', type:'practice', hours:2, task:'LeetCode: Subsets (#78), Subsets II (#90), Combination Sum (#39), Combination Sum II (#40).' },
      { day:'Wed', type:'theory', hours:2, task:'Permutations with/without duplicates. N-Queens: constraint propagation and pruning strategy.' },
      { day:'Thu', type:'practice', hours:2, task:'LeetCode: Permutations (#46), Permutations II (#47), N-Queens (#51), N-Queens II (#52).' },
      { day:'Fri', type:'theory', hours:1.5, task:'Backtracking on grids: Word Search path. Sudoku: row/col/box constraint sets.' },
      { day:'Sat', type:'practice', hours:3, task:'LeetCode: Word Search (#79), Sudoku Solver (#37), Generate Parentheses (#22), Letter Combinations (#17).' },
      { day:'Sun', type:'review', hours:1, task:'Draw decision tree for Subsets([1,2,3]). Count nodes pruned in N-Queens for n=4 vs n=5.' },
    ]},
    { week:15, label:'Bit Manipulation + Math', daily:[
      { day:'Mon', type:'theory', hours:1.5, task:'Bit ops: AND, OR, XOR, NOT, shifts. XOR properties: a^a=0, a^0=a. Bit masking patterns.' },
      { day:'Tue', type:'practice', hours:2, task:'LeetCode: Single Number (#136), Number of 1 Bits (#191), Counting Bits (#338), Missing Number (#268).' },
      { day:'Wed', type:'theory', hours:1.5, task:'Subset enumeration with bits. Power of 2 check. Two\'s complement for negatives.' },
      { day:'Thu', type:'practice', hours:2, task:'LeetCode: Sum of Two Integers (#371), Reverse Bits (#190), Maximum XOR of Two Numbers (#421).' },
      { day:'Fri', type:'theory', hours:1.5, task:'Math: fast power (exponentiation by squaring), GCD (Euclidean), prime sieve, modular arithmetic.' },
      { day:'Sat', type:'practice', hours:2.5, task:'LeetCode: Pow(x,n) (#50), Sqrt(x) (#69), Happy Number (#202), Multiply Strings (#43).' },
      { day:'Sun', type:'review', hours:1, task:'Verify XOR trick for missing number. Write subset enumeration for n=3 using bits (000 to 111).' },
    ]},
    { week:16, label:'Advanced Patterns: Prefix Sum + Multi-source BFS', daily:[
      { day:'Mon', type:'theory', hours:1.5, task:'Monotonic queue applications: sliding window max/min, next greater/smaller element variants.' },
      { day:'Tue', type:'practice', hours:2, task:'LeetCode: Trapping Rain Water (#42 — stack approach), Sum of Subarray Minimums (#907), Remove Duplicate Letters (#316).' },
      { day:'Wed', type:'theory', hours:1.5, task:'Prefix sum + hash map combo: subarray sum equals k, contiguous array, find pivot.' },
      { day:'Thu', type:'practice', hours:2, task:'LeetCode: Subarray Sum Equals K (#560), Contiguous Array (#525), Count of Range Sum (#327).' },
      { day:'Fri', type:'theory', hours:1.5, task:'Multi-source BFS: rotting oranges, walls and gates, 01-matrix. Simultaneously expand from all sources.' },
      { day:'Sat', type:'practice', hours:2.5, task:'LeetCode: 01 Matrix (#542), Walls and Gates (#286), Shortest Path in Binary Matrix (#1091).' },
      { day:'Sun', type:'review', hours:1, task:'Which pattern fits: \'nearest 0\', \'K nearest points\', \'subarray sum\'? Explain reasoning for each.' },
    ]},
    { week:17, label:'String Algorithms', daily:[
      { day:'Mon', type:'theory', hours:2, task:'KMP algorithm: failure function (partial match table), O(n+m) string matching. When to use.' },
      { day:'Tue', type:'practice', hours:2, task:'LeetCode: Implement strStr (#28), Repeated Substring Pattern (#459), Shortest Palindrome (#214).' },
      { day:'Wed', type:'theory', hours:1.5, task:'Rolling hash (Rabin-Karp): polynomial hash, collision handling. Use case: repeated DNA sequences.' },
      { day:'Thu', type:'practice', hours:2, task:'LeetCode: Repeated DNA Sequences (#187), Find All Anagrams in String (#438), Longest Duplicate Substring (#1044).' },
      { day:'Fri', type:'theory', hours:1.5, task:'Manacher\'s algorithm for longest palindromic substring in O(n). Palindrome DP approach.' },
      { day:'Sat', type:'practice', hours:3, task:'LeetCode: Longest Palindromic Substring (#5), Palindromic Substrings (#647), Palindrome Pairs (#336).' },
      { day:'Sun', type:'review', hours:1, task:'Trace KMP on text=\'AABAABAAA\' pattern=\'AABAAA\'. Build failure table step by step.' },
    ]},
    { week:18, label:'Hard Problems Strategy + Segment Trees', daily:[
      { day:'Mon', type:'theory', hours:2, task:'Hard = two Medium patterns combined. Strategy: identify 2 sub-problems, solve each, compose.' },
      { day:'Tue', type:'practice', hours:2, task:'LeetCode: 1 Hard problem untimed. Identify patterns used. Compare to editorial after solving.' },
      { day:'Wed', type:'theory', hours:1.5, task:'Time-space tradeoffs. Offline vs online algorithms. Amortized analysis examples.' },
      { day:'Thu', type:'practice', hours:2, task:'LeetCode: Median of Data Stream (#295), Serialize/Deserialize BT (#297), Word Ladder II (#126).' },
      { day:'Fri', type:'theory', hours:2, task:'Segment trees (range sum, range min): build, query, update. Fenwick tree (BIT) comparison.' },
      { day:'Sat', type:'practice', hours:3, task:'LeetCode: Range Sum Query Mutable (#307), Count of Smaller Numbers (#315), Queue Reconstruction (#406).' },
      { day:'Sun', type:'review', hours:1, task:'Pick your 3 hardest solved problems. Re-explain each approach in 2 mins without looking at code.' },
    ]},
    { week:19, label:'Company Pattern Drilling', daily:[
      { day:'Mon', type:'practice', hours:2, task:'Google tag (LeetCode): 3 Medium problems. Google loves graph + DP + string problems.' },
      { day:'Tue', type:'practice', hours:2, task:'Amazon tag: 3 Medium problems. Amazon loves trees, arrays, DP. Check Leadership Principles too.' },
      { day:'Wed', type:'practice', hours:2, task:'Meta tag: 3 Medium problems. Meta loves graph traversal + arrays + strings.' },
      { day:'Thu', type:'practice', hours:2, task:'Microsoft tag: 3 Medium problems. Microsoft loves trees, strings, matrix problems.' },
      { day:'Fri', type:'theory', hours:2, task:'Review: identify patterns you still miss under pressure. Write a \'pattern signal\' cheatsheet.' },
      { day:'Sat', type:'practice', hours:3, task:'Full timed mock: 2 Medium + 1 Hard in 75 min. Score: approach/code/complexity/edge cases.' },
      { day:'Sun', type:'review', hours:1, task:'Update your weak-pattern list. Which patterns still feel non-automatic? Prioritise next week.' },
    ]},
    { week:20, label:'Mock Interview Sprint I', daily:[
      { day:'Mon', type:'practice', hours:2, task:'Mock interview simulation: 2 problems, 45 min, talk out loud, write approach on paper first.' },
      { day:'Tue', type:'practice', hours:2, task:'Apple tag: 3 Medium problems. Time yourself strictly: 20 min per problem max.' },
      { day:'Wed', type:'review', hours:2, task:'Re-do 3 problems from recent mocks that you struggled with. Fix root cause, not just solution.' },
      { day:'Thu', type:'practice', hours:2, task:'Uber/Lyft tag: 3 Medium. Focus on clearly explaining time/space complexity after each.' },
      { day:'Fri', type:'practice', hours:1.5, task:'1 Hard problem: 45 min. If stuck at 25 min: write what you know, look at category hint, continue.' },
      { day:'Sat', type:'practice', hours:3, task:'Pair mock with friend or Pramp.com session. 2 full rounds each. Give structured feedback.' },
      { day:'Sun', type:'review', hours:1, task:'Rank your confidence in each major pattern (1-5). Focus next week on anything below 3.' },
    ]},
    { week:21, label:'Mock Interview Sprint II', daily:[
      { day:'Mon', type:'practice', hours:2, task:'Full mock simulation with timer: 35 min per problem. Debrief after each: what went right/wrong.' },
      { day:'Tue', type:'practice', hours:2, task:'Blind 75: audit which you haven\'t solved. Do 5 you\'ve avoided.' },
      { day:'Wed', type:'practice', hours:2, task:'Company-specific: 5 problems tagged to your #1 target company.' },
      { day:'Thu', type:'review', hours:1.5, task:'Write STAR stories for 3 technical situations: tough bug, performance optimization, architecture decision.' },
      { day:'Fri', type:'practice', hours:3, task:'3 Hard problems: 40 min each. Focus on recognising the sub-patterns immediately.' },
      { day:'Sat', type:'practice', hours:4, task:'Full day mock sprint: 4 problems, 45 min each. Focus on communication, edge cases, complexity.' },
      { day:'Sun', type:'review', hours:1, task:'Write 15 most important DSA patterns + 1-line recognition signal for each. This is your cheatsheet.' },
    ]},
    { week:22, label:'Final Polish', daily:[
      { day:'Mon', type:'practice', hours:2, task:'Top 20 most-asked questions across FAANG. Solve any you haven\'t done. Target under 20 min each.' },
      { day:'Tue', type:'practice', hours:2, task:'10 problems you feel least confident on. Re-solve each from scratch. Target under 25 min.' },
      { day:'Wed', type:'review', hours:2, task:'Behavioural prep: 5 STAR stories covering: failure, leadership, conflict, innovation, impact.' },
      { day:'Thu', type:'practice', hours:2, task:'Full timed mock: 2 Medium + 1 Hard in 60 min. Strict silence until you explain your approach.' },
      { day:'Fri', type:'practice', hours:2, task:'System design + DSA combo day: 1 SD question + 2 DSA problems.' },
      { day:'Sat', type:'practice', hours:2, task:'Final mock: invite a friend. Simulate real interview: 45 min, formal setting, no notes.' },
      { day:'Sun', type:'review', hours:1, task:'Review your journey. What patterns became second nature? Write a note to your future self.' },
    ]},
    { week:23, label:'Revision + Consolidation', daily:[
      { day:'Mon', type:'practice', hours:2, task:'Spaced repetition: re-solve 10 problems from weeks 1–5 that you haven\'t touched in 2+ weeks.' },
      { day:'Tue', type:'practice', hours:2, task:'Spaced repetition: re-solve 10 problems from weeks 6–12.' },
      { day:'Wed', type:'practice', hours:2.5, task:'Focus drill: 5 Hard problems, 30 min each. No hints allowed.' },
      { day:'Thu', type:'practice', hours:2, task:'Competitive: try 2 LeetCode contest problems (medium/hard difficulty).' },
      { day:'Fri', type:'review', hours:1.5, task:'Weak areas sprint: identify bottom 3 patterns, do 3 targeted problems for each.' },
      { day:'Sat', type:'practice', hours:3, task:'Mock + review: 1 mock session + detailed debrief.' },
      { day:'Sun', type:'review', hours:1, task:'Consolidation: update your pattern cheatsheet with any new insights from this week.' },
    ]},
    { week:24, label:'Extended Practice + Contest Prep', daily:[
      { day:'Mon', type:'practice', hours:2, task:'LeetCode Weekly Contest simulation: solve all 4 problems within 90 min window.' },
      { day:'Tue', type:'practice', hours:2, task:'Virtual contest: pick any past LeetCode contest, solve under time pressure.' },
      { day:'Wed', type:'review', hours:2, task:'Contest debrief: what did you miss? Which problems should you have solved? Root cause analysis.' },
      { day:'Thu', type:'practice', hours:2, task:'5 problems across all difficulty. Random mix — don\'t look at category tags. Test pattern recognition.' },
      { day:'Fri', type:'practice', hours:2, task:'Final 10 most common FAANG problems. Speed run each in < 15 min.' },
      { day:'Sat', type:'practice', hours:3, task:'Full final DSA mock: 3 problems, 45 min each. Record yourself. Identify communication gaps.' },
      { day:'Sun', type:'review', hours:1, task:'DSA phase complete! Write top 5 patterns you mastered + top 3 still to watch. You\'re ready.' },
    ]},
  ]},

  // ══════════════════════════════════════════════════════════════════════════
  // CS FUNDAMENTALS — 8 weeks (Weeks 3–10 parallel with DSA)
  // ══════════════════════════════════════════════════════════════════════════
  cs: { weeks: [
    { week:1, label:'Operating Systems I: Processes & Threads', daily:[
      { day:'Mon', type:'theory', hours:1.5, task:'Processes vs Threads: memory model, context switch cost, creation cost. fork() vs pthread_create().' },
      { day:'Tue', type:'theory', hours:1, task:'Process states: new, ready, running, blocked, terminated. PCB (Process Control Block) contents.' },
      { day:'Wed', type:'theory', hours:1.5, task:'Thread synchronisation: mutex, semaphore, monitor. Mutual exclusion problem: bank account example.' },
      { day:'Thu', type:'practice', hours:1, task:'Write: explain deadlock to non-engineer. Then formally: 4 Coffman conditions + prevention for each.' },
      { day:'Fri', type:'theory', hours:1, task:'CPU Scheduling: FCFS, SJF, RR (time quantum), MLFQ. How Linux CFS works (red-black tree).' },
      { day:'Sat', type:'review', hours:2, task:'Interview prep: answer "Process vs Thread vs Goroutine" under 2 minutes. Practice context switch question.' },
      { day:'Sun', type:'review', hours:0.5, task:'Flash quiz: 10 OS questions from InterviewBit. Review any you got wrong.' },
    ]},
    { week:2, label:'Operating Systems II: Memory', daily:[
      { day:'Mon', type:'theory', hours:1.5, task:'Virtual memory: paging, page tables, multi-level page tables. 4KB page size rationale.' },
      { day:'Tue', type:'theory', hours:1, task:'TLB: why it exists, hit/miss penalty. Page fault: minor vs major. Working set model.' },
      { day:'Wed', type:'theory', hours:1, task:'Memory allocation: malloc internals, fragmentation, slab allocator. Stack vs heap allocation.' },
      { day:'Thu', type:'practice', hours:1, task:'Write: walk through what happens on a page fault end-to-end. Include TLB, page table, disk I/O.' },
      { day:'Fri', type:'theory', hours:1, task:'Thrashing: cause (working set > RAM), detection, fix (reduce multiprogramming, add RAM).' },
      { day:'Sat', type:'review', hours:1.5, task:'Interview prep: "How does virtual memory work?" — answer confidently with TLB, page tables, page fault.' },
      { day:'Sun', type:'review', hours:0.5, task:'Summarise this week in 1 page of notes. Draw virtual→physical address translation diagram.' },
    ]},
    { week:3, label:'Networking I: HTTP + TCP/IP', daily:[
      { day:'Mon', type:'theory', hours:1.5, task:'URL to page: DNS resolution → TCP handshake → TLS → HTTP request → response → render. Each step.' },
      { day:'Tue', type:'theory', hours:1, task:'TCP: seq numbers, ACKs, retransmit, 3-way handshake, 4-way termination. Flow control (window).' },
      { day:'Wed', type:'theory', hours:1, task:'UDP: no handshake, no ordering, no guarantee. Why games/video/DNS use UDP.' },
      { day:'Thu', type:'theory', hours:1, task:'HTTP/1.1 vs HTTP/2 vs HTTP/3. HOL blocking in each. QUIC protocol over UDP.' },
      { day:'Fri', type:'theory', hours:1, task:'TLS handshake: certificate chain, asymmetric → symmetric key exchange, perfect forward secrecy.' },
      { day:'Sat', type:'review', hours:2, task:'Interview prep: "What happens when you type google.com" — full 3-minute answer. Time yourself.' },
      { day:'Sun', type:'review', hours:0.5, task:'Draw TCP 3-way handshake + TLS 1.3 handshake on paper from memory.' },
    ]},
    { week:4, label:'Networking II: Load Balancing + CDN', daily:[
      { day:'Mon', type:'theory', hours:1.5, task:'Load balancers: L4 vs L7, algorithms (RR, WRR, Least Connections, IP Hash, Consistent Hashing).' },
      { day:'Tue', type:'theory', hours:1, task:'CDN: PoPs, pull vs push model, cache invalidation (versioned URLs vs purge API).' },
      { day:'Wed', type:'theory', hours:1, task:'DNS: A record, CNAME, TTL, authoritative vs recursive resolver, anycast routing for CDN.' },
      { day:'Thu', type:'theory', hours:1, task:'API Gateway: auth, rate limiting, routing, transformation. Compare NGINX, Kong, AWS API GW.' },
      { day:'Fri', type:'theory', hours:1, task:'WebSockets vs SSE vs Long Polling. When to use each for real-time data.' },
      { day:'Sat', type:'review', hours:2, task:'Interview prep: "How would you design global low-latency API delivery?" — use CDN, LB, edge, caching.' },
      { day:'Sun', type:'review', hours:0.5, task:'Flash cards: CDN pull vs push, L4 vs L7 LB, DNS record types. 5 min review.' },
    ]},
    { week:5, label:'DBMS I: SQL + Indexes', daily:[
      { day:'Mon', type:'theory', hours:1.5, task:'SQL fundamentals: SELECT, JOIN (INNER/LEFT/RIGHT/FULL), GROUP BY, HAVING, subqueries.' },
      { day:'Tue', type:'practice', hours:1.5, task:'SQL practice: 2nd highest salary, customers with no orders, employees per department top-3.' },
      { day:'Wed', type:'theory', hours:1, task:'Window functions: ROW_NUMBER, RANK, DENSE_RANK, LAG, LEAD. Running totals example.' },
      { day:'Thu', type:'practice', hours:1, task:'SQL practice: write 3 window function queries. Department salary rank, cumulative revenue, MoM change.' },
      { day:'Fri', type:'theory', hours:1.5, task:'B-tree index internals: clustered vs non-clustered, covering index. When to add vs not add index.' },
      { day:'Sat', type:'review', hours:2, task:'Interview prep: "How does a database execute this query?" — explain parse/optimize/execute/cache.' },
      { day:'Sun', type:'review', hours:0.5, task:'EXPLAIN ANALYZE on 3 queries. Draw B-tree for 8 values. Review index selectivity rules.' },
    ]},
    { week:6, label:'DBMS II: Transactions + Distributed', daily:[
      { day:'Mon', type:'theory', hours:1.5, task:'ACID: Atomicity, Consistency, Isolation, Durability. Write-Ahead Log (WAL). MVCC in PostgreSQL.' },
      { day:'Tue', type:'theory', hours:1, task:'Transaction isolation levels: READ UNCOMMITTED → SERIALIZABLE. Dirty/phantom/non-repeatable reads.' },
      { day:'Wed', type:'theory', hours:1.5, task:'Distributed databases: CAP theorem, BASE, eventual consistency. CP vs AP trade-off examples.' },
      { day:'Thu', type:'theory', hours:1, task:'Sharding: range vs hash vs directory-based. Consistent hashing virtual nodes. Cross-shard transactions.' },
      { day:'Fri', type:'theory', hours:1, task:'NoSQL: MongoDB (document), Redis (KV + pub/sub), Cassandra (wide-column), Elasticsearch (search).' },
      { day:'Sat', type:'review', hours:2, task:'Interview prep: "SQL vs NoSQL — when to use each?" and "Explain ACID with a bank transfer example".' },
      { day:'Sun', type:'review', hours:0.5, task:'Draw CAP triangle with 5 DB examples placed correctly. Review when to use each NoSQL type.' },
    ]},
    { week:7, label:'CS Deep Dives + Interview Prep', daily:[
      { day:'Mon', type:'theory', hours:1.5, task:'Concurrency revisited: race conditions, locks, lock-free (CAS), ABA problem. Practical examples.' },
      { day:'Tue', type:'theory', hours:1, task:'Caching: L1/L2/L3 CPU cache, cache eviction policies, cache coherence in multi-core.' },
      { day:'Wed', type:'theory', hours:1, task:'Compiler: lexing, parsing, AST, code generation. JIT vs AOT compilation. Why JIT can beat native.' },
      { day:'Thu', type:'practice', hours:1.5, task:'Mock CS interview: answer 5 random CS fundamentals questions without notes. Record yourself.' },
      { day:'Fri', type:'review', hours:1, task:'Review weakest CS topic this week. Re-read notes, find one good article, rewrite in your words.' },
      { day:'Sat', type:'review', hours:2, task:'Full CS fundamentals revision: OS, Networking, DBMS. Aim for a 1-page summary of each.' },
      { day:'Sun', type:'review', hours:0.5, task:'Identify top 3 CS questions you still stumble on. Add them to your revision queue.' },
    ]},
    { week:8, label:'CS Final Review + Integration', daily:[
      { day:'Mon', type:'review', hours:1.5, task:'Integration: how does a web request involve OS, Networking, and DB simultaneously? Draw end-to-end.' },
      { day:'Tue', type:'practice', hours:1, task:'10 mixed CS interview questions under time pressure (2 min each). Score yourself.' },
      { day:'Wed', type:'review', hours:1, task:'Concurrency: mutex vs semaphore vs spinlock — final answers for each. No notes.' },
      { day:'Thu', type:'practice', hours:1, task:'SQL challenge: write a complex query (pagination + ranking + filtering) from memory.' },
      { day:'Fri', type:'review', hours:1, task:'CAP + ACID: explain each to a rubber duck. Record the 2-minute version.' },
      { day:'Sat', type:'review', hours:2, task:'Comprehensive CS mock: 15 questions, mix of OS/Network/DB. Grade harshly.' },
      { day:'Sun', type:'review', hours:0.5, task:'CS fundamentals complete. Final notes document. Archive everything for quick revision later.' },
    ]},
  ]},

  // ══════════════════════════════════════════════════════════════════════════
  // SYSTEM DESIGN — 10 weeks (Weeks 9–18)
  // ══════════════════════════════════════════════════════════════════════════
  sd: { weeks: [
    { week:1, label:'System Design Framework + Fundamentals', daily:[
      { day:'Mon', type:'theory', hours:1.5, task:'SD interview framework: Clarify → Estimate → Design → Deep Dive → Tradeoffs. Practice the clock.' },
      { day:'Tue', type:'theory', hours:1.5, task:'Back-of-envelope: QPS, storage, bandwidth calculations. Powers of 2. 1M users × 10 req/day = X QPS.' },
      { day:'Wed', type:'theory', hours:1.5, task:'Scalability fundamentals: vertical vs horizontal, stateless design, session management.' },
      { day:'Thu', type:'theory', hours:1.5, task:'Load balancers, CDN, reverse proxy, forward proxy. Where each sits in architecture.' },
      { day:'Fri', type:'theory', hours:1, task:'Read: DDIA Chapter 1 (Reliability, Scalability, Maintainability). Take notes on key concepts.' },
      { day:'Sat', type:'practice', hours:2, task:'Design a simple URL shortener end-to-end using the framework. Time yourself: 30 min.' },
      { day:'Sun', type:'review', hours:1, task:'Review System Design Primer (GitHub). Bookmark for reference during future weeks.' },
    ]},
    { week:2, label:'Caching Strategies', daily:[
      { day:'Mon', type:'theory', hours:1.5, task:'Caching layers: browser, CDN, app server, DB query cache. Cache-aside vs write-through vs write-back.' },
      { day:'Tue', type:'theory', hours:1.5, task:'Redis: data structures (string, list, set, sorted set, hash). Pub/sub. Persistence (RDB vs AOF).' },
      { day:'Wed', type:'theory', hours:1, task:'Cache eviction: LRU (LinkedHashMap), LFU, TTL. Cache stampede (thundering herd) + solutions.' },
      { day:'Thu', type:'theory', hours:1.5, task:'Consistency: cache invalidation strategies. Write-through and write-back consistency guarantees.' },
      { day:'Fri', type:'theory', hours:1, task:'Read: ByteByteGo caching article. Understand hot key problem and local L1 cache solution.' },
      { day:'Sat', type:'practice', hours:2, task:'Design distributed cache (like Redis). Cover: eviction, consistency, sharding, replication, hot keys.' },
      { day:'Sun', type:'review', hours:1, task:'Review: what does your team cache today? If new grad: what would an e-commerce site cache?' },
    ]},
    { week:3, label:'Database Design at Scale', daily:[
      { day:'Mon', type:'theory', hours:1.5, task:'Database choice: read heavy vs write heavy, relational vs document, ACID requirements.' },
      { day:'Tue', type:'theory', hours:1.5, task:'Replication: primary-replica, multi-primary. Lag handling. Failover. Read replica for analytics.' },
      { day:'Wed', type:'theory', hours:1.5, task:'Sharding deep dive: by user_id, by geography, consistent hashing. Cross-shard queries.' },
      { day:'Thu', type:'theory', hours:1, task:'DDIA Chapter 5 (Replication): read-your-writes, monotonic reads. When to use strong consistency.' },
      { day:'Fri', type:'theory', hours:1, task:'NewSQL: CockroachDB, Spanner. How they achieve ACID at global scale (TrueTime, 2PC).' },
      { day:'Sat', type:'practice', hours:2, task:'Design social network database: users, posts, follows, likes at 100M user scale.' },
      { day:'Sun', type:'review', hours:1, task:'Draw: single DB → read replicas → sharded → globally distributed. Evolution diagram.' },
    ]},
    { week:4, label:'Messaging + Event-Driven Architecture', daily:[
      { day:'Mon', type:'theory', hours:1.5, task:'Message queues: why they exist. Decoupling, buffering, fan-out. SQS vs RabbitMQ vs Kafka.' },
      { day:'Tue', type:'theory', hours:1.5, task:'Kafka deep dive: topics, partitions, offsets, consumer groups. At-least-once vs exactly-once.' },
      { day:'Wed', type:'theory', hours:1.5, task:'Event-driven: event sourcing, CQRS, outbox pattern. Saga pattern for distributed transactions.' },
      { day:'Thu', type:'theory', hours:1, task:'Stream processing: Flink vs Spark Streaming vs Kafka Streams. Windowing operations.' },
      { day:'Fri', type:'theory', hours:1, task:'Read: "Designing Event-Driven Systems" by Ben Stopford (free PDF). Chapter 1-3.' },
      { day:'Sat', type:'practice', hours:2, task:'Design notification system: email + SMS + push, 10M users. Use Kafka, priority queues, idempotency.' },
      { day:'Sat', type:'review', hours:1, task:'When would you choose Kafka vs SQS vs RabbitMQ? Write a 1-paragraph decision framework.' },
    ]},
    { week:5, label:'System Design Practice I', daily:[
      { day:'Mon', type:'practice', hours:2, task:'Design URL shortener: full 45-min session. Requirements → estimation → design → deep dive.' },
      { day:'Tue', type:'practice', hours:2, task:'Design Rate Limiter: all 4 algorithms. Show Redis implementation for token bucket.' },
      { day:'Wed', type:'review', hours:1.5, task:'Watch ByteByteGo: "Design a Notification System" on YouTube. Note 3 things you missed.' },
      { day:'Thu', type:'practice', hours:2, task:'Design Typeahead/Autocomplete: Trie in memory, top-k per prefix, data pipeline, personalization.' },
      { day:'Fri', type:'theory', hours:1, task:'Consistency models: strong, eventual, causal, read-your-writes. When each is appropriate.' },
      { day:'Sat', type:'practice', hours:2.5, task:'Design a Web Crawler: politeness, duplicate detection (Bloom filter), storage, distributed coordination.' },
      { day:'Sun', type:'review', hours:1, task:'Debrief: which design had the most gaps? Revisit that system with fresh eyes.' },
    ]},
    { week:6, label:'System Design Practice II', daily:[
      { day:'Mon', type:'practice', hours:2, task:'Design Distributed Cache (Redis clone): eviction, consistent hashing, replication, hot keys.' },
      { day:'Tue', type:'practice', hours:2, task:'Design a Payment System: idempotency, exactly-once, ledger, reconciliation, fraud detection.' },
      { day:'Wed', type:'review', hours:1.5, task:'Watch: "Design YouTube" on ByteByteGo or Exponent. Note components you hadn\'t considered.' },
      { day:'Thu', type:'practice', hours:2, task:'Design Google Drive / Dropbox: chunked upload, dedup (SHA256), sync protocol, conflict resolution.' },
      { day:'Fri', type:'theory', hours:1, task:'Microservices patterns: service discovery, circuit breaker, API gateway, sidecar proxy.' },
      { day:'Sat', type:'practice', hours:2.5, task:'Design a Food Delivery System (Uber Eats): geo-index, real-time tracking, order matching, surge pricing.' },
      { day:'Sun', type:'review', hours:1, task:'Create a "systems I can confidently design" list. What\'s still shaky? Target next week.' },
    ]},
    { week:7, label:'Low-Level Design (OOP + Patterns)', daily:[
      { day:'Mon', type:'theory', hours:1.5, task:'OOP: SOLID principles with code examples. Factory, Builder, Singleton. When to avoid Singleton.' },
      { day:'Tue', type:'practice', hours:2, task:'LLD: Design Parking Lot. Entities, relationships, UML class diagram, state machine for slots.' },
      { day:'Wed', type:'theory', hours:1.5, task:'Design patterns: Observer, Strategy, Command, Decorator, Adapter. One real-world example each.' },
      { day:'Thu', type:'practice', hours:2, task:'LLD: Design Elevator System. State machine, scheduling algorithm (SCAN/LOOK), concurrent requests.' },
      { day:'Fri', type:'theory', hours:1, task:'Concurrency in LLD: thread-safe singleton, producer-consumer, reader-writer problem.' },
      { day:'Sat', type:'practice', hours:2.5, task:'LLD: Design Library Management System, or Chess game, or ATM machine (your choice).' },
      { day:'Sun', type:'review', hours:1, task:'Review your LLD designs: are they SOLID? Any pattern misuse? Add missed edge cases.' },
    ]},
    { week:8, label:'SD Mock Interviews', daily:[
      { day:'Mon', type:'practice', hours:2, task:'Timed mock: Design Instagram (30 min). Score: requirements, capacity, design, depth.' },
      { day:'Tue', type:'practice', hours:2, task:'Timed mock: Design WhatsApp (30 min). Focus on message storage, delivery, push notifications.' },
      { day:'Wed', type:'review', hours:2, task:'Watch: compare your WhatsApp design to YouTube walkthrough. List 5 gaps.' },
      { day:'Thu', type:'practice', hours:2, task:'Timed mock: Design Twitter (30 min). Fan-out on write vs read. Trending topics. Timeline.' },
      { day:'Fri', type:'review', hours:1.5, task:'Revisit hardest system this month. Add components you\'ve learned since first attempt.' },
      { day:'Sat', type:'practice', hours:3, task:'Partner mock: 45-min system design with peer. Give and receive structured feedback.' },
      { day:'Sun', type:'review', hours:1, task:'Build a "cheat sheet" of common SD components: CDN, cache, queue, DB choices. One page.' },
    ]},
    { week:9, label:'Advanced SD: Consistency + CAP Deep Dive', daily:[
      { day:'Mon', type:'theory', hours:2, task:'CAP theorem: formal definition. CP (Zookeeper, HBase), AP (Cassandra, DynamoDB). PACELC.' },
      { day:'Tue', type:'theory', hours:1.5, task:'Consensus algorithms: Raft (leader election, log replication). Paxos overview. etcd use case.' },
      { day:'Wed', type:'theory', hours:1.5, task:'Distributed transactions: 2PC (coordinator failure), Saga (choreography vs orchestration).' },
      { day:'Thu', type:'practice', hours:2, task:'Design a distributed lock service (like Chubby/ZooKeeper). Lease, heartbeat, fencing token.' },
      { day:'Fri', type:'theory', hours:1, task:'Read: Google Chubby paper abstract + key insights. 20 mins reading + 10 mins notes.' },
      { day:'Sat', type:'practice', hours:2.5, task:'Design a globally consistent key-value store. Cover: Raft consensus, multi-region replication, read quorums.' },
      { day:'Sun', type:'review', hours:1, task:'When is eventual consistency acceptable? Write 5 examples with justification.' },
    ]},
    { week:10, label:'SD Final Sprint + Comprehensive Review', daily:[
      { day:'Mon', type:'practice', hours:2, task:'Design Uber: geo-index (S2/H3), driver matching, surge pricing, ETA prediction, trip tracking.' },
      { day:'Tue', type:'practice', hours:2, task:'Design Netflix: CDN strategy, video encoding pipeline, personalised recommendations, A/B testing.' },
      { day:'Wed', type:'review', hours:2, task:'Review your top 10 designs. For each: what would you change knowing what you know now?' },
      { day:'Thu', type:'practice', hours:2, task:'Design Airbnb: search with geo+filters, booking with locking (avoid double-booking), pricing.' },
      { day:'Fri', type:'review', hours:1.5, task:'Build final SD cheatsheet: capacity estimates template, component selection guide, trade-off table.' },
      { day:'Sat', type:'practice', hours:3, task:'Full simulation: 2 SD mocks back to back (45 min each). Debrief both.' },
      { day:'Sun', type:'review', hours:1, task:'SD phase complete. Which systems can you design confidently? Mark top 10 on your list.' },
    ]},
  ]},

  // ══════════════════════════════════════════════════════════════════════════
  // JAVA + SPRING — 8 weeks (Weeks 15–22)
  // ══════════════════════════════════════════════════════════════════════════
  java: { weeks: [
    { week:1, label:'Java Core: Collections + OOP', daily:[
      { day:'Mon', type:'theory', hours:1.5, task:'Collections deep dive: ArrayList vs LinkedList, HashMap internals (buckets, load factor, Java 8 tree bin).' },
      { day:'Tue', type:'theory', hours:1.5, task:'Comparable vs Comparator. TreeMap (sorted by key), LinkedHashMap (insertion order). Use cases.' },
      { day:'Wed', type:'theory', hours:1.5, task:'SOLID principles with Java code examples. Show violations and corrections for each.' },
      { day:'Thu', type:'practice', hours:2, task:'Code: implement LRU Cache using LinkedHashMap. Implement thread-safe singleton (enum or DCL).' },
      { day:'Fri', type:'theory', hours:1, task:'Generics: bounded wildcards (? extends T vs ? super T). Type erasure. Raw types hazard.' },
      { day:'Sat', type:'practice', hours:2, task:'Interview prep: explain HashMap vs ConcurrentHashMap at code level. Trace a resize operation.' },
      { day:'Sun', type:'review', hours:0.5, task:'Read Effective Java Items 18-26 (generics). Note 3 most important rules.' },
    ]},
    { week:2, label:'Java Core: Concurrency', daily:[
      { day:'Mon', type:'theory', hours:1.5, task:'Java Memory Model: happens-before, volatile, memory visibility. Why volatile ≠ atomic.' },
      { day:'Tue', type:'theory', hours:1.5, task:'synchronized vs ReentrantLock vs AtomicInteger. When each is appropriate. Lock ordering.' },
      { day:'Wed', type:'theory', hours:1.5, task:'CompletableFuture: thenApply, thenCompose, thenCombine, allOf, exceptionally. Async chains.' },
      { day:'Thu', type:'practice', hours:2, task:'Code: implement producer-consumer with BlockingQueue. Implement async retry with CompletableFuture.' },
      { day:'Fri', type:'theory', hours:1, task:'Thread pools: Executors, ThreadPoolExecutor parameters (corePool, maxPool, queue, rejectionPolicy).' },
      { day:'Sat', type:'practice', hours:2, task:'Interview prep: deadlock demo in code, then fix it. Explain thread pool sizing: CPU-bound vs I/O-bound.' },
      { day:'Sun', type:'review', hours:0.5, task:'Read JCIP Chapter 3 (Sharing Objects). Note volatile + safe publication rules.' },
    ]},
    { week:3, label:'Java Core: JVM + Streams', daily:[
      { day:'Mon', type:'theory', hours:1.5, task:'JVM internals: heap areas, Metaspace, thread stack. GC roots. G1GC phases (Young, Mixed, Full).' },
      { day:'Tue', type:'theory', hours:1.5, task:'ZGC vs G1GC: pause times, when to choose. -Xmx, -Xms, HeapDumpOnOutOfMemoryError flags.' },
      { day:'Wed', type:'theory', hours:1.5, task:'Stream API: lazy evaluation, intermediate vs terminal ops. Collectors.groupingBy, partitioningBy.' },
      { day:'Thu', type:'practice', hours:2, task:'Code: top 3 highest paid employees per dept using streams. Flat map with Optional. Parallel stream.' },
      { day:'Fri', type:'theory', hours:1, task:'Optional: orElse vs orElseGet performance diff. When NOT to use Optional.' },
      { day:'Sat', type:'practice', hours:2, task:'Interview prep: describe memory leak scenario in Java. Fix it. Explain G1GC in 2 min.' },
      { day:'Sun', type:'review', hours:0.5, task:'Review Effective Java items on lambdas/streams (Items 42-48). Note performance gotchas.' },
    ]},
    { week:4, label:'Spring Boot Core', daily:[
      { day:'Mon', type:'theory', hours:1.5, task:'Spring IoC: bean lifecycle, @Component/@Service/@Repository differences. Constructor vs field injection.' },
      { day:'Tue', type:'theory', hours:1.5, task:'Spring AOP: proxies, @Transactional internals (why it fails on private methods, same-class calls).' },
      { day:'Wed', type:'theory', hours:1.5, task:'Spring Data JPA: @Entity, @OneToMany lazy loading, N+1 problem, @BatchSize, join fetch.' },
      { day:'Thu', type:'practice', hours:2, task:'Build: Spring Boot REST API with JPA + H2. Add validation (@Valid), error handling (@ControllerAdvice).' },
      { day:'Fri', type:'theory', hours:1, task:'Spring profiles: @Profile, application-{profile}.yml. Externalized config (12-factor app).' },
      { day:'Sat', type:'practice', hours:2, task:'Interview prep: explain @Transactional propagation. When does it NOT work? Show the fix.' },
      { day:'Sun', type:'review', hours:0.5, task:'Read Spring docs: transaction management section. Note propagation=REQUIRED vs REQUIRES_NEW.' },
    ]},
    { week:5, label:'Spring Security + Testing', daily:[
      { day:'Mon', type:'theory', hours:1.5, task:'Spring Security filter chain: SecurityFilterChain, OncePerRequestFilter. How requests flow.' },
      { day:'Tue', type:'practice', hours:2, task:'Implement: JWT authentication filter in Spring Security. Sign with RS256, validate on each request.' },
      { day:'Wed', type:'theory', hours:1.5, task:'OAuth2/OIDC flow. Resource server configuration. @PreAuthorize with SpEL expressions.' },
      { day:'Thu', type:'practice', hours:2, task:'Testing: @WebMvcTest for controllers, @DataJpaTest for repos, Mockito for service layer.' },
      { day:'Fri', type:'theory', hours:1, task:'Integration testing: @SpringBootTest + TestContainers (real Postgres in Docker).' },
      { day:'Sat', type:'practice', hours:2, task:'Interview prep: "How does Spring Security work end-to-end?" — draw the filter chain on whiteboard.' },
      { day:'Sun', type:'review', hours:0.5, task:'Review Baeldung: Spring Security series. Make sure you understand CSRF, CORS in Spring context.' },
    ]},
    { week:6, label:'Microservices + Patterns', daily:[
      { day:'Mon', type:'theory', hours:1.5, task:'Microservices patterns: service discovery (Eureka/Consul), API gateway, circuit breaker (Resilience4j).' },
      { day:'Tue', type:'theory', hours:1.5, task:'Inter-service communication: REST vs gRPC vs messaging. Service mesh (Istio) overview.' },
      { day:'Wed', type:'theory', hours:1.5, task:'Distributed tracing with Spring Cloud Sleuth + Zipkin. Correlation IDs. Log aggregation.' },
      { day:'Thu', type:'practice', hours:2, task:'Build: two Spring Boot services communicating via REST + Kafka. Add Resilience4j circuit breaker.' },
      { day:'Fri', type:'theory', hours:1, task:'Saga pattern: choreography (Kafka events) vs orchestration (Spring Orchestration). Compensating transactions.' },
      { day:'Sat', type:'practice', hours:2, task:'Interview prep: "How do you handle distributed transactions in microservices?" — Saga with example.' },
      { day:'Sun', type:'review', hours:0.5, task:'Review: what is the CAP tradeoff in a 3-service Saga? What happens if service 2 fails?' },
    ]},
    { week:7, label:'Performance + Production Java', daily:[
      { day:'Mon', type:'theory', hours:1.5, task:'Java profiling: JFR (Java Flight Recorder), JMC, async-profiler. Flame graphs. Common bottlenecks.' },
      { day:'Tue', type:'practice', hours:2, task:'Performance exercise: optimise a slow Spring Boot endpoint (N+1, missing index, thread contention).' },
      { day:'Wed', type:'theory', hours:1.5, task:'Memory leaks in production: classloader leaks, static maps, unclosed streams. Detection tools.' },
      { day:'Thu', type:'theory', hours:1.5, task:'Reactive programming: Project Reactor. Mono, Flux, WebFlux. When blocking vs reactive.' },
      { day:'Fri', type:'theory', hours:1, task:'Java 21 features: virtual threads (Project Loom), record patterns, sealed interfaces, pattern matching.' },
      { day:'Sat', type:'practice', hours:2, task:'Interview prep: design a thread pool, size it for your use case. Explain work-stealing (ForkJoinPool).' },
      { day:'Sun', type:'review', hours:0.5, task:'Write: top 10 Java gotchas in production. Share to your notes for future reference.' },
    ]},
    { week:8, label:'Java Final Revision + Mock Interviews', daily:[
      { day:'Mon', type:'review', hours:2, task:'Full Java core revision: Collections, Concurrency, JVM, Streams. Spot gaps in your knowledge.' },
      { day:'Tue', type:'practice', hours:2, task:'Mock Java interview: 10 questions, 90-second answers each. No notes.' },
      { day:'Wed', type:'practice', hours:2, task:'Code challenge: implement ConcurrentHashMap simplified version from scratch. Thread-safety analysis.' },
      { day:'Thu', type:'review', hours:1.5, task:'Spring Boot mock: explain Spring context startup. Dependency injection in unit tests. Mock beans.' },
      { day:'Fri', type:'review', hours:1, task:'Microservices mock: design order service + inventory service with Kafka + circuit breaker.' },
      { day:'Sat', type:'practice', hours:2, task:'Full Java loop mock with peer or recorded self-mock: 45 min. Grade harshly.' },
      { day:'Sun', type:'review', hours:0.5, task:'Java phase complete. Identify top 3 remaining weak areas. Schedule them in revision queue.' },
    ]},
  ]},

  // ══════════════════════════════════════════════════════════════════════════
  // REACT + NEXT.JS — 8 weeks (Weeks 19–26)
  // ══════════════════════════════════════════════════════════════════════════
  react: { weeks: [
    { week:1, label:'React Foundations: Hooks Deep Dive', daily:[
      { day:'Mon', type:'theory', hours:1.5, task:'useState: batching (React 18), functional updates, why not to mutate state directly.' },
      { day:'Tue', type:'theory', hours:1.5, task:'useEffect: dependency array exhaustive-deps, cleanup functions, stale closure patterns.' },
      { day:'Wed', type:'practice', hours:1.5, task:'Code: build a custom useFetch hook with loading, error, abort controller, race condition handling.' },
      { day:'Thu', type:'theory', hours:1.5, task:'useRef: mutable ref object, forwarding refs, accessing DOM. vs useState for non-render values.' },
      { day:'Fri', type:'theory', hours:1, task:'useContext: creation, consumer, why Context re-renders all consumers. When to avoid.' },
      { day:'Sat', type:'practice', hours:2, task:'Build: interactive form with validation, submission state, error display. No external libraries.' },
      { day:'Sun', type:'review', hours:0.5, task:'Read react.dev hooks reference. Note rules of hooks (not in loops, not in conditionals).' },
    ]},
    { week:2, label:'Performance: useMemo, useCallback, memo', daily:[
      { day:'Mon', type:'theory', hours:1.5, task:'React re-render triggers: same state, same props, parent re-renders, context changes.' },
      { day:'Tue', type:'theory', hours:1.5, task:'React.memo: shallow comparison. When it helps vs hurts. Overuse is a smell.' },
      { day:'Wed', type:'theory', hours:1.5, task:'useMemo: memoize expensive computations. useCallback: stable function references for children.' },
      { day:'Thu', type:'practice', hours:2, task:'Performance exercise: profile a slow component tree in DevTools. Apply memo + useCallback. Measure.' },
      { day:'Fri', type:'theory', hours:1, task:'Code splitting: React.lazy + Suspense. Route-based vs component-based splitting.' },
      { day:'Sat', type:'practice', hours:2, task:'Build: a large list with virtualization (react-window). Compare with/without. Measure FPS.' },
      { day:'Sun', type:'review', hours:0.5, task:'Watch "React performance" talk from React Conf. Note 3 actionable takeaways.' },
    ]},
    { week:3, label:'State Management: Zustand + Patterns', daily:[
      { day:'Mon', type:'theory', hours:1.5, task:'State categories: local, server, URL, form. Which tool for which category.' },
      { day:'Tue', type:'theory', hours:1.5, task:'useReducer: when it beats useState. Reducer testing. Action creators pattern.' },
      { day:'Wed', type:'theory', hours:1.5, task:'Zustand: minimal boilerplate, selective subscription, devtools, persistence middleware.' },
      { day:'Thu', type:'practice', hours:2, task:'Build: FAANG tracker with Zustand. Multiple slices, selectors, immer middleware for immutability.' },
      { day:'Fri', type:'theory', hours:1, task:'TanStack Query: queries, mutations, cache invalidation, optimistic updates, background refetch.' },
      { day:'Sat', type:'practice', hours:2, task:'Refactor: replace useEffect+useState data fetching with TanStack Query. Measure improvement.' },
      { day:'Sun', type:'review', hours:0.5, task:'When Context → Zustand → Redux? Write a 1-paragraph decision guide for your team.' },
    ]},
    { week:4, label:'React Patterns + Architecture', daily:[
      { day:'Mon', type:'theory', hours:1.5, task:'Compound components: shared Context, Tabs/Accordion pattern. Flexible API design.' },
      { day:'Tue', type:'theory', hours:1.5, task:'Render props vs HOC vs Custom Hooks. Pros/cons. Modern recommendation (custom hooks).' },
      { day:'Wed', type:'practice', hours:2, task:'Build: compound Tabs component with <Tabs>, <TabList>, <Tab>, <TabPanels>, <TabPanel>.' },
      { day:'Thu', type:'theory', hours:1.5, task:'Error boundaries: class component limitation, react-error-boundary library. Fallback UI.' },
      { day:'Fri', type:'theory', hours:1, task:'Concurrent features: useTransition, useDeferredValue. When UI responsiveness > immediacy.' },
      { day:'Sat', type:'practice', hours:2, task:'Interview prep: implement debounced search with useTransition. Compare to without transition.' },
      { day:'Sun', type:'review', hours:0.5, task:'Read patterns.dev React patterns section. Identify 2 you haven\'t used. Build small examples.' },
    ]},
    { week:5, label:'Next.js App Router', daily:[
      { day:'Mon', type:'theory', hours:1.5, task:'App Router vs Pages Router: RSC by default, layouts, loading.tsx, error.tsx, not-found.tsx.' },
      { day:'Tue', type:'theory', hours:1.5, task:'Server Components vs Client Components: mental model, "use client" directive, data access.' },
      { day:'Wed', type:'theory', hours:1.5, task:'Data fetching in App Router: fetch() caching, revalidate, no-store. Parallel vs sequential.' },
      { day:'Thu', type:'practice', hours:2, task:'Build: Next.js dashboard with RSC data fetching, Suspense loading states, error handling.' },
      { day:'Fri', type:'theory', hours:1, task:'Route handlers, Server Actions, middleware. When to use each.' },
      { day:'Sat', type:'practice', hours:2, task:'Build: form with Server Actions + optimistic UI using useOptimistic hook.' },
      { day:'Sun', type:'review', hours:0.5, task:'Read Next.js docs: caching hierarchy (full route, data, router). Draw the cache layers diagram.' },
    ]},
    { week:6, label:'Next.js Rendering Strategies', daily:[
      { day:'Mon', type:'theory', hours:1.5, task:'Static vs Dynamic rendering: build-time vs request-time. generateStaticParams for static paths.' },
      { day:'Tue', type:'theory', hours:1.5, task:'ISR: on-demand revalidation with revalidatePath/revalidateTag. Background regeneration.' },
      { day:'Wed', type:'theory', hours:1.5, task:'Streaming: Suspense + loading.tsx. Streaming from server to client. Progressive page load.' },
      { day:'Thu', type:'practice', hours:2, task:'Build: blog with SSG for posts, ISR for comments section (60s revalidation), streaming for sidebar.' },
      { day:'Fri', type:'theory', hours:1, task:'SEO: metadata API, OpenGraph, dynamic OG images with @vercel/og. Sitemap generation.' },
      { day:'Sat', type:'practice', hours:2, task:'Interview prep: "When would you use SSR vs ISR vs SSG in Next.js?" — answer for 3 real scenarios.' },
      { day:'Sun', type:'review', hours:0.5, task:'Review Next.js caching docs page completely. Note which cache each fetch strategy uses.' },
    ]},
    { week:7, label:'TypeScript + Testing React', daily:[
      { day:'Mon', type:'theory', hours:1.5, task:'TypeScript advanced: generics, conditional types, mapped types, infer keyword, utility types.' },
      { day:'Tue', type:'practice', hours:2, task:'TypeScript exercise: type a Redux-like reducer with full inference. No `any` allowed.' },
      { day:'Wed', type:'theory', hours:1.5, task:'React Testing Library: render, screen queries, user-event. Testing behaviour not implementation.' },
      { day:'Thu', type:'practice', hours:2, task:'Write tests: form component with validation, async data fetching mock, context-wrapped component.' },
      { day:'Fri', type:'theory', hours:1, task:'Vitest vs Jest: speed comparison. MSW (Mock Service Worker) for API mocking in tests.' },
      { day:'Sat', type:'practice', hours:2, task:'Interview prep: "How do you test a custom hook?" — implement and test useFetch from scratch.' },
      { day:'Sun', type:'review', hours:0.5, task:'Read React TypeScript Cheatsheet: hooks typing section. Note common patterns.' },
    ]},
    { week:8, label:'React Final Mock Interviews', daily:[
      { day:'Mon', type:'review', hours:2, task:'Full React revision: hooks, performance, patterns, state management, Next.js. One-page summary.' },
      { day:'Tue', type:'practice', hours:2, task:'Live coding mock: build a GitHub user search app in 45 min (API + loading + error + display).' },
      { day:'Wed', type:'practice', hours:2, task:'Interview questions: explain reconciliation, virtual DOM, Fiber architecture. 2 min each.' },
      { day:'Thu', type:'practice', hours:1.5, task:'System design: design a real-time collaborative editor (like Figma) frontend architecture.' },
      { day:'Fri', type:'review', hours:1, task:'Review: which React/Next.js concepts still feel shaky? 30-min deep dive on each.' },
      { day:'Sat', type:'practice', hours:2, task:'Full mock: 45 min live coding + 15 min React theory Q&A. Record and review.' },
      { day:'Sun', type:'review', hours:0.5, task:'React phase complete. Write top 5 React concepts you\'d explain to a junior. Master = can teach.' },
    ]},
  ]},

  // ══════════════════════════════════════════════════════════════════════════
  // NODE.JS — 6 weeks (Weeks 21–26)
  // ══════════════════════════════════════════════════════════════════════════
  node: { weeks: [
    { week:1, label:'Node.js Internals: Event Loop', daily:[
      { day:'Mon', type:'theory', hours:1.5, task:'Event loop phases: Timers → Pending I/O → Poll → Check (setImmediate) → Close. Draw it.' },
      { day:'Tue', type:'theory', hours:1.5, task:'Microtask queue: process.nextTick > Promise.then. Priority demo with code. Avoid nextTick recursion.' },
      { day:'Wed', type:'practice', hours:1.5, task:'Code: predict output of 10 async code snippets (mix of nextTick/Promise/setImmediate/setTimeout).' },
      { day:'Thu', type:'theory', hours:1, task:'libuv thread pool: file I/O, DNS, crypto. Default 4 threads. UV_THREADPOOL_SIZE env var.' },
      { day:'Fri', type:'practice', hours:1, task:'Demonstrate: event loop blocking with CPU-intensive task. Measure with perf_hooks.' },
      { day:'Sat', type:'practice', hours:2, task:'Interview prep: "Explain Node.js event loop to a Java developer." 3 min answer with code examples.' },
      { day:'Sun', type:'review', hours:0.5, task:'Watch: "What the heck is the event loop?" by Philip Roberts (JSConf EU). Classic talk.' },
    ]},
    { week:2, label:'Streams + Worker Threads', daily:[
      { day:'Mon', type:'theory', hours:1.5, task:'Streams: Readable, Writable, Transform, Duplex. Backpressure: what it is, why it matters.' },
      { day:'Tue', type:'practice', hours:2, task:'Build: file processing pipeline — ReadStream → gzip Transform → WriteStream. Handle backpressure.' },
      { day:'Wed', type:'theory', hours:1.5, task:'Worker threads: when vs child_process. SharedArrayBuffer + Atomics for shared memory.' },
      { day:'Thu', type:'practice', hours:1.5, task:'Code: CPU-intensive task (fibonacci) blocking main thread. Fix with worker_threads. Measure improvement.' },
      { day:'Fri', type:'theory', hours:1, task:'Cluster module: fork N workers, share port, master-worker IPC. When vs worker threads.' },
      { day:'Sat', type:'practice', hours:2, task:'Interview prep: "How do you handle CPU-intensive tasks in Node.js?" — full answer with trade-offs.' },
      { day:'Sun', type:'review', hours:0.5, task:'Node.js docs: Worker Threads guide. Note message passing patterns (postMessage, SharedArrayBuffer).' },
    ]},
    { week:3, label:'Express + REST API Design', daily:[
      { day:'Mon', type:'theory', hours:1.5, task:'Express middleware model: app.use order, (req,res,next), error middleware (4 params), async errors.' },
      { day:'Tue', type:'practice', hours:2, task:'Build: Express API with auth middleware, rate limiting, input validation (express-validator).' },
      { day:'Wed', type:'theory', hours:1.5, task:'REST best practices: versioning (/api/v1), cursor pagination, idempotency keys, HATEOAS.' },
      { day:'Thu', type:'practice', hours:1.5, task:'Add: cursor-based pagination, proper error response schema (RFC 7807), request logging (Morgan+Winston).' },
      { day:'Fri', type:'theory', hours:1, task:'OpenAPI (Swagger): spec-first development, code generation, API documentation.' },
      { day:'Sat', type:'practice', hours:2, task:'Interview prep: design a REST API for a task manager. Discuss versioning, pagination, auth choices.' },
      { day:'Sun', type:'review', hours:0.5, task:'Review: Node.js security checklist (OWASP). Which items does your API cover?' },
    ]},
    { week:4, label:'Authentication + Security', daily:[
      { day:'Mon', type:'theory', hours:1.5, task:'JWT: header.payload.signature. RS256 vs HS256. Refresh token rotation. Token blacklisting.' },
      { day:'Tue', type:'practice', hours:2, task:'Implement: JWT auth with refresh tokens in Express. Secure cookies vs Bearer header tradeoffs.' },
      { day:'Wed', type:'theory', hours:1.5, task:'Common attacks: SQL injection (NoSQL version), XSS, CSRF, SSRF, prototype pollution. Mitigations.' },
      { day:'Thu', type:'practice', hours:1.5, task:'Security hardening: add helmet, express-rate-limit, express-mongo-sanitize, CORS whitelist.' },
      { day:'Fri', type:'theory', hours:1, task:'HTTPS: HSTS, certificate pinning, let\'s Encrypt automation, HTTP → HTTPS redirect.' },
      { day:'Sat', type:'practice', hours:2, task:'Interview prep: "Walk me through your API security checklist" — demonstrate 10 protections.' },
      { day:'Sun', type:'review', hours:0.5, task:'Run npm audit on a project. Fix critical vulnerabilities. Understand CVE process.' },
    ]},
    { week:5, label:'Testing + Performance', daily:[
      { day:'Mon', type:'theory', hours:1.5, task:'Testing strategy: unit (fast, isolated) → integration (real DB) → e2e. Test pyramid.' },
      { day:'Tue', type:'practice', hours:2, task:'Write: unit tests with Jest + Supertest for Express routes. Mock DB calls with jest.mock.' },
      { day:'Wed', type:'theory', hours:1.5, task:'Performance profiling: clinic.js, 0x flame graphs, --inspect flag, Chrome DevTools for Node.' },
      { day:'Thu', type:'practice', hours:1.5, task:'Load test with k6 or autocannon. Identify bottleneck (DB, event loop, memory). Fix it.' },
      { day:'Fri', type:'theory', hours:1, task:'Memory management: heap snapshots, leak detection, avoid closures over large objects.' },
      { day:'Sat', type:'practice', hours:2, task:'Full performance review: profile a realistic API under load. Find + fix top 3 bottlenecks.' },
      { day:'Sun', type:'review', hours:0.5, task:'Read Node.js Best Practices repo (GitHub). Note 5 practices not already in your code.' },
    ]},
    { week:6, label:'Node.js Production + Mock Interviews', daily:[
      { day:'Mon', type:'theory', hours:1.5, task:'PM2: cluster mode, auto-restart, graceful shutdown, log management, monitoring metrics.' },
      { day:'Tue', type:'theory', hours:1.5, task:'Docker + Node: multi-stage build, non-root user, .dockerignore, healthcheck, env vars.' },
      { day:'Wed', type:'practice', hours:2, task:'Build: complete Node.js microservice — Dockerfile, PM2 config, graceful shutdown handler.' },
      { day:'Thu', type:'review', hours:1.5, task:'Interview prep: explain event loop to interviewer, async error handling, scaling strategy.' },
      { day:'Fri', type:'review', hours:1, task:'Review weakest Node.js area. 30-minute focused study + code exercise.' },
      { day:'Sat', type:'practice', hours:2, task:'Full Node.js mock: 45 min — event loop question + build REST endpoint + security Q&A.' },
      { day:'Sun', type:'review', hours:0.5, task:'Node.js phase complete. Write: top 10 things you know about Node.js production. Keep this.' },
    ]},
  ]},

  // ══════════════════════════════════════════════════════════════════════════
  // BEHAVIORAL — 6 weeks (Weeks 30–35)
  // ══════════════════════════════════════════════════════════════════════════
  beh: { weeks: [
    { week:1, label:'STAR Framework + Story Mining', daily:[
      { day:'Mon', type:'theory', hours:1, task:'STAR method: Situation (context), Task (your responsibility), Action (what YOU did), Result (measurable).' },
      { day:'Tue', type:'practice', hours:1, task:'Mine 5 work/project experiences. For each: write 1 sentence per STAR component.' },
      { day:'Wed', type:'practice', hours:1, task:'Expand Story 1 to full 2-minute STAR response. Record yourself. Listen back critically.' },
      { day:'Thu', type:'practice', hours:1, task:'Expand Stories 2 + 3. Quantify results: %, $, time saved, users impacted. No vague outcomes.' },
      { day:'Fri', type:'theory', hours:1, task:'What interviewers score: specific detail, your individual contribution, learning demonstrated.' },
      { day:'Sat', type:'practice', hours:1, task:'Deliver all 3 stories to a friend or camera. Get feedback: too long? Vague actions? Weak result?' },
      { day:'Sun', type:'review', hours:0.5, task:'Refine all 3 stories based on feedback. Target: 2 min each, crisp, specific, quantified.' },
    ]},
    { week:2, label:'Amazon Leadership Principles', daily:[
      { day:'Mon', type:'theory', hours:1, task:'Memorise all 16 Amazon LPs. Group them: Customer-focused, Execution, People, Innovation.' },
      { day:'Tue', type:'practice', hours:1.5, task:'Map your 3 existing stories to LP coverage. Identify which LPs have no story yet.' },
      { day:'Wed', type:'practice', hours:1.5, task:'Write new stories for: Bias for Action, Ownership, Invent & Simplify. 2 min each.' },
      { day:'Thu', type:'practice', hours:1, task:'Deliver: "Tell me about a time you failed" — STAR, own it fully, show what changed.' },
      { day:'Fri', type:'practice', hours:1, task:'Deliver: "Tell me about a time you disagreed with your manager" — stay professional, data-driven.' },
      { day:'Sat', type:'practice', hours:1, task:'Amazon LP mock: 6 questions, 2 min each. Focus on LP keywords landing naturally in answers.' },
      { day:'Sun', type:'review', hours:0.5, task:'Which 3 LPs are still uncovered? Write those stories this week.' },
    ]},
    { week:3, label:'Google + Meta Behavioral Frameworks', daily:[
      { day:'Mon', type:'theory', hours:1, task:'Google: Googleyness = intellectual humility, team player, comfort with ambiguity, does the right thing.' },
      { day:'Tue', type:'practice', hours:1.5, task:'Write/deliver: "Describe a time you had to work with ambiguous requirements. What did you do?"' },
      { day:'Wed', type:'theory', hours:1, task:'Meta: impact-focused. "Tell me about your greatest impact." Quantify in DAU/revenue/latency terms.' },
      { day:'Thu', type:'practice', hours:1.5, task:'Write/deliver: "What\'s the most impactful project you\'ve led? How did you measure success?"' },
      { day:'Fri', type:'practice', hours:1, task:'Conflict story: "Describe a disagreement with a senior engineer." Data over opinions. Show commitment.' },
      { day:'Sat', type:'practice', hours:1, task:'Mock: 5 Google/Meta behavioral questions. 2 min each. No "we" — always "I".' },
      { day:'Sun', type:'review', hours:0.5, task:'Audit: do your stories have too much "we"? Replace with specific individual actions.' },
    ]},
    { week:4, label:'Technical Leadership Stories', daily:[
      { day:'Mon', type:'practice', hours:1, task:'Write: "Tell me about a time you influenced technical direction beyond your scope."' },
      { day:'Tue', type:'practice', hours:1, task:'Write: "Describe a significant technical decision you made. What was the tradeoff?"' },
      { day:'Wed', type:'practice', hours:1, task:'Write: "Tell me about a time you mentored someone and it led to visible growth."' },
      { day:'Thu', type:'practice', hours:1, task:'Write: "Tell me about a time you had to deliver under extreme pressure. What did you sacrifice?"' },
      { day:'Fri', type:'practice', hours:1, task:'Deliver all 4 stories to camera. Total time: 8 minutes. Strict. Identify which runs long.' },
      { day:'Sat', type:'practice', hours:1.5, task:'Full behavioral mock: 8 questions, 2 min each, random order. Debrief weakest 2 stories.' },
      { day:'Sun', type:'review', hours:0.5, task:'Update story bank. You should have 10+ stories by now. Map each to multiple LP dimensions.' },
    ]},
    { week:5, label:'Company-Specific Behavioral Prep', daily:[
      { day:'Mon', type:'practice', hours:1.5, task:'Amazon deep dive: prepare a story for each of the 5 most common LP pairs asked in loop.' },
      { day:'Tue', type:'practice', hours:1.5, task:'Google: "Why Google?" and "Tell me about a time you demonstrated intellectual humility."' },
      { day:'Wed', type:'practice', hours:1.5, task:'Meta: "What would you build if no constraints?" and "How do you prioritise competing projects?"' },
      { day:'Thu', type:'practice', hours:1.5, task:'Microsoft: "Growth mindset" story. "Tell me about a time you learned something new quickly."' },
      { day:'Fri', type:'review', hours:1, task:'"Why this company?" for each target. 60 seconds. Show genuine research, not generic answers.' },
      { day:'Sat', type:'practice', hours:2, task:'Company-specific behavioral loop simulation: 5 questions per company (choose your top 2 companies).' },
      { day:'Sun', type:'review', hours:0.5, task:'Finalise your top 10 stories. Each should be reusable for multiple questions.' },
    ]},
    { week:6, label:'Behavioral Final Sprint', daily:[
      { day:'Mon', type:'practice', hours:1.5, task:'Full behavioral loop mock: 30 min, 8 questions. Delivered to peer or recorded.' },
      { day:'Tue', type:'review', hours:1, task:'Debrief mock: which answers were weakest? Rewrite those stories with more specificity.' },
      { day:'Wed', type:'practice', hours:1.5, task:'Stress test: "Tell me about your greatest failure" and "What\'s your biggest weakness" — polish these.' },
      { day:'Thu', type:'practice', hours:1, task:'Closing the interview: prepare 3 thoughtful questions to ask the interviewer. Show product thinking.' },
      { day:'Fri', type:'review', hours:1, task:'Final story review: are all stories: ≤2 min, quantified, individual-I not team-we, specific?' },
      { day:'Sat', type:'practice', hours:2, task:'Full behavioral mock with different peer. Swap roles. Give structured feedback.' },
      { day:'Sun', type:'review', hours:0.5, task:'Behavioral phase complete. Your story bank is your asset — keep it updated after every project.' },
    ]},
  ]},

}; // end DAILY_PLANS

// ─────────────────────────────────────────────────────────────────────────────
// 48-WEEK OVERALL ROADMAP PHASES
// ─────────────────────────────────────────────────────────────────────────────
export interface StudyPhase {
  phase: number;
  name: string;
  weeks: string;
  color: string;
  icon: string;
  modules: string[];
  dailyHours: string;
  goals: string[];
  milestone: string;
}

export const STUDY_PHASES: StudyPhase[] = [
  {
    phase: 1, name: 'DSA Foundations', weeks: 'Weeks 1–8', color: '#00d4ff', icon: '🔢',
    modules: ['DSA (Arrays → Trees → Heaps)', 'CS Fundamentals (OS, Networking intro)'],
    dailyHours: '2h DSA + 1h CS',
    goals: [
      'Master: Arrays, HashMaps, Two Pointers, Sliding Window, Binary Search',
      'Master: Linked Lists, Stacks, Queues, Heaps, Tries',
      'Solve 80+ LeetCode Easy/Medium problems',
      'Understand Big-O analysis for any code',
      'CS: OS processes/threads, TCP/IP, HTTP basics',
    ],
    milestone: 'Can solve any Easy + most Mediums within 20 minutes without hints',
  },
  {
    phase: 2, name: 'Advanced DSA + System Design Intro', weeks: 'Weeks 9–16', color: '#7c3aed', icon: '🕸️',
    modules: ['DSA (Graphs → DP → Backtracking)', 'CS Fundamentals (DBMS, advanced Networking)', 'System Design (fundamentals)'],
    dailyHours: '2h DSA + 1h CS + 1h SD',
    goals: [
      'Master: Graphs (BFS/DFS, Dijkstra, Union-Find, Topological Sort)',
      'Master: Dynamic Programming (1D, 2D, Knapsack, Sequences)',
      'Master: Backtracking, Bit Manipulation, String Algorithms',
      'CS: SQL mastery, ACID, CAP theorem, database indexes',
      'SD: Scalability fundamentals, caching, consistent hashing',
    ],
    milestone: 'Can solve Hard DSA problems with pattern recognition. Can design URL shortener/Rate Limiter',
  },
  {
    phase: 3, name: 'Full-Stack Tech Stack Mastery', weeks: 'Weeks 17–28', color: '#00ff94', icon: '⚡',
    modules: ['System Design (advanced)', 'Java + Spring Boot', 'React + Next.js', 'Node.js + Express'],
    dailyHours: '1h DSA revision + 1.5h SD + 1.5h stack',
    goals: [
      'System Design: design 15+ systems end-to-end with trade-offs',
      'Java: JVM, concurrency, Spring Security, microservices patterns',
      'React: hooks deep dive, performance, Next.js App Router mastery',
      'Node.js: event loop internals, streams, production best practices',
      'Solve NeetCode 150 completion target',
    ],
    milestone: 'Can whiteboard any common system (Instagram, Uber, Kafka). Java/React/Node interviews ready',
  },
  {
    phase: 4, name: 'Interview Simulation + Behavioral', weeks: 'Weeks 29–36', color: '#ffb800', icon: '🎯',
    modules: ['Behavioral (STAR + company-specific)', 'AI/ML + Agents', 'Mock Interviews'],
    dailyHours: '1h DSA mock + 1h behavioral + 1h mock interviews',
    goals: [
      'Prepare 10+ polished STAR stories covering all Amazon LPs',
      'AI/ML: transformers, RAG, agent patterns (essential at senior level)',
      '20+ mock interviews (Pramp, interviewing.io, peer mocks)',
      'Company-specific prep for top 3 target companies',
      'Behavioral: zero vague answers, all quantified results',
    ],
    milestone: 'Can pass behavioral rounds at Amazon/Google. AI/ML questions comfortable.',
  },
  {
    phase: 5, name: 'Cloud + DevOps + Final Polish', weeks: 'Weeks 37–44', color: '#0891b2', icon: '☁️',
    modules: ['Cloud + DevOps (AWS, K8s, CI/CD)', 'Company-specific prep', 'Mock Interview sprints'],
    dailyHours: '1h Cloud/DevOps + 1h company prep + 1h mocks',
    goals: [
      'AWS: EC2/Lambda/EKS/S3/RDS/SQS decision matrix confident',
      'Kubernetes: Pod/Deployment/StatefulSet/HPA production patterns',
      'CI/CD: blue-green, canary, GitOps, ArgoCD pipelines',
      'Observability: SLI/SLO/error budgets, OpenTelemetry stack',
      'Complete all Blind 75 + NeetCode 150 questions',
    ],
    milestone: 'Infrastructure/platform round at FAANG is comfortable. Full-stack confidence achieved.',
  },
  {
    phase: 6, name: 'Final Sprint + Applications', weeks: 'Weeks 45–48', color: '#ff3366', icon: '🚀',
    modules: ['Intensive mock interviews', 'Weak area targeting', 'Application + offer negotiation'],
    dailyHours: '2h mocks + 1h revision + applications',
    goals: [
      'Daily mock interviews (minimum 2 per week)',
      'Every weak pattern: 5 targeted problems + re-interview',
      'Apply to all target companies with polished resume',
      'Negotiate: research comp bands (levels.fyi, glassdoor)',
      'Complete revision queue — zero red cards',
    ],
    milestone: 'OFFER RECEIVED. You are ready. 🎉',
  },
];
