import type { StructureResolver } from 'sanity/structure';

// Singletons that cannot have duplicates
const SINGLETONS = [
  { id: 'siteSettings', title: 'Site Settings & Identity', schemaType: 'siteSettings' },
  { id: 'homePage', title: 'Home Page', schemaType: 'homePage' },
  { id: 'experiencePage', title: 'Experience Page', schemaType: 'experiencePage' },
  { id: 'expertisePage', title: 'Expertise Page', schemaType: 'expertisePage' },
  { id: 'teachingPage', title: 'Teaching Page', schemaType: 'teachingPage' },
  { id: 'writingPage', title: 'Writing Page', schemaType: 'writingPage' },
  { id: 'aboutPage', title: 'About Page', schemaType: 'aboutPage' },
];

const SINGLETON_TYPES = new Set(SINGLETONS.map((s) => s.schemaType));

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content Studio')
    .items([
      // Group 1: Website Pages (Singletons)
      S.listItem()
        .title('Website Pages & Settings')
        .child(
          S.list()
            .title('Website Configuration')
            .items(
              SINGLETONS.map((singleton) =>
                S.listItem()
                  .title(singleton.title)
                  .id(singleton.id)
                  .child(
                    S.document()
                      .schemaType(singleton.schemaType)
                      .documentId(singleton.id)
                      .title(singleton.title)
                  )
              )
            )
        ),

      S.divider(),

      // Group 2: Portfolio & Architecture
      S.listItem()
        .title('Portfolio & Architecture')
        .child(
          S.list()
            .title('Work & Systems')
            .items([
              S.documentTypeListItem('caseStudy').title('Case Studies'),
              S.documentTypeListItem('experience').title('Career Chronology'),
              S.documentTypeListItem('capability').title('Capability Disciplines'),
              S.documentTypeListItem('technology').title('Technology Groups'),
            ])
        ),

      // Group 3: Education & Thought Leadership
      S.listItem()
        .title('Education & Publications')
        .child(
          S.list()
            .title('Teaching & Publications')
            .items([
              S.documentTypeListItem('teachingExperience').title('Teaching Tracks'),
              S.documentTypeListItem('article').title('Articles & Publications'),
              S.documentTypeListItem('education').title('Academic Degrees'),
              S.documentTypeListItem('certification').title('Certifications'),
            ])
        ),

      // Group 4: AI Case-Study Generator Workflows
      S.listItem()
        .title('AI Case-Study Generator')
        .child(
          S.list()
            .title('AI Case-Study Editorial Workflow')
            .items([
              S.listItem()
                .title('Source Documents (AI Input)')
                .child(
                  S.documentList()
                    .title('All Source Documents')
                    .filter('_type == "sourceDocument"')
                ),
              S.listItem()
                .title('Ready to Generate')
                .child(
                  S.documentList()
                    .title('Ready to Generate')
                    .filter('_type == "sourceDocument" && processingStatus == "pending" && confidentialityAcknowledged == true')
                ),
              S.listItem()
                .title('Active Processing')
                .child(
                  S.documentList()
                    .title('Processing Runs')
                    .filter('_type == "generationRun" && status in ["queued", "processing", "extracting", "drafting", "validating"]')
                ),
              S.listItem()
                .title('Needs Review (Completed Runs)')
                .child(
                  S.documentList()
                    .title('Runs Needing Review')
                    .filter('_type == "generationRun" && reviewerStatus == "pending" && status in ["completed", "completed_with_warnings"]')
                ),
              S.listItem()
                .title('Generated Case Study Drafts')
                .child(
                  S.documentList()
                    .title('Unpublished Case Study Drafts')
                    .filter('_type == "caseStudy" && status == "Draft"')
                ),
              S.listItem()
                .title('Failed Generation Runs')
                .child(
                  S.documentList()
                    .title('Failed Runs')
                    .filter('_type == "generationRun" && status == "failed"')
                ),
              S.divider(),
              S.listItem()
                .title('Verified Evidence Claims')
                .child(
                  S.documentList()
                    .title('Verified Claims')
                    .filter('_type == "achievement"')
                ),
              S.listItem()
                .title('Professional Bio & Context')
                .child(
                  S.documentList()
                    .title('Professional Profiles')
                    .filter('_type == "professionalProfile"')
                ),
            ])
        ),

      S.divider(),

      // Filter out singletons from any default root list
      ...S.documentTypeListItems().filter(
        (listItem) => !SINGLETON_TYPES.has(listItem.getId() || '')
      ),
    ]);
