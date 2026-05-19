import { SectionHeading } from '@/components/section-heading';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardBody, CardTitle, CardDescription } from '@/components/ui/card';
import { Field, Input, Select, Textarea } from '@/components/ui/form';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { ProjectCard } from '@/components/project-card';
import { PublicationEntry } from '@/components/publication-entry';
import { DsSection, Example, Swatch } from '@/components/showcase';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Design system',
  description:
    'Tokens, components, and patterns powering this site. Public reference for contributors.',
  path: '/design-system',
});

const brandShades = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950] as const;
const inkShades = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950] as const;
const semantic = [
  { name: 'success', shades: [50, 500, 600, 900] },
  { name: 'warning', shades: [50, 500, 600, 900] },
  { name: 'danger', shades: [50, 500, 600, 900] },
  { name: 'info', shades: [50, 500, 600, 900] },
] as const;

const brandValues: Record<number, string> = {
  50: '#eef1ff', 100: '#dde3ff', 200: '#bdc8ff', 300: '#94a4ff', 400: '#677dff',
  500: '#4259f5', 600: '#2e3fe1', 700: '#2532b6', 800: '#212d92', 900: '#1f2a75', 950: '#161a44',
};
const inkValues: Record<number, string> = {
  50: '#f8f8f7', 100: '#ececea', 200: '#d6d6d2', 300: '#b3b3ad', 400: '#83837c',
  500: '#5a5a55', 600: '#3f3f3c', 700: '#2a2a28', 800: '#1a1a1a', 900: '#111111', 950: '#0a0a0a',
};
const semValues: Record<string, Record<number, string>> = {
  success: { 50: '#ecfdf5', 500: '#10b981', 600: '#059669', 900: '#064e3b' },
  warning: { 50: '#fffbeb', 500: '#f59e0b', 600: '#d97706', 900: '#78350f' },
  danger:  { 50: '#fef2f2', 500: '#ef4444', 600: '#dc2626', 900: '#7f1d1d' },
  info:    { 50: '#eff6ff', 500: '#3b82f6', 600: '#2563eb', 900: '#1e3a8a' },
};

const sections = [
  { id: 'principles', label: 'Principles' },
  { id: 'color', label: 'Color' },
  { id: 'typography', label: 'Typography' },
  { id: 'space-radius', label: 'Space & radius' },
  { id: 'buttons', label: 'Buttons' },
  { id: 'forms', label: 'Forms' },
  { id: 'cards', label: 'Cards' },
  { id: 'badges', label: 'Badges' },
  { id: 'tables', label: 'Tables' },
  { id: 'publication', label: 'Publication entry' },
  { id: 'project', label: 'Project card' },
];

