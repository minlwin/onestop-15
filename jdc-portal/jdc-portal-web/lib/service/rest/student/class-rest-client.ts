import { AttendClassSummary, ClassItem } from '@/lib/model/dto/students'
import 'server-only'
import { securedSearch } from '../client'

export async function findMyClasses() : Promise<ClassItem[]> {
    const result = await securedSearch(`student/classes`)
    return await result.json()    
}

export async function findAvailableClasses() :Promise<ClassItem[]> {
    const result = await securedSearch(`student/classes/available`)
    return await result.json()    
}

export async function findSummary(classId: any): Promise<AttendClassSummary> {
    const result = await securedSearch(`student/classes/${classId}/summary`)
    return await result.json()    
}