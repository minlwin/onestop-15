'use client'
import OfficePageDecorator from "@/app/office/_widgets/office-page-decorate";
import Loading from "@/components/app/loading";
import NameInfo from "@/components/app/name-info";
import { PaymentDetails } from "@/lib/model/dto/office";
import { PAYMENT_SEGMENTS } from "@/lib/segments";
import { findPaymentDetails, approvePayment, rejectPayment } from "@/lib/service/action/office-action";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import SubTitle from "@/components/app/sub-title";
import HighlightInfo from "@/components/app/highlight-info";
import { Check, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Field, FieldLabel } from "@/components/ui/field";
import DetailsHeader from "@/components/app/details-header";

export default function PaymentDetailsPage() {
    const { id } = useParams()
    const [details, setDetails] = useState<PaymentDetails>()
    const [loading, setLoading] = useState(false)
    const [rejectDialogOpen, setRejectDialogOpen] = useState(false)
    const [rejectReason, setRejectReason] = useState("")

    useEffect(() => {
        const loadData = async () => {
            if (id) {
                const details = await findPaymentDetails(id)
                setDetails(details)
            }
        }
        loadData()
    }, [id])

    const handleApprove = async () => {
        if (!details) return
        setLoading(true)
        try {
            await approvePayment(details.id)
            // Refresh data
            const updated = await findPaymentDetails(id)
            setDetails(updated)
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    const handleReject = async () => {
        setRejectDialogOpen(true)
    }

    const handleConfirmReject = async () => {
        if (!details || !rejectReason.trim()) return
        
        setLoading(true)
        setRejectDialogOpen(false)
        try {
            await rejectPayment(details.id, rejectReason.trim())
            // Refresh data
            const updated = await findPaymentDetails(id)
            setDetails(updated)
            setRejectReason("")
        } catch (error) {
            console.error(error)
            setRejectDialogOpen(true) // Re-open dialog on error
        } finally {
            setLoading(false)
        }
    }

    if(!id || !details) {
        return <Loading />
    }

    return (
        <OfficePageDecorator name="Payment Details" segments={PAYMENT_SEGMENTS}>
            <DetailsHeader title={details.studentName} subTitle={details.email} >
            {details.status === 'Pending' && (
                <div className="flex gap-2">
                    <Button onClick={handleApprove} disabled={loading}>
                        <Check /> Approve Payment
                    </Button>
                    <Button variant="destructive" onClick={handleReject} disabled={loading}>
                        <X /> Reject Payment
                    </Button>
                </div>
            )}
            </DetailsHeader>
            
            <div className="flex flex-col md:flex-row gap-4">
                <div className="md:w-3/4 space-y-4">
                    <div className="space-y-3">
                        <SubTitle title="Payment Information" />
                        <div className="grid md:grid-cols-3 gap-4">
                            <HighlightInfo label="Payment Type" value={details.paymentDate} />
                            <HighlightInfo label="Payment Type" value={details.paymentType} />
                            <HighlightInfo label="Amount" value={`${details.amount.toLocaleString()} MMK`} />
                            <HighlightInfo label="Particular" value={details.particular} />
                            <HighlightInfo label="Status" value={details.status} />
                        </div>
                    </div>

                    <div className="space-y-3">
                        <SubTitle title="Class Information" />

                        <div className="grid md:grid-cols-3 gap-4">
                            <HighlightInfo label="Course" value={details.course} />
                            <HighlightInfo label="Class Type" value={details.classType} />
                            <HighlightInfo label="Start Date" value={details.startDate} />
                        </div>
                    </div>

                    <div className="space-y-3">
                        <SubTitle title="Audit Information" />

                        <div className="grid md:grid-cols-3 gap-4">
                            <HighlightInfo label="Created At" value={details.createdAt} />
                            <HighlightInfo label="Created By" value={details.createdBy} />
                            <HighlightInfo label="Modified At" value={details.modifiedAt} />
                            <HighlightInfo label="Modified By" value={details.modifiedBy} />
                        </div>
                    </div>
                </div>

                <div className="md:w-1/4">
                    {details.paySlip && (
                        <div className="space-y-3">
                            <SubTitle title="Pay Slip" />
                            <img src={details.paySlip} alt="Pay Slip" className="w-full md:w-3/4" />
                        </div>
                    )}
                </div>
            </div>

            <Dialog open={rejectDialogOpen} onOpenChange={(open) => {
                setRejectDialogOpen(open)
                if (!open) setRejectReason("")
            }}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Reject Payment</DialogTitle>
                        <DialogDescription>
                            Please provide a reason for rejecting this payment.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-2">
                        <Field>
                            <FieldLabel>Rejection Reason</FieldLabel>
                            <Textarea
                                id="reject-reason"
                                placeholder="Enter the reason for rejection..."
                                value={rejectReason}
                                onChange={(e) => setRejectReason(e.target.value)}
                                rows={4}
                            />
                        </Field>
                    </div>
                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={() => setRejectDialogOpen(false)}
                            disabled={loading}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="destructive"
                            onClick={handleConfirmReject}
                            disabled={loading || !rejectReason.trim()}
                        >
                            Reject Payment
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

        </OfficePageDecorator>
    )
}