import { Pager } from "@/lib/types";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink } from "../ui/pagination";
import { ArrowLeft, ArrowRight } from "lucide-react";

export default function PaginationComponent({pager, onPageChange} : {pager?: Pager, onPageChange?: (page: number) => void}) {
    
    if(!pager) {
        return <></>
    }

    return (
        <nav className="">
            <Pagination>
                <PaginationContent className="flex items-center">
                    <PaginationItem>
                        <PaginationLink onClick={onPageChange ? () => onPageChange(0) : undefined}>
                            <ArrowLeft className="size-4" />
                        </PaginationLink>
                    </PaginationItem>

                    {pager.links[0] > 0 && 
                        <PaginationItem>
                            <PaginationEllipsis />
                        </PaginationItem>
                    }

                    {pager.links.map((link) => (
                        <PaginationItem key={link}>
                            <PaginationLink onClick={onPageChange ? () => onPageChange(link) : undefined} isActive={link === pager.page}>
                                {link + 1}
                            </PaginationLink>
                        </PaginationItem>
                    ))}

                    {pager.links[pager.links.length - 1] < pager.totalPages - 1 && 
                        <PaginationItem>
                            <PaginationEllipsis />
                        </PaginationItem>
                    }

                    <PaginationItem>
                        <PaginationLink onClick={onPageChange ? () => onPageChange(pager.totalPages - 1) : undefined}>
                            <ArrowRight className="size-4" />
                        </PaginationLink>
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </nav>
    )
}