import {
  NavigationItem,
  ProfileIdentity,
  CaseStudy,
  ExperienceItem,
  CapabilityItem,
  TechnologyGroup,
  TeachingTopic,
  EducationItem,
  CertificationItem,
  ArticleItem,
  CareerPrinciple,
  IdentityPillar,
} from '@/lib/types/portfolio';

export const CANONICAL_NAVIGATION: NavigationItem[] = [
  { label: 'Home', href: '/', icon: 'home' },
  { label: 'Work', href: '/work', icon: 'analytics' },
  { label: 'Experience', href: '/experience', icon: 'timeline' },
  { label: 'Expertise', href: '/expertise', icon: 'account_tree' },
  { label: 'Teaching', href: '/teaching', icon: 'school' },
  { label: 'Writing', href: '/writing', icon: 'article' },
  { label: 'About', href: '/about', icon: 'person' },
  { label: 'Contact', href: '/about#contact', icon: 'alternate_email' },
];

export const PROFILE_IDENTITY: ProfileIdentity = {
  name: 'Mirza Hammad Baig',
  role: 'Data Analyst · BI Solutions Architect',
  descriptor: 'Data • BI • Architecture • AI',
  valueChain: 'DATA → SYSTEM → INSIGHT → DECISION → IMPACT',
  summary:
    'Turning complex enterprise data into reliable systems, clear insights, and high-confidence business decisions.',
  status: 'Enterprise Systems Ready • Available for Strategic Roles',
  email: 'mirzahammadbaig147@gmail.com',
  location: 'Karachi & Islamabad, Pakistan / Remote',
  coreStack: [
    'Power BI',
    'Microsoft Fabric',
    'SQL Server',
    'Python',
    'DAX',
    'Star Schema Modeling',
    'Power Query / ETL',
    'AI / RAG Workflows',
  ],
  socialLinks: [
    {
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/mirzahammad/',
      platform: 'linkedin',
    },
    {
      label: 'GitHub',
      href: 'https://github.com/hammadbaig',
      platform: 'github',
    },
    {
      label: 'Medium',
      href: 'https://medium.com/@mirzahammadbaig',
      platform: 'medium',
    },
    {
      label: 'Email',
      href: 'mailto:mirzahammadbaig147@gmail.com',
      platform: 'email',
    },
  ],
  cvUrl: '/files/Mirza_Hammad_Baig_CV.pdf',
};

