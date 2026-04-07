'use server'

import { CourseItem } from "@/lib/model/dto/anonymous";
import { EmployeeItem, PositionItem, StudentItem } from "@/lib/model/dto/office";
import { CourseSearch, EmployeeSearch, StudentSearch } from "@/lib/model/schema/office";
import { PAGEINFO, PageResult } from "@/lib/types";

export async function loadPositions():Promise<PositionItem[]> {
    return [
        {code : "Office", name : "Office"},
        {code : "Teacher", name : "Teacher"},
    ]
}

export async function searchEmployee(form: EmployeeSearch):Promise<EmployeeItem[]> {
    return [
        {
            id: 1,
            name: "John Doe",
            position: {code : "Office", name : "Office"},
            phone: "0123456789",
            email: "0qVhM@example.com",
            entryAt: "2023-01-01",
        },
        {
            id: 2,
            name: "Jane Smith",
            position: {code : "Teacher", name : "Teacher"},
            phone: "0987654321",
            email: "rGv0k@example.com",
            entryAt: "2023-01-01",            
        },
        {
            id: 3,
            name: "Bob Johnson",
            position: {code : "Office", name : "Office"},
            phone: "0123456789",
            email: "bob@example.com",
            entryAt: "2023-01-01",
        }
    ]
}

export async function searchStudent(form: StudentSearch) : Promise<PageResult<StudentItem>> {
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

export async function searchCourse(form: CourseSearch): Promise<CourseItem[]> {
    return [
        {
            id: 1,
            name: "Math",
            level: "A",
            description: "Math description",
            image: "https://images.unsplash.com/photo-1505740420928-5e560c6dc308?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
            hours: 100,
        },
        {
            id: 2,
            name: "English",
            level: "A",
            description: "English description",
            image: "https://images.unsplash.com/photo-1505740420928-5e560c6dc308?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
            hours: 100,
        },
        {
            id: 3,
            name: "Science",
            level: "A",
            description: "Science description",
            image: "https://images.unsplash.com/photo-1505740420928-5e560c6dc308?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
            hours: 100,
        },
    ]
}

