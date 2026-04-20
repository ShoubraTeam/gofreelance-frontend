'use client';

import { useState, useRef, KeyboardEvent } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FiDollarSign, FiUsers, FiCalendar, FiPlus, FiX } from 'react-icons/fi';
import toast from 'react-hot-toast';
import type { JobResponse } from '@/lib/types/job';
import { addJobTags, removeJobTags } from '@/lib/api/jobs';
import { capitalize } from '@/lib/utils';

const TAG_REGEX = /^[a-zA-Z0-9_]+$/;

interface JobCardProps {
  job: JobResponse;
  onEditJob: (job: JobResponse) => void;
}

function JobCard({ job, onEditJob }: JobCardProps) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [tags, setTags] = useState<string[]>(job.tags ?? []);
  const [addingTag, setAddingTag] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const isOpen = job.jobStatus === 'OPEN';

  const { mutate: addTags, isPending: isAdding } = useMutation({
    mutationFn: (newTags: string[]) => addJobTags(job.id, newTags),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['client-jobs'] }),
    onError: () => {
      toast.error('Failed to add tags');
      setTags(job.tags ?? []);
    },
  });

  const { mutate: removeTags } = useMutation({
    mutationFn: (removed: string[]) => removeJobTags(job.id, removed),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['client-jobs'] }),
    onError: () => {
      toast.error('Failed to remove tags');
      setTags(job.tags ?? []);
    },
  });

  const handleRemove = (tag: string) => {
    setTags((prev) => prev.filter((t) => t !== tag));
    removeTags([tag]);
  };

  const commitInput = () => {
    const value = inputValue.trim();
    if (!value) { setAddingTag(false); return; }
    if (!TAG_REGEX.test(value)) { toast.error('Invalid tag: only letters, numbers, underscores'); return; }
    if (tags.includes(value)) { setInputValue(''); setAddingTag(false); return; }
    setTags((prev) => [...prev, value]);
    addTags([value]);
    setInputValue('');
    setAddingTag(false);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',' || e.key === ' ') { e.preventDefault(); commitInput(); }
    if (e.key === 'Escape') { setInputValue(''); setAddingTag(false); }
  };

  const handleShowInput = () => {
    setAddingTag(true);
    setTimeout(() => inputRef.current?.focus(), 0);
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h3 className="text-xl font-semibold text-foreground">
                {job.title}
              </h3>
              <Badge
                variant={job.jobStatus === 'OPEN' ? 'default' : 'outline'}
                className={job.jobStatus === 'OPEN' ? 'bg-green-500 hover:bg-green-600' : ''}
              >
                {job.jobStatus}
              </Badge>
            </div>

            <p className="text-sm text-muted-foreground line-clamp-3 mb-3">
              {job.content}
            </p>

            <div className="flex flex-wrap items-center gap-2 mb-4">
              {tags.map((tag) => (
                <Badge key={tag} variant="default" className="text-sm px-3 py-1 flex items-center gap-1 pr-2">
                  {tag}
                  {isOpen && (
                    <button
                      type="button"
                      onClick={() => handleRemove(tag)}
                      className="ml-0.5 hover:text-primary-foreground/60 transition-colors cursor-pointer"
                      aria-label={`Remove ${tag}`}
                    >
                      <FiX className="w-3 h-3" />
                    </button>
                  )}
                </Badge>
              ))}
              {isOpen && (
                addingTag ? (
                  <Input
                    ref={inputRef}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    onBlur={commitInput}
                    placeholder="tag name"
                    disabled={isAdding}
                    className="h-6 w-28 text-xs px-2 py-0"
                  />
                ) : (
                  <button
                    type="button"
                    onClick={handleShowInput}
                    className="flex items-center justify-center w-6 h-6 rounded-full border border-dashed border-muted-foreground/50 text-muted-foreground hover:border-primary hover:text-primary transition-colors cursor-pointer"
                    aria-label="Add tag"
                  >
                    <FiPlus className="w-3 h-3" />
                  </button>
                )
              )}
            </div>

            <div className="flex flex-wrap gap-6 text-sm">
              <div className="flex items-center gap-2">
                <FiDollarSign className="w-4 h-4 text-primary" />
                <span className="text-muted-foreground">Budget:</span>
                <span className="font-semibold">${job.jobPrice.toLocaleString()}</span>
              </div>
              <div className="flex items-center gap-2">
                <FiUsers className="w-4 h-4 text-primary" />
                <span className="text-muted-foreground">Experience:</span>
                <span className="font-semibold">{capitalize(job.experienceLevel)}</span>
              </div>
              <div className="flex items-center gap-2">
                <FiUsers className="w-4 h-4 text-primary" />
                <span className="text-muted-foreground">Proposals:</span>
                <span className="font-semibold">{job.proposalCount}</span>
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

        <div className="border-t pt-4 flex items-center justify-end">
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => router.push(`/app/hire-talent/${job.id}/proposals`)}
            >
              <FiUsers className="w-4 h-4 mr-2" />
              View Details
            </Button>
            <Button variant="outline" size="sm" onClick={() => onEditJob(job)}>
              Edit
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

interface JobListProps {
  jobs: JobResponse[];
  onCreateJob: () => void;
  onEditJob: (job: JobResponse) => void;
}

export function JobList({ jobs, onCreateJob, onEditJob }: JobListProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">All Job Postings</h2>
        <Button onClick={onCreateJob}>
          <FiPlus className="w-4 h-4 mr-2" />
          Post New Job
        </Button>
      </div>
      {jobs.map((job) => (
        <JobCard key={job.id} job={job} onEditJob={onEditJob} />
      ))}
    </div>
  );
}
