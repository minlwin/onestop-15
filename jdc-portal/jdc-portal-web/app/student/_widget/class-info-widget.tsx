import { Badge } from "@/components/ui/badge";
import { Card, CardAction, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ClassItem } from "@/lib/model/dto/students";

export default function ClassInfoWidget({data, attended} : {data: ClassItem, attended: boolean}) {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-xl font-semibold">{data.course}</CardTitle>
                <CardDescription>{data.discription}</CardDescription>
                <CardAction>
                    <Badge>{data.type}</Badge>
                </CardAction>
            </CardHeader>
        </Card>
    )
}