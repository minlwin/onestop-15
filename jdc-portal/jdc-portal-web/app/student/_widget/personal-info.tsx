'use client'

import Loading from "@/components/app/loading"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button,  } from "@/components/ui/button"
import { Card, CardAction, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ProfileInfo } from "@/lib/model/dto/students"
import { loadProfileAction } from "@/lib/service/action/students-action"
import { Pencil } from "lucide-react"
import { useEffect, useState } from "react"


export default function PersonalInfoComponent() {

    const [info, setInfo] = useState<ProfileInfo>()

    useEffect(() => {
        const fetchProfile = async () => {
            const response = await loadProfileAction()
            setInfo(response)
        }
        fetchProfile()
    }, [])

    if(!info) {
        return <Loading />
    }

    return (
        <Card className="bg-gray-100">
            <CardHeader>
                <CardTitle className="text-xl">Personal Information</CardTitle> 
                <CardAction>
                    <Button variant={'ghost'}>
                        <Pencil />
                    </Button>
                </CardAction>
            </CardHeader>

            <CardContent>
                <div className="flex gap-4 items-center">
                    <Avatar>
                        <AvatarFallback className="bg-white">{info.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>

                    <div>
                        <div className="text-lg font-semibold">{info.name}</div>
                        <div className="text-sm text-gray-500">{info.phone}</div>
                        <div className="text-sm text-gray-500">{info.email}</div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}