import 'server-only'
import { StudentItem, StudentDetails } from "@/lib/model/dto/office";
import { StudentSearch } from "@/lib/model/schema/office";
import { PAGEINFO, PageResult } from "@/lib/types";

export async function search(form: StudentSearch) : Promise<PageResult<StudentItem>> {
    return {
        list: [
            {
                id: 1,
                name: "John Doe",
                email: "0qVhM@example.com",
                phone: "0123456789",
                entryAt: "2023-01-01",
            },
            {
                id: 2,
                name: "Jane Smith",
                email: "rGv0k@example.com",
                phone: "0987654321",
                entryAt: "2023-01-01",
            },
            {
                id: 3,
                name: "Bob Johnson",
                email: "bob@example.com",
                phone: "0123456789",
                entryAt: "2023-01-01",            
            },
            {
                id: 4,
                name: "Alice Brown",
                email: "alice@example.com",
                phone: "0123456789",
                entryAt: "2023-01-01",            
            },
            {
                id: 5,
                name: "Eve Green",
                email: "eve@example.com",
                phone: "0123456789",
                entryAt: "2023-01-01",            
            },
        ],
        ...PAGEINFO
    }
}

export async function findById(id: any) : Promise<StudentDetails> {
    return {
        id: 1,
        name: "John Doe",
        email: "0qVhM@example.com",
        phone: "0123456789",
        entryAt: "2023-01-01",
        createdAt: "2023-01-01",
        modifiedAt: "2023-01-01",
        createdBy: "John Doe",
        modifiedBy: "John Doe"
    }
}