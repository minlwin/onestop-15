import { PageSearch } from "@/lib/types"

export type EmployeeSearch = {
    position? : string
    keyword? : string
}

export type StudentSearch = {
    entryFrom? : string
    entryTo? : string
    keyword? : string
} & PageSearch

export type CourseSearch = {
    keyword? : string
}

export type ClassSearch = {
    type? : string
    startFrom? : string
    startTo? : string
    keyword? : string
} & PageSearch

export type RegistrationSearch = {
    classType? : string
    dateFrom? : string
    dateTo? : string
    keyword? : string
} & PageSearch

export type PaymentSearch = {
    classType? : string
    feeType? : string
    paymentType? : string
    status? : string
    dateFrom? : string
    dateTo? : string
    keyword? : string
} & PageSearch
