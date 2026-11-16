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
  { label: 'Expertise', href: '/expertise', icon: 'account_tree' },
  { label: 'Experience', href: '/experience', icon: 'timeline' },
  { label: 'Writing', href: '/writing', icon: 'article' },
  { label: 'Teaching', href: '/teaching', icon: 'school' },
  { label: 'About', href: '/about', icon: 'person' },
  { label: 'Contact', href: '/contact', icon: 'alternate_email' },
];

export const PROFILE_IDENTITY: ProfileIdentity = {
  name: 'Mirza Hammad Baig',
  role: 'Data Analyst · BI Architect',
  descriptor: 'Data • BI • Architecture • AI',
  valueChain: 'DATA → SYSTEM → INSIGHT → DECISION → IMPACT',
  summary:
    'Building Power BI models, reporting and validated pipelines for retail and logistics decisions.',
  status: 'Retail and logistics BI · Pakistan / Remote',
  email: 'mirzahammadbaig147@gmail.com',
  location: 'Karachi & Islamabad, Pakistan / Remote',
  coreStack: [
    'Power BI',
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
      href: 'https://www.linkedin.com/in/mirzahammadbaig1/',
      platform: 'linkedin',
    },
    {
      label: 'GitHub',
      href: 'https://github.com/mirzahammad1',
      platform: 'github',
    },
    {
      label: 'Medium',
      href: 'https://medium.com/@mirzahammadbaig147',
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
  title: 'Mirza Hammad Baig | Data Analyst & BI Architect',
  titleTemplate: '%s | Mirza Hammad Baig',
  description:
    'Mirza Hammad Baig builds BI models and validated reporting for retail and logistics with Power BI, DAX, SQL and Python.',
  siteUrl: 'https://hammad-portfolio-sage.vercel.app',
};

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: 'retail-store-weekly-sales-analysis',
    title: 'Weekly performance reporting for department stores',
    summary: 'A mobile-ready Power BI report brings weekly growth, year-to-date sales, rankings and commission logic into one management view.',
    domain: 'Retail', category: 'Business Intelligence', role: 'BI analyst & report designer', primaryUser: 'Retail leadership and store managers', period: '2026', status: 'Public Power BI project',
    problem: 'Weekly point-of-sale exports made it hard to compare stores and departments quickly, especially on mobile.',
    background: 'I organized weekly sales into a date, store, and department star schema, then built a focused report for management review.',
    objectives: [], technologies: ['Power BI', 'Star schema', 'DAX', 'Excel / CSV'],
    responsibilities: ['Modelled weekly POS data around date, store, and department dimensions.', 'Built current-week versus prior-year growth views and year-to-date measures.', 'Added top and bottom performance views and the documented commission rule.'],
    outcomes: ['Published a Power BI report, PDF export, and project README.', 'Brought the weekly performance questions into one management view.'],
    githubUrl: 'https://github.com/mirzahammad1/Weekly-Sales-Dashboard-for-Departmental-Stores', image: '/visuals/weekly-sales-report.jpg', imageAlt: 'Executive summary page from the published EvoMart Power BI report, showing sales, growth, rankings and monthly performance', imageKind: 'evidence', sourceNote: 'Public GitHub repository; data provenance is not stated',
  },
  {
    slug: 'fragrance-stock-alert-pipeline',
    title: 'Replenishment engine for 88 retail stores',
    summary: 'A validated Python pipeline turns sales and stock exports into ranked replenishment, transfer and allocation decisions across 88 stores.',
    domain: 'Retail inventory', category: 'Data Engineering', role: 'Data analyst & automation engineer', primaryUser: 'General managers, supply chain and merchandising leads', period: '2026', status: 'Professional work',
    problem: 'Fast-selling fragrance lines could run low while slower stock remained at other locations.',
    background: 'I built a modular process to validate exports, estimate stock cover, allocate warehouse stock, and recommend transfers before publishing the results for review.',
    objectives: [], technologies: ['Python', 'Pandas', 'OpenPyXL', 'ReportLab', 'SQL-ready pipeline'],
    responsibilities: ['Designed validation guards for missing, duplicate, and drifting input data.', 'Calculated sales velocity, five-day demand, stock cover, and replenishment needs.', 'Generated executive email, PDF, and Excel outputs for review.'],
    outcomes: ['The documented pipeline covers 88 retail stores and 76 fragrance SKUs.', 'It produces a store pack and auditable data-quality log alongside replenishment recommendations.'],
    image: '/visuals/fragrance-pipeline.svg', imageAlt: 'Fragrance reporting flow from sales and stock exports through validation, store-product analysis and allocation', imageKind: 'evidence', sourceNote: 'Fragrance Stock Alert technical documentation',
  },
  {
    slug: 'logistics-bi-ecosystem',
    title: 'Enterprise BI for a nationwide logistics network',
    summary: 'Power BI systems gave operations, finance and commercial teams clearer views of delivery performance, cash collection and revenue yield.',
    domain: 'Logistics', category: 'Business Intelligence', role: 'BI architect & analyst', primaryUser: 'Operations, finance, sales and regional managers', period: '2024–2026', status: 'Professional work',
    problem: 'Operational, finance, and commercial teams needed consistent views of delivery progress and business performance.',
    background: 'At Muller & Phipps Logistics, I built reporting across operations, finance, sales, customer service, HR and governance. The work covered 15 completed BI initiatives and two listed as in progress.',
    objectives: [], technologies: ['Power BI', 'SQL Server', 'T-SQL', 'DAX', 'Row-level security'],
    responsibilities: ['Built reporting for delivery status, SLA milestones, cash collections, and revenue yield.', 'Connected models to SQL warehouse data and scheduled refreshes.', 'Designed zone-aware access and a shared executive reporting experience.'],
    outcomes: ['Consolidated reporting across several functions into documented Power BI solutions.', 'Documented a role and zone-based RLS approach for regional reporting.'],
    image: '/visuals/logistics-sla.svg', imageAlt: 'Four stages used to track logistics service levels: network, mid-mile, arrival at destination and first delivery attempt', imageKind: 'evidence', sourceNote: 'Muller & Phipps BI portfolio documentation',
  },
  {
    slug: 'edu-assist-multi-agent-system',
    title: 'KIET EDU Assist',
    summary: 'A multi-agent campus assistant that combines FAQs, document search, website retrieval, and an admin view for query analytics.',
    domain: 'Education', category: 'AI / Automation', role: 'Project lead & developer', period: '2026', status: 'In development',
    problem: 'Students and staff need current answers across scattered university information sources.',
    background: 'The public repository describes iteration 6 of 7. A FastAPI service routes questions through FAQ, vector-search, scraping, and language-model paths.',
    objectives: [], technologies: ['FastAPI', 'LangChain', 'FAISS', 'MongoDB', 'Docker'],
    responsibilities: ['Built a streaming API and orchestrated specialist retrieval agents.', 'Added an admin interface for FAQs, query logs, and re-indexing.', 'Used consistency checks and fallback paths to handle uncertain answers.'],
    outcomes: ['Published code and technical documentation for the current iteration.', 'The roadmap still includes stronger access control and automated crawling.'],
    githubUrl: 'https://github.com/mirzahammad1/EDU_Assist_Multiagent', image: '/placeholders/code.jpg', sourceNote: 'Public GitHub repository and technical documentation',
  },
  {
    slug: 'retail-next-best-action',
    title: 'Retail Next Best Action Assistant',
    summary: 'A Streamlit prototype that recommends stock actions from sales and inventory files, with a reason and a manager-review step.',
    domain: 'Retail inventory', category: 'AI / Automation', role: 'System designer & developer', period: '2026', status: 'Prototype',
    problem: 'Retail managers need a repeatable way to identify stock-out risk and excess inventory across stores.',
    background: 'The prototype calculates sales velocity, stock cover, sell-through, shortages, and surpluses before applying a rules engine.',
    objectives: [], technologies: ['Python', 'Streamlit', 'Pandas', 'SQLite', 'Plotly'],
    responsibilities: ['Built data validation and inventory KPI calculations.', 'Implemented replenish, transfer, discount, promote, exit, and monitor recommendations.', 'Added approve, reject, and edit flows for manager review.'],
    outcomes: ['Published a tested prototype with explained recommendations.', 'The system does not execute stock movements or change ERP prices.'],
    githubUrl: 'https://github.com/mirzahammad1/StrreamLit_Test_NBA', image: '/placeholders/workspace.jpg', sourceNote: 'Public GitHub repository',
  },
  {
    slug: 'uniassist-plus',
    title: 'UniAssist+',
    summary: 'A bootcamp final project that pairs university document retrieval with tools for drafting emails and academic documents.',
    domain: 'Education', category: 'AI / Automation', role: 'AI application developer', period: '2026', status: 'Bootcamp project',
    problem: 'University support questions require both grounded answers and routine action support.',
    background: 'The project separates information queries, tool requests, and hybrid queries. Its retrieval flow searches FAQs, documents, and website content.',
    objectives: [], technologies: ['Python', 'FAISS', 'MongoDB', 'Hugging Face', 'Playwright'],
    responsibilities: ['Built RAG and action-routing paths.', 'Connected FAQ search, document embeddings, and website retrieval.', 'Added email and document-generation tools.'],
    outcomes: ['Published code and project documentation as an Atom Camp final project.'],
    githubUrl: 'https://github.com/mirzahammad1/Atom_Camp_Final_Project', image: '/placeholders/collaboration.jpg', sourceNote: 'Public GitHub repository',
  },
  {
    slug: 'bank-churn-prediction',
    title: 'Bank Churn Prediction App',
    summary: 'A Random Forest churn model served through FastAPI with a Streamlit interface for individual predictions.',
    domain: 'Banking', category: 'Data Analytics', role: 'Model & application developer', period: '2026', status: 'Course project',
    problem: 'A churn model is more useful when a team can query it through a service and simple interface.',
    background: 'This MLOps assignment trains on a 10,000-row bank dataset and connects the saved model to an API and web app.',
    objectives: [], technologies: ['Python', 'scikit-learn', 'FastAPI', 'Streamlit'],
    responsibilities: ['Trained and saved a Random Forest classifier.', 'Built prediction and health endpoints.', 'Created a Streamlit input flow for customer attributes.'],
    outcomes: ['The repository reports roughly 84% accuracy and 86% ROC-AUC on its evaluation data.', 'Published a working API and front-end structure.'],
    githubUrl: 'https://github.com/mirzahammad1/bank-churn-prediction', image: '/placeholders/finance.jpg', sourceNote: 'Public GitHub repository; metrics are reported by the project',
  },
  {
    slug: 'loan-approval-credit-risk',
    title: 'Loan Approval & Credit Risk Analysis',
    summary: 'An explainable machine-learning study comparing models for loan approval prediction and examining approval drivers.',
    domain: 'Finance', category: 'Data Analytics', role: 'Analyst & developer', period: '2026', status: 'Public project',
    problem: 'Loan decisions need both predictive performance and a clear explanation of which inputs drive the result.',
    background: 'The notebook cleans loan data, studies applicant segments, and compares KNN, Decision Tree, and Random Forest models.',
    objectives: [], technologies: ['Python', 'Pandas', 'scikit-learn', 'Jupyter'],
    responsibilities: ['Validated and cleaned application data.', 'Compared models with cross-validation and classification metrics.', 'Documented interpretability in a PDF report.'],
    outcomes: ['Published the notebook, data, README, and interpretability report.', 'Selected Random Forest as the best-performing model in the project comparison.'],
    githubUrl: 'https://github.com/mirzahammad1/Loan-Approval-Prediction-Credit-Risk-Analysis-ML', image: '/placeholders/finance.jpg', sourceNote: 'Public GitHub repository',
  },
  {
    slug: 'zameen-real-estate-eda',
    title: 'Pakistan Real Estate EDA',
    summary: 'An exploratory analysis of Zameen.com property listings, with a cleaned dataset, notebook, charts, and executive report.',
    domain: 'Real estate', category: 'Data Analytics', role: 'Data analyst', period: '2025–2026', status: 'Public project',
    problem: 'Property listings vary in price formats, area units, names, and quality, making comparison difficult.',
    background: 'The project standardizes listing data and explores price patterns by city, property type, and size.',
    objectives: [], technologies: ['Python', 'Pandas', 'Seaborn', 'Jupyter'],
    responsibilities: ['Cleaned currency, area, city, missing-value, and duplicate fields.', 'Engineered price-per-square-foot and time features.', 'Built visual analysis and a PDF report.'],
    outcomes: ['Published a cleaned dataset, notebook, visuals, and report.'],
    githubUrl: 'https://github.com/mirzahammad1/zameen-eda-project', image: '/placeholders/property.jpg', sourceNote: 'Public GitHub repository',
  },
  {
    slug: 'hospitality-booking-dataset',
    title: 'Global Hospitality Booking Dataset',
    summary: 'A simulated 150,000-booking dataset and case-study brief for exploring revenue, cancellations, guest segments, and property performance.',
    domain: 'Hospitality', category: 'Data Analytics', role: 'Dataset author', period: '2026', status: 'Published dataset',
    problem: 'Realistic multi-property booking data is hard to use for a complete revenue-analytics practice case.',
    background: 'The repository publishes CSV and Excel files for 15 simulated properties across eight cities, plus the questions an analyst could investigate.',
    objectives: [], technologies: ['CSV', 'Excel', 'Data design', 'Case-study framing'],
    responsibilities: ['Structured the simulated booking dataset and field descriptions.', 'Framed questions on cancellation loss, channels, guest segments, and complaints.'],
    outcomes: ['Published the dataset and case-study brief.'],
    githubUrl: 'https://github.com/mirzahammad1/Global-Hospitality-Booking-Analytics-A-Data-Case-Study', image: '/placeholders/workspace.jpg', sourceNote: 'Public GitHub repository',
  },
  {
    slug: 'forest-cover-classification',
    title: 'Forest CoverType Classification',
    summary: 'A deep-learning course project comparing a tuned neural network with Random Forest on structured forest-cover data.',
    domain: 'Machine learning', category: 'Data Analytics', role: 'Model developer', period: '2026', status: 'Course project',
    problem: 'A more complex model is not always the best choice for tabular classification.',
    background: 'The notebook tests architecture, regularization, and optimizer choices on the UCI CoverType dataset, then compares against a tree-based baseline.',
    objectives: [], technologies: ['Python', 'Deep learning', 'Random Forest', 'Jupyter'],
    responsibilities: ['Tuned a neural-network baseline.', 'Evaluated performance beyond accuracy on an imbalanced seven-class problem.', 'Compared the result with Random Forest.'],
    outcomes: ['Published the notebook and comparative method.'],
    githubUrl: 'https://github.com/mirzahammad1/Forest-CoverType-Classification', image: '/placeholders/analytics.jpg', sourceNote: 'Public GitHub repository',
  },
  {
    slug: 'fruit-image-classification',
    title: 'Fruit Image Classification',
    summary: 'A transfer-learning study using MobileNetV2, augmentation, and error analysis to classify fruit images.',
    domain: 'Computer vision', category: 'Data Analytics', role: 'Model developer', period: '2026', status: 'Course project',
    problem: 'Image classification can be expensive to train from scratch when compute and data are limited.',
    background: 'The notebook adds a classification head to a pre-trained MobileNetV2 model and evaluates it on held-out images.',
    objectives: [], technologies: ['Python', 'MobileNetV2', 'Transfer learning', 'Jupyter'],
    responsibilities: ['Prepared train, validation, and test splits.', 'Added augmentation and a custom classification head.', 'Reviewed classification errors.'],
    outcomes: ['Published the notebook and project README.'],
    githubUrl: 'https://github.com/mirzahammad1/Fruit-Image-Classification-using-Transfer-Learning', image: '/placeholders/retail.jpg', sourceNote: 'Public GitHub repository',
  },
  {
    slug: 'restaurant-review-sentiment',
    title: 'Restaurant Review Sentiment Analysis',
    summary: 'An NLP project classifying restaurant reviews and comparing text representation and modelling approaches.',
    domain: 'Natural language processing', category: 'Data Analytics', role: 'NLP project author', period: '2026', status: 'Course project',
    problem: 'Large review sets are difficult to read one by one when looking for overall sentiment patterns.',
    background: 'The notebook works with a balanced set of 1,000 reviews and compares approaches to positive and negative classification.',
    objectives: [], technologies: ['Python', 'NLP', 'Jupyter', 'Text classification'],
    responsibilities: ['Prepared and represented review text.', 'Compared classification approaches.', 'Documented the workflow in a notebook and README.'],
    outcomes: ['Published the code, notebook, and sample review data.'],
    githubUrl: 'https://github.com/mirzahammad1/Restaurant-Reviews-Sentiment-Analysis-NLP-', image: '/placeholders/collaboration.jpg', sourceNote: 'Public GitHub repository',
  },
];

