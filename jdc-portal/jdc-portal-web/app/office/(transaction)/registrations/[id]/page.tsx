import OfficePageDecorator from "@/app/office/_widgets/office-page-decorate";
import { REGISTRATION_SEGMENTS } from "@/lib/segments";

export default function RegistrationDetailsPage() {
    return (
        <OfficePageDecorator name="Registration Details" segments={REGISTRATION_SEGMENTS}>
            <></>
        </OfficePageDecorator>
    )
}