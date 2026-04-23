import 'server-only'
import { StudentItem, StudentDetails } from "@/lib/model/dto/office";
import { StudentSearch } from "@/lib/model/schema/office";
import { PageResult } from "@/lib/types";
import { securedSearch } from '../client';

export async function search(form: StudentSearch) : Promise<PageResult<StudentItem>> {
    const result = await securedSearch('office/students', form)
    return await result.json()    
}

export async function findById(id: any) : Promise<StudentDetails> {
    const result = await securedSearch(`office/students/${id}`)
    return await result.json()    
}