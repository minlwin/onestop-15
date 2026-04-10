import 'server-only'
import { RegistrationDetails, RegistrationItem } from "@/lib/model/dto/office";
import { RegistrationForm, RegistrationSearch } from "@/lib/model/schema/office";
import { PageResult, PAGEINFO, DataModificationResult } from "@/lib/types";

export async function search(form:RegistrationSearch) : Promise<PageResult<RegistrationItem>> {
    return {
        ...PAGEINFO,
        list: [
            {
                id: 1,
                studentId: 1,
                classId: 1,
                course: "Math",
                startDate: "2023-01-01",
                classType: "Online",
                studentName: "John Doe",
                email: "john@example",
                phone: "0123456789",
                status: "Approved",
                registerAt: "2023-01-01"
            },
            {
                id: 2,
                studentId: 2,
                classId: 1,
                course: "Math",
                startDate: "2023-01-01",
                classType: "Online",
                studentName: "John Doe",
                email: "john@example",
                phone: "0123456789",
                status: "Approved",
                registerAt: "2023-01-01"
            },
            {
                id: 3,
                studentId: 3,
                classId: 3,
                course: "Math",
                startDate: "2023-01-01",
                classType: "Online",
                studentName: "John Doe",
                email: "john@example",
                phone: "0123456789",
                status: "Approved",
                registerAt: "2023-01-01"
            }
        ]
    }
}

export async function findById(id: any) : Promise<RegistrationDetails> {
    return {
        id: 1,
        studentId: 1,
        classId: 1,
        course: "Math",
        startDate: "2023-01-01",
        classType: "Online",
        studentName: "John Doe",
        email: "john@example",
        phone: "0123456789",
        status: "Applied",
        registerAt: "2023-01-01",
        paymentDate: "2023-01-01",
        paymentType: "Office",
        amount: 50000,
        paySlip: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTf8_S0ubIv5ZgTBldLfnbcQ2RcxTI4mvFT9g&s",
        createdAt: "2023-01-01",
        modifiedAt: "2023-01-01",
        createdBy: "John Doe",
        modifiedBy: "John Doe"
    }
}

export async function create(form: RegistrationForm) : Promise<DataModificationResult<string>> {
    return {
        id: "1234"
    }
}


export async function updateStatus(id: any, status: string, reason?: string) : Promise<void> {
    // Mock update status
    console.log(`Updating payment ${id} status to ${status}`)
}