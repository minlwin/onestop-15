'use client'

import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react"
import { useRouter } from "next/navigation"

export default function LogoutButton() {

    const router = useRouter()

    const onLogout = () => {
        router.replace("/signin")
    }

    return (
        <Button variant={'ghost'} onClick={onLogout}>
            <LogOut /> Sign Out
        </Button>
    )
}