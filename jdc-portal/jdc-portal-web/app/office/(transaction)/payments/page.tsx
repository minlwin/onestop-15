'use client'
import { useForm } from "react-hook-form";
import OfficePageDecorator from "../../_widgets/office-page-decorate";
import { PaymentSearch } from "@/lib/model/schema/office";
import { useEffect, useState } from "react";
import { getPaymentStatus, getPaymentTypes } from "@/lib/service/action/constants-action";
import { Pager, SelectOption } from "@/lib/types";
import { PaymentItem } from "@/lib/model/dto/office";
import { searchPayments } from "@/lib/service/action/office-action";
import PaginationComponent from "@/components/app/pagination";
import FormsSelect from "@/components/forms/forms-select";
import FormsInput from "@/components/forms/forms-input";
import { Button } from "@/components/ui/button";
import { ArrowRight, Search } from "lucide-react";
import { Table, TableHead, TableHeader, TableRow, TableBody, TableCell } from "@/components/ui/table";
import Link from "next/link";

export default function PaymentManagementPage() {

    const [paymentTypes, setPaymentTypes] = useState<SelectOption[]>([])
    const [statusList, setStatusList] = useState<SelectOption[]>([])

    const form = useForm<PaymentSearch>({defaultValues : {
        classType : '',
        status : '',
        paymentType : '',
        feeType : '',
        dateFrom : '',
        dateTo : '',
        keyword : ''
    }})

    const [payments, setPayments] = useState<PaymentItem[]>([])
    const [pageInfo, setPageInfo] = useState<Pager>()

    useEffect(() => {
        const load = async () => {

            const paymentTypes = await getPaymentTypes()
            paymentTypes.unshift({value: "", label: "Search All"})
            setPaymentTypes(paymentTypes)

            const statusList = await getPaymentStatus()
            statusList.unshift({value: "", label: "Search All"})
            setStatusList(statusList)

            const {list, ...pageInfo} = await searchPayments({})
            setPayments(list)
            setPageInfo(pageInfo)
        }
        load()
    }, [])

    const onSearch = async (form:PaymentSearch) => {
        const {list, ...pageInfo} = await searchPayments(form)
        setPayments(list)
        setPageInfo(pageInfo)
    }

    const onPageChange = async (page : number) => {
        form.setValue("page", page)
        const {list, ...pageInfo} = await searchPayments(form.getValues())
        setPayments(list)
        setPageInfo(pageInfo)
    }

    return (
        <OfficePageDecorator name="Payment Management">
            <form onSubmit={form.handleSubmit(onSearch)} className="flex gap-4 items-end">
                <div>
                    <FormsSelect control={form.control} name="paymentType" label="Payment Type" options={paymentTypes} />
                </div>
                <div>
                    <FormsSelect control={form.control} name="status" label="Status" options={statusList} />
                </div>
                <div>
                    <FormsInput control={form.control} name="dateFrom" label="From" type="date" />
                </div>
                <div>
                    <FormsInput control={form.control} name="dateTo" label="To" type="date" />
                </div>
                <div>
                    <FormsInput control={form.control} name="keyword" label="Keyword" />
                </div>
                <div className="space-x-2">
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
                        <TableHead>Payment Date</TableHead>
                        <TableHead>Payment Type</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Particular</TableHead>
                        <TableHead></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {payments.map((payment) => (
                        <TableRow key={payment.id}>
                            <TableCell>{payment.id}</TableCell>
                            <TableCell>{payment.course}</TableCell>
                            <TableCell>{payment.startDate}</TableCell>
                            <TableCell>{payment.classType}</TableCell>
                            <TableCell>{payment.studentName}</TableCell>
                            <TableCell>{payment.email}</TableCell>
                            <TableCell>{payment.phone}</TableCell>
                            <TableCell>{payment.paymentDate}</TableCell>
                            <TableCell>{payment.paymentType}</TableCell>
                            <TableCell>{payment.status}</TableCell>
                            <TableCell>{payment.particular}</TableCell>
                            <TableCell>
                                <Link href={`/office/payments/${payment.id}`}>
                                    <ArrowRight className="size-4"/>
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