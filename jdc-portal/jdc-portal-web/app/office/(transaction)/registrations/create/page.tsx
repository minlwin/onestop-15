'use client'

import OfficePageDecorator from "@/app/office/_widgets/office-page-decorate";
import PageTitle from "@/components/app/page-title";
import SubTitle from "@/components/app/sub-title";
import FormsInput from "@/components/forms/forms-input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardAction, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ClassItem } from "@/lib/model/dto/office";
import { RegistrationForm, registrationSchema } from "@/lib/model/schema/office";
import { REGISTRATION_SEGMENTS } from "@/lib/segments";
import { createRegistration, searchClasses } from "@/lib/service/action/office-action";
import { zodResolver } from "@hookform/resolvers/zod";
import { Save } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export default function RegistrationInOfficePage() {

    const form = useForm<RegistrationForm>({
        resolver: zodResolver(registrationSchema),
        defaultValues: {
            classId: "",
            name: "",
            phone: "",
            email: "",
            registrationFee: 0
        }
    })

    const router = useRouter()

    const onSave = async (data: RegistrationForm) => {
        const result = await createRegistration(data)
        router.replace(`/office/registrations/${result.id}`)
    }

    const onClassChange = async (item?: ClassItem) => {
        form.setValue("classId", item?.id.toString() || "")
        form.setValue("registrationFee", item?.registrationFee || 0)
    }

    return (
        <OfficePageDecorator name="Create Registration" segments={REGISTRATION_SEGMENTS}>
            <header>
                <PageTitle title="Create Registration" />
                <span className="text-sm text-gray-500">Create Registration for new student who came to office and paid registration fee in cache.</span>
            </header>

            <SelectClassInformation onClassChange={onClassChange} />

            <section className="space-y-3">
                <SubTitle title="Student Information" />
                <form onSubmit={form.handleSubmit(onSave)} className="grid md:grid-cols-3 gap-4">
                    <FormsInput control={form.control} name="name" label="Name" />
                    <FormsInput control={form.control} name="phone" label="Phone" type="phone" className="col-start-1" />
                    <FormsInput control={form.control} name="email" label="Email Address" />
                    <FormsInput control={form.control} name="registrationFee" label="Registration Fee" type="number" className="col-start-1" />

                    <div className="col-span-3 flex justify-start">
                        <Button type="submit" disabled={!form.formState.isValid}>
                            <Save /> Save Registration
                        </Button>
                    </div>
                </form>
            </section>
        </OfficePageDecorator>
    )
}

function SelectClassInformation({ onClassChange }: { onClassChange: (item?: ClassItem) => void }) {
    const [classes, setClasses] = useState<ClassItem[]>([])
    const [selectedClass, setSelectedClass] = useState<any>()

    useEffect(() => {
        const loadData = async () => {
            const { list } = await searchClasses({
                startTo: new Date().toISOString(),
                size: 100
            })
            setClasses(list)
            if (list.length > 0) {
                setSelectedClass(list[0])
            }
        }
        loadData()
    }, [])

    useEffect(() => {
        onClassChange(selectedClass)
    }, [selectedClass])

    return (
        <div className="space-y-3">
            <SubTitle title="Select Class" />
            <div className="grid md:grid-cols-3 gap-4">
                {classes.map((item, index) => (
                    <Card key={index} onClick={() => setSelectedClass(item)}
                        className={item.id == selectedClass ? "bg-accent text-accent-foreground" : ""}>
                        <CardHeader>
                            <CardTitle className="text-sm font-medium">
                                {`${item.course} - ${item.startDate}`}
                            </CardTitle>
                            <CardAction>
                                <Badge>{item.type}</Badge>
                            </CardAction>
                            <CardDescription>
                                Registration Fee : {item.registrationFee.toLocaleString()} MMK
                            </CardDescription>
                        </CardHeader>
                    </Card>
                ))}
            </div>
        </div>
    )
}