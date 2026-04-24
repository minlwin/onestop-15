'use client'

import PageTitle from "@/components/app/page-title";
import OfficePageDecorator from "../../_widgets/office-page-decorate";
import { useEffect, useState } from "react";
import { PaymentAccountItem } from "@/lib/model/dto/office";
import { getAllPaymentAccounts } from "@/lib/service/action/office-action";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Plus } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { safeCall } from "@/lib/safe-call";

export default function PaymentAccountsPage() {
    const [list, setList] = useState<PaymentAccountItem[]>([])

    useEffect(() => {
        const load = async () => {
            await safeCall(async () => {
                const result = await getAllPaymentAccounts()
                setList(result)
            })
        }
        load()
    }, [])

    return (
        <OfficePageDecorator name="Payment Accounts">
            <div className="flex flex-col md:flex-row gap-4 md:justify-between">
                <PageTitle title="Payment Accounts" />
                <Button asChild>
                    <Link href="/office/payaccounts/create">
                        <Plus /> Add New
                    </Link>
                </Button>
            </div>

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Type</TableHead>
                        <TableHead>Provider Name</TableHead>
                        <TableHead>Account Number</TableHead>
                        <TableHead>Account Name</TableHead>
                        <TableHead></TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                {list.map((item, index) => (
                    <TableRow key={index}>
                        <TableCell>{item.type}</TableCell>
                        <TableCell>{item.provider}</TableCell>
                        <TableCell>{item.accountNo}</TableCell>
                        <TableCell>{item.accountName}</TableCell>
                        <TableCell className="flex justify-center">
                            <Button asChild variant={'ghost'}>
                                <Link href={`/office/payaccounts/${item.id}/details`}>
                                    <ArrowRight />
                                </Link>
                            </Button>
                        </TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
        </OfficePageDecorator>
    )
}