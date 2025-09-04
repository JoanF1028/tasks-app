'use client';

import React from 'react';
import { Search, Moon, Sun, Monitor, Plus } from 'lucide-react';
import { useTheme } from '@/components/providers/ThemeProvider';
import { useTaskContext } from '@/context/TaskContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface HeaderProps {
  onAddTask: () => void;
}

export function Header({ onAddTask }: HeaderProps) {
  const { theme, setTheme } = useTheme();
  const { searchFilters, setSearchFilters } = useTaskContext();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchFilters(prev => ({
      ...prev,
      query: e.target.value,
    }));
  };

  const themeIcon = {
    light: Sun,
    dark: Moon,
    system: Monitor,
  };

  const Icon = themeIcon[theme];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center space-x-4">
          <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
            TaskFlow
          </h1>
        </div>

        <div className="flex items-center space-x-4 flex-1 max-w-md mx-8">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search tasks..."
              value={searchFilters.query}
              onChange={handleSearchChange}
              className="pl-10"
            />
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Button
            onClick={onAddTask}
            size="sm"
            className="hidden sm:flex items-center space-x-2"
          >
            <Plus className="h-4 w-4" />
            <span>Add Task</span>
          </Button>
          
          <Button
            onClick={onAddTask}
            size="sm"
            className="sm:hidden"
          >
            <Plus className="h-4 w-4" />
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <Icon className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setTheme('light')}>
                <Sun className="mr-2 h-4 w-4" />
                Light
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme('dark')}>
                <Moon className="mr-2 h-4 w-4" />
                Dark
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme('system')}>
                <Monitor className="mr-2 h-4 w-4" />
                System
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}