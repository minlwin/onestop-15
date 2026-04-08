'use client'

import OfficePageDecorator from "@/app/office/_widgets/office-page-decorate"
import Loading from "@/components/app/loading"
import { ClassForm } from "@/lib/model/schema/office"
import { CLASS_SEGMENTS } from "@/lib/segments"
import { findClassForEdit, updateClass } from "@/lib/service/action/office-action"
import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import ClassEditForm from "../../_widgets/class-edit-form"

export default function ClassEditPage() {

    const { id } = useParams()
    const [form, setForm] = useState<ClassForm>()

    useEffect(() => {
        async function load() {
            if(id) {
                const form = await findClassForEdit(id as string)
                setForm(form)
            }
        }
        load()
    }, [id])

    const router = useRouter()
    const onSave = async (data: ClassForm) => {
        console.log(data)
        const result = await updateClass(id as string, data)
        router.replace(`/office/classes/${result.id}/details`)
    }

    if(!id) {
        return <Loading />
    }

    return (
        <OfficePageDecorator name="Edit Class" segments={CLASS_SEGMENTS}>
            <ClassEditForm onSave={onSave} data={form} />
        </OfficePageDecorator>
    )
}