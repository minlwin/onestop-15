'use client'

import ClassDecorateLayout from "@/components/app/class-decorate"
import Loading from "@/components/app/loading"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { PaymentDetails } from "@/lib/model/dto/students"
import { getPaymentDetails } from "@/lib/service/action/students-action"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"

export default function PaymentDetailsPage() {

    const {id} = useParams()
    const [details, setDetails] = useState<PaymentDetails>()

    useEffect(() => {
        const loadData = async () => {
            if(id) {
                const result = await getPaymentDetails(id as string)
                setDetails(result)
            }
        } 
        loadData()
    }, [id])

    if(!details) {
        return <Loading />
    }

    return (
        <ClassDecorateLayout classId={details.classId} title="">
            <PaymentDetailsWidget details={details} />
        </ClassDecorateLayout>
    )
}

function PaymentDetailsWidget({details} : {details : PaymentDetails}) {
    return (
        <Card>
            <CardHeader>
                <CardTitle></CardTitle>
            </CardHeader>
        </Card>
    )
}