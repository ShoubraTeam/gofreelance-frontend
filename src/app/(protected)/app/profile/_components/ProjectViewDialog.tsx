import Image from 'next/image';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import type { ProjectDetail } from '@/lib/types/profile';

interface ProjectViewDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  project: ProjectDetail | undefined;
}

export function ProjectViewDialog({ open, onOpenChange, project }: ProjectViewDialogProps): React.ReactElement {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">{project?.title}</DialogTitle>
        </DialogHeader>
        <div className="mt-4 space-y-4">
          {project?.imageUrl && (
            <div className="relative w-full bg-muted rounded-lg overflow-hidden h-96">
              <Image
                src={project.imageUrl}
                alt={project.title}
                fill
                className="object-contain"
              />
            </div>
          )}
          {project?.content && (
            <div>
              <h4 className="text-sm font-semibold text-foreground mb-2">Description</h4>
              <p className="text-sm text-muted-foreground whitespace-pre-line">
                {project.content}
              </p>
            </div>
          )}
          {(project?.projectUrl || project?.fileUrl) && (
            <div className="flex flex-wrap gap-3 pt-2">
              {project.projectUrl && (
                <a
                  href={project.projectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-primary hover:underline inline-flex items-center gap-1"
                  onClick={(e) => e.stopPropagation()}
                >
                  View Project →
                </a>
              )}
              {project.fileUrl && (
                <a
                  href={project.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-primary hover:underline inline-flex items-center gap-1"
                  onClick={(e) => e.stopPropagation()}
                >
                  Download File ↓
                </a>
              )}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
