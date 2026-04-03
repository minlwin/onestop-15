import PageTitle from "@/components/app/page-title";
import PersonalInfoComponent from "./_widget/personal-info";
import AttendedClassesComponent from "./_widget/attended-classes";
import AvailableClassesComponent from "./_widget/available-classes";
import PaymentHistoryComponent from "./_widget/payment-history";

export default function StudentHomePage() {
    return (
        <div className="space-y-8">
            <PageTitle title="Student Dashboard" />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <PersonalInfoComponent />
            </div>

            <AttendedClassesComponent />

            <AvailableClassesComponent />

            <PaymentHistoryComponent />
        </div>
    )
}