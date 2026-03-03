'use client';

import { useState } from 'react';
import {
  FaUserPlus,
  FaWallet,
  FaBriefcase,
  FaUsers,
  FaHandshake,
  FaCreditCard,
} from 'react-icons/fa';
import { IoSparkles, IoDocument } from 'react-icons/io5';
import { MdVerifiedUser } from 'react-icons/md';
import { Badge } from '@/components/ui/badge';
import { StepCard } from './StepCard';
import type { Step } from './StepCard';

type UserType = 'freelancer' | 'client';

export const HowItWorksSection = (): React.ReactElement => {
  const [activeTab, setActiveTab] = useState<UserType>('freelancer');

  const freelancerSteps: Step[] = [
    {
      number: 1,
      title: 'Create Your Profile',
      description: 'Sign up and build your profile in minutes with AI assistance',
      icon: FaUserPlus,
      gradient: 'bg-gradient-to-br from-blue-500 to-cyan-500',
      details: [
        'Quick registration process',
        'Upload CV for AI-powered completion',
        'Identity verification for trust',
        'Showcase your portfolio & skills',
      ],
    },
    {
      number: 2,
      title: 'Get AI Recommendations',
      description: 'Let our AI match you with perfect job opportunities',
      icon: IoSparkles,
      gradient: 'bg-gradient-to-br from-purple-500 to-pink-500',
      details: [
        'Smart job matching algorithm',
        'Personalized recommendations',
        'Skills-based filtering',
        'Real-time job alerts',
      ],
    },
    {
      number: 3,
      title: 'Submit Proposals',
      description: 'Apply to jobs with compelling AI-assisted proposals',
      icon: IoDocument,
      gradient: 'bg-gradient-to-br from-orange-500 to-red-500',
      details: [
        'AI proposal suggestions',
        'Stand out from competition',
        'Track proposal status',
        'Direct client communication',
      ],
    },
    {
      number: 4,
      title: 'Work & Get Paid',
      description: 'Complete milestones and receive secure payments',
      icon: FaWallet,
      gradient: 'bg-gradient-to-br from-green-500 to-emerald-500',
      details: [
        'Milestone-based delivery',
        'Secure escrow protection',
        'Timely payments',
        'Build your reputation',
      ],
    },
  ];

  const clientSteps: Step[] = [
    {
      number: 1,
      title: 'Post Your Job',
      description: 'Describe your project with AI-assisted job descriptions',
      icon: FaBriefcase,
      gradient: 'bg-gradient-to-br from-indigo-500 to-blue-500',
      details: [
        'AI-powered job descriptions',
        'Fixed-price or monthly payment',
        'Set your budget & timeline',
        'Define project milestones',
      ],
    },
    {
      number: 2,
      title: 'Review Proposals',
      description: 'Receive proposals from top-matched freelancers',
      icon: FaUsers,
      gradient: 'bg-gradient-to-br from-violet-500 to-purple-500',
      details: [
        'AI-matched talent pool',
        'Review portfolios & ratings',
        'Compare proposals easily',
        'Chat before hiring',
      ],
    },
    {
      number: 3,
      title: 'Hire & Collaborate',
      description: 'Choose the best fit and work together seamlessly',
      icon: FaHandshake,
      gradient: 'bg-gradient-to-br from-pink-500 to-rose-500',
      details: [
        'Create contracts instantly',
        'Built-in messaging system',
        'Track project progress',
        'Request revisions easily',
      ],
    },
    {
      number: 4,
      title: 'Pay with Confidence',
      description: 'Release milestone payments as work is completed',
      icon: FaCreditCard,
      gradient: 'bg-gradient-to-br from-teal-500 to-cyan-500',
      details: [
        'Escrow payment protection',
        'Pay per milestone',
        'Review before payment',
        'Secure transactions',
      ],
    },
  ];

  const steps = activeTab === 'freelancer' ? freelancerSteps : clientSteps;

  return (
    <section
      id="how-it-works"
      className="relative py-24 bg-linear-to-br from-gray-50 via-white to-gray-50 overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-gray-100 mask-[linear-gradient(0deg,white,rgba(255,255,255,0.6))] -z-10" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="px-4 py-2 bg-primary/10 text-primary text-sm font-semibold mb-6">
            <MdVerifiedUser className="h-4 w-4 mr-2" />
            Simple & Secure Process
          </Badge>
          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            How It{' '}
            <span className="bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">
              Works
            </span>
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Whether you&apos;re looking to hire top talent or find your next
            opportunity, our platform makes it seamless with AI-powered
            assistance every step of the way
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-16">
          <div className="relative inline-flex p-2 bg-white rounded-2xl shadow-lg border border-gray-200">
            {/* Animated background slider */}
            <div
              className={`absolute inset-y-2 rounded-xl transition-all duration-500 ease-out ${
                activeTab === 'freelancer'
                  ? 'bg-linear-to-r from-primary to-primary/80 shadow-lg shadow-primary/30'
                  : 'bg-linear-to-r from-secondary to-secondary/80 shadow-lg shadow-secondary/30'
              }`}
              style={{
                left: activeTab === 'freelancer' ? '0.5rem' : 'calc(50%)',
                width: 'calc(50% - 0.5rem)',
              }}
            />

            <button
              onClick={() => setActiveTab('freelancer')}
              className={`
                relative z-10 cursor-pointer w-40 sm:w-48 flex-1 px-3 sm:px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300 whitespace-nowrap
                ${
                  activeTab === 'freelancer'
                    ? 'text-white'
                    : 'text-gray-600 hover:text-gray-900'
                }
              `}
            >
              <div className="flex items-center justify-center gap-2.5">
                <FaUserPlus className="h-4 w-4" />
                <span>For Freelancers</span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab('client')}
              className={`
                relative z-10 cursor-pointer w-40 sm:w-48 flex-1 px-3 sm:px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300 whitespace-nowrap
                ${
                  activeTab === 'client'
                    ? 'text-white'
                    : 'text-gray-600 hover:text-gray-900'
                }
              `}
            >
              <div className="flex items-center justify-center gap-2.5">
                <FaBriefcase className="h-4 w-4" />
                <span>For Clients</span>
              </div>
            </button>
          </div>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <StepCard
              key={step.number}
              step={step}
              isLast={index === steps.length - 1}
              animationDelay={index * 100}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