export const SITE_METADATA = {
  title: 'Mirza Hammad Baig | Data Analyst & BI Solutions Architect',
  titleTemplate: '%s | Mirza Hammad Baig',
  description:
    'Executive analytics workspace and portfolio of Mirza Hammad Baig. End-to-end data systems, dimensional star schemas, Power BI delivery, and executive decision support.',
  siteUrl: 'https://mirzahammad.com',
};

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: 'retail-store-weekly-sales-analysis',
    title: 'Weekly Sales Dashboard for Departmental Stores',
    summary:
      'A management-focused Power BI reporting solution monitoring weekly store and department sales performance, YoY trends, YTD variance, and automated departmental manager commissions.',
    domain: 'Retail & Multi-Branch Commerce',
    category: 'Business Intelligence',
    organization: 'Departmental Retail Chain',
    role: 'Lead BI Architect & Analyst',
    period: 'Production Deployment',
    status: 'Production Deployed',
    confidentiality: 'Client-Anonymized Enterprise Solution',
    isFeatured: true,
    problem:
      'Store leadership faced multi-day delays collating weekly POS spreadsheet extracts across branches. Manual calculations created recurring commission formula errors and prevented executives from comparing current performance with historical YoY benchmarks in time for weekly operational meetings.',
    background:
      'Designed around a CEO and senior leadership requirement for a concise, trustworthy reporting experience accessible on desktop and tablet during store walkthroughs.',
    primaryUser: 'CEO, Chief Commercial Officer, and Regional Store Directors',
    objectives: [
      {
        id: '01',
        title: 'Weekly Store & Department Sales',
        description: 'Track granular performance by branch location, merchandise category, and product group.',
      },
      {
        id: '02',
        title: 'Prior Year Comparative Analysis',
        description: 'Dynamically evaluate current-week revenue against the exact corresponding week of the prior calendar year.',
      },
      {
        id: '03',
        title: 'Cumulative YTD Totals',
        description: 'Deliver running Year-to-Date volume with automatic calendar cutoffs and variance against target.',
      },
      {
        id: '04',
        title: 'Automated Commission Logic',
        description: 'Eliminate manual calculation of store manager incentive tiers through validated DAX formula automation.',
      },
      {
        id: '05',
        title: 'Outlier & Anomaly Detection',
        description: 'Surface underperforming branches and margin contractions for operational intervention.',
      },
      {
        id: '06',
        title: 'Executive Readability',
        description: 'Deliver clean, uncluttered visual layouts optimized for executive review.',
      },
    ],
    dataSources: ['Weekly POS CSV extracts', 'Store Master Dimensions (Excel)', 'Department Category Hierarchy'],
    responsibilities: [
      'Ingested and cleansed weekly POS extracts using automated Power Query M scripts.',
      'Designed a conformed dimensional star schema linking Sales Fact to Date, Store, and Department dimensions.',
      'Authored performant DAX measures for YTD, YoY%, and tiered commission thresholds.',
      'Built a calm, light-mode executive Power BI reporting suite with drill-through navigation.',
    ],
    technologies: ['Power BI', 'DAX', 'Star Schema', 'Power Query (M)', 'Excel / CSV', 'Data Modeling'],
    architecture: {
      textSummary:
        'Weekly POS files and Store Master spreadsheets are ingested via Power Query, cleansed and assigned surrogate keys, loaded into a Kimball Star Schema with Dim_Date, Dim_Store, Dim_Dept, and Fact_WeeklySales, processed through a DAX semantic measure engine, and rendered in Power BI.',
      nodes: [
        {
          id: 'source',
          title: 'Source Ingestion',
          category: 'Source',
          items: ['Weekly_POS.csv', 'Store_Master.xlsx', 'Dept_Hierarchy.csv'],
          detail: 'Automated folder drop monitoring',
        },
        {
          id: 'etl',
          title: 'Power Query ETL',
          category: 'Transformation',
          items: ['Type Coercion & Trimming', 'Surrogate Key Creation', 'Weekly Date Anchoring'],
          detail: 'Automated M-Code pipeline',
        },
        {
          id: 'model',
          title: 'Dimensional Star Schema',
          category: 'Data Model',
          items: ['Fact_WeeklySales', 'Dim_Date (Calendar)', 'Dim_Store (Location)', 'Dim_Department'],
          detail: '1:N single-direction relationships',
        },
        {
          id: 'dax',
          title: 'DAX Measure Layer',
          category: 'Calculations',
          items: ['Total Weekly Sales', 'YoY Sales Variance %', 'Cumulative YTD', 'Manager Commission Tier'],
          detail: 'Optimized filter context formulas',
        },
        {
          id: 'presentation',
          title: 'Executive Delivery',
          category: 'Reporting',
          items: ['Executive Summary Canvas', 'Department Matrix', 'Store Comparison Slicers'],
          detail: 'Desktop and tablet interactive views',
        },
      ],
      edges: [
        { from: 'source', to: 'etl', label: 'Raw Extracts' },
        { from: 'etl', to: 'model', label: 'Structured Tables' },
        { from: 'model', to: 'dax', label: 'Tabular Model' },
        { from: 'dax', to: 'presentation', label: 'Live Visual Layer' },
      ],
    },
    calculations: [
      {
        measure: 'Total Weekly Sales',
        formula: 'SUM(Fact_WeeklySales[SalesAmount])',
        purpose: 'Core additive sales measure anchoring all weekly and historical aggregations.',
      },
      {
        measure: 'Prior Year Weekly Sales',
        formula: 'CALCULATE([Total Weekly Sales], SAMEPERIODLASTYEAR(Dim_Date[Date]))',
        purpose: 'Provides direct like-for-like comparison against the equivalent prior year period.',
      },
      {
        measure: 'Sales YoY Growth %',
        formula: 'DIVIDE([Total Weekly Sales] - [Prior Year Weekly Sales], [Prior Year Weekly Sales], 0)',
        purpose: 'Safe division variance metric with zero-handling for new or newly opened store branches.',
      },
      {
        measure: 'Cumulative YTD Sales',
        formula: 'TOTALYTD([Total Weekly Sales], Dim_Date[Date])',
        purpose: 'Computes running fiscal year performance adjusted dynamically by calendar dimension.',
      },
    ],
    outcomes: [
      'Eliminated recurring weekly spreadsheet consolidation, shifting delivery from 3 days post-week to automated Monday morning availability.',
      'Standardized store manager commission calculations across all branches, removing manual calculation disputes.',
      'Provided clear executive drill-through from nationwide overview down to individual department margin contributions.',
    ],
    decisions: [
      'Adopted strict 1:N single-directional relationships to prevent ambiguous filter paths in tabular memory.',
      'Pre-calculated weekly date boundaries in the Date dimension to ensure lightning-fast SAMEPERIODLASTYEAR evaluations.',
      'Segregated raw POS transaction tables from analytical views to support seamless schema scaling.',
    ],
    learnings: [
      'Clear definition of fiscal week cutoffs with business stakeholders is essential before modeling calendar dimensions.',
      'Explicit measure branching in DAX provides superior maintainability over deeply nested monolithic formulas.',
    ],
    githubUrl: 'https://github.com/hammadbaig',
    previewImage: {
      alt: 'Power BI Weekly Sales Dashboard screenshot preview',
      caption: 'Executive overview displaying weekly gross sales, YoY variance, department distribution, and store comparisons.',
    },
  },
  {
    slug: 'hospitality-booking-analytics',
    title: 'Global Hospitality Booking Analytics & Revenue Intelligence',
    summary:
      'Multivariate analytical study and interactive reporting suite exploring reservation pacing, cancellation hazard rates, portfolio ADR distributions, and revenue retention strategies.',
    domain: 'Hospitality & Revenue Management',
    category: 'Data Analytics',
    role: 'Lead Data Analyst',
    period: 'Analytics Implementation',
    status: 'Operational',
    confidentiality: 'Public Benchmark Dataset Analysis',
    isFeatured: true,
    problem:
      'Hotel operators faced volatile occupancy rates and unexpected cancellations, causing lost room inventory during peak booking windows. Management lacked structured statistical models identifying lead-time thresholds and customer segments with high cancellation probability.',
    background:
      'Applied exploratory data analysis, correlation matrices, and dimensional modeling across 150,000+ booking records to uncover factors driving reservation cancellations and yield variances.',
    primaryUser: 'Revenue Directors and Hotel General Managers',
    objectives: [
      {
        id: '01',
        title: 'Cancellation Hazard Modeling',
        description: 'Quantify cancellation likelihood by booking channel, customer type, and advance lead time.',
      },
      {
        id: '02',
        title: 'Portfolio ADR Tracking',
        description: 'Track Average Daily Rate movements across seasons, customer tiers, and room categories.',
      },
      {
        id: '03',
        title: 'Lead Time Thresholds',
        description: 'Isolate optimal booking horizons to optimize non-refundable deposit policies.',
      },
      {
        id: '04',
        title: 'Interactive Executive Reporting',
        description: 'Deliver intuitive Power BI dashboards allowing property managers to filter by market segment.',
      },
    ],
    dataSources: ['Transactional Booking Records (150,000+ rows)', 'Customer Segment Master', 'Channel Dimension'],
    responsibilities: [
      'Executed multivariate exploratory data analysis in Python using Pandas, NumPy, and Seaborn.',
      'Identified statistically significant correlation between advance lead time and cancellation rates.',
      'Modeled cleaned dimensional data into Power BI with custom booking pacing DAX measures.',
      'Synthesized executive revenue management recommendations for booking deposit windows.',
    ],
    technologies: ['Python', 'Power BI', 'Pandas', 'DAX', 'Seaborn', 'Statistical Modeling'],
    architecture: {
      textSummary:
        'Raw booking records are cleaned and profiled in Python, statistical relationships and cancellation hazards are modeled, data is structured into a clean dimensional schema, and loaded into Power BI with scenario slicers.',
      nodes: [
        {
          id: 'data',
          title: 'Raw Booking Logs',
          category: 'Source',
          items: ['150K+ Reservation Rows', '52 Relational Attributes', 'Channel & Customer Logs'],
          detail: 'Multi-property booking logs',
        },
        {
          id: 'py',
          title: 'Python EDA & Stats',
          category: 'Analysis',
          items: ['Pandas Cleansing', 'Correlation Analysis', 'Lead-Time Hazard Modeling'],
          detail: 'Statistical validation pipeline',
        },
        {
          id: 'bi',
          title: 'Power BI Yield Suite',
          category: 'Reporting',
          items: ['ADR & RevPAR Metrics', 'Cancellation Pacing Slicers', 'Customer Segment Matrix'],
          detail: 'Interactive scenario modeling',
        },
      ],
      edges: [
        { from: 'data', to: 'py', label: 'Data Cleaning' },
        { from: 'py', to: 'bi', label: 'Analytical Schema' },
      ],
    },
    outcomes: [
      'Uncovered that reservations made >90 days in advance had a cancellation rate exceeding 45%, providing quantitative backing for tiered deposit policies.',
      'Built a centralized pacing dashboard replacing fragmented spreadsheet exports across properties.',
    ],
    decisions: [
      'Utilized Python for statistical validation before committing final calculation metrics to the Power BI semantic model.',
    ],
    githubUrl: 'https://github.com/hammadbaig',
    previewImage: {
      alt: 'Hospitality Booking Analytics Power BI interface',
      caption: 'Multivariate dashboard detailing ADR trends, lead-time correlations, and cancellation patterns.',
    },
  },
  {
    slug: 'edu-assist-multi-agent-system',
    title: 'EDU Assist Multi-Agent AI Analytics System',
    summary:
      'An agentic AI architecture and Retrieval-Augmented Generation (RAG) system designed to analyze learner queries, synthesize curriculum insights, and streamline academic support analytics.',
    domain: 'EdTech & Applied AI Systems',
    category: 'AI / Automation',
    role: 'AI & Data Systems Builder',
    period: 'Applied Architecture',
    status: 'Operational',
    confidentiality: 'Open Architecture Project',
    isFeatured: true,
    problem:
      'Educational platforms struggle to provide rapid, context-aware assistance to hundreds of concurrent students working on data and coding capstones. Staff spend hours answering repetitive questions instead of focusing on high-impact personalized mentorship.',
    background:
      'Developed as an architectural demonstration combining vector semantic search, multi-agent query routing, and analytical telemetry to scale academic enablement.',
    primaryUser: 'Course Instructors, Teaching Assistants, and Self-Paced Learners',
    objectives: [
      {
        id: '01',
        title: 'Context-Aware Query Routing',
        description: 'Classify incoming student questions and route them to specialized knowledge agents.',
      },
      {
        id: '02',
        title: 'Semantic Curriculum Retrieval',
        description: 'Embed curriculum documentation, code samples, and course rubrics into a vector index.',
      },
      {
        id: '03',
        title: 'Grounded Responses',
        description: 'Enforce strict citation grounding so synthetic answers never invent course requirements.',
      },
      {
        id: '04',
        title: 'Telemetry & Difficulty Insights',
        description: 'Track aggregate question topics to highlight curriculum areas requiring instructor reinforcement.',
      },
    ],
    dataSources: ['Course Curriculum Markdown', 'Code Repositories', 'Lecture Transcripts & FAQs'],
    responsibilities: [
      'Designed multi-agent routing logic in Python utilizing LangChain and LangGraph paradigms.',
      'Chunked and embedded course materials into semantic vector collections with metadata filtering.',
      'Implemented safety guards preventing out-of-domain hallucinations and enforcing citation references.',
      'Built analytical logging to monitor question topics and response accuracy.',
    ],
    technologies: ['Python', 'LangChain', 'RAG', 'Vector Embeddings', 'LLMs', 'FastAPI'],
    architecture: {
      textSummary:
        'Student inquiries pass through an intent classifier, retrieve verified curriculum context from a vector store, generate a grounded answer through a specialized agent, and log query telemetry for instructor review.',
      nodes: [
        {
          id: 'input',
          title: 'Student Query',
          category: 'Input',
          items: ['Technical Question', 'Code Error Trace', 'Concept Inquiry'],
          detail: 'Web & Discord interfaces',
        },
        {
          id: 'router',
          title: 'Intent & Safety Router',
          category: 'Routing',
          items: ['Topic Classification', 'Safety & Scope Guardrails', 'Agent Assignment'],
          detail: 'Deterministic prompt router',
        },
        {
          id: 'rag',
          title: 'Vector Retrieval Layer',
          category: 'Knowledge',
          items: ['Curriculum Chunk Embeddings', 'Code Snippets Library', 'Course Rubrics'],
          detail: 'Semantic similarity search',
        },
        {
          id: 'agent',
          title: 'Synthesis Agent',
          category: 'Generation',
          items: ['Grounded Answer Synthesis', 'Source Citations', 'Follow-up Prompts'],
          detail: 'Strict evidence bounds',
        },
      ],
      edges: [
        { from: 'input', to: 'router', label: 'Query' },
        { from: 'router', to: 'rag', label: 'Semantic Query' },
        { from: 'rag', to: 'agent', label: 'Curated Context' },
      ],
    },
    outcomes: [
      'Proved that multi-agent routing paired with strict RAG context reduces resolution delays while ensuring zero hallucinated curriculum requirements.',
      'Generated actionable feedback on common student stumbling blocks in DAX and SQL for instructors.',
    ],
    githubUrl: 'https://github.com/hammadbaig',
    previewImage: {
      alt: 'EDU Assist Multi-Agent System Architecture diagram',
      caption: 'Agentic orchestration workflow highlighting vector search, intent classification, and grounded synthesis.',
    },
  },
];

