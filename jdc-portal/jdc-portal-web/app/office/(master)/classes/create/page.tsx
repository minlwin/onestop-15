'use client'

import OfficePageDecorator from "@/app/office/_widgets/office-page-decorate"
import { ClassForm } from "@/lib/model/schema/office"
import { useRouter } from "next/navigation"
import ClassEditForm from "../_widgets/class-edit-form"
import { CLASS_SEGMENTS } from "@/lib/segments"
import { createClass } from "@/lib/service/action/office-action"
import { safeCall } from "@/lib/safe-call"

export default function ClassCreatePage() {

    const router = useRouter()
    const onSave = async (data: ClassForm) => {
        await safeCall(async () => {
            const result = await createClass(data)
            router.replace(`/office/classes/${result.id}/details`)            
        })
    }

    return (
        <OfficePageDecorator name="Create Class" segments={CLASS_SEGMENTS}>
            <ClassEditForm onSave={onSave} />
        </OfficePageDecorator>
    )
}