import { IMAGES } from "@/lib/utils";
import z from "zod";

export const joinClassSchema = z.object({
    classId: z.string().nonempty("Please select a class"),
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

export type JoinClassForm = z.infer<typeof joinClassSchema>
