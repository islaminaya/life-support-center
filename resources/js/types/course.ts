import type { User } from './auth';

export type Course = {
    id: number;
    name: string;
    image_url?: string;
    visibility: string;
    created_by?: User | null;
    updated_by?: User | null;
};
