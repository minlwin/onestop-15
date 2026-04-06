'use client'

import { Button } from "@/components/ui/button";
import { Home, LogOut } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export function StudentMenu() {

    const router = useRouter()

    const onLogout = () => {
        router.replace('/')
    }

    return (
        <div className="bg-white shadow">
            <nav className="px-4 md:px-32 py-4 flex justify-between">
                <Link href="/student" className="flex items-center gap-2">
                    <Home />
                    <span className="text-2xl">JDC Student Portal</span> 
                </Link>

                <Button type="button" onClick={onLogout}>
                    <LogOut /> Logout
                </Button>
            </nav>
        </div>
    )
}