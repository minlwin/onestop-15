'use client'

import FormsInput from "@/components/forms/forms-input"
import FormsSelect from "@/components/forms/forms-select"
import { Button } from "@/components/ui/button"
import { PaymentAccountForm, paymentAccountSchema } from "@/lib/model/schema/office"
import { getPaymentTypes } from "@/lib/service/action/constants-action"
import { SelectOption } from "@/lib/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { Save } from "lucide-react"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"

export default function PayAccountEditForm({account, onSubmit} : {account? : PaymentAccountForm, onSubmit: (form: PaymentAccountForm) => void}) {
    
    const [types, setTypes] = useState<SelectOption[]>([])

    useEffect(() => {
        const loadData = async () => {
            let types = await getPaymentTypes()
            types = types.filter(item => item.value != "Office")
            types.unshift({ label: "Select One", value: "" })
            setTypes(types)
        }
        loadData()
    }, [])

    const form = useForm<PaymentAccountForm>({
        resolver: zodResolver(paymentAccountSchema),
        defaultValues: {
            type: "",
            provider: "",
            accountNo: "",
            accountName: "",
        }
    })

    useEffect(() => {
        if(account) {
            form.reset(account)
        }
    }, [account])
    
    return (
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid md:grid-cols-3 gap-4">
            <FormsSelect control={form.control} name="type" label="Payment Type" options={types} />
            <FormsInput control={form.control} name="provider" label="Payment Provider" type="text" />
            <FormsInput control={form.control} name="accountNo" label="Account Number" type="text" className="col-start-1" />
            <FormsInput control={form.control} name="accountName" label="Account Name" type="text" />

            <div className="col-start-1">
                <Button type="submit" className="w-full md:w-auto">
                    <Save /> Save Account
                </Button>
            </div>
        </form>
    )
}