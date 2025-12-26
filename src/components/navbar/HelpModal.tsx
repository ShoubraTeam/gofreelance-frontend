'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { FiCheckCircle, FiSearch, FiBriefcase } from 'react-icons/fi';

interface HelpModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  isFreelancer: boolean;
}

export function HelpModal({ open, onOpenChange, isFreelancer }: HelpModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-2xl">
            {isFreelancer ? 'Welcome to GoFreelance - Freelancer Guide' : 'Welcome to GoFreelance - Client Guide'}
          </DialogTitle>
          <DialogDescription>
            {isFreelancer
              ? 'Find great projects and grow your freelance career'
              : 'Find and hire talented freelancers for your projects'}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {isFreelancer ? (
            <>
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                  <FiSearch className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Find Work</h3>
                  <p className="text-sm text-muted-foreground">
                    Browse through hundreds of job listings that match your skills. Use filters to find the perfect projects.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                  <FiBriefcase className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Submit Proposals</h3>
                  <p className="text-sm text-muted-foreground">
                    Send customized proposals to clients. Showcase your expertise and explain why you&apos;re the best fit.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                  <FiCheckCircle className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Complete Projects</h3>
                  <p className="text-sm text-muted-foreground">
                    Work on contracts, deliver quality work, and build your reputation through client reviews.
                  </p>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                  <FiBriefcase className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Post Jobs</h3>
                  <p className="text-sm text-muted-foreground">
                    Create detailed job postings with your requirements, budget, and timeline to attract the right talent.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                  <FiSearch className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Review Proposals</h3>
                  <p className="text-sm text-muted-foreground">
                    Receive and review proposals from qualified freelancers. Check their profiles, portfolios, and ratings.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                  <FiCheckCircle className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Manage Contracts</h3>
                  <p className="text-sm text-muted-foreground">
                    Work with freelancers through secure contracts. Track progress, approve milestones, and leave reviews.
                  </p>
                </div>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
