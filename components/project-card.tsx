import { Github, Sparkles } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardBody, CardTitle, CardDescription } from '@/components/ui/card';

export interface ProjectCardProps {
  title: string;
  slug?: string;
  summary?: string;
  /** Explicit override for the "Current" badge (e.g. `false` to hide it). */
  current?: boolean;
  repoUrl?: string;
  demoUrl?: string;
  href?: string;
  /** Shows a "Built with AI assistance" label. */
  aiAssisted?: boolean;
}

/**
 * Server-renderable content card. Cards are informational — the summary carries
 * the full project blurb, so there is no "Read more" navigation. Repo and demo
 * links (when present) are the only interactive targets.
 */
export function ProjectCard({
  title,
  summary,
  current,
  repoUrl,
  demoUrl,
  aiAssisted,
}: ProjectCardProps) {
  const hasFooter = Boolean(repoUrl || demoUrl || aiAssisted);

  return (
    <Card variant="elevated" className="h-full">
      <CardBody className="flex h-full flex-col">
        <div className="flex items-start justify-between gap-3">
          <CardTitle className="text-lg sm:text-xl">{title}</CardTitle>
          {current && <Badge tone="success">Current</Badge>}
        </div>

        {summary && (
          <CardDescription className="mt-2 text-sm sm:text-[0.95rem]">{summary}</CardDescription>
        )}

        {hasFooter && (
          <div className="mt-auto flex items-center gap-3 pt-4 text-sm">
            {aiAssisted && (
              <Badge tone="info" className="gap-1">
                <Sparkles className="h-3 w-3" aria-hidden /> Built with AI assistance
              </Badge>
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
        )}
      </CardBody>
    </Card>
  );
}
