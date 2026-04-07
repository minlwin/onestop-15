import OfficePageDecorator from "@/app/office/_widgets/office-page-decorate";

export default function PaymentDetailsPage() {
    return (
        <OfficePageDecorator name="Payment Details" segments={[{
            name : "Payment Management", 
            path : '/office/payments'
        }]}>
            <></>
        </OfficePageDecorator>
    )
}