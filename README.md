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

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd taskflow
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
├── app/
│   ├── layout.tsx          # Root layout with providers
│   ├── page.tsx            # Main application page
│   └── globals.css         # Global styles and CSS variables
├── components/
│   ├── providers/
│   │   └── ThemeProvider.tsx    # Theme context provider
│   ├── Header.tsx          # Navigation header with search
│   ├── FilterBar.tsx       # Task filtering controls
│   ├── KanbanBoard.tsx     # Drag & drop Kanban interface
│   ├── TaskList.tsx        # List view for tasks
│   ├── TaskCard.tsx        # Individual task component
│   ├── TaskEditor.tsx      # Task creation/editing modal
│   └── OfflineIndicator.tsx # Shows offline status
├── context/
│   └── TaskContext.tsx     # Global state management
├── hooks/
│   ├── useLocalStorage.ts  # Local storage persistence hook
│   └── usePWA.ts          # PWA installation and service worker
├── lib/
│   ├── storage.ts         # Storage adapters (LocalStorage/IndexedDB)
│   └── utils.ts           # Utility functions
├── types/
│   └── index.ts           # TypeScript type definitions
└── public/
    ├── manifest.json      # PWA manifest
    ├── sw.js             # Service worker for offline support
    ├── icon-192x192.png  # App icons for PWA
    └── icon-512x512.png
```

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

## Deployment

### Vercel (Recommended)
1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`
3. Follow the prompts

### Netlify
1. Build the project: `npm run build`
2. Upload the `out/` folder to Netlify
3. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `out`

### Other Platforms
Since this is a static Next.js app (`output: 'export'`), it can be deployed to any static hosting provider.

## Browser Support

- Chrome/Edge 88+
- Firefox 84+
- Safari 14+
- Mobile browsers with modern JavaScript support

## Performance

- Lazy loading for non-critical components
- Optimized bundle size with tree shaking
- Efficient re-renders with React.memo and useMemo
- Progressive enhancement for offline functionality

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -am 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a pull request

## License

This project is licensed under the MIT License.