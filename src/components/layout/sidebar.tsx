'use client';

import AuthContext from '@/contexts/AuthContext';
import { SidebarOption, SidebarSection, useNavbar } from '@/contexts/NavContext';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useContext } from 'react';

// Determine if the options array has sections
const hasSections = (options: (SidebarOption | SidebarSection)[]): options is SidebarSection[] => {
  return options.length > 0 && 'section' in options[0] && 'items' in options[0];
};

export default function SideBar() {
  const pathname = usePathname();
  const { user } = useContext(AuthContext);
  const { sidebarOptions } = useNavbar();

  return (
    <motion.aside
      initial={{ x: -15, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className='fixed top-0 left-0 z-40 w-64 h-screen hidden md:block transition-transform translate-x-0 bg-sidebar'
      aria-label='Sidebar'>
      <div className='h-full flex flex-col px-4 py-8 overflow-y-auto scrollbar-hide'>
        {/* Logo Section */}
        <div className='mb-8 px-4'>
          <Link href='/' className='flex items-center'>
            <span className='self-center text-xl font-semibold whitespace-nowrap text-sidebar-foreground'>Caelium FMS</span>
          </Link>
        </div>

        {/* User Profile Section */}
        <div className='mb-8'>
          <motion.div className='p-4 rounded-2xl bg-sidebar-primary/10' whileHover={{ scale: 1.02 }}>
            <div className='flex items-center gap-4'>
              <div className='w-12 h-12 rounded-xl overflow-hidden bg-sidebar-primary p-0.5'>
                {/* Placeholder avatar - you can replace with a real user avatar */}
                <div className='w-full h-full rounded-[10px] bg-sidebar-accent'>
                  <img src={user?.avatar} alt='' />
                </div>
              </div>
              <div>
                <h3 className='font-medium text-sidebar-foreground'>{user?.name}</h3>
                {/* <p className='text-sm text-sidebar-foreground/70'>@username</p> */}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Navigation */}
        <nav className='flex-1 space-y-6'>
          {hasSections(sidebarOptions)
            ? // Render sidebar with sections
              (sidebarOptions as SidebarSection[]).map((section, sectionIndex) => (
                <div key={sectionIndex} className='space-y-2'>
                  <div className='mb-2 text-sm font-medium text-sidebar-foreground/70 px-4'>{section.section}</div>
                  {section.items.map((option, id) => (
                    <motion.div key={id} whileHover={{ scale: 1.02 }} className='mb-1'>
                      <Link
                        href={option.url}
                        className={cn(
                          'flex items-center gap-3 px-4 py-3 rounded-xl transition-all',
                          pathname === option.url || (pathname?.startsWith(option.url + '/') && option.url !== '/')
                            ? 'bg-sidebar-primary text-sidebar-primary-foreground'
                            : 'hover:bg-sidebar-accent hover:text-sidebar-accent-foreground text-sidebar-foreground/80'
                        )}>
                        <option.icon className='w-5 h-5' />
                        <span>{option.name}</span>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              ))
            : // Render flat sidebar without sections
              (sidebarOptions as SidebarOption[]).map((option, id) => (
                <motion.div key={id} whileHover={{ scale: 1.02 }} className='mb-1'>
                  <Link
                    href={option.url}
                    className={cn(
                      'flex items-center gap-3 px-4 py-3 rounded-xl transition-all',
                      pathname === option.url || (pathname?.startsWith(option.url + '/') && option.url !== '/')
                        ? 'bg-sidebar-primary text-sidebar-primary-foreground'
                        : 'hover:bg-sidebar-accent hover:text-sidebar-accent-foreground text-sidebar-foreground/80'
                    )}>
                    <option.icon className='w-5 h-5' />
                    <span>{option.name}</span>
                  </Link>
                </motion.div>
              ))}
        </nav>

        {/* Footer */}
        <div className='px-4 py-4 mt-6 border-t border-sidebar-border'>
          {/* Logout Button */}
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className='mt-4'>
            <button className='w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='w-5 h-5'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'>
                <path d='M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4'></path>
                <polyline points='16 17 21 12 16 7'></polyline>
                <line x1='21' y1='12' x2='9' y2='12'></line>
              </svg>
              <span>Logout</span>
            </button>
          </motion.div>
        </div>
      </div>
    </motion.aside>
  );
}
