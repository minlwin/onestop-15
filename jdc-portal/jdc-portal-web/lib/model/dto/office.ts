import { CourseContent } from "./anonymous"

export type AuditInfo = {
    createdAt: string
    createdBy: string
    modifiedAt: string
    modifiedBy: string
}

export type CountInformation = {
    name: string
    count: number
}

export type EmployeeItem = {
    id: number
    name: string
    position: string 
    phone: string
    email: string
    entryAt: string
    resignAt?: string
}

export type EmployeeDetails = EmployeeItem & AuditInfo

export type StudentItem = {
    id: number
    name: string
    email: string
    phone: string
    entryAt: string
}

export type CourseDetails = {
    id: number
    name: string
    level: string
    hours: number
    description: string,
    contents: CourseContent[]
} & AuditInfo

export type ClassItem = {
    id: number
    type: string
    course: string
    courseLevel: string
    startDate: string
    months: number
}

export type ClassDetails = {
    id: number
    type: string
    course: string
    courseLevel: string
    startDate: string
    months: number
    registrationFee: number
    monthlyFee: number
    days: string
    time: string
} & AuditInfo

export type RegistrationItem = {
    id: number
    course: string
    startDate: string
    classType: string
    studentName: string
    email: string
    phone: string
    status: 'Applied' | 'Approved' | 'Canceled'
    registerAt: string
}

export type PaymentItem = {
    id: number
    course: string
    startDate: string
    classType: string
    studentName: string
    email: string
    phone: string
    paymentDate: string
    paymentType: 'Office' | 'KBZ Pay' | 'Wave Pay' | 'AYA Pay'
    amount: number
    status: 'Pending' | 'Paid' | 'Retry'
    particular: 'Registration Fee' | 'Monthly Fee'
}