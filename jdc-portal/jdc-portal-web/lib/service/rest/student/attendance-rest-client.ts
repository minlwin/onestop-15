import 'server-only'

import { AttendanceItem } from '@/lib/model/dto/students'

export async function search(classId: any) : Promise<AttendanceItem[]> {
    return [
        {
            date: "2026-04-15",
            checkIn: "10:00",
            checkOut: "12:00",
            status: "Present"
        },
        {
            date: "2026-04-16",
            checkIn: "10:00",
            checkOut: "12:00",
            status: "Present"
        },
        {
            date: "2026-04-17",
            checkIn: "10:00",
            checkOut: "12:00",
            status: "Present"
        }
    ]
}