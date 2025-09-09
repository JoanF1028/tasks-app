import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { TaskProvider } from '@/context/TaskContext';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import { OfflineIndicator } from '@/components/OfflineIndicator';
import { ClerkProvider } from '@clerk/nextjs';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'TaskFlow - Advanced Task Management',
  description: 'A modern, offline-first task management application',
  keywords: 'tasks, notes, productivity, offline, PWA',
  manifest: '/manifest.json',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0f172a' },
  ],
  viewport: 'minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'TaskFlow',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <head>
          <link rel="apple-touch-icon" sizes="180x180" href="/icon-192x192.png" />
        </head>
        <body className={inter.className}>
          <ThemeProvider defaultTheme="system" storageKey="taskflow-theme">
            <TaskProvider>
              <div className="min-h-screen bg-background">
                {children}
                <OfflineIndicator />
              </div>
            </TaskProvider>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}