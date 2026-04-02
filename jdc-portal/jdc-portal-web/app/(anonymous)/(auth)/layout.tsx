import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function WithMenuLayout({children} : {children : React.ReactNode}) {
    return (
        <div className="h-screen flex">
            <header className="flex-1 flex flex-col items-center justify-center gap-4">
                <Image src={'/logo/logo2017.png'} alt="JDC Logo" width={200} height={200} />
                <h1 className="uppercase text-2xl font-semibold">Java Developer Class</h1>
                <Button asChild>
                    <Link href="/"><Home /> Home</Link>
                </Button>
            </header>
            <main className="flex-1 flex items-center justify-center bg-accent">
                <div className="w-3/5">
                    {children}
                </div>
            </main>
        </div>
    )
}