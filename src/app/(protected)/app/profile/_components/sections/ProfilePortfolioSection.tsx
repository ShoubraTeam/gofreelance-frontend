import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { FiPlus } from 'react-icons/fi';
import { ProjectDialog } from '@/components/profile/ProjectDialog';
import { DeleteConfirmDialog } from '@/components/DeleteConfirmDialog';
import { ProfileEmptyState } from '../ProfileEmptyState';
import { ProfileSectionCard } from '../ProfileSectionCard';
import { ProjectCard } from '../ProjectCard';
import { ProjectViewDialog } from '../ProjectViewDialog';
import { useItemManager } from '@/hooks/useItemManager';
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
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [viewingProject, setViewingProject] = useState<ProjectDetail | undefined>();

  const { mutate: removeProject } = useMutation({
    mutationFn: (title: string) => deleteProject(profile.id, title),
    onSuccess: () => {
      toast.success('Project deleted');
      onUpdate();
    },
    onError: () => {
      toast.error('Failed to delete project');
    },
  });

  const {
    dialogOpen,
    setDialogOpen,
    deleteDialogOpen,
    setDeleteDialogOpen,
    selectedItem: selectedProject,
    handleEdit,
    handleAdd,
    handleDelete,
    confirmDelete,
  } = useItemManager<ProjectDetail>((title) => removeProject(title));

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
              <ProjectCard
                key={project.title}
                project={project}
                onView={handleView}
                onEdit={handleEdit}
              />
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

      <ProjectViewDialog
        open={viewDialogOpen}
        onOpenChange={setViewDialogOpen}
        project={viewingProject}
      />

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
