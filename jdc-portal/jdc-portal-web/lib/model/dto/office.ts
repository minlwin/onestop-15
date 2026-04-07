export type PositionItem = {
    code : string
    name : string
}

export type EmployeeItem = {
    id: number
    name: string
    position: PositionItem 
    phone: string
    email: string
    entryAt: string
    resignAt?: string
}

export type StudentItem = {
    id: number
    name: string
    email: string
    phone: string
    entryAt: string
}