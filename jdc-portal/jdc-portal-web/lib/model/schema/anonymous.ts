import z from 'zod'

export const signInSchema = z.object({
    email: z.email("Please enter a valid email address"),
    password: z.string().nonempty("Please enter your password"),
})

export type SignInForm = z.infer<typeof signInSchema>

export const checkRegistrationSchema = z.object({
    email: z.email("Please enter a valid email address")
})

export type CheckRegistrationForm = z.infer<typeof checkRegistrationSchema>

export const activationSchema = z.object({
    code: z.string().nonempty("Please enter the activation code"),
    password: z.string().nonempty("Please enter your password"),
    confirmPassword: z.string().nonempty("Please confirm your password")
}).refine(data => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"]
})

export type ActivationForm = z.infer<typeof activationSchema>

const IMAGES = ["image/png", "image/jpeg", "image/jpg"]

export const registrationSchema = z.object({
    classId: z.string().nonempty("Please select a class"),
    name: z.string().nonempty("Please enter your name"),
    email: z.email("Please enter a valid email address"),
    phone: z.string().nonempty("Please enter your phone number"),
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

export type RegistrationForm = z.infer<typeof registrationSchema>