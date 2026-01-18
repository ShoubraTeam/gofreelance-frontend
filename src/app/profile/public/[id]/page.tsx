'use client';

import { useQuery } from '@tanstack/react-query';
import { getAccountInfo } from '@/lib/api/auth';
import { getProfiles, getFreelancerProfileDetails, getClientProfileDetails } from '@/lib/api/profile';
import { Loader2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  FiCheckCircle,
  FiMapPin,
  FiStar,
  FiBriefcase,
  FiAward,
  FiFolder,
  FiArrowLeft,
} from 'react-icons/fi';
import { capitalize } from '@/lib/utils';
import { use } from 'react';
import { useRouter } from 'next/navigation';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function PublicProfilePage({ params }: PageProps) {
  use(params);
  const router = useRouter();

  const handleGoBack = () => {
    if (window.opener) {
      window.close();
    } else {
      router.back();
    }
  };

  const { data: accountData, isLoading: isLoadingAccount } = useQuery({
    queryKey: ['account', 'info'],
    queryFn: getAccountInfo,
  });

  const { data: profilesData, isLoading: isLoadingProfiles } = useQuery({
    queryKey: ['profiles'],
    queryFn: getProfiles,
  });

  const profiles = profilesData?.data || [];
  const account = accountData?.data;

  const freelancerProfile = profiles.find((p) => p.profileType === 'FREELANCER');
  const clientProfile = profiles.find((p) => p.profileType === 'CLIENT');

  const { data: freelancerDetailsData, isLoading: isLoadingFreelancer } = useQuery({
    queryKey: ['freelancer-public-profile', freelancerProfile?.id],
    queryFn: () => getFreelancerProfileDetails(freelancerProfile!.id),
    enabled: !!freelancerProfile,
  });

  const { data: clientDetailsData, isLoading: isLoadingClient } = useQuery({
    queryKey: ['client-public-profile', clientProfile?.id],
    queryFn: () => getClientProfileDetails(clientProfile!.id),
    enabled: !!clientProfile,
  });

  const isLoading = isLoadingAccount || isLoadingProfiles || isLoadingFreelancer || isLoadingClient;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-muted/30">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!account) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-muted/30">
        <Card className="max-w-md">
          <CardContent className="p-8 text-center">
            <h2 className="text-xl font-semibold mb-2">Profile Not Found</h2>
            <p className="text-muted-foreground">
              The profile you&apos;re looking for doesn&apos;t exist.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const freelancerDetails = freelancerDetailsData?.data;
  const clientDetails = clientDetailsData?.data;

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={handleGoBack}
            className="gap-2 hover:bg-primary/10 hover:text-primary"
          >
            <FiArrowLeft className="w-4 h-4" />
            Go Back
          </Button>
        </div>

        <Card className="bg-white border border-border rounded-xl shadow-sm p-6 sm:p-8 mb-8">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            <div className="relative group shrink-0">
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-3xl sm:text-4xl shadow-lg ring-4 ring-white">
                {account.firstName?.[0]}
                {account.lastName?.[0]}
              </div>
              {account.emailVerified && (
                <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-gradient-to-br from-green-400 to-green-600 rounded-full border-4 border-white flex items-center justify-center shadow-lg">
                  <FiCheckCircle className="w-4 h-4 text-white" />
                </div>
              )}
            </div>

            <div className="flex-1 text-center sm:text-left">
              <div className="flex flex-col sm:flex-row items-center sm:items-center gap-2 sm:gap-3 mb-3">
                <h1 className="text-3xl sm:text-4xl font-bold">
                  {account.firstName} {account.lastName}
                </h1>
                {account.emailVerified && (
                  <div className="flex items-center gap-1.5 px-3 py-1 bg-primary/10 rounded-full border border-primary/20">
                    <FiCheckCircle className="w-4 h-4 text-primary" />
                    <span className="text-xs font-semibold text-primary">Verified</span>
                  </div>
                )}
              </div>

              {freelancerDetails && (
                <p className="text-lg font-medium text-muted-foreground mb-2">
                  {freelancerDetails.title}
                </p>
              )}

              <div className="flex flex-col sm:flex-row items-center gap-3 text-muted-foreground mb-4">
                <div className="flex items-center gap-2">
                  <FiMapPin className="w-4 h-4 text-primary" />
                  <span className="text-sm">{capitalize(account.country)}</span>
                </div>
                {(freelancerProfile || clientProfile) && (
                  <>
                    <span className="hidden sm:inline text-muted-foreground/50">•</span>
                    <div className="flex items-center gap-1">
                      <FiStar className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                      <span className="text-sm font-medium">
                        {(freelancerProfile?.averageRatings || clientProfile?.averageRatings || 0).toFixed(1)}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        ({freelancerProfile?.numberOfRatings || clientProfile?.numberOfRatings || 0} reviews)
                      </span>
                    </div>
                  </>
                )}
              </div>

              {freelancerDetails?.specialization && (
                <Badge className="bg-primary/10 text-primary border-primary/20">
                  {freelancerDetails.specialization.type}
                </Badge>
              )}
            </div>
          </div>

          {(freelancerDetails?.bio || clientDetails?.bio) && (
            <div className="mt-6 pt-6 border-t border-border">
              <p className="text-foreground leading-relaxed">
                {freelancerDetails?.bio || clientDetails?.bio}
              </p>
            </div>
          )}
        </Card>

        {freelancerDetails && (
          <>
            {freelancerDetails.skills.length > 0 && (
              <Card className="bg-white border border-border rounded-xl shadow-sm p-6 mb-6">
                <div className="flex items-center gap-2 mb-4">
                  <FiBriefcase className="w-5 h-5 text-primary" />
                  <h2 className="text-xl font-bold">Skills</h2>
                </div>
                <div className="flex flex-wrap gap-2">
                  {freelancerDetails.skills.map((skill) => (
                    <Badge
                      key={skill.id}
                      variant="outline"
                      className="px-3 py-1.5 text-sm"
                    >
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
                          {exp.startedAt} - {exp.endedAt || 'Present'}
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
        )}

        {clientDetails && clientDetails.companyName && (
          <Card className="bg-white border border-border rounded-xl shadow-sm p-6">
            <div className="flex items-center gap-2 mb-4">
              <FiBriefcase className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-bold">Company Information</h2>
            </div>
            <p className="text-lg font-medium">{clientDetails.companyName}</p>
          </Card>
        )}
      </div>
    </div>
  );
}
