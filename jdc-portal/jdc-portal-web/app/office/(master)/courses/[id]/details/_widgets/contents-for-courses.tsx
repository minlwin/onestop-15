'use client'

import DetailsTabContents from "@/components/app/details-tab-contents"
import { CourseContent } from "@/lib/model/dto/anonymous"

export default function ContentsForCourse({ contents }: { contents: CourseContent[] }) {
    return (
        <DetailsTabContents title="Course Contents" subTitle="Details about this course">
            {contents.length > 0 ? (
                <div className="space-y-4">
                    {contents.map((content, index) => (
                        <div key={content.id} className="rounded-lg border p-4">
                            <div className="flex items-start gap-3">
                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-medium">
                                    {index + 1}
                                </div>
                                <div className="flex-1">
                                    <h4 className="font-medium">{content.name}</h4>
                                    <p className="text-sm text-muted-foreground mt-1">{content.description}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-muted-foreground">No contents available for this course.</p>
            )}
        </DetailsTabContents>
    )
}