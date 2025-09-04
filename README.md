# TaskFlow - Advanced Tasks/Notes Progressive Web App

A production-ready, offline-first task management application built with Next.js, TypeScript, and TailwindCSS.

## Features

### Core Functionality
- **Full CRUD Operations**: Create, read, update, and delete tasks with inline editing
- **Kanban Board**: Drag & drop tasks between To Do, In Progress, and Done columns
- **Real-time Search**: Search tasks by title, description, or content
- **Advanced Filtering**: Filter by tags, status, or creation date
- **Offline Support**: Works completely offline with local data persistence

### Technical Features
- **Progressive Web App**: Installable with service worker for offline caching
- **Dual Storage**: LocalStorage with IndexedDB fallback for scalability
- **Dark/Light Theme**: Automatic system preference detection with manual toggle
- **Responsive Design**: Optimized for mobile, tablet, and desktop
- **TypeScript**: Strict typing throughout the application
- **Accessibility**: Full keyboard navigation and ARIA support

### UI/UX Features
- **Smooth Animations**: Tailwind-powered micro-interactions
- **Drag & Drop**: Intuitive task reordering with visual feedback
- **Clean Design**: Modern, minimal interface inspired by Apple's design language
- **Mobile-First**: Responsive layout that adapts seamlessly across devices

## Technical Architecture

### State Management
- React Context API for global state
- Custom hooks for data persistence
- Optimistic updates for better UX

### Storage Strategy
- **Primary**: LocalStorage for fast, simple persistence
- **Fallback**: IndexedDB for larger datasets and better performance
- **Offline**: Service Worker caches app shell and static assets

### TypeScript Integration
- Strict mode enabled
- Comprehensive type definitions
- Strong typing throughout components and hooks

### Responsive Design
- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- Flexible grid layouts that adapt to screen size

## Usage

### Creating Tasks
1. Click the "Add Task" button in the header
2. Fill in title, description, status, and optional tags
3. Click "Create" to save

### Managing Tasks
- **Edit**: Click the three dots menu on any task card
- **Delete**: Use the three dots menu with confirmation dialog
- **Change Status**: Click on the status badge or drag between columns
- **Reorder**: Drag tasks within and between Kanban columns

### Search & Filtering
- Use the search bar to find tasks by title or description
- Apply filters by status, tags, or date using the filter dropdown
- Multiple filters can be active simultaneously

### Offline Usage
- The app works completely offline after the first load
- All data is stored locally on your device
- Changes sync automatically when you're back online

## Performance

- Lazy loading for non-critical components
- Optimized bundle size with tree shaking
- Efficient re-renders with React.memo and useMemo
- Progressive enhancement for offline functionality