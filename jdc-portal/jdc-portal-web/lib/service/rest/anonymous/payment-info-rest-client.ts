import 'server-only'

import { PaymentInfo } from "@/lib/model/dto/anonymous"

export async function getPaymentInfo(): Promise<PaymentInfo[]> {
    return [
        {
            code: "kpay",
            name: "KBZ Pay",
            accountNumber: "123456789",
            accountName: "John Doe"
        },
        {
            code: "ayapay",
            name: "AYA Pay",
            accountNumber: "123456789",
            accountName: "John Doe"
        },
        {
            code: "wavepay",
            name: "WAVE Pay",
            accountNumber: "123456789",
            accountName: "John Doe"
        },
    ]}