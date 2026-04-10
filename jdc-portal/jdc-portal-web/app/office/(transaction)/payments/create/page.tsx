'use client'
import OfficePageDecorator from "@/app/office/_widgets/office-page-decorate";
import PageTitle from "@/components/app/page-title";
import { PAYMENT_SEGMENTS } from "@/lib/segments";
import SelectClass from "./_widgets/select-class";
import SelectStudent from "./_widgets/select-student";
import { useForm } from "react-hook-form";
import { PaymentForm, paymentSchema } from "@/lib/model/schema/office";
import { zodResolver } from "@hookform/resolvers/zod";
import SubTitle from "@/components/app/sub-title";
import FormsInput from "@/components/forms/forms-input";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { ClassItem } from "@/lib/model/dto/office";
import { useRouter } from "next/navigation";
import { createPayment } from "@/lib/service/action/office-action";

export default function PaymentInOfficePage() {

    const form = useForm<PaymentForm>({
        resolver: zodResolver(paymentSchema),
        defaultValues: {
            classId: "",
            studentId: "",
            amount: 0
        }
    })

    const classId = form.watch("classId")

    const onClassSelect = (data?: ClassItem) => {
        form.setValue("classId", data?.id.toString() || "", {shouldValidate: true})
        form.setValue("amount", data?.monthlyFee || 0, {shouldValidate: true})
    }

    const router = useRouter()

    const onSubmit = async (data: PaymentForm) => {
        const result = await createPayment(data)
        router.replace(`/office/payments/${result.id}`)
    }

    return (
        <OfficePageDecorator name="Record Payment" segments={PAYMENT_SEGMENTS}>
            <header>
                <PageTitle title="Record Payment" />
                <span className="text-sm text-gray-500">Record Payment for new student who came to office and paid monthly fee in cache.</span>
            </header>

            <SelectClass onSelectClass={onClassSelect} />

            {classId !== "" && (
                <>
                    <SelectStudent classId={classId} onSelect={id => form.setValue("studentId", id?.toString() || "", {shouldValidate: true})} />

                    <section className="space-y-3">
                        <SubTitle title="Payment Information" />
                        <form onSubmit={form.handleSubmit(onSubmit)} className="grid md:grid-cols-4 gap-4">
                            <FormsInput control={form.control} name="amount" label="Monthly Fee" type="number" />
                            <div className="col-start-1">
                                <Button type="submit" disabled={!form.formState.isValid}>
                                    <Check /> Record Payment
                                </Button>
                            </div>
                        </form>
                    </section>   

                </>
            )}
        </OfficePageDecorator>
    )
}
