'use client'
import OfficePageDecorator from "@/app/office/_widgets/office-page-decorate";
import DetailsHeader from "@/components/app/details-header";
import HighlightInfo from "@/components/app/highlight-info";
import Loading from "@/components/app/loading";
import PageTitle from "@/components/app/page-title";
import SubTitle from "@/components/app/sub-title";
import { Button } from "@/components/ui/button";
import { PaymentAccountDetails } from "@/lib/model/dto/office";
import { PAYACCOUNTS_SEGMENTS } from "@/lib/segments";
import { findPaymentAccountDetails, togglePaymentAccount } from "@/lib/service/action/office-action";
import { Check, Pencil, X } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function PaymentAccountDetailsPage() {

    const { id } = useParams()
    const [details, setDetails] = useState<PaymentAccountDetails>()

    useEffect(() => {
        const load = async () => {
            const result = await findPaymentAccountDetails(id)
            setDetails(result)
        }
        load()
    }, [id])

    const toogleState = async () => {
        await togglePaymentAccount(id)
        const result = await findPaymentAccountDetails(id)
        setDetails(result)
    }

    if (!details) {
        return (
            <Loading />
        )
    }

    return (
        <OfficePageDecorator name="Payment Account Details" segments={PAYACCOUNTS_SEGMENTS}>
            <DetailsHeader title={details.type} subTitle={details.accountName}>
                <Button onClick={toogleState} variant={'destructive'}>
                    {details.deleted ? <Check /> : <X />}
                    {details.deleted ? "Activate" : "Suspend"}
                </Button>
                <Button asChild>
                    <Link href={`/office/payaccounts/${id}/edit`}>
                        <Pencil />
                        <span>Edit Account</span>
                    </Link>
                </Button>
            </DetailsHeader>

            <div className="grid md:grid-cols-4 gap-4">
                <HighlightInfo label="Account No" value={details.accountNo} />
                <HighlightInfo label="Account Name" value={details.accountName} />
                <HighlightInfo label="Account Type" value={details.type} className="col-start-1" />
                <HighlightInfo label="Provider" value={details.provider} />
                <HighlightInfo label="Status" value={details.deleted ? "Suspended" : "Active"} />
            </div>

            <div className="space-y-3">
                <SubTitle title="Audit Information" />
                <div className="grid md:grid-cols-4 gap-4">
                    <HighlightInfo label="Created At" value={details.createdAt} />
                    <HighlightInfo label="Created By" value={details.createdBy} />
                    <HighlightInfo label="Modified At" value={details.modifiedAt} />
                    <HighlightInfo label="Modified By" value={details.modifiedBy} />
                </div>
            </div>
        </OfficePageDecorator>
    )
}
