import 'server-only'

import { CheckRegistrationForm, RegistrationForm } from "@/lib/model/schema/anonymous";
import { MessageResult } from '@/lib/types';

export async function apply(form: RegistrationForm): Promise<MessageResult> {
    return {
        message: "Your registration is still reviewing. We will send you an email. Please wait."
    }
}

export async function check(data: CheckRegistrationForm): Promise<MessageResult> {
    
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