export type ProfileInfo = {
    id: number,
    name: string,
    email: string,
    phone: string
}

export type ClassItem = {
    id: number,
    type: string,
    course: string,
    startDate: string,
    discription: string
}

export type PaymentItem = {
    id: string
    classId: number
    className: string
    paymentDate: string
    amount: number
    paymentType: 'In Hand' | 'KPay' | 'Wave Pay' | 'AYA Pay'
    status: 'Un Paid' | 'Pending' | 'Completed'
    particular: 'Registration Fee' | 'Monthly Fee'
}