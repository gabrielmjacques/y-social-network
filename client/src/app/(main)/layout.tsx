import type { Metadata } from 'next';
import '../globals.css';
import AsideMenu from '../components/AsideMenu';

export const metadata: Metadata = {
  title: 'Y - Profile',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
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
  );
}
