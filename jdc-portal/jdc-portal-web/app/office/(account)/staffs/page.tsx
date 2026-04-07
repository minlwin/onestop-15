'use client'

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import OfficePageDecorator from "../../_widgets/office-page-decorate";
import { useForm } from "react-hook-form";
import { EmployeeSearch } from "@/lib/model/schema/office";
import FormsSelect from "@/components/forms/forms-select";
import FormsInput from "@/components/forms/forms-input";
import { Button } from "@/components/ui/button";
import { ArrowRight, Plus, Search } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { EmployeeItem, PositionItem } from "@/lib/model/dto/office";
import { loadPositions, searchEmployee } from "@/lib/service/action/office-action";

export default function StaffManagementPage() {

    const [positions, setPositions] = useState<PositionItem[]>([])
    const [employees, setEmployees] = useState<EmployeeItem[]>([])

    const positionOptions = positions.map(a => ({label : a.name, value : a.code}))
    positionOptions.unshift({label : "All Position", value : ""})

    useEffect(() => {
        const loadData = async () => {
            const positions = await loadPositions()
            setPositions(positions)

            const employees = await searchEmployee({})
            setEmployees(employees)
        }
        loadData()
    }, [])

    const form = useForm<EmployeeSearch>({defaultValues : {
        position: "",
        keyword: ""
    }})

    const onSearch = async (form:EmployeeSearch) => {
        const employees = await searchEmployee(form)
        setEmployees(employees)
    }

    return (
        <OfficePageDecorator name="Employee Management">
            {/* Search Form */}
            <form onSubmit={form.handleSubmit(onSearch)} className="flex gap-4 items-end">
                <div className="w-1/5">
                    <FormsSelect label="Position" control={form.control} name="position" options={positionOptions} />
                </div>
                <div className="w-1/4">
                    <FormsInput label="Keyword" control={form.control} name="keyword" />
                </div>

                <div className="space-x-2">
                    <Button type="submit">
                        <Search /> Search
                    </Button>

                    <Button type="button" variant={'destructive'} asChild>
                        <Link href={'/office/staffs/create'}>
                            <Plus /> Add Employee
                        </Link>
                    </Button>
                </div>
            </form>

            {/* Result Table */}
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Position</TableHead>
                        <TableHead>Phone</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Entry At</TableHead>
                        <TableHead>Resign At</TableHead>
                        <TableHead></TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {employees.map(employee => (
                        <TableRow key={employee.id}>
                            <TableCell>{employee.name}</TableCell>
                            <TableCell>{employee.position.name}</TableCell>
                            <TableCell>{employee.phone}</TableCell>
                            <TableCell>{employee.email}</TableCell>
                            <TableCell>{employee.entryAt}</TableCell>
                            <TableCell>{employee.resignAt || "-"}</TableCell>
                            <TableCell>
                                <Link href={`/office/staffs/${employee.id}/details`}>
                                    <ArrowRight className="size-4" />
                                </Link>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </OfficePageDecorator>
    )
}