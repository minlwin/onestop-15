'use client'

import PageTitle from "@/components/app/page-title";
import FormsInput from "@/components/forms/forms-input";
import { Button } from "@/components/ui/button";
import { ActivationForm, activationSchema } from "@/lib/model/schema/anonymous";
import { activateAction } from "@/lib/service/action/anonymous-action";
import { zodResolver } from "@hookform/resolvers/zod";
import { Key, Shield } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

export default function ActivationPage() {

    const router = useRouter()

    const form = useForm<ActivationForm>({
        resolver: zodResolver(activationSchema),
        defaultValues: {
            code: '',
            password: '',
            confirmPassword: ''
        }
    })

    const onSubmit = async (data: ActivationForm) => {
        const result = await activateAction(data);
        router.replace(`/signin?message=${result.message}`)
    }

    return (
        <section className="space-y-8">
            <PageTitle title="Account Activation" />

            <form onSubmit={form.handleSubmit(onSubmit)}>
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