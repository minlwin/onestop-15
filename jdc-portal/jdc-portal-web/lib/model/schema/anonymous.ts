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