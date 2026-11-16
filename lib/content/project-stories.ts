export interface ProjectStory {
  decision: string;
  hardPart: string;
  impact: string;
  scope: string;
  relatedExpertise: string[];
}

export const PROJECT_STORIES: Record<string, ProjectStory> = {
  'retail-store-weekly-sales-analysis': {
    decision: 'I chose a weekly sales fact table with separate date, store, and department dimensions so the same measures could answer several management questions without duplicating logic. The report compares a week with its counterpart in the prior year, shows year-to-date sales, and applies the commission rule documented in the repository.',
    hardPart: 'A total sales figure can hide whether growth came from one large store or across the network. I paired the headline comparison with top and bottom rankings, then kept the report compact enough for a manager to review on a phone.',
    impact: 'The published Power BI report brings weekly growth, department performance and manager commission into one management view, with a PDF export for review.',
    scope: 'Public Power BI case study. Source-data provenance is not stated.',
    relatedExpertise: ['business-intelligence', 'data-architecture', 'data-analytics'],
  },
  'fragrance-stock-alert-pipeline': {
    decision: 'I designed this as a sequence of validation, harmonization, metrics, allocation, and publication. The rules combine a 15-day and a 7-day sales rate to estimate five-day demand, then rank low-cover stores before allocating warehouse stock or suggesting a transfer.',
    hardPart: 'Sales exports and stock snapshots do not naturally form a complete store-product picture. The pipeline builds the full 88-store by 76-SKU grid, excludes testers and non-retail locations, logs negative balances, and stops on duplicate keys or major row-count drift. That keeps missing or corrupt rows from becoming confident recommendations.',
    impact: 'The pipeline produces an executive briefing, store-level packs, Excel workbooks and an audit log. Allocation decisions across 88 stores and 76 SKUs can be reviewed and traced.',
    scope: 'Professional retail project. The documented system is production-ready; business impact figures are not public.',
    relatedExpertise: ['data-engineering', 'data-analytics', 'data-architecture'],
  },
  'logistics-bi-ecosystem': {
    decision: 'I treated delivery status, intermediate SLA milestones, cash collections, and commercial yield as distinct questions rather than forcing them into one generic dashboard. SQL warehouse data and Power BI models supported daily operational views as well as executive reporting.',
    hardPart: 'A nationwide shipment can be on time at one stage and late at another. I tracked network, mid-mile, arrival-at-destination, and first-attempt stages so a branch problem is not mistaken for a linehaul problem. Zone-aware row-level security gives regional managers relevant detail without exposing other zones.',
    impact: 'I completed 15 BI initiatives across operations, finance, sales, customer service, HR and governance. The reporting gave teams shared ways to review delivery, COD reconciliation and commercial yield.',
    scope: 'Professional work at Muller & Phipps Logistics, 2024–2026. Two additional initiatives were listed as in progress in the portfolio record.',
    relatedExpertise: ['business-intelligence', 'data-architecture', 'data-engineering'],
  },
  'edu-assist-multi-agent-system': {
    decision: 'I routed common campus questions to a direct FAQ path before invoking heavier retrieval or a language model. The system can then search indexed documents or current web information and stream a response through FastAPI.',
    hardPart: 'University information changes, and one retrieval source will not answer every question. The public iteration uses specialist paths, consistency checks, fallbacks, and an admin area for FAQ edits and re-indexing. That makes the source of an answer easier to maintain than a single unstructured chatbot prompt.',
    impact: 'The public repository includes the assistant architecture, streaming service, query logs and an admin view for managing FAQs and retrieval sources.',
    scope: 'Public project in development, at iteration 6 of 7 in the repository.',
    relatedExpertise: ['ai-automation', 'data-engineering'],
  },
  'retail-next-best-action': {
    decision: 'I put deterministic inventory measures ahead of any optional AI explanation. Sales velocity, stock cover, sell-through, shortages, and surpluses feed rules for replenishing, transferring, discounting, promoting, exiting, or monitoring a product.',
    hardPart: 'An automated recommendation can sound authoritative while the source file is incomplete. The prototype validates uploads, gives each action a plain-language reason, and requires a manager to approve, reject, or edit it. It does not quietly change ERP prices or move stock.',
    impact: 'The Streamlit prototype produces explained stock recommendations, supports scenario review and records a manager’s decision before any operational action.',
    scope: 'Public prototype. It recommends actions but does not change ERP prices or move stock.',
    relatedExpertise: ['ai-automation', 'data-engineering', 'data-analytics'],
  },
  'uniassist-plus': {
    decision: 'I separated information requests from action requests. A question can move through FAQ, document, and website retrieval; an email or document request goes to a tool; a hybrid request gets context before the tool runs.',
    hardPart: 'A university assistant needs to ground answers in current sources while also handling routine tasks. The project uses vector search and a check on generated answers so the language model is not treated as the sole source of truth.',
    impact: 'The published assistant brings FAQ and document retrieval together with email and document tools, demonstrating a complete support workflow.',
    scope: 'Atom Camp final project; no campus deployment is stated in the repository.',
    relatedExpertise: ['ai-automation', 'data-engineering'],
  },
  'bank-churn-prediction': {
    decision: 'I moved the model beyond a notebook: training produces a saved Random Forest, FastAPI exposes prediction and health endpoints, and Streamlit provides a simple input interface. This separates model evaluation from the way a user would query it.',
    hardPart: 'A headline accuracy figure alone can hide weak ranking performance. The project reports both accuracy and ROC-AUC on its 10,000-row bank dataset, while keeping the interface and service small enough to inspect.',
    impact: 'The model achieved about 84% accuracy and 86% ROC-AUC on the project evaluation data and is accessible through an API and web interface.',
    scope: 'Course project. Evaluation results are from the repository, not a live banking system.',
    relatedExpertise: ['data-analytics', 'data-engineering'],
  },
  'loan-approval-credit-risk': {
    decision: 'I compared KNN, Decision Tree, and Random Forest after type checks, range validation, duplicate handling, and missing-value treatment. Model selection used cross-validation and several classification measures rather than one train/test accuracy number.',
    hardPart: 'In a credit setting, a prediction without an explanation is difficult to review. The analysis examines approval patterns by applicant characteristics and includes a separate interpretability report alongside the chosen model.',
    impact: 'The comparison selected Random Forest as the best-performing model in this study and produced a notebook and interpretability report for review.',
    scope: 'Learning project using a public loan dataset; not a deployed lending system.',
    relatedExpertise: ['data-analytics', 'teaching-mentoring'],
  },
  'zameen-real-estate-eda': {
    decision: 'I standardized currencies, area units, city names, and duplicate or missing listing fields before comparing prices. Price per square foot made properties of different sizes more comparable than raw asking price alone.',
    hardPart: 'Property data is easy to misread when listings mix units and locations. The notebook treats cleaning as part of the analysis, then looks at city, property type, and size rather than presenting one market-wide average.',
    impact: 'The cleaned dataset, visual analysis and executive PDF make city, property-type and price-per-square-foot patterns easier to compare.',
    scope: 'Exploratory study of property listings, not a valuation or investment recommendation.',
    relatedExpertise: ['data-analytics', 'teaching-mentoring'],
  },
  'hospitality-booking-dataset': {
    decision: 'I structured a simulated booking dataset around properties, guests, channels, reservations, and financial fields so an analyst can ask several linked revenue questions from one consistent source.',
    hardPart: 'A useful practice dataset needs enough relationships and edge cases to support work on cancellations, guest segments, and revenue retention. The brief sets out those analytical questions without pretending the analysis has already been done.',
    impact: 'The public dataset gives analysts 150,000 simulated bookings across 15 properties and eight cities, with a brief that frames revenue and cancellation questions.',
    scope: 'Simulated dataset and case brief; analysis and dashboard work are not part of the published repository.',
    relatedExpertise: ['data-architecture', 'data-analytics'],
  },
  'forest-cover-classification': {
    decision: 'I used Random Forest as a practical comparison for a tuned neural network on structured data. That makes model complexity a question to test rather than an assumption that deep learning must win.',
    hardPart: 'The CoverType dataset has seven imbalanced classes and a large tabular feature set. The notebook experiments with network architecture, regularization, and optimization, then looks beyond overall accuracy when comparing models.',
    impact: 'The notebook documents a reproducible comparison between a tuned neural network and Random Forest for a seven-class tabular problem.',
    scope: 'Deep-learning course project on the UCI CoverType dataset.',
    relatedExpertise: ['data-analytics', 'teaching-mentoring'],
  },
  'fruit-image-classification': {
    decision: 'I started from a pre-trained MobileNetV2 backbone instead of training an image network from scratch, then added a smaller classification head for the fruit classes.',
    hardPart: 'Limited images and compute make overfitting a real risk. The notebook uses augmentation, separate train/validation/test sets, and error review so performance is judged on images the model has not seen.',
    impact: 'The published notebook shows how a pre-trained model, augmentation and held-out evaluation can make an image-classification study practical with limited compute.',
    scope: 'Computer-vision course project; not a deployed sorting system.',
    relatedExpertise: ['data-analytics', 'teaching-mentoring'],
  },
  'restaurant-review-sentiment': {
    decision: 'I treated text representation as part of the model choice, comparing sparse and dense approaches as well as different classification methods on the same review problem.',
    hardPart: 'Sentiment labels compress varied language into two categories. A balanced set of 1,000 reviews makes method comparison manageable, while requiring care not to generalize a course result to every restaurant or customer base.',
    impact: 'The repository publishes the review data, notebook and method comparison, making sentiment patterns reviewable without reading each text individually.',
    scope: 'NLP course project on a balanced review sample; not a live customer-service integration.',
    relatedExpertise: ['data-analytics', 'teaching-mentoring'],
  },
};
