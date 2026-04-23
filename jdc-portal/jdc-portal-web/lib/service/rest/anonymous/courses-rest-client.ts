import 'server-only'

import { CourseDetails, CourseItem } from '../../../model/dto/anonymous'
import { publicSearch } from '../client'

export async function getCourses(): Promise<CourseItem[]> {
    const response = await publicSearch('anonymous/courses')
    return await response.json()
}

export async function findById(id: number): Promise<CourseDetails> {
    const response = await publicSearch(`anonymous/courses/${id}`)
    return await response.json()
}