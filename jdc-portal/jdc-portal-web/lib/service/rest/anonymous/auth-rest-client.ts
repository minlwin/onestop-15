import 'server-only'

import { AuthResult } from "@/lib/model/dto/anonymous";
import { MessageResult } from "@/lib/types";
import { ActivationForm, SignInForm } from "@/lib/model/schema/anonymous";
import { POST_CONFIG, publicRequest } from '../client';

export async function activate(form: Partial<ActivationForm>):Promise<MessageResult> {
    const response = await publicRequest('anonymous/activate/student', {
        ...POST_CONFIG,
        body: JSON.stringify(form)
    })
    return await response.json()
}

export async function activateEmployee(form: Partial<ActivationForm>):Promise<MessageResult> {
    const response = await publicRequest('anonymous/activate/employee', {
        ...POST_CONFIG,
        body: JSON.stringify(form)
    })
    return await response.json()
}

export async function signIn(form: SignInForm):Promise<AuthResult> {
    const response = await publicRequest('anonymous/auth/signin', {
        ...POST_CONFIG,
        body: JSON.stringify(form)
    })
    return await response.json()
}