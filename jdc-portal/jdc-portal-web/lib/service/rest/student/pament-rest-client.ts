import { PaymentDetails, PaymentItem } from '@/lib/model/dto/students'
import { PaymentForm } from '@/lib/model/schema/students'
import { DataModificationResult } from '@/lib/types'
import 'server-only'
import { POST_CONFIG, securedRequest, securedSearch } from '../client'
import { formData } from '@/lib/utils'

export async function paid(form: PaymentForm) : Promise<DataModificationResult<string>> {
    const result = await securedRequest(`student/payments`, {
        ...POST_CONFIG,
        body: formData(form)
    })
    return await result.json()    
}

export async function search(form : {classId? : string}) : Promise<PaymentItem[]> {
    const result = await securedSearch(`student/payments`, form)
    return await result.json()    
}

export async function findById(id : string) : Promise<PaymentDetails> {
    const result = await securedSearch(`student/payments/${id}`)
    return await result.json()    
}