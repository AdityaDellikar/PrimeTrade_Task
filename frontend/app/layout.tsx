import type { Metadata } from 'next';
import './globals.css';
import '@fontsource/inter/index.css';
import { AuthProvider } from '@/context/AuthContext';

export const metadata: Metadata = {
  title: 'PrimeTrade Dashboard',
  description: 'Production-ready fintech dashboard'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="font-sans">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
