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

export interface PageMetadataConfig {
  title: string;
  description: string;
}
