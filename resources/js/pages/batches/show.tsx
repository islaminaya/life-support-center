import { Head } from '@inertiajs/react';
import { FolderUp } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

import {
    Empty,
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
import courses from '@/routes/courses';
import type { Batch, BreadcrumbItem } from '@/types';

export default function Show({ batch }: { batch: Batch }) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Courses',
            href: courses.index().url,
        },
        {
            title: batch.course.name,
            href: courses.show(batch.course.id).url,
        },
        {
            title: 'batches',
            href: '#',
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={batch.course.name} />
            <section>
                <div>
                    <h2 className="text-2xl font-bold">{batch.id}</h2>
                    <Badge variant="secondary">{batch.visibility}</Badge>
                </div>
            </section>

            <section className="mt-5">
                <div className="flex flex-col gap-6 rounded-xl border bg-card p-4 text-card-foreground shadow-sm">
                    <div className="flex flex-col justify-between md:flex-row">
                        <div className="flex flex-1">
                            <p className="w-20 font-bold">Course: </p>
                            <p>{batch.course.name}</p>
                        </div>
                        <div className="flex flex-1">
                            <p className="w-20 font-bold">Date: </p>
                            <p>{batch.start_date}</p>
                        </div>
                    </div>
                    <div className="flex flex-col justify-between md:flex-row">
                        <div className="flex flex-1">
                            <p className="w-20 font-bold">From: </p>
                            <p>{batch.start_time}</p>
                        </div>
                        <div className="flex flex-1">
                            <p className="w-20 font-bold">To: </p>
                            <p>{batch.end_time}</p>
                        </div>
                    </div>
                </div>
            </section>

            {batch.users.length === 0 ? (
                <section className="mx-auto">
                    <Empty>
                        <EmptyHeader>
                            <EmptyMedia variant="icon">
                                <FolderUp />
                            </EmptyMedia>
                            <EmptyTitle>No Candidates Yet</EmptyTitle>
                            <EmptyDescription>
                                No Candidates for this batch yet.
                            </EmptyDescription>
                        </EmptyHeader>
                    </Empty>
                </section>
            ) : (
                <section className="mx-auto p-4">
                    <h2 className="mb-5 font-black underline">
                        Registered Candidates
                    </h2>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Email</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {batch.users.map((user) => {
                                return (
                                    <TableRow>
                                        <TableCell>{user.name}</TableCell>
                                        <TableCell>{user.email}</TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </section>
            )}
        </AppLayout>
    );
}
