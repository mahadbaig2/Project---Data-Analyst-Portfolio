export interface NavigationItem {
  label: string;
  href: string;
  icon: 'home' | 'analytics' | 'timeline' | 'account_tree' | 'school' | 'article' | 'person' | 'alternate_email';
  isExternal?: boolean;
}

export interface SocialLink {
  label: string;
  href: string;
  platform: 'linkedin' | 'github' | 'medium' | 'email';
}

export interface ProfileIdentity {
  name: string;
  role: string;
  descriptor: string;
  valueChain: string;
  summary: string;
  status: string;
  email: string;
  location: string;
  coreStack: string[];
  socialLinks: SocialLink[];
  cvUrl: string;
}

export interface ArchitectureNode {
  id: string;
  title: string;
  category: string;
  items?: string[];
  detail?: string;
}

export interface ArchitectureEdge {
  from: string;
  to: string;
  label?: string;
}

export interface ArchitectureGraph {
  nodes: ArchitectureNode[];
  edges: ArchitectureEdge[];
  textSummary: string;
}

export interface CaseStudy {
  slug: string;
  title: string;
  summary: string;
  domain: string;
  category: 'Business Intelligence' | 'Data Analytics' | 'Data Engineering' | 'AI / Automation';
  organization?: string;
  role: string;
  period: string;
  status: 'Production Deployed' | 'Operational' | 'Architecture Blueprint';
  confidentiality?: string;
  isFeatured?: boolean;
  problem: string;
  background?: string;
  primaryUser?: string;
  objectives: { id: string; title: string; description: string }[];
  dataSources?: string[];
  responsibilities?: string[];
  technologies: string[];
  deliverables?: string[];
  architecture?: ArchitectureGraph;
  calculations?: { measure: string; formula: string; purpose: string }[];
  outcomes?: string[];
  decisions?: string[];
  challenges?: string[];
  learnings?: string[];
  futureRoadmap?: string[];
  githubUrl?: string;
  previewImage?: {
    alt: string;
    caption?: string;
  };
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  period: string;
  isCurrent?: boolean;
  appointmentType?: string;
  scopeOverview: string;
  responsibilities: string[];
  technologies: string[];
  supportedDepartments?: string[];
  verifiedOutcomes?: { metric: string; label: string; detail: string }[];
}

export interface CapabilityItem {
  id: string;
  title: string;
  category: string;
  description: string;
  skills: string[];
  icon: string;
}

export interface TechnologyGroup {
  category: string;
  description: string;
  technologies: { name: string; context: string }[];
}

export interface TeachingTopic {
  id: string;
  title: string;
  track: string;
  description: string;
  coreConcepts: string[];
  targetAudience: string;
}

export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  period: string;
  honors?: string;
  description: string;
}

export interface CertificationItem {
  id: string;
  title: string;
  issuer: string;
  credentialType: string;
  skills: string[];
}

export interface ArticleItem {
  id: string;
  title: string;
  series: string;
  category: string;
  summary: string;
  mediumUrl: string;
  isFeatured?: boolean;
}

export interface CareerPrinciple {
  number: string;
  title: string;
  axiom: string;
  description: string;
}

export interface IdentityPillar {
  number: string;
  title: string;
  role: string;
  description: string;
  focusArea: string;
}
