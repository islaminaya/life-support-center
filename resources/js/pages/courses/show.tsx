import { Head } from '@inertiajs/react';
import { Badge } from '@/components/ui/badge';
import AppLayout from '@/layouts/admin-layout';
import type { Course } from '@/types';

export default function Show({ course }: { course: Course }) {
    return (
        <AppLayout>
            <Head title={course.name} />
            <div className="p-4">
                <h2 className="text-2xl font-bold">{course.name}</h2>
                <Badge variant="secondary">{course.visibility}</Badge>
            </div>
        </AppLayout>
    );
}
