'use client'

import { StudentItem } from "@/lib/model/dto/office";
import OfficePageDecorator from "../../_widgets/office-page-decorate";
import { useEffect, useState } from "react";
import Pagination from "@/components/app/pagination";
import { useForm } from "react-hook-form";
import { StudentSearch } from "@/lib/model/schema/office";
import { searchStudent } from "@/lib/service/action/office-action";
import { Pager } from "@/lib/types";
import FormsInput from "@/components/forms/forms-input";
import { Button } from "@/components/ui/button";
import { ArrowRight, Search } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Link from "next/link";

export default function StudentManagementPage() {

    const [students, setStudents] = useState<StudentItem[]>([])
    const [pageInfo, setPageInfo] = useState<Pager>()

    useEffect(() => {
        const loadData = async () => {
            const {list, ...pageInfo} = await searchStudent({})
            setStudents(list)
            setPageInfo(pageInfo)
        }
        loadData()
    }, [])

    const form = useForm<StudentSearch>({defaultValues : {
        entryFrom: "",
        entryTo: "",
        keyword: "",
        page: 0,
        size: 10
    }})

    const entryFrom = form.watch("entryFrom")
    const entryTo = form.watch("entryTo")  
    const keyword = form.watch("keyword")
    
    useEffect(() => {
        form.setValue("page", 0)
    }, [entryFrom, entryTo, keyword])

    const onPageChange = async (page : number) => {
        form.setValue("page", page)
        const {list, ...pageInfo} = await searchStudent(form.getValues())
        setStudents(list)
        setPageInfo(pageInfo)
    }

    const onSearch = async (form:StudentSearch) => {
        const {list, ...pageInfo} = await searchStudent(form)
        setStudents(list)
        setPageInfo(pageInfo)
    }

    return (
        <OfficePageDecorator name="Student Management">
            {/* Search Form */}
            <form onSubmit={form.handleSubmit(onSearch)} className="flex items-end gap-4">
                <div>
                    <FormsInput control={form.control} name="entryFrom" label="Entry From" type="date"  />
                </div>
                <div>
                    <FormsInput control={form.control} name="entryTo" label="Entry To" type="date"  />
                </div>
                <div className="w-1/4">
                    <FormsInput control={form.control} name="keyword" label="Keyword"  />
                </div>

                <div>
                    <Button type="submit">
                        <Search /> Search
                    </Button>
                </div>
            </form>

            {/* Result Table */}
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Phone</TableHead>
                        <TableHead>Entry At</TableHead>
                        <TableHead></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                {students.map((student) => (
                    <TableRow key={student.id}>
                        <TableCell>{student.id}</TableCell>
                        <TableCell>{student.name}</TableCell>
                        <TableCell>{student.email}</TableCell>
                        <TableCell>{student.phone}</TableCell>
                        <TableCell>{student.entryAt}</TableCell>
                        <TableCell>
                            <Link href={`/office/students/${student.id}`}>
                                <ArrowRight className="size-4" />
                            </Link>
                        </TableCell>
                    </TableRow>
                ))}    
                </TableBody>
            </Table>

            {/* Pagination */}
            <Pagination pager={pageInfo} onPageChange={onPageChange} />
        </OfficePageDecorator>
    )
}