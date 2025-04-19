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
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (token: string, password: string) => Promise<void>;
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
      try {
        const healthResponse = await axios.get(`${config.apiUrl}/health`);
        console.log('Server health check:', healthResponse.data);
      } catch (healthError) {
        console.error('Server health check failed:', healthError);
        throw new Error('Server is not responding. Please check if the backend server is running.');
      }

      const response = await axios.post(`${config.apiUrl}/auth/login`, credentials, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });
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
      let errorMessage = 'Login failed';
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          errorMessage = 'Invalid email or password';
        } else {
          errorMessage = error.response?.data?.message || error.message;
        }
        console.error('Login error details:', {
          status: error.response?.status,
          data: error.response?.data,
          message: error.message
        });
      }
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

  const forgotPassword = async (email: string) => {
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }));
      await axios.post(`${config.apiUrl}/auth/forgot-password`, { email }, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });
    } catch (error: unknown) {
      let errorMessage = 'Failed to process password reset request';
      if (axios.isAxiosError(error)) {
        errorMessage = error.response?.data?.message || error.message;
        console.error('Forgot password error details:', {
          status: error.response?.status,
          data: error.response?.data,
          message: error.message
        });
      }
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: errorMessage,
      }));
      throw error;
    } finally {
      setState(prev => ({ ...prev, isLoading: false }));
    }
  };

  const resetPassword = async (token: string, password: string) => {
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }));
      await axios.post(`${config.apiUrl}/auth/reset-password`, { token, password }, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });
      
      // Clear any existing error on success
      setState(prev => ({ ...prev, error: null }));
    } catch (error: unknown) {
      let errorMessage = 'Failed to reset password';
      
      if (axios.isAxiosError(error)) {
        // Handle different types of errors
        if (error.response) {
          // Server responded with an error
          const status = error.response.status;
          const data = error.response.data;
          
          if (status === 400) {
            errorMessage = data.message || 'Invalid request. Please check your input.';
          } else if (status === 401) {
            errorMessage = data.message || 'Invalid or expired reset token.';
          } else if (status === 500) {
            errorMessage = data.message || 'Server error. Please try again later.';
          } else {
            errorMessage = data.message || `Error: ${status}`;
          }
        } else if (error.request) {
          // Request was made but no response received
          errorMessage = 'No response from server. Please check your connection.';
        } else {
          // Something else happened
          errorMessage = error.message || 'An unexpected error occurred.';
        }
        
        console.error('Reset password error details:', {
          status: error.response?.status,
          data: error.response?.data,
          message: error.message
        });
      }
      
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: errorMessage,
      }));
      throw error;
    } finally {
      setState(prev => ({ ...prev, isLoading: false }));
    }
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
        forgotPassword,
        resetPassword,
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