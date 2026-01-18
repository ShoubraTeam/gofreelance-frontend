'use client';

import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuthStore } from '@/store/useAuthStore';
import { createJob, getClientJobs, updateJob } from '@/lib/api/jobs';
import { Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import type { NewJobRequest, ExperienceLevel, JobResponse } from '@/lib/types/job';
import { useForm } from 'react-hook-form';
import { QuickActionCards } from './_components/QuickActionCards';
import { JobCreationForm } from './_components/JobCreationForm';
import { TalentSearchSection } from './_components/TalentSearchSection';
import { JobList } from './_components/JobList';
import { EditJobDialog } from './_components/EditJobDialog';

export default function HireTalentPage() {
  const { user } = useAuthStore();
  const queryClient = useQueryClient();
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [editingJob, setEditingJob] = useState<JobResponse | null>(null);
  const [activeTab, setActiveTab] = useState<'jobs' | 'talent'>('jobs');
  const [talentSearch, setTalentSearch] = useState('');

  const form = useForm<NewJobRequest>({
    defaultValues: {
      title: '',
      content: '',
      jobPrice: 0,
      experienceLevel: 'ANY',
      jobType: 'JOB',
    },
  });

  const { reset } = form;

  const { data: jobsData, isLoading } = useQuery({
    queryKey: ['client-jobs', user?.id],
    queryFn: () => getClientJobs(user!.id),
    enabled: !!user?.id,
  });

  const { mutate: createJobMutation, isPending } = useMutation({
    mutationFn: createJob,
    onSuccess: () => {
      toast.success('Job created successfully!');
      queryClient.invalidateQueries({ queryKey: ['client-jobs'] });
      setShowCreateForm(false);
      setCurrentStep(1);
      reset();
    },
    onError: () => {
      toast.error('Failed to create job');
    },
  });

  const { mutate: updateJobMutation, isPending: isUpdating } = useMutation({
    mutationFn: updateJob,
    onSuccess: () => {
      toast.success('Job updated successfully!');
      queryClient.invalidateQueries({ queryKey: ['client-jobs'] });
      setEditingJob(null);
    },
    onError: () => {
      toast.error('Failed to update job');
    },
  });

  const onSubmit = (data: NewJobRequest) => {
    createJobMutation(data);
  };

  const jobs = (jobsData?.data || []).sort((a, b) =>
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  const handleEditJob = (job: JobResponse) => {
    setEditingJob(job);
  };

  const handleUpdateJob = (jobId: string, data: { jobPrice: number; experienceLevel: ExperienceLevel }) => {
    updateJobMutation({
      id: jobId,
      ...data,
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  const shouldShowForm = showCreateForm || jobs.length === 0;
  const totalSteps = 3;

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Hire Talent
          </h1>
          <p className="text-muted-foreground mb-6">
            Post jobs and discover talented freelancers for your projects
          </p>

          <div className="flex items-center gap-4 border-b">
            <button
              onClick={() => {
                setActiveTab('jobs');
                setShowCreateForm(false);
              }}
              className={`px-4 py-3 font-medium transition-colors relative cursor-pointer ${
                activeTab === 'jobs'
                  ? 'text-primary'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              My Jobs
              {activeTab === 'jobs' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
              )}
            </button>
            <button
              onClick={() => {
                setActiveTab('talent');
                setShowCreateForm(false);
              }}
              className={`px-4 py-3 font-medium transition-colors relative cursor-pointer ${
                activeTab === 'talent'
                  ? 'text-primary'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Find Talent
              {activeTab === 'talent' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
              )}
            </button>
          </div>
        </div>

        {activeTab === 'jobs' && !shouldShowForm && (
          <QuickActionCards
            jobs={jobs}
            onCreateJob={() => setShowCreateForm(true)}
          />
        )}

        {activeTab === 'jobs' && shouldShowForm && (
          <JobCreationForm
            form={form}
            currentStep={currentStep}
            totalSteps={totalSteps}
            isPending={isPending}
            hasExistingJobs={jobs.length > 0}
            onStepChange={setCurrentStep}
            onCancel={() => {
              setShowCreateForm(false);
              setCurrentStep(1);
            }}
            onSubmit={onSubmit}
          />
        )}

        {activeTab === 'talent' && (
          <TalentSearchSection
            searchValue={talentSearch}
            onSearchChange={setTalentSearch}
          />
        )}

        {activeTab === 'jobs' && jobs.length > 0 && !shouldShowForm && (
          <JobList
            jobs={jobs}
            onCreateJob={() => setShowCreateForm(true)}
            onEditJob={handleEditJob}
          />
        )}

        <EditJobDialog
          job={editingJob}
          isUpdating={isUpdating}
          onClose={() => setEditingJob(null)}
          onUpdate={handleUpdateJob}
        />
      </div>
    </div>
  );
}
