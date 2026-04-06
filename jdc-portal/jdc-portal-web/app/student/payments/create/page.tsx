'use client'

import ClassInformationComponent from "@/components/app/class-information"
import Loading from "@/components/app/loading"
import PageTitle from "@/components/app/page-title"
import PaymentFormComponent from "@/components/app/payment-form"
import { useSearchParams } from "next/navigation"


export default function PaymentCreatePage() {
    const searchParams = useSearchParams()
    const classId = searchParams.get("classId")

    if (!classId) {
        return <Loading />
    }

    return (
        <div className="space-y-4">
            <PageTitle title="Monthly Fee Payment" />

            <div className="flex gap-4 flex-col md:flex-row">
                <div className="flex-1">
                    <ClassInformationComponent classId={classId} />
                </div>
                <div className="flex-1">
                    <PaymentFormComponent classId={classId} feeType="monthly" />
                </div>
            </div>
        </div>
    )
}
