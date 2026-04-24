'use client'

import DetailsTabContents from "@/components/app/details-tab-contents"
import PaginationComponent from "@/components/app/pagination"
import FormsInput from "@/components/forms/forms-input"
import FormsSelect from "@/components/forms/forms-select"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { PaymentItem } from "@/lib/model/dto/office"
import { PaymentSearch } from "@/lib/model/schema/office"
import { safeCall } from "@/lib/safe-call"
import { getPaymentStatus } from "@/lib/service/action/constants-action"
import { searchPayments } from "@/lib/service/action/office-action"
import { Pager, SelectOption } from "@/lib/types"
import { ArrowRight, Search } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"

export default function PaymentsForClass({classId} : {classId : any}) {

    const [list, setList] = useState<PaymentItem[]>([])
    const [pageInfo, setPageInfo] = useState<Pager>()
    const [statusList, setStatusList] = useState<SelectOption[]>([])

    const form = useForm<PaymentSearch>({defaultValues: {
        classId: classId,
        status: '',
        dateFrom: '',
        dateTo: '',
        keyword: ''
    }})

    useEffect(() => {
        const load = async () => {
            await safeCall(async () => {
                const {list, ...pageInfo} = await searchPayments(form.getValues())
                setList(list)
                setPageInfo(pageInfo)

                const result = await getPaymentStatus()
                result.unshift({label: "Search All", value: ""})
                setStatusList(result)                
            })
        }
        load()
    }, [])

    const onSubmit = async (data: PaymentSearch) => {
        await safeCall(async () => {
            const {list, ...pageInfo} = await searchPayments(data)
            setList(list)
            setPageInfo(pageInfo)
        })
    }

    const onPageChange = async (page : number) => {
        await safeCall(async () => {
            form.setValue("page", page)
            const {list, ...pageInfo} = await searchPayments(form.getValues())
            setList(list)
            setPageInfo(pageInfo)            
        })
    }

    return (
        <DetailsTabContents title="Payments" subTitle="Payments for this class">
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex gap-4 items-end">
                <div className="">
                    <FormsSelect control={form.control} name="status" label="Status" options={statusList} />
                </div>
                <div className="">
                    <FormsInput control={form.control} name="dateFrom" label="Date From" type="date" />
                </div>
                <div className="">
                    <FormsInput control={form.control} name="dateTo" label="Date To" type="date" />
                </div>
                <div className="">
                    <FormsInput control={form.control} name="keyword" label="Keyword" />
                </div>
                <div className="">
                    <Button type="submit">
                        <Search /> Search
                    </Button>
                </div>
            </form>

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Student</TableHead>
                        <TableHead>Payment Date</TableHead>
                        <TableHead>Payment Type</TableHead>
                        <TableHead>Particular</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-end">Amount</TableHead>
                        <TableHead></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {list.map(item => (
                        <TableRow key={item.id}>
                            <TableCell>{item.studentName}</TableCell>
                            <TableCell>{item.paymentDate}</TableCell>
                            <TableCell>{item.paymentType}</TableCell>
                            <TableCell>{item.particular}</TableCell>
                            <TableCell>{item.status}</TableCell>
                            <TableCell className="text-end">{item.amount.toLocaleString()} MMK</TableCell>
                            <TableCell className="flex justify-center">
                                <Link href={`/office/payments/${item.id}`}>
                                    <ArrowRight className="size-4" />
                                </Link>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <PaginationComponent onPageChange={onPageChange} pager={pageInfo} />
        </DetailsTabContents>
    )
}
