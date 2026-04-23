import 'server-only'

import { PaymentInfo } from "@/lib/model/dto/anonymous"
import { publicSearch } from '../client'

export async function getPaymentInfo(): Promise<PaymentInfo[]> {
    const response = await publicSearch(`anonymous/payment-info`)
    return await response.json()
}