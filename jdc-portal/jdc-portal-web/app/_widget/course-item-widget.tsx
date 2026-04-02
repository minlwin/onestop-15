import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CourseItem } from "@/lib/model/dto/anonymous";
import { div } from "framer-motion/client";
import { BookTextIcon } from "lucide-react";
import Link from "next/link";

export default function CourseItemWidget({data, className}: {data: CourseItem, className?: string}) {
    return (
        <Card className="flex flex-col gap-2">
            <CardContent>
                {data.image && <img src={data.image} alt={data.name} />}
                {data.image || 
                    <div className="flex items-center justify-center py-4">
                        <BookTextIcon className="size-24" />
                    </div>
                }
            </CardContent>

            <CardHeader className="h-full">
                <CardTitle>{data.name}</CardTitle>
                <CardDescription>{data.description}</CardDescription>
            </CardHeader>

            <CardFooter className="justify-between">
                <div>{data.hours} hours</div>
                <Link href={`/courses/${data.id}`}>
                    Show Details
                </Link>
            </CardFooter>
        </Card>
    )
}