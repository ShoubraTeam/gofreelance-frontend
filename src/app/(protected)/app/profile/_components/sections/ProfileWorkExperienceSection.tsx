import { useMutation } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { FiEdit2, FiPlus } from 'react-icons/fi';
import { WorkExperienceDialog } from '@/components/profile/WorkExperienceDialog';
import { DeleteConfirmDialog } from '@/components/DeleteConfirmDialog';
import { ProfileEmptyState } from '../ProfileEmptyState';
import { ProfileSectionCard } from '../ProfileSectionCard';
import { useItemManager } from '@/hooks/useItemManager';
import { deleteWorkExperience } from '@/lib/api/profile';
import type {
  GetFreelancerProfileDetailsResponse,
  WorkExperienceDetail,
} from '@/lib/types/profile';
import toast from 'react-hot-toast';

interface ProfileWorkExperienceSectionProps {
  profile: GetFreelancerProfileDetailsResponse;
  onUpdate: () => void;
}

export function ProfileWorkExperienceSection({
  profile,
  onUpdate,
}: ProfileWorkExperienceSectionProps) {
  const { mutate: removeWorkExp } = useMutation({
    mutationFn: (workedAt: string) => deleteWorkExperience(profile.id, workedAt),
    onSuccess: () => {
      toast.success('Work experience deleted');
      onUpdate();
    },
    onError: () => {
      toast.error('Failed to delete work experience');
    },
  });

  const {
    dialogOpen,
    setDialogOpen,
    deleteDialogOpen,
    setDeleteDialogOpen,
    selectedItem: selectedExp,
    handleEdit,
    handleAdd,
    handleDelete,
    confirmDelete,
  } = useItemManager<WorkExperienceDetail>((workedAt) => removeWorkExp(workedAt));

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <>
      <ProfileSectionCard
        title="Work Experience"
        actionIcon={FiPlus}
        onAction={handleAdd}
      >
        {profile.workExperiences.length > 0 ? (
          <div className="space-y-4">
            {profile.workExperiences.map((exp, index) => (
              <div
                key={index}
                className="border-l-2 border-primary pl-4 relative group"
              >
                <div className="absolute right-0 top-0">
                  <Button
                    onClick={() => handleEdit(exp)}
                    variant="ghost"
                    size="sm"
                    className="hover:bg-accent"
                  >
                    <FiEdit2 className="w-4 h-4 text-foreground" />
                  </Button>
                </div>
                <h3 className="font-semibold text-foreground pr-20">
                  {exp.jobTitle || 'Position'}
                </h3>
                <p className="text-sm text-muted-foreground">{exp.workedAt}</p>
                {(exp.startedAt || exp.endedAt) && (
                  <p className="text-sm text-muted-foreground mt-1">
                    {exp.startedAt ? formatDate(exp.startedAt) : 'Start'} -{' '}
                    {exp.endedAt ? formatDate(exp.endedAt) : 'Present'}
                  </p>
                )}
              </div>
            ))}
          </div>
        ) : (
          <ProfileEmptyState
            message="No work experience yet"
            actionLabel="Add work experience"
            onAction={handleAdd}
          />
        )}
      </ProfileSectionCard>

      <WorkExperienceDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        profileId={profile.id}
        experience={selectedExp}
        onSuccess={onUpdate}
        onDelete={
          selectedExp
            ? () => {
                setDialogOpen(false);
                handleDelete(selectedExp.workedAt);
              }
            : undefined
        }
      />

      <DeleteConfirmDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        title="Delete Work Experience"
        description="Are you sure you want to delete this work experience? This action cannot be undone."
        onConfirm={confirmDelete}
      />
    </>
  );
}