export const EXPERIENCE_ITEMS: ExperienceItem[] = [
  {
    id: 'ideas-gul-ahmed',
    role: 'Assistant Manager – Data Analyst',
    company: 'Ideas by Gul Ahmed',
    context: 'Multi-category retail brand in Pakistan.',
    period: 'Jun 2026 – Present',
    isCurrent: true,
    appointmentType: 'Current appointment',
    scopeOverview:
      'I own sales, inventory and retail-performance analytics and the reporting models behind them.',
    responsibilities: [
      'Own sales, inventory and retail-performance reporting for commercial teams.',
      'Design star-schema models and agree KPI definitions with business stakeholders.',
      'Maintain SQL and Power Query transformations behind scheduled reporting.',
      'Review dashboard questions with department leaders before changing measures or views.',
    ],
    technologies: ['Power BI', 'SQL Server', 'DAX', 'Data Architecture', 'Power Query'],
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
    role: 'Data Analytics Instructor & Mentor',
    company: 'Atomcamp',
    context: 'Data education and bootcamp provider in Pakistan.',
    period: 'Apr 2026 – Present',
    isCurrent: true,
    appointmentType: 'Academic & Training Appointment',
    scopeOverview:
      'I teach Power BI, DAX, SQL, Python and exploratory analysis through applied problems and project feedback.',
    responsibilities: [
      'Teach Power BI, SQL, Python and exploratory analysis with hands-on exercises.',
      'Design applied business capstones around imperfect datasets.',
      'Mentor learners through data models, project decisions and portfolio explanations.',
      'Explain relationships, star schemas and DAX filter context from first principles.',
    ],
    technologies: ['Power BI', 'DAX', 'SQL', 'Python', 'Exploratory Data Analysis (EDA)', 'Curriculum Design'],
    supportedDepartments: ['Data Science & Analytics Faculty', 'Corporate Upskilling Programs'],
  },
  {
    id: 'muller-phipps',
    role: 'Data Analyst (Power BI)',
    company: 'Muller & Phipps Logistics',
    context: 'Nationwide Pakistani courier and cash-on-delivery network.',
    period: 'May 2024 – Jun 2026',
    appointmentType: 'Fast-Track Promotion: Jr. BI Dev → Data Analyst (< 1 Year)',
    scopeOverview:
      'I built BI reporting across operations, finance, sales, customer service, HR and governance. Fifteen initiatives were completed; two were listed as in progress.',
    responsibilities: [
      'Designed delivery and SLA reporting across network, mid-mile, arrival and first-attempt stages.',
      'Built COD reconciliation and commercial-yield views for finance and sales teams.',
      'Introduced zone-aware row-level security for reporting across 11 regional zones.',
      'Refactored DAX measures and star-schema models, and scheduled SQL and Power Query refreshes.',
      'Trained department users to interpret and use their reports.',
    ],
    technologies: ['Power BI', 'SQL Server', 'DAX', 'Power Query', 'Row-Level Security (RLS)'],
    supportedDepartments: ['Logistics Operations', 'Sales & Distribution', 'Finance', 'Human Resources', 'C-Suite Executive'],
    verifiedOutcomes: [
      {
        metric: '15',
        label: 'Completed BI initiatives',
        detail: 'Two additional initiatives were listed as in progress.',
      },
      {
        metric: '6',
        label: 'Business functions',
        detail: 'Operations, finance, sales, customer service, HR and governance.',
      },
    ],
  },
];

