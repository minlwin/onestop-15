import { SelectOption } from "@/lib/types"
import * as client from "../rest/anonymous/commons-options-client"

export async function getAttendanceStatus(): Promise<SelectOption[]> {
    return await client.getOptions('attendance-status')
}

export async function getClassTypes(): Promise<SelectOption[]> {
    return await client.getOptions('class-types')
}

export async function getCourseLevels(): Promise<SelectOption[]> {
    return await client.getOptions('course-levels')
}

export async function getFeeTypes(): Promise<SelectOption[]> {
    return await client.getOptions('fee-types')
}

export async function getPaymentStatus(): Promise<SelectOption[]> {
    return await client.getOptions('payment-status')
}

export async function getRegistrationStatus(): Promise<SelectOption[]> {
    return await client.getOptions('registration-status')
}

export async function getPaymentTypes(): Promise<SelectOption[]> {
    return await client.getOptions('payment-types')
}

export async function getPositions(): Promise<SelectOption[]> {
    return await client.getOptions('positions')
}