import 'server-only'
import { RegistrationItem } from "@/lib/model/dto/office";
import { RegistrationSearch } from "@/lib/model/schema/office";
import { PageResult, PAGEINFO } from "@/lib/types";

export async function search(form:RegistrationSearch) : Promise<PageResult<RegistrationItem>> {
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
                status: "Approved",
                registerAt: "2023-01-01"
            },
            {
                id: 2,
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