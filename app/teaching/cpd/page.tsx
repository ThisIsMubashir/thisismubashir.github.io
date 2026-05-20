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

export const metadata = buildMetadata({
  title: 'CPD',
  description: 'Continuing professional development record — courses, workshops, and certifications.',
  path: '/teaching/cpd',
});

function formatMonthYear(dateStr?: string): string {
  if (!dateStr) return '—';
  const [year, month] = dateStr.split('-');
  if (!month) return year;
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${monthNames[parseInt(month, 10) - 1]} ${year}`;
}

export default async function CpdPage() {
  const entries = await getCpdEntries();

  return (
    <>
      <SectionHeading
       
        title="Continuing professional development"
        description="Courses, workshops, and certifications completed."
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
            </TableRow>
          </TableHead>
          <TableBody>
            {entries.map((e) => (
              <TableRow key={e.slug}>
                <TableCell className="font-medium">{e.title}</TableCell>
                <TableCell>{e.provider}</TableCell>
                <TableCell>{formatMonthYear(e.dateCompleted)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </>
  );
}
