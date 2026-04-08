export type EmployeeItem = {
    id: number
    name: string
    position: string 
    phone: string
    email: string
    entryAt: string
    resignAt?: string
}

export type EmployeeDetails = EmployeeItem & {
    createdAt: string
    createdBy: string
    modifiedAt: string
    modifiedBy: string
}

export type StudentItem = {
    id: number
    name: string
    email: string
    phone: string
    entryAt: string
}

export type ClassItem = {
    id: number
    type: string
    course: string
    courseLevel: string
    startDate: string
    months: number
}

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
    status: 'Pending' | 'Paid' | 'Retry'
    particular: 'Registration Fee' | 'Monthly Fee'
}