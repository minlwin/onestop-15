'use client'

import DetailsTabContents from "@/components/app/details-tab-contents"
import { ClassForStudent, ClassItem } from "@/lib/model/dto/office"
import ClassSelect from "./class-select"
import { useState } from "react"
import { findClassForStudent } from "@/lib/service/action/office-action"
import SubTitle from "@/components/app/sub-title"
import HighlightInfo from "@/components/app/highlight-info"

export default function ClasssForStudent({studentId, classes} : {studentId: any, classes: ClassItem[]}) {

    const [data, setData] = useState<ClassForStudent>()

    const onClassChange = async (classId: string) => {
        const result = await findClassForStudent(studentId, classId)
        setData(result)
    }

    return (
        <DetailsTabContents title="Classes" subTitle="Class Information about this student">
            <ClassSelect classes={classes} onChange={onClassChange} />

            {data && 
                <>
                    <div className="space-y-3">
                        <SubTitle title="Attendance Summary" />

                        <div className="grid md:grid-cols-4 gap-4">
                            <HighlightInfo label="Attended" value={`${data.attended + data.leave + data.leave}`} />
                            <HighlightInfo label="Absent" value={`${data.absent}`} />
                            <HighlightInfo label="Percent" value={`${(((data.attended + data.leave + data.leave) / (data.attended + data.leave + data.leave + data.absent)) * 100).toFixed(2) } %`} />
                        </div>
                    </div>

                    <div className="space-y-3">
                        <SubTitle title="Payment Summary" />

                        <div className="grid md:grid-cols-4 gap-4">
                            <HighlightInfo label="Total" value={`${(data.registrationFee + (data.months * data.monthlyFee)).toLocaleString()} MMK`} />
                            <HighlightInfo label="Last Paid" value={`${data.lastPayment.toLocaleString()} MMK`} />
                            <HighlightInfo label="Paid" value={`${data.paidFees.toLocaleString()} MMK`} />
                            <HighlightInfo label="Remain" value={`${(data.registrationFee + (data.months * data.monthlyFee) - data.paidFees - data.lastPayment).toLocaleString()} MMK`} />
                        </div>
                    </div>
                </>
            }
        </DetailsTabContents>
    )
}