import Footer from "@/components/app/footer";
import React from "react";
import AnonymousMenu from "./_widget/anonymous-menu";
import { getCourses } from "@/lib/service/rest/anonymous/courses-rest-client";

export default async function WithoutMenuLayout({children} : {children : React.ReactNode}) {
    
    const courses = await getCourses();

    return (
        <div className="h-screen space-y-8">
            <AnonymousMenu courses={courses} />
            <main className="px-4 md:px-12">
                {children}
            </main>
            <Footer />
        </div>
    )
}