import 'server-only'

import { ClassDetails, ClassInfo } from "@/lib/model/dto/anonymous";
import { POST_CONFIG, publicSearch } from '../client';

export async function findForCourse(courseId: any) : Promise<ClassInfo[]> {
    const response = await publicSearch('anonymous/classes', {
        "courseId": courseId
    })
    return await response.json()
}


export async function findById(id: any):Promise<ClassDetails> {
    const response = await publicSearch(`anonymous/classes/${id}`)
    return await response.json()
}