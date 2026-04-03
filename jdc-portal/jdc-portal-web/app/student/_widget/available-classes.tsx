'use client'

import { ClassItem } from "@/lib/model/dto/students"
import { loadAvailableClassesAction } from "@/lib/service/action/students-action"
import { useEffect, useState } from "react"
import ClassInfoWidget from "./class-info-widget"
import SubTitle from "@/components/app/sub-title"

export default function AvailableClassesComponent() {

    const [classes, setClasses] = useState<ClassItem[]>([])

    useEffect(() => {
        const fetchClasses = async () => {
            const response = await loadAvailableClassesAction()
            setClasses(response)
        }
        fetchClasses()
    }, [])

    if(classes.length === 0) {
        return (
            <></>
        )
    }

    return (
        <section>
            <SubTitle title="Avialable Classes" />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {classes.map((item) => (
                    <ClassInfoWidget key={item.id} data={item} attended={false} />
                ))}
            </div>
        </section>
    )
}