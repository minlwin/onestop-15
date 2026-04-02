'use client'

import PageTitle from "@/components/app/page-title";
import FormsInput from "@/components/forms/forms-input";
import { Button } from "@/components/ui/button";
import { CheckRegistrationForm, checkRegistrationSchema } from "@/lib/model/schema/anonymous";
import { checkRegistrationAction } from "@/lib/service/action/anonymous-action";
import { zodResolver } from "@hookform/resolvers/zod";
import { section } from "framer-motion/client";
import { ArrowLeft, Check } from "lucide-react";
import { Arrow } from "radix-ui/internal";
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
        const response = await checkRegistrationAction(data);
        response.message && setMessage(response.message)
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