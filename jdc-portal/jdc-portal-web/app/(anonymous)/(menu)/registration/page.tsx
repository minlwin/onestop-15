'use client'

import ClassDecorateLayout from "@/components/app/class-decorate"
import Loading from "@/components/app/loading"
import PaySlip from "@/components/app/pay-slip"
import FormsInput from "@/components/forms/forms-input"
import FormsSelect from "@/components/forms/forms-select"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PaymentInfo } from "@/lib/model/dto/anonymous"
import { RegistrationForm, registrationSchema } from "@/lib/model/schema/anonymous"
import { safeCall } from "@/lib/safe-call"
import { applyRegistrationAction, fetchPaymentInfoAction } from "@/lib/service/action/anonymous-action"
import { zodResolver } from "@hookform/resolvers/zod"
import { Upload, UserPlus } from "lucide-react"
import { useSearchParams } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import { useForm } from "react-hook-form"

export default function RegistrationPage() {

    const params = useSearchParams()
    const classId = params.get('classId')

    if (!classId) {
        return <Loading />
    }

    return (
        <ClassDecorateLayout classId={classId} title="Student Registration">
            <RegistrationFormComponent classId={classId} />
        </ClassDecorateLayout>
    )
}


function RegistrationFormComponent({ classId }: { classId: string }) {

    const [result, setResult] = useState<string>()
    const [paymentInfos, setPaymentInfos] = useState<PaymentInfo[]>([])
    const paymentOption = paymentInfos.map(a => ({ label: `${a.name} : ${a.accountNumber} - ${a.accountName}`, value: a.code }))
    paymentOption.unshift({ label: 'Select Payment', value: '' })

    useEffect(() => {
        const loadData = async () => {
            await safeCall(async () => { 
                const result = await fetchPaymentInfoAction()
                setPaymentInfos(result)
            })
        }
        loadData()
    }, [])

    const form = useForm<RegistrationForm>({
        resolver: zodResolver(registrationSchema),
        defaultValues: {
            classId: classId,
            name: '',
            email: '',
            phone: '',
            payment: '',
            paymentSlip: undefined
        }
    })

    const onSubmit = async (data: RegistrationForm) => {
        const result = await applyRegistrationAction(data);
        setResult(result.message)
    }

    const { ref, ...slipPorps } = form.register('paymentSlip')
    const fileInput = useRef<HTMLInputElement>(null)

    const selectFile = () => {
        fileInput.current?.click()
    }

    const files = form.watch('paymentSlip')

    if (result) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>Registration Result</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-gray-800">{result}</p>
                </CardContent>
            </Card>
        )
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Registration Form</CardTitle>
                <CardDescription>Please pay the registration fee and upload the payment slip. Fill in your information correctly.</CardDescription>
            </CardHeader>

            <CardContent>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <input type="file" {...slipPorps} ref={e => {
                        ref(e)
                        fileInput.current = e
                    }} className="hidden" />

                    <FormsInput control={form.control} name="name" type="text" label="Name" />
                    <FormsInput control={form.control} name="phone" type="text" label="Phone Number" />
                    <FormsInput control={form.control} name="email" type="email" label="Email Address" />
                    <FormsSelect control={form.control} name="payment" label="Payment Account" options={paymentOption} />

                    {files && files[0] &&
                        <PaySlip file={files[0]} />
                    }

                    <div>
                        <Button type="button" onClick={selectFile}>
                            <Upload /> Upload Payment Slip
                        </Button>

                        {form.formState.isValid &&
                            <Button type="submit">
                                <UserPlus /> Register
                            </Button>
                        }
                    </div>
                </form>
            </CardContent>
        </Card>
    )
}