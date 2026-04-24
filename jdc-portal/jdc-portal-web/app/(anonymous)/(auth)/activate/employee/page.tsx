'use client'

import PageTitle from "@/components/app/page-title";
import FormsInput from "@/components/forms/forms-input";
import { Button } from "@/components/ui/button";
import { ActivationForm, activationSchema } from "@/lib/model/schema/anonymous";
import { safeCall } from "@/lib/safe-call";
import { activateEmployeeAction } from "@/lib/service/action/anonymous-action";
import { zodResolver } from "@hookform/resolvers/zod";
import { Key } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

export default function ActivationPage() {

    const router = useRouter()

    const form = useForm<ActivationForm>({
        resolver: zodResolver(activationSchema),
        defaultValues: {
            email: '',
            code: '',
            password: '',
            confirmPassword: ''
        }
    })

    const onSubmit = async (data: ActivationForm) => {
        await safeCall(async () => {
            const { confirmPassword, ...form } = data
            const result = await activateEmployeeAction(form);
            router.replace(`/signin/employee?message=${result.message}`)
        })
    }

    return (
        <section className="space-y-8">
            <PageTitle title="Employee Activation" />

            <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormsInput control={form.control} name="email" type="email" label="Email Address" className="mb-3" />
                <FormsInput control={form.control} name="code" type="text" label="Activation Code" className="mb-3" />  
                <FormsInput control={form.control} name="password" type="password" label="Password" className="mb-3" />
                <FormsInput control={form.control} name="confirmPassword" type="password" label="Confirm Password" className="mb-3" />

                <Button type="submit">
                    <Key /> Activate
                </Button>
            </form>
        </section>
    )
}