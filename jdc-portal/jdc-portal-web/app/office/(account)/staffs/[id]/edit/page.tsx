'use client'

import OfficePageDecorator from "@/app/office/_widgets/office-page-decorate"
import { EMPLOYEE_SEGMENTS } from "../../_widgets/commons"
import { useParams, useRouter } from "next/navigation"
import { EmployeeDetails } from "@/lib/model/dto/office"
import { useEffect, useState } from "react"
import { findEmployeeById, updateEmployee } from "@/lib/service/action/office-action"
import { EmployeeForm } from "@/lib/model/schema/office"
import StaffEditForm from "../../_widgets/staff-edit-form"
import Loading from "@/components/app/loading"

export default function StaffEditPage() {

    const {id} = useParams()
    const [employee, setEmployee] = useState<EmployeeForm>()

    useEffect(() => {
        const loadData = async () => {
            if(id) {
                const employee = await findEmployeeById(id as string)
                setEmployee({
                    email: employee.email,
                    phone: employee.phone,
                    name: employee.name,
                    position: employee.position,
                    entryAt: employee.entryAt
                })
            }
        }
        loadData()
    }, [id])

    const router = useRouter()

    const onSubmit = async (form: EmployeeForm) => {
        const response = await updateEmployee(id as string, form)
        router.replace(`/office/staffs/${response.id}/details`)
    }

    if(!id) {
        return <Loading />
    }

    return (
        <OfficePageDecorator name="Edit Employee" segments={EMPLOYEE_SEGMENTS}>
            <StaffEditForm employee={employee} onSubmit={onSubmit} />
        </OfficePageDecorator>
    )
}