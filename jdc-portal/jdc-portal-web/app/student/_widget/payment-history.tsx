'use client'

import SubTitle from "@/components/app/sub-title"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { PaymentItem } from "@/lib/model/dto/students"
import { loadPaymentHistoryAction } from "@/lib/service/action/students-action"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function PaymentHistoryComponent() {
    const [data, setData] = useState<PaymentItem[]>([])

    useEffect(() => {
        const fetchClasses = async () => {
            const response = await loadPaymentHistoryAction()
            setData(response)
        }
        fetchClasses()
    }, [])

    return (
        <section>
            <SubTitle title="Payment History" />
            {/* Web View */}
            <div className="hidden md:block md:w-full">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Date</TableHead>
                            <TableHead>Class</TableHead>
                            <TableHead>Particular</TableHead>
                            <TableHead>Payment Type</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-end">Amount</TableHead>
                            <TableHead></TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {data.map((item) => (
                            <TableRow key={item.id}>
                                <TableCell>{item.paymentDate}</TableCell>
                                <TableCell>{item.className}</TableCell>
                                <TableCell>{item.particular}</TableCell>
                                <TableCell>{item.paymentType}</TableCell>
                                <TableCell>{item.status}</TableCell>
                                <TableCell className="text-end">{item.amount.toLocaleString()}</TableCell>
                                <TableCell className="text-center">
                                    <Button asChild variant={'ghost'}>
                                        <Link href={`/student/payments/${item.id}/details`}>
                                            <ArrowRight/>
                                        </Link>
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            {/* Mobile View */}
            <div className="md:hidden">
                <div className="space-y-3">
                     {data.map((item) => (
                        <PaymentItemWidget key={item.id} item={item} />
                    ))}   
                </div>
            </div>

        </section>
    )
}

function PaymentItemWidget({ item }: { item: PaymentItem }) {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-xl font-semibold">{item.className}</CardTitle>
                <CardDescription>{item.particular}</CardDescription>
                <CardAction>
                    <Badge variant={'outline'}>{item.status}</Badge>
                </CardAction>
            </CardHeader>
            <CardContent className="space-y-4">
                <p>{item.amount.toLocaleString()} MMK</p>

                <div className="flex justify-end">
                    <Button asChild>
                        <Link href={'/'}>
                            <ArrowRight/>
                            Show Details
                        </Link>
                    </Button>
                </div>
            </CardContent>

        </Card>
    )
}