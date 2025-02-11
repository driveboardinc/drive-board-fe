import type { Metadata } from 'next';
import './globals.css';
import { ReduxProvider } from '@/components/providers/ReduxProvider';

export const metadata: Metadata = {
  title: 'Driver Board',
  description:
    'Simplifying the hiring process for transportation companies and helping drivers find their next opportunity. The most advanced job and load board platform for the modern trucking industry.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}
