import { RegisterData, LoginData, AuthResponse } from '../types/Authentication';
import config from '../config/config';

const handleResponse = async (response: Response): Promise<AuthResponse> => {
  let result;
  try {
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      result = await response.json();
    } else {
      const text = await response.text();
      throw new Error(`Server returned non-JSON response: ${text}`);
    }
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to parse response: ${error.message}`);
    }
    throw error;
  }

  if (!response.ok) {
    throw new Error(result.message || `Request failed with status ${response.status}`);
  }

  return result;
};

const fetchWithAuth = async (url: string, options: RequestInit = {}): Promise<Response> => {
  const defaultOptions: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    mode: 'cors',
    credentials: 'same-origin'
  };

  const token = config.auth.getToken();
  if (token) {
    defaultOptions.headers = {
      ...defaultOptions.headers,
      'Authorization': `Bearer ${token}`
    };
  }

  const mergedOptions = {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...options.headers
    }
  };

  return fetch(url, mergedOptions);
};

export const register = async (data: RegisterData): Promise<AuthResponse> => {
  try {
    const requestBody = {
      email: data.email,
      password: data.password,
      name: data.name
    };
    
    const response = await fetchWithAuth(`${config.apiUrl}/auth/register`, {
      method: 'POST',
      body: JSON.stringify(requestBody)
    });
    
    const result = await handleResponse(response);

    if (result.token) {
      config.auth.setToken(result.token);
    } else {
      console.log('No token received in registration response');
    }

    return result;
  } catch (error) {
    console.error('Registration error:', error);
    throw error;
  }
};

export const login = async (data: LoginData): Promise<AuthResponse> => {
  try {
    const requestBody = {
      email: data.email,
      password: data.password
    };
    
    const response = await fetchWithAuth(`${config.apiUrl}/auth/login`, {
      method: 'POST',
      body: JSON.stringify(requestBody)
    });
    
    const result = await handleResponse(response);

    if (result.token) {
      config.auth.setToken(result.token);
    } else {
      console.log('No token received in login response');
    }

    return result;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};
export const getUserData = async () => {
  const response = await fetchWithAuth(`${config.apiUrl}/auth/me`);
  return await handleResponse(response);
};
export const logout = (): void => {
  config.auth.removeToken();
};

export const isAuthenticated = (): boolean => {
  const hasToken = config.auth.isAuthenticated();
  return hasToken;
}; 