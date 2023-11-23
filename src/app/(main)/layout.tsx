import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../globals.css';
import AsideMenu from '../components/AsideMenu';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Y - Profile',
  icons: {
    icon: 'favicon.ico',
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <body className={inter.className}>
      <div className='bg-gray-950 text-white min-h-screen'>
        <AsideMenu />

        <div className='relative left-1/4 w-5/12'>
          {children}
        </div>
      </div>
    </body>
  );
}
