'use client';

import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getAccountInfo } from '@/lib/api/auth';
import { submitIdentityVerification } from '@/lib/api/verification';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { HiOutlineIdentification, HiOutlineCamera, HiOutlineShieldCheck } from 'react-icons/hi';
import toast from 'react-hot-toast';
import { VerificationStatus } from './_components/VerificationStatus';
import { ImageUploadCard } from './_components/ImageUploadCard';

export default function IdentityVerificationPage(): React.ReactElement {
  const [idImage, setIdImage] = useState<string | null>(null);
  const [selfieImage, setSelfieImage] = useState<string | null>(null);
  const queryClient = useQueryClient();

  const {
    data: accountData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['account', 'info'],
    queryFn: getAccountInfo,
  });

  const mutation = useMutation({
    mutationFn: submitIdentityVerification,
    onSuccess: () => {
      toast.success('Verification submitted successfully. We will review your documents shortly.');
      setIdImage(null);
      setSelfieImage(null);
      queryClient.invalidateQueries({ queryKey: ['account', 'info'] });
    },
    onError: (err: Error) => {
      toast.error(err.message || 'Failed to submit verification. Please try again.');
    },
  });

  const handleSubmit = (): void => {
    if (!idImage || !selfieImage) {
      toast.error('Please upload both your ID and selfie.');
      return;
    }
    mutation.mutate({
      image1Base64: idImage,
      image2Base64: selfieImage,
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="bg-destructive/10 text-destructive px-4 py-3 rounded-lg">
          Failed to load account information. Please try again later.
        </div>
      </div>
    );
  }

  const account = accountData?.data;
  const status = account?.identityStatus || 'UNVERIFIED';
  const canSubmit = status === 'UNVERIFIED' || status === 'REJECTED';

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="max-w-4xl mx-auto px-6 pb-12 pt-20">
        <div className="mb-8">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-2xl font-semibold">Identity Verification</h1>
              <p className="text-muted-foreground mt-1">
                Verify your identity to unlock all platform features
              </p>
            </div>
            <VerificationStatus status={status} />
          </div>
        </div>

        {status === 'VERIFIED' && (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <div className="flex items-center justify-center w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 mb-4">
                <HiOutlineShieldCheck className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>
              <h2 className="text-xl font-semibold">Identity Verified</h2>
              <p className="text-muted-foreground mt-2 text-center max-w-md">
                Your identity has been successfully verified. You now have full access to all
                platform features.
              </p>
            </CardContent>
          </Card>
        )}

        {status === 'ON_HOLD' && (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <div className="flex items-center justify-center w-16 h-16 rounded-full bg-yellow-100 dark:bg-yellow-900/30 mb-4">
                <Loader2 className="h-8 w-8 text-yellow-600 dark:text-yellow-400 animate-spin" />
              </div>
              <h2 className="text-xl font-semibold">Verification Under Review</h2>
              <p className="text-muted-foreground mt-2 text-center max-w-md">
                We are currently reviewing your submitted documents. This usually takes 1-2
                business days. We will notify you once the review is complete.
              </p>
            </CardContent>
          </Card>
        )}

        {status === 'REJECTED' && (
          <Card className="mb-6 border-destructive/50">
            <CardHeader>
              <CardTitle className="text-destructive">Verification Rejected</CardTitle>
              <CardDescription>
                Your previous verification was rejected. Please upload new, clear images of your
                documents and try again.
              </CardDescription>
            </CardHeader>
          </Card>
        )}

        {canSubmit && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <ImageUploadCard
                title="National ID"
                description="Upload a clear photo of your ID"
                icon={<HiOutlineIdentification className="h-5 w-5" />}
                value={idImage}
                onChange={setIdImage}
                disabled={mutation.isPending}
              />
              <ImageUploadCard
                title="Selfie"
                description="Take a selfie holding your ID"
                icon={<HiOutlineCamera className="h-5 w-5" />}
                value={selfieImage}
                onChange={setSelfieImage}
                disabled={mutation.isPending}
              />
            </div>

            <div className="flex justify-center">
              <Button
                onClick={handleSubmit}
                disabled={!idImage || !selfieImage || mutation.isPending}
                size="lg"
                className="min-w-[200px]"
              >
                {mutation.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  'Submit for Verification'
                )}
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
