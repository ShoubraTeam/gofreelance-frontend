import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
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
import { CertificateDialog } from '@/components/profile/CertificateDialog';
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
      <div className="bg-white border border-border rounded-md p-6 shadow-none">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Certificates</h2>
          <Button variant="ghost" size="icon" onClick={handleAdd}>
            <FiPlus className="w-7 h-7" />
          </Button>
        </div>

        {profile.certificates.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {profile.certificates.map((cert, index) => (
                <div
                  key={index}
                  className="border border-border rounded-md overflow-hidden group hover:border-primary transition-colors cursor-pointer"
                  onClick={() => handleView(cert)}
                >
                  {cert.imageUrl && (
                    <div className="relative w-full bg-muted">
                      <img
                        src={cert.imageUrl}
                        alt={cert.name}
                        className="w-full h-auto object-contain max-h-64"
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
          <div className="text-center py-8">
            <p className="text-muted-foreground text-sm">
              No certificates yet
            </p>
            <Button
              variant="outline"
              size="sm"
              className="mt-4"
              onClick={handleAdd}
            >
              Add certificate
            </Button>
          </div>
        )}
      </div>

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
              <div className="w-full bg-muted rounded-lg overflow-hidden">
                <img
                  src={viewingCert.imageUrl}
                  alt={viewingCert.name}
                  className="w-full h-auto object-contain"
                />
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Certificate</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this certificate? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-destructive text-white hover:bg-destructive/90">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
