import React from "react";

export default function WithMenuLayout({children} : {children : React.ReactNode}) {
    return (
        <div>
            {children}
        </div>
    )
}