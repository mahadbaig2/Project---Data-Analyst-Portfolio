import { groq } from 'next-sanity';

/**
 * Global Site Settings Query
 */
export const SITE_SETTINGS_QUERY = groq`
  *[_type == "siteSettings"][0] {
    name,
    role,
    descriptor,
    valueChain,
    summary,
    status,
    email,
    location,
    coreStack,
    socialLinks[] {
      platform,
      label,
      url
    },
    portrait {
      asset->,
      alt,
      caption
    },
    "cvUrl": cvFile.asset->url,
    seo {
      metaTitle,
      metaDescription,
      ogImage {
        asset->,
        alt
      },
      noIndex
    }
  }
`;

/**
 * Home Page Query
 */
export const HOME_PAGE_QUERY = groq`
  *[_type == "homePage"][0] {
    heroBadge,
    heroTitle,
    heroDescription,
    indicators[] {
      overline,
      title,
      description
    },
    featuredCaseStudy-> {
      title,
      "slug": slug.current,
      summary,
      domain,
      category,
      organization,
      role,
      period,
      status,
      technologies,
      githubUrl,
      objectives,
      architecture,
      isFeatured
    },
    secondaryCaseStudies[]-> {
      title,
      "slug": slug.current,
      summary,
      domain,
      category,
      status,
      technologies,
      githubUrl
    },
    careerNarrativeTitle,
    careerNarrativeBody,
    finalCta,
    seo
  }
`;

/**
 * All Public Case Studies Query (for /work index)
 */
export const ALL_CASE_STUDIES_QUERY = groq`
  *[_type == "caseStudy"] | order(displayOrder asc, _createdAt desc) {
    title,
    "slug": slug.current,
    summary,
    domain,
    category,
    organization,
    role,
    period,
    status,
    confidentiality,
    isFeatured,
    technologies,
    githubUrl,
    previewImage {
      asset->,
      alt,
      caption
    }
  }
`;

/**
 * Case Study By Slug Query (for /work/[slug] detail)
 */
export const CASE_STUDY_BY_SLUG_QUERY = groq`
  *[_type == "caseStudy" && slug.current == $slug][0] {
    title,
    "slug": slug.current,
    summary,
    domain,
    category,
    organization,
    role,
    period,
    status,
    confidentiality,
    isFeatured,
    problem,
    background,
    primaryUser,
    objectives[] {
      id,
      title,
      description
    },
    technologies,
    architecture {
      nodes[] {
        nodeId,
        title,
        category,
        items,
        detail
      },
      edges[] {
        from,
        to,
        label
      },
      textSummary
    },
    calculations[] {
      measure,
      formula,
      purpose
    },
    outcomes,
    decisions,
    challenges,
    learnings,
    githubUrl,
    previewImage {
      asset->,
      alt,
      caption
    },
    seo
  }
`;

/**
 * Slugs Query for Static Path Generation
 */
export const CASE_STUDY_SLUGS_QUERY = groq`
  *[_type == "caseStudy" && defined(slug.current)] {
    "slug": slug.current
  }
`;

/**
 * Experience Page Query
 */
export const EXPERIENCE_PAGE_QUERY = groq`
  {
    "page": *[_type == "experiencePage"][0] {
      badgeText,
      title,
      description,
      supportedDepartments[] {
        dept,
        focus
      },
      workingStyles[] {
        title,
        icon,
        description
      },
      finalCta,
      seo
    },
    "items": *[_type == "experience"] | order(displayOrder asc, _createdAt desc) {
      role,
      company,
      period,
      isCurrent,
      appointmentType,
      scopeOverview,
      responsibilities,
      technologies,
      supportedDepartments,
      verifiedOutcomes[] {
        metric,
        label,
        detail
      }
    }
  }
`;

/**
 * Expertise Page Query
 */
export const EXPERTISE_PAGE_QUERY = groq`
  {
    "page": *[_type == "expertisePage"][0] {
      badgeText,
      title,
      description,
      valueChainSteps[] {
        label,
        sub
      },
      problemsIWorkOn[] {
        title,
        description
      },
      professionalApproach[] {
        step,
        title,
        detail
      },
      finalCta,
      seo
    },
    "capabilities": *[_type == "capability"] | order(displayOrder asc, _createdAt desc) {
      title,
      category,
      description,
      skills,
      icon
    },
    "technologyGroups": *[_type == "technology"] | order(displayOrder asc, _createdAt desc) {
      category,
      description,
      technologies[] {
        name,
        context
      }
    }
  }
`;

/**
 * Teaching Page Query
 */
export const TEACHING_PAGE_QUERY = groq`
  {
    "page": *[_type == "teachingPage"][0] {
      badgeText,
      title,
      description,
      lecturerHero {
        badge,
        role,
        institution,
        summary,
        pedagogicalFocus
      },
      corporateTrainingNote,
      learningFlow[] {
        step,
        title,
        description
      },
      editorialStatement {
        quote,
        commentary
      },
      mentorshipThemes[] {
        title,
        description
      },
      finalCta,
      seo
    },
    "topics": *[_type == "teachingExperience"] | order(displayOrder asc, _createdAt desc) {
      title,
      track,
      description,
      coreConcepts,
      targetAudience
    }
  }
`;

/**
 * Writing Page Query
 */
export const WRITING_PAGE_QUERY = groq`
  {
    "page": *[_type == "writingPage"][0] {
      badgeText,
      title,
      description,
      seriesTitle,
      seriesDescription,
      mediumUrl,
      featuredArticle-> {
        title,
        series,
        category,
        summary,
        mediumUrl,
        isFeatured
      },
      knowledgeMapLayers[] {
        layer,
        description,
        examples
      },
      whyIWriteReason,
      teachingConnection,
      seo
    },
    "articles": *[_type == "article"] | order(displayOrder asc, _createdAt desc) {
      title,
      series,
      category,
      summary,
      mediumUrl,
      isFeatured
    }
  }
`;

/**
 * About Page Query
 */
export const ABOUT_PAGE_QUERY = groq`
  {
    "page": *[_type == "aboutPage"][0] {
      badgeText,
      title,
      description,
      narrativeHeadline,
      narrativeBody,
      identityPillars[] {
        number,
        title,
        role,
        description,
        focusArea
      },
      careerPrinciples[] {
        number,
        title,
        axiom,
        description
      },
      contactHeading,
      contactDescription,
      seo
    },
    "education": *[_type == "education"] | order(displayOrder asc, _createdAt desc) {
      degree,
      institution,
      period,
      honors,
      description
    },
    "certifications": *[_type == "certification"] | order(displayOrder asc, _createdAt desc) {
      title,
      issuer,
      credentialType,
      credentialUrl,
      skills
    }
  }
`;
