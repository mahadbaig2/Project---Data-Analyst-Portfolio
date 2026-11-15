import { Arrow } from '@/components/portfolio/Arrow';
import type { Metadata } from 'next';
import Link from 'next/link';
import { TEACHING_TOPICS } from '@/lib/fixtures/portfolio';

const teachingMethod = [
  { title: 'Start with the decision', detail: 'Before opening a tool, I ask what the analysis should help someone understand or do. That gives every metric and chart a purpose.' },
  { title: 'Work with imperfect data', detail: 'Learners clean messy files, check assumptions, and explain what a missing or inconsistent field could do to the answer.' },
  { title: 'Build the model, then the view', detail: 'I teach relationships, grain, and measure logic before polishing a dashboard. The result should remain trustworthy when a filter changes.' },
  { title: 'Review the reasoning', detail: 'In mentoring, I ask learners to defend their choices, show their checks, and tell a clear story about the result—not just submit working code.' },
];

const studentNotes = [
  { name: 'Adan Anjum', detail: 'Went from struggling to read a CSV to building a Python Retail Sales Mini Analyzer. She thanked Hammad for mentoring her throughout the project.' },
  { name: 'Abdul Majid Memon', detail: 'Shared that he earned the Microsoft Power BI Data Analyst Associate certification and thanked Hammad for teaching Power BI from the basics at Atomcamp.' },
  { name: 'Haider Ali Shah', detail: 'Celebrated Top Performer recognition in the Data Analytics Bootcamp and thanked Hammad alongside the Atomcamp trainer team for their guidance.' },
  { name: 'Umar Farooq Khan', detail: 'Described how hands-on work with messy data connected classroom theory to real applications, and thanked Hammad and the Atomcamp team for feedback.' },
];

export const metadata: Metadata = {
  title: 'Teaching & Mentoring',
  description: 'How Mirza Hammad Baig teaches Power BI, SQL, Python, and data analysis at Atomcamp, with feedback from learners.',
};

export default function TeachingPage() {
  return <div className="inner-page section-pad teaching-page">
    <div className="page-hero" data-reveal><h1>What I teach<span className="yellow-dot">.</span></h1><p>I&apos;m a Data Analytics Instructor & Mentor at Atomcamp, teaching Power BI, SQL, Python, and the thinking that connects them.</p></div>
    <div className="teaching-feature" data-reveal><div><h2>Teach the thinking.<br />Then the tools.</h2><p>My work in retail and logistics shapes the classroom. We start with a decision, inspect the source data, build a defensible model, and practice explaining the answer to someone who will use it.</p></div><div className="teaching-symbol" aria-hidden="true">✳</div></div>

    <section className="teaching-method" aria-labelledby="teaching-method-title">
      <div className="section-heading" data-reveal><h2 id="teaching-method-title">How I teach<span className="yellow-dot">.</span></h2></div>
      <div>{teachingMethod.map((item, index) => <div className="teaching-method-item" key={item.title} data-reveal><span>0{index + 1}</span><h3>{item.title}</h3><p>{item.detail}</p></div>)}</div>
    </section>

    <section className="teaching-topics" aria-labelledby="teaching-topics-title">
      <div className="section-heading" data-reveal><h2 id="teaching-topics-title">In the classroom<span className="yellow-dot">.</span></h2></div>
      <div className="teaching-list">{TEACHING_TOPICS.map((topic, index) => <div className="teaching-item" key={topic.id} data-reveal><span>0{index + 1}</span><h3>{topic.title}</h3><p>{topic.description}</p></div>)}</div>
    </section>

    <section className="teaching-students" aria-labelledby="student-stories-title">
      <div className="section-heading" data-reveal><div><h2 id="student-stories-title">From learners<span className="yellow-dot">.</span></h2><p>These outcomes come from student posts shared for this portfolio.</p></div></div>
      <div className="student-note-grid">{studentNotes.map((note) => <div className="student-note" key={note.name} data-reveal><p>{note.detail}</p><strong>{note.name}</strong></div>)}</div>
    </section>

    <div className="contact-band" data-reveal><h2>Learning starts with a conversation.</h2><Link href="/contact">Get in touch <Arrow /></Link></div>
  </div>;
}
