'use client'
import OfficePageDecorator from "@/app/office/_widgets/office-page-decorate"
import { CourseForm } from "@/lib/model/schema/office"
import { COURSE_SEGMENTS } from "@/lib/segments"
import CourseEditForm from "../_widgets/course-edit-form"
import { useRouter } from "next/navigation"
import { createCourse } from "@/lib/service/action/office-action"

export default function CourseCreatePage() {

    const router = useRouter()

    const onSubmit = async (form: CourseForm) => {
        const response = await createCourse(form)
        router.replace(`/office/courses/${response.id}/details`)
    }

    return (
        <OfficePageDecorator name="Create Course" segments={COURSE_SEGMENTS}>
            <CourseEditForm onSubmit={onSubmit} />
        </OfficePageDecorator>
    )
}