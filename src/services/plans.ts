import config from '../config/config';
import { PlansResponseInterface } from '../types/Response';

const getAuthHeaders = () => {
  const token = config.auth.getToken();
  if (!token) {
    throw new Error('Authentication required');
  }
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  };
};

export const fetchPlansBegin = async (): Promise<PlansResponseInterface> => {
  try {
    const response = await fetch(`${config.apiUrl}/plans/begin`, {
      method: 'GET',
      headers: getAuthHeaders()
    });

    if (!response.ok) {
      throw new Error('Failed to fetch plans begin');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching plans begin:', error);
    throw error;
  }
};

export const fetchPlanSteps = async (planType: string): Promise<PlansResponseInterface> => {
  try {
    const response = await fetch(`${config.apiUrl}/api/plans/${planType}/steps`, {
      method: 'GET',
      headers: getAuthHeaders()
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch steps for plan type: ${planType}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching steps for plan type ${planType}:`, error);
    throw error;
  }
};
