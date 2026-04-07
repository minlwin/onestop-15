'use server'

import { AttendanceItem, AttendClassSummary, ClassItem, PaymentDetails, PaymentItem, ProfileInfo } from "@/lib/model/dto/students"
import { PaymentForm } from "@/lib/model/schema/students"

import * as profileApi from "../rest/student/profile-rest-client"
import * as attendanceApi from "../rest/student/attendance-rest-client"
import * as classApi from "../rest/student/class-rest-client"
import * as paymentApi from '../rest/student/pament-rest-client'
import { DataModificationResult } from "@/lib/types"

export async function loadProfileAction(): Promise<ProfileInfo> {
    return await profileApi.getProfile()
}

export async function loadClassesAction(): Promise<ClassItem[]> {
    return await classApi.findMyClasses()
}

export async function loadAvailableClassesAction(): Promise<ClassItem[]> {
    return await classApi.findAvailableClasses()
}

export async function fetchAttendClassSummary(classId: any): Promise<AttendClassSummary> {
    return await classApi.findSummary(classId)
}

export async function featchAttendanceForClass(classId: any) : Promise<AttendanceItem[]> {
    return await attendanceApi.search(classId)
}

export async function loadPaymentHistoryAction(): Promise<PaymentItem[]> {
    return await paymentApi.search({})
}

export async function fetchPaymentsForClass(classId: any): Promise<PaymentItem[]> {
    return await paymentApi.search({classId: classId})
}

export async function paidAction(form: PaymentForm) : Promise<DataModificationResult<string>> {
    return await paymentApi.paid(form)
}

export async function getPaymentDetails(id : string) : Promise<PaymentDetails> {
    return await paymentApi.findById(id)
}