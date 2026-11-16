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
  { quote: 'Today I built a Retail Sales Mini Analyzer with Python.', credit: 'Atomcamp learner · Python capstone' },
  { quote: 'The bootcamp gave me that through hands-on assignments and projects.', credit: 'Atomcamp learner · Business Analytics' },
  { quote: 'I’m incredibly proud to have been recognized as one of the Top Performers!', credit: 'Atomcamp learner · Data Analytics Bootcamp' },
];

export const metadata: Metadata = {
  title: 'Teaching & Mentoring | Data analyst & BI architect',
  description: 'How Mirza Hammad Baig teaches Power BI, SQL, Python and applied data analysis at Atomcamp, with learner feedback.',
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
      <div className="section-heading" data-reveal><div><h2 id="student-stories-title">From learners<span className="yellow-dot">.</span></h2><p>Short excerpts from student posts shared for this portfolio. Learners credited Hammad, often alongside the wider Atomcamp teaching team.</p></div></div>
      <div className="student-note-grid">{studentNotes.map((note) => <blockquote className="student-note" key={note.quote} data-reveal><p>“{note.quote}”</p><cite>{note.credit}</cite></blockquote>)}</div>
    </section>

    <div className="contact-band" data-reveal><h2>Learning starts with a conversation.</h2><Link href="/contact">Let&apos;s talk <Arrow /></Link></div>
  </div>;
}
