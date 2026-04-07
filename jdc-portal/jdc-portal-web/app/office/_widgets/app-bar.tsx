import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { SidebarTrigger } from "@/components/ui/sidebar"
import Link from "next/link"
import { Fragment } from "react/jsx-runtime"
import LogoutButton from "./office-logout"

export type AppBarProps = {
    name?: string, 
    segments?: {
        name: string
        path: string
    }[]
}

export default function AppBar({name, segments} : AppBarProps) {

    return (
        <nav className="h-13 flex items-center justify-between px-4">

            <div className="flex gap-4 items-center">
                <SidebarTrigger />

                <Breadcrumb>
                    <BreadcrumbList>
                        {name && 
                            <>
                                <BreadcrumbItem>
                                    <BreadcrumbLink asChild>
                                        <Link href={'/office'}>Office</Link>
                                    </BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator />
                            </>
                        }

                        {segments && segments.map((item, index) => 
                            <Fragment key={index}>
                                <BreadcrumbItem>
                                    <BreadcrumbLink asChild>
                                        <Link href={item.path}>{item.name}</Link>
                                    </BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator />
                            </Fragment>
                        )}

                        <BreadcrumbItem>
                            <BreadcrumbPage>{name || 'Office'}</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </div>
            
            <LogoutButton />
        </nav>
    )
}