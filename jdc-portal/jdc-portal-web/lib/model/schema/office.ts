import { PageSearch } from "@/lib/types"
import z from "zod"

export type EmployeeSearch = {
    position? : string
    keyword? : string
}

export const employeeSchema = z.object({
    position: z.string().nonempty("Please select a position"),
    name: z.string().nonempty("Please enter your name"),
    email: z.email("Please enter a valid email address"),
    phone: z.string().nonempty("Please enter your phone number"),
    entryAt: z.string().nonempty("Please enter your entry date")
})

export type EmployeeForm = z.infer<typeof employeeSchema>

export type StudentSearch = {
    classId? : string
    entryFrom? : string
    entryTo? : string
    keyword? : string
} & PageSearch

export type CourseSearch = {
    keyword? : string
}

export const courseSchema = z.object({
    course: z.string().nonempty("Please enter a course"),
    courseLevel: z.string().nonempty("Please enter a course level"),
    hours: z.number().nonnegative("Please enter a valid number"),
    description: z.string().nonempty("Please enter a course description"),
    contents: z.array(z.object({
        name: z.string().nonempty("Please enter a content name"),
        description: z.string().nonempty("Please enter a content description")
    })).nonempty("Please enter at least one content")
})

export type CourseForm = z.infer<typeof courseSchema>

export type ClassSearch = {
    studentId? : string
    course? : string
    type? : string
    startFrom? : string
    startTo? : string
    keyword? : string
} & PageSearch

export const classSchema = z.object({
    type: z.string().nonempty("Please select a class type"),
    course: z.string().nonempty("Please select a course"),
    startDate: z.string().nonempty("Please select a start date"),
    months: z.number().nonnegative("Please enter a valid number"),
    days: z.array(z.string()).nonempty("Please select at least one day"),
    timeFrom : z.string().nonempty("Please select a start time"),
    timeTo : z.string().nonempty("Please select an end time"),
    registrationFee: z.number().nonnegative("Please enter a valid number"),
    monthlyFee: z.number().nonnegative("Please enter a valid number")
})

export type ClassForm = z.infer<typeof classSchema>

export type RegistrationSearch = {
    classType? : string
    status?: string
    dateFrom? : string
    dateTo? : string
    keyword? : string
} & PageSearch

export const registrationSchema = z.object({
    classId: z.string().nonempty("Please select a class"),
    name: z.string().nonempty("Please enter student name"),
    email: z.email("Please enter a valid email address"),
    phone: z.string().nonempty("Please enter student phone number"),
    registrationFee: z.number().nonnegative("Please enter a valid number"),
})

export type RegistrationForm = z.infer<typeof registrationSchema>

export type PaymentSearch = {
    classId? : string
    studentId? : string
    classType? : string
    feeType? : string
    paymentType? : string
    status? : string
    dateFrom? : string
    dateTo? : string
    keyword? : string
} & PageSearch

export const paymentSchema = z.object({
    classId: z.string().nonempty("Please select a class"),
    studentId: z.string().nonempty("Please select a student"),
    amount: z.number().nonnegative("Please enter a valid number"),
})

export type PaymentForm = z.infer<typeof paymentSchema>