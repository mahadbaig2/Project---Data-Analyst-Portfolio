export interface ExpertiseStory {
  introduction: string;
  approach: string[];
  projects: { slug: string; connection: string }[];
}

export const EXPERTISE_STORIES: Record<string, ExpertiseStory> = {
  'data-analytics': {
    introduction: 'I use analysis to move from a loosely framed question to a defensible comparison. That begins with understanding the grain and quality of the data, then choosing measures that help someone act.',
    approach: [
      'I first check whether records can be compared: units, missing values, duplicates, time periods, and segment definitions all matter before a chart does.',
      'I then test the question at several levels—overall trend, relevant segments, and exceptions—so a summary does not hide the cases that need attention.',
    ],
    projects: [
      { slug: 'zameen-real-estate-eda', connection: 'Standardized property areas and prices, then compared listings by city, type, and price per square foot.' },
      { slug: 'loan-approval-credit-risk', connection: 'Cleaned application data and compared approval drivers alongside model performance and interpretability.' },
      { slug: 'fragrance-stock-alert-pipeline', connection: 'Turned sales velocity and stock cover into store-level replenishment priorities.' },
      { slug: 'retail-store-weekly-sales-analysis', connection: 'Made weekly, year-over-year, and year-to-date sales questions comparable in one report.' },
    ],
  },
  'business-intelligence': {
    introduction: 'My BI work is built around a decision, a trustworthy measure, and a report that lets the right person investigate it. A dashboard is useful only when its numbers and drill paths hold up under scrutiny.',
    approach: [
      'I define the reporting grain and metric rules before designing the page. In logistics, delivery status, service milestones, and cash collections each require different source logic and ownership.',
      'I design the visible layer for rapid orientation, then provide enough detail for managers to investigate a branch, store, or period without building a new spreadsheet.',
    ],
    projects: [
      { slug: 'logistics-bi-ecosystem', connection: 'Built documented Power BI reporting across operations, finance, sales, and executive views, including zone-aware access.' },
      { slug: 'retail-store-weekly-sales-analysis', connection: 'Combined weekly growth, year-to-date results, rankings, and a commission rule in a management report.' },
      { slug: 'fragrance-stock-alert-pipeline', connection: 'Published the same stock decisions in executive, store-level, PDF, and Excel formats for different readers.' },
    ],
  },
  'data-architecture': {
    introduction: 'Reliable analysis needs a clear structure underneath it. I make the grain of each fact explicit, separate reusable dimensions, and keep business definitions consistent across views.',
    approach: [
      'I model around what the business actually measures: a weekly store sale, a consignment milestone, or a store-product stock position. That choice determines which joins and comparisons are valid.',
      'I prefer models that can be checked and extended. Conformed dates and locations, explicit measures, and documented access rules reduce disagreement when reporting expands.',
    ],
    projects: [
      { slug: 'retail-store-weekly-sales-analysis', connection: 'Used a date, store, and department star schema to make weekly and year-to-date comparisons repeatable.' },
      { slug: 'logistics-bi-ecosystem', connection: 'Connected warehouse data to Power BI models and documented role- and zone-based reporting access.' },
      { slug: 'fragrance-stock-alert-pipeline', connection: 'Constructed a complete store-by-product analysis grid so missing sales rows would not hide stock positions.' },
    ],
  },
  'data-engineering': {
    introduction: 'I build data flows with the next run in mind. A useful pipeline must make bad inputs visible, preserve clear rules, and produce outputs people can check.',
    approach: [
      'I put validation before calculations: missing columns, duplicate keys, incomplete periods, or unexpected row-count changes should stop a report before it distributes a misleading recommendation.',
      'I separate ingestion, cleaning, metrics, and publication so a changed export format or reporting need does not require rewriting the whole workflow.',
    ],
    projects: [
      { slug: 'fragrance-stock-alert-pipeline', connection: 'Designed a modular Python flow from daily exports through validation, demand estimates, allocation, and multi-format reports.' },
      { slug: 'logistics-bi-ecosystem', connection: 'Used SQL warehouse data, Power Query transformations, and scheduled refresh to support recurring BI reporting.' },
      { slug: 'retail-next-best-action', connection: 'Validated uploaded sales and inventory files before computing stock indicators and recommendations.' },
    ],
  },
  'ai-automation': {
    introduction: 'I use automation where it makes a decision easier to prepare or a question easier to answer. I keep the rules and sources visible, especially where an AI-generated answer could be uncertain.',
    approach: [
      'For information assistants, I route a question to the simplest reliable source first: a known FAQ, a document, a current webpage, or a language model when synthesis is needed.',
      'For operational recommendations, I keep calculated indicators and human approval separate. The system can explain an action without silently executing it.',
    ],
    projects: [
      { slug: 'edu-assist-multi-agent-system', connection: 'Routes campus questions through specialist retrieval paths with streaming responses and consistency checks.' },
      { slug: 'uniassist-plus', connection: 'Separates grounded answers from tool requests and hybrid tasks in a university-support assistant.' },
      { slug: 'retail-next-best-action', connection: 'Uses a rules engine to explain inventory actions that a manager can approve, reject, or edit.' },
    ],
  },
  'teaching-mentoring': {
    introduction: 'Teaching is part of how I practice data work: make the reasoning visible, give learners a realistic problem, and review the choices behind their result.',
    approach: [
      'At Atomcamp I teach across Power BI, SQL, Python, and exploratory analysis. I start with a business question before asking learners to choose a formula or a chart.',
      'My mentoring focuses on moving from a working exercise to a clear project: clean inputs, explain assumptions, validate the answer, and communicate what a decision-maker should do with it.',
    ],
    projects: [
      { slug: 'retail-store-weekly-sales-analysis', connection: 'Shows the modeling, DAX, and report-design decisions behind the BI work I teach.' },
      { slug: 'zameen-real-estate-eda', connection: 'Shows how I turn untidy source data into a documented analysis and executive report.' },
      { slug: 'loan-approval-credit-risk', connection: 'Shows why model comparison and explanation matter alongside a working prediction.' },
    ],
  },
};
