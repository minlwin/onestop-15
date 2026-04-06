'use client'

import ClassInformationComponent from "@/components/app/class-information"
import Loading from "@/components/app/loading"
import PageTitle from "@/components/app/page-title"
import PaymentFormComponent from "@/components/app/payment-form"
import { useSearchParams } from "next/navigation"

export default function RegistrationPage() {

    const params = useSearchParams()
    const classId = params.get('classId')

    if(!classId) {
        return <Loading />
    }

    return (
        <section className="space-y-4">
            <PageTitle title="Enroll Class" />

            <div className="flex gap-8 flex-col md:flex-row">
                <div className="flex-1">
                    <ClassInformationComponent classId={classId} />
                </div>
                <div className="flex-1">
                    <PaymentFormComponent classId={classId} feeType="registration" />
                </div>
            </div>
        </section>
    )
}
