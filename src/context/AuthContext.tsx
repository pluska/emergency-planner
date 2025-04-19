import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AuthState, LoginCredentials, RegisterCredentials } from '../types/auth';
import Cookies from 'js-cookie';
import axios from 'axios';
import type { Profile } from '../types/profile';
import type { EssentialInfo } from '../types/essentialInfo';
import config from '../config/config';

interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (credentials: RegisterCredentials) => Promise<void>;
  logout: () => void;
  clearError: () => void;
  profile: Profile | null;
  essentialInfo: EssentialInfo | null;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<AuthState>({
    user: null,
    token: null,
    isAuthenticated: false,
    isLoading: true,
    error: null,
  });
  const [profile, setProfile] = useState<Profile | null>(null);
  const [essentialInfo, setEssentialInfo] = useState<EssentialInfo | null>(null);

  useEffect(() => {
    const token = Cookies.get('token');
    if (token) {
      validateToken(token);
    } else {
      setState(prev => ({ ...prev, isLoading: false }));
    }
  }, []);

  const validateToken = async (token: string) => {
    try {
      const response = await axios.get(`${config.apiUrl}/auth/validate`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setState({
        user: response.data.user,
        token,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });
    } catch {
      Cookies.remove('token');
      setState(prev => ({ ...prev, isLoading: false }));
    }
  };

  const login = async (credentials: LoginCredentials) => {
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }));
      const response = await axios.post(`${config.apiUrl}/auth/login`, credentials);
      const { token, user } = response.data;
      
      Cookies.set('token', token, { 
        secure: true, 
        sameSite: 'strict',
        expires: credentials.rememberMe ? 7 : undefined
      });
      
      setState({
        user,
        token,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Login failed';
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: errorMessage,
      }));
      throw error;
    }
  };

  const register = async (credentials: RegisterCredentials) => {
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }));
      const response = await axios.post(`${config.apiUrl}/auth/register`, credentials);
      const { token, user } = response.data;
      
      Cookies.set('token', token, { 
        secure: true, 
        sameSite: 'strict'
      });
      
      setState({
        user,
        token,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Registration failed';
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: errorMessage,
      }));
      throw error;
    }
  };

  const logout = () => {
    Cookies.remove('token');
    setState({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
    });
    setProfile(null);
    setEssentialInfo(null);
  };

  const clearError = () => {
    setState(prev => ({ ...prev, error: null }));
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        profile,
        essentialInfo,
        login,
        register,
        logout,
        clearError,
      }}
    >
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