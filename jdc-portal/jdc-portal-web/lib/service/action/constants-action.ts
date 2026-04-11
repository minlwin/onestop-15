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
        {value: "Campus", label: "Campus"},
        {value: "Zoom", label: "Zoom"},
        {value: "Video", label: "Video"},
        {value: "Online", label: "Online"},
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
        {value: "Registration", label: "Registration"}
    ]
}

export async function getPaymentStatus(): Promise<SelectOption[]> {
    return [
        {value: "Pending", label: "Pending"},
        {value: "Paid", label: "Paid"},
        {value: "Retry", label: "Retry"}
    ]
}

export async function getRegistrationStatus(): Promise<SelectOption[]> {
    return [
        {value: "Pending", label: "Pending"},
        {value: "Approved", label: "Approved"},
        {value: "Rejected", label: "Rejected"}
    ]
}

export async function getPaymentTypes(): Promise<SelectOption[]> {
    return [
        {value: "Office", label: "Office"},
        {value: "Banking", label: "Banking"},
        {value: "eWallet", label: "eWallet"}
    ]
}

export async function getPositions(): Promise<SelectOption[]> {
    return [
        {value: "Office", label: "Office"},
        {value: "Teacher", label: "Teacher"}
    ]
}