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
    activatedAt?: string
}

export type StudentDetails = StudentItem & AuditInfo

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
    registrationFee: number
    monthlyFee: number
}

export type ClassForStudent = {
    classId: number
    studentId: number
    type: string
    course: string
    startDate: string
    registrationFee: number
    monthlyFee: number
    months: number
    attended: number
    late: number
    absent: number
    leave: number
    lastPayment: number
    paidFees: number
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
    studentId: number
    classId: number
    course: string
    startDate: string
    classType: string
    studentName: string
    email: string
    phone: string
    status: 'Applied' | 'Approved' | 'Canceled'
    registerAt: string
    rejectReason?: string
}

export type RegistrationDetails = RegistrationItem & AuditInfo & {
    paymentType: 'Office' | 'KBZ Pay' | 'Wave Pay' | 'AYA Pay'
    paymentDate: string
    amount: number
    paySlip?: string
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
    rejectReason?: string
}

export type PaymentDetails = PaymentItem & AuditInfo & {
    paySlip?: string
}