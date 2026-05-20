import { SectionHeading } from '@/components/section-heading';
import { Badge } from '@/components/ui/badge';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'About',
  description:
    'Computer engineer and academic with a decade of teaching, research, and leadership across Australian and international institutions. Currently a Teaching Fellow at the University of Strathclyde, Bahrain campus.',
  path: '/about',
});

const arsenal: { layer: string; items: string[] }[] = [
  {
    layer: 'Languages',
    items: ['Python', 'C', 'C++', 'Java', 'JavaScript', 'Verilog', 'VHDL'],
  },
  {
    layer: 'Engineering',
    items: ['Cloud (AWS)', 'Embedded systems', 'Software engineering', 'System architecture'],
  },
  {
    layer: 'Data',
    items: ['MySQL', 'MongoDB', 'Relational + non-relational design'],
  },
  {
    layer: 'Leadership',
    items: ['Curriculum design', 'Industry-linked capstones', 'TEQSA / ACS accreditation', 'QA + moderation'],
  },
  {
    layer: 'Currently learning',
    items: ['Agentic AI workflows', 'RAG', 'Model Context Protocol'],
  },
];

export default function AboutPage() {
  return (
    <>
      <SectionHeading
        eyebrow="About"
        title="A computer engineer who fell in love with teaching."
        description="Researcher, academic leader, educator."
      />

      <article className="prose prose-neutral max-w-2xl dark:prose-invert">
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
        <div className="mt-6 space-y-5">
          {arsenal.map((row) => (
            <div key={row.layer} className="grid gap-3 sm:grid-cols-[160px_1fr] sm:items-baseline">
              <p className="text-xs font-medium uppercase tracking-wider text-brand-700 dark:text-brand-300">
                {row.layer}
              </p>
              <ul className="flex flex-wrap gap-1.5">
                {row.items.map((item) => (
                  <li key={item}>
                    <Badge tone={row.layer === 'Currently learning' ? 'brand' : 'neutral'}>
                      {item}
                    </Badge>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

    </>
  );
}
