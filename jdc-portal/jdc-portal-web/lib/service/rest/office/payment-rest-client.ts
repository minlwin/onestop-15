import 'server-only'
import { PaymentSearch } from "@/lib/model/schema/office";
import { PageResult, PAGEINFO, DataModificationResult } from "@/lib/types";
import { PaymentDetails, PaymentItem } from '@/lib/model/dto/office';

export async function search(form:PaymentSearch) : Promise<PageResult<PaymentItem>> {
    return {
        ...PAGEINFO,
        list: [
            {
                id: 1,
                course: "Math",
                startDate: "2023-01-01",
                classType: "Online",
                studentName: "John Doe",
                email: "john@example",
                phone: "0123456789",
                paymentDate: "2023-01-01",
                paymentType: "Office",
                status: "Paid",
                amount: 50000,
                particular: "Registration Fee"
            },
            {
                id: 2,
                course: "Math",
                startDate: "2023-01-01",
                classType: "Online",
                studentName: "John Doe",
                email: "john@example",
                phone: "0123456789",
                paymentDate: "2023-02-01",
                paymentType: "Office",
                status: "Paid",
                amount: 200000,
                particular: "Monthly Fee"
            },
            {
                id: 3,
                course: "Math",
                startDate: "2023-01-01",
                classType: "Online",
                studentName: "John Doe",
                email: "john@example",
                phone: "0123456789",
                paymentDate: "2023-03-01",
                paymentType: "Office",
                status: "Paid",
                amount: 200000,
                particular: "Monthly Fee"
            }
        ]
    }
}

export async function findById(id: any) : Promise<PaymentDetails> {
    return {
        id: 1,
        course: "Math",
        startDate: "2023-01-01",
        classType: "Online",
        studentName: "John Doe",
        email: "john@example",
        phone: "0123456789",
        paymentDate: "2023-01-01",
        paymentType: "Office",
        status: "Pending",
        amount: 50000,
        particular: "Registration Fee",
        paySlip: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTf8_S0ubIv5ZgTBldLfnbcQ2RcxTI4mvFT9g&s",
        createdAt: "2023-01-01",
        modifiedAt: "2023-01-01",
        createdBy: "John Doe",
        modifiedBy: "John Doe"
    }
}

export async function create(form: any) : Promise<DataModificationResult<string>> {
    // Mock create payment
    console.log(`Creating payment with form: ${JSON.stringify(form)}`)
    return {
        id: "1234"
    }
}

export async function updateStatus(id: any, status: string, reason?: string) : Promise<void> {
    // Mock update status
    console.log(`Updating payment ${id} status to ${status}${reason ? ` with reason: ${reason}` : ''}`)
}