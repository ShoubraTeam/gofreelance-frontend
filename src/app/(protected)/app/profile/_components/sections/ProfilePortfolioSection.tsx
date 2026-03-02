import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { FiEdit2, FiPlus } from 'react-icons/fi';
import { ProjectDialog } from '@/components/profile/ProjectDialog';
import { DeleteConfirmDialog } from '@/components/DeleteConfirmDialog';
import { ProfileEmptyState } from '../ProfileEmptyState';
import { ProfileSectionCard } from '../ProfileSectionCard';
import { deleteProject } from '@/lib/api/profile';
import type {
  GetFreelancerProfileDetailsResponse,
  ProjectDetail,
} from '@/lib/types/profile';
import toast from 'react-hot-toast';

interface ProfilePortfolioSectionProps {
  profile: GetFreelancerProfileDetailsResponse;
  onUpdate: () => void;
}

export function ProfilePortfolioSection({
  profile,
  onUpdate,
}: ProfilePortfolioSectionProps) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState<
    ProjectDetail | undefined
  >();
  const [viewingProject, setViewingProject] = useState<
    ProjectDetail | undefined
  >();

  const { mutate: removeProject } = useMutation({
    mutationFn: ({ title }: { title: string }) =>
      deleteProject(profile.id, title),
    onSuccess: () => {
      toast.success('Project deleted');
      onUpdate();
    },
    onError: () => {
      toast.error('Failed to delete project');
    },
  });

  const handleEdit = (project: ProjectDetail) => {
    setSelectedProject(project);
    setDialogOpen(true);
  };

  const handleAdd = () => {
    setSelectedProject(undefined);
    setDialogOpen(true);
  };

  const handleDelete = (title: string) => {
    setProjectToDelete(title);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (projectToDelete) {
      removeProject({ title: projectToDelete });
      setDeleteDialogOpen(false);
      setProjectToDelete(null);
    }
  };

  const handleView = (project: ProjectDetail) => {
    setViewingProject(project);
    setViewDialogOpen(true);
  };

  return (
    <>
      <ProfileSectionCard
        title="Portfolio"
        actionIcon={FiPlus}
        onAction={handleAdd}
      >
        {profile.projects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {profile.projects.map((project) => (
                <div
                  key={project.title}
                  className="border border-border rounded-sm overflow-hidden hover:border-primary transition-colors group relative cursor-pointer"
                  onClick={() => handleView(project)}
                >
                  <div
                    className="absolute right-2 top-2 z-10"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Button
                      onClick={() => handleEdit(project)}
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
              ))}
          </div>
        ) : (
          <ProfileEmptyState
            message="No projects yet"
            actionLabel="Add portfolio project"
            onAction={handleAdd}
          />
        )}
      </ProfileSectionCard>

      <ProjectDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        profileId={profile.id}
        project={selectedProject}
        onSuccess={onUpdate}
        onDelete={
          selectedProject
            ? () => {
                setDialogOpen(false);
                handleDelete(selectedProject.title);
              }
            : undefined
        }
      />

      <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
        <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl">
              {viewingProject?.title}
            </DialogTitle>
          </DialogHeader>
          <div className="mt-4 space-y-4">
            {viewingProject?.imageUrl && (
              <div className="relative w-full bg-muted rounded-lg overflow-hidden h-96">
                <Image
                  src={viewingProject.imageUrl}
                  alt={viewingProject.title}
                  fill
                  className="object-contain"
                />
              </div>
            )}
            {viewingProject?.content && (
              <div>
                <h4 className="text-sm font-semibold text-foreground mb-2">
                  Description
                </h4>
                <p className="text-sm text-muted-foreground whitespace-pre-line">
                  {viewingProject.content}
                </p>
              </div>
            )}
            {(viewingProject?.projectUrl || viewingProject?.fileUrl) && (
              <div className="flex flex-wrap gap-3 pt-2">
                {viewingProject.projectUrl && (
                  <a
                    href={viewingProject.projectUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-primary hover:underline inline-flex items-center gap-1"
                    onClick={(e) => e.stopPropagation()}
                  >
                    View Project →
                  </a>
                )}
                {viewingProject.fileUrl && (
                  <a
                    href={viewingProject.fileUrl}
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

      <DeleteConfirmDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        title="Delete Project"
        description="Are you sure you want to delete this project? This action cannot be undone."
        onConfirm={confirmDelete}
      />
    </>
  );
}
