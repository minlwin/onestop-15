import * as LucideIcons from 'lucide-react'

export type IconType = keyof typeof LucideIcons

export default function IconWidget({icon, className} : {icon : IconType, className?: string}) {
    const Icon = LucideIcons[icon] as LucideIcons.LucideIcon
    return <Icon className={className} />
}