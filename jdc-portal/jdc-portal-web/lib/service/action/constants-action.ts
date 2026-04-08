import { SelectOption } from "@/lib/types"

export async function getAttendanceStatus(): Promise<SelectOption[]> {
    return [
        {value: "Present", label: "Present"},
        {value: "Absent", label: "Absent"},
        {value: "Late", label: "Late"},
        {value: "Early Out", label: "Early Out"},
        {value: "Leave", label: "Leave"}
    ]
}

export async function getClassTypes(): Promise<SelectOption[]> {
    return [
        {value: "Private", label: "Private"},
        {value: "Group", label: "Group"}
    ]
}

export async function getCourseLevels(): Promise<SelectOption[]> {
    return [
        {value: "Beginner", label: "Beginner"},
        {value: "Intermediate", label: "Intermediate"},
        {value: "Advanced", label: "Advanced"}
    ]
}

export async function getFeeTypes(): Promise<SelectOption[]> {
    return [
        {value: "Monthly", label: "Monthly"},
        {value: "Yearly", label: "Yearly"}
    ]
}

export async function getPaymentStatus(): Promise<SelectOption[]> {
    return [
        {value: "Paid", label: "Paid"},
        {value: "Unpaid", label: "Unpaid"}
    ]
}

export async function getPaymentTypes(): Promise<SelectOption[]> {
    return [
        {value: "KBZ Pay", label: "KBZ Pay"},
        {value: "AYA Pay", label: "AYA Pay"},
        {value: "WAVE Pay", label: "WAVE Pay"}
    ]
}

export async function getPositions(): Promise<SelectOption[]> {
    return [
        {value: "Office", label: "Office"},
        {value: "Student", label: "Student"}
    ]
}