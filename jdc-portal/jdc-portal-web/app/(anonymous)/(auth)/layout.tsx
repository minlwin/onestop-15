import React from "react";

export default function WithMenuLayout({children} : {children : React.ReactNode}) {
    return (
        <div className="h-screen flex">
            <header className="flex-1"></header>
            <main className="flex-1 bg-gray-500">
                {children}
            </main>
        </div>
    )
}