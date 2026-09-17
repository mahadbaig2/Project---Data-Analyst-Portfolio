import { NavigationItem, ProfileIdentity } from '@/lib/types/portfolio';

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
  status: 'Available for Strategic Roles',
  email: 'mirzahammadbaig147@gmail.com',
  location: 'Islamabad, Pakistan',
  coreStack: [
    'Power BI',
    'SQL',
    'Python',
    'DAX',
    'Data Modeling',
    'Microsoft Fabric',
    'Data Engineering',
    'AI Automation',
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
    'Executive analytics workspace and professional portfolio of Mirza Hammad Baig, covering enterprise business intelligence, dimensional data modeling, end-to-end data systems, and decision enablement.',
  siteUrl: 'https://mirzahammad.com',
};
