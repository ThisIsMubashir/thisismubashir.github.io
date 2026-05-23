import { SectionHeading } from '@/components/section-heading';
import { Badge } from '@/components/ui/badge';
import { ScrollReveal } from '@/components/scroll-reveal';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'About',
  description:
    'Computer engineer and academic with a decade of teaching, research, and leadership across Australian and international institutions. Currently a Teaching Fellow at the University of Strathclyde, Bahrain campus.',
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
          I&apos;m a Teaching Fellow at the University of Strathclyde, Bahrain campus, with more
          than a decade of teaching and academic leadership across Australian and international
          institutions. I completed my PhD at UNSW Sydney in 2018, working on runtime hardware-Trojan
          detection for Network-on-Chip MPSoCs.
        </p>
        <p>
          Before Strathclyde I was Head of Program (Postgraduate IT) at King&apos;s Own Institute
          in Sydney, where I led curriculum design, quality assurance, accreditation work (TEQSA,
          ACS), and capstone-project coordination. I&apos;ve taught at UNSW, Victorian Institute of
          Technology, Federation University, USC, and the University of Engineering &amp; Technology
          Taxila.
        </p>
        <p>
          My research interests sit at three intersections: cyber-physical systems for healthcare,
          game-based learning for programming, and AI in higher education and assessment design.
          I&apos;m also currently exploring agentic AI on the side — working through RAG and the
          Model Context Protocol when teaching allows.
        </p>
      </article>

      <section className="mt-16">
        <h2 className="font-medium text-2xl">Technical arsenal</h2>
        <p className="mt-2 max-w-2xl text-ink-500 dark:text-ink-300">
          What I&apos;m proficient in or actively practising. The last row is what I&apos;m investing
          time in right now — listed honestly, not aspirationally.
        </p>
        <ScrollReveal className="mt-6 space-y-5">
          {arsenal.map((row) => (
            <div key={row.layer} className="grid gap-3 sm:grid-cols-[160px_1fr] sm:items-baseline">
              <p className="text-xs font-medium uppercase tracking-wider text-brand-700 dark:text-brand-300">
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
