import React from "react";
import ClassInformationComponent from "./class-information";
import PageTitle from "./page-title";

export default function ClassDecorateLayout({title, classId, children} : {title:string, classId : string, children: React.ReactNode}) {
    return (
        <main className="space-y-4">
            <PageTitle title={title} />
            <div className="flex flex-col md:flex-row gap-8">
                <div className="flex-1">
                    <ClassInformationComponent classId={classId} />
                </div>

                <div className="flex-1">
                    {children}
                </div>
            </div>
        </main>
    )
}