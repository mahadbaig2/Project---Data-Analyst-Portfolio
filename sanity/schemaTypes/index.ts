import type { SchemaTypeDefinition } from 'sanity';

// Object types
import { seo } from './objects/seo';
import { cta } from './objects/cta';
import { socialLink } from './objects/socialLink';
import { customImage } from './objects/customImage';
import { architectureNode } from './objects/architectureNode';
import { architectureEdge } from './objects/architectureEdge';
import { architectureGraph } from './objects/architectureGraph';
import { calculation } from './objects/calculation';
import { identityPillar } from './objects/identityPillar';
import { careerPrinciple } from './objects/careerPrinciple';
import { verifiedOutcome } from './objects/verifiedOutcome';
import { blockContent } from './objects/blockContent';
import { visualSpecification } from './objects/visualSpecification';

// Singletons
import { siteSettings } from './singletons/siteSettings';
import { homePage } from './singletons/homePage';
import { experiencePage } from './singletons/experiencePage';
import { expertisePage } from './singletons/expertisePage';
import { teachingPage } from './singletons/teachingPage';
import { writingPage } from './singletons/writingPage';
import { aboutPage } from './singletons/aboutPage';

// Reusable Documents
import { caseStudy } from './documents/caseStudy';
import { experience } from './documents/experience';
import { capability } from './documents/capability';
import { technology } from './documents/technology';
import { teachingExperience } from './documents/teachingExperience';
import { article } from './documents/article';
import { education } from './documents/education';
import { certification } from './documents/certification';
import { professionalProfile } from './documents/professionalProfile';
import { achievement } from './documents/achievement';
import { sourceDocument } from './documents/sourceDocument';
import { generationRun } from './documents/generationRun';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    // Objects
    seo,
    cta,
    socialLink,
    customImage,
    architectureNode,
    architectureEdge,
    architectureGraph,
    calculation,
    identityPillar,
    careerPrinciple,
    verifiedOutcome,
    blockContent,
    visualSpecification,

    // Singletons
    siteSettings,
    homePage,
    experiencePage,
    expertisePage,
    teachingPage,
    writingPage,
    aboutPage,

    // Reusable Documents
    caseStudy,
    experience,
    capability,
    technology,
    teachingExperience,
    article,
    education,
    certification,
    professionalProfile,
    achievement,
    sourceDocument,
    generationRun,
  ],
};
