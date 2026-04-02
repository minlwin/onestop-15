export type CourseItem = {
    id: number
    name: string
    level?: string
    description?: string
    image?: string
    hours?: number
}

export type Course = {
    id: number
    name: string
    level?: string
    description?: string
    image?: string
    hours?: number
    contents: CourseContent[]
    classes: ClassInfo[]
}

export type CourseContent = {
    id: number
    name: string
    description: string
}

export type ClassInfo = {
    id: number
    type : string
    startDate : string
    days: string
    time: string
    months: number
    registrationFee: number
    monthlyFee: number
}

export type MessageResult = {
    message: string
}