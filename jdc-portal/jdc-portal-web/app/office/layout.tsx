'use client'

import { SidebarProvider } from "@/components/ui/sidebar";
import React, { useEffect, useState } from "react";
import AppSidebar from "./_widgets/app-sidebar";
import { useRouter } from "next/navigation";
import { getLoginSite, logoutAction } from "@/lib/service/action/security-action";

export default function OfficeLayout({children} : {children : React.ReactNode}) {
    const router = useRouter()
    const [show, setShow] = useState(false)
    useEffect(() => {
        const load = async () => {
            const site = await getLoginSite()
            if(!site) {
                router.replace('/signin')
            } else {
                if(site == '/office') {
                    setShow(true)
                } else {
                    await logoutAction()
                    router.replace('/signin')
                }
            }
        }
        load()
    }, [])

    if(!show) {
        return <div></div>
    }

    return (
        <SidebarProvider>
            <AppSidebar />
            <main className="w-full min-h-screen mb-4">
                {children}
            </main>
        </SidebarProvider>
    )
}

