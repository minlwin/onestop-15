import 'server-only'

import { CheckRegistrationForm, RegistrationForm } from "@/lib/model/schema/anonymous";
import { MessageResult } from '@/lib/types';
import { POST_CONFIG, publicRequest } from '../client';
import { formData } from '@/lib/utils';

export async function apply(form: RegistrationForm): Promise<MessageResult> {
    const response = await publicRequest('anonymous/registrations/apply', {
        method: 'POST',
        body: formData(form)
    })
    return await response.json()
}

export async function check(data: CheckRegistrationForm): Promise<MessageResult> {
    const response = await publicRequest('anonymous/registrations/check', {
        ...POST_CONFIG,
        body: JSON.stringify(data)
    })
    return await response.json()
}   