export const EXPERIENCE_ITEMS: ExperienceItem[] = [
  {
    id: 'ideas-gul-ahmed',
    role: 'Assistant Manager – Data Analyst',
    company: 'Ideas by Gul Ahmed',
    period: 'Jun 2026 – Present',
    isCurrent: true,
    appointmentType: 'Current Strategic Appointment',
    scopeOverview:
      'Leading enterprise retail data analytics, cross-functional data modeling, executive KPI governance, and self-service BI infrastructure across multi-category commercial operations.',
    responsibilities: [
      'Own sales, inventory, and retail performance analytics across extensive omnichannel product categories.',
      'Architect resilient enterprise data models and star schemas ensuring high computation speed and governance.',
      'Partner directly with commercial directors and department heads to translate business questions into production dashboards.',
      'Optimize existing SQL and Power Query ETL pipelines for reliable scheduled refreshes.',
      'Establish self-service BI practices and data definitions to eliminate cross-departmental metric discrepancies.',
    ],
    technologies: ['Power BI', 'Microsoft Fabric', 'SQL Server', 'DAX', 'Data Architecture', 'ETL Automation'],
    supportedDepartments: ['Executive Leadership', 'Commercial Sales', 'Retail Operations', 'Supply Chain & Merchandising'],
    verifiedOutcomes: [
      {
        metric: 'Multi-Category',
        label: 'Omnichannel Governance',
        detail: 'Unified reporting standards across nationwide retail operations.',
      },
      {
        metric: 'Star Schema',
        label: 'Architectural Rigor',
        detail: 'Standardized conformable dimensions across sales and inventory datasets.',
      },
    ],
  },
  {
    id: 'atomcamp-lecturer',
    role: 'Power BI Lecturer (Part-Time)',
    company: 'Atomcamp',
    period: 'Apr 2026 – Present',
    isCurrent: true,
    appointmentType: 'Academic & Training Appointment',
    scopeOverview:
      'Instructing cohorts on production-grade Power BI, DAX modeling, SQL pipeline architecture, and applied business analytics.',
    responsibilities: [
      'Deliver intensive, hands-on lectures in Power BI, SQL, Python for Data Analysis, and Exploratory Data Analysis (EDA).',
      'Design applied business capstones using messy real-world datasets rather than textbook scenarios.',
      'Teach data modeling principles, relationship cardinality, star schema design, and filter context navigation in DAX.',
      'Mentor learners through portfolio development, code reviews, and industry readiness preparation.',
    ],
    technologies: ['Power BI', 'DAX', 'SQL', 'Python', 'Exploratory Data Analysis (EDA)', 'Curriculum Design'],
    supportedDepartments: ['Data Science & Analytics Faculty', 'Corporate Upskilling Programs'],
  },
  {
    id: 'muller-phipps',
    role: 'Data Analyst (Power BI)',
    company: 'Muller & Phipps Logistics',
    period: 'May 2024 – Jun 2026',
    appointmentType: 'Fast-Track Promotion: Jr. BI Dev → Data Analyst (< 1 Year)',
    scopeOverview:
      'Promoted rapidly based on end-to-end delivery of enterprise BI reporting across nationwide logistics, warehouse operations, sales, HR, and corporate leadership.',
    responsibilities: [
      'Shipped 20+ production dashboards in Power BI and Microsoft Fabric with robust role-based security.',
      'Engineered nationwide supply-chain telemetry dashboards, fleet turnaround metrics, and inventory health tracking.',
      'Refactored slow, resource-heavy DAX measures and established optimized star-schema dimensional models.',
      'Automated scheduled data refresh pipelines using SQL Server views and Power Query transformations.',
      'Conducted corporate training workshops for internal department users to accelerate BI adoption.',
    ],
    technologies: ['Power BI', 'SQL Server', 'DAX', 'Microsoft Fabric', 'ETL Automation', 'Row-Level Security (RLS)'],
    supportedDepartments: ['Logistics Operations', 'Sales & Distribution', 'Finance', 'Human Resources', 'C-Suite Executive'],
    verifiedOutcomes: [
      {
        metric: '20+ Prod',
        label: 'Dashboards Shipped',
        detail: 'Enterprise reporting deployed into daily operational use.',
      },
      {
        metric: '5 Units',
        label: 'Departments Supported',
        detail: 'Cross-functional delivery across operations, sales, HR, and finance.',
      },
    ],
  },
  {
    id: 'independent-consulting',
    role: 'BI & Data Systems Consultant',
    company: 'Independent Strategic Practice',
    period: '2023 – Present',
    appointmentType: 'Consulting & Solutions Delivery',
    scopeOverview:
      'Delivering end-to-end data modeling, custom tabular architectures, and executive reporting solutions for independent businesses and commercial clients.',
    responsibilities: [
      'Advise clients on transitioning from ad-hoc spreadsheet reporting to structured relational BI environments.',
      'Design performant DAX calculation models and interactive visual storyboards tailored to management decisions.',
      'Build custom automated data pipelines and data audit frameworks for retail, hospitality, and service domains.',
    ],
    technologies: ['Power BI', 'SQL', 'Python', 'Data Modeling', 'Business Intelligence Consulting'],
  },
];

