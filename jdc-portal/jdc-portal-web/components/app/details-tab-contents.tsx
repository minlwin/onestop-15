import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../ui/card";

export default function DetailsTabContents({ title, subTitle, children }: { title: string, subTitle: string, children: React.ReactNode }) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription>{subTitle}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                {children}
            </CardContent>
        </Card>
    )
}