'use client'

import { Button } from "@/components/ui/button";
import { getSite } from "@/lib/model/login-user";
import { getLoginSite } from "@/lib/service/action/security-action";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import LogoutButton from "../office/_widgets/office-logout";

const heroSlides = [
    {
        image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644",
        title: "Welcome to Our School",
        subtitle: "Learn modern technologies with real projects",
    },
    {
        image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
        title: "Build Your Career",
        subtitle: "Become a professional developer",
    },
    {
        image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
        title: "Hands-on Learning",
        subtitle: "Practice with real-world scenarios",
    },
];

export default function HeroSection() {

    const [current, setCurrent] = useState(0);
    const [site, setSite] = useState<string>()

    useEffect(() => {
        async function load() {
            const site = await getLoginSite()
            setSite(site)
        }
        load()
    }, [])

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrent((prev: number) => (prev + 1) % heroSlides.length);
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative h-[70vh] w-full overflow-hidden">
            <AnimatePresence>
                <motion.div
                    key={current}
                    className="absolute inset-0"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1 }}
                >
                    <img
                        src={heroSlides[current].image}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/50 flex flex-col justify-center items-center text-center text-white px-4">
                        <h1 className="text-4xl md:text-6xl font-bold mb-4">
                            {heroSlides[current].title}
                        </h1>
                        <p className="text-lg md:text-2xl mb-6">
                            {heroSlides[current].subtitle}
                        </p>
                        <div className="flex gap-4">
                            <Button asChild>
                                <Link href="/confirm">Confirm Registration</Link>
                            </Button>
                            {site ? 
                                <LogoutButton />
                                :
                                <Button asChild>
                                    <Link href="/signin">Sign In</Link>
                                </Button>
                            }
                        </div>
                    </div>
                </motion.div>
            </AnimatePresence>
        </div>
    )
}
