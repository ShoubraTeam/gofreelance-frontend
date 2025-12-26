'use client';

import { useState, useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { addCertificate, editCertificate } from '@/lib/api/profile';
import type { CertificateDetail } from '@/lib/types/profile';
import toast from 'react-hot-toast';

interface CertificateDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  profileId: string;
  certificate?: CertificateDetail;
  onSuccess: () => void;
  onDelete?: () => void;
}

export function CertificateDialog({
  open,
  onOpenChange,
  profileId,
  certificate,
  onSuccess,
  onDelete,
}: CertificateDialogProps) {
  const [name, setName] = useState(certificate?.name || '');
  const [imageUrl, setImageUrl] = useState(certificate?.imageUrl || '');

  useEffect(() => {
    if (open) {
      setName(certificate?.name || '');
      setImageUrl(certificate?.imageUrl || '');
    }
  }, [open, certificate]);

  const { mutate, isPending } = useMutation({
    mutationFn: certificate ? editCertificate : addCertificate,
    onSuccess: () => {
      toast.success(
        `Certificate ${certificate ? 'updated' : 'added'} successfully`
      );
      onOpenChange(false);
      onSuccess();
    },
    onError: () => {
      toast.error('Failed to save certificate');
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate({
      profileId,
      certificateName: name,
      certificateUrl: imageUrl || undefined,
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>
              {certificate ? 'Edit' : 'Add'} Certificate
            </DialogTitle>
            <DialogDescription>
              {certificate
                ? 'Update your certificate details'
                : 'Add a new certificate to your profile'}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">
                Certificate Name <span className="text-destructive">*</span>
              </Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. AWS Certified Developer"
                required
                disabled={isPending}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="imageUrl">Certificate Image URL</Label>
              <Input
                id="imageUrl"
                type="url"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="https://example.com/certificate.png"
                disabled={isPending}
              />
            </div>
          </div>

          <Separator className="my-4" />

          <div className="flex justify-between items-center w-full">
            {certificate && onDelete ? (
              <>
                <Button
                  type="button"
                  variant="ghost"
                  onClick={onDelete}
                  disabled={isPending}
                  className="text-destructive hover:text-destructive hover:bg-destructive/10"
                >
                  Delete certificate
                </Button>
                <Button type="submit" disabled={isPending || !name}>
                  {isPending ? 'Saving...' : 'Save'}
                </Button>
              </>
            ) : (
              <Button type="submit" disabled={isPending || !name} className="ml-auto">
                {isPending ? 'Saving...' : 'Save'}
              </Button>
            )}
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
