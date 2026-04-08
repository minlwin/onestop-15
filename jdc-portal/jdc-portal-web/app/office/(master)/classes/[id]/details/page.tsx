'use client'
import OfficePageDecorator from "@/app/office/_widgets/office-page-decorate"
import DetailsTabContents from "@/components/app/details-tab-contents"
import HighlightInfo from "@/components/app/highlight-info"
import Loading from "@/components/app/loading"
import NameInfo from "@/components/app/name-info"
import SubTitle from "@/components/app/sub-title"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ClassDetails } from "@/lib/model/dto/office"
import { CLASS_SEGMENTS } from "@/lib/segments"
import { findClassDetails } from "@/lib/service/action/office-action"
import { Pencil } from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { useState, useEffect } from "react"
import StudentsForClass from "./_widgets/students-for-class"
import PaymentsForClass from "./_widgets/payments-for-class"
import AttendanceForClass from "./_widgets/attendance-for-class"
import QrCodes from "./_widgets/qr-for-class"

export default function ClassDetailsPage() {

    const { id } = useParams()
    const [details, setDetails] = useState<ClassDetails>()

    useEffect(() => {
        async function load() {
            if(id) {
                const result = await findClassDetails(id as string)
                setDetails(result)
            }
        }
        load()
    }, [id])

    if(!id || !details) {
        return <Loading />
    }
    
    return (
        <OfficePageDecorator name="Class Details" segments={CLASS_SEGMENTS}>
            <NameInfo name={details.course} subtitle={`${details.type} - ${details.startDate}`} />

            <Tabs defaultValue="information" className="space-y-4">
                <TabsList>
                    <TabsTrigger value="information">Information</TabsTrigger>
                    <TabsTrigger value="students">Students</TabsTrigger>
                    <TabsTrigger value="payments">Payments</TabsTrigger>
                    <TabsTrigger value="attandence">Attendance</TabsTrigger>
                    <TabsTrigger value="qr">QR Codes</TabsTrigger>
                </TabsList>

                <TabsContent value="information">
                    <ClassInformation details={details} />
                </TabsContent>
                <TabsContent value="students">
                    <StudentsForClass classId={id} />
                </TabsContent>
                <TabsContent value="payments">
                    <PaymentsForClass classId={id} />
                </TabsContent>
                <TabsContent value="attandence">
                    <AttendanceForClass classId={id} />
                </TabsContent>
                <TabsContent value="qr">
                    <QrCodes classId={id} />
                </TabsContent>
            </Tabs>
        </OfficePageDecorator>    
    )
}

function ClassInformation({details} : {details : ClassDetails}) {
    return (
        <DetailsTabContents title="Class Information" subTitle="Information about this class">
            <div className="grid md:grid-cols-4 gap-4">
                <HighlightInfo label="Course" value={details.course} />
                <HighlightInfo label="Type" value={details.type} />
                <HighlightInfo label="Start Date" value={details.startDate} />
            </div>
            <div className="grid md:grid-cols-4 gap-4">
                <HighlightInfo label="Duration" value={`${details.months} Months`} />
                <HighlightInfo label="Days" value={details.days} />
                <HighlightInfo label="Time" value={details.time} />
            </div>
            <div className="grid md:grid-cols-4 gap-4">
                <HighlightInfo label="Registration Fee" value={`${details.registrationFee.toLocaleString()} MMK`} />
                <HighlightInfo label="Monthly Fee" value={`${details.monthlyFee.toLocaleString()} MMK`} />
            </div>

            <div className="space-y-3">
                <SubTitle title="Audit Information" />
                <div className="grid md:grid-cols-4 gap-4">
                    <HighlightInfo label="Created At" value={details.createdAt} />
                    <HighlightInfo label="Created By" value={details.createdBy} />
                    <HighlightInfo label="Modified At" value={details.modifiedAt} />
                    <HighlightInfo label="Modified By" value={details.modifiedBy} />
                </div>
            </div>

            <div>
                <Button asChild>
                    <Link href={`/office/classes/${details.id}/edit`}>
                        <Pencil /> Edit Class
                    </Link>
                </Button>
            </div>
        </DetailsTabContents>
    )
}
