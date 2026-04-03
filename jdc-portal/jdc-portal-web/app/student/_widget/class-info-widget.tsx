import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ClassItem } from "@/lib/model/dto/students";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function ClassInfoWidget({data, attended} : {data: ClassItem, attended: boolean}) {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-xl font-semibold">{data.course}</CardTitle>
                <CardDescription>{data.startDate}</CardDescription>
                <CardAction>
                    <Badge variant={'outline'}>{data.type}</Badge>
                </CardAction>
            </CardHeader>

            <CardContent className="space-y-4">
                <p>{data.discription}</p>

                <div className="flex justify-end">
                    {attended ? 
                        <Button asChild>
                            <Link href={`/student/classes/${data.id}`}>
                                <ArrowRight/>
                                Show Details
                            </Link>
                        </Button>
                        :
                        <Button asChild>
                            <Link href={`/student/registration?classId=${data.id}`}>
                                <ArrowRight/>
                                Join Class
                            </Link>
                        </Button>
                    }
                </div>
            </CardContent>
        </Card>
    )
}