export default function DesignSystemPage() {
  return (
    <>
      <SectionHeading
        eyebrow="Internal"
        title="Design system"
        description="The tokens, primitives, and patterns this site is built from. Updated alongside the codebase — see DESIGN_SYSTEM.md for the full reference."
      />

      <nav aria-label="Sections" className="mb-12 flex flex-wrap gap-2 border-b border-ink-100 pb-6 dark:border-ink-800">
        {sections.map((s) => (
          <a
            key={s.id}
            href={`#${s.id}`}
            className="rounded-md border border-ink-100 px-3 py-1 text-sm no-underline hover:bg-ink-50 dark:border-ink-800 dark:hover:bg-ink-900"
          >
            {s.label}
          </a>
        ))}
      </nav>

      <DsSection
        id="principles"
        title="Principles"
        description="Why this system exists, and how to extend it without drift."
      >
        <ol className="ml-5 list-decimal space-y-2 text-ink-700 dark:text-ink-200">
          <li><strong className="font-medium">Editorial first.</strong> Type, rhythm, and contrast carry the page — not effects.</li>
          <li><strong className="font-medium">Tokens, never magic numbers.</strong> If a value would be reused, it becomes a token.</li>
          <li><strong className="font-medium">Accessible by default.</strong> AA contrast, visible focus, keyboard support before launch.</li>
          <li><strong className="font-medium">One way to do common things.</strong> Buttons, links, and form fields have a canonical primitive.</li>
          <li><strong className="font-medium">Dark-mode parity.</strong> Every component renders correctly in both themes.</li>
        </ol>
      </DsSection>

      <DsSection
        id="color"
        title="Color"
        description="Brand: academic indigo. Neutrals: warm-ish ink. Semantic palette for state — never decorative."
      >
        <h3 className="mb-3 text-sm font-medium uppercase tracking-wider text-ink-500">Brand · indigo</h3>
        <div className="mb-8 grid grid-cols-3 gap-2 sm:grid-cols-6 lg:grid-cols-11">
          {brandShades.map((s) => (
            <Swatch
              key={s}
              name={`brand-${s}`}
              value={brandValues[s]}
              textOn={s >= 400 ? 'dark' : 'light'}
            />
          ))}
        </div>

        <h3 className="mb-3 text-sm font-medium uppercase tracking-wider text-ink-500">Ink · neutrals</h3>
        <div className="mb-8 grid grid-cols-3 gap-2 sm:grid-cols-6 lg:grid-cols-11">
          {inkShades.map((s) => (
            <Swatch
              key={s}
              name={`ink-${s}`}
              value={inkValues[s]}
              textOn={s >= 400 ? 'dark' : 'light'}
            />
          ))}
        </div>

        <h3 className="mb-3 text-sm font-medium uppercase tracking-wider text-ink-500">Semantic</h3>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {semantic.map((s) => (
            <div key={s.name}>
              <p className="mb-2 text-sm font-medium capitalize">{s.name}</p>
              <div className="grid grid-cols-4 gap-1.5">
                {s.shades.map((shade) => (
                  <Swatch
                    key={shade}
                    name={`${shade}`}
                    value={semValues[s.name][shade]}
                    textOn={shade >= 500 ? 'dark' : 'light'}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </DsSection>

      <DsSection
        id="typography"
        title="Typography"
        description="Geometric sans (Inter in prod; system stack fallback). Scale ratio ≈1.20, line-height generous for academic reading."
      >
        <div className="space-y-3">
          <p className="text-5xl tracking-tightish">Display 5xl — 48 / 53</p>
          <p className="text-4xl tracking-tightish">Heading 4xl — 36 / 43</p>
          <p className="text-3xl">Heading 3xl — 30 / 39</p>
          <p className="text-2xl">Heading 2xl — 24 / 34</p>
          <p className="text-xl">Heading xl — 20 / 31</p>
          <p className="text-lg">Lead lg — 18 / 30</p>
          <p className="text-base">Body base — 16 / 27. The portfolio&apos;s everyday reading size. The sun sets behind the mountain.</p>
          <p className="text-sm">Small sm — 14 / 22. Metadata, captions, and footers.</p>
          <p className="text-xs">Xtra small xs — 12 / 18. Labels, eyebrows, dense tables.</p>
          <p className="font-mono text-sm">font-mono — DOI, code, BibTeX</p>
          <p className="font-serif text-2xl italic">font-serif — reserved for editorial moments</p>
        </div>
      </DsSection>

      <DsSection
        id="space-radius"
        title="Space, radius, elevation"
        description="Tailwind's spacing scale with two additions: `section` (4rem) and `section-lg` (6rem) for vertical rhythm between page sections."
      >
        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <p className="mb-2 text-sm font-medium">Radius</p>
            <div className="flex items-end gap-3">
              {['rounded-sm', 'rounded', 'rounded-md', 'rounded-lg', 'rounded-xl'].map((r) => (
                <div key={r} className="text-center">
                  <div className={`h-12 w-12 bg-brand-100 dark:bg-brand-900 ${r}`} />
                  <p className="mt-1 text-xs font-mono">{r}</p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <p className="mb-2 text-sm font-medium">Elevation</p>
            <div className="flex items-end gap-3">
              {['shadow-xs', 'shadow-sm', 'shadow-md', 'shadow-lg'].map((s) => (
                <div key={s} className="text-center">
                  <div className={`h-12 w-12 rounded-md bg-white dark:bg-ink-800 ${s}`} />
                  <p className="mt-1 text-xs font-mono">{s}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </DsSection>

      <DsSection
        id="buttons"
        title="Buttons"
        description="Five variants × three sizes. Always prefer the lightest variant that still reads as actionable."
      >
        <Example label="Variants" source={`<Button variant="primary">Primary</Button>`}>
          <div className="flex flex-wrap items-center gap-3">
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="link">Link button</Button>
            <Button variant="danger">Danger</Button>
          </div>
        </Example>

        <Example label="Sizes" source={`<Button size="sm" | "md" | "lg">…</Button>`}>
          <div className="flex flex-wrap items-center gap-3">
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
            <Button size="lg">Large</Button>
          </div>
        </Example>

        <Example label="States" source={`<Button loading>…</Button>  <Button disabled>…</Button>`}>
          <div className="flex flex-wrap items-center gap-3">
            <Button loading>Loading</Button>
            <Button disabled>Disabled</Button>
          </div>
        </Example>
      </DsSection>

      <DsSection
        id="forms"
        title="Forms"
        description="Field wraps Label + control + description + error and wires aria-describedby automatically."
      >
        <Example source={`<Field id="email" label="Email" required>\n  <Input type="email" />\n</Field>`}>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field id="ds-email" label="Email" required description="Used only to reply to you.">
              <Input type="email" placeholder="you@example.com" />
            </Field>
            <Field id="ds-topic" label="Topic">
              <Select defaultValue="">
                <option value="" disabled>Choose one</option>
                <option>Research collaboration</option>
                <option>Teaching / supervision</option>
                <option>Industry project</option>
              </Select>
            </Field>
            <Field id="ds-msg" label="Message" required>
              <Textarea placeholder="Hi Mubashir, …" />
            </Field>
            <Field
              id="ds-err"
              label="Field with error"
              error="Please provide a valid value."
            >
              <Input defaultValue="abc" />
            </Field>
          </div>
        </Example>
      </DsSection>

      <DsSection
        id="cards"
        title="Cards"
        description="Three variants. `elevated` lifts on hover and is the default for clickable item grids."
      >
        <div className="grid gap-4 sm:grid-cols-3">
          <Card variant="plain">
            <CardBody>
              <CardTitle>Plain</CardTitle>
              <CardDescription>No border, no fill. For semantic grouping only.</CardDescription>
            </CardBody>
          </Card>
          <Card variant="outlined">
            <CardBody>
              <CardTitle>Outlined</CardTitle>
              <CardDescription>Subtle separation. Default for static content.</CardDescription>
            </CardBody>
          </Card>
          <Card variant="elevated">
            <CardBody>
              <CardTitle>Elevated</CardTitle>
              <CardDescription>Lifts on hover. Use for interactive grids.</CardDescription>
            </CardBody>
          </Card>
        </div>
      </DsSection>

      <DsSection
        id="badges"
        title="Badges"
        description="Pill labels in six tones. Reserve semantic tones for status; use brand/neutral for category tags."
      >
        <Example>
          <div className="flex flex-wrap gap-2">
            <Badge tone="neutral">Neutral</Badge>
            <Badge tone="brand">Brand</Badge>
            <Badge tone="success">Success</Badge>
            <Badge tone="warning">Warning</Badge>
            <Badge tone="danger">Danger</Badge>
            <Badge tone="info">Info</Badge>
          </div>
        </Example>
      </DsSection>

      <DsSection
        id="tables"
        title="Tables"
        description="Responsive wrapper, sticky-ready header, sr-only caption by default. Used for the CPD record and course lists."
      >
        <Table caption="Example CPD entries">
          <TableHead>
            <TableRow>
              <TableHeader>Title</TableHeader>
              <TableHeader>Provider</TableHeader>
              <TableHeader>Date</TableHeader>
              <TableHeader>Hours</TableHeader>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">Cybersecurity Awareness</TableCell>
              <TableCell>Strathclyde &amp; MetaCompliance</TableCell>
              <TableCell>2025-09-08</TableCell>
              <TableCell>1</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Diversity in Workplace</TableCell>
              <TableCell>Strathclyde &amp; MARSHALL</TableCell>
              <TableCell>2025-10-09</TableCell>
              <TableCell>3</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Teaching Workshop — CodeRunner</TableCell>
              <TableCell>University of Strathclyde</TableCell>
              <TableCell>2025-11-05</TableCell>
              <TableCell>1</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </DsSection>

      <DsSection
        id="publication"
        title="Publication entry"
        description="Domain component composed from Badge + Button + typography. One entry per paper on /publications."
      >
        <Example>
          <ul className="divide-y divide-ink-100 dark:divide-ink-800">
            <PublicationEntry
              as="li"
              title="EETD: An Energy Efficient Design for Runtime Hardware Trojan Detection in Untrusted Network-on-Chip"
              authors={['Mubashir Hussain', 'Amin Malekpour', 'Hui Guo', 'Siri Parameswaran']}
              venue="IEEE Computer Society Annual Symposium on VLSI"
              year={2018}
              type="conference"
              doi="10.1109/isvlsi.2018.00070"
              bibtex="@inproceedings{hussain2018eetd, …}"
            />
            <PublicationEntry
              as="li"
              title="Teaching and Learning in the Digital Era: Effectiveness of Game-Based Learning for Programming Courses"
              authors={['Mubashir Hussain']}
              venue="World Scientific eBooks"
              year={2024}
              type="chapter"
              doi="10.1142/13658"
            />
          </ul>
        </Example>
      </DsSection>

      <DsSection
        id="project"
        title="Project card"
        description="Grid-friendly card used on /projects and homepage. Whole card is the link target; secondary links (repo, demo) stop event propagation."
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <ProjectCard
            title="Hardware Trojan Detection Unit for NoC-based MPSoC"
            slug="hardware-trojan-detection"
            summary="A modified BookSim NoC simulator with a Trojan in one router and a runtime detection unit that authenticates packets before they leave a core."
            tags={['Hardware security', 'NoC', 'C++', 'Verilog']}
            endDate="2018-08-01"
            repoUrl="https://github.com/ThisIsMubashir"
          />
          <ProjectCard
            title="Maximising the Lifetime of a Wireless Sensor Network"
            slug="wsn-lifetime"
            summary="A meta-heuristic that picks which sensors to activate so total coverage is maintained while battery life is extended."
            tags={['Optimization', 'WSN', 'Python']}
            repoUrl="https://github.com/ThisIsMubashir"
          />
        </div>
      </DsSection>
    </>
  );
}
