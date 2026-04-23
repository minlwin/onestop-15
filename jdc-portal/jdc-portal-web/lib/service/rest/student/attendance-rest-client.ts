import 'server-only'

import { AttendanceItem } from '@/lib/model/dto/students'
import { securedSearch } from '../client'

export async function search(classId: any) : Promise<AttendanceItem[]> {
    const result = await securedSearch(`student/attendances/${classId}`)
    return await result.json()    
}