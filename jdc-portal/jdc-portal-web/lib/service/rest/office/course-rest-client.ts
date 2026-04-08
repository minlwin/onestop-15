import 'server-only'
import { CourseItem } from "@/lib/model/dto/anonymous";
import { CourseForm, CourseSearch } from "@/lib/model/schema/office";
import { DataModificationResult } from '@/lib/types';
import { CourseDetails } from '@/lib/model/dto/office';

export async function search(form: CourseSearch): Promise<CourseItem[]> {
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

export async function create(form: CourseForm): Promise<DataModificationResult<string>> {
    return {
        id: "1234"
    }
}

export async function update(id: string, form: CourseForm): Promise<DataModificationResult<string>> {
    return {
        id: "1234"
    }
}

export async function findDetails(id: string) : Promise<CourseDetails> {
    return {
        id: 1,
        name: "Math",
        level: "Beginner",
        hours: 100,
        description: "Math description",
        contents: [
            {
                id: 1,
                name: "Math Foundation",
                description: "Basics of Math",
            },
            {
                id: 2,
                name: "OOP",
                description: "Object-Oriented Programming concepts",
            },
            {
                id: 3,
                name: "Spring Boot",
                description: "Build RESTful APIs with Spring Boot",
            }
        ],
        createdAt: "2023-01-01",
        modifiedAt: "2023-01-01",
        createdBy: "John Doe",
        modifiedBy: "John Doe"
    }
}

export async function findForm(id: string) : Promise<CourseForm> {
    return {
        course: "Math",
        courseLevel: "Beginner",
        hours: 100,
        description: "Math description",
        contents: [
            {
                name: "Math Foundation",
                description: "Basics of Math",
            },
            {
                name: "OOP",
                description: "Object-Oriented Programming concepts",
            },
            {
                name: "Spring Boot",
                description: "Build RESTful APIs with Spring Boot",
            }
        ],
    }    
}
