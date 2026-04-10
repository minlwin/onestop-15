import { PaymentDetails, PaymentItem } from '@/lib/model/dto/students'
import { PaymentForm } from '@/lib/model/schema/students'
import { DataModificationResult } from '@/lib/types'
import 'server-only'

export async function paid(form: PaymentForm) : Promise<DataModificationResult<string>> {
    return {
        id: "C002-1234"
    }
}

export async function search(form : {classId? : string}) : Promise<PaymentItem[]> {
    return [
        {
            id: "1",
            classId: "1",
            className: "Java Basic (2026-04-15)",
            paymentDate: "2026-04-15",
            amount: 50000,
            paymentType: "In Hand",
            status: "Paid",
            particular: "Registration Fee"
        },
        {
            id: "2",
            classId: "1",
            className: "Java Basic (2026-04-15)",
            paymentDate: "2026-04-15",
            amount: 100000,
            paymentType: "In Hand",
            status: "Paid",
            particular: "Monthly Fee"
        }
    ]
}

export async function findById(id : string) : Promise<PaymentDetails> {
    return {
        id: "2",
        classId: "1",
        className: "Java Basic (2026-04-15)",
        paymentDate: "2026-04-15",
        amount: 100000,
        paymentType: "In Hand",
        status: "Paid",
        particular: "Monthly Fee",
        slip: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTf8_S0ubIv5ZgTBldLfnbcQ2RcxTI4mvFT9g&s",
    }
}