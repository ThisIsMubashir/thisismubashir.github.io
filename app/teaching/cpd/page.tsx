import { SectionHeading } from '@/components/section-heading';
import { buildMetadata } from '@/lib/seo';
import { getCpdEntries } from '@/lib/content';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

export const metadata = buildMetadata({
  title: 'CPD',
  description: 'Continuing professional development record — courses, workshops, and certifications.',
  path: '/teaching/cpd',
});

export default async function CpdPage() {
  const entries = await getCpdEntries();
  const totalHours = entries.reduce((sum, e) => sum + (e.hours ?? 0), 0);

  return (
    <>
      <SectionHeading
        eyebrow="Teaching"
        title="Continuing professional development"
        description={`${entries.length} courses & workshops completed, ${totalHours.toFixed(1)} CPD hours logged. Updated continually via Sanity once wired up.`}
      />

      {entries.length === 0 ? (
        <div className="rounded-lg border border-dashed border-ink-200 p-8 text-center text-ink-500 dark:border-ink-700 dark:text-ink-300">
          <p className="font-medium">No CPD entries loaded yet.</p>
        </div>
      ) : (
        <Table caption="Continuing professional development record, newest first">
          <TableHead>
            <TableRow>
              <TableHeader>Title</TableHeader>
              <TableHeader>Provider</TableHeader>
              <TableHeader>Date</TableHeader>
              <TableHeader>Hours</TableHeader>
              <TableHeader>Certificate</TableHeader>
            </TableRow>
          </TableHead>
          <TableBody>
            {entries.map((e) => (
              <TableRow key={e.slug}>
                <TableCell className="font-medium">{e.title}</TableCell>
                <TableCell>{e.provider}</TableCell>
                <TableCell>{e.dateCompleted?.slice(0, 10)}</TableCell>
                <TableCell>{e.hours}</TableCell>
                <TableCell>
                  {e.certificateUrl ? (
                    <a
                      href={e.certificateUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-brand-700 dark:text-brand-300"
                    >
                      View
                    </a>
                  ) : e.certificateReceived ? (
                    <Badge tone="success">Received</Badge>
                  ) : (
                    '—'
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </>
  );
}
