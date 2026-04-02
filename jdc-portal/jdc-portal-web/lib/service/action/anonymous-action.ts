'use server'

import { MessageResult } from "@/lib/model/dto/anonymous"
import { ActivationForm, CheckRegistrationForm, SignInForm } from "@/lib/model/schema/anonymous"

export async function activateAction(data: ActivationForm): Promise<MessageResult> {
    return {
        message: "Your account has been activated. You can now sign in."
    }
}

export async function checkRegistrationAction(data: CheckRegistrationForm): Promise<MessageResult> {
    
    if(data.email === "rejected@example.com") {
        return {
            message: "Your registration rejected. Please check your mail box."
        }
    }

    if(data.email === "approved@example.com") {
        return {
            message: "Your registration is already approved. Please check your mail box."
        }
    }

    return {
            message: "Your registration is still reviewing. Please wait."
    }
}

export async function signInAction(data: SignInForm): Promise<MessageResult> {

    if(data.password == "office") {
        return {
            message: "Office"
        }
    }

    return {
        message: "Student"
    }
}