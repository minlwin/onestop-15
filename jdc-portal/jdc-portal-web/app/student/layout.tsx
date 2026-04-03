import Footer from "@/components/app/footer";
import React from "react";
import { StudentMenu } from "./_widget/student-menu";

export default function StudentLayout({children} : {children : React.ReactNode}) {
    return (
        <div className="h-screen">
            <StudentMenu />
            <main className="px-4 py-4 md:px-32">
                {children}
            </main>
            <Footer />
        </div>
    )
}

