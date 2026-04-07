import React from "react";
import AppBar, { AppBarProps } from "./app-bar";

type OfficePageProps = AppBarProps & {
    children : React.ReactNode
}

export default function OfficePageDecorator({name, segments, children} : OfficePageProps) {
    return (
        <div className="space-y-4">
            <AppBar name={name} segments={segments} />
            <main className="px-4 space-y-4">
                {children}
            </main>
        </div>
    )
}