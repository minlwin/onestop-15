'use client'

import { ClassForm, classSchema } from "@/lib/model/schema/office";
import { getClassTypes } from "@/lib/service/action/constants-action";
import { SelectOption } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import FormsInput from "@/components/forms/forms-input";
import FormsSelect from "@/components/forms/forms-select";
import FormsChecks from "@/components/forms/forms-checks";
import { Button } from "@/components/ui/button";
import { searchCourse } from "@/lib/service/action/office-action";
import SubTitle from "@/components/app/sub-title";
import { Save } from "lucide-react";

export default function ClassEditForm({onSave, data} : {onSave : (data: ClassForm) => void, data? : ClassForm}) {

    const [courses, setCourses] = useState<SelectOption[]>([])
    const [classTypes, setClassTypes] = useState<SelectOption[]>([])

    useEffect(() => {
        async function load() {
            const classTypes = await getClassTypes()
            classTypes.unshift({value: "", label: "Select One"})
            setClassTypes(classTypes)

            const result = await searchCourse({})
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
            days: [],
            timeFrom: '',
            timeTo: '',
            registrationFee: 0,
            monthlyFee: 0
        },
    })


    useEffect(() => {
        if (data) {
            form.reset(data)
        }
    }, [data, form])


    return (
        <form onSubmit={form.handleSubmit(onSave)} className="grid gap-6 max-w-4xl">
            {/* Class Identification */}
            <SubTitle title="Class Information" />
            <div className="grid gap-4 md:grid-cols-3">
                <FormsSelect
                    control={form.control}
                    name="course"
                    label="Course"
                    options={courses}
                />
                <FormsSelect
                    control={form.control}
                    name="type"
                    label="Class Type"
                    options={classTypes}
                />
                <FormsInput control={form.control} name="startDate" label="Start Date" type="date" />
            </div>


            {/* Fees */}
            <div className="grid gap-4 md:grid-cols-3">
                <FormsInput control={form.control} name="months" label="Duration (Months)" type="number" />
                <FormsInput control={form.control} name="registrationFee" label="Registration Fee" type="number" />
                <FormsInput control={form.control} name="monthlyFee" label="Monthly Fee" type="number" />
            </div>

            <div className="mt-2"></div>
            <SubTitle title="Schedules" />
            {/* Days of Week */}
            <FormsChecks
                control={form.control}
                name="days"
                label="Days of Week"
                options={["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]}
            />

            {/* Schedule Information */}
            <div className="grid gap-4 md:grid-cols-3">
                <FormsInput control={form.control} name="timeFrom" label="Start Time" type="time" />
                <FormsInput control={form.control} name="timeTo" label="End Time" type="time" />
            </div>

            <div className="flex justify-start gap-4">
                <Button type="submit" disabled={!form.formState.isValid}>
                    <Save /> Save Class
                </Button>
            </div>
        </form>
    )
}