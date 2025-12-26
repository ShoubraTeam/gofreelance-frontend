import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import type { GetFreelancerProfileDetailsResponse, GetClientProfileDetailsResponse } from '@/lib/types/profile';
import { editFreelancerProfile, editClientProfile } from '@/lib/api/profile';
import { FiEdit2, FiSave, FiX } from 'react-icons/fi';
import toast from 'react-hot-toast';

interface ProfileBioSectionProps {
  profile: GetFreelancerProfileDetailsResponse | GetClientProfileDetailsResponse;
  onUpdate: () => void;
}

export function ProfileBioSection({
  profile,
  onUpdate,
}: ProfileBioSectionProps) {
  const isFreelancer = 'title' in profile;
  const displayTitle = isFreelancer ? (profile as GetFreelancerProfileDetailsResponse).title : (profile as GetClientProfileDetailsResponse).companyName;

  const [showFullBio, setShowFullBio] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(displayTitle);
  const [bio, setBio] = useState(profile.bio);

  const { mutate: saveFreelancerProfile, isPending: isFreelancerPending } = useMutation({
    mutationFn: editFreelancerProfile,
    onSuccess: () => {
      toast.success('Profile updated successfully');
      setIsEditing(false);
      onUpdate();
    },
    onError: () => {
      toast.error('Failed to update profile');
    },
  });

  const { mutate: saveClientProfile, isPending: isClientPending } = useMutation({
    mutationFn: editClientProfile,
    onSuccess: () => {
      toast.success('Profile updated successfully');
      setIsEditing(false);
      onUpdate();
    },
    onError: () => {
      toast.error('Failed to update profile');
    },
  });

  const isPending = isFreelancerPending || isClientPending;

  const handleSave = () => {
    if (isFreelancer) {
      saveFreelancerProfile({ id: profile.id, title, bio });
    } else {
      saveClientProfile({ id: profile.id, companyName: title, bio });
    }
  };

  const handleCancel = () => {
    setTitle(displayTitle);
    setBio(profile.bio);
    setIsEditing(false);
  };

  const displayBio = profile.bio;
  const shortBio =
    displayBio.length > 300 ? displayBio.substring(0, 300) + '...' : displayBio;

  return (
    <div className="bg-white border border-border rounded-sm p-6 shadow-none">
      <div className="space-y-4">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-start justify-between mb-3">
              <h1 className="text-2xl font-bold text-foreground flex-1">
                {displayTitle}
              </h1>
              {!isEditing && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsEditing(true)}
                >
                  <FiEdit2 className="w-xl" />
                </Button>
              )}
            </div>
          </div>
        </div>

        {isEditing ? (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">
                {isFreelancer ? 'Professional Title' : 'Company Name'}
              </label>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                maxLength={50}
                placeholder={isFreelancer ? 'e.g., Full Stack Developer, UI/UX Designer' : 'e.g., Tech Solutions Inc.'}
              />
              <p className="text-xs text-muted-foreground mt-1">
                {title.length}/50 characters
              </p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">
                Bio
              </label>
              <Textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                rows={6}
                maxLength={500}
                className="resize-none"
              />
              <p className="text-xs text-muted-foreground mt-1">
                {bio.length}/500 characters
              </p>
            </div>

            <div className="flex gap-2">
              <Button
                onClick={handleSave}
                disabled={isPending || title.length < 3 || bio.length < 3}
                size="sm"
              >
                <FiSave className="w-4 h-4 mr-2" />
                {isPending ? 'Saving...' : 'Save Changes'}
              </Button>
              <Button
                onClick={handleCancel}
                variant="outline"
                disabled={isPending}
                size="sm"
              >
                <FiX className="w-4 h-4 mr-2" />
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          <div className="prose prose-sm max-w-none">
            <p className="text-foreground leading-relaxed whitespace-pre-line">
              {showFullBio ? displayBio : shortBio}
            </p>
            {displayBio.length > 300 && (
              <button
                onClick={() => setShowFullBio(!showFullBio)}
                className="text-primary font-medium hover:underline mt-2"
              >
                {showFullBio ? 'less' : 'more'}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
