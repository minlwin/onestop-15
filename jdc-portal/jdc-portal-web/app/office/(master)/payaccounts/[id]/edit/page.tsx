'use client'
import OfficePageDecorator from "@/app/office/_widgets/office-page-decorate";
import Loading from "@/components/app/loading";
import PageTitle from "@/components/app/page-title";
import { PaymentAccountForm } from "@/lib/model/schema/office";
import { PAYACCOUNTS_SEGMENTS } from "@/lib/segments";
import { findPaymentAccountDetails, updatePaymentAccount } from "@/lib/service/action/office-action";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import PayAccountEditForm from "../../_widgets/payaccount-edit-form";

export default function PaymentAccountEditPage() {

    const { id } = useParams()
    const [form, setForm] = useState<PaymentAccountForm>()

    useEffect(() => {
        const load = async () => {
            const result = await findPaymentAccountDetails(id)
            setForm({
                type: result.type,
                provider: result.provider,
                accountNo: result.accountNo,
                accountName: result.accountName
            })
        }
        load() 
    }, [id])

    const router = useRouter()

    const onSave = async(form: PaymentAccountForm) => {
        const result = await updatePaymentAccount(id, form)
        router.push(`/office/payaccounts/${result.id}/details`)
    }

    if (!form) {
        return <Loading />
    }

    return (
        <OfficePageDecorator name="Edit Payment Account" segments={PAYACCOUNTS_SEGMENTS}>
            <PageTitle title="Edit Payment Account" />
            <PayAccountEditForm account={form} onSubmit={onSave} />
        </OfficePageDecorator>
    )
}