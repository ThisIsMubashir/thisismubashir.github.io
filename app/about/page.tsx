import { SectionHeading } from '@/components/section-heading';
import { Badge } from '@/components/ui/badge';
import { ScrollReveal } from '@/components/scroll-reveal';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'About',
  description:
    'Computer engineer and academic with a decade of teaching, research, and leadership across Australian and international institutions. Currently a Lecturer at the University of Strathclyde, Bahrain campus.',
  path: '/about',
});
const arsenal: { layer: string; items: { name: string; icon?: string }[] }[] = [
  {
    layer: 'Languages',
    items: [
      { name: 'Python',     icon: 'devicon-python-plain colored' },
      { name: 'C',          icon: 'devicon-c-plain colored' },
      { name: 'C++',        icon: 'devicon-cplusplus-plain colored' },
      { name: 'Java',       icon: 'devicon-java-plain colored' },
      { name: 'JavaScript', icon: 'devicon-javascript-plain colored' },
      { name: 'Verilog' },
      { name: 'VHDL' },
    ],
  },
  {
    layer: 'Engineering',
    items: [
      { name: 'Cloud (AWS)', icon: 'devicon-amazonwebservices-plain colored' },
      { name: 'Embedded systems' },
      { name: 'Software engineering' },
      { name: 'System architecture' },
    ],
  },
  {
    layer: 'Data',
    items: [
      { name: 'MySQL',   icon: 'devicon-mysql-plain colored' },
      { name: 'MongoDB', icon: 'devicon-mongodb-plain colored' },
      { name: 'Relational + non-relational design' },
    ],
  },
  {
    layer: 'Leadership',
    items: [
      { name: 'Curriculum design' },
      { name: 'Industry-linked capstones' },
      { name: 'TEQSA / ACS accreditation' },
      { name: 'QA + moderation' },
    ],
  },
  {
    layer: 'Currently learning',
    items: [
      { name: 'Agentic AI workflows' },
      { name: 'RAG' },
      { name: 'Model Context Protocol' },
    ],
  },
];

export default function AboutPage() {
  return (
    <>
      <SectionHeading
       
        title="A computer engineer who fell in love with teaching."
        description="Researcher, academic leader, educator."
      />

      <article className="prose prose-neutral max-w-none dark:prose-invert">
        <p>
          I&apos;m a Lecturer in Computer and Information Sciences at the University of Strathclyde,
          Bahrain campus, with more than a decade of teaching and academic leadership across
          Australian and international institutions. I hold a PhD in Computer Engineering from UNSW
          Sydney, where my research focused on runtime hardware-Trojan detection for Network-on-Chip
          MPSoCs, and an MS in Computer Engineering from the University of Engineering &amp;
          Technology, Taxila.
        </p>
        <p>
          Before Strathclyde I spent three years at King&apos;s Own Institute in Sydney — first as
          Senior Lecturer, then as Head of Program (Postgraduate IT), leading curriculum design,
          quality assurance, TEQSA and ACS accreditation work, and capstone-project coordination.
          Earlier, I was a Lecturer and Unit Facilitator at the Victorian Institute of Technology, a
          sessional lecturer for Federation University Australia and the University of the Sunshine
          Coast, a casual tutor at UNSW, and a lecturer at the University of Haripur.
        </p>
        <p>
          My research spans three areas: <strong>security</strong> — from hardware Trojans in
          Network-on-Chip to quantum-safe smart grids; <strong>artificial intelligence</strong>,
          including its responsible adoption; and <strong>teaching and learning</strong> —
          game-based learning, AI in higher education and assessment design. I review for
          international journals and conferences, and I&apos;m currently exploring agentic AI —
          RAG and the Model Context Protocol — when teaching allows.
        </p>
        <p>
          Outside the lecture theatre I like connecting students with industry: running
          capture-the-flag and no-code app challenges, hosting industry speakers on AI and
          cybersecurity, and introducing school students to computing. The full record of talks,
          outreach and professional development is on the{' '}
          <a href="/cpd/">professional development &amp; service</a> page.
        </p>
      </article>


      <section className="mt-16">
        <h2 className="section-title">Technical arsenal</h2>
        <p className="mt-2 max-w-2xl text-ink-500 dark:text-ink-300">
          What I&apos;m proficient in or actively practising. The last row is what I&apos;m investing
          time in right now — listed honestly, not aspirationally.
        </p>
        <ScrollReveal className="mt-6 space-y-5">
          {arsenal.map((row) => (
            <div key={row.layer} className="grid gap-3 sm:grid-cols-[160px_1fr] sm:items-baseline">
              <p className="eyebrow">
                {row.layer}
              </p>
              <ul className="flex flex-wrap gap-1.5">
                {row.items.map((item) => (
                  <li key={item.name}>
                    <Badge tone={row.layer === 'Currently learning' ? 'brand' : 'neutral'}>
                      {item.icon && (
                        <i className={`${item.icon} mr-1 text-sm`} aria-hidden="true" />
                      )}
                      {item.name}
                    </Badge>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </ScrollReveal>
      </section>

    </>
  );
}
