'use server'

import { ClassDetails, ClassInfo, CourseDetails, PaymentInfo } from "@/lib/model/dto/anonymous"
import { ActivationForm, CheckRegistrationForm, RegistrationForm, SignInForm } from "@/lib/model/schema/anonymous"
import * as paymentInfoApi from "../rest/anonymous/payment-info-rest-client"
import * as courseApi from "../rest/anonymous/courses-rest-client"
import * as authApi from "../rest/anonymous/auth-rest-client"
import * as registrationApi from "../rest/anonymous/registration-rest-client"
import * as classApi from "../rest/anonymous/class-rest-client"
import { MessageResult } from "@/lib/types"
import { setAuthResult } from "@/lib/model/login-user"

export async function activateAction(data: ActivationForm): Promise<MessageResult> {
    return await authApi.activate(data)
}


export async function activateEmployeeAction(data: ActivationForm): Promise<MessageResult> {
    return await authApi.activateEmployee(data)
}

export async function signInAction(data: SignInForm): Promise<MessageResult> {
    const result = await authApi.signIn(data)

    if(result.role.some(r => r === 'Student')) {
        // Set Auth Result
        await setAuthResult(result, '/student')
        return {
            message: '/student'
        }
    }

    throw "Invalid Role"
}

export async function employeeSignInAction(data: SignInForm): Promise<MessageResult> {
    const result = await authApi.signIn(data)

    if(result.role.some(r => r === 'Office' || r === 'Admin')) {
        // Set Auth Result
        await setAuthResult(result, '/office')
        return {
            message: '/office'
        }
    }

    throw "Invalid Role"
}

export async function findCourseAction(id: any):Promise<CourseDetails> {
    return await courseApi.findById(id)
}

export async function findClassForCourseAction(classId: any):Promise<ClassInfo[]> {
    return await classApi.findForCourse(classId)
}

export async function findClassAction(id: any):Promise<ClassDetails> {
    return await classApi.findById(id)
}


export async function applyRegistrationAction(form: RegistrationForm): Promise<MessageResult> {
    return await registrationApi.apply(form)
}


export async function checkRegistrationAction(data: CheckRegistrationForm): Promise<MessageResult> {
    return await registrationApi.check(data)
}


export async function fetchPaymentInfoAction():Promise<PaymentInfo[]> {
    return await paymentInfoApi.getPaymentInfo()
} 