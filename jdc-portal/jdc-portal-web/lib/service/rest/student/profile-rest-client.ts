import { ProfileInfo } from '@/lib/model/dto/students'
import 'server-only'

export async function getProfile(): Promise<ProfileInfo> {
    return {
        id: 1,
        name: "John Doe",
        email: "0qVhM@example.com",
        phone: "0123456789"
    }
}