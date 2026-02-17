'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

const taskSchema = z.object({
  title: z.string().min(1, 'Title is required').max(120),
  description: z.string().max(1000).optional()
});

type TaskFormValues = z.infer<typeof taskSchema>;

export function TaskForm({ onSubmit }: { onSubmit: (values: TaskFormValues) => Promise<void> }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<TaskFormValues>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: '',
      description: ''
    }
  });

  const submitHandler = async (values: TaskFormValues) => {
    await onSubmit(values);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)} className="space-y-4">
      <Input label="Task Title" placeholder="Quarterly strategy review" error={errors.title?.message} {...register('title')} />
      <Input label="Description" placeholder="Add details" error={errors.description?.message} {...register('description')} />
      <Button type="submit" fullWidth disabled={isSubmitting}>
        {isSubmitting ? 'Creating...' : 'Add Task'}
      </Button>
    </form>
  );
}
