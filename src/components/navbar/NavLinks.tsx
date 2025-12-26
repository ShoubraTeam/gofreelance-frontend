'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavLink {
  href: string;
  label: string;
}

interface NavLinksProps {
  links: NavLink[];
}

export function NavLinks({ links }: NavLinksProps) {
  const pathname = usePathname();

  return (
    <div className="hidden md:flex md:ml-8 md:space-x-1">
      {links.map((link) => {
        const isActive = pathname === link.href;
        return (
          <Link
            key={link.href}
            href={link.href}
            className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${
              isActive
                ? 'text-primary bg-primary/10'
                : 'text-gray-700 hover:text-primary hover:bg-gray-50'
            }`}
          >
            {link.label}
          </Link>
        );
      })}
    </div>
  );
}
