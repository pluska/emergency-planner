import { Profile, FormInformation } from '../types/profile';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

export const getProfile = async (userId: number): Promise<Profile> => {
    try {
        const response = await fetch(`${API_BASE_URL}/profiles/${userId}`);
        if (!response.ok) {
            throw new Error('Failed to fetch profile');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching profile:', error);
        throw error;
    }
};

export const getFormInformation = async (userId: number): Promise<FormInformation> => {
    try {
        const response = await fetch(`${API_BASE_URL}/form-information/${userId}`);
        if (!response.ok) {
            throw new Error('Failed to fetch form information');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching form information:', error);
        throw error;
    }
};

export const updateProfile = async (userId: number, data: Partial<Profile>): Promise<Profile> => {
    try {
        const response = await fetch(`${API_BASE_URL}/profiles/${userId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        if (!response.ok) {
            throw new Error('Failed to update profile');
        }
        return await response.json();
    } catch (error) {
        console.error('Error updating profile:', error);
        throw error;
    }
};

export const updateFormInformation = async (userId: number, data: Partial<FormInformation>): Promise<FormInformation> => {
    try {
        const response = await fetch(`${API_BASE_URL}/form-information/${userId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        if (!response.ok) {
            throw new Error('Failed to update form information');
        }
        return await response.json();
    } catch (error) {
        console.error('Error updating form information:', error);
        throw error;
    }
}; 