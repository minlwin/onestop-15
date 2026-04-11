'use client'

import OfficePageDecorator from "@/app/office/_widgets/office-page-decorate";
import PageTitle from "@/components/app/page-title";
import { PaymentAccountForm } from "@/lib/model/schema/office";
import { PAYACCOUNTS_SEGMENTS } from "@/lib/segments";
import { createPaymentAccount } from "@/lib/service/action/office-action";
import { useRouter } from "next/navigation";
import PayAccountEditForm from "../_widgets/payaccount-edit-form";

export default function CreatePaymentAccountPage() {

    const router = useRouter()
    const onSave = async (data: PaymentAccountForm) => {
        const result = await createPaymentAccount(data)
        router.replace(`/office/payaccounts/${result.id}/details`)
    }

    return (
        <OfficePageDecorator name="Create Payment Account" segments={PAYACCOUNTS_SEGMENTS}>
            <PageTitle title="Create Payment Account" />
            <PayAccountEditForm onSubmit={onSave} />
        </OfficePageDecorator>
    )
}