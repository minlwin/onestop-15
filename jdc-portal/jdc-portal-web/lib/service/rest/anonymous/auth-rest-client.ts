import 'server-only'

import { AuthResult, MessageResult } from "@/lib/model/dto/anonymous";
import { ActivationForm, SignInForm } from "@/lib/model/schema/anonymous";

export async function activate(form: ActivationForm):Promise<MessageResult> {
    return {
        message: "Your account has been activated. You can now sign in."
    }
}

export async function signIn(data: SignInForm):Promise<AuthResult> {
    return {
        email: "0qVhM@example.com",
        name: "John Doe",
        role: "Student",
        accessToken: "accessToken",
        refreshToken: "refreshToken"
    }
}

export async function refreshToken(token : string) : Promise<AuthResult> {
    return {
        email: "0qVhM@example.com",
        name: "John Doe",
        role: "Student",
        accessToken: "accessToken",
        refreshToken: "refreshToken"
    }
}