import { AttendClassSummary, ClassItem } from '@/lib/model/dto/students'
import 'server-only'

export async function findMyClasses() : Promise<ClassItem[]> {
    return [
        {
            id: 1,
            type: "Online",
            course: "Java Basic",
            startDate: "2026-04-15",
            discription: "Foundation course of Java Programming Language."
        },
        {
            id: 2,
            type: "Offline",
            course: "Full Stack Spring",
            startDate: "2026-04-15",
            discription: "Spring framework and React framework"
        }
    ]
}

export async function findAvailableClasses() :Promise<ClassItem[]> {
    return [
        {
            id: 1,
            type: "Online",
            course: "Java Basic",
            startDate: "2026-04-15",
            discription: "Foundation course of Java Programming Language."
        },
        {
            id: 2,
            type: "On Campus",
            course: "Full Stack Spring",
            startDate: "2026-04-15",
            discription: "Spring framework and React framework"
        },
        {
            id: 3,
            type: "Online",
            course: "Python Basic",
            startDate: "2026-04-15",
            discription: "Foundation course of Python Programming Language."
        }
    ]
}

export async function findSummary(classId: any): Promise<AttendClassSummary> {
    return {
        attended: 10,
        late: 2,
        earlyOut: 1,
        leave: 3,
        absent: 0,
        needToPaid: true,
        certified: true
    }
}