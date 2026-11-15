import { sanityFetch } from '@/sanity/lib/fetch';

export type BlogArticle = { _id: string; title: string; summary?: string; mediumUrl?: string; slug?: string; publishedAt?: string };

const MEDIUM_ARTICLES: BlogArticle[] = [
  { _id: "medium.208b0f687edb", title: "The Interconnected Web of Data: How Fields Overlap and Work Together", summary: "Every role in the Data Field depends on every other. The most common failures aren’t technical — they’re relational.", mediumUrl: "https://medium.com/@mirzahammadbaig147/the-interconnected-web-of-data-how-fields-overlap-and-work-together-208b0f687edb", publishedAt: "2026-03-31T05:01:01Z" },
  { _id: "medium.762ab14d8aee", title: "Mapping the Data Field: Key Areas, Roles & Specializations", summary: "Knowing the landscape exists is one thing. Having an actual map — with roles, tools, and paths — is what lets you navigate it with intention.", mediumUrl: "https://medium.com/@mirzahammadbaig147/mapping-the-data-field-key-areas-roles-specializations-762ab14d8aee", publishedAt: "2026-03-30T05:01:00Z" },
  { _id: "medium.fb9ac9772a40", title: "The Data Field: Exploring the Landscape of Modern Data", summary: "I spent months learning about data before I realized I had only been learning about pieces. This is about the moment I finally saw the whole picture.", mediumUrl: "https://medium.com/@mirzahammadbaig147/the-data-field-exploring-the-landscape-of-modern-data-fb9ac9772a40", publishedAt: "2026-03-28T05:01:01Z" },
  { _id: "medium.7ffae9bd28f6", title: "Structured, Unstructured & Semi-Structured Data Explained", summary: "Not all data looks the same — and that difference determines almost everything about how you work with it.", mediumUrl: "https://medium.com/@mirzahammadbaig147/structured-unstructured-semi-structured-data-explained-7ffae9bd28f6", publishedAt: "2026-03-27T05:01:00Z" },
  { _id: "medium.39f261e24bfc", title: "Data vs Information vs Knowledge vs Wisdom: The DIKW Pyramid", summary: "Having data doesn’t mean having answers. This framework changed how I think about everything I work with.", mediumUrl: "https://medium.com/@mirzahammadbaig147/data-vs-information-vs-knowledge-vs-wisdom-the-dikw-pyramid-39f261e24bfc", publishedAt: "2026-03-26T12:01:24Z" },
  { _id: "medium.7342b87d2010", title: "From Ledgers to AI: The Fascinating History of Data", summary: "Data didn’t start with computers. It started with human beings trying to remember things — and that instinct has never changed.", mediumUrl: "https://medium.com/@mirzahammadbaig147/from-ledgers-to-ai-the-fascinating-history-of-data-7342b87d2010", publishedAt: "2026-03-25T11:50:42Z" },
  { _id: "medium.6f9bc9e1d816", title: "What is Data? The Invisible Force Shaping Our World", summary: "Data is everywhere — and most people have never stopped to ask what it actually is. Here’s the real answer.", mediumUrl: "https://medium.com/@mirzahammadbaig147/what-is-data-the-invisible-force-shaping-our-world-6f9bc9e1d816", publishedAt: "2026-03-25T11:32:07Z" },
  { _id: "medium.9e9ed3c67140", title: "The Data Field Series: Why I Started This — and What It’s Really About", summary: "A series for curious minds who want to understand the world of data — not just learn tools.", mediumUrl: "https://medium.com/@mirzahammadbaig147/the-data-field-series-what-is-data-the-invisible-force-shaping-our-world-9e9ed3c67140", publishedAt: "2026-02-23T08:58:33Z" },
];

export async function getBlogArticles(): Promise<BlogArticle[]> {
  const sanityArticles = await sanityFetch<BlogArticle[]>({
    query: `*[_type == "article" && (defined(body) || mediumUrl match "https://medium.com/@mirzahammadbaig147/*")] | order(coalesce(publishedAt, _createdAt) desc) { _id, title, summary, mediumUrl, publishedAt, "slug": slug.current }`,
    tags: ['article'],
    fallbackData: [],
  });
  const articles = new Map<string, BlogArticle>();
  for (const article of [...MEDIUM_ARTICLES, ...(sanityArticles || [])]) {
    const key = article.mediumUrl?.split('?')[0] || article.slug || article._id;
    articles.set(key, article);
  }
  return [...articles.values()].sort((a, b) => (b.publishedAt || "").localeCompare(a.publishedAt || ""));
}
