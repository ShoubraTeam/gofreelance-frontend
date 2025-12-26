import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { FiEdit2, FiPlus } from 'react-icons/fi';
import { WorkExperienceDialog } from '@/components/profile/WorkExperienceDialog';
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
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [expToDelete, setExpToDelete] = useState<string | null>(null);
  const [selectedExp, setSelectedExp] = useState<
    WorkExperienceDetail | undefined
  >();

  const { mutate: removeWorkExp } = useMutation({
    mutationFn: ({ workedAt }: { workedAt: string }) =>
      deleteWorkExperience(profile.id, workedAt),
    onSuccess: () => {
      toast.success('Work experience deleted');
      onUpdate();
    },
    onError: () => {
      toast.error('Failed to delete work experience');
    },
  });

  const handleEdit = (exp: WorkExperienceDetail) => {
    setSelectedExp(exp);
    setDialogOpen(true);
  };

  const handleAdd = () => {
    setSelectedExp(undefined);
    setDialogOpen(true);
  };

  const handleDelete = (workedAt: string) => {
    setExpToDelete(workedAt);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (expToDelete) {
      removeWorkExp({ workedAt: expToDelete });
      setDeleteDialogOpen(false);
      setExpToDelete(null);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <>
      <div className="bg-white border border-border rounded-sm p-6 shadow-none">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Work Experience</h2>
          <Button variant="ghost" size="icon" onClick={handleAdd}>
            <FiPlus className="w-7 h-7" />
          </Button>
        </div>

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
          <div className="text-center py-8">
            <p className="text-muted-foreground text-sm">
              No work experience yet
            </p>
            <Button
              variant="outline"
              size="sm"
              className="mt-4"
              onClick={handleAdd}
            >
              Add work experience
            </Button>
          </div>
        )}
      </div>

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

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Work Experience</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this work experience? This action
              cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-destructive text-white hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
