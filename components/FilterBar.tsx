'use client';

import React from 'react';
import { Filter, X } from 'lucide-react';
import { useTaskContext } from '@/context/TaskContext';
import { TaskStatus } from '@/types';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';

export function FilterBar() {
  const { tasks, searchFilters, setSearchFilters } = useTaskContext();

  const allTags = React.useMemo(() => {
    const tagSet = new Set<string>();
    tasks.forEach(task => task.tags.forEach(tag => tagSet.add(tag)));
    return Array.from(tagSet);
  }, [tasks]);

  const handleStatusFilter = (status: TaskStatus | 'all') => {
    setSearchFilters(prev => ({
      ...prev,
      status: status === 'all' ? undefined : status,
    }));
  };

  const handleTagFilter = (tag: string) => {
    setSearchFilters(prev => ({
      ...prev,
      tags: prev.tags.includes(tag)
        ? prev.tags.filter(t => t !== tag)
        : [...prev.tags, tag],
    }));
  };

  const clearFilters = () => {
    setSearchFilters({
      query: '',
      tags: [],
      status: undefined,
    });
  };

  const hasActiveFilters = searchFilters.tags.length > 0 || searchFilters.status;

  return (
    <div className="flex items-center space-x-4 p-4 bg-muted/30">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="h-8">
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-48">
          <DropdownMenuItem onClick={() => handleStatusFilter('all')}>
            All Tasks
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleStatusFilter('todo')}>
            To Do
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleStatusFilter('in-progress')}>
            In Progress
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleStatusFilter('done')}>
            Done
          </DropdownMenuItem>
          
          {allTags.length > 0 && (
            <>
              <DropdownMenuSeparator />
              {allTags.map(tag => (
                <DropdownMenuItem key={tag} onClick={() => handleTagFilter(tag)}>
                  <span className="truncate">#{tag}</span>
                </DropdownMenuItem>
              ))}
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      <div className="flex items-center space-x-2 flex-wrap">
        {searchFilters.status && (
          <Badge variant="secondary" className="text-xs">
            {searchFilters.status}
            <Button
              variant="ghost"
              size="sm"
              className="h-auto p-0 ml-2"
              onClick={() => handleStatusFilter('all')}
            >
              <X className="h-3 w-3" />
            </Button>
          </Badge>
        )}
        
        {searchFilters.tags.map(tag => (
          <Badge key={tag} variant="secondary" className="text-xs">
            #{tag}
            <Button
              variant="ghost"
              size="sm"
              className="h-auto p-0 ml-2"
              onClick={() => handleTagFilter(tag)}
            >
              <X className="h-3 w-3" />
            </Button>
          </Badge>
        ))}
      </div>

      {hasActiveFilters && (
        <Button variant="ghost" size="sm" onClick={clearFilters} className="h-8">
          Clear All
        </Button>
      )}
    </div>
  );
}