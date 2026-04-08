import { Avatar, AvatarFallback } from "../ui/avatar";

export default function NameInfo({name, subtitle} : {name : string, subtitle : string}) {
    return (
        <div className="flex gap-3 items-center">
            <Avatar size="lg">
                <AvatarFallback>{name.substring(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>

            <div>
                <h1 className="text-3xl font-semibold">{name}</h1>
                <p>{subtitle}</p>
            </div>
        </div>
    )
}