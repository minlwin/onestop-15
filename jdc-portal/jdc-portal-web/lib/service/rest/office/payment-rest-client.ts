import 'server-only'
import { PaymentSearch } from "@/lib/model/schema/office";
import { PageResult, PAGEINFO } from "@/lib/types";
import { PaymentItem } from '@/lib/model/dto/office';

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
                paymentDate: "2023-01-01",
                paymentType: "Office",
                status: "Paid",
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
                paymentDate: "2023-01-01",
                paymentType: "Office",
                status: "Paid",
                particular: "Registration Fee"
            }
        ]
    }
}