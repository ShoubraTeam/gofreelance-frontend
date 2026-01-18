'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { getJobById } from '@/lib/api/jobs';
import { createProposal, getMyProposals, editProposal, deleteProposal } from '@/lib/api/proposals';
import { getProfiles } from '@/lib/api/profile';
import type { ProposalResponse, EditProposalRequest } from '@/lib/types/proposal';
import { JobHeader } from './_components/JobHeader';
import { JobDescription } from './_components/JobDescription';
import { ProposalSection } from './_components/ProposalSection';

export default function JobDetailsPage() {
  const params = useParams();
  const jobId = params.id as string;
  const queryClient = useQueryClient();
  const [proposalContent, setProposalContent] = useState('');
  const [proposalPrice, setProposalPrice] = useState('');
  const [proposalHours, setProposalHours] = useState('');
  const [isEditMode, setIsEditMode] = useState(false);

  const { data: jobData, isLoading } = useQuery({
    queryKey: ['job', jobId],
    queryFn: () => getJobById(jobId),
  });

  const { data: profilesData } = useQuery({
    queryKey: ['profiles'],
    queryFn: getProfiles,
  });

  const { data: proposalsData } = useQuery({
    queryKey: ['my-proposals'],
    queryFn: getMyProposals,
  });

  const freelancerProfile = profilesData?.data?.find(
    (p) => p.profileType === 'FREELANCER'
  );

  const existingProposal = proposalsData?.data?.find(
    (p: ProposalResponse) => p.jobId === jobId
  );

  const { mutate: submitProposal, isPending: isSubmitting } = useMutation({
    mutationFn: createProposal,
    onSuccess: () => {
      toast.success('Proposal submitted successfully!');
      setProposalContent('');
      setProposalPrice('');
      setProposalHours('');
      queryClient.invalidateQueries({ queryKey: ['my-proposals'] });
    },
    onError: (error: unknown) => {
      const errorMessage = (error as { response?: { data?: { error?: string } } })?.response?.data?.error || 'Failed to submit proposal';
      toast.error(errorMessage);
    },
  });

  const { mutate: updateProposal, isPending: isUpdating } = useMutation({
    mutationFn: ({ proposalId, data }: { proposalId: string; data: EditProposalRequest }) =>
      editProposal(proposalId, data),
    onSuccess: () => {
      toast.success('Proposal updated successfully!');
      setIsEditMode(false);
      queryClient.invalidateQueries({ queryKey: ['my-proposals'] });
    },
    onError: (error: unknown) => {
      const errorMessage = (error as { response?: { data?: { error?: string } } })?.response?.data?.error || 'Failed to update proposal';
      toast.error(errorMessage);
    },
  });

  const { mutate: removeProposal, isPending: isDeleting } = useMutation({
    mutationFn: deleteProposal,
    onSuccess: () => {
      toast.success('Proposal withdrawn successfully!');
      queryClient.invalidateQueries({ queryKey: ['my-proposals'] });
    },
    onError: (error: unknown) => {
      const errorMessage = (error as { response?: { data?: { error?: string } } })?.response?.data?.error || 'Failed to withdraw proposal';
      toast.error(errorMessage);
    },
  });

  const handleSubmitProposal = () => {
    const content = proposalContent.trim() || (existingProposal?.content ?? '');
    const price = proposalPrice || (existingProposal?.totalPrice.toString() ?? '');
    const hours = proposalHours || (existingProposal?.totalTimeHours.toString() ?? '');

    if (!content) {
      toast.error('Please write a proposal');
      return;
    }
    if (!price || Number(price) <= 0) {
      toast.error('Please enter a valid price');
      return;
    }
    if (!hours || Number(hours) <= 0) {
      toast.error('Please enter valid hours');
      return;
    }

    if (existingProposal && isEditMode) {
      updateProposal({
        proposalId: existingProposal.id,
        data: {
          content,
          totalPrice: Number(price),
          totalTimeHours: Number(hours),
        },
      });
    } else if (!existingProposal) {
      if (!freelancerProfile) {
        toast.error('You need a freelancer profile to submit proposals');
        return;
      }

      submitProposal({
        jobId,
        freelancerProfileId: freelancerProfile.id,
        content,
        totalPrice: Number(price),
        totalTimeHours: Number(hours),
      });
    }
  };

  const handleEditClick = () => {
    if (existingProposal) {
      setProposalContent(existingProposal.content);
      setProposalPrice(existingProposal.totalPrice.toString());
      setProposalHours(existingProposal.totalTimeHours.toString());
      setIsEditMode(true);
    }
  };

  const handleCancelEdit = () => {
    setProposalContent('');
    setProposalPrice('');
    setProposalHours('');
    setIsEditMode(false);
  };

  const handleWithdraw = () => {
    if (existingProposal && confirm('Are you sure you want to withdraw this proposal?')) {
      removeProposal(existingProposal.id);
    }
  };

  const isPending = isSubmitting || isUpdating || isDeleting;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  const job = jobData?.data;

  if (!job) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <p className="text-muted-foreground">Job not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card>
          <CardContent className="p-8">
            <JobHeader
              title={job.title}
              jobStatus={job.jobStatus}
              jobPrice={job.jobPrice}
              experienceLevel={job.experienceLevel}
              createdAt={job.createdAt}
            />

            <Separator className="my-6" />

            <JobDescription content={job.content} />

            <Separator className="my-6" />

            <ProposalSection
              existingProposal={existingProposal}
              isEditMode={isEditMode}
              proposalContent={proposalContent}
              proposalPrice={proposalPrice}
              proposalHours={proposalHours}
              jobPrice={job.jobPrice}
              isDeleting={isDeleting}
              isPending={isPending}
              onContentChange={setProposalContent}
              onPriceChange={setProposalPrice}
              onHoursChange={setProposalHours}
              onSubmit={handleSubmitProposal}
              onEdit={handleEditClick}
              onCancel={handleCancelEdit}
              onWithdraw={handleWithdraw}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
