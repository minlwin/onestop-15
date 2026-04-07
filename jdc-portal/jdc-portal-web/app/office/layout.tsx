import IconWidget, { IconType } from "@/components/app/icon-widget";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider } from "@/components/ui/sidebar";
import { Laptop } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function OfficeLayout({children} : {children : React.ReactNode}) {
    return (
        <SidebarProvider>
            <AppSidebar />
            <main>
                {children}
            </main>
        </SidebarProvider>
    )
}

function AppSidebar() {
    return (
        <Sidebar>
            <SidebarHeader>
                <div className="flex items-center gap-2 px-4 py-2 uppercase font-semibold">
                    <Laptop />
                    <span>JDC Office</span>
                </div>
            </SidebarHeader>
            
            <SidebarContent className="px-2">
            {OFFICE_MENUS.map((group, index) =>
                <SidebarGroup key={index}>
                    {group.name &&
                        <SidebarGroupLabel>{group.name}</SidebarGroupLabel>
                    }

                    <SidebarGroupContent>
                        <SidebarMenu>
                        {group.items.map((item, itemIndex) => 
                            <SidebarMenuItem key={`${index}-${itemIndex}`}>
                                <SidebarMenuButton asChild>
                                    <Link href={`/office/${item.path}`}>
                                        <IconWidget icon={item.icon} /> {item.name}
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        )}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            )}
            </SidebarContent>
        </Sidebar>
    )
}

const OFFICE_MENUS:MenuGroup[] = [
    {
        items : [
            {name : "Payments", path : "payments", icon: 'CreditCard'},
            {name : "Registrations", path : "registrations", icon : 'UserPlus'},
        ]
    },
    {
        name: "Accounts",
        items : [
            {name : "Employees", path : "staffs", icon : 'Users'},
            {name : "Students", path : "students", icon: 'UserCircle'},
        ]
    },
    {
        name: "Master Data",
        items : [
            {name : "Courses", path : "courses", icon : 'BookOpenCheck'},
            {name : "Classes", path : "classes", icon : 'CalendarCheck'},
        ]
    },
]

type MenuGroup = {
    name? : string
    items : MenuItem[]
}

type MenuItem = {
    icon: IconType
    name: string
    path: string
}