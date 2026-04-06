'use client'

import { ClassDetails } from "@/lib/model/dto/anonymous"
import { findClassAction } from "@/lib/service/action/anonymous-action"
import { useState, useEffect } from "react"
import { Card, CardHeader, CardTitle, CardDescription, CardAction, CardContent } from "../ui/card"
import HighlightInfo from "./highlight-info"
import Loading from "./loading"
import { Badge } from "../ui/badge"

export default function ClassInformationComponent({ classId }: { classId: string }) {

    const [info, setInfo] = useState<ClassDetails>()

    useEffect(() => {
        const fetchClass = async () => {
            const response = await findClassAction(classId)
            setInfo(response)
        }
        fetchClass()
    }, [classId])

    // Date (YYYY-MM-DD) to Momth with MMM (Like July)
    const startMonth = info && new Date(info.startDate).toLocaleString('default', { month: 'long' })

    if (!info) {
        return <Loading />
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>{info.course.name} - {startMonth} Intake</CardTitle>
                <CardDescription>{info.course.description}</CardDescription>
                <CardAction>
                    <Badge>{info.type}</Badge>
                </CardAction>
            </CardHeader>

            <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <HighlightInfo label="Start Date" value={info.startDate || ''} />
                    <HighlightInfo label="Days" value={info.days || ''} />
                    <HighlightInfo label="Time" value={info.time || ''} />
                </div>

                <CardTitle className="mt-4 mb-2">Fees Information</CardTitle>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <HighlightInfo label="Registration Fee" value={`${info.registrationFee} MMK`} />
                    <HighlightInfo label="Monthly Fee" value={`${info.monthlyFee} MMK`} />
                </div>

                <CardTitle className="mt-4 mb-2">Duration</CardTitle>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <HighlightInfo label="Months" value={`${info.months}`} />
                </div>
            </CardContent>
        </Card>
    )
}