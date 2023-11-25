import type { Metadata } from 'next';
<<<<<<< HEAD
import '../globals.css';
import AsideMenu from '../components/AsideMenu';

export const metadata: Metadata = {
  title: 'Y - Profile',
=======
import { Inter } from 'next/font/google';
import '../globals.css';
import AsideMenu from '../components/AsideMenu';
import Button from '../components/Button';
import MobileMenu from '../components/MobileMenu';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Y - Profile',
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
    <div className='bg-gray-950 text-white min-h-screen'>

      <div className='hidden md:block'>
        <AsideMenu />
      </div>

      <div className='relative md:left-1/4 md:w-2/4 min-h-screen border-s border-e border-white border-opacity-20'>
        {children}
      </div>

      <div className='hidden md:block'>
        <div className='fixed flex justify-center items-center right-0 top-0 w-1/4 h-full px-4 py-1'>

          <div className='flex justify-center items-center rounded-xl w-full font-extrabold bg-gray-900 h-3/4 text-3xl opacity-70'>
            <span className='opacity-50'>Coming soon</span>
          </div>

        </div>
      </div>

    </div>
=======
    <body className={inter.className}>
      <div className='bg-gray-950 text-white min-h-screen'>

        <div className='hidden md:block'>
          <AsideMenu />
        </div>

        <div className='relative md:left-1/4 md:w-2/4 min-h-screen border-s border-e border-white border-opacity-20'>
          {children}
        </div>

        <div className='hidden md:block'>
          <div className='fixed flex justify-center items-center right-0 top-0 w-1/4 h-full px-4 py-1'>

            <div className='flex justify-center items-center rounded-xl w-full font-extrabold bg-gray-900 h-3/4 text-3xl opacity-70'>
              <span className='opacity-50'>Coming soon</span>
            </div>

          </div>
        </div>

      </div>
    </body>
>>>>>>> a475dd9b5f5a2301aff372e751e7672cf4b66109
  );
}
