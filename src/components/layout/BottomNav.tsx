'use client';

import { bottomNavOptions } from '@/contexts/NavContext';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const BottomNav = () => {
  const pathname = usePathname();

  return (
    <div className='fixed md:hidden bottom-0 left-0 z-50 w-full h-16 border-t bg-background'>
      <div className='grid h-full max-w-lg grid-cols-5 mx-auto font-medium'>
        {bottomNavOptions.map((option, id) => {
          const isActive = pathname === option.url || 
            (pathname?.startsWith(option.url + '/') && option.url !== '/');
            
          return (
            <Link href={option.url} key={id} className='relative inline-flex flex-col items-center justify-center px-5 group'>
              <motion.div
                className={`p-2 rounded-lg ${isActive ? 'bg-muted' : ''}`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <option.icon
                  className={`w-6 h-6 ${isActive ? 'text-primary' : 'text-foreground/70'}`}
                />
              </motion.div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNav;
