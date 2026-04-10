'use client'

import SubTitle from "@/components/app/sub-title"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { StudentItem } from "@/lib/model/dto/office"
import { searchStudent } from "@/lib/service/action/office-action"
import { useEffect, useState } from "react"

export default function SelectStudent({classId, onSelect} : {classId: string, onSelect: (studentId: any) => void}) {
    
    const [students, setStudents] = useState<StudentItem[]>([])
    const [selectedId, setSelectedId] = useState<number>()

    useEffect(() => {
        const loadData = async () => {
            const {list} = await searchStudent({classId: classId, size: 100})
            setStudents(list)
        }
        loadData()
    }, [classId])
    
    return (
        <section className="space-y-3">
            <SubTitle title="Select Student" />

            <div className="grid md:grid-cols-4 gap-4">
            {students.map((item, index) => (
                <Card key={index} onClick={() => {
                    setSelectedId(item.id)
                    onSelect(item.id)
                }} className={item.id == selectedId ? "bg-accent text-accent-foreground" : ""}>
                    <CardHeader>
                        <CardTitle>{item.name}</CardTitle>
                        <CardDescription>{item.phone}</CardDescription>
                    </CardHeader>
                </Card>
            ))}
            </div>
        </section>
    )
}