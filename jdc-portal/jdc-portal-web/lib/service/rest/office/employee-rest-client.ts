import 'server-only'
import { EmployeeDetails, EmployeeItem } from "@/lib/model/dto/office";
import { EmployeeForm, EmployeeSearch } from "@/lib/model/schema/office";
import { DataModificationResult } from '@/lib/types';
import { POST_CONFIG, PUT_CONFIG, securedRequest, securedSearch } from '../client';

export async function search(form: EmployeeSearch):Promise<EmployeeItem[]> {
    const result = await securedSearch('office/employees', form)
    return await result.json()
}

export async function create(form: EmployeeForm): Promise<DataModificationResult<string>> {
    const result = await securedRequest(`office/employees`, {
        ...POST_CONFIG,
        body: JSON.stringify(form)
    })
    return await result.json()
}

export async function update(id: string, form: EmployeeForm): Promise<DataModificationResult<string>> {
    const result = await securedRequest(`office/employees/${id}`, {
        ...PUT_CONFIG,
        body: JSON.stringify(form)
    })
    return await result.json()
}

export async function findById(id: any) : Promise<EmployeeDetails> {
    const result = await securedSearch(`office/employees/${id}`)
    return await result.json()
}