export const CAPABILITIES: CapabilityItem[] = [
  {
    id: 'data-analytics',
    title: 'Data Analytics',
    category: 'Exploratory & Diagnostic Analysis',
    description:
      'Translating multi-table transactional schemas into coherent business narratives, diagnosing historical variance, and identifying operational leakages.',
    skills: ['Exploratory Data Analysis (EDA)', 'Cohort Analysis', 'Variance Diagnosis', 'Statistical Profiling'],
    icon: 'analytics',
  },
  {
    id: 'business-intelligence',
    title: 'Business Intelligence',
    category: 'Executive Delivery & UX',
    description:
      'Designing highly polished, executive-ready Power BI reporting environments with advanced DAX calculation logic, row-level security (RLS), and dynamic reporting flows.',
    skills: ['Power BI Desktop & Service', 'Advanced DAX', 'Row-Level Security (RLS)', 'Interactive Report UX'],
    icon: 'dashboard',
  },
  {
    id: 'data-architecture',
    title: 'Data Architecture',
    category: 'Modeling Foundations',
    description:
      'Building resilient dimensional data models using Kimball methodology, conformed dimensions, surrogate keys, and governed semantic layers.',
    skills: ['Kimball Star Schema', 'Dimensional Modeling', 'Conformed Dimensions', 'Semantic Layer Design'],
    icon: 'schema',
  },
  {
    id: 'data-engineering',
    title: 'Data Engineering',
    category: 'Pipelines & Warehousing',
    description:
      'Developing automated ETL/ELT pipelines, orchestrating Lakehouse structures with Microsoft Fabric, and writing high-performance SQL scripts.',
    skills: ['Microsoft Fabric', 'SQL Server / T-SQL', 'Power Query (M)', 'Automated Scheduled Pipelines'],
    icon: 'pipeline',
  },
  {
    id: 'ai-automation',
    title: 'AI & Automation',
    category: 'Modern Intelligent Systems',
    description:
      'Building Retrieval-Augmented Generation (RAG) workflows, multi-agent query routing, and analytical automation that simplify executive data discovery.',
    skills: ['LangChain / LangGraph', 'Vector Embeddings', 'RAG Architectures', 'Workflow Automation'],
    icon: 'ai',
  },
  {
    id: 'teaching-mentoring',
    title: 'Training & Mentoring',
    category: 'Knowledge Transfer',
    description:
      'Empowering professionals and corporate teams to master modern BI. Delivering hands-on workshops on DAX, modeling, and practical analytical storytelling.',
    skills: ['Power BI Faculty @ Atomcamp', 'Applied Curriculum Design', 'Corporate Upskilling', 'Case-Study Mentorship'],
    icon: 'school',
  },
];

