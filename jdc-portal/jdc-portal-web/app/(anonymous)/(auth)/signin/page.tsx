'use client'

import PageTitle from "@/components/app/page-title"
import FormsInput from "@/components/forms/forms-input"
import { Button } from "@/components/ui/button"
import { SignInForm, signInSchema } from "@/lib/model/schema/anonymous"
import { signInAction } from "@/lib/service/action/anonymous-action"
import { zodResolver } from "@hookform/resolvers/zod"
import { LogIn } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"

export default function SignInPage() {

    const router = useRouter()
    const searchParams = useSearchParams()
    
    const form = useForm<SignInForm>({
        resolver: zodResolver(signInSchema),
        defaultValues: {
            email: '',
            password: ''
        }
    })

    const onSubmit = async (data: SignInForm) => {
        const result = await signInAction(data);
        router.replace(`${result.message.toLocaleLowerCase()}`)
    }

    return (
        <section className="space-y-8">
            <PageTitle title="Sign In" />
            {searchParams.get('message') && 
                <p className="text-red-500">{searchParams.get('message')}</p> 
            }
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormsInput control={form.control} name="email" type="email" label="Email Address" className="mb-3" />
                <FormsInput control={form.control} name="password" type="password" label="Password" className="mb-3" />

                <Button type="submit">
                    <LogIn /> Sign In
                </Button>
            </form>
        </section>
    )
}