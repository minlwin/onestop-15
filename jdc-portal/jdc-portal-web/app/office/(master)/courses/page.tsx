'use client'
import { CourseItem } from "@/lib/model/dto/anonymous";
import OfficePageDecorator from "../../_widgets/office-page-decorate";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { CourseSearch } from "@/lib/model/schema/office";
import { searchCourse } from "@/lib/service/action/office-action";
import FormsInput from "@/components/forms/forms-input";
import { Button } from "@/components/ui/button";
import { ArrowRight, Plus, Search } from "lucide-react";
import Link from "next/link";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { safeCall } from "@/lib/safe-call";

export default function CourseManagementPage() {

    const [courses, setCourses] = useState<CourseItem[]>([])
    const form = useForm<CourseSearch>({defaultValues : {
        keyword: ""
    }})

    useEffect(() => {
        const loadData = async () => {
            await safeCall(async () => {
                const courses = await searchCourse({})
                setCourses(courses)
            })
        }
        loadData()
    }, [])

    const onSearch = async (form:CourseSearch) => {
        await safeCall(async () => {
            const courses = await searchCourse(form)
            setCourses(courses)
        })
    }

    return (
        <OfficePageDecorator name="Course Management">
            <form onSubmit={form.handleSubmit(onSearch)} className="flex gap-4 items-end">
                <div className="w-1/4">
                    <FormsInput control={form.control} name="keyword" label="Keyword" />
                </div>
                <div className="space-x-2">
                    <Button type="submit">
                        <Search /> Search
                    </Button>

                    <Button variant={'destructive'} asChild>
                        <Link href={'/office/courses/create'}>
                            <Plus /> Add New
                        </Link>
                    </Button>
                </div>
            </form>

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Level</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Hours</TableHead>
                        <TableHead></TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                {courses.map((course) => (
                    <TableRow key={course.id}>
                        <TableCell>{course.name}</TableCell>
                        <TableCell>{course.level}</TableCell>
                        <TableCell>{course.description}</TableCell>
                        <TableCell>{course.hours}</TableCell>
                        <TableCell>
                            <Link href={`/office/courses/${course.id}/details`}>
                                <ArrowRight className="size-4" />
                            </Link>
                        </TableCell>
                    </TableRow>
                ))}    
                </TableBody>    
            </Table>
        </OfficePageDecorator>
    )
}