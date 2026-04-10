'use client'

import OfficePageDecorator from "@/app/office/_widgets/office-page-decorate"
import Loading from "@/components/app/loading"
import { CourseDetails } from "@/lib/model/dto/office"
import { COURSE_SEGMENTS } from "@/lib/segments"
import { findCourseDetails } from "@/lib/service/action/office-action"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import HighlightInfo from "@/components/app/highlight-info"
import SubTitle from "@/components/app/sub-title"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Pencil } from "lucide-react"
import DetailsTabContents from "@/components/app/details-tab-contents"
import ClassesForCourse from "./_widgets/classes-for-course"
import ContentsForCourse from "./_widgets/contents-for-courses"
import DetailsHeader from "@/components/app/details-header"

export default function CourseDetailsPage() {

    const { id } = useParams()
    const [course, setCourse] = useState<CourseDetails>()

    useEffect(() => {
        const fetchCourse = async () => {
            if (id) {
                const response = await findCourseDetails(id as string)
                setCourse(response)
            }
        }
        fetchCourse()
    }, [id])


    if (!course) {
        return <Loading />
    }

    return (
        <OfficePageDecorator name="Course Details" segments={COURSE_SEGMENTS}>
            {/* Course Information */}
            <DetailsHeader title={course.name} subTitle={course.description}>
                <Button asChild>
                    <Link href={`/office/courses/${course.id}/edit`}>
                        <Pencil /> Edit Course
                    </Link>
                </Button>
            </DetailsHeader>

            {/* Tabs */}
            <Tabs defaultValue="information" className="space-y-2">
                <TabsList>
                    <TabsTrigger value="information">Information</TabsTrigger>
                    <TabsTrigger value="contents">Contents</TabsTrigger>
                    <TabsTrigger value="classes">Classes</TabsTrigger>
                </TabsList>

                <TabsContent value="information">
                    <CourseInformation course={course} />
                </TabsContent>

                <TabsContent value="contents">
                    <ContentsForCourse contents={course.contents} />
                </TabsContent>

                <TabsContent value="classes">
                    <ClassesForCourse courseId={id} />
                </TabsContent>
            </Tabs>
        </OfficePageDecorator>
    )
}

function CourseInformation({ course }: { course: CourseDetails }) {
    return (
        <DetailsTabContents title="Course Information" subTitle="Details about this course">
            <div className="grid md:grid-cols-4 gap-4">
                <HighlightInfo label="Level" value={course.level || ''} />
                <HighlightInfo label="Hours" value={`${course.hours} hrs`} />
            </div>

            <div className="space-y-3">
                <SubTitle title="Audit Information" />
                <div className="grid md:grid-cols-4 gap-4">
                    <HighlightInfo label="Created At" value={course.createdAt} />
                    <HighlightInfo label="Created By" value={course.createdBy} />
                    <HighlightInfo label="Modified At" value={course.modifiedAt} />
                    <HighlightInfo label="Modified By" value={course.modifiedBy} />
                </div>
            </div>
        </DetailsTabContents>
    )
}
