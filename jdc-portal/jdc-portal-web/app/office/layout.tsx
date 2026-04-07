import { SidebarProvider } from "@/components/ui/sidebar";
import React from "react";
import AppSidebar from "./_widgets/app-sidebar";

export default function OfficeLayout({children} : {children : React.ReactNode}) {
    return (
        <SidebarProvider>
            <AppSidebar />
            <main className="w-full min-h-screen">
                {children}
            </main>
        </SidebarProvider>
    )
}

