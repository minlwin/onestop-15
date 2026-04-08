'use client'
import OfficePageDecorator from "@/app/office/_widgets/office-page-decorate";
import { STUDENT_SEGMENTS } from "@/lib/segments";
import { useParams } from "next/navigation";
import { useState } from "react";

export default function StudentDetailsPage() {
    const {id} = useParams()
    const [details, setDetails] = useState<any>()
    return (
        <OfficePageDecorator name="Student Information" segments={STUDENT_SEGMENTS}>
            <></>
        </OfficePageDecorator>
    )
}