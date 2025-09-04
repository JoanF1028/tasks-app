export type TaskStatus = 'todo' | 'in-progress' | 'done';

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
  order: number;
}

export interface Tag {
  id: string;
  name: string;
  color: string;
}

export interface SearchFilters {
  query: string;
  tags: string[];
  status?: TaskStatus;
}