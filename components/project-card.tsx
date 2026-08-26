import { Github } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardBody, CardTitle, CardDescription } from '@/components/ui/card';

export interface ProjectCardProps {
  title: string;
  slug?: string;
  summary?: string;
  /** Show "Current" badge when endDate is undefined, unless `current` overrides it. */
  endDate?: string;
  /** Explicit override for the "Current" badge (e.g. `false` to hide it). */
  current?: boolean;
  repoUrl?: string;
  demoUrl?: string;
  href?: string;
}

/**
 * Server-renderable content card. Cards are informational — the summary carries
 * the full project blurb, so there is no "Read more" navigation. Repo and demo
 * links (when present) are the only interactive targets.
 */
export function ProjectCard({
  title,
  summary,
  endDate,
  current,
  repoUrl,
  demoUrl,
}: ProjectCardProps) {
  const ongoing = current ?? !endDate;
  const hasLinks = Boolean(repoUrl || demoUrl);

  return (
    <Card variant="elevated" className="h-full">
      <CardBody className="flex h-full flex-col">
        <div className="flex items-start justify-between gap-3">
          <CardTitle className="text-base sm:text-lg">{title}</CardTitle>
          {ongoing && <Badge tone="success">Current</Badge>}
        </div>

        {summary && (
          <CardDescription className="mt-2 text-sm sm:text-[0.95rem]">{summary}</CardDescription>
        )}

        {hasLinks && (
          <div className="mt-auto flex items-center gap-3 pt-4 text-sm">
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
        )}
      </CardBody>
    </Card>
  );
}
