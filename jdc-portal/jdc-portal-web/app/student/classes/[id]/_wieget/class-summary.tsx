'use client'

import HighlightInfo from "@/components/app/highlight-info"
import Loading from "@/components/app/loading"
import PageTitle from "@/components/app/page-title"
import SubTitle from "@/components/app/sub-title"
import { Button } from "@/components/ui/button"
import { ClassDetails } from "@/lib/model/dto/anonymous"
import { AttendClassSummary } from "@/lib/model/dto/students"
import { findClassAction } from "@/lib/service/action/anonymous-action"
import { fetchAttendClassSummary } from "@/lib/service/action/students-action"
import { BadgeCheck } from "lucide-react"
import { useState, useEffect } from "react"

export default function StudentClassSummary({classId} : {classId: string | string []}) {
    
    const [classInfo, setClassInfo] = useState<ClassDetails>()
    const [summary, setSummary] = useState<AttendClassSummary>()

    useEffect(() => {
        const fetchData = async () => {
            const infoResponse = await findClassAction(classId)
            setClassInfo(infoResponse)

            const summaryResponse = await fetchAttendClassSummary(classId)
            setSummary(summaryResponse)
        }
        fetchData()
    }, [classId])

    if(!classInfo || !summary) {
        return <Loading />
    }

    return (
        <section className="space-y-8 md:space-y-4">
            <header className="flex flex-col items-center gap-4 md:flex-row md:justify-between">
                <div className="text-center md:text-left">
                    <PageTitle title={`${classInfo.course.name} (${classInfo.type})`} />
                    <span className="font-medium text-gray-700">{classInfo.startDate} Intake</span>
                </div>
                <Button>
                    <BadgeCheck /> Download Certificate
                </Button>
            </header>

            <div className="block md:hidden">
                <SubTitle title="Attendance" />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
                <HighlightInfo label="Attended" value={`${summary.attended}`} />
                <HighlightInfo label="Leave" value={`${summary.leave}`} />
                <HighlightInfo label="Late" value={`${summary.late}`} />
                <HighlightInfo label="Early Out" value={`${summary.earlyOut}`} />
                <HighlightInfo label="Absent" value={`${summary.absent}`} />
                <HighlightInfo label="Attendance" value={`${getAttendance(summary)}%`} />
            </div>
        </section>
    )
}

function getAttendance(summary? : AttendClassSummary) {
    if(!summary) {
        return 0
    }

    const total = summary.attended + summary.late + summary.earlyOut + summary.leave + summary.absent
    const actual = summary.attended + summary.leave

    return actual * 100 / total
}