'use client';

import React, { useState } from 'react';
import { Task } from '@/types';
import { Header } from '@/components/Header';
import { FilterBar } from '@/components/FilterBar';
import { KanbanBoard } from '@/components/KanbanBoard';
import { TaskList } from '@/components/TaskList';
import { TaskEditor } from '@/components/TaskEditor';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LayoutGrid, List } from 'lucide-react';
import { SignOutButton } from '@clerk/nextjs';

export default function Home() {
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [showEditor, setShowEditor] = useState(false);
  const [viewMode, setViewMode] = useState<'kanban' | 'list'>('kanban');

  const handleAddTask = () => {
    setEditingTask(null);
    setShowEditor(true);
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setShowEditor(true);
  };

  const handleCloseEditor = () => {
    setEditingTask(null);
    setShowEditor(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header onAddTask={handleAddTask} />
      
      <main className="container mx-auto max-w-7xl">
        <FilterBar />
        
        <div className="px-4 pb-4">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold">My Tasks</h1>
            
            <Tabs value={viewMode} onValueChange={(value: string) => setViewMode(value as 'kanban' | 'list')}>
              <TabsList className="grid w-full grid-cols-2 lg:w-auto">
                <TabsTrigger value="kanban" className="flex items-center space-x-2">
                  <LayoutGrid className="h-4 w-4" />
                  <span className="hidden sm:inline">Kanban</span>
                </TabsTrigger>
                <TabsTrigger value="list" className="flex items-center space-x-2">
                  <List className="h-4 w-4" />
                  <span className="hidden sm:inline">List</span>
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <Tabs value={viewMode} className="w-full">
            <TabsContent value="kanban" className="mt-0">
              <KanbanBoard onEditTask={handleEditTask} />
            </TabsContent>
            
            <TabsContent value="list" className="mt-0">
              <TaskList onEditTask={handleEditTask} />
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <TaskEditor
        task={editingTask}
        open={showEditor}
        onClose={handleCloseEditor}
      />
    </div>
  );
}