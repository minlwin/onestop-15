'use client'

import ClassDecorateLayout from "@/components/app/class-decorate"
import Loading from "@/components/app/loading"
import PaymentFormComponent from "@/components/app/payment-form"
import { useSearchParams } from "next/navigation"

export default function RegistrationPage() {

    const params = useSearchParams()
    const classId = params.get('classId')

    if(!classId) {
        return <Loading />
    }

    return (
        <ClassDecorateLayout classId={classId} title="Join Class">
            <PaymentFormComponent classId={classId} feeType="registration" />
        </ClassDecorateLayout>
    )
}
