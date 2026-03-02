import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { FiEdit2 } from 'react-icons/fi';
import { SkillsDialog } from '@/components/profile/SkillsDialog';
import { ProfileEmptyState } from '../ProfileEmptyState';
import { ProfileSectionCard } from '../ProfileSectionCard';
import type { GetFreelancerProfileDetailsResponse } from '@/lib/types/profile';

interface ProfileSkillsSectionProps {
  profile: GetFreelancerProfileDetailsResponse;
  onUpdate: () => void;
}

export function ProfileSkillsSection({
  profile,
  onUpdate,
}: ProfileSkillsSectionProps) {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <>
      <ProfileSectionCard
        title="Skills"
        actionIcon={FiEdit2}
        onAction={() => setDialogOpen(true)}
      >
        {profile.skills?.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {profile.skills?.map((skill) => (
              <Badge
                key={skill.id}
                variant="outline"
                className="px-3 py-1.5 text-sm"
              >
                {skill.name}
              </Badge>
            ))}
          </div>
        ) : (
          <ProfileEmptyState
            message="No skills added yet"
            actionLabel="Add skills"
            onAction={() => setDialogOpen(true)}
          />
        )}
      </ProfileSectionCard>

      <SkillsDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        profileId={profile.id}
        currentSkills={profile.skills || []}
        onSuccess={onUpdate}
      />
    </>
  );
}
