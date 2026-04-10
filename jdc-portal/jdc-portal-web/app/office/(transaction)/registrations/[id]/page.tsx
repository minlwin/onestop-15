'use client'
import OfficePageDecorator from "@/app/office/_widgets/office-page-decorate";
import DetailsHeader from "@/components/app/details-header";
import HighlightInfo from "@/components/app/highlight-info";
import Loading from "@/components/app/loading";
import NameInfo from "@/components/app/name-info";
import SubTitle from "@/components/app/sub-title";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Field, FieldLabel } from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";
import { RegistrationDetails } from "@/lib/model/dto/office";
import { REGISTRATION_SEGMENTS } from "@/lib/segments";
import { approveRegistration, findRegistrationDetails, rejectRegistration } from "@/lib/service/action/office-action";
import { Check, X } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function RegistrationDetailsPage() {

    const {id} = useParams()
    const [details, setDetails] = useState<RegistrationDetails>()
    const [loading, setLoading] = useState(false)
    const [rejectDialogOpen, setRejectDialogOpen] = useState(false)
    const [rejectReason, setRejectReason] = useState("")

    useEffect(() => {
        const loadData = async () => {
            if(id) {
                const details = await findRegistrationDetails(id)
                setDetails(details)
            }
        }
        loadData()
    }, [id])

    const handleApprove = async () => {
        if (!details) return
        setLoading(true)
        try {
            await approveRegistration(details.id)
            // Refresh data
            const updated = await findRegistrationDetails(id)
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
            await rejectRegistration(details.id, rejectReason.trim())
            // Refresh data
            const updated = await findRegistrationDetails(id)
            setDetails(updated)
            setRejectReason("")
        } catch (error) {
            console.error(error)
            setRejectDialogOpen(true) // Re-open dialog on error
        } finally {
            setLoading(false)
        }
    }

    if (!id || !details) {
        return <Loading />
    }

    return (
        <OfficePageDecorator name="Registration Details" segments={REGISTRATION_SEGMENTS}>
            <DetailsHeader title={details.studentName} subTitle={details.email} >
            {details.status === 'Applied' && (
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

            <div className="flex gap-4 flex-col md:flex-row">
                <div className="md:w-3/4 space-y-4">
                    <div className="space-y-3">
                        <SubTitle title="Payment Information" />
                        <div className="grid md:grid-cols-3 gap-4">
                            <HighlightInfo label="Payment Type" value={details.paymentDate} />
                            <HighlightInfo label="Payment Type" value={details.paymentType} />
                            <HighlightInfo label="Amount" value={`${details.amount.toLocaleString()} MMK`} />
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
                        <DialogTitle>Reject Registration</DialogTitle>
                        <DialogDescription>
                            Please provide a reason for rejecting this Registration.
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