export const CAPABILITIES: CapabilityItem[] = [
  {
    id: 'data-analytics',
    title: 'Data Analytics',
    category: 'Exploratory & Diagnostic Analysis',
    description:
      'Cleaning inconsistent data, defining comparable measures, and finding the drivers behind a result.',
    skills: ['Exploratory Data Analysis (EDA)', 'Cohort Analysis', 'Variance Diagnosis', 'Statistical Profiling'],
    icon: 'analytics',
  },
  {
    id: 'business-intelligence',
    title: 'Business Intelligence',
    category: 'Executive Delivery & UX',
    description:
      'Building Power BI reports, DAX measures, and access rules around the questions managers need to answer.',
    skills: ['Power BI Desktop & Service', 'Advanced DAX', 'Row-Level Security (RLS)', 'Interactive Report UX'],
    icon: 'dashboard',
  },
  {
    id: 'data-architecture',
    title: 'Data Architecture',
    category: 'Modeling Foundations',
    description:
      'Defining the grain, relationships, and shared measures behind reliable reporting.',
    skills: ['Kimball Star Schema', 'Dimensional Modeling', 'Conformed Dimensions', 'Semantic Layer Design'],
    icon: 'schema',
  },
  {
    id: 'data-engineering',
    title: 'Data Engineering',
    category: 'Pipelines & Warehousing',
    description:
      'Using SQL, Power Query, and validated Python pipelines to turn changing inputs into dependable outputs.',
    skills: ['SQL Server / T-SQL', 'Python', 'Power Query (M)', 'Automated Scheduled Pipelines'],
    icon: 'pipeline',
  },
  {
    id: 'ai-automation',
    title: 'AI & Automation',
    category: 'Modern Intelligent Systems',
    description:
      'Building retrieval assistants and reviewable recommendations with clear source and approval paths.',
    skills: ['LangChain', 'Vector Embeddings', 'RAG Architectures', 'Workflow Automation'],
    icon: 'ai',
  },
  {
    id: 'teaching-mentoring',
    title: 'Teaching & Mentoring',
    category: 'Knowledge Transfer',
    description:
      'Teaching Power BI, SQL, Python, and analytical thinking through hands-on work and project feedback.',
    skills: ['Data Analytics Instructor @ Atomcamp', 'Applied Curriculum Design', 'Corporate Upskilling', 'Case-Study Mentorship'],
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
      { name: 'Power Query', context: 'Repeatable transformations behind scheduled reporting' },
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
      'Transitioning teams from local Excel files to governed Power BI reporting with role-based security.',
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
    id: 'project-mentoring',
    title: 'Projects & Analytical Communication',
    track: 'Applied Project Track',
    description:
      'Turning a question into a scoped analysis, validating assumptions, and explaining the result to a non-technical reader.',
    coreConcepts: ['Problem Framing', 'Validation', 'Case-Study Writing', 'Project Feedback'],
    targetAudience: 'Learners building applied portfolio projects.',
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
    id: "medium.208b0f687edb",
    title: "The Interconnected Web of Data: How Fields Overlap and Work Together",
    series: "The Data Field",
    category: "Data foundations",
    summary: "Every role in the Data Field depends on every other. The most common failures aren’t technical — they’re relational.",
    mediumUrl: "https://medium.com/@mirzahammadbaig147/the-interconnected-web-of-data-how-fields-overlap-and-work-together-208b0f687edb",
    publishedAt: "2026-03-31T05:01:01Z",
    isFeatured: true,
  },
  {
    id: "medium.762ab14d8aee",
    title: "Mapping the Data Field: Key Areas, Roles & Specializations",
    series: "The Data Field",
    category: "Data foundations",
    summary: "Knowing the landscape exists is one thing. Having an actual map — with roles, tools, and paths — is what lets you navigate it with intention.",
    mediumUrl: "https://medium.com/@mirzahammadbaig147/mapping-the-data-field-key-areas-roles-specializations-762ab14d8aee",
    publishedAt: "2026-03-30T05:01:00Z",
    isFeatured: true,
  },
  {
    id: "medium.fb9ac9772a40",
    title: "The Data Field: Exploring the Landscape of Modern Data",
    series: "The Data Field",
    category: "Data foundations",
    summary: "I spent months learning about data before I realized I had only been learning about pieces. This is about the moment I finally saw the whole picture.",
    mediumUrl: "https://medium.com/@mirzahammadbaig147/the-data-field-exploring-the-landscape-of-modern-data-fb9ac9772a40",
    publishedAt: "2026-03-28T05:01:01Z",
    isFeatured: true,
  },
  {
    id: "medium.7ffae9bd28f6",
    title: "Structured, Unstructured & Semi-Structured Data Explained",
    series: "The Data Field",
    category: "Data foundations",
    summary: "Not all data looks the same — and that difference determines almost everything about how you work with it.",
    mediumUrl: "https://medium.com/@mirzahammadbaig147/structured-unstructured-semi-structured-data-explained-7ffae9bd28f6",
    publishedAt: "2026-03-27T05:01:00Z",
    isFeatured: false,
  },
  {
    id: "medium.39f261e24bfc",
    title: "Data vs Information vs Knowledge vs Wisdom: The DIKW Pyramid",
    series: "The Data Field",
    category: "Data foundations",
    summary: "Having data doesn’t mean having answers. This framework changed how I think about everything I work with.",
    mediumUrl: "https://medium.com/@mirzahammadbaig147/data-vs-information-vs-knowledge-vs-wisdom-the-dikw-pyramid-39f261e24bfc",
    publishedAt: "2026-03-26T12:01:24Z",
    isFeatured: false,
  },
  {
    id: "medium.7342b87d2010",
    title: "From Ledgers to AI: The Fascinating History of Data",
    series: "The Data Field",
    category: "Data foundations",
    summary: "Data didn’t start with computers. It started with human beings trying to remember things — and that instinct has never changed.",
    mediumUrl: "https://medium.com/@mirzahammadbaig147/from-ledgers-to-ai-the-fascinating-history-of-data-7342b87d2010",
    publishedAt: "2026-03-25T11:50:42Z",
    isFeatured: false,
  },
  {
    id: "medium.6f9bc9e1d816",
    title: "What is Data? The Invisible Force Shaping Our World",
    series: "The Data Field",
    category: "Data foundations",
    summary: "Data is everywhere — and most people have never stopped to ask what it actually is. Here’s the real answer.",
    mediumUrl: "https://medium.com/@mirzahammadbaig147/what-is-data-the-invisible-force-shaping-our-world-6f9bc9e1d816",
    publishedAt: "2026-03-25T11:32:07Z",
    isFeatured: false,
  },
  {
    id: "medium.9e9ed3c67140",
    title: "The Data Field Series: Why I Started This — and What It’s Really About",
    series: "The Data Field",
    category: "Data foundations",
    summary: "A series for curious minds who want to understand the world of data — not just learn tools.",
    mediumUrl: "https://medium.com/@mirzahammadbaig147/the-data-field-series-what-is-data-the-invisible-force-shaping-our-world-9e9ed3c67140",
    publishedAt: "2026-02-23T08:58:33Z",
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
    examples: ['SQL Server', 'ETL Pipelines', 'Power Query (M)', 'Scheduled Batch Ingestion'],
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
