import { Head, Link, usePage } from '@inertiajs/react';
import { Eye, FolderUp, PlusCircle } from 'lucide-react';
import moment from 'moment';
import { useEffect } from 'react';
import Swal from 'sweetalert2';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Empty,
    EmptyContent,
    EmptyDescription,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle,
} from '@/components/ui/empty';

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import AppLayout from '@/layouts/admin-layout';
import batches from '@/routes/batches';
import courses from '@/routes/courses';
import type { BreadcrumbItem, Course } from '@/types';
import type { PageProps } from '@/types/common';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Courses',
        href: courses.index().url,
    },
    {
        title: 'Courses',
        href: courses.index().url,
    },
];

export default function Show({ course }: { course: Course }) {
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
            <Head title={course.name} />
            <div className="flex items-center justify-between p-4">
                <div>
                    <h2 className="text-2xl font-bold">{course.name}</h2>
                    <Badge variant="secondary">{course.visibility}</Badge>
                </div>
                {course.batches.length > 0 && (
                    <div>
                        <Link href={batches.create(course).url}>
                            <Button
                                className="align-self-end mx-2 my-3"
                                variant="default"
                            >
                                <PlusCircle />
                                Add a batch
                            </Button>
                        </Link>
                    </div>
                )}
            </div>
            <div className="p-4">
                {course.batches.length === 0 && (
                    <section className="mx-auto">
                        <Empty>
                            <EmptyHeader>
                                <EmptyMedia variant="icon">
                                    <FolderUp />
                                </EmptyMedia>
                                <EmptyTitle>No Batches Yet</EmptyTitle>
                                <EmptyDescription>
                                    You haven&apos;t created any batches yet.
                                    Get started by creating your first batch.
                                </EmptyDescription>
                            </EmptyHeader>
                            <EmptyContent className="flex-row justify-center gap-2">
                                <Link href={batches.create(course.id).url}>
                                    <Button
                                        className="align-self-end mx-2 my-3"
                                        variant="default"
                                    >
                                        <PlusCircle />
                                        Add a batch
                                    </Button>
                                </Link>
                            </EmptyContent>
                        </Empty>
                    </section>
                )}

                {course.batches.length > 0 && (
                    <section className="mx-auto p-4">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>ID</TableHead>
                                    <TableHead>Start Date</TableHead>
                                    <TableHead>Start Time</TableHead>
                                    <TableHead>End Time</TableHead>
                                    <TableHead>Visibility</TableHead>
                                    <TableHead className="text-right">
                                        Actions
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {course.batches.map((batch) => {
                                    return (
                                        <TableRow key={batch.name}>
                                            <TableCell className="font-medium">
                                                {batch.id}
                                            </TableCell>
                                            <TableCell>
                                                {moment(
                                                    batch.start_date,
                                                ).format('DD MMM YYYY')}
                                            </TableCell>
                                            <TableCell>
                                                {moment(
                                                    batch.start_date +
                                                        ' ' +
                                                        batch.start_time,
                                                ).format('h:mm:ss a')}
                                            </TableCell>
                                            <TableCell>
                                                {moment(
                                                    batch.start_date +
                                                        ' ' +
                                                        batch.end_time,
                                                ).format('h:mm:ss a')}
                                            </TableCell>
                                            <TableCell>
                                                <Badge variant="secondary">
                                                    {batch.visibility}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <Link
                                                    href={
                                                        batches.show(batch).url
                                                    }
                                                >
                                                    <Button className="cursor-pointer">
                                                        <Eye /> Show
                                                    </Button>
                                                </Link>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </section>
                )}
            </div>
        </AppLayout>
    );
}
