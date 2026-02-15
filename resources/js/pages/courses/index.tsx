import { Head, Link, usePage } from '@inertiajs/react';
import { PlusCircle } from 'lucide-react';
import { useEffect } from 'react';
import Swal from 'sweetalert2';
import CourseCard from '@/components/courses/CourseCard';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/admin-layout';
import courses from '@/routes/courses';
import type { BreadcrumbItem, Course } from '@/types';
import type { PageProps } from '@/types/common';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Courses',
        href: courses.index().url,
    },
];

export default function Index({ courses }: { courses: { data: Course[] } }) {
    const { flash } = usePage<PageProps>().props;
    useEffect(() => {
        if (flash.success) {
            Swal.fire({
                position: 'center',
                icon: 'success',
                toast: true,
                title: flash.success,
                showConfirmButton: false,
                timer: 3000,
            });
        }
    }, [flash.success]);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Courses" />
            <div className="flex justify-end">
                <Link href="courses/create">
                    <Button
                        className="align-self-end mx-2 my-3"
                        variant="default"
                    >
                        <PlusCircle />
                        Add a course
                    </Button>
                </Link>
            </div>
            <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-2 lg:grid-cols-3">
                {courses.data.map((course) => {
                    return <CourseCard course={course} key={course.id} />;
                })}
            </div>
        </AppLayout>
    );
}
