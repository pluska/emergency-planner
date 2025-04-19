import { EssentialInfo, CreateEssentialInfoRequest, UpdateEssentialInfoRequest } from '../types/essentialInfo';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

export const createEssentialInfo = async (data: CreateEssentialInfoRequest): Promise<EssentialInfo> => {
    try {
        const response = await fetch(`${API_BASE_URL}/essential-info`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        if (!response.ok) {
            throw new Error('Failed to create essential info');
        }
        return await response.json();
    } catch (error) {
        console.error('Error creating essential info:', error);
        throw error;
    }
};

export const getEssentialInfo = async (): Promise<EssentialInfo[]> => {
    try {
        const response = await fetch(`${API_BASE_URL}/essential-info`);
        if (!response.ok) {
            throw new Error('Failed to fetch essential info');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching essential info:', error);
        throw error;
    }
};

export const getEssentialInfoById = async (id: string): Promise<EssentialInfo> => {
    try {
        const response = await fetch(`${API_BASE_URL}/essential-info/${id}`);
        if (!response.ok) {
            throw new Error('Failed to fetch essential info by ID');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching essential info by ID:', error);
        throw error;
    }
};

export const updateEssentialInfo = async (id: string, data: UpdateEssentialInfoRequest): Promise<EssentialInfo> => {
    try {
        const response = await fetch(`${API_BASE_URL}/essential-info/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        if (!response.ok) {
            throw new Error('Failed to update essential info');
        }
        return await response.json();
    } catch (error) {
        console.error('Error updating essential info:', error);
        throw error;
    }
};

export const deleteEssentialInfo = async (id: string): Promise<void> => {
    try {
        const response = await fetch(`${API_BASE_URL}/essential-info/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error('Failed to delete essential info');
        }
    } catch (error) {
        console.error('Error deleting essential info:', error);
        throw error;
    }
}; 