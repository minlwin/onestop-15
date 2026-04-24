'use client'

import PageTitle from "@/components/app/page-title";
import FormsInput from "@/components/forms/forms-input";
import { Button } from "@/components/ui/button";
import { CheckRegistrationForm, checkRegistrationSchema } from "@/lib/model/schema/anonymous";
import { safeCall } from "@/lib/safe-call";
import { checkRegistrationAction } from "@/lib/service/action/anonymous-action";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Check } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function StatusConfirmationPage() {

    const [message, setMessage] = useState('');

    const form = useForm<CheckRegistrationForm>({
        resolver: zodResolver(checkRegistrationSchema),
        defaultValues: {
            email: ''
        }
    })

    const onSubmit = async(data: CheckRegistrationForm) => {
        await safeCall(async () => {
            const result = await checkRegistrationAction(data);
            result.message && setMessage(result.message)
        })
    }

    const onBack = () => {
        setMessage('');
    }

    return (
        <section className="space-y-8">
            <PageTitle title="Check Your Registration" />

            {message && 
                <section>
                    <div className="mb-8">
                        <p className="text-red-500">{message}</p>
                    </div>
                    <Button onClick={onBack}>
                        <ArrowLeft /> Back
                    </Button>
                </section>
            }

            {message !== '' || 
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <FormsInput control={form.control} name="email" type="email" label="Email Address" className="mb-3" />
                    <Button type="submit">
                        <Check /> Check
                    </Button>
                </form>
            }
        </section>
    )
}