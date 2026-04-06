'use client'

import SubTitle from "@/components/app/sub-title"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { AttendanceItem } from "@/lib/model/dto/students"
import { featchAttendanceForClass, fetchAttendClassSummary, fetchPaymentsForClass } from "@/lib/service/action/students-action"
import { useState, useEffect } from "react"

export default function ClassAttendanceWidget({classId} : {classId : string | string []}) {
    const [list, setList] = useState<AttendanceItem[]>([])

    useEffect(() => {
        const loadData = async () => {
            const result = await featchAttendanceForClass(classId)
            setList(result)
        }
        loadData()
    }, [classId])

    return (
        <section className="space-y-4">
            <SubTitle title="Attendance" />

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Check In</TableHead>
                        <TableHead>Check Out</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Remarks</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        list.map(item => (
                            <TableRow key={item.date}>
                                <TableCell>{item.date}</TableCell>
                                <TableCell>{item.checkIn}</TableCell>
                                <TableCell>{item.checkOut}</TableCell>
                                <TableCell>{item.status}</TableCell>
                                <TableCell>{item.remarks}</TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </section>
    )
}