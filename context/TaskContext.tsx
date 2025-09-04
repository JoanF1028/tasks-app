'use client';

import React, { createContext, useContext, ReactNode } from 'react';
import { Task, SearchFilters, TaskStatus } from '@/types';
import { useLocalStorage } from '@/hooks/useLocalStorage';

interface TaskContextType {
  tasks: Task[];
  isLoading: boolean;
  searchFilters: SearchFilters;
  filteredTasks: Task[];
  addTask: (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt' | 'order'>) => Promise<void>;
  updateTask: (id: string, updates: Partial<Task>) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
  reorderTasks: (tasks: Task[]) => Promise<void>;
  setSearchFilters: React.Dispatch<React.SetStateAction<SearchFilters>>;
  getTasksByStatus: (status: TaskStatus) => Task[];
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export function useTaskContext() {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error('useTaskContext must be used within a TaskProvider');
  }
  return context;
}

export function TaskProvider({ children }: { children: ReactNode }) {
  const { tasks, isLoading, addTask, updateTask, deleteTask, reorderTasks } = useLocalStorage();
  const [searchFilters, setSearchFilters] = React.useState<SearchFilters>({
    query: '',
    tags: [],
  });

  const filteredTasks = React.useMemo(() => {
    return tasks.filter(task => {
      const matchesQuery = !searchFilters.query || 
        task.title.toLowerCase().includes(searchFilters.query.toLowerCase()) ||
        task.description.toLowerCase().includes(searchFilters.query.toLowerCase());
      
      const matchesTags = searchFilters.tags.length === 0 ||
        searchFilters.tags.every(tag => task.tags.includes(tag));
      
      const matchesStatus = !searchFilters.status || task.status === searchFilters.status;
      
      return matchesQuery && matchesTags && matchesStatus;
    }).sort((a, b) => a.order - b.order);
  }, [tasks, searchFilters]);

  const getTasksByStatus = React.useCallback((status: TaskStatus) => {
    return filteredTasks.filter(task => task.status === status);
  }, [filteredTasks]);

  const value: TaskContextType = {
    tasks,
    isLoading,
    searchFilters,
    filteredTasks,
    addTask,
    updateTask,
    deleteTask,
    reorderTasks,
    setSearchFilters,
    getTasksByStatus,
  };

  return (
    <TaskContext.Provider value={value}>
      {children}
    </TaskContext.Provider>
  );
}