export const TECHNOLOGY_GROUPS: TechnologyGroup[] = [
  {
    category: 'Analytics & Visualization',
    description: 'Executive reporting suites, semantic DAX measures, and drill-through storyboards.',
    technologies: [
      { name: 'Power BI', context: 'Semantic models, report design, service administration' },
      { name: 'Excel / Power Query', context: 'Data validation, quick prototyping, ad-hoc modeling' },
      { name: 'Jaspersoft', context: 'Enterprise operational and paginated reporting' },
    ],
  },
  {
    category: 'Data & Engineering Foundations',
    description: 'Relational data warehouses, lakehouses, dimensional modeling, and ETL.',
    technologies: [
      { name: 'SQL Server / T-SQL', context: 'Complex queries, CTEs, window functions, indexing' },
      { name: 'Microsoft Fabric', context: 'Unified lakehouse, semantic layer orchestration' },
      { name: 'Azure Data Factory', context: 'Cloud data pipeline orchestration and scheduled transfers' },
      { name: 'Dimensional Modeling', context: 'Kimball star schemas, snowflake models, surrogate keys' },
    ],
  },
  {
    category: 'Programming & Data Science',
    description: 'Data wrangling, exploratory data analysis, and predictive modeling.',
    technologies: [
      { name: 'Python', context: 'Core scripting for data analysis and automation' },
      { name: 'Pandas', context: 'Data cleaning, tabular transformations, aggregation' },
      { name: 'NumPy', context: 'Numerical computations and vectorized operations' },
      { name: 'Scikit-learn', context: 'Applied classification and regression benchmarks' },
    ],
  },
  {
    category: 'AI & Modern Systems',
    description: 'Intelligent query routing, vector search, and assistive analytical agents.',
    technologies: [
      { name: 'LLMs & RAG', context: 'Grounded document synthesis and executive Q&A' },
      { name: 'Vector Embeddings', context: 'Semantic text retrieval and similarity search' },
      { name: 'LangChain / Agents', context: 'Multi-step reasoning and analytical automation' },
    ],
  },
];

