import Link from 'next/link';
import { Logo } from '@/components/Logo';
import { FaTwitter, FaLinkedin, FaGithub } from 'react-icons/fa';

export const Footer = (): React.ReactElement => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Logo className="mb-4" textClassName="text-white" />
            <p className="text-gray-400 mb-4 max-w-md">
              The AI-powered freelancing platform connecting talented
              professionals with clients worldwide. Find work, hire talent, and
              grow your career.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <FaTwitter className="h-6 w-6" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <FaLinkedin className="h-6 w-6" />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <FaGithub className="h-6 w-6" />
              </a>
            </div>
          </div>

          {/* For Freelancers */}
          <div>
            <h3 className="text-white font-semibold mb-4">For Freelancers</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/app/find-work"
                  className="hover:text-white transition-colors"
                >
                  Find Work
                </Link>
              </li>
              <li>
                <Link
                  href="/how-to-start"
                  className="hover:text-white transition-colors"
                >
                  How to Start
                </Link>
              </li>
              <li>
                <Link
                  href="/mentorship"
                  className="hover:text-white transition-colors"
                >
                  Mentorship Program
                </Link>
              </li>
              <li>
                <Link
                  href="/success-stories"
                  className="hover:text-white transition-colors"
                >
                  Success Stories
                </Link>
              </li>
            </ul>
          </div>

          {/* For Clients */}
          <div>
            <h3 className="text-white font-semibold mb-4">For Clients</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/app/hire-talent"
                  className="hover:text-white transition-colors"
                >
                  Hire Talent
                </Link>
              </li>
              <li>
                <Link
                  href="/post-job"
                  className="hover:text-white transition-colors"
                >
                  Post a Job
                </Link>
              </li>
              <li>
                <Link
                  href="/how-it-works"
                  className="hover:text-white transition-colors"
                >
                  How It Works
                </Link>
              </li>
              <li>
                <Link
                  href="/enterprise"
                  className="hover:text-white transition-colors"
                >
                  Enterprise Solutions
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-white font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/about"
                  className="hover:text-white transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="hover:text-white transition-colors"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/careers"
                  className="hover:text-white transition-colors"
                >
                  Careers
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-white transition-colors"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="hover:text-white transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="hover:text-white transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            &copy; {currentYear} GoFreelance. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link
              href="/terms"
              className="text-gray-400 hover:text-white text-sm transition-colors"
            >
              Terms
            </Link>
            <Link
              href="/privacy"
              className="text-gray-400 hover:text-white text-sm transition-colors"
            >
              Privacy
            </Link>
            <Link
              href="/cookies"
              className="text-gray-400 hover:text-white text-sm transition-colors"
            >
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
