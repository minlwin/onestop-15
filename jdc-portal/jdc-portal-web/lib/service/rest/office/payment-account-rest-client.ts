import { PaymentAccountDetails, PaymentAccountItem } from "@/lib/model/dto/office";
import { PaymentAccountForm } from "@/lib/model/schema/office";
import { DataModificationResult } from "@/lib/types";
import { POST_CONFIG, PUT_CONFIG, securedRequest, securedSearch } from "../client";

export async function getAll() : Promise<PaymentAccountItem[]> {
    const result = await securedSearch('office/payment-account')
    return await result.json()
}

export async function getOne(id: number) : Promise<PaymentAccountDetails> {
    const result = await securedSearch(`office/payment-account/${id}`)
    return await result.json()
}

export async function create(form: PaymentAccountForm) : Promise<DataModificationResult<any>> {
    const result = await securedRequest(`office/payment-account`, {
        ...POST_CONFIG,
        body: JSON.stringify(form)
    })
    return await result.json()
}

export async function update(id: any, form: PaymentAccountForm) : Promise<DataModificationResult<any>> {
    const result = await securedRequest(`office/payment-account/${id}`, {
        ...PUT_CONFIG,
        body: JSON.stringify(form)
    })
    return await result.json()
}

export async function toggleState(id: any) : Promise<DataModificationResult<any>> {
    const result = await securedRequest(`office/payment-account/${id}/toggle`, {
        ...PUT_CONFIG,
        body: JSON.stringify({})
    })
    return await result.json()
}