'use client';

import React from 'react';
import { Task } from '@/types';
import { useTaskContext } from '@/context/TaskContext';
import { TaskCard } from './TaskCard';

interface TaskListProps {
  onEditTask: (task: Task) => void;
}

export function TaskList({ onEditTask }: TaskListProps) {
  const { filteredTasks, isLoading } = useTaskContext();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (filteredTasks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="text-muted-foreground mb-2">No tasks found</div>
        <p className="text-sm text-muted-foreground">
          Create your first task to get started
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {filteredTasks.map(task => (
        <TaskCard
          key={task.id}
          task={task}
          onEdit={onEditTask}
        />
      ))}
    </div>
  );
}