export const PROBLEMS_I_WORK_ON = [
  {
    title: 'Disconnected Reporting',
    description:
      'Different departments using conflicting numbers for the same metric. I establish unified semantic models and single sources of truth.',
  },
  {
    title: 'Slow Manual Spreadsheet Workflows',
    description:
      'Hours lost each week copy-pasting CSVs and fixing broken VLOOKUPs. I build automated, scheduled SQL and Power Query pipelines.',
  },
  {
    title: 'Poor Data Modeling & Slow Dashboards',
    description:
      'Reports that take 30+ seconds to load due to flat tables and inefficient DAX. I refactor models into clean star schemas with fast query times.',
  },
  {
    title: 'Limited Boardroom KPI Visibility',
    description:
      'Executives drowning in detailed transaction rows without seeing big-picture trends. I build calm, decision-oriented visual summaries.',
  },
  {
    title: 'Scaling BI Infrastructure',
    description:
      'Transitioning growing teams from local Excel files to enterprise Microsoft Fabric and Power BI Service with role-based security.',
  },
  {
    title: 'Integrating AI into Analytics',
    description:
      'Exploring where RAG and LLM systems genuinely accelerate data discovery without introducing hallucinations into business metrics.',
  },
];

export const PROFESSIONAL_APPROACH = [
  { step: '01', title: 'Understand Business Decision', detail: 'Identify the exact commercial decision or question before writing a line of code.' },
  { step: '02', title: 'Inspect Data Reality', detail: 'Audit data sources, missing values, anomalies, and cardinality realities.' },
  { step: '03', title: 'Design Star Schema', detail: 'Construct a resilient dimensional model separating facts from conformable dimensions.' },
  { step: '04', title: 'Build Analytical Layer', detail: 'Author robust, reusable DAX measures and automated scheduled ETL transformations.' },
  { step: '05', title: 'Validate with Stakeholders', detail: 'Review outputs directly with commercial owners to confirm metric accuracy.' },
  { step: '06', title: 'Deploy & Enable Users', detail: 'Publish to governed environments, configure security, and train team members.' },
  { step: '07', title: 'Continuously Improve', detail: 'Monitor report performance, query latency, and evolving decision requirements.' },
];

export const TEACHING_TOPICS: TeachingTopic[] = [
  {
    id: 'power-bi',
    title: 'Enterprise Power BI & DAX Architecture',
    track: 'Business Intelligence Track',
    description:
      'From star-schema modeling and Power Query ETL to advanced filter context navigation, time-intelligence calculations, and executive dashboard design.',
    coreConcepts: ['Star Schema Principles', 'Evaluation & Filter Context in DAX', 'Time Intelligence Measures', 'Row-Level Security (RLS)'],
    targetAudience: 'Aspiring BI developers, business analysts, and corporate reporting teams.',
  },
  {
    id: 'sql',
    title: 'SQL for Data Analysis & Modeling',
    track: 'Data Foundation Track',
    description:
      'Writing performant relational queries, multi-table joins, subqueries, Common Table Expressions (CTEs), window functions, and data audit queries.',
    coreConcepts: ['Complex Joins & Aggregations', 'Window Functions (RANK, ROW_NUMBER)', 'CTEs and Modular Queries', 'Data Cleansing & Validation'],
    targetAudience: 'Analysts transitioning from spreadsheets to relational databases.',
  },
  {
    id: 'python-eda',
    title: 'Python for Data Analysis & EDA',
    track: 'Analytics & Programming Track',
    description:
      'Exploratory Data Analysis using Pandas, NumPy, and Seaborn. Identifying distributions, correlations, outliers, and preparing clean analytical datasets.',
    coreConcepts: ['Pandas Data Wrangling', 'Statistical Profiling & Distribution', 'Correlation & Cohort Analysis', 'Visualization with Seaborn/Matplotlib'],
    targetAudience: 'Professionals seeking programmatic data analysis capability.',
  },
  {
    id: 'eda-methodology',
    title: 'Applied Exploratory Data Analysis (EDA)',
    track: 'Analytical Thinking Track',
    description:
      'Framing business hypotheses, conducting systematic univariate and bivariate exploration, and communicating empirical insights to non-technical stakeholders.',
    coreConcepts: ['Hypothesis Generation', 'Handling Missingness & Outliers', 'Data Storytelling', 'Executive Summary Formulation'],
    targetAudience: 'Learners preparing real-world portfolio capstones.',
  },
];

