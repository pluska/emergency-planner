import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { UserInterface } from '../types/User';
import type { Profile } from '../types/profile';
import type { EssentialInfo } from '../types/essentialInfo';
import { getProfile } from '../services/profile';
import { getEssentialInfoById } from '../services/essentialInfo';
import { getUserData, logout as authLogout } from '../services/auth';

interface AuthContextType {
  user: UserInterface | null;
  profile: Profile | null;
  essentialInfo: EssentialInfo | null;
  loading: boolean;
  error: string | null;
  login: (userData: UserInterface) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserInterface | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [essentialInfo, setEssentialInfo] = useState<EssentialInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Initialize user data from localStorage
  useEffect(() => {
    const initializeUser = async () => {
      try {
        const response = await getUserData();
        if (response.user) {
          setUser(response.user);
        }
      } catch (err) {
        console.error('Error initializing user:', err);
      } finally {
        setLoading(false);
      }
    };

    initializeUser();
  }, []);

  useEffect(() => {
    const fetchProfileData = async () => {
      if (!user) {
        setProfile(null);
        setEssentialInfo(null);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const [profileData, essentialInfoData] = await Promise.all([
          getProfile(user.id),
          getEssentialInfoById(user.id)
        ]);
        setProfile(profileData);
        setEssentialInfo(essentialInfoData);
        setError(null);
      } catch (err) {
        setError('Failed to load profile or essential info data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, [user]);

  const login = (userData: UserInterface) => {
    setUser(userData);
  };

  const logout = () => {
    authLogout();
    setUser(null);
    setProfile(null);
    setEssentialInfo(null);
  };

  const value = {
    user,
    profile,
    essentialInfo,
    loading,
    error,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 