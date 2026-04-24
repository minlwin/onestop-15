'use client'
import { PaymentInfo } from "@/lib/model/dto/anonymous"
import { PaymentForm, paymentSchema } from "@/lib/model/schema/students"
import { fetchPaymentInfoAction } from "@/lib/service/action/anonymous-action"
import { paidAction } from "@/lib/service/action/students-action"
import { zodResolver } from "@hookform/resolvers/zod"
import { Upload, Pencil, Check } from "lucide-react"
import { useRef, useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import FormsSelect from "../forms/forms-select"
import { Button } from "../ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../ui/card"
import PaySlip from "./pay-slip"
import FormsInput from "../forms/forms-input"
import { useRouter } from "next/navigation"
import { safeCall } from "@/lib/safe-call"

export default function PaymentFormComponent({classId, feeType} : {classId : string, feeType: 'monthly' | 'registration'}) {
    
    const [paymentInfos, setPaymentInfos] = useState<PaymentInfo[]>([])
    const paymentOption = paymentInfos.map(a => ({label : `${a.name} : ${a.accountNumber} - ${a.accountName}`, value : a.code}))
    paymentOption.unshift({label : 'Select Payment', value : ''})

    useEffect(() => {
        const loadData = async () => {
            await safeCall(async () => {
                const result = await fetchPaymentInfoAction()
                setPaymentInfos(result)
            })
        }
        loadData()
    }, [])    

    const form = useForm<PaymentForm>({
        resolver: zodResolver(paymentSchema),
        defaultValues: {
            classId: classId,
            feeType: feeType,
            amount: 0,
            payment: '',
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

    const onSave = async (data: PaymentForm) => {
        await safeCall(async () => {
            await paidAction(data)
            router.replace('/student')
        })
    }  
    
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-xl font-semibold">{feeType === 'monthly' ? 'Monthly Fee' : 'Registration Fee'}</CardTitle>
                <CardDescription>Please pay the {feeType} fee and upload the payment slip.</CardDescription>
            </CardHeader>

            <CardContent>
                <form onSubmit={form.handleSubmit(onSave)} className="space-y-4">

                    <FormsSelect control={form.control} name="payment" label="Payment" options={paymentOption} />
                    <FormsInput control={form.control} name="amount" type="number" label="Amount" />

                    {files && files[0] && 
                        <PaySlip file={files[0]} />
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
                                <Check />
                                {feeType === 'monthly' ? 'Pay Fee' : 'Join Class'}
                            </Button>
                        }
                    </div>
                </form>
            </CardContent>
        </Card>
    )
}