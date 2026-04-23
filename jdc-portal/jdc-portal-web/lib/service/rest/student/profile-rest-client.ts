import { ProfileInfo } from '@/lib/model/dto/students'
import 'server-only'
import { securedSearch } from '../client'

export async function getProfile(): Promise<ProfileInfo> {
    const result = await securedSearch(`student/profile`)
    return await result.json()    
}