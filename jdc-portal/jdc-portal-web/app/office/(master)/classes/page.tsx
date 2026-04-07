'use client'
import { ClassItem } from "@/lib/model/dto/office";
import OfficePageDecorator from "../../_widgets/office-page-decorate";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ClassSearch } from "@/lib/model/schema/office";
import { Pager, SelectOption } from "@/lib/types";
import { searchClasses } from "@/lib/service/action/office-action";
import PaginationComponent from "@/components/app/pagination";
import FormsSelect from "@/components/forms/forms-select";
import FormsInput from "@/components/forms/forms-input";
import { Button } from "@/components/ui/button";
import { Search, Plus, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getClassTypes } from "@/lib/service/action/constants-action";

export default function ClassManagementPage() {

    const [types, setTypes] = useState<SelectOption[]>([])
    const [classes, setClasses] = useState<ClassItem[]>([])
    const [pageInfo, setPageInfo] = useState<Pager>()
    
    types.unshift({value: "", label: "Search All"})

    const form = useForm<ClassSearch>({defaultValues : {
        keyword: "",
        startFrom: "",
        startTo: "",
        type: ""
    }})

    useEffect(() => {
        const loadData = async () => {
            const types = await getClassTypes()
            setTypes(types)
            const {list, ...pageInfo} = await searchClasses({})
            setClasses(list)
            setPageInfo(pageInfo)
        }
        loadData()
    }, [])

    const onSearch = async (form:ClassSearch) => {
        const {list, ...pageInfo} = await searchClasses(form)
        setClasses(list)
        setPageInfo(pageInfo)
    }

    const onPageChange = async (page : number) => {
        form.setValue("page", page)
        const {list, ...pageInfo} = await searchClasses(form.getValues())
        setClasses(list)
        setPageInfo(pageInfo)
    }

    return (
        <OfficePageDecorator name="Class Management">
            <form onSubmit={form.handleSubmit(onSearch)} className="flex gap-4 items-end">
                <div className="w-1/6">
                    <FormsSelect control={form.control} name="type" label="Class Type" options={types} />
                </div>
                <div className="">
                    <FormsInput control={form.control} name="startFrom" label="Start From" type="date" />
                </div>
                <div className="">
                    <FormsInput control={form.control} name="startTo" label="Start To" type="date" />
                </div>
                <div className="w-1/4">
                    <FormsInput control={form.control} name="keyword" label="Keyword"  />
                </div>

                <div className="space-x-2">
                    <Button type="submit">
                        <Search /> Search
                    </Button>

                    <Button variant={'destructive'} asChild>
                        <Link href={'/office/classes/create'}>
                            <Plus /> Add New
                        </Link>
                    </Button>
                </div>
            </form>

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead >Course</TableHead>
                        <TableHead >Level</TableHead>
                        <TableHead >Type</TableHead>
                        <TableHead >Start Date</TableHead>
                        <TableHead >Months</TableHead>
                        <TableHead ></TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                {classes.map(a => (
                    <TableRow key={a.id}>
                        <TableCell>{a.course}</TableCell>
                        <TableCell>{a.courseLevel}</TableCell>
                        <TableCell>{a.type}</TableCell>
                        <TableCell>{a.startDate}</TableCell>
                        <TableCell>{a.months}</TableCell>
                        <TableCell>
                            <Link href={`/office/classes/${a.id}/details`}>
                                <ArrowRight className="size-4" />
                            </Link>
                        </TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>

            <PaginationComponent onPageChange={onPageChange} pager={pageInfo} />
        </OfficePageDecorator>
    )
}