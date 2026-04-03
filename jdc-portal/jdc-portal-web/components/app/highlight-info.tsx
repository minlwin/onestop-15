export default function HighlightInfo({label, value} : {label: string, value: string}) {
    return (
        <div className="bg-gray-100 p-4 rounded-xl">
            <p className="text-sm text-gray-500">{label}</p>
            <p className="font-semibold">{value}</p>
        </div>
    )
}