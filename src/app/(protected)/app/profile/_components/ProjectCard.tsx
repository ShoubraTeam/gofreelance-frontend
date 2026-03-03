import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { FiEdit2 } from 'react-icons/fi';
import type { ProjectDetail } from '@/lib/types/profile';

interface ProjectCardProps {
  project: ProjectDetail;
  onView: (project: ProjectDetail) => void;
  onEdit: (project: ProjectDetail) => void;
}

export function ProjectCard({ project, onView, onEdit }: ProjectCardProps): React.ReactElement {
  return (
    <div
      className="border border-border rounded-sm overflow-hidden hover:border-primary transition-colors group relative cursor-pointer"
      onClick={() => onView(project)}
    >
      <div
        className="absolute right-2 top-2 z-10"
        onClick={(e) => e.stopPropagation()}
      >
        <Button
          onClick={() => onEdit(project)}
          variant="ghost"
          size="sm"
          className="hover:bg-accent bg-background/80 backdrop-blur-sm"
        >
          <FiEdit2 className="w-4 h-4 text-foreground" />
        </Button>
      </div>

      {project.imageUrl && (
        <div className="relative w-full h-48 bg-muted">
          <Image
            src={project.imageUrl}
            alt={project.title}
            fill
            className="object-cover"
          />
        </div>
      )}

      <div className="p-4">
        <h3 className="font-semibold text-foreground mb-2 pr-16">
          {project.title}
        </h3>
        {project.content && (
          <p className="text-sm text-muted-foreground line-clamp-3">
            {project.content}
          </p>
        )}
      </div>
    </div>
  );
}
