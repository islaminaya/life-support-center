import type { User } from './auth';

export type Course = {
    id: number;
    name: string;
    image_url?: string;
    visibility: string;
    created_by?: User | null;
    updated_by?: User | null;
    batches: Batch[];
};

export type Batch = {
    id: number;
    name: string;
    start_date: string;
    start_time: string;
    end_time: string;
    course_id: number;
    visibility: string;
    course: Course;
    users: User[];
};
