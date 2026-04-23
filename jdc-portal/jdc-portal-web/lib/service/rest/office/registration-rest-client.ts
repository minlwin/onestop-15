import 'server-only'
import { RegistrationDetails, RegistrationItem } from "@/lib/model/dto/office";
import { RegistrationForm, RegistrationSearch } from "@/lib/model/schema/office";
import { PageResult, DataModificationResult } from "@/lib/types";
import { POST_CONFIG, PUT_CONFIG, securedRequest, securedSearch } from '../client';

export async function search(form:RegistrationSearch) : Promise<PageResult<RegistrationItem>> {
    const result = await securedSearch('office/registrations', form)
    return await result.json()
}

export async function findById(id: any) : Promise<RegistrationDetails> {
    const result = await securedSearch(`office/registrations/${id}`)
    return await result.json()
}

export async function create(form: RegistrationForm) : Promise<DataModificationResult<string>> {
    const result = await securedRequest('office/registrations', {
        ...POST_CONFIG,
        body: JSON.stringify(form)
    })
    return await result.json()
}

export async function updateStatus(id: any, status: string, reason?: string) : Promise<DataModificationResult<string>> {
    const result = await securedRequest(`office/registrations/${id}`, {
        ...PUT_CONFIG,
        body: JSON.stringify({
            status: status,
            reason: reason
        })
    })
    return await result.json()
}