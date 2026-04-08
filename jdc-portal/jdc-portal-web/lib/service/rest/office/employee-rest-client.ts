import 'server-only'
import { EmployeeDetails, EmployeeItem } from "@/lib/model/dto/office";
import { EmployeeForm, EmployeeSearch } from "@/lib/model/schema/office";
import { DataModificationResult } from '@/lib/types';

export async function search(form: EmployeeSearch):Promise<EmployeeItem[]> {
    return [
        {
            id: 1,
            name: "John Doe",
            position: "Office",
            phone: "0123456789",
            email: "0qVhM@example.com",
            entryAt: "2023-01-01",
        },
        {
            id: 2,
            name: "Jane Smith",
            position: "Teacher",
            phone: "0987654321",
            email: "rGv0k@example.com",
            entryAt: "2023-01-01",            
        },
        {
            id: 3,
            name: "Bob Johnson",
            position: "Office",
            phone: "0123456789",
            email: "bob@example.com",
            entryAt: "2023-01-01",
        }
    ]
}

export async function create(form: EmployeeForm): Promise<DataModificationResult<string>> {
    return {
        id: "1234"
    }
}

export async function update(id: string, form: EmployeeForm): Promise<DataModificationResult<string>> {
    return {
        id: id
    }
}

export async function findById(id: any) : Promise<EmployeeDetails> {
    return {
        id: 1,
        name: "John Doe",
        position: "Office",
        phone: "0123456789",
        email: "0qVhM@example.com",
        entryAt: "2023-01-01",
        createdAt: "2023-01-01",
        modifiedAt: "2023-01-01",
        createdBy: "John Doe",
        modifiedBy: "John Doe"
    }
}