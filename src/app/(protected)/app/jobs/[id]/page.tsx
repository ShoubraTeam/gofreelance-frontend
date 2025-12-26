'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Loader2 } from 'lucide-react';
import {
  FiBriefcase,
  FiDollarSign,
  FiCalendar,
  FiUsers,
  FiFileText,
} from 'react-icons/fi';
import toast from 'react-hot-toast';
import { getJobById } from '@/lib/api/jobs';
import { createProposal, getMyProposals, editProposal, deleteProposal } from '@/lib/api/proposals';
import { getProfiles } from '@/lib/api/profile';
import type { ProposalResponse, EditProposalRequest } from '@/lib/types/proposal';

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

  const formatExperienceLevel = (level: string) => {
    const formatted = level.replace('_', ' ').toLowerCase();
    return formatted.charAt(0).toUpperCase() + formatted.slice(1);
  };

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card>
          <CardContent className="p-8">
            {/* Job Header */}
            <div className="mb-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h1 className="text-3xl font-bold text-foreground mb-2">
                    {job.title}
                  </h1>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant={job.jobStatus === 'OPEN' ? 'default' : 'outline'}
                      className={
                        job.jobStatus === 'OPEN'
                          ? 'bg-green-500 hover:bg-green-600'
                          : ''
                      }
                    >
                      {job.jobStatus}
                    </Badge>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <FiDollarSign className="w-5 h-5 text-primary" />
                  <span className="text-muted-foreground">Budget:</span>
                  <span className="font-semibold text-lg">
                    ${job.jobPrice.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <FiUsers className="w-5 h-5 text-primary" />
                  <span className="text-muted-foreground">Experience:</span>
                  <span className="font-semibold">
                    {formatExperienceLevel(job.experienceLevel)}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <FiCalendar className="w-5 h-5 text-primary" />
                  <span className="text-muted-foreground">Posted:</span>
                  <span className="font-semibold">
                    {new Date(job.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>

            <Separator className="my-6" />

            {/* Job Description */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <FiFileText className="w-5 h-5 text-primary" />
                Job Description
              </h2>
              <p className="text-muted-foreground whitespace-pre-wrap">
                {job.content}
              </p>
            </div>

            <Separator className="my-6" />

            {/* Proposal Section */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <FiBriefcase className="w-5 h-5 text-primary" />
                  {existingProposal && !isEditMode ? 'Your Proposal' : 'Submit Your Proposal'}
                </h2>
                {existingProposal && !isEditMode && (
                  <div className="flex gap-2">
                    <Badge
                      variant={
                        existingProposal.status === 'PENDING'
                          ? 'default'
                          : existingProposal.status === 'ACCEPTED'
                          ? 'default'
                          : 'destructive'
                      }
                      className={
                        existingProposal.status === 'PENDING'
                          ? 'bg-yellow-500 hover:bg-yellow-600'
                          : existingProposal.status === 'ACCEPTED'
                          ? 'bg-green-500 hover:bg-green-600'
                          : ''
                      }
                    >
                      {existingProposal.status}
                    </Badge>
                  </div>
                )}
              </div>

              {existingProposal && !isEditMode ? (
                <div className="space-y-4">
                  <div className="bg-muted/50 rounded-lg p-4">
                    <p className="text-sm text-muted-foreground mb-1">Proposal</p>
                    <p className="text-foreground whitespace-pre-wrap">
                      {existingProposal.content}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-muted/50 rounded-lg p-4">
                      <p className="text-sm text-muted-foreground mb-1">Your Bid</p>
                      <p className="text-2xl font-bold text-primary">
                        ${existingProposal.totalPrice.toLocaleString()}
                      </p>
                    </div>

                    <div className="bg-muted/50 rounded-lg p-4">
                      <p className="text-sm text-muted-foreground mb-1">Estimated Hours</p>
                      <p className="text-2xl font-bold text-foreground">
                        {existingProposal.totalTimeHours} hours
                      </p>
                    </div>
                  </div>

                  <div className="bg-muted/50 rounded-lg p-4">
                    <p className="text-sm text-muted-foreground mb-1">Submitted On</p>
                    <p className="text-foreground">
                      {new Date(existingProposal.createdAt).toLocaleString()}
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      onClick={handleEditClick}
                      variant="outline"
                      disabled={existingProposal.status !== 'PENDING'}
                    >
                      Edit Proposal
                    </Button>
                    <Button
                      onClick={handleWithdraw}
                      variant="destructive"
                      disabled={isPending || existingProposal.status !== 'PENDING'}
                    >
                      {isDeleting ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Withdrawing...
                        </>
                      ) : (
                        'Withdraw Proposal'
                      )}
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    Your Proposal
                    <span className="text-red-500 ml-1">*</span>
                  </label>
                  <Textarea
                    value={proposalContent}
                    onChange={(e) => setProposalContent(e.target.value)}
                    rows={6}
                    placeholder="Explain why you're the best fit for this job. Describe your relevant experience and how you plan to approach this project..."
                    className="resize-none"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Write a compelling proposal to stand out from other freelancers
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">
                      Your Bid ($)
                      <span className="text-red-500 ml-1">*</span>
                    </label>
                    <Input
                      type="number"
                      value={proposalPrice}
                      onChange={(e) => setProposalPrice(e.target.value)}
                      placeholder="5000"
                      min={1}
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Client&apos;s budget: ${job.jobPrice.toLocaleString()}
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">
                      Estimated Hours
                      <span className="text-red-500 ml-1">*</span>
                    </label>
                    <Input
                      type="number"
                      value={proposalHours}
                      onChange={(e) => setProposalHours(e.target.value)}
                      placeholder="40"
                      min={1}
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Total time needed to complete the project
                    </p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    onClick={handleSubmitProposal}
                    disabled={isPending}
                    size="lg"
                    className="w-full sm:w-auto"
                  >
                    {isPending ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        {isEditMode ? 'Updating...' : 'Submitting...'}
                      </>
                    ) : (
                      isEditMode ? 'Update Proposal' : 'Submit Proposal'
                    )}
                  </Button>
                  {isEditMode && (
                    <Button
                      onClick={handleCancelEdit}
                      variant="outline"
                      size="lg"
                      disabled={isPending}
                    >
                      Cancel
                    </Button>
                  )}
                </div>
              </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
