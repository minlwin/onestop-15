import { cn } from "@/lib/utils";

export default function HighlightInfo({label, value, className} : {label: string, value: string, className?: string}) {
    return (
        <div className={cn("bg-gray-100 p-4 rounded-xl", className)}>
            <p className="text-sm text-gray-500">{label}</p>
            <p className="font-semibold">{value}</p>
        </div>
    )
}