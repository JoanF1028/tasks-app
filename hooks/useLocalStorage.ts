'use client';

import { useState, useEffect, useCallback } from 'react';
import { Task } from '@/types';
import { LocalStorageAdapter, IndexedDBAdapter, StorageAdapter } from '@/lib/storage';

export function useLocalStorage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [storageAdapter, setStorageAdapter] = useState<StorageAdapter | null>(null);

  useEffect(() => {
    const initStorage = async () => {
      try {
        // Try IndexedDB first, fallback to localStorage
        let adapter: StorageAdapter;
        
        if (typeof window !== 'undefined' && 'indexedDB' in window) {
          try {
            adapter = new IndexedDBAdapter();
            await adapter.getTasks(); // Test if IndexedDB works
          } catch (error) {
            console.warn('IndexedDB not available, falling back to localStorage');
            adapter = new LocalStorageAdapter();
          }
        } else {
          adapter = new LocalStorageAdapter();
        }
        
        setStorageAdapter(adapter);
        const loadedTasks = await adapter.getTasks();
        setTasks(loadedTasks);
      } catch (error) {
        console.error('Error initializing storage:', error);
        setStorageAdapter(new LocalStorageAdapter());
      } finally {
        setIsLoading(false);
      }
    };

    initStorage();
  }, []);

  const saveTasks = useCallback(async (newTasks: Task[]) => {
    if (!storageAdapter) return;
    
    try {
      await storageAdapter.saveTasks(newTasks);
      setTasks(newTasks);
    } catch (error) {
      console.error('Error saving tasks:', error);
    }
  }, [storageAdapter]);

  const addTask = useCallback(async (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt' | 'order'>) => {
    const newTask: Task = {
      ...task,
      id: crypto.randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date(),
      order: tasks.length,
    };
    
    const updatedTasks = [...tasks, newTask];
    await saveTasks(updatedTasks);
  }, [tasks, saveTasks]);

  const updateTask = useCallback(async (id: string, updates: Partial<Task>) => {
    const updatedTasks = tasks.map(task => 
      task.id === id 
        ? { ...task, ...updates, updatedAt: new Date() }
        : task
    );
    await saveTasks(updatedTasks);
  }, [tasks, saveTasks]);

  const deleteTask = useCallback(async (id: string) => {
    const updatedTasks = tasks.filter(task => task.id !== id);
    await saveTasks(updatedTasks);
  }, [tasks, saveTasks]);

  const reorderTasks = useCallback(async (newTasks: Task[]) => {
    const tasksWithOrder = newTasks.map((task, index) => ({
      ...task,
      order: index,
      updatedAt: new Date(),
    }));
    await saveTasks(tasksWithOrder);
  }, [saveTasks]);

  return {
    tasks,
    isLoading,
    addTask,
    updateTask,
    deleteTask,
    reorderTasks,
  };
}