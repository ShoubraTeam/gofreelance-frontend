import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FiEdit2 } from 'react-icons/fi';
import { SkillsDialog } from '@/components/profile/SkillsDialog';
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
      <div className="bg-white border border-border rounded-sm p-6 shadow-none">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Skills</h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setDialogOpen(true)}
          >
            <FiEdit2 className="w-7 h-7" />
          </Button>
        </div>

        {profile.skills.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {profile.skills.map((skill) => (
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
          <div className="text-center py-8">
            <p className="text-muted-foreground text-sm">No skills added yet</p>
            <Button
              variant="outline"
              size="sm"
              className="mt-4"
              onClick={() => setDialogOpen(true)}
            >
              Add skills
            </Button>
          </div>
        )}
      </div>

      <SkillsDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        profileId={profile.id}
        currentSkills={profile.skills}
        onSuccess={onUpdate}
      />
    </>
  );
}
