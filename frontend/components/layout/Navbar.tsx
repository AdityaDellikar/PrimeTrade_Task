'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';

export function Navbar() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  return (
    <header className="flex items-center justify-between rounded-2xl border border-border bg-card px-4 py-3">
      <div>
        <h1 className="text-lg font-semibold text-text">Dashboard</h1>
        <p className="text-xs text-text/60">Track your activity in one place</p>
      </div>
      <div className="relative">
        <button
          className="rounded-xl border border-border bg-[#0D1218] px-3 py-2 text-sm text-text"
          onClick={() => setOpen((prev) => !prev)}
          type="button"
        >
          {user?.name || 'Profile'}
        </button>
        {open ? (
          <div className="absolute right-0 mt-2 w-44 rounded-xl border border-border bg-card p-2 shadow-lg">
            <p className="px-2 py-1 text-xs text-text/60">{user?.email}</p>
            <button
              className="mt-1 w-full rounded-lg px-2 py-2 text-left text-sm text-text/80 transition hover:bg-[#141C25]"
              onClick={handleLogout}
              type="button"
            >
              Logout
            </button>
          </div>
        ) : null}
      </div>
    </header>
  );
}
