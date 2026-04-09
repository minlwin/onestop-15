'use client'

import DetailsTabContents from "@/components/app/details-tab-contents"
import { ClassItem } from "@/lib/model/dto/office"
import ClassSelect from "./class-select"
import { useState } from "react"
import { AttendanceItem } from "@/lib/model/dto/students"

export default function AttendancesForStudent({studentId, classes} : {studentId: any, classes: ClassItem[]}) {

    const [list, setList] = useState<AttendanceItem[]>([])
    const onClassChange = (id: string) => {
        
    }

    return (
        <DetailsTabContents title="Attendances" subTitle="Attendance Record about this student">
            <ClassSelect classes={classes} onChange={onClassChange} />
        </DetailsTabContents>
    )
}