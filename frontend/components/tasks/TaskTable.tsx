'use client';

import type { Task, TaskStatus } from '@/types';

type TaskTableProps = {
  tasks: Task[];
  onDelete: (id: string) => Promise<void>;
  onToggleStatus: (id: string, status: TaskStatus) => Promise<void>;
};

export function TaskTable({ tasks, onDelete, onToggleStatus }: TaskTableProps) {
  if (!tasks.length) {
    return <p className="text-sm text-text/60">No tasks found.</p>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[680px] text-left text-sm">
        <thead>
          <tr className="border-b border-border text-text/60">
            <th className="py-3">Title</th>
            <th className="py-3">Description</th>
            <th className="py-3">Status</th>
            <th className="py-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task._id} className="border-b border-border/80 transition hover:bg-[#141C25]">
              <td className="py-3 text-text">{task.title}</td>
              <td className="py-3 text-text/70">{task.description || '-'}</td>
              <td className="py-3">
                <span
                  className={`rounded-full px-2 py-1 text-xs ${task.status === 'completed' ? 'bg-[#103021] text-emerald' : 'bg-[#2A260D] text-neon'}`}
                >
                  {task.status}
                </span>
              </td>
              <td className="py-3">
                <div className="flex gap-2">
                  <button
                    type="button"
                    className="rounded-lg border border-border px-2 py-1 text-xs text-text/80"
                    onClick={() => onToggleStatus(task._id, task.status === 'pending' ? 'completed' : 'pending')}
                  >
                    Toggle
                  </button>
                  <button
                    type="button"
                    className="rounded-lg border border-red-500/40 px-2 py-1 text-xs text-red-300"
                    onClick={() => onDelete(task._id)}
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
