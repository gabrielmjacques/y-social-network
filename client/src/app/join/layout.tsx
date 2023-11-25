import type { Metadata } from 'next';
<<<<<<< HEAD
import '../globals.css';

export const metadata: Metadata = {
  title: 'Y - Join'
=======
import { Inter } from 'next/font/google';
import '../globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Y - Join',
  icons: {
    icon: 'favicon.ico',
  }
>>>>>>> a475dd9b5f5a2301aff372e751e7672cf4b66109
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
<<<<<<< HEAD
    <>
      {children}
    </>
=======
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
>>>>>>> a475dd9b5f5a2301aff372e751e7672cf4b66109
  );
}
