import type { Experience } from "@/components/ExperienceItem";

export const experience: Experience[] = [
  {
    company: "TikTok",
    role: "Backend Software Engineering Intern",
    period: "Aug. 2025 – Present",
    location: "San Jose, CA",
    bullets: [
      "Increased the Social Graph Application Team’s mutuals discovery algorithm by 2% engineering and deploying high performance graph mining operators on a large-scale, distributed platform.",
      "Researching and benchmarking the efficiency of TikTok’s graph mining platform against industry-standard graph frameworks (Neo4j, GraphScope) to write a research paper to submit to SIGMOD and VLDB conferences.",
    ],
    tech: ["C++", "Kubernetes", "Docker", "SQL"],
  },
  {
    company: "Washington University in St. Louis",
    role: "Graph Theory Machine Learning Research Intern",
    period: "June 2022 – June 2024",
    location: "St. Louis, MO",
    bullets: [
      "Optimized Bellman-Ford, Dijkstra’s, and A* graph algorithms subgraphing performance by 30% through systematic analyses of time performance variations across hundreds of test cases.",
      "Researched graph isomorphism detection with canonical labeling applications and implementing convolutional neural networks, contributing to improved computational geometry solutions.",
      "Trained predictive sports analytics model on preprocessed NBA statistics, achieving 71% accuracy in predicting NBA match outcomes for data-driven decision making",
    ],
    tech: ["Python", "NetworkX", "Pandas", "NumPy", "Matplotlib", "Graph-Tool"],
  },
  {
    company: "Georgia Institute of Technology",
    role: "Undergraduate Researcher on Autonomous Vehicles",
    period: "Jan. 2025 - Present",
    location: "Atlanta, GA",
    bullets: [
      "Enhanced autonomous vehicle perception by implementing advanced sensor nodes integrating LiDAR, odometry, and ZED camera data, improving navigation accuracy for F1TENTH autonomous racing applications.",
      "Optimized autonomous racing performance with SLAM Toolbox for environmental mapping, achieving 14% faster time trial completion than pure pursuit models with trajectory optimization.",
    ],
    tech: ["ROS2", "Python", "SLAM Toolbox"],
  },
  {
    company: "SyllogisTeks",
    role: "Backend Software Engineering Intern",
    period: "May 2023 – Aug. 2023",
    location: "St. Louis, MO",
    bullets: [
      "Reduced onboarding time by 48% by engineering a comprehensive employee portal, leveraging a Test-Driven Development (TDD) methodology to ensure code quality and system reliability.",
      "Implemented template management, legal document processing, and file storage systems using the ASP.NET Core MVC framework with SQL database integration, enabling scalable and secure data handling.",
    ],
    tech: ["C#", "SQL", "HTML", "CSS", "JavaScript", "ASP.NET"],
  },
  {
    company: "HyTech Racing",
    role: "Full Stack Developer",
    period: "June 2022 – June 2024",
    location: "St. Louis, MO",
    bullets: [
      "Developed a GitHub Actions CI/CD pipeline, custom React components, and user verification for an internal engineering data website, increasing development speeds by 23% through improved workflow and data access.",
      "Enhanced website performance and user experience by optimizing server-side operations and refactoring data processing algorithms to improve API efficiency, delivering faster response times and reduced latency.",
    ],
    tech: ["Python", "TypeScript", "YAML", "Mantine"],
  },
];


