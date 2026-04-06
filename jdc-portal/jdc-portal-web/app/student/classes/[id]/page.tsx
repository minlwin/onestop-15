'use client'

import Loading from "@/components/app/loading"
import { useParams } from "next/navigation"
import StudentClassSummary from "./_wieget/class-summary"
import ClassAttendanceWidget from "./_wieget/class-attendance"
import ClassPaymentWidget from "./_wieget/class-payments"

export default function ClassDetailsPage() {

    const { id } = useParams()

    if(!id) {
        return <Loading />
    }

    return (
        <div className="space-y-8">
            {/* Summary Info */}
            <StudentClassSummary classId={id} />

            {/* Attendance */}
            <div className="hidden md:block">
                <ClassAttendanceWidget classId={id} />
            </div>

            {/* Payment History */}
            <ClassPaymentWidget classId={id} />
        </div>
    )
}