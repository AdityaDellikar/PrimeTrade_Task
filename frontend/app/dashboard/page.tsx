'use client';

import { useEffect, useMemo, useState } from 'react';
import { api } from '@/lib/axios';
import type { Task, TaskStatus } from '@/types';
import { ProtectedRoute } from '@/components/layout/ProtectedRoute';
import { Sidebar } from '@/components/layout/Sidebar';
import { Navbar } from '@/components/layout/Navbar';
import { Card } from '@/components/ui/Card';
import { TaskForm } from '@/components/tasks/TaskForm';
import { TaskTable } from '@/components/tasks/TaskTable';
import { useAuth } from '@/hooks/useAuth';

export default function DashboardPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<TaskStatus | ''>('');
  const { user } = useAuth();

  const fetchTasks = async () => {
    const response = await api.get('/tasks', {
      params: {
        search,
        status: statusFilter || undefined
      }
    });
    setTasks(response.data.data);
  };

  useEffect(() => {
    fetchTasks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statusFilter, search]);

  const handleCreateTask = async (values: { title: string; description?: string }) => {
    await api.post('/tasks', values);
    await fetchTasks();
  };

  const handleDeleteTask = async (id: string) => {
    await api.delete(`/tasks/${id}`);
    await fetchTasks();
  };

  const handleToggleTaskStatus = async (id: string, status: TaskStatus) => {
    await api.put(`/tasks/${id}`, { status });
    await fetchTasks();
  };

  const pendingCount = useMemo(() => tasks.filter((task) => task.status === 'pending').length, [tasks]);

  return (
    <ProtectedRoute>
      <main className="min-h-screen p-4 md:p-6">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-4 md:grid-cols-[240px_1fr]">
          <Sidebar />
          <div className="space-y-4">
            <Navbar />
            <div className="grid gap-4 lg:grid-cols-3">
              <Card className="p-5">
                <p className="text-xs uppercase tracking-wider text-text/60">Profile</p>
                <h3 className="mt-2 text-lg font-semibold">{user?.name}</h3>
                <p className="text-sm text-text/70">{user?.email}</p>
              </Card>
              <Card className="bg-neon-gradient p-5 text-black">
                <p className="text-xs uppercase tracking-wider">Portfolio Balance</p>
                <h3 className="mt-2 text-3xl font-bold">$18,420.55</h3>
                <p className="text-sm">{pendingCount} tasks pending</p>
              </Card>
              <Card className="p-5">
                <TaskForm onSubmit={handleCreateTask} />
              </Card>
            </div>

            <Card className="p-5">
              <div className="mb-4 flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
                <h2 className="text-lg font-semibold">Tasks</h2>
                <div className="flex w-full gap-2 sm:w-auto">
                  <input
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    placeholder="Search tasks..."
                    className="w-full rounded-2xl border border-border bg-[#0D1218] px-3 py-2 text-sm outline-none focus:border-neon sm:w-72"
                  />
                  <select
                    value={statusFilter}
                    onChange={(event) => setStatusFilter(event.target.value as TaskStatus | '')}
                    className="rounded-2xl border border-border bg-[#0D1218] px-3 py-2 text-sm outline-none focus:border-neon"
                  >
                    <option value="">All</option>
                    <option value="pending">Pending</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
              </div>
              <TaskTable tasks={tasks} onDelete={handleDeleteTask} onToggleStatus={handleToggleTaskStatus} />
            </Card>
          </div>
        </div>
      </main>
    </ProtectedRoute>
  );
}
