'use client'

import ClassForRegistration from "@/components/app/class-for-registration"
import Loading from "@/components/app/loading"
import PageTitle from "@/components/app/page-title"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { JoinClassForm, joinClassSchema } from "@/lib/model/schema/students"
import { joinClassAction } from "@/lib/service/action/students-action"
import { zodResolver } from "@hookform/resolvers/zod"
import { Pencil, Upload } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import { useRef } from "react"
import { useForm } from "react-hook-form"

export default function RegistrationPage() {

    const params = useSearchParams()
    const classId = params.get('classId')

    if(!classId) {
        return <Loading />
    }

    return (
        <section className="space-y-4">
            <PageTitle title="Enroll Class" />

            <div className="flex gap-8 flex-col md:flex-row">
                <ClassForRegistration classId={classId} className="flex-1" />
                <RegistrationFormComponent classId={classId} className="flex-1" />
            </div>
        </section>
    )
}

function RegistrationFormComponent({classId, className} : {classId: string, className?: string}) {
    
    const form = useForm<JoinClassForm>({
        resolver: zodResolver(joinClassSchema),
        defaultValues: {
            classId: classId,
            paymentSlip: undefined
        }
    })

    const {ref, ...slipPorps} = form.register('paymentSlip')
    const fileInput = useRef<HTMLInputElement>(null)

    const files = form.watch('paymentSlip')
    const router = useRouter()

    const selectFile = () => {
       fileInput.current?.click()
    }

    const onSave = async (data: JoinClassForm) => {
        await joinClassAction(data)
        router.replace('/student')
    }
    
    return (
        <Card className={className}>
            <CardHeader>
                <CardTitle className="text-xl font-semibold">Join Class</CardTitle>
                <CardDescription>Please pay the registration fee and upload the payment slip.</CardDescription>
            </CardHeader>

            <CardContent>
                <form onSubmit={form.handleSubmit(onSave)} className="space-y-4">

                    {files && files[0] && 
                        <div className="sm:w-full md:w-1/2">
                            <img src={URL.createObjectURL(files[0])} alt="payment-slip" />
                        </div>
                    }

                    <input type="file" {...slipPorps} hidden ref={e => {
                        ref(e)
                        fileInput.current = e
                    }} />
                    
                    <div>
                        <Button type="button" onClick={selectFile}>
                            <Upload />
                            <span>Upload Payment Slip</span>
                        </Button>
                        {form.formState.isValid && 
                            <Button type="submit">
                                <Pencil />
                                Join Class
                            </Button>
                        }
                    </div>
                </form>
            </CardContent>
        </Card>
    )
}