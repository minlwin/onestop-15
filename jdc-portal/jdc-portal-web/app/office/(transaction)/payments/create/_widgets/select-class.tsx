'use client'

import SubTitle from "@/components/app/sub-title"
import FormsInput from "@/components/forms/forms-input"
import FormsSelect from "@/components/forms/forms-select"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { ClassItem } from "@/lib/model/dto/office"
import { ClassSearch } from "@/lib/model/schema/office"
import { safeCall } from "@/lib/safe-call"
import { getClassTypes } from "@/lib/service/action/constants-action"
import { searchCourse, searchClasses } from "@/lib/service/action/office-action"
import { SelectOption } from "@/lib/types"
import { Search } from "lucide-react"
import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"

export default function SelectClass({onSelectClass} : {onSelectClass: (data?: ClassItem) => void}) {
    const [courses, setCourses] = useState<SelectOption[]>([])
    const [classTypes, setClassTypes] = useState<SelectOption[]>([])
    const [classes, setClasses] = useState<ClassItem[]>([])
    const [selectedClass, setSelectedClass] = useState<number>()

    const form = useForm<ClassSearch>({defaultValues : {
        course: "",
        type: "",
        startFrom: "",
    }})

    const course = form.watch("course")
    const type = form.watch("type")
    const startFrom = form.watch("startFrom")

    useEffect(() => {
        const loadData = async () => {
            await safeCall(async () => {
                const result = await searchCourse({})
                const courses = result.map(item => ({label: item.name, value: `${item.id}`}))
                courses.unshift({label: "Select One", value: ""})
                setCourses(courses)
                const classTypes = await getClassTypes()
                classTypes.unshift({label: "Select One", value: ""})
                setClassTypes(classTypes)
            })
        }
        loadData()
    }, [])

    const onSearch = async (data: ClassSearch) => {
        await safeCall(async () => {
            const {list} = await searchClasses(data)
            setClasses(list)
            onSelectClass(undefined)
            setSelectedClass(undefined)
        })
    }

    return (
        <section className="space-y-3">
            <SubTitle title="Select Class" />

            <form onSubmit={form.handleSubmit(onSearch)} className="flex gap-4 items-end">
                <div className="">
                    <FormsSelect control={form.control} name="course" label="Course" options={courses} />
                </div>
                <div className="">
                    <FormsSelect control={form.control} name="type" label="Class Type" options={classTypes} />
                </div>
                <div className="">
                    <FormsInput control={form.control} name="startFrom" label="Start From" type="date" />
                </div>

                <Button type="submit" disabled={!(course && type && startFrom)}>
                    <Search /> Search
                </Button>
            </form>

            <div className="grid md:grid-cols-4 gap-4">
                {classes.map((item, index) => (
                    <Card key={index} onClick={() => {
                        onSelectClass(item)
                        setSelectedClass(item.id)
                    }} className={item.id == selectedClass ? "bg-accent text-accent-foreground" : ""}>
                        <CardHeader>
                            <CardTitle className="text-sm font-medium">
                                {`${item.course} - ${item.type}`}
                            </CardTitle>
                            <CardDescription>
                                {item.startDate}
                            </CardDescription>
                        </CardHeader>
                    </Card>
                ))}
            </div>
        </section>
    )
}