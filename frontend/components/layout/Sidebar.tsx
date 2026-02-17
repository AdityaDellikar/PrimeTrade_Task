'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navLinks = [
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/dashboard', label: 'Task Manager' },
  { href: '/dashboard', label: 'Profile & Activity' }
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="h-full rounded-2xl border border-border bg-card p-4">
      <h2 className="mb-6 text-lg font-semibold text-text">PrimeTrade</h2>
      <nav className="space-y-2">
        {navLinks.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            className={`block rounded-xl px-3 py-2 text-sm transition ${pathname === '/dashboard' && link.href === '/dashboard' ? 'bg-[#141C25] text-neon' : 'text-text/70 hover:bg-[#141C25] hover:text-text'}`}
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
