'use client'

import Link from "next/link"
import OfficePageDecorator from "@/app/office/_widgets/office-page-decorate"
import Loading from "@/components/app/loading"
import { EmployeeDetails } from "@/lib/model/dto/office"
import { findEmployeeById } from "@/lib/service/action/office-action"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import SubTitle from "@/components/app/sub-title"
import HighlightInfo from "@/components/app/highlight-info"
import { Pencil } from "lucide-react"
import { EMPLOYEE_SEGMENTS } from "@/lib/segments"
import DetailsHeader from "@/components/app/details-header"

export default function StaffDetailsPage() {

    const {id} = useParams()
    const [employee, setEmployee] = useState<EmployeeDetails>()

    useEffect(() => {
        const loadData = async () => {
            if(id) {
                const employee = await findEmployeeById(id as string)
                setEmployee(employee)
            }
        }
        loadData()
    }, [id])

    if (!id || !employee) {
        return <Loading />
    }

    return (
        <OfficePageDecorator name="Employee Details" segments={EMPLOYEE_SEGMENTS}>
            <DetailsHeader title={employee.name} subTitle={employee.position}>
                <Button asChild>
                    <Link href={`/office/staffs/${id}/edit`}>
                        <Pencil /> Edit Employee
                    </Link>
                </Button>
            </DetailsHeader>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <HighlightInfo label="Phone" value={employee.phone} />
                <HighlightInfo label="Email" value={employee.email} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <HighlightInfo label="Entry At" value={employee.entryAt} />
                <HighlightInfo label="Resign At" value={employee.resignAt || "-"} />
            </div>

            <div>
                <SubTitle title="Audit Information" />
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <HighlightInfo label="Created At" value={employee.createdAt} />
                    <HighlightInfo label="Created By" value={employee.createdBy} />
                    <HighlightInfo label="Modified At" value={employee.modifiedAt} />
                    <HighlightInfo label="Modified By" value={employee.modifiedBy} />
                </div>
            </div>
        </OfficePageDecorator>
    )
}