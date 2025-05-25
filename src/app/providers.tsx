'use client';

import { AuthProvider } from '@/contexts/AuthContext';
import { NavbarProvider } from '@/contexts/NavContext';
import { ReactNode } from 'react';

const ProvidersWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <AuthProvider>
      <NavbarProvider>{children}</NavbarProvider>
    </AuthProvider>
  );
};

export default ProvidersWrapper;
