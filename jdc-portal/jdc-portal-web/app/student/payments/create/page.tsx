'use client'

import ClassDecorateLayout from "@/components/app/class-decorate"
import Loading from "@/components/app/loading"
import PaymentFormComponent from "@/components/app/payment-form"
import { useSearchParams } from "next/navigation"


export default function PaymentCreatePage() {
    const searchParams = useSearchParams()
    const classId = searchParams.get("classId")

    if (!classId) {
        return <Loading />
    }

    return (
        <ClassDecorateLayout classId={classId} title="Paid Monthly Fee">
            <PaymentFormComponent classId={classId} feeType="monthly" />
        </ClassDecorateLayout>
    )
}
