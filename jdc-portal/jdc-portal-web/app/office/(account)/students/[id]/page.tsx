'use client'
import OfficePageDecorator from "@/app/office/_widgets/office-page-decorate";
import DetailsTabContents from "@/components/app/details-tab-contents";
import Loading from "@/components/app/loading";
import NameInfo from "@/components/app/name-info";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ClassItem, StudentDetails } from "@/lib/model/dto/office";
import { STUDENT_SEGMENTS } from "@/lib/segments";
import { findStudentById, searchClasses } from "@/lib/service/action/office-action";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import ClasssForStudent from "./_widgets/classs-for-student";
import PaymentsForStudent from "./_widgets/payments-for-student";
import AttendancesForStudent from "./_widgets/attendances-for-student";
import SubTitle from "@/components/app/sub-title";
import HighlightInfo from "@/components/app/highlight-info";
import { safeCall } from "@/lib/safe-call";

export default function StudentDetailsPage() {
    const {id} = useParams()
    const [details, setDetails] = useState<StudentDetails>()
    const [classes, setClasses] = useState<ClassItem[]>([])

    useEffect(() => {
        const loadData = async () => {
            if(id) {
                await safeCall(async () => {
                    const details = await findStudentById(id as string)
                    setDetails(details)

                    const {list} = await searchClasses({
                        studentId: id as string,
                        size: 100
                    })
                    setClasses(list)                    
                })
            }
        }
        loadData()
    }, [id])

    if (!id || !details) {
        return <Loading />
    }

    return (
        <OfficePageDecorator name="Student Information" segments={STUDENT_SEGMENTS}>
            <NameInfo name={details.name} subtitle={details.email} />

            <Tabs defaultValue="profile" className="space-y-2">
                <TabsList>
                    <TabsTrigger value="profile">Profile</TabsTrigger>
                    <TabsTrigger value="classes">Classes</TabsTrigger>
                    <TabsTrigger value="payments">Payments</TabsTrigger>
                    <TabsTrigger value="attendances">Attendances</TabsTrigger>
                </TabsList>

                <TabsContent value="profile">
                    <StudentProfile details={details} />
                </TabsContent>
                <TabsContent value="classes">
                    <ClasssForStudent studentId={id} classes={classes} />
                </TabsContent>
                <TabsContent value="payments">
                    <PaymentsForStudent studentId={id} classes={classes} />
                </TabsContent>
                <TabsContent value="attendances">
                    <AttendancesForStudent studentId={id} classes={classes} />
                </TabsContent>
            </Tabs>
        </OfficePageDecorator>
    )
}

function StudentProfile({details} : {details : StudentDetails}) {
    return (
        <DetailsTabContents title="Profile Information" subTitle="Information about this student">
            <div className="grid md:grid-cols-4 gap-4">
                <HighlightInfo label="Phone" value={details.phone} />
                <HighlightInfo label="Phone" value={details.email} />
                <HighlightInfo label="Entry At" value={details.entryAt} />
            </div>

            <div>
                <SubTitle title="Audit Information" />
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <HighlightInfo label="Created At" value={details.createdAt} />
                    <HighlightInfo label="Created By" value={details.createdBy} />
                    <HighlightInfo label="Modified At" value={details.modifiedAt} />
                    <HighlightInfo label="Modified By" value={details.modifiedBy} />
                </div>
            </div>
        </DetailsTabContents>
    )
}