'use client'

import DetailsTabContents from "@/components/app/details-tab-contents"
import PaginationComponent from "@/components/app/pagination"
import FormsInput from "@/components/forms/forms-input"
import { Button } from "@/components/ui/button"
import { TableHeader, TableRow, TableHead, TableBody, TableCell, Table } from "@/components/ui/table"
import { StudentItem } from "@/lib/model/dto/office"
import { StudentSearch } from "@/lib/model/schema/office"
import { safeCall } from "@/lib/safe-call"
import { searchStudent } from "@/lib/service/action/office-action"
import { Pager } from "@/lib/types"
import { Search, ArrowRight } from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"

export default function StudentsForClass({classId} : {classId : any}) {

    const [list, setList] = useState<StudentItem[]>([])
    const [pageInfo, setPageInfo] = useState<Pager>()
    
    const form = useForm<StudentSearch>({defaultValues: {
        classId: classId,
        keyword: '',
        page: 0,
        size: 50
    }})

    useEffect(() => {
        const load = async () => {
            await safeCall(async () => {
                const {list, ...pageInfo} = await searchStudent(form.getValues())
                setList(list)
                setPageInfo(pageInfo)                
            })
        }
        load()
    }, [])

    const onSubmit = async (data: StudentSearch) => {
        await safeCall(async () => {
            const {list, ...pageInfo} = await searchStudent(form.getValues())
            setList(list)
            setPageInfo(pageInfo)            
        })
    }

    const onPageChange = async (page : number) => {
        await safeCall(async () => {
            form.setValue("page", page)
            const {list, ...pageInfo} = await searchStudent(form.getValues())
            setList(list)
            setPageInfo(pageInfo)
        })
    }

    return (
        <DetailsTabContents title="Students" subTitle="Students for this class">
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex space-x-4 items-end">
                <div className="w-full md:w-1/4">
                    <FormsInput control={form.control} name="keyword" label="Keyword" />
                </div>
                <div className="w-full md:w-1/4">
                    <Button type="submit"><Search /> Search</Button>
                </div>
            </form>

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Phone</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Entry At</TableHead>
                        <TableHead></TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                {list.map((item) => (
                    <TableRow key={item.id}>
                        <TableCell>{item.name}</TableCell>
                        <TableCell>{item.phone}</TableCell>
                        <TableCell>{item.email}</TableCell>
                        <TableCell>{item.entryAt}</TableCell>
                        <TableCell>
                            <Link href={`/office/students/${item.id}`}>
                                <ArrowRight className="size-4" />
                            </Link>
                        </TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>

            <PaginationComponent pager={pageInfo} onPageChange={onPageChange} />
        </DetailsTabContents>
    )
}