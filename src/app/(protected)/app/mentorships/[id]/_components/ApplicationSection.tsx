'use client';

import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { createProposal, getMyProposals, editProposal, deleteProposal } from '@/lib/api/proposals';
import { getProfiles } from '@/lib/api/profile';
import { getApiErrorMessage } from '@/lib/utils';
import toast from 'react-hot-toast';
import { ApplicationForm } from './ApplicationForm';
import type { ProposalResponse, EditProposalRequest } from '@/lib/types/proposal';

interface ApplicationSectionProps {
  jobId: string;
}

export function ApplicationSection({ jobId }: ApplicationSectionProps) {
  const queryClient = useQueryClient();
  const [content, setContent] = useState('');
  const [hours, setHours] = useState('');
  const [isEditMode, setIsEditMode] = useState(false);

  const { data: profilesData } = useQuery({
    queryKey: ['profiles'],
    queryFn: getProfiles,
  });

  const { data: proposalsData } = useQuery({
    queryKey: ['my-proposals'],
    queryFn: getMyProposals,
  });

  const freelancerProfile = profilesData?.data?.find((p) => p.profileType === 'FREELANCER');
  const existingApplication = proposalsData?.data?.find(
    (p: ProposalResponse) => p.jobId === jobId
  );

  const { mutate: submitApplication, isPending: isSubmitting } = useMutation({
    mutationFn: () =>
      createProposal({
        jobId,
        freelancerProfileId: freelancerProfile!.id,
        content: content.trim(),
        totalTimeHours: Number(hours),
      }),
    onSuccess: () => {
      toast.success('Application submitted!');
      setContent('');
      setHours('');
      queryClient.invalidateQueries({ queryKey: ['my-proposals'] });
      queryClient.invalidateQueries({ queryKey: ['job', jobId] });
    },
    onError: (error: unknown) => {
      toast.error(getApiErrorMessage(error, 'Failed to submit application'));
    },
  });

  const { mutate: updateApplication, isPending: isUpdating } = useMutation({
    mutationFn: ({ proposalId, data }: { proposalId: string; data: EditProposalRequest }) =>
      editProposal(proposalId, data),
    onSuccess: () => {
      toast.success('Application updated!');
      setIsEditMode(false);
      queryClient.invalidateQueries({ queryKey: ['my-proposals'] });
    },
    onError: (error: unknown) => {
      toast.error(getApiErrorMessage(error, 'Failed to update application'));
    },
  });

  const { mutate: removeApplication, isPending: isDeleting } = useMutation({
    mutationFn: deleteProposal,
    onSuccess: () => {
      toast.success('Application withdrawn.');
      queryClient.invalidateQueries({ queryKey: ['my-proposals'] });
    },
    onError: (error: unknown) => {
      toast.error(getApiErrorMessage(error, 'Failed to withdraw application'));
    },
  });

  const handleSubmit = () => {
    const c = content.trim() || (existingApplication?.content ?? '');
    const h = hours || (existingApplication?.totalTimeHours.toString() ?? '');

    if (!c) { toast.error('Please write a message'); return; }
    if (!h || Number(h) <= 0) { toast.error('Please enter valid hours'); return; }

    if (existingApplication && isEditMode) {
      updateApplication({ proposalId: existingApplication.id, data: { content: c, totalTimeHours: Number(h) } });
    } else if (!existingApplication) {
      if (!freelancerProfile) { toast.error('You need a freelancer profile to apply'); return; }
      submitApplication();
    }
  };

  const handleEdit = () => {
    if (existingApplication) {
      setContent(existingApplication.content);
      setHours(existingApplication.totalTimeHours.toString());
      setIsEditMode(true);
    }
  };

  const handleWithdraw = () => {
    if (existingApplication && confirm('Are you sure you want to withdraw your application?')) {
      removeApplication(existingApplication.id);
    }
  };

  const handleCancel = () => {
    setContent('');
    setHours('');
    setIsEditMode(false);
  };

  return (
    <ApplicationForm
      content={content}
      hours={hours}
      isEditMode={isEditMode}
      isPending={isSubmitting || isUpdating || isDeleting}
      isDeleting={isDeleting}
      existingApplication={existingApplication}
      onContentChange={setContent}
      onHoursChange={setHours}
      onSubmit={handleSubmit}
      onEdit={handleEdit}
      onCancel={handleCancel}
      onWithdraw={handleWithdraw}
    />
  );
}
