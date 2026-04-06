import { DataModificationResult, MessageResult } from "@/lib/model/dto/anonymous"
import { AttendanceItem, AttendClassSummary, ClassItem, PaymentItem, ProfileInfo } from "@/lib/model/dto/students"
import { JoinClassForm } from "@/lib/model/schema/students"

export async function loadProfileAction(): Promise<ProfileInfo> {
    return {
        id: 1,
        name: "John Doe",
        email: "0qVhM@example.com",
        phone: "0123456789"
    }
}

export async function loadClassesAction(): Promise<ClassItem[]> {
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

export async function loadAvailableClassesAction(): Promise<ClassItem[]> {
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

export async function loadPaymentHistoryAction(): Promise<PaymentItem[]> {
    return [
        {
            id: "1",
            classId: 1,
            className: "Java Basic (2026-04-15)",
            paymentDate: "2026-04-15",
            amount: 50000,
            paymentType: "In Hand",
            status: "Completed",
            particular: "Registration Fee"
        },
        {
            id: "2",
            classId: 1,
            className: "Java Basic (2026-04-15)",
            paymentDate: "2026-04-15",
            amount: 100000,
            paymentType: "In Hand",
            status: "Completed",
            particular: "Monthly Fee"
        }
    ]
}

export async function joinClassAction(form: JoinClassForm) : Promise<DataModificationResult<string>> {
    return {
        id: "C002-1234"
    }
}

export async function fetchAttendClassSummary(classId: any): Promise<AttendClassSummary> {
    return {
        attended: 10,
        late: 2,
        earlyOut: 1,
        leave: 3,
        absent: 0,
        needToPaid: true,
        certified: false
    }
}

export async function fetchPaymentsForClass(classId: any): Promise<PaymentItem[]> {
    return [
        {
            id: "1",
            classId: 1,
            className: "Java Basic (2026-04-15)",
            paymentDate: "2026-04-15",
            amount: 50000,
            paymentType: "In Hand",
            status: "Completed",
            particular: "Registration Fee"
        },
        {
            id: "2",
            classId: 1,
            className: "Java Basic (2026-04-15)",
            paymentDate: "2026-04-15",
            amount: 100000,
            paymentType: "In Hand",
            status: "Completed",
            particular: "Monthly Fee"
        }
    ]
}

export async function featchAttendanceForClass(classId: any) : Promise<AttendanceItem[]> {
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