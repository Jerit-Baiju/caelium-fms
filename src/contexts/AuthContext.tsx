'use client';
import Loader from '@/components/layout/Loader';
import { User } from '@/helpers/props';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { useRouter } from 'next/navigation';
import { ReactNode, createContext, useEffect, useRef, useState } from 'react';

// Define a type for JWT token data
interface TokenData {
  exp: number;
  user_id: string;
  [key: string]: unknown;
}

interface AuthContextProps {
  tokenData?: TokenData | null
  authTokens: { access: string; refresh: string } | null;
  loginUser: (e: { access: string; refresh: string }) => Promise<void>;
  logoutUser: () => void;
  setTokenData: (e: TokenData | null) => void;
  setAuthTokens: (e: { access: string; refresh: string } | null) => void;
  user: User | null;
}

const AuthContext = createContext<AuthContextProps>({
  tokenData: null,
  authTokens: null,
  loginUser: async () => {},
  logoutUser: () => {},
  setTokenData: () => {},
  setAuthTokens: () => {},
  user: null,
});

export default AuthContext;
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [authTokens, setAuthTokens] = useState(() =>
    typeof window !== 'undefined' && localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens') || '{}') : null
  );

  const [tokenData, setTokenData] = useState<TokenData | null>(() =>
    typeof window !== 'undefined' && localStorage.getItem('authTokens') ? jwtDecode(localStorage.getItem('authTokens') || '{}') as TokenData : null
  );

  // Reference to track refresh timers
  const refreshTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Proactive token refresh
  const refreshToken = async () => {
    if (!authTokens?.refresh) return;
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_HOST}/api/auth/token/refresh/`, {
        refresh: authTokens.refresh,
      });
      const newTokens = {
        access: response.data.access,
        refresh: authTokens.refresh,
      };
      localStorage.setItem('authTokens', JSON.stringify(newTokens));
      setAuthTokens(newTokens);
      setTokenData(jwtDecode(response.data.access) as TokenData);
      scheduleTokenRefresh(response.data.access);
      return newTokens;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        logoutUser();
      }
      return null;
    }
  };

  // Schedule token refresh 5 minutes before expiry
  const scheduleTokenRefresh = (accessToken: string) => {
    if (refreshTimerRef.current) {
      clearTimeout(refreshTimerRef.current);
    }
    try {
      const decoded = jwtDecode(accessToken) as { exp: number };
      const expiryTime = decoded.exp * 1000;
      const timeUntilRefresh = expiryTime - Date.now() - 300000;
      if (timeUntilRefresh <= 0) {
        refreshToken();
        return;
      }
      refreshTimerRef.current = setTimeout(refreshToken, timeUntilRefresh);
    } catch (error) {
      console.error('Error scheduling token refresh:', error);
      logoutUser();
    }
  };

  useEffect(() => {
    if (loading || !authTokens) return;
    try {
      const decodedToken = tokenData;
      const isExpired = decodedToken && decodedToken.exp && decodedToken.exp * 1000 < Date.now();
      if (isExpired) {
        refreshToken();
        return;
      }
      scheduleTokenRefresh(authTokens.access);
    } catch (err) {
      console.error('Error decoding token:', err);
      logoutUser();
    }
    return () => {
      if (refreshTimerRef.current) {
        clearTimeout(refreshTimerRef.current);
      }
    };
  }, [tokenData, loading]);

  // Route protection
  useEffect(() => {
    if (loading) return;

    const path = window.location.pathname;
    const publicPaths = ['/welcome', '/privacy-policy', '/terms-and-conditions'];
    const isCallbackPath = path.startsWith('/api/auth/callback');
    const isPublicPath = publicPaths.includes(path) || isCallbackPath;

    // Redirect logic
    if (!tokenData && !isPublicPath) {
      router.replace(`${process.env.NEXT_PUBLIC_CAELIUM_HOST}/api/auth/callback/caelium-fms`);
    }
  }, [router, tokenData, loading]);

  useEffect(() => {
    const fetchMe = async () => {
      try {
        if (!authTokens?.access) return;

        const decodedToken = jwtDecode(authTokens.access) as { user_id: string };
        if (!decodedToken.user_id) return;

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/api/auth/accounts/${decodedToken.user_id}/`);

        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }

        const userData = await response.json();
        setUser(userData);
      } catch (error) {
        console.error('Error fetching user data:', error);
        logoutUser();
      }
    };

    if (authTokens) {
      fetchMe();
    }
  }, [authTokens]);

  const loginUser = async (data: { access: string; refresh: string }) => {
    localStorage.setItem('authTokens', JSON.stringify(data));
    setAuthTokens(data);
    setTokenData(jwtDecode(data?.access) as TokenData);
    scheduleTokenRefresh(data.access);
  };

  const logoutUser = () => {
    if (refreshTimerRef.current) {
      clearTimeout(refreshTimerRef.current);
    }
    setAuthTokens(null);
    setTokenData(null);
    setUser(null);
    localStorage.removeItem('authTokens');
    router.push('/');
  };

  useEffect(() => {
    if (authTokens?.access) {
      try {
        setTokenData(jwtDecode(authTokens.access) as TokenData);
      } catch (err) {
        console.error('Invalid token format:', err);
        logoutUser();
      }
    }
    setLoading(false);
  }, [authTokens]);

  const contextData: AuthContextProps = {
    tokenData,
    authTokens,
    loginUser,
    logoutUser,
    setTokenData,
    setAuthTokens,
    user,
  };

  return <AuthContext.Provider value={contextData}>{loading ? <Loader fullScreen /> : children}</AuthContext.Provider>;
};
