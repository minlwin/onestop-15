'use client'

import ClassDecorateLayout from "@/components/app/class-decorate"
import HighlightInfo from "@/components/app/highlight-info"
import Loading from "@/components/app/loading"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PaymentDetails } from "@/lib/model/dto/students"
import { safeCall } from "@/lib/safe-call"
import { getPaymentDetails } from "@/lib/service/action/students-action"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"

export default function PaymentDetailsPage() {

    const {id} = useParams()
    const [details, setDetails] = useState<PaymentDetails>()

    useEffect(() => {
        const loadData = async () => {
            if(id) {
                await safeCall(async () => {
                    const result = await getPaymentDetails(id as string)
                    setDetails(result)
                })
            }
        } 
        loadData()
    }, [id])

    if(!details) {
        return <Loading />
    }

    return (
        <ClassDecorateLayout classId={details.classId} title="Payment Details">
            <PaymentDetailsWidget details={details} />
        </ClassDecorateLayout>
    )
}

function PaymentDetailsWidget({details} : {details : PaymentDetails}) {

    const messsage = details.status === "Pending" ? "Please wait for approval" : details.status === "Paid" ? "Payment has been approved" : details.rejectReason || "Payment has been rejected"

    return (
        <Card>
            <CardHeader>
                <CardTitle>Payment Information</CardTitle>
                <CardDescription>{messsage}</CardDescription>
            </CardHeader>

            <CardContent className="flex flex-col md:flex-row gap-4">
                <div className="md:w-2/5">
                    <img src={details.slip} alt="Pay Slip" className="w-full md:w-3/4" />
                </div>    
                <div className="md:w-2/5">
                    <div className="grid grid-cols-1 gap-4">
                        <HighlightInfo label="Payment" value={details.particular} />
                        <HighlightInfo label="Paid At" value={details.paymentDate} />
                        <HighlightInfo label="Amount" value={`${details.amount.toLocaleString()} MMK`} />
                        <HighlightInfo label="Status" value={details.status} />
                    </div>
                </div>            
            </CardContent>
        </Card>
    )
}