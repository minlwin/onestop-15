'use client'

import HighlightInfo from "@/components/app/highlight-info"
import Loading from "@/components/app/loading"
import { Button } from "@/components/ui/button"
import { ClassInfo, CourseContent, CourseDetails } from "@/lib/model/dto/anonymous"
import { findCourseAction } from "@/lib/service/action/anonymous-action"
import { Edit, Pen, Pencil } from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"

export default function CourseDetailsPage() {

    const { id } = useParams()
    const [course, setCourse] = useState<CourseDetails>()

    useEffect(() => {
        const fetchCourse = async () => {
            const response = await findCourseAction(id)
            setCourse(response)
        }
        fetchCourse()
    }, [id])

    if (!course) {
        return <Loading />
    }

    return (
        <div className="px-4 md:px-12 py-8 max-w-6xl mx-auto space-y-10">
            {/* Course Info */}
            <CourseHeader course={course} />

            {/* Course Content */}
            <section className="space-y-4">
                <h2 className="text-2xl font-semibold">Course Contents</h2>

                <div className="grid md:grid-cols-2 gap-4">
                    {course.contents.map((content) => (
                        <ContentInfoItem key={content.id} content={content} />
                    ))}
                </div>
            </section>

            {/* Class List */}
            <section className="space-y-4">
                <h2 className="text-2xl font-semibold">Available Classes</h2>

                <div className="grid gap-6">
                    {course.classes.map((cls) => (
                        <ClassInfoItem key={cls.id} cls={cls} />
                    ))}
                </div>
            </section>
        </div>
    )
}

function ClassInfoItem({ cls }: { cls: ClassInfo }) {
    return (
        <div className="border rounded-2xl p-6 shadow-sm hover:shadow-md transition space-y-4">
            <div className="flex justify-between items-center">
                <span className="px-3 py-1 text-sm bg-blue-100 text-blue-600 rounded-full">
                    {cls.type}
                </span>
                <span className="text-sm text-gray-500">
                    Start: {cls.startDate}
                </span>
            </div>

            <div className="grid md:grid-cols-3 gap-4 text-sm">
                <div>
                    <p className="text-gray-500">Days</p>
                    <p className="font-medium">{cls.days}</p>
                </div>
                <div>
                    <p className="text-gray-500">Time</p>
                    <p className="font-medium">{cls.time}</p>
                </div>
                <div>
                    <p className="text-gray-500">Duration</p>
                    <p className="font-medium">{cls.months} months</p>
                </div>
            </div>

            <div className="flex flex-col md:flex-row md:justify-between gap-2 border-t pt-4">
                <p>
                    Registration Fee:{" "}
                    <span className="font-semibold text-green-600">
                        {cls.registrationFee.toLocaleString()} MMK
                    </span>
                </p>
                <p>
                    Monthly Fee:{" "}
                    <span className="font-semibold text-green-600">
                        {cls.monthlyFee.toLocaleString()} MMK
                    </span>
                </p>
            </div>

            <Button asChild>
                <Link href={`/registration?classId=${cls.id}`}>
                    <Edit />
                    Enroll Now
                </Link>
            </Button>
        </div>
    )
}

function ContentInfoItem({ content }: { content: CourseContent }) {
    return (
        <div className="border rounded-xl p-4 shadow-sm hover:shadow-md transition" >
            <h3 className="font-semibold text-lg">
                {content.id}. {content.name}
            </h3>
            <p className="text-gray-600 text-sm mt-1">
                {content.description}
            </p>
        </div>
    )
}

function CourseHeader({ course }: { course: CourseDetails }) {
    return (
        <section className="bg-white shadow rounded-2xl p-6 space-y-4">
            <h1 className="text-3xl font-bold">{course.name}</h1>
            <p className="text-gray-600">{course.description}</p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                <HighlightInfo label="Level" value={course.level || ''} />
                <HighlightInfo label="Hours" value={`${course.hours} hrs`} />
            </div>
        </section>
    )
}