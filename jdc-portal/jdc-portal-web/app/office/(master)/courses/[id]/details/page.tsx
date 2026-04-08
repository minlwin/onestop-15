'use client'

import OfficePageDecorator from "@/app/office/_widgets/office-page-decorate"
import Loading from "@/components/app/loading"
import NameInfo from "@/components/app/name-info"
import { ClassItem, CourseDetails } from "@/lib/model/dto/office"
import { COURSE_SEGMENTS } from "@/lib/segments"
import { findCourseDetails, searchClasses } from "@/lib/service/action/office-action"
import { Pager } from "@/lib/types"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import PaginationComponent from "@/components/app/pagination"
import { CourseContent } from "@/lib/model/dto/anonymous"
import HighlightInfo from "@/components/app/highlight-info"
import SubTitle from "@/components/app/sub-title"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Pencil } from "lucide-react"
import DetailsTabContents from "@/components/app/details-tab-contents"

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
            <div className="space-y-6">
                {/* Course Information */}
                <NameInfo name={course.name} subtitle={course.description} />

                {/* Tabs */}
                <Tabs defaultValue="information" className="space-y-4">
                    <TabsList>
                        <TabsTrigger value="information">Information</TabsTrigger>
                        <TabsTrigger value="contents">Contents</TabsTrigger>
                        <TabsTrigger value="classes">Classes</TabsTrigger>
                    </TabsList>

                    <TabsContent value="information" className="space-y-4">
                        <CourseInformation course={course} />
                    </TabsContent>

                    <TabsContent value="contents" className="space-y-4">
                        <ContentsForCourse contents={course.contents} />
                    </TabsContent>

                    <TabsContent value="classes" className="space-y-4">
                        <ClassesForCourse courseId={id as string} />
                    </TabsContent>
                </Tabs>
            </div>
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

            <div>
                <Button asChild>
                    <Link href={`/office/courses/${course.id}/edit`}>
                        <Pencil /> Edit Course
                    </Link>
                </Button>
            </div>
        </DetailsTabContents>
    )
}



function ContentsForCourse({ contents }: { contents: CourseContent[] }) {
    return (
        <DetailsTabContents title="Course Contents" subTitle="Details about this course">
            {contents.length > 0 ? (
                <div className="space-y-4">
                    {contents.map((content, index) => (
                        <div key={content.id} className="rounded-lg border p-4">
                            <div className="flex items-start gap-3">
                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-medium">
                                    {index + 1}
                                </div>
                                <div className="flex-1">
                                    <h4 className="font-medium">{content.name}</h4>
                                    <p className="text-sm text-muted-foreground mt-1">{content.description}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-muted-foreground">No contents available for this course.</p>
            )}
        </DetailsTabContents>
    )
}

function ClassesForCourse({ courseId }: { courseId: string }) {
    const [classes, setClasses] = useState<ClassItem[]>([])
    const [pageInfo, setPageInfo] = useState<Pager>()

    useEffect(() => {
        const fetchClasses = async () => {
            const { list, ...pageInfo } = await searchClasses({ course: courseId })
            setClasses(list)
            setPageInfo(pageInfo)
        }
        fetchClasses()
    }, [courseId])

    const onPageChange = async (page: number) => {
        if (courseId) {
            const { list, ...pageInfo } = await searchClasses({ course: courseId as string, page })
            setClasses(list)
            setPageInfo(pageInfo)
        }
    }

    return (
        <DetailsTabContents title="Classes" subTitle="Classes for this course">
            {classes.length > 0 ? (
                <>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Type</TableHead>
                                <TableHead>Start Date</TableHead>
                                <TableHead>Months</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {classes.map((classItem) => (
                                <TableRow key={classItem.id}>
                                    <TableCell>{classItem.type}</TableCell>
                                    <TableCell>{classItem.startDate}</TableCell>
                                    <TableCell>{classItem.months}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    {pageInfo && (
                        <div className="mt-4">
                            <PaginationComponent pager={pageInfo} onPageChange={onPageChange} />
                        </div>
                    )}
                </>
            ) : (
                <p className="text-muted-foreground">No classes available for this course.</p>
            )}
        </DetailsTabContents>
    )
}