export const LEARNING_FLOW = [
  { step: '01', title: 'Concept', description: 'Grasp the core data or architectural concept without syntax overload.' },
  { step: '02', title: 'Guided Exercise', description: 'Work through a structured demonstration with real operational data.' },
  { step: '03', title: 'Business Problem', description: 'Face a realistic business challenge with messy, uncurated tables.' },
  { step: '04', title: 'Case Study', description: 'Design the dimensional model, author calculations, and build the solution.' },
  { step: '05', title: 'Feedback', description: 'Receive rigorous architectural feedback on performance and readability.' },
  { step: '06', title: 'Independent Application', description: 'Replicate the methodology independently on production problems.' },
];

export const MENTORSHIP_THEMES = [
  { title: 'Technical Guidance', description: 'Debugging complex DAX filter context, SQL execution plans, and pipeline errors.' },
  { title: 'Project Feedback', description: 'Constructive review of dashboard compositions, visual hierarchies, and color restraint.' },
  { title: 'Case Study Development', description: 'Structuring portfolio projects as business narratives rather than tool demonstrations.' },
  { title: 'Business Thinking', description: 'Helping analysts ask commercial questions rather than merely pulling requested numbers.' },
  { title: 'Career-Relevant Readiness', description: 'Practical advice for interviews, technical screenings, and cross-functional communication.' },
];

export const WRITING_SERIES: ArticleItem[] = [
  {
    id: 'what-is-data',
    title: 'What is Data? Beyond Rows and Columns',
    series: 'Understanding the Data Field',
    category: 'Foundations',
    summary: 'An exploration of what data fundamentally represents in modern organizations, the DIKW pyramid, and structured vs unstructured realities.',
    mediumUrl: 'https://medium.com/@mirzahammadbaig',
    isFeatured: true,
  },
  {
    id: 'star-schema-vs-flat-tables',
    title: 'Why Star Schemas Always Outperform Flat Tables in Power BI',
    series: 'Understanding the Data Field',
    category: 'Architecture',
    summary: 'A technical breakdown of VertiPaq compression, memory consumption, relationship cardinality, and why single-table models fail at scale.',
    mediumUrl: 'https://medium.com/@mirzahammadbaig',
    isFeatured: true,
  },
  {
    id: 'mapping-the-data-field',
    title: 'Mapping the Data Field: Infrastructure, Engineering, and Analytics',
    series: 'Understanding the Data Field',
    category: 'Ecosystem',
    summary: 'Disentangling overlapping roles across data engineering, business intelligence, data architecture, and applied machine learning.',
    mediumUrl: 'https://medium.com/@mirzahammadbaig',
    isFeatured: false,
  },
  {
    id: 'filter-context-demystified',
    title: 'Filter Context Demystified: The Mental Model Every DAX Developer Needs',
    series: 'Understanding the Data Field',
    category: 'DAX & BI',
    summary: 'Deconstructing row context transition, CALCULATE modifiers, and common pitfalls when calculating running totals and YoY variances.',
    mediumUrl: 'https://medium.com/@mirzahammadbaig',
    isFeatured: false,
  },
  {
    id: 'data-governance-reality',
    title: 'Data Governance in Practice: The Unsung Foundation of Self-Service BI',
    series: 'Understanding the Data Field',
    category: 'Governance',
    summary: 'Why self-service analytics without conformable dimensions and certified semantic models creates corporate chaos.',
    mediumUrl: 'https://medium.com/@mirzahammadbaig',
    isFeatured: false,
  },
  {
    id: 'ai-in-modern-bi',
    title: 'Where LLMs and RAG Actually Fit in Enterprise Business Intelligence',
    series: 'Understanding the Data Field',
    category: 'Modern AI',
    summary: 'Separating marketing hype from practical value: using agentic RAG for knowledge discovery while keeping deterministic data models for calculations.',
    mediumUrl: 'https://medium.com/@mirzahammadbaig',
    isFeatured: false,
  },
];

