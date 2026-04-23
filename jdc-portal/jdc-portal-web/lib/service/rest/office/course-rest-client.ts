import 'server-only'
import { CourseItem } from "@/lib/model/dto/anonymous";
import { CourseForm, CourseSearch } from "@/lib/model/schema/office";
import { DataModificationResult } from '@/lib/types';
import { CourseDetails } from '@/lib/model/dto/office';
import { POST_CONFIG, PUT_CONFIG, securedRequest, securedSearch } from '../client';

export async function search(form: CourseSearch): Promise<CourseItem[]> {
    const result = await securedSearch('office/courses', form)
    return await result.json()
}

export async function create(form: CourseForm): Promise<DataModificationResult<string>> {
    const result = await securedRequest('office/courses', {
        ...POST_CONFIG,
        body: JSON.stringify(form)
    })
    return await result.json()
}

export async function update(id: string, form: CourseForm): Promise<DataModificationResult<string>> {
    const result = await securedRequest(`office/courses/${id}`, {
        ...PUT_CONFIG,
        body: JSON.stringify(form)
    })
    return await result.json()
}

export async function findDetails(id: string) : Promise<CourseDetails> {
    const result = await securedSearch(`office/courses/${id}`)
    return await result.json()
}

export async function findForm(id: string) : Promise<CourseForm> {
    const result = await securedSearch(`office/courses/${id}/form`)
    return await result.json()
}
