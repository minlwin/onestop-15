'use client'

import { ClassItem } from "@/lib/model/dto/students"
import { loadClassesAction } from "@/lib/service/action/students-action"
import { useEffect, useState } from "react"
import ClassInfoWidget from "./class-info-widget"
import { Subtitles } from "lucide-react"
import SubTitle from "@/components/app/sub-title"

export default function AttendedClassesComponent() {

    const [classes, setClasses] = useState<ClassItem[]>([])

    useEffect(() => {
        const fetchClasses = async () => {
            const response = await loadClassesAction()
            setClasses(response)
        }
        fetchClasses()
    }, [])

    return (
        <section>
            <SubTitle title="Attended Classes" />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {classes.map((item) => (
                    <ClassInfoWidget attended={true} key={item.id} data={item} />
                ))}
            </div>
        </section>
    )
}