export const KNOWLEDGE_MAP_LAYERS = [
  {
    layer: 'Data Infrastructure',
    description: 'Hardware, storage, data lakes, relational databases, cloud hosting, and security boundaries.',
    examples: ['SQL Server', 'Azure Blob', 'PostgreSQL', 'Cloud Infrastructure'],
  },
  {
    layer: 'Data Engineering',
    description: 'Extraction, transformation, pipeline orchestration, data cleansing, and lakehouse curation.',
    examples: ['Microsoft Fabric', 'ETL Pipelines', 'Power Query (M)', 'Scheduled Batch Ingestion'],
  },
  {
    layer: 'Data Architecture & Modeling',
    description: 'Kimball dimensional star schemas, relational integrity, conformable dimensions, and semantic metrics.',
    examples: ['Star Schema', 'Surrogate Keys', 'Fact/Dimension Modeling', 'DAX Calculation Engine'],
  },
  {
    layer: 'Analytics & Business Intelligence',
    description: 'Executive dashboards, variance analysis, drill-through exploration, and decision-support reporting.',
    examples: ['Power BI Desktop & Service', 'Interactive Dashboards', 'ADR & Yield Analytics', 'Executive Briefings'],
  },
  {
    layer: 'Data Science & Machine Learning',
    description: 'Predictive modeling, classification, hazard rates, pattern detection, and agentic workflows.',
    examples: ['Python EDA', 'Scikit-Learn', 'RAG Retrieval', 'Statistical Hazard Models'],
  },
  {
    layer: 'Data Governance (Spanning All Layers)',
    description: 'Data definitions, row-level security, auditability, data privacy, and organizational literacy.',
    examples: ['Metric Certification', 'Row-Level Security', 'Schema Documentation', 'Knowledge Transfer'],
  },
];

export const IDENTITY_PILLARS: IdentityPillar[] = [
  {
    number: '01',
    title: 'The Analyst',
    role: 'Diagnostic Clarity',
    description:
      'Translates complex datasets into actionable commercial understanding through exploratory analysis, cohort variance, and KPI diagnosis.',
    focusArea: 'EDA, Statistical Variance, Trend Analysis',
  },
  {
    number: '02',
    title: 'The Architect',
    role: 'System Foundation',
    description:
      'Designs models, star schemas, and data pipelines that analytics teams and C-suite leadership depend on with high confidence.',
    focusArea: 'Kimball Star Schemas, DAX, Fabric',
  },
  {
    number: '03',
    title: 'The Educator',
    role: 'Knowledge Transfer',
    description:
      'Teaches and mentors professionals in applied analytics, translating advanced technical concepts into practical business impact.',
    focusArea: 'Atomcamp Faculty, Corporate Workshops',
  },
  {
    number: '04',
    title: 'The Builder',
    role: 'Emerging Capability',
    description:
      'Experiments with modern AI, RAG architectures, automation pipelines, and analytical systems to scale organizational decision velocity.',
    focusArea: 'Agentic RAG, Python Automation, Modern BI',
  },
];

export const CAREER_PRINCIPLES: CareerPrinciple[] = [
  {
    number: '01',
    title: 'Business Before Dashboard',
    axiom: 'Commercial First',
    description:
      'A visually stunning chart that answers the wrong question delivers zero value. Deeply understand the commercial decision before designing reports.',
  },
  {
    number: '02',
    title: 'Reliable Models Matter',
    axiom: 'Dimensional Integrity',
    description:
      'Fast DAX calculations and trusted numbers require sound dimensional modeling. Clean data foundations make reporting effortless.',
  },
  {
    number: '03',
    title: 'Automate Repetition',
    axiom: 'Zero Manual Routines',
    description:
      'Eliminate manual copy-paste spreadsheet routines. Scheduled ETL pipelines and governed models save hours and prevent human error.',
  },
  {
    number: '04',
    title: 'Explain the Insight',
    axiom: 'Actionable Clarity',
    description:
      'Data analysis is incomplete until stakeholders grasp what changed, why it changed, and what action needs to be taken.',
  },
  {
    number: '05',
    title: 'Share Knowledge',
    axiom: 'Institutional Growth',
    description:
      'Building organizational data maturity through teaching, clear documentation, and mentoring creates lasting institutional capability.',
  },
];

export const EDUCATION_ITEMS: EducationItem[] = [
  {
    id: 'kiet-bscs',
    degree: 'BS Computer Science',
    institution: 'Karachi Institute of Economics and Technology (KIET)',
    period: '2022 – 2026',
    description:
      'Academic grounding in database management systems (DBMS), data structures and algorithms, software architecture, relational query theory, and computational modeling.',
  },
  {
    id: 'ait-dae',
    degree: 'DAE Electrical & Electronics Engineering',
    institution: 'Aligarh Institute of Technology',
    period: '2019 – 2022',
    honors: 'Gold Medalist',
    description:
      'Foundational training in hardware systems, analytical problem solving, logic circuit design, and instrumentation with academic gold medalist distinction.',
  },
];

export const CERTIFICATIONS: CertificationItem[] = [
  {
    id: 'datacamp-python',
    title: 'Data Analytics with Python',
    issuer: 'DataCamp',
    credentialType: 'Professional Verified Track',
    skills: ['Python', 'Pandas', 'NumPy', 'Data Wrangling', 'Exploratory Analysis'],
  },
  {
    id: 'datacamp-powerbi',
    title: 'Data Analysis in Power BI',
    issuer: 'DataCamp',
    credentialType: 'Professional Verified Track',
    skills: ['Power BI', 'DAX Measures', 'Star Schema Modeling', 'Report UX'],
  },
  {
    id: 'atomcamp-analytics',
    title: 'Data Analytics BootCamp',
    issuer: 'Atomcamp',
    credentialType: 'Intensive Applied Program',
    skills: ['Enterprise BI Capstones', 'SQL Server', 'Business Case Execution'],
  },
  {
    id: 'atomcamp-ai',
    title: 'Data Science and AI BootCamp',
    issuer: 'Atomcamp',
    credentialType: 'Intensive Applied Program',
    skills: ['Machine Learning', 'Predictive Modeling', 'Python EDA'],
  },
];
