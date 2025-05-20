'use client';
import BottomNav from '@/components/layout/BottomNav';
import NavBar from '@/components/layout/navbar';
import SideBar from '@/components/layout/sidebar';
import { useNavbar } from '@/contexts/NavContext';
import { ReactNode } from 'react';

interface WrapperProps {
  children: ReactNode;
  navSM?: boolean;
}

const Wrapper = ({ children }: WrapperProps) => {
  const { viewSM, showNav } = useNavbar();
  
  return showNav ? (
    <main className="min-h-screen bg-background">
      <SideBar />
      <div className="flex flex-col min-h-screen">
        <div className={viewSM ? '' : 'max-md:hidden'}>
          <NavBar />
        </div>
        <div className={`flex-1 ${viewSM ? 'mt-16 md:mt-20' : 'md:mt-20'} md:ml-64`}>
          {children}
        </div>
        <div className={viewSM ? 'block md:hidden' : 'hidden'}>
          <BottomNav />
        </div>
      </div>
    </main>
  ) : (
    children
  );
};

export default Wrapper;
