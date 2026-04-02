import Footer from "@/components/app/footer";
import { getCourses } from "@/lib/service/rest/anonymous-rest-clients";
import { Coffee } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function WithoutMenuLayout({children} : {children : React.ReactNode}) {
    return (
        <div className="h-screen space-y-8">
            <AnonymousMenu />
            <main className="px-16">
                {children}
            </main>
            <Footer />
        </div>
    )
}

async function AnonymousMenu() {

    const courses = await getCourses();

    return (
        <nav className="flex justify-between items-center bg-gray-900 text-white px-16 py-4">
            <Link href={"/"} className="text-2xl flex items-center gap-2">
                <Coffee />
                Java Developer Class
            </Link>

            <ul className="flex gap-4">
            {courses.map((course, index) => (
                <li key={index}>
                    <Link href={`/courses/${course.id}`}>{course.name}</Link>
                </li>
            ))}
            </ul>
        </nav>
    )
}