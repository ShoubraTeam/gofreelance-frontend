'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavLink {
  href: string;
  label: string;
}

interface MobileMenuProps {
  links: NavLink[];
  onClose: () => void;
}

export function MobileMenu({ links, onClose }: MobileMenuProps) {
  const pathname = usePathname();

  return (
    <div className="lg:hidden border-t border-gray-200 bg-white px-4 py-3 space-y-1">
      {links.map((link) => {
        const isActive = pathname === link.href;
        return (
          <Link
            key={link.href}
            href={link.href}
            onClick={onClose}
            className={`block px-4 py-2.5 text-sm font-medium rounded-lg transition-colors ${
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
