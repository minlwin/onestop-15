'use client'

import SubTitle from "@/components/app/sub-title"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { PaymentItem } from "@/lib/model/dto/students"
import { fetchPaymentsForClass } from "@/lib/service/action/students-action"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function ClassPaymentWidget({classId} : {classId : string | string []}) {

    const [list, setList] = useState<PaymentItem[]>([])

    useEffect(() => {
        const loadData = async () => {
            const result = await fetchPaymentsForClass(classId)
            setList(result)
        }
        loadData()
    }, [classId])

    return (
        <section className="space-y-4">
            <SubTitle title="Payment History" />

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Payment Type</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Particular</TableHead>                          
                        <TableHead className="text-end">Amount</TableHead>
                        <TableHead></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        list.map(item => (
                            <TableRow key={item.id}>
                                <TableCell>{item.paymentDate}</TableCell>
                                <TableCell>{item.paymentType}</TableCell>
                                <TableCell>{item.status}</TableCell>
                                <TableCell>{item.particular}</TableCell>
                                <TableCell className="text-end">{item.amount?.toLocaleString()}</TableCell>
                                <TableCell className="text-center">
                                    <Button asChild variant={'ghost'}>
                                        <Link href={`/student/payments/${item.id}/details`}>
                                            <ArrowRight />
                                        </Link>
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </section>
    )
}