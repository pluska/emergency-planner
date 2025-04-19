export interface Profile {
    id: string;
    user_id: string;
    first_name: string | null;
    last_name: string | null;
    email: string;
    phone_number: string | null;
    address: string | null;
    created_at: Date;
    updated_at: Date;
}

export interface FormInformation {
    id: string;
    user_id: string;
    age_range: '18-25' | '26-35' | '36-50' | '51-65' | '65+';
    dependents_count: number;
    living_situation: 'own-house' | 'rent-house' | 'apartment' | 'shared' | 'other';
    created_at: Date;
    updated_at: Date;
}

export interface CreateProfileRequest {
    user_id: string;
    first_name?: string;
    last_name?: string;
    email: string;
    phone_number?: string;
    address?: string;
}

export interface UpdateProfileRequest {
    first_name?: string;
    last_name?: string;
    email?: string;
    phone_number?: string;
    address?: string;
}

export interface CreateFormInformationRequest {
    user_id: string;
    age_range: '18-25' | '26-35' | '36-50' | '51-65' | '65+';
    dependents_count: number;
    living_situation: 'own-house' | 'rent-house' | 'apartment' | 'shared' | 'other';
}

export interface UpdateFormInformationRequest {
    age_range?: '18-25' | '26-35' | '36-50' | '51-65' | '65+';
    dependents_count?: number;
    living_situation?: 'own-house' | 'rent-house' | 'apartment' | 'shared' | 'other';
} 