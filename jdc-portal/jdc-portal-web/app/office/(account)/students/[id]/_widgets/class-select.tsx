'use client'

import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ClassItem } from "@/lib/model/dto/office";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

export default function ClassSelect({classes, onChange} : {classes: ClassItem[], onChange: (id: string) => void}) {

    const [selected, setSelected] = useState<string>(classes[0].id.toString())

    useEffect(() => {
        onChange(selected)
    }, [selected])

    return (
        <nav className="flex flex-col md:flex-row gap-2">
        {classes.map((item, index) => (
            <Card key={index} onClick={() => setSelected(item.id.toString())}
                className={cn("w-1/4", item.id.toString() === selected && "bg-accent text-accent-foreground")}>
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
        </nav>
    )
}