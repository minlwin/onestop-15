'use client'
import Footer from "@/components/app/footer";
import React, { useEffect, useState } from "react";
import { StudentMenu } from "./_widget/student-menu";
import { getLoginSite, logoutAction } from "@/lib/service/action/security-action";
import { useRouter } from "next/navigation";

export default function StudentLayout({children} : {children : React.ReactNode}) {
    const router = useRouter()
    const [show, setShow] = useState(false)
    useEffect(() => {
        const load = async () => {
            const site = await getLoginSite()
            if(!site) {
                router.replace('/signin')
            } else {
                if(site == '/student') {
                    setShow(true)
                } else {
                    await logoutAction()
                    router.replace('/signin/employee')
                }
            }
        }
        load()
    }, [])

    if(!show) {
        return <div></div>
    }

    return (
        <div>
            <StudentMenu />
            <main className="px-4 py-4 md:px-32 h-full">
                {children}
            </main>
            <div className="hidden md:block">
                <Footer />
            </div>
        </div>
    )
}

