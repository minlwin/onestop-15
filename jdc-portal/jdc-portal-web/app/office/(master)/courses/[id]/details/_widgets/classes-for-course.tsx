'use client'

import DetailsTabContents from "@/components/app/details-tab-contents"
import PaginationComponent from "@/components/app/pagination"
import { TableHeader, TableRow, TableHead, TableBody, TableCell, Table } from "@/components/ui/table"
import { ClassItem } from "@/lib/model/dto/office"
import { safeCall } from "@/lib/safe-call"
import { searchClasses } from "@/lib/service/action/office-action"
import { Pager } from "@/lib/types"
import { useState, useEffect } from "react"

export default function ClassesForCourse({ courseId }: { courseId: any }) {
    const [classes, setClasses] = useState<ClassItem[]>([])
    const [pageInfo, setPageInfo] = useState<Pager>()

    useEffect(() => {
        const fetchClasses = async () => {
            await safeCall(async () => {
                const { list, ...pageInfo } = await searchClasses({ course: courseId })
                setClasses(list)
                setPageInfo(pageInfo)
            })
        }
        fetchClasses()
    }, [courseId])

    const onPageChange = async (page: number) => {
        if (courseId) {
            await safeCall(async () => {
                const { list, ...pageInfo } = await searchClasses({ course: courseId as string, page })
                setClasses(list)
                setPageInfo(pageInfo)
            })
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