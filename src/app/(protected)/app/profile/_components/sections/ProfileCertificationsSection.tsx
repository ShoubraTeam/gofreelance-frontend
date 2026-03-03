import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { FiPlus } from 'react-icons/fi';
import { CertificateDialog } from '@/components/profile/CertificateDialog';
import { DeleteConfirmDialog } from '@/components/DeleteConfirmDialog';
import { ProfileEmptyState } from '../ProfileEmptyState';
import { ProfileSectionCard } from '../ProfileSectionCard';
import { CertificateCard } from '../CertificateCard';
import { CertificateViewDialog } from '../CertificateViewDialog';
import { useItemManager } from '@/hooks/useItemManager';
import { deleteCertificate } from '@/lib/api/profile';
import type {
  GetFreelancerProfileDetailsResponse,
  CertificateDetail,
} from '@/lib/types/profile';
import toast from 'react-hot-toast';

interface ProfileCertificationsSectionProps {
  profile: GetFreelancerProfileDetailsResponse;
  onUpdate: () => void;
}

export function ProfileCertificationsSection({
  profile,
  onUpdate,
}: ProfileCertificationsSectionProps) {
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [viewingCert, setViewingCert] = useState<CertificateDetail | undefined>();

  const { mutate: removeCert } = useMutation({
    mutationFn: (name: string) => deleteCertificate(profile.id, name),
    onSuccess: () => {
      toast.success('Certificate deleted');
      onUpdate();
    },
    onError: () => {
      toast.error('Failed to delete certificate');
    },
  });

  const {
    dialogOpen,
    setDialogOpen,
    deleteDialogOpen,
    setDeleteDialogOpen,
    selectedItem: selectedCert,
    handleEdit,
    handleAdd,
    handleDelete,
    confirmDelete,
  } = useItemManager<CertificateDetail>((name) => removeCert(name));

  const handleView = (cert: CertificateDetail) => {
    setViewingCert(cert);
    setViewDialogOpen(true);
  };

  return (
    <>
      <ProfileSectionCard
        title="Certificates"
        actionIcon={FiPlus}
        onAction={handleAdd}
      >
        {profile.certificates.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {profile.certificates.map((cert) => (
              <CertificateCard
                key={cert.name}
                certificate={cert}
                onView={handleView}
                onEdit={handleEdit}
              />
            ))}
          </div>
        ) : (
          <ProfileEmptyState
            message="No certificates yet"
            actionLabel="Add certificate"
            onAction={handleAdd}
          />
        )}
      </ProfileSectionCard>

      <CertificateDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        profileId={profile.id}
        certificate={selectedCert}
        onSuccess={onUpdate}
        onDelete={
          selectedCert
            ? () => {
                setDialogOpen(false);
                handleDelete(selectedCert.name);
              }
            : undefined
        }
      />

      <CertificateViewDialog
        open={viewDialogOpen}
        onOpenChange={setViewDialogOpen}
        certificate={viewingCert}
      />

      <DeleteConfirmDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        title="Delete Certificate"
        description="Are you sure you want to delete this certificate? This action cannot be undone."
        onConfirm={confirmDelete}
      />
    </>
  );
}
