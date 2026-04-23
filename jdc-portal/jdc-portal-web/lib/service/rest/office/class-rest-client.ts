import 'server-only'
import { ClassDetails, ClassForStudent, ClassItem } from "@/lib/model/dto/office";
import { ClassForm, ClassSearch } from "@/lib/model/schema/office";
import { PageResult, DataModificationResult } from "@/lib/types";
import { POST_CONFIG, PUT_CONFIG, securedRequest, securedSearch } from '../client';

export async function search(form: ClassSearch): Promise<PageResult<ClassItem>> {
    const response = await securedSearch('office/classes', form)
    return await response.json()
}

export async function create(form: ClassForm): Promise<DataModificationResult<string>> {
    const response = await securedRequest('office/classes', {
        ...POST_CONFIG,
        body: JSON.stringify(form)
    })
    return await response.json()
}

export async function update(id: string, form: ClassForm): Promise<DataModificationResult<string>> {
    const response = await securedRequest(`office/classes/${id}`, {
        ...PUT_CONFIG,
        body: JSON.stringify(form)
    })
    return await response.json()
}

export async function findForm(id: string): Promise<ClassForm> {
    const response = await securedSearch(`office/classes/${id}/form`)
    return await response.json()
}

export async function findDetails(id: string): Promise<ClassDetails> {
    const response = await securedSearch(`office/classes/${id}`)
    return await response.json()
}

export async function findForStudent(studentId: any, classId: any): Promise<ClassForStudent> {
    const response = await securedSearch(`office/classes/${classId}/student/${studentId}`)
    return await response.json()
}