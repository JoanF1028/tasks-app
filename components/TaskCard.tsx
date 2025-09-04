'use client';

import React, { useState } from 'react';
import { MoreHorizontal, Edit2, Trash2, GripVertical } from 'lucide-react';
import { Task, TaskStatus } from '@/types';
import { useTaskContext } from '@/context/TaskContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  isDragging?: boolean;
  dragHandleProps?: any;
}

const statusColors = {
  todo: 'bg-slate-100 text-slate-800 border-slate-200',
  'in-progress': 'bg-amber-100 text-amber-800 border-amber-200',
  done: 'bg-green-100 text-green-800 border-green-200',
};

const statusLabels = {
  todo: 'To Do',
  'in-progress': 'In Progress',
  done: 'Done',
};

export function TaskCard({ task, onEdit, isDragging, dragHandleProps }: TaskCardProps) {
  const { deleteTask, updateTask } = useTaskContext();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const handleDelete = async () => {
    await deleteTask(task.id);
    setShowDeleteDialog(false);
  };

  const handleStatusChange = async (newStatus: TaskStatus) => {
    await updateTask(task.id, { status: newStatus });
  };

  return (
    <>
      <Card 
        className={`group transition-all duration-200 hover:shadow-md hover:-translate-y-1 ${
          isDragging ? 'opacity-50 rotate-2 shadow-lg' : ''
        }`}
      >
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 flex-1 min-w-0">
              <div {...dragHandleProps} className="cursor-grab active:cursor-grabbing">
                <GripVertical className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <h3 className="font-medium text-sm truncate flex-1">{task.title}</h3>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => onEdit(task)}>
                  <Edit2 className="mr-2 h-4 w-4" />
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => setShowDeleteDialog(true)}
                  className="text-destructive focus:text-destructive"
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardHeader>
        
        <CardContent className="pt-0">
          <p className="text-sm text-muted-foreground mb-3 line-clamp-3">{task.description}</p>
          
          <div className="flex items-center justify-between">
            <div className="flex flex-wrap gap-1">
              {task.tags.map(tag => (
                <Badge key={tag} variant="outline" className="text-xs">
                  #{tag}
                </Badge>
              ))}
            </div>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-6 px-2">
                  <Badge className={statusColors[task.status]}>
                    {statusLabels[task.status]}
                  </Badge>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => handleStatusChange('todo')}>
                  To Do
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleStatusChange('in-progress')}>
                  In Progress
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleStatusChange('done')}>
                  Done
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          
          <div className="text-xs text-muted-foreground mt-2">
            Updated {task.updatedAt.toLocaleDateString()}
          </div>
        </CardContent>
      </Card>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Task</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{task.title}"? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}