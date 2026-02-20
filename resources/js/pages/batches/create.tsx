import { Form, Head, usePage } from '@inertiajs/react';
import { CalendarIcon } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
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
import AppLayout from '@/layouts/admin-layout';
import batches from '@/routes/batches';
import type { PageProps } from '@/types/common';

export default function Create() {
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
    const [date, setDate] = useState<Date | undefined>(new Date());
    const [month, setMonth] = useState<Date | undefined>(date);
    const [value, setValue] = useState(formatDate(date));
    const { course } = usePage<PageProps>().props;

    return (
        <AppLayout>
            <Head title="Create a batch" />
            <section className="p-4">
                <Form
                    action={batches.store(course.id).url}
                    method={batches.store(course.id).method}
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
                            <div className="flex max-w-md items-center gap-2">
                                <div className="grid flex-1 gap-2">
                                    <FieldGroup>
                                        <Field className="mx-auto">
                                            <FieldLabel htmlFor="batch-date">
                                                Batch Date
                                            </FieldLabel>
                                            <InputGroup className="-ms-1 -mt-2">
                                                <InputGroupInput
                                                    id="batch-date"
                                                    value={value}
                                                    placeholder="June 01, 2025"
                                                    onChange={(e) => {
                                                        const date = new Date(
                                                            e.target.value,
                                                        );
                                                        setValue(
                                                            e.target.value,
                                                        );
                                                        if (isValidDate(date)) {
                                                            setDate(date);
                                                            setMonth(date);
                                                        }
                                                    }}
                                                    onKeyDown={(e) => {
                                                        if (
                                                            e.key ===
                                                            'ArrowDown'
                                                        ) {
                                                            e.preventDefault();
                                                            setOpen(true);
                                                        }
                                                    }}
                                                />
                                                <InputGroupAddon align="inline-end">
                                                    <Popover
                                                        open={open}
                                                        onOpenChange={setOpen}
                                                    >
                                                        <PopoverTrigger asChild>
                                                            <InputGroupButton
                                                                id="date-picker"
                                                                variant="ghost"
                                                                size="icon-xs"
                                                                aria-label="Select date"
                                                            >
                                                                <CalendarIcon />
                                                                <span className="sr-only">
                                                                    Select date
                                                                </span>
                                                            </InputGroupButton>
                                                        </PopoverTrigger>
                                                        <PopoverContent
                                                            className="w-auto overflow-hidden p-0"
                                                            align="end"
                                                            alignOffset={-8}
                                                            sideOffset={10}
                                                        >
                                                            <Calendar
                                                                mode="single"
                                                                selected={date}
                                                                month={month}
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
                                                            For all candidates
                                                            inside and outside
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
                                                            For candidates
                                                            inside Inaya Only.
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
                            <Button className="mt-5">Create</Button>
                        </>
                    )}
                </Form>
            </section>
        </AppLayout>
    );
}
