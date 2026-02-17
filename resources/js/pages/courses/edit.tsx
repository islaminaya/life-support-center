import { Form, Head } from '@inertiajs/react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Field,
    FieldContent,
    FieldDescription,
    FieldLabel,
    FieldTitle,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import AppLayout from '@/layouts/admin-layout';
import courses from '@/routes/courses';
import type { Course } from '@/types';

export default function Show({ course }: { course: Course }) {
    return (
        <AppLayout>
            <Head title={course.name} />
            <div className="p-4">
                <h2 className="text-2xl font-bold">{course.name}</h2>
                <Badge variant="secondary">{course.visibility}</Badge>
            </div>
            <section className="p-4">
                <Form
                    action={courses.update(course.id).url}
                    method={courses.update(course.id).method}
                >
                    {({ errors }) => (
                        <>
                            {console.log(errors)}
                            <Field className="mb-5 max-w-sm">
                                <FieldLabel htmlFor="input-field-image-url">
                                    Image URL
                                </FieldLabel>
                                <Input
                                    id="input-field-image-url"
                                    type="text"
                                    name="image_url"
                                    defaultValue={course.image_url}
                                    placeholder="Enter the course Name"
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
                                    <div className="text-red-500">
                                        {errors.visibility}
                                    </div>
                                )}
                                <RadioGroup
                                    name="visibility"
                                    defaultValue={course.visibility}
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
