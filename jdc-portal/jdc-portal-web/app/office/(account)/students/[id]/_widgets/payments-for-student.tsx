'use client'

import DetailsTabContents from "@/components/app/details-tab-contents"
import { ClassItem, PaymentItem } from "@/lib/model/dto/office"
import ClassSelect from "./class-select"
import { useState } from "react"
import { searchPayments } from "@/lib/service/action/office-action"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { safeCall } from "@/lib/safe-call"

export default function PaymentsForStudent({studentId, classes} : {studentId: any, classes: ClassItem[]}) {

    const [list, setList] = useState<PaymentItem[]>([])
    const onClassChange = async (id: string) => {
        await safeCall(async () => {
            const {list} = await searchPayments({
                classId: id,
                studentId: studentId
            })
            setList(list)
        })
    }

    return (
        <DetailsTabContents title="Payments" subTitle="Payment History about this student">
            <ClassSelect classes={classes} onChange={onClassChange} />

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Particular</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-end">Amount</TableHead>
                        <TableHead></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                {list.map((item, index) => (
                    <TableRow key={index}>
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
        </DetailsTabContents>
    )
}