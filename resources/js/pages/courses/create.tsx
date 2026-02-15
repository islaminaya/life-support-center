import { Form, Head } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import AppLayout from '@/layouts/admin-layout';
import courses from '@/routes/courses';
import {
    Field,
    FieldContent,
    FieldDescription,
    FieldLabel,
    FieldTitle,
} from '@/components/ui/field';

export default function Create() {
    return (
        <AppLayout>
            <Head title="Create a course" />
            <section className="p-4">
                <Form
                    action={courses.store().url}
                    method={courses.store().method}
                >
                    {({ errors }) => (
                        <>
                            <Field className="mb-5 max-w-sm">
                                <FieldLabel htmlFor="input-field-course-name">
                                    Course Name
                                </FieldLabel>
                                <Input
                                    id="input-field-course-name"
                                    type="text"
                                    name="name"
                                    placeholder="Enter the course Name"
                                    className={
                                        errors.name ? 'border-red-400' : ''
                                    }
                                />
                                {errors.name && (
                                    <span className="-mt-3 text-sm text-red-500">
                                        {errors.name}
                                    </span>
                                )}
                                <FieldDescription>
                                    A link for the image that will be displayed
                                    for candidates.
                                </FieldDescription>
                            </Field>
                            <Field className="mb-5 max-w-sm">
                                <FieldLabel htmlFor="input-field-image-url">
                                    Image URL
                                </FieldLabel>
                                <Input
                                    id="input-field-image-url"
                                    type="text"
                                    name="image_url"
                                    placeholder="Enter the image URL"
                                />
                                <FieldDescription>
                                    A link for the image that will be displayed
                                    for candidates.
                                </FieldDescription>
                            </Field>
                            <Field className="my-5 max-w-sm">
                                <FieldLabel htmlFor="input-field-course-visibility">
                                    Course Visibility
                                </FieldLabel>
                                {errors.visibility && (
                                    <span className="-mt-3 text-sm text-red-500">
                                        {errors.visibility}
                                    </span>
                                )}
                                <RadioGroup
                                    name="visibility"
                                    defaultValue="private"
                                    className="max-w-sm"
                                >
                                    <FieldLabel htmlFor="public-visibility">
                                        <Field orientation="horizontal">
                                            <FieldContent>
                                                <FieldTitle>Public</FieldTitle>
                                                <FieldDescription>
                                                    For all candidates inside
                                                    and outside Inaya.
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
                                                <FieldTitle>Private</FieldTitle>
                                                <FieldDescription>
                                                    For candidates inside Inaya
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
                            </Field>
                            <Button>Submit</Button>
                        </>
                    )}
                </Form>
            </section>
        </AppLayout>
    );
}
