import React from "react";

export default function WithoutMenuLayout({children} : {children : React.ReactNode}) {
    return (
        <div>
            {children}
        </div>
    )
}