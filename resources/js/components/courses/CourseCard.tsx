import { Link } from '@inertiajs/react';
import { Eye, Pencil } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardAction,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import courses from '@/routes/courses';
import type { Course } from '@/types';

export default function CourseCard({ course }: { course: Course }) {
    return (
        <Card className="relative mx-auto w-full max-w-lg pt-0">
            <div className="absolute inset-0 z-30 aspect-video" />
            <img
                src={course.image_url ?? 'images/logo.png'}
                alt={course.name}
                className="relative z-20 aspect-video w-full"
            />
            <CardHeader>
                <CardAction>
                    <Badge variant="secondary">{course.visibility}</Badge>
                </CardAction>
                <CardTitle>{course.name}</CardTitle>
            </CardHeader>
            <CardFooter className="flex w-full justify-between">
                <Link href={courses.show(course.id)}>
                    <Button className="cursor-pointer">
                        <Eye /> Show
                    </Button>
                </Link>
                <Link href={courses.edit(course.id)}>
                    <Button className="cursor-pointer">
                        <Pencil /> Edit
                    </Button>
                </Link>
            </CardFooter>
        </Card>
    );
}
