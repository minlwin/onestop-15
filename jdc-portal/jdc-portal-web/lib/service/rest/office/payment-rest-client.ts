import 'server-only'
import { PaymentSearch } from "@/lib/model/schema/office";
import { PageResult, DataModificationResult } from "@/lib/types";
import { PaymentDetails, PaymentItem } from '@/lib/model/dto/office';
import { POST_CONFIG, PUT_CONFIG, securedRequest, securedSearch } from '../client';

export async function search(form:PaymentSearch) : Promise<PageResult<PaymentItem>> {
    const result = await securedSearch('office/payments', form)
    return await result.json()
}

export async function findById(id: any) : Promise<PaymentDetails> {
    const result = await securedSearch(`office/payments/${id}`)
    return await result.json()
}

export async function create(form: any) : Promise<DataModificationResult<string>> {
    const result = await securedRequest('office/payments', {
        ...POST_CONFIG,
        body: JSON.stringify(form)
    })
    return await result.json()
}

export async function updateStatus(id: any, status: string, reason?: string) : Promise<DataModificationResult<string>> {
    const result = await securedRequest(`office/payments/${id}`, {
        ...PUT_CONFIG,
        body: JSON.stringify({
            status: status,
            reason: reason
        })
    })
    return await result.json()
}