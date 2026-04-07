'use client'
import { useForm } from "react-hook-form";
import OfficePageDecorator from "../../_widgets/office-page-decorate";
import { RegistrationSearch } from "@/lib/model/schema/office";
import { useEffect, useState } from "react";
import { Pager, SelectOption } from "@/lib/types";
import { getClassTypes } from "@/lib/service/action/constants-action";
import { RegistrationItem } from "@/lib/model/dto/office";
import { searchRegistration } from "@/lib/service/action/office-action";
import PaginationComponent from "@/components/app/pagination";
import FormsSelect from "@/components/forms/forms-select";
import FormsInput from "@/components/forms/forms-input";
import { Button } from "@/components/ui/button";
import { ArrowRight, Search } from "lucide-react";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import Link from "next/link";

export default function RegistrationManagementPage() {

    const form = useForm<RegistrationSearch>({
        defaultValues: {
            classType: "",
            dateFrom: "",
            dateTo: "",
            keyword: ""
        }
    })

    const [classTypes, setClassTypes] = useState<SelectOption[]>([])
    const [registrations, setRegistrations] = useState<RegistrationItem[]>([])
    const [pager, setPager] = useState<Pager>()

    useEffect(() => {
        async function load() {
            const classTypes = await getClassTypes()
            classTypes.unshift({value: "", label: "Search All"})
            setClassTypes(classTypes)

            const {list, ...pageInfo} = await searchRegistration({})
            setRegistrations(list)
            setPager(pageInfo)
        }

        load()
    }, [])

    const onSearch = async (form: RegistrationSearch) => {
        const {list, ...pageInfo} = await searchRegistration(form)
        setRegistrations(list)
        setPager(pageInfo)
    }

    const onPageChange = async (page : number) => {
        form.setValue("page", page)
        const {list, ...pageInfo} = await searchRegistration(form.getValues())
        setRegistrations(list)
        setPager(pageInfo)
    }

    return (
        <OfficePageDecorator name="Registration Management">
            <form onSubmit={form.handleSubmit(onSearch)} className="flex gap-4 items-end">
                <div className="w-1/6">
                    <FormsSelect control={form.control} name="classType" label="Class Type" options={classTypes} />
                </div>
                <div>
                    <FormsInput control={form.control} name="dateFrom" label="From" type="date" />
                </div>
                <div>
                    <FormsInput control={form.control} name="dateTo" label="To" type="date" />
                </div>
                <div className="w-1/5">
                    <FormsInput control={form.control} name="keyword" label="Keyword" />
                </div>

                <div>
                    <Button type="submit">
                        <Search /> Search
                    </Button>
                </div>
            </form>

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Course</TableHead>
                        <TableHead>Start Date</TableHead>
                        <TableHead>Class Type</TableHead>
                        <TableHead>Student Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Phone</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Register At</TableHead>
                        <TableHead></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {registrations.map((registration) => (
                        <TableRow key={registration.id}>
                            <TableCell>{registration.id}</TableCell>
                            <TableCell>{registration.course}</TableCell>
                            <TableCell>{registration.startDate}</TableCell>
                            <TableCell>{registration.classType}</TableCell>
                            <TableCell>{registration.studentName}</TableCell>
                            <TableCell>{registration.email}</TableCell>
                            <TableCell>{registration.phone}</TableCell>
                            <TableCell>{registration.status}</TableCell>
                            <TableCell>{registration.registerAt}</TableCell>
                            <TableCell>
                                <Link href={`/office/registrations/${registration.id}`}>
                                    <ArrowRight className="size-4" />
                                </Link>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <PaginationComponent pager={pager} onPageChange={onPageChange} />
        </OfficePageDecorator>
    )
}