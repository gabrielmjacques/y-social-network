import type { Metadata } from 'next';
import '../globals.css';

export const metadata: Metadata = {
  title: 'Y - Join'
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
    </>
  );
}
