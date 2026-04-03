'use client'

import HighlightInfo from "@/components/app/highlight-info"
import Loading from "@/components/app/loading"
import PageTitle from "@/components/app/page-title"
import FormsInput from "@/components/forms/forms-input"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ClassDetails } from "@/lib/model/dto/anonymous"
import { RegistrationForm, registrationSchema } from "@/lib/model/schema/anonymous"
import { applyRegistrationAction, findClassAction } from "@/lib/service/action/anonymous-action"
import { zodResolver } from "@hookform/resolvers/zod"
import { Upload, UserPlus } from "lucide-react"
import { useSearchParams } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import { useForm } from "react-hook-form"

export default function RegistrationPage() {

    const params = useSearchParams()
    const classId = params.get('classId')

    const [classInfo, setClassInfo] = useState<ClassDetails>()

    useEffect(() => {
        const fetchClass = async () => {
            const response = await findClassAction(classId)
            setClassInfo(response)
        }
        fetchClass()
    }, [classId])

    if (!classInfo || !classId) {
        return <Loading />
    }

    return (
        <main className="space-y-4">
            <PageTitle title="Student Registration" />
            <section className="flex gap-8 flex-col md:flex-row">
                <ClassInfoComponent info={classInfo}  className="flex-1"/>
                <RegistrationFormComponent classId={classId} className="flex-1" />
            </section>
        </main>
    )
}

function ClassInfoComponent({info, className} : {info: ClassDetails, className?: string}) {
    
    // Date (YYYY-MM-DD) to Momth with MMM (Like July)
    const startMonth  = new Date(info.startDate).toLocaleString('default', { month: 'long' })
    
    return (
        <div className={className}>
            <Card className={className}>
                <CardHeader>
                    <CardTitle>{info.course.name} - {startMonth} Intake</CardTitle>
                    <CardDescription>{info.course.description}</CardDescription>
                    <CardAction>
                        <Badge>{info.type}</Badge>
                    </CardAction>
                </CardHeader>

                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <HighlightInfo label="Start Date" value={info.startDate || ''} />
                        <HighlightInfo label="Days" value={info.days || ''} />
                        <HighlightInfo label="Time" value={info.time || ''} />
                    </div>

                    <CardTitle className="mt-4 mb-2">Fees Information</CardTitle>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <HighlightInfo label="Registration Fee" value={`${info.registrationFee} MMK`} />
                        <HighlightInfo label="Monthly Fee" value={`${info.monthlyFee} MMK`} />
                    </div>

                    <CardTitle className="mt-4 mb-2">Duration</CardTitle>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <HighlightInfo label="Months" value={`${info.months}`} />
                    </div>
                </CardContent>
            </Card>

        </div>
    )
}

function RegistrationFormComponent({classId, className} : {classId: string, className?: string}) {

    const [result, setResult] = useState<string>()

    const form = useForm<RegistrationForm>({
        resolver: zodResolver(registrationSchema),
        defaultValues: {
            classId: classId,
            name: '',
            email: '',
            phone: '',
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

    if(result) {
        return (
            <div className={className}>
                <Card>
                    <CardHeader>
                        <CardTitle>Registration Result</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-gray-800">{result}</p>
                    </CardContent>
                </Card>
            </div>
        )
    }

    return (
        <Card className={className}>
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
                    
                    {files && files[0] && 
                        <div className="sm:w-full md:w-1/2">
                            <img src={URL.createObjectURL(files[0])} alt="payment-slip" />
                        </div>
                    }

                    <div>
                        <Button type="button" onClick={selectFile}>
                            <Upload /> Upload Payment Slip
                        </Button>

                        <Button type="submit" disabled={!form.formState.isValid}>
                            <UserPlus /> Register
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    )
}