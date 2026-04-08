import OfficePageDecorator from "@/app/office/_widgets/office-page-decorate";
import { PAYMENT_SEGMENTS } from "@/lib/segments";

export default function PaymentDetailsPage() {
    return (
        <OfficePageDecorator name="Payment Details" segments={PAYMENT_SEGMENTS}>
            <></>
        </OfficePageDecorator>
    )
}