import type { Course } from './course';

export type PageProps = {
    flash: {
        success?: string;
        error?: string;
    };
    course: Course;
};
