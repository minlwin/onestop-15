import NameInfo from "./name-info";

export default function DetailsHeader({title, subTitle, children} : {title : string, subTitle : string, children : React.ReactNode}) {
    return (
        <div className="flex items-center justify-between">
            <NameInfo name={title} subtitle={subTitle} />
            <div>
                {children}
            </div>
        </div>
    )
}