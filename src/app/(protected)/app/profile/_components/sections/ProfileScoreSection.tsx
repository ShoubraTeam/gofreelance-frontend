import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { scoreFreelancerProfile } from '@/lib/api/profile';
import { getApiErrorCode } from '@/lib/utils';
import { FiTrendingUp } from 'react-icons/fi';
import { Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

interface ProfileScoreSectionProps {
  profileId: string;
}

export function ProfileScoreSection({ profileId }: ProfileScoreSectionProps) {
  const [open, setOpen] = useState(false);
  const [report, setReport] = useState('');

  const { mutate: scoreProfile, isPending } = useMutation({
    mutationFn: () => scoreFreelancerProfile(profileId),
    onSuccess: (response) => {
      setReport(response.data.report);
      setOpen(true);
    },
    onError: (error: unknown) => {
      const code = getApiErrorCode(error);
      if (code === 'ERR_PROFILE_HOURLY_RATE_REQUIRED') {
        toast.error('Set your hourly rate before scoring your profile.');
      } else if (code === 'ERR_PROFILE_PHOTO_REQUIRED') {
        toast.error('Upload a profile photo before scoring your profile.');
      } else {
        toast.error('AI scoring is temporarily unavailable, try again.');
      }
    },
  });

  return (
    <div className="bg-white border border-border rounded-sm p-6 shadow-none">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold text-foreground">AI Profile Score</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Get AI feedback on how your profile looks to clients
          </p>
        </div>
        <Button onClick={() => scoreProfile()} disabled={isPending}>
          {isPending ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <>
              <FiTrendingUp className="w-4 h-4 mr-2" />
              Score My Profile
            </>
          )}
        </Button>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>AI Profile Score</DialogTitle>
          </DialogHeader>
          <div className="prose prose-sm max-w-none whitespace-pre-wrap">{report}</div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
