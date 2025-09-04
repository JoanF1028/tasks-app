import { Task } from '@/types';

export interface StorageAdapter {
  getTasks(): Promise<Task[]>;
  saveTasks(tasks: Task[]): Promise<void>;
  clear(): Promise<void>;
}

export class LocalStorageAdapter implements StorageAdapter {
  private readonly key = 'tasks-notes-app';

  async getTasks(): Promise<Task[]> {
    try {
      const data = localStorage.getItem(this.key);
      if (!data) return [];
      
      const tasks = JSON.parse(data);
      return tasks.map((task: any) => ({
        ...task,
        createdAt: new Date(task.createdAt),
        updatedAt: new Date(task.updatedAt),
      }));
    } catch (error) {
      console.error('Error loading tasks from localStorage:', error);
      return [];
    }
  }

  async saveTasks(tasks: Task[]): Promise<void> {
    try {
      localStorage.setItem(this.key, JSON.stringify(tasks));
    } catch (error) {
      console.error('Error saving tasks to localStorage:', error);
      throw error;
    }
  }

  async clear(): Promise<void> {
    localStorage.removeItem(this.key);
  }
}

export class IndexedDBAdapter implements StorageAdapter {
  private readonly dbName = 'TasksNotesDB';
  private readonly storeName = 'tasks';
  private readonly version = 1;

  private async openDB(): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.version);
      
      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result);
      
      request.onupgradeneeded = () => {
        const db = request.result;
        if (!db.objectStoreNames.contains(this.storeName)) {
          const store = db.createObjectStore(this.storeName, { keyPath: 'id' });
          store.createIndex('status', 'status', { unique: false });
          store.createIndex('createdAt', 'createdAt', { unique: false });
        }
      };
    });
  }

  async getTasks(): Promise<Task[]> {
    try {
      const db = await this.openDB();
      const transaction = db.transaction([this.storeName], 'readonly');
      const store = transaction.objectStore(this.storeName);
      
      return new Promise((resolve, reject) => {
        const request = store.getAll();
        request.onerror = () => reject(request.error);
        request.onsuccess = () => {
          const tasks = request.result.map((task: any) => ({
            ...task,
            createdAt: new Date(task.createdAt),
            updatedAt: new Date(task.updatedAt),
          }));
          resolve(tasks);
        };
      });
    } catch (error) {
      console.error('Error loading tasks from IndexedDB:', error);
      return [];
    }
  }

  async saveTasks(tasks: Task[]): Promise<void> {
    try {
      const db = await this.openDB();
      const transaction = db.transaction([this.storeName], 'readwrite');
      const store = transaction.objectStore(this.storeName);
      
      // Clear existing tasks
      await new Promise<void>((resolve, reject) => {
        const clearRequest = store.clear();
        clearRequest.onerror = () => reject(clearRequest.error);
        clearRequest.onsuccess = () => resolve();
      });
      
      // Add all tasks
      for (const task of tasks) {
        await new Promise<void>((resolve, reject) => {
          const addRequest = store.add(task);
          addRequest.onerror = () => reject(addRequest.error);
          addRequest.onsuccess = () => resolve();
        });
      }
    } catch (error) {
      console.error('Error saving tasks to IndexedDB:', error);
      throw error;
    }
  }

  async clear(): Promise<void> {
    try {
      const db = await this.openDB();
      const transaction = db.transaction([this.storeName], 'readwrite');
      const store = transaction.objectStore(this.storeName);
      
      await new Promise<void>((resolve, reject) => {
        const request = store.clear();
        request.onerror = () => reject(request.error);
        request.onsuccess = () => resolve();
      });
    } catch (error) {
      console.error('Error clearing IndexedDB:', error);
      throw error;
    }
  }
}