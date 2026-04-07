import { IMAGES } from "@/lib/utils";
import z from "zod";

export const paymentSchema = z.object({
    classId: z.string().nonempty("Please select a class"),
    feeType: z.string().nonempty("Please select a fee type"),
    amount: z.number().nonnegative("Please enter a valid amount"),
    payment: z.string().nonempty("Please select a payment type"),
    paymentSlip: z.any()
        .refine(files => files?.length > 0, {
            message: "Please upload your payment slip",
            path: ["paymentSlip"]
        })
        .refine(files => files?.[0]?.type && IMAGES.includes(files?.[0]?.type) , {
            message: "Please upload a valid image file",
            path: ["paymentSlip"]
        })    
})

export type PaymentForm = z.infer<typeof paymentSchema>