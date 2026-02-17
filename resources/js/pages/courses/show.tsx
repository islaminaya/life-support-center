import { Form, Head, Link, usePage } from '@inertiajs/react';
import { CalendarIcon, FolderUp, PlusCircle } from 'lucide-react';
import moment from 'moment';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import {
    Empty,
    EmptyContent,
    EmptyDescription,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle,
} from '@/components/ui/empty';

import {
    Field,
    FieldContent,
    FieldDescription,
    FieldGroup,
    FieldLabel,
    FieldTitle,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import {
    InputGroup,
    InputGroupAddon,
    InputGroupButton,
    InputGroupInput,
} from '@/components/ui/input-group';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
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
import type { Course } from '@/types';
import type { PageProps } from '@/types/common';
export default function Show({ course }: { course: Course }) {
    function formatDate(date: Date | undefined) {
        if (!date) {
            return '';
        }
        return date.toLocaleDateString('en-US', {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
        });
    }
    function isValidDate(date: Date | undefined) {
        if (!date) {
            return false;
        }
        return !isNaN(date.getTime());
    }

    function formatIsoDate(date: Date | undefined): string {
        if (!date) return '';

        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');

        return `${year}-${month}-${day}`;
    }
    const [open, setOpen] = useState(false);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [date, setDate] = useState<Date | undefined>(new Date());
    const [month, setMonth] = useState<Date | undefined>(date);
    const [value, setValue] = useState(formatDate(date));

    const handleSucess = () => {
        setDialogOpen(false);
    };

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
        <AppLayout>
            <Head title={course.name} />
            <div className="flex items-center justify-between p-4">
                <div>
                    <h2 className="text-2xl font-bold">{course.name}</h2>
                    <Badge variant="secondary">{course.visibility}</Badge>
                </div>
                {course.batches.length > 0 && (
                    <div>
                        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                            <DialogTrigger asChild>
                                <Button
                                    className="align-self-end mx-2 my-3"
                                    variant="default"
                                >
                                    <PlusCircle />
                                    Add a batch
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-md">
                                <DialogHeader>
                                    <DialogTitle>Add a batch</DialogTitle>
                                    <DialogDescription>
                                        You can add a batch to this course.
                                    </DialogDescription>
                                </DialogHeader>
                                <Form
                                    action={
                                        courses.batches.store(course.id).url
                                    }
                                    method={
                                        courses.batches.store(course.id).method
                                    }
                                    onSuccess={handleSucess}
                                >
                                    {() => (
                                        <>
                                            <input
                                                type="hidden"
                                                name="start_date"
                                                value={formatIsoDate(date)}
                                            />
                                            <input
                                                type="hidden"
                                                name="course_id"
                                                value={course.id}
                                            />
                                            <div className="flex items-center gap-2">
                                                <div className="grid flex-1 gap-2">
                                                    <FieldGroup>
                                                        <Field className="mx-auto">
                                                            <FieldLabel htmlFor="batch-date">
                                                                Batch Date
                                                            </FieldLabel>
                                                            <InputGroup className="-ms-1 -mt-2">
                                                                <InputGroupInput
                                                                    id="batch-date"
                                                                    value={
                                                                        value
                                                                    }
                                                                    placeholder="June 01, 2025"
                                                                    onChange={(
                                                                        e,
                                                                    ) => {
                                                                        const date =
                                                                            new Date(
                                                                                e
                                                                                    .target
                                                                                    .value,
                                                                            );
                                                                        setValue(
                                                                            e
                                                                                .target
                                                                                .value,
                                                                        );
                                                                        if (
                                                                            isValidDate(
                                                                                date,
                                                                            )
                                                                        ) {
                                                                            setDate(
                                                                                date,
                                                                            );
                                                                            setMonth(
                                                                                date,
                                                                            );
                                                                        }
                                                                    }}
                                                                    onKeyDown={(
                                                                        e,
                                                                    ) => {
                                                                        if (
                                                                            e.key ===
                                                                            'ArrowDown'
                                                                        ) {
                                                                            e.preventDefault();
                                                                            setOpen(
                                                                                true,
                                                                            );
                                                                        }
                                                                    }}
                                                                />
                                                                <InputGroupAddon align="inline-end">
                                                                    <Popover
                                                                        open={
                                                                            open
                                                                        }
                                                                        onOpenChange={
                                                                            setOpen
                                                                        }
                                                                    >
                                                                        <PopoverTrigger
                                                                            asChild
                                                                        >
                                                                            <InputGroupButton
                                                                                id="date-picker"
                                                                                variant="ghost"
                                                                                size="icon-xs"
                                                                                aria-label="Select date"
                                                                            >
                                                                                <CalendarIcon />
                                                                                <span className="sr-only">
                                                                                    Select
                                                                                    date
                                                                                </span>
                                                                            </InputGroupButton>
                                                                        </PopoverTrigger>
                                                                        <PopoverContent
                                                                            className="w-auto overflow-hidden p-0"
                                                                            align="end"
                                                                            alignOffset={
                                                                                -8
                                                                            }
                                                                            sideOffset={
                                                                                10
                                                                            }
                                                                        >
                                                                            <Calendar
                                                                                mode="single"
                                                                                selected={
                                                                                    date
                                                                                }
                                                                                month={
                                                                                    month
                                                                                }
                                                                                onMonthChange={
                                                                                    setMonth
                                                                                }
                                                                                onSelect={(
                                                                                    date,
                                                                                ) => {
                                                                                    setDate(
                                                                                        date,
                                                                                    );
                                                                                    setValue(
                                                                                        formatDate(
                                                                                            date,
                                                                                        ),
                                                                                    );
                                                                                    setOpen(
                                                                                        false,
                                                                                    );
                                                                                }}
                                                                            />
                                                                        </PopoverContent>
                                                                    </Popover>
                                                                </InputGroupAddon>
                                                            </InputGroup>
                                                        </Field>
                                                        <div className="flex justify-between">
                                                            <Field className="w-32">
                                                                <FieldLabel htmlFor="start_time">
                                                                    Start Time
                                                                </FieldLabel>
                                                                <Input
                                                                    type="time"
                                                                    id="start_time"
                                                                    name="start_time"
                                                                    step="1"
                                                                    defaultValue="10:00:00"
                                                                    className="-mt-2 appearance-none bg-background [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                                                                />
                                                            </Field>
                                                            <Field className="w-32">
                                                                <FieldLabel htmlFor="end_time">
                                                                    End Time
                                                                </FieldLabel>
                                                                <Input
                                                                    type="time"
                                                                    id="end_time"
                                                                    name="end_time"
                                                                    step="1"
                                                                    defaultValue="14:00:00"
                                                                    className="-ms-2 -mt-2 appearance-none bg-background [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                                                                />
                                                            </Field>
                                                        </div>
                                                        <FieldLabel className="-mb-5">
                                                            Batch Visibility
                                                        </FieldLabel>
                                                        <RadioGroup
                                                            name="visibility"
                                                            defaultValue="private"
                                                            className="max-w-sm"
                                                        >
                                                            <FieldLabel htmlFor="public-visibility">
                                                                <Field orientation="horizontal">
                                                                    <FieldContent>
                                                                        <FieldTitle>
                                                                            Public
                                                                        </FieldTitle>
                                                                        <FieldDescription>
                                                                            For
                                                                            all
                                                                            candidates
                                                                            inside
                                                                            and
                                                                            outside
                                                                            Inaya.
                                                                        </FieldDescription>
                                                                    </FieldContent>
                                                                    <RadioGroupItem
                                                                        value="public"
                                                                        id="public-visibility"
                                                                    />
                                                                </Field>
                                                            </FieldLabel>
                                                            <FieldLabel htmlFor="private-visibility">
                                                                <Field orientation="horizontal">
                                                                    <FieldContent>
                                                                        <FieldTitle>
                                                                            Private
                                                                        </FieldTitle>
                                                                        <FieldDescription>
                                                                            For
                                                                            candidates
                                                                            inside
                                                                            Inaya
                                                                            Only.
                                                                        </FieldDescription>
                                                                    </FieldContent>
                                                                    <RadioGroupItem
                                                                        value="private"
                                                                        id="private-visibility"
                                                                    />
                                                                </Field>
                                                            </FieldLabel>
                                                        </RadioGroup>
                                                    </FieldGroup>
                                                </div>
                                            </div>
                                            <DialogFooter className="mt-5 sm:justify-end">
                                                <Button>Create</Button>
                                            </DialogFooter>
                                        </>
                                    )}
                                </Form>
                            </DialogContent>
                        </Dialog>
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
                                <Link href="courses/create">
                                    <Button
                                        className="align-self-end mx-2 my-3"
                                        variant="default"
                                    >
                                        <PlusCircle />
                                        Add a course
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
                                        Applicants
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {course.batches.map((batch) => {
                                    return (
                                        <TableRow key={batch.name}>
                                            <TableCell className="font-medium">
                                                {batch.name}
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
                                                {5}
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
