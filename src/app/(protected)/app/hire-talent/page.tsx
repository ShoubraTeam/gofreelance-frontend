'use client';

import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuthStore } from '@/store/useAuthStore';
import { createJob, getClientJobs, updateJob } from '@/lib/api/jobs';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Loader2 } from 'lucide-react';
import {
  FiBriefcase,
  FiDollarSign,
  FiCalendar,
  FiUsers,
  FiPlus,
} from 'react-icons/fi';
import toast from 'react-hot-toast';
import type { NewJobRequest, ExperienceLevel, JobResponse } from '@/lib/types/job';
import { useForm } from 'react-hook-form';

export default function HireTalentPage() {
  const { user } = useAuthStore();
  const queryClient = useQueryClient();
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [editingJob, setEditingJob] = useState<JobResponse | null>(null);
  const [editPrice, setEditPrice] = useState(0);
  const [editExperience, setEditExperience] = useState<ExperienceLevel>('ANY');
  const [activeTab, setActiveTab] = useState<'jobs' | 'talent'>('jobs');
  const [talentSearch, setTalentSearch] = useState('');

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<NewJobRequest>({
    defaultValues: {
      title: '',
      content: '',
      jobPrice: 0,
      experienceLevel: 'ANY',
      jobType: 'JOB',
    },
  });

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
  const experienceLevel = watch('experienceLevel');

  const formatExperienceLevel = (level: string) => {
    const formatted = level.replace('_', ' ').toLowerCase();
    return formatted.charAt(0).toUpperCase() + formatted.slice(1);
  };

  const handleEditClick = (job: JobResponse) => {
    setEditingJob(job);
    setEditPrice(job.jobPrice);
    setEditExperience(job.experienceLevel);
  };

  const handleUpdateJob = () => {
    if (!editingJob) return;
    updateJobMutation({
      id: editingJob.id,
      jobPrice: editPrice,
      experienceLevel: editExperience,
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
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Hire Talent
          </h1>
          <p className="text-muted-foreground mb-6">
            Post jobs and discover talented freelancers for your projects
          </p>

          {/* Tabs */}
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

        {/* Quick Action Cards */}
        {activeTab === 'jobs' && !shouldShowForm && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <Card className="border-2 border-primary/20 hover:border-primary/40 transition-colors cursor-pointer" onClick={() => setShowCreateForm(true)}>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <FiPlus className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Post a New Job</h3>
                    <p className="text-sm text-muted-foreground">Create a job posting to find the perfect freelancer</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <FiBriefcase className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">
                      {jobs.filter(j => j.jobStatus === 'OPEN').length} Active Jobs
                    </h3>
                    <p className="text-sm text-muted-foreground">Currently open for proposals</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <FiUsers className="w-6 h-6 text-secondary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Browse Talent</h3>
                    <p className="text-sm text-muted-foreground">Search for freelancers by skills</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'jobs' && shouldShowForm && (
          <Card className="mb-8 border-primary/20 shadow-lg">
            <CardContent className="p-6">
              {/* Progress Indicator */}
              <div className="mb-8">
                <div className="flex items-center w-full mb-4">
                  {[1, 2, 3].map((step, index) => (
                    <div key={step} className="flex items-center" style={{ flex: step < totalSteps ? 1 : '0 0 auto' }}>
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all ${
                          currentStep >= step
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted text-muted-foreground'
                        }`}
                      >
                        {step}
                      </div>
                      {step < totalSteps && (
                        <div
                          className={`flex-1 h-1 mx-2 transition-all ${
                            currentStep > step ? 'bg-primary' : 'bg-muted'
                          }`}
                        />
                      )}
                    </div>
                  ))}
                </div>
                <div className="text-center">
                  <p className="text-sm font-medium text-muted-foreground">
                    Step {currentStep} of {totalSteps}:{' '}
                    {currentStep === 1 && 'Job Title'}
                    {currentStep === 2 && 'Job Description'}
                    {currentStep === 3 && 'Budget & Requirements'}
                  </p>
                </div>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Step 1: Job Title */}
                {currentStep === 1 && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-lg font-semibold text-foreground mb-3">
                        What is your job title?
                        <span className="text-red-500 ml-1">*</span>
                      </label>
                      <Input
                        {...register('title', {
                          required: 'Job title is required',
                          maxLength: { value: 250, message: 'Max 250 characters' },
                        })}
                        placeholder="e.g., Full Stack Developer for E-commerce Platform"
                        className={`text-base ${errors.title ? 'border-destructive' : ''}`}
                      />
                      {errors.title && (
                        <p className="mt-2 text-sm text-destructive">
                          {errors.title.message}
                        </p>
                      )}
                      <p className="mt-2 text-sm text-muted-foreground">
                        Choose a clear, descriptive title that will attract the right freelancers
                      </p>
                    </div>
                  </div>
                )}

                {/* Step 2: Job Description */}
                {currentStep === 2 && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-lg font-semibold text-foreground mb-3">
                        Describe your project
                        <span className="text-red-500 ml-1">*</span>
                      </label>
                      <Textarea
                        {...register('content', {
                          required: 'Job description is required',
                          maxLength: { value: 1500, message: 'Max 1500 characters' },
                        })}
                        rows={8}
                        placeholder="Describe your project, requirements, and expectations..."
                        className={`text-base ${errors.content ? 'border-destructive' : ''}`}
                      />
                      {errors.content && (
                        <p className="mt-2 text-sm text-destructive">
                          {errors.content.message}
                        </p>
                      )}
                      <p className="mt-2 text-sm text-muted-foreground">
                        Include project goals, required skills, deliverables, and timeline
                      </p>
                    </div>
                  </div>
                )}

                {/* Step 3: Budget & Requirements */}
                {currentStep === 3 && (
                  <div className="space-y-6">
                    <div>
                      <label className="block text-lg font-semibold text-foreground mb-3">
                        What is your budget?
                        <span className="text-red-500 ml-1">*</span>
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                          $
                        </span>
                        <Input
                          type="number"
                          {...register('jobPrice', {
                            required: 'Budget is required',
                            min: { value: 1, message: 'Budget must be at least $1' },
                          })}
                          placeholder="5000"
                          className={`pl-7 text-base ${errors.jobPrice ? 'border-destructive' : ''}`}
                        />
                      </div>
                      {errors.jobPrice && (
                        <p className="mt-2 text-sm text-destructive">
                          {errors.jobPrice.message}
                        </p>
                      )}
                      <p className="mt-2 text-sm text-muted-foreground">
                        Set a competitive budget to attract quality freelancers
                      </p>
                    </div>

                    <div>
                      <label className="block text-lg font-semibold text-foreground mb-3">
                        Experience level required
                      </label>
                      <Select
                        value={experienceLevel}
                        onValueChange={(value) =>
                          setValue('experienceLevel', value as ExperienceLevel)
                        }
                      >
                        <SelectTrigger className="text-base">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ANY">Any Level</SelectItem>
                          <SelectItem value="JUNIOR">Junior (0-2 years)</SelectItem>
                          <SelectItem value="MID_LEVEL">Mid Level (2-5 years)</SelectItem>
                          <SelectItem value="SENIOR">Senior (5+ years)</SelectItem>
                          <SelectItem value="EXPERT">Expert (10+ years)</SelectItem>
                        </SelectContent>
                      </Select>
                      <p className="mt-2 text-sm text-muted-foreground">
                        Select the minimum experience level for this job
                      </p>
                    </div>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex gap-3 pt-4">
                  {currentStep > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setCurrentStep(currentStep - 1)}
                    >
                      Back
                    </Button>
                  )}

                  {currentStep < totalSteps ? (
                    <Button
                      type="button"
                      onClick={async () => {
                        let isValid = false;
                        if (currentStep === 1) {
                          isValid = await handleSubmit(() => true, () => false)();
                          const titleValue = watch('title');
                          if (titleValue && titleValue.length > 0) {
                            setCurrentStep(2);
                          }
                        } else if (currentStep === 2) {
                          const contentValue = watch('content');
                          if (contentValue && contentValue.length > 0) {
                            setCurrentStep(3);
                          }
                        }
                      }}
                      className="ml-auto"
                    >
                      Next
                    </Button>
                  ) : (
                    <Button type="submit" disabled={isPending} className="ml-auto">
                      {isPending ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Creating Job...
                        </>
                      ) : (
                        <>
                          <FiPlus className="w-4 h-4 mr-2" />
                          Create Job
                        </>
                      )}
                    </Button>
                  )}

                  {jobs.length > 0 && (
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={() => {
                        setShowCreateForm(false);
                        setCurrentStep(1);
                      }}
                    >
                      Cancel
                    </Button>
                  )}
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Find Talent Section */}
        {activeTab === 'talent' && (
          <div className="space-y-6">
            {/* Search Bar */}
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="relative">
                    <FiUsers className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      type="text"
                      placeholder="Search freelancers by name, skills, or expertise..."
                      value={talentSearch}
                      onChange={(e) => setTalentSearch(e.target.value)}
                      className="pl-10"
                    />
                  </div>

                  <div className="flex gap-2">
                    <Select defaultValue="all">
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Experience Level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Levels</SelectItem>
                        <SelectItem value="JUNIOR">Junior</SelectItem>
                        <SelectItem value="MID_LEVEL">Mid Level</SelectItem>
                        <SelectItem value="SENIOR">Senior</SelectItem>
                        <SelectItem value="EXPERT">Expert</SelectItem>
                      </SelectContent>
                    </Select>

                    <Button variant="outline">
                      <FiDollarSign className="w-4 h-4 mr-2" />
                      Hourly Rate
                    </Button>

                    <Button variant="outline">
                      More Filters
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Empty State */}
            <Card className="border-dashed">
              <CardContent className="p-12 text-center">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                  <FiUsers className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Search for Talent</h3>
                <p className="text-muted-foreground max-w-md mx-auto">
                  Use the search bar above to find freelancers based on their skills, experience, and expertise. This feature will be available soon.
                </p>
              </CardContent>
            </Card>
          </div>
        )}

        {/* My Jobs Section */}
        {activeTab === 'jobs' && jobs.length > 0 && !shouldShowForm && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">All Job Postings</h2>
              <Button onClick={() => setShowCreateForm(true)}>
                <FiPlus className="w-4 h-4 mr-2" />
                Post New Job
              </Button>
            </div>
            {jobs.map((job) => (
              <Card key={job.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-semibold text-foreground">
                          {job.title}
                        </h3>
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
                      <p className="text-muted-foreground mb-4">{job.content}</p>

                      <div className="flex flex-wrap gap-6 text-sm">
                        <div className="flex items-center gap-2">
                          <FiDollarSign className="w-4 h-4 text-primary" />
                          <span className="text-muted-foreground">Budget:</span>
                          <span className="font-semibold">
                            ${job.jobPrice.toLocaleString()}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <FiUsers className="w-4 h-4 text-primary" />
                          <span className="text-muted-foreground">Experience:</span>
                          <span className="font-semibold">
                            {formatExperienceLevel(job.experienceLevel)}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <FiCalendar className="w-4 h-4 text-primary" />
                          <span className="text-muted-foreground">Posted:</span>
                          <span className="font-semibold">
                            {new Date(job.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="border-t pt-4 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <FiUsers className="w-4 h-4" />
                      <span>0 proposals received</span>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <FiUsers className="w-4 h-4 mr-2" />
                        View Proposals
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleEditClick(job)}>
                        Edit
                      </Button>
                      <Button variant="outline" size="sm">
                        {job.jobStatus === 'CLOSED' ? 'Reopen' : 'Close'}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Edit Job Dialog */}
        <Dialog open={!!editingJob} onOpenChange={() => setEditingJob(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Job</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <label className="text-sm font-semibold">Job Title</label>
                <p className="text-sm text-muted-foreground">{editingJob?.title}</p>
                <p className="text-xs text-muted-foreground italic">Title cannot be edited</p>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold">
                  Budget ($)
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <Input
                  type="number"
                  value={editPrice}
                  onChange={(e) => setEditPrice(Number(e.target.value))}
                  min={1}
                  placeholder="5000"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold">Experience Level</label>
                <Select
                  value={editExperience}
                  onValueChange={(value) => setEditExperience(value as ExperienceLevel)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ANY">Any Level</SelectItem>
                    <SelectItem value="JUNIOR">Junior (0-2 years)</SelectItem>
                    <SelectItem value="MID_LEVEL">Mid Level (2-5 years)</SelectItem>
                    <SelectItem value="SENIOR">Senior (5+ years)</SelectItem>
                    <SelectItem value="EXPERT">Expert (10+ years)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex gap-2 pt-4">
                <Button onClick={handleUpdateJob} disabled={isUpdating}>
                  {isUpdating ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Updating...
                    </>
                  ) : (
                    'Update Job'
                  )}
                </Button>
                <Button variant="outline" onClick={() => setEditingJob(null)}>
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
