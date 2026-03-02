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
import { CertificateDialog } from '@/components/profile/CertificateDialog';
import { DeleteConfirmDialog } from '@/components/DeleteConfirmDialog';
import { ProfileEmptyState } from '../ProfileEmptyState';
import { ProfileSectionCard } from '../ProfileSectionCard';
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
  const [dialogOpen, setDialogOpen] = useState(false);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [certToDelete, setCertToDelete] = useState<string | null>(null);
  const [selectedCert, setSelectedCert] = useState<
    CertificateDetail | undefined
  >();
  const [viewingCert, setViewingCert] = useState<
    CertificateDetail | undefined
  >();

  const { mutate: removeCert } = useMutation({
    mutationFn: ({ name }: { name: string }) =>
      deleteCertificate(profile.id, name),
    onSuccess: () => {
      toast.success('Certificate deleted');
      onUpdate();
    },
    onError: () => {
      toast.error('Failed to delete certificate');
    },
  });

  const handleEdit = (cert: CertificateDetail) => {
    setSelectedCert(cert);
    setDialogOpen(true);
  };

  const handleAdd = () => {
    setSelectedCert(undefined);
    setDialogOpen(true);
  };

  const handleDelete = (name: string) => {
    setCertToDelete(name);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (certToDelete) {
      removeCert({ name: certToDelete });
      setDeleteDialogOpen(false);
      setCertToDelete(null);
    }
  };

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
                <div
                  key={cert.name}
                  className="border border-border rounded-md overflow-hidden group hover:border-primary transition-colors cursor-pointer"
                  onClick={() => handleView(cert)}
                >
                  {cert.imageUrl && (
                    <div className="relative w-full bg-muted h-64">
                      <Image
                        src={cert.imageUrl}
                        alt={cert.name}
                        fill
                        className="object-contain"
                      />
                    </div>
                  )}
                  <div className="p-4">
                    <div className="flex items-start justify-between">
                      <h3 className="font-medium text-foreground flex-1">
                        {cert.name}
                      </h3>
                      <div onClick={(e) => e.stopPropagation()}>
                        <Button
                          onClick={() => handleEdit(cert)}
                          variant="ghost"
                          size="sm"
                          className="hover:bg-accent"
                        >
                          <FiEdit2 className="w-4 h-4 text-foreground" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
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

      <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{viewingCert?.name}</DialogTitle>
          </DialogHeader>
          <div className="mt-4">
            {viewingCert?.imageUrl && (
              <div className="relative w-full bg-muted rounded-lg overflow-hidden h-96">
                <Image
                  src={viewingCert.imageUrl}
                  alt={viewingCert.name}
                  fill
                  className="object-contain"
                />
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

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
