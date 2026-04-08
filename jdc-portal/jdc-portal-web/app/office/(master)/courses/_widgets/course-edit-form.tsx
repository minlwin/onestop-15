'use client'

import { CourseForm, courseSchema } from "@/lib/model/schema/office"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect, useState } from "react"
import { FieldValues, useFieldArray, useForm } from "react-hook-form"
import FormsInput from "@/components/forms/forms-input"
import FormsTextarea from "@/components/forms/forms-textarea"
import { Button } from "@/components/ui/button"
import { Plus, Save, Trash2 } from "lucide-react"
import { SelectOption } from "@/lib/types"
import { getCourseLevels } from "@/lib/service/action/constants-action"
import FormsSelect from "@/components/forms/forms-select"

export default function CourseEditForm({course, onSubmit} : {course?: CourseForm, onSubmit: (form: CourseForm) => void}) {
    
    const [levels, setLevels] = useState<SelectOption[]>([])

    useEffect(() => {
        const load = async () => {
            const result = await getCourseLevels()
            result.unshift({value: "", label: "Select One"})
            setLevels(result)
        }
        load()
    }, [])

    const form = useForm<CourseForm>({
        resolver: zodResolver(courseSchema),
        defaultValues: {
            course: "",
            courseLevel: "",
            hours: 0,
            description: "",
            contents: [
                {
                    name: "",
                    description: ""
                }
            ]
        }
    })

    useEffect(() => {
        if (course) {
            form.reset(course)
        }
    }, [course, form])

    const contents = useFieldArray({
        control: form.control,
        name: "contents"
    })

    const addContent = () => {
        contents.append({name: "", description : ""})
    }

    const removeContent = (index: number) => {
        contents.remove(index)

        if(contents.fields.length === 1) {
            contents.append({name: "", description : ""})
        }
    }

    return (
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-6 max-w-4xl">
            <div className="grid gap-4 md:grid-cols-3">
                <div>
                    <FormsSelect control={form.control} name="courseLevel" label="Course Level" options={levels} />
                </div>
                <div>
                    <FormsInput control={form.control} name="course" label="Course Name" type="text" />
                </div>
                <div>
                    <FormsInput control={form.control} name="hours" label="Hours" type="number" />
                </div>
            </div>

            <div>
                <FormsTextarea control={form.control} name="description" label="Course Description" rows={4} />
            </div>

            <div className="space-y-4">
                <div className="flex items-center justify-between gap-4">
                    <div>
                        <p className="text-base font-medium">Course Contents</p>
                        <p className="text-sm text-muted-foreground">Add or remove modules for this course.</p>
                    </div>
                </div>

                <div className="space-y-4">
                    {contents.fields.map((field, index) => (
                        <CourseContentForm key={field.id} index={index} remove={removeContent} form={form} />
                    ))}
                </div>
            </div>

            <div className="flex justify-start gap-2">
                <Button type="button" variant="outline" onClick={addContent}>
                    <Plus /> Add Content
                </Button>
                <Button type="submit">
                    <Save /> Save Course
                </Button>
            </div>
        </form>
    )
}

function CourseContentForm({index, remove, form} : {index: number, remove: (index: number) => void, form: any}) {
    return (
        <div className="rounded-lg border border-border p-4 space-y-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                    <p className="text-sm font-medium">Content {index + 1}</p>
                    <p className="text-sm text-muted-foreground">Enter title and description for this section.</p>
                </div>
                <Button type="button" variant="destructive" size="sm" onClick={() => remove(index)}>
                    <Trash2 className="mr-2" /> Remove
                </Button>
            </div>
            <div className="space-y-4">
                <div className="md:w-1/2">
                    <FormsInput
                        control={form.control}
                        name={`contents.${index}.name` as const}
                        label="Content Title"
                        type="text"
                    />
                </div>
                <div>
                    <FormsTextarea
                        control={form.control}
                        name={`contents.${index}.description` as const}
                        label="Content Description"
                        rows={3}
                    />
                </div>
            </div>
        </div>
    )
}
