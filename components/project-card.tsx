import NextLink from 'next/link';
import { ArrowUpRight, Github } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardBody, CardTitle, CardDescription } from '@/components/ui/card';

export interface ProjectCardProps {
  title: string;
  slug?: string;
  summary?: string;
  tags?: string[];
  /** Show "Current" badge when endDate is undefined. */
  endDate?: string;
  repoUrl?: string;
  demoUrl?: string;
  href?: string;
}

/**
 * Server-renderable card. The primary link is the title — an overlay pseudo
 * span extends the click target to the whole card. Secondary links (repo,
 * demo) sit at `z-index: 1` and capture clicks before the overlay does — no
 * nested `<a>` tags, no Client Component required.
 */
export function ProjectCard({
  title,
  slug,
  summary,
  tags = [],
  endDate,
  repoUrl,
  demoUrl,
  href,
}: ProjectCardProps) {
  const detailHref = href ?? (slug ? `/projects/${slug}` : undefined);
  const ongoing = !endDate;

  return (
    <Card variant="elevated" className="group relative h-full">
      <CardBody className="flex h-full flex-col">
        <div className="flex items-start justify-between gap-3">
          <CardTitle>
            {detailHref ? (
              <NextLink
                href={detailHref}
                className="no-underline text-ink-900 dark:text-ink-50 after:absolute after:inset-0 after:content-[''] after:rounded-lg"
              >
                {title}
              </NextLink>
            ) : (
              title
            )}
          </CardTitle>
          {ongoing && <Badge tone="success">Current</Badge>}
        </div>

        {summary && <CardDescription className="mt-2 line-clamp-3">{summary}</CardDescription>}

        <div className="relative z-[1] mt-auto flex items-center gap-3 pt-4 text-sm">
          {detailHref && (
            <span className="inline-flex items-center gap-1 text-brand-700 group-hover:underline dark:text-brand-300">
              Read more <ArrowUpRight className="h-4 w-4" />
            </span>
          )}
          {repoUrl && (
            <a
              href={repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-ink-500 hover:text-ink-900 dark:text-ink-300 dark:hover:text-ink-50"
              aria-label={`GitHub repository for ${title}`}
            >
              <Github className="h-4 w-4" />
            </a>
          )}
          {demoUrl && (
            <a
              href={demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-auto text-ink-500 hover:text-ink-900 dark:text-ink-300 dark:hover:text-ink-50"
            >
              Live demo →
            </a>
          )}
        </div>
      </CardBody>
    </Card>
  );
}
