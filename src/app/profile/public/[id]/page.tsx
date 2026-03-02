'use client';

import { use } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getFreelancerProfileDetails } from '@/lib/api/profile';
import { PageLoader } from '@/components/PageLoader';
import { ProfileNotFound } from '@/components/ProfileNotFound';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  FiStar,
  FiBriefcase,
  FiAward,
  FiFolder,
  FiArrowLeft,
} from 'react-icons/fi';
import { useRouter } from 'next/navigation';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function PublicProfilePage({ params }: PageProps) {
  const { id: profileId } = use(params);
  const router = useRouter();

  const { data: freelancerData, isLoading } = useQuery({
    queryKey: ['public-profile-freelancer', profileId],
    queryFn: () => getFreelancerProfileDetails(profileId),
  });

  const freelancerDetails = freelancerData?.data;

  if (isLoading) return <PageLoader />;
  if (!freelancerDetails) return <ProfileNotFound />;

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="gap-2 hover:bg-primary/10 hover:text-primary"
          >
            <FiArrowLeft className="w-4 h-4" />
            Go Back
          </Button>
        </div>

        <Card className="bg-white border border-border rounded-xl shadow-sm p-6 sm:p-8 mb-8">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-3xl sm:text-4xl shadow-lg ring-4 ring-white shrink-0">
              {freelancerDetails.title?.[0] ?? '?'}
            </div>

            <div className="flex-1 text-center sm:text-left">
              <h1 className="text-2xl sm:text-3xl font-bold mb-1">{freelancerDetails.title}</h1>

              <div className="flex items-center justify-center sm:justify-start gap-1 text-sm text-muted-foreground mt-2">
                <FiStar className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                <span className="font-medium text-foreground">
                  {freelancerDetails.averageRatings.toFixed(1)}
                </span>
                <span>({freelancerDetails.numberOfRatings} reviews)</span>
              </div>

              {freelancerDetails?.specialization && (
                <div className="mt-3">
                  <Badge className="bg-primary/10 text-primary border-primary/20">
                    {freelancerDetails.specialization.type}
                  </Badge>
                </div>
              )}
            </div>
          </div>

          {freelancerDetails.bio && (
            <div className="mt-6 pt-6 border-t border-border">
              <p className="text-foreground leading-relaxed">{freelancerDetails.bio}</p>
            </div>
          )}
        </Card>

        <>
          {freelancerDetails.skills?.length > 0 && (
            <Card className="bg-white border border-border rounded-xl shadow-sm p-6 mb-6">
              <div className="flex items-center gap-2 mb-4">
                <FiBriefcase className="w-5 h-5 text-primary" />
                <h2 className="text-xl font-bold">Skills</h2>
              </div>
              <div className="flex flex-wrap gap-2">
                {freelancerDetails.skills.map((skill) => (
                  <Badge key={skill.id} variant="outline" className="px-3 py-1.5 text-sm">
                    {skill.name}
                  </Badge>
                ))}
              </div>
            </Card>
          )}

          {freelancerDetails.workExperiences.length > 0 && (
            <Card className="bg-white border border-border rounded-xl shadow-sm p-6 mb-6">
              <div className="flex items-center gap-2 mb-4">
                <FiBriefcase className="w-5 h-5 text-primary" />
                <h2 className="text-xl font-bold">Work Experience</h2>
              </div>
              <div className="space-y-4">
                {freelancerDetails.workExperiences.map((exp, index) => (
                  <div key={index} className="border-l-2 border-primary/20 pl-4">
                    <h3 className="font-semibold">{exp.jobTitle || 'Position'}</h3>
                    <p className="text-sm text-muted-foreground">{exp.workedAt}</p>
                    {exp.startedAt && (
                      <p className="text-xs text-muted-foreground mt-1">
                        {exp.startedAt} — {exp.endedAt || 'Present'}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </Card>
          )}

          {freelancerDetails.projects.length > 0 && (
            <Card className="bg-white border border-border rounded-xl shadow-sm p-6 mb-6">
              <div className="flex items-center gap-2 mb-4">
                <FiFolder className="w-5 h-5 text-primary" />
                <h2 className="text-xl font-bold">Portfolio</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {freelancerDetails.projects.map((project, index) => (
                  <div key={index} className="border border-border rounded-lg p-4">
                    <h3 className="font-semibold mb-2">{project.title}</h3>
                    {project.content && (
                      <p className="text-sm text-muted-foreground">{project.content}</p>
                    )}
                  </div>
                ))}
              </div>
            </Card>
          )}

          {freelancerDetails.certificates.length > 0 && (
            <Card className="bg-white border border-border rounded-xl shadow-sm p-6">
              <div className="flex items-center gap-2 mb-4">
                <FiAward className="w-5 h-5 text-primary" />
                <h2 className="text-xl font-bold">Certifications</h2>
              </div>
              <div className="space-y-3">
                {freelancerDetails.certificates.map((cert, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                      <FiAward className="w-5 h-5 text-primary" />
                    </div>
                    <span className="font-medium">{cert.name}</span>
                  </div>
                ))}
              </div>
            </Card>
          )}
        </>
      </div>
    </div>
  );
}
