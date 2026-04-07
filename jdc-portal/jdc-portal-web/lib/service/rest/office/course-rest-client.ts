import 'server-only'
import { CourseItem } from "@/lib/model/dto/anonymous";
import { CourseForm, CourseSearch } from "@/lib/model/schema/office";
import { DataModificationResult } from '@/lib/types';

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