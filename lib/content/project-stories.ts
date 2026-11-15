export interface ProjectStory {
  decision: string;
  hardPart: string;
  impact: string;
  relatedExpertise: string[];
}

export const PROJECT_STORIES: Record<string, ProjectStory> = {
  'retail-store-weekly-sales-analysis': {
    decision: 'I chose a weekly sales fact table with separate date, store, and department dimensions so the same measures could answer several management questions without duplicating logic. The report compares a week with its counterpart in the prior year, shows year-to-date sales, and applies the commission rule documented in the repository.',
    hardPart: 'A total sales figure can hide whether growth came from one large store or across the network. I paired the headline comparison with top and bottom rankings, then kept the report compact enough for a manager to review on a phone.',
    impact: 'The published Power BI report and PDF bring weekly growth, department performance, and manager commission into one reviewable place. The repository does not provide adoption or time-saved measurements.',
    relatedExpertise: ['business-intelligence', 'data-architecture', 'data-analytics'],
  },
  'fragrance-stock-alert-pipeline': {
    decision: 'I designed this as a sequence of validation, harmonization, metrics, allocation, and publication. The documented rules combine a 15-day and a 7-day sales rate to estimate five-day demand, then rank low-cover stores before allocating warehouse stock or suggesting a transfer.',
    hardPart: 'Sales exports and stock snapshots do not naturally form a complete store-product picture. The pipeline builds the full 88-store by 76-SKU grid, excludes testers and non-retail locations, logs negative balances, and stops on duplicate keys or major row-count drift. That keeps missing or corrupt rows from becoming confident recommendations.',
    impact: 'The documented deliverables include an executive briefing, detailed store pack, Excel workbooks, and an audit log. They make stock risk and allocation choices visible for review across 88 stores; the supplied documentation does not establish a measured reduction in stockouts.',
    relatedExpertise: ['data-engineering', 'data-analytics', 'data-architecture'],
  },
  'logistics-bi-ecosystem': {
    decision: 'I treated delivery status, intermediate SLA milestones, cash collections, and commercial yield as distinct questions rather than forcing them into one generic dashboard. SQL warehouse data and Power BI models supported daily operational views as well as executive reporting.',
    hardPart: 'A nationwide shipment can be on time at one stage and late at another. The documented reporting tracks network, mid-mile, arrival-at-destination, and first-attempt stages so a branch problem is not mistaken for a linehaul problem. Zone-aware row-level security addresses a second challenge: giving regional managers relevant detail without exposing other zones.',
    impact: 'The supplied portfolio records 17 BI initiatives across operations, finance, sales, customer service, HR, and governance; two were still in progress. The work created documented ways to review delivery, COD reconciliation, and yield, but percentage improvements in the source have not been independently verified.',
    relatedExpertise: ['business-intelligence', 'data-architecture', 'data-engineering'],
  },
  'edu-assist-multi-agent-system': {
    decision: 'I routed common campus questions to a direct FAQ path before invoking heavier retrieval or a language model. The system can then search indexed documents or current web information and stream a response through FastAPI.',
    hardPart: 'University information changes, and one retrieval source will not answer every question. The public iteration uses specialist paths, consistency checks, fallbacks, and an admin area for FAQ edits and re-indexing. That makes the source of an answer easier to maintain than a single unstructured chatbot prompt.',
    impact: 'The repository publishes a working architecture and technical documentation at iteration 6 of 7. Query logs and admin analytics are built into the project; real-world usage and answer-quality results are not reported.',
    relatedExpertise: ['ai-automation', 'data-engineering'],
  },
  'retail-next-best-action': {
    decision: 'I put deterministic inventory measures ahead of any optional AI explanation. Sales velocity, stock cover, sell-through, shortages, and surpluses feed rules for replenishing, transferring, discounting, promoting, exiting, or monitoring a product.',
    hardPart: 'An automated recommendation can sound authoritative while the source file is incomplete. The prototype validates uploads, gives each action a plain-language reason, and requires a manager to approve, reject, or edit it. It does not quietly change ERP prices or move stock.',
    impact: 'The result is a tested Streamlit prototype for reviewable stock decisions, with scenarios and a record of manager choices. The repository has no measured business outcome or production deployment claim.',
    relatedExpertise: ['ai-automation', 'data-engineering', 'data-analytics'],
  },
  'uniassist-plus': {
    decision: 'I separated information requests from action requests. A question can move through FAQ, document, and website retrieval; an email or document request goes to a tool; a hybrid request gets context before the tool runs.',
    hardPart: 'A university assistant needs to ground answers in current sources while also handling routine tasks. The project uses vector search and a check on generated answers so the language model is not treated as the sole source of truth.',
    impact: 'UniAssist+ was published with code and project documentation as an Atom Camp final project. It demonstrates the end-to-end pattern, but the repository does not report campus adoption or time saved.',
    relatedExpertise: ['ai-automation', 'data-engineering'],
  },
  'bank-churn-prediction': {
    decision: 'I moved the model beyond a notebook: training produces a saved Random Forest, FastAPI exposes prediction and health endpoints, and Streamlit provides a simple input interface. This separates model evaluation from the way a user would query it.',
    hardPart: 'A headline accuracy figure alone can hide weak ranking performance. The project reports both accuracy and ROC-AUC on its 10,000-row bank dataset, while keeping the interface and service small enough to inspect.',
    impact: 'The repository reports about 84% accuracy and 86% ROC-AUC on its evaluation data. These are project evaluation results, not evidence of a live retention program or reduced customer churn.',
    relatedExpertise: ['data-analytics', 'data-engineering'],
  },
  'loan-approval-credit-risk': {
    decision: 'I compared KNN, Decision Tree, and Random Forest after type checks, range validation, duplicate handling, and missing-value treatment. Model selection used cross-validation and several classification measures rather than one train/test accuracy number.',
    hardPart: 'In a credit setting, a prediction without an explanation is difficult to review. The analysis examines approval patterns by applicant characteristics and includes a separate interpretability report alongside the chosen model.',
    impact: 'The published comparison selected Random Forest as the best-performing option in this project and produced a notebook and PDF report. It is a learning project, with no claim of real lending decisions or deployment.',
    relatedExpertise: ['data-analytics', 'teaching-mentoring'],
  },
  'zameen-real-estate-eda': {
    decision: 'I standardized currencies, area units, city names, and duplicate or missing listing fields before comparing prices. Price per square foot made properties of different sizes more comparable than raw asking price alone.',
    hardPart: 'Property data is easy to misread when listings mix units and locations. The notebook treats cleaning as part of the analysis, then looks at city, property type, and size rather than presenting one market-wide average.',
    impact: 'The repository includes a cleaned dataset, visual analysis, and an executive PDF report. Its findings describe listing patterns; they do not establish investment returns or property valuations.',
    relatedExpertise: ['data-analytics', 'teaching-mentoring'],
  },
  'hospitality-booking-dataset': {
    decision: 'I structured a simulated booking dataset around properties, guests, channels, reservations, and financial fields so an analyst can ask several linked revenue questions from one consistent source.',
    hardPart: 'A useful practice dataset needs enough relationships and edge cases to support work on cancellations, guest segments, and revenue retention. The brief sets out those analytical questions without pretending the analysis has already been done.',
    impact: 'The public repository offers 150,000 simulated bookings across 15 properties and eight cities in CSV and Excel form. It is a reusable dataset and case brief; there is no finished dashboard or measured hospitality outcome in the repository.',
    relatedExpertise: ['data-architecture', 'data-analytics'],
  },
  'forest-cover-classification': {
    decision: 'I used Random Forest as a practical comparison for a tuned neural network on structured data. That makes model complexity a question to test rather than an assumption that deep learning must win.',
    hardPart: 'The CoverType dataset has seven imbalanced classes and a large tabular feature set. The notebook experiments with network architecture, regularization, and optimization, then looks beyond overall accuracy when comparing models.',
    impact: 'The published course project documents an evaluation method for choosing between neural and tree-based models. It does not claim an operational forestry deployment or business result.',
    relatedExpertise: ['data-analytics', 'teaching-mentoring'],
  },
  'fruit-image-classification': {
    decision: 'I started from a pre-trained MobileNetV2 backbone instead of training an image network from scratch, then added a smaller classification head for the fruit classes.',
    hardPart: 'Limited images and compute make overfitting a real risk. The notebook uses augmentation, separate train/validation/test sets, and error review so performance is judged on images the model has not seen.',
    impact: 'The project publishes the transfer-learning workflow and evaluation notebook. It demonstrates a resource-aware approach; the repository does not document a deployed sorting system.',
    relatedExpertise: ['data-analytics', 'teaching-mentoring'],
  },
  'restaurant-review-sentiment': {
    decision: 'I treated text representation as part of the model choice, comparing sparse and dense approaches as well as different classification methods on the same review problem.',
    hardPart: 'Sentiment labels compress varied language into two categories. A balanced set of 1,000 reviews makes method comparison manageable, while requiring care not to generalize a course result to every restaurant or customer base.',
    impact: 'The repository publishes the data, notebook, and comparison workflow. It shows how review text could be summarized at scale, without claiming a live customer-service integration.',
    relatedExpertise: ['data-analytics', 'teaching-mentoring'],
  },
};
