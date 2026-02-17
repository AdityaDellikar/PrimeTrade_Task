import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="min-h-screen px-6 py-20 md:px-12">
      <section className="mx-auto max-w-5xl rounded-2xl border border-border bg-gradient-to-br from-[#0F151C] via-[#11161D] to-[#0B0F14] p-10 md:p-16">
        <p className="mb-3 text-sm uppercase tracking-[0.2em] text-neon">PrimeTrade</p>
        <h1 className="max-w-3xl text-4xl font-bold leading-tight text-text md:text-6xl">
          Your secure command center for modern task-driven trading operations.
        </h1>
        <p className="mt-5 max-w-2xl text-text/70">
          Manage profiles, track execution tasks, and monitor progress through a sleek Web3-inspired dashboard.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Link href="/register" className="rounded-2xl bg-neon-gradient px-6 py-3 text-sm font-semibold text-black shadow-neon">
            Create Account
          </Link>
          <Link href="/login" className="rounded-2xl border border-border px-6 py-3 text-sm text-text/80 transition hover:bg-[#141C25]">
            Sign In
          </Link>
        </div>
      </section>
    </main>
  );
}
