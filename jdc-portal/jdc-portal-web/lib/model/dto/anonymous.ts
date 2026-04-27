export type Role = 'Student' | 'Office' | 'Admin'
export type AuthResult = {
    email: string
    name : string
    role : Role[]
    accessToken: string
    refreshToken: string
}

export type CourseItem = {
    id: number
    name: string
    level?: string
    description?: string
    image?: string
    hours?: number
}

export type CourseDetails = CourseItem & {
    contents: CourseContent[]
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

export type ClassDetails = ClassInfo & {
    course: CourseItem
}

export type PaymentInfo = {
    code : string
    name : string
    accountNumber : string
    accountName : string
}

export type ApplicationError = {
    type: 'Client' | 'Server'
    messages: string[]
}