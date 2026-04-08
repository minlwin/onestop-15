'use client'

import { ClassForm, classSchema } from "@/lib/model/schema/office";
import { getClassTypes } from "@/lib/service/action/constants-action";
import { getCourses } from "@/lib/service/rest/anonymous/courses-rest-client";
import { SelectOption } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import FormsInput from "@/components/forms/forms-input";
import FormsSelect from "@/components/forms/forms-select";
import { Button } from "@/components/ui/button";

export default function ClassEditForm({onSave, data} : {onSave : (data: ClassForm) => void, data? : ClassForm}) {

    const [courses, setCourses] = useState<SelectOption[]>([])
    const [classTypes, setClassTypes] = useState<SelectOption[]>([])

    useEffect(() => {
        async function load() {
            const classTypes = await getClassTypes()
            classTypes.unshift({value: "", label: "Select One"})
            setClassTypes(classTypes)

            const result = await getCourses()
            const courses = result.map(item => ({value: `${item.id}`, label: item.name}))
            courses.unshift({value: "", label: "Select One"})
            setCourses(courses)
        }
        load()
    }, [])

    const form = useForm<ClassForm>({
        resolver: zodResolver(classSchema),
        defaultValues: {
            type: '',
            course: '',
            startDate: '',
            months: 0,
            registrationFee: 0,
            monthlyFee: 0
        }
    })

    useEffect(() => {
        if (data) {
            form.reset(data)
        }
    }, [data, form])

    return (
        <form onSubmit={form.handleSubmit(onSave)} className="grid gap-6 max-w-4xl">
            <div className="grid gap-4 md:grid-cols-2">
                <FormsSelect
                    control={form.control}
                    name="type"
                    label="Class Type"
                    options={classTypes}
                />
                <FormsSelect
                    control={form.control}
                    name="course"
                    label="Course"
                    options={courses}
                />
            </div>

            <div className="grid gap-4 md:grid-cols-3">
                <FormsInput control={form.control} name="startDate" label="Start Date" type="date" />
                <FormsInput control={form.control} name="months" label="Months" type="number" />
                <FormsInput control={form.control} name="registrationFee" label="Registration Fee" type="number" />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
                <FormsInput control={form.control} name="monthlyFee" label="Monthly Fee" type="number" />
                <div className="hidden md:block" />
            </div>

            <div className="flex justify-end">
                <Button type="submit">Save Class</Button>
            </div>
        </form>
    )
}