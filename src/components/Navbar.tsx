'use client';

import { useState } from 'react';
import { useAuthStore } from '@/store/useAuthStore';
import { UserType } from '@/lib/types/auth';
import { getHomeRoute } from '@/lib/utils';
import { Logo } from '@/components/Logo';
import { NotificationsDropdown } from './navbar/NotificationsDropdown';
import { HelpModal } from './navbar/HelpModal';
import { UserMenu } from './navbar/UserMenu';
import { NavLinks } from './navbar/NavLinks';

export function Navbar() {
  const { user } = useAuthStore();
  const [showHelpModal, setShowHelpModal] = useState(false);

  const isFreelancer = user?.currentType === UserType.FREELANCER;
  const homeHref = user?.currentType ? getHomeRoute(user.currentType) : '/app/find-work';
  const homeLabel = isFreelancer ? 'Find Work' : 'Hire Talent';

  const navLinks = [
    { href: homeHref, label: homeLabel },
    { href: '/app/contracts', label: 'My Contracts' },
    { href: '/app/messages', label: 'Messages' },
  ];

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Logo
              href={homeHref}
              className="group"
              textClassName="text-primary group-hover:opacity-80 transition-all"
              iconClassName="group-hover:scale-105 transition-transform"
            />

            {/* Navigation Links */}
            <NavLinks links={navLinks} />
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <NotificationsDropdown />

            {/* Help */}
            <button
              onClick={() => setShowHelpModal(true)}
              className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </button>

            {/* User Menu */}
            <UserMenu />
          </div>
        </div>
      </div>

      <HelpModal
        open={showHelpModal}
        onOpenChange={setShowHelpModal}
        isFreelancer={isFreelancer}
      />
    </nav>
  );
}
