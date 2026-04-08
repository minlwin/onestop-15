'use client'

import OfficePageDecorator from "@/app/office/_widgets/office-page-decorate"
import { EmployeeForm } from "@/lib/model/schema/office"
import { createEmployee } from "@/lib/service/action/office-action"
import { useRouter } from "next/navigation"
import StaffEditForm from "../_widgets/staff-edit-form"
import { EMPLOYEE_SEGMENTS } from "@/lib/segments"

export default function StaffCreatePage() {

    const router = useRouter()

    const onSubmit = async (form: EmployeeForm) => {
        const response = await createEmployee(form)
        router.replace(`/office/staffs/${response.id}/details`)
    }

    return (
        <OfficePageDecorator name="Create Employee" segments={EMPLOYEE_SEGMENTS}> 
            <StaffEditForm onSubmit={onSubmit} />
        </OfficePageDecorator>
    )
}