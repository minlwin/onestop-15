'use client'

import FormsInput from "@/components/forms/forms-input"
import FormsSelect from "@/components/forms/forms-select"
import { Button } from "@/components/ui/button"
import { EmployeeForm, employeeSchema } from "@/lib/model/schema/office"
import { getPositions } from "@/lib/service/action/constants-action"
import { SelectOption } from "@/lib/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { Plus } from "lucide-react"
import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"

export default function StaffEditForm({ employee, onSubmit }: { employee?: EmployeeForm, onSubmit: (form: EmployeeForm) => void }) {

    const [positions, setPositions] = useState<SelectOption[]>([])

    useEffect(() => {
        const loadData = async () => {
            const positions = await getPositions()
            positions.unshift({ label: "Select One", value: "" })
            setPositions(positions)
        }
        loadData()
    }, [])

    const form = useForm<EmployeeForm>({
        resolver: zodResolver(employeeSchema),
        defaultValues: {
            position: "",
            name: "",
            email: "",
            phone: "",
            entryAt: ""
        }
    })

    useEffect(() => {
        if(employee) {
            form.reset(employee)
        }
    }, [employee])

    return (
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-6 max-w-4xl">
            <div className="grid gap-4 md:grid-cols-2">
                <div>
                    <FormsSelect control={form.control} name="position" label="Position" options={positions} />
                </div>
                <div></div>
                <div>
                    <FormsInput control={form.control} name="name" label="Name" type="text" />
                </div>
                <div >
                    <FormsInput control={form.control} name="entryAt" label="Entry Date" type="date" />
                </div>
                <div>
                    <FormsInput control={form.control} name="phone" label="Phone" type="tel" />
                </div>
                <div>
                    <FormsInput control={form.control} name="email" label="Email" type="email" />
                </div>
            </div>

            <div>
                <Button type="submit">
                    <Plus /> {employee ? "Update" : "Create"} Employee
                </Button>
            </div>
        </form>
    )
}