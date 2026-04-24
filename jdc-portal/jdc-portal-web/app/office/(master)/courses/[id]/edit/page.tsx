'use client'
import OfficePageDecorator from "@/app/office/_widgets/office-page-decorate"
import Loading from "@/components/app/loading"
import { CourseForm } from "@/lib/model/schema/office"
import { COURSE_SEGMENTS } from "@/lib/segments"
import { findCourseForEdit, updateCourse } from "@/lib/service/action/office-action"
import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import CourseEditForm from "../../_widgets/course-edit-form"
import { safeCall } from "@/lib/safe-call"

export default function CourseEditPage() {

    const { id } = useParams()

    const [course, setCourse] = useState<CourseForm>()

    useEffect(() => {
        const fetchCourse = async () => {
            if (id) {
                await safeCall(async () => {
                    const response = await findCourseForEdit(id as string)
                    setCourse(response)
                })
            }
        }
        fetchCourse()
    }, [id])

    const router = useRouter()

    const onSubmit = async (form: CourseForm) => {
        await safeCall(async () => {
            const response = await updateCourse(id as string, form)
            router.replace(`/office/courses/${response.id}/details`)            
        })
    }

    if (!course) {
        return <Loading />
    }

    return (
        <OfficePageDecorator name="Edit Course" segments={COURSE_SEGMENTS}>
            <CourseEditForm course={course} onSubmit={onSubmit} />
        </OfficePageDecorator>
    )
}