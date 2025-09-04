'use client';

import React, { useState, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import { Task, TaskStatus } from '@/types';
import { useTaskContext } from '@/context/TaskContext';
import { TaskCard } from './TaskCard';

interface KanbanBoardProps {
  onEditTask: (task: Task) => void;
}

interface DragState {
  draggedTask: Task | null;
  draggedFromColumn: TaskStatus | null;
  draggedOverColumn: TaskStatus | null;
}

const statusConfig = {
  todo: {
    title: 'To Do',
    bgColor: 'bg-slate-50 dark:bg-slate-900/50',
    borderColor: 'border-slate-200 dark:border-slate-700',
  },
  'in-progress': {
    title: 'In Progress', 
    bgColor: 'bg-amber-50 dark:bg-amber-900/20',
    borderColor: 'border-amber-200 dark:border-amber-700',
  },
  done: {
    title: 'Done',
    bgColor: 'bg-green-50 dark:bg-green-900/20', 
    borderColor: 'border-green-200 dark:border-green-700',
  },
};

export function KanbanBoard({ onEditTask }: KanbanBoardProps) {
  const { getTasksByStatus, updateTask, reorderTasks } = useTaskContext();
  const [dragState, setDragState] = useState<DragState>({
    draggedTask: null,
    draggedFromColumn: null,
    draggedOverColumn: null,
  });

  const handleDragStart = (task: Task) => {
    setDragState({
      draggedTask: task,
      draggedFromColumn: task.status,
      draggedOverColumn: null,
    });
  };

  const handleDragOver = (status: TaskStatus, e: React.DragEvent) => {
    e.preventDefault();
    setDragState(prev => ({
      ...prev,
      draggedOverColumn: status,
    }));
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
      setDragState(prev => ({
        ...prev,
        draggedOverColumn: null,
      }));
    }
  };

  const handleDrop = async (status: TaskStatus, e: React.DragEvent) => {
    e.preventDefault();
    
    if (!dragState.draggedTask) return;

    if (dragState.draggedTask.status !== status) {
      await updateTask(dragState.draggedTask.id, { status });
    }

    setDragState({
      draggedTask: null,
      draggedFromColumn: null,
      draggedOverColumn: null,
    });
  };

  const handleDragEnd = () => {
    setDragState({
      draggedTask: null,
      draggedFromColumn: null,
      draggedOverColumn: null,
    });
  };

  const renderColumn = (status: TaskStatus) => {
    const tasks = getTasksByStatus(status);
    const config = statusConfig[status];
    const isDropTarget = dragState.draggedOverColumn === status;
    const canDrop = dragState.draggedTask && dragState.draggedTask.status !== status;

    return (
      <div
        key={status}
        className={`flex-1 min-h-[400px] rounded-lg border-2 transition-all duration-200 ${
          config.bgColor
        } ${
          isDropTarget && canDrop 
            ? 'border-blue-400 dark:border-blue-500 shadow-lg scale-105' 
            : config.borderColor
        }`}
        onDragOver={(e) => handleDragOver(status, e)}
        onDragLeave={handleDragLeave}
        onDrop={(e) => handleDrop(status, e)}
      >
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-lg">{config.title}</h2>
            <Badge variant="outline" className="text-xs">
              {tasks.length}
            </Badge>
          </div>
          
          <div className="space-y-3">
            {tasks.map(task => (
              <div
                key={task.id}
                draggable
                onDragStart={() => handleDragStart(task)}
                onDragEnd={handleDragEnd}
                className="cursor-move"
              >
                <TaskCard
                  task={task}
                  onEdit={onEditTask}
                  isDragging={dragState.draggedTask?.id === task.id}
                />
              </div>
            ))}
            
            {tasks.length === 0 && (
              <div className="text-center text-muted-foreground py-8">
                <p className="text-sm">No tasks in {config.title.toLowerCase()}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 p-4">
      {(['todo', 'in-progress', 'done'] as TaskStatus[]).map(renderColumn)}
    </div>
  );
}