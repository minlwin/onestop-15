import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import OfficePageDecorator from "./_widgets/office-page-decorate";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Link from "next/link";

export default function OfficeHomePage() {
    return (
        <OfficePageDecorator >
            <div className="space-y-6">
                {/* Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {[
                        { title: "Students", value: "1,250" },
                        { title: "Classes", value: "32" },
                        { title: "This Month Registrations", value: "18" },
                        { title: "This Month Payments", value: "$2,300" },
                    ].map((item) => (
                        <Card key={item.title}>
                            <CardHeader>
                                <CardTitle className="text-sm text-gray-500">
                                    {item.title}
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-2xl font-bold">{item.value}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Alerts + Quick Actions */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    <Card className="lg:col-span-2">
                        <CardHeader>
                            <CardTitle>⚠️ Alerts</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <div className="flex justify-between">
                                <span>Pending Registrations</span>
                                <Badge >5</Badge>
                            </div>
                            <div className="flex justify-between">
                                <span>Unpaid Students</span>
                                <Badge variant="destructive">12</Badge>
                            </div>
                            <div className="flex justify-between">
                                <span>Classes Starting Soon</span>
                                <Badge>3</Badge>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>⚡ Quick Actions</CardTitle>
                        </CardHeader>
                        <CardContent className="flex flex-col gap-2">
                            <Button asChild>
                                <Link href={'/office/registrations/create'}>New Registration</Link>
                            </Button>
                            <Button variant="secondary" asChild>
                                <Link href={'/office/payments/create'}>Record Payment</Link>
                            </Button>
                            <Button variant="outline" asChild>
                                <Link href={'/office/classes/create'}>Create Class</Link>
                            </Button>
                        </CardContent>
                    </Card>
                </div>

                {/* Tables Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {/* Today Registrations */}
                    <Card>
                        <CardHeader>
                            <CardTitle>This Month Registrations</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Table className="w-full text-sm">
                                <TableHeader>
                                    <TableRow className="text-left border-b">
                                        <TableHead>Name</TableHead>
                                        <TableHead>Course</TableHead>
                                        <TableHead>Status</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {[
                                        { name: "John Doe", course: "Java Basic", status: "Pending" },
                                        { name: "Jane Smith", course: "React", status: "Confirmed" },
                                    ].map((row, i) => (
                                        <TableRow key={i} className="border-b">
                                            <TableCell>{row.name}</TableCell>
                                            <TableCell>{row.course}</TableCell>
                                            <TableCell>
                                                <Badge
                                                    variant={
                                                        row.status === "Pending"
                                                            ? "secondary"
                                                            : "default"
                                                    }
                                                >
                                                    {row.status}
                                                </Badge>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>

                    {/* Today Payments */}
                    <Card>
                        <CardHeader>
                            <CardTitle>This Month Payments</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Table className="w-full text-sm">
                                <TableHeader>
                                    <TableRow className="text-left border-b">
                                        <TableHead>Name</TableHead>
                                        <TableHead>Amount</TableHead>
                                        <TableHead>Time</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {[
                                        { name: "John Doe", amount: "$100", time: "10:30 AM" },
                                        { name: "Jane Smith", amount: "$200", time: "11:00 AM" },
                                    ].map((row, i) => (
                                        <TableRow key={i} className="border-b">
                                            <TableCell>{row.name}</TableCell>
                                            <TableCell>{row.amount}</TableCell>
                                            <TableCell>{row.time}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </div>

                {/* Upcoming Classes */}
                <Card>
                    <CardHeader>
                        <CardTitle>Upcoming Classes</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        {[
                            { name: "Spring Boot", date: "Apr 15", time: "9:00 AM" },
                            { name: "React Advanced", date: "Apr 18", time: "1:00 PM" },
                        ].map((cls, i) => (
                            <div
                                key={i}
                                className="flex justify-between border p-2 rounded-lg"
                            >
                                <div>
                                    <p className="font-medium">{cls.name}</p>
                                    <p className="text-sm text-gray-500">
                                        {cls.date} - {cls.time}
                                    </p>
                                </div>
                                <Button size="sm" variant="outline">
                                    View
                                </Button>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </div>
        </OfficePageDecorator>
    )
}