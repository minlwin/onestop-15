'use client'

import { Button } from "@/components/ui/button"
import { getLoginSite, logoutAction } from "@/lib/service/action/security-action"
import { LogOut } from "lucide-react"
import { useRouter } from "next/navigation"

export default function LogoutButton() {

    const router = useRouter()

    const onLogout = async () => {
        const site = await getLoginSite()
        if (site) {
            await logoutAction()

            if(site === '/student') {
                router.replace('/signin')
            } else if (site === '/office') {
                router.replace('/signin/employee')
            }
        } else {
            router.replace('/')
        }
    }

    return (
        <Button variant={'ghost'} onClick={onLogout}>
            <LogOut /> Sign Out
        </Button>
    )
}