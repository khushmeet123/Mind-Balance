import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'MindBalance — Intelligent Workforce Well-being System',
  description: 'Enterprise-grade employee mental wellness and stress management platform.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-[#FAF8F5] text-[#1C2321]">
        {children}
      </body>
    </html>
  );
}
