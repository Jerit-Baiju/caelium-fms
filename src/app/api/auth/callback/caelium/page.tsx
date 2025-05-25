'use client';

import Loader from '@/components/layout/Loader';
import AuthContext from '@/contexts/AuthContext';
import { useRouter, useSearchParams } from 'next/navigation';
import { useContext, useEffect, useState } from 'react';

const Page = () => {
  const { loginUser } = useContext(AuthContext);
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    // Get only the access parameter
    const accessToken = searchParams.get('access');
    const refreshToken = searchParams.get('refresh');

    if (accessToken && refreshToken && !isProcessing) {
      setIsProcessing(true);
      
      const handleAuth = async () => {
        await loginUser({ access: accessToken, refresh: refreshToken });
        
        // Add a small delay to ensure tokens are properly stored
        setTimeout(() => {
          // Navigate to homepage after successful login
          router.push('/');
        }, 500);
      };
      
      handleAuth();
    }
  }, [searchParams, loginUser, router, isProcessing]);

  return <Loader fullScreen />;
};

export default Page;
