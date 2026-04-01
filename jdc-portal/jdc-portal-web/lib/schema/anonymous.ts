import z from 'zod'

export const signInSchema = z.object({
    email: z.email("Please enter a valid email address"),
    password: z.string().nonempty("Please enter your password"),
})

export type SignInType = z.infer<typeof signInSchema>