import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "~/components/ui/pagination";

type Props = {
    currentPage: number;
    nextPage: number;
    pathname: string;
    previousPage: number;
    totalPages: number;
};

export default function ReusablePagination({
    currentPage,
    nextPage,
    pathname,
    previousPage,
    totalPages,
}: Props) {
    return (
        <Pagination className="reusable-pagination">
            <PaginationContent>
                <PaginationItem>
                    {currentPage > 1 && (
                        <PaginationPrevious
                            rel="prefetch"
                            href={`${pathname}?page=${previousPage}`}
                        />
                    )}
                </PaginationItem>
                {currentPage - 2 > 0 && (
                    <PaginationItem>
                        <PaginationLink
                            rel="prefetch"
                            href={`${pathname}?page=${currentPage - 2}`}
                        >
                            {currentPage - 2}
                        </PaginationLink>
                    </PaginationItem>
                )}
                {currentPage - 1 > 0 && (
                    <PaginationItem>
                        <PaginationLink
                            rel="prefetch"
                            href={`${pathname}?page=${currentPage - 1}`}
                        >
                            {currentPage - 1}
                        </PaginationLink>
                    </PaginationItem>
                )}
                <PaginationItem>
                    <PaginationLink>{currentPage}</PaginationLink>
                </PaginationItem>
                {currentPage + 1 <= totalPages && (
                    <PaginationItem>
                        <PaginationLink
                            rel="prefetch"
                            href={`${pathname}?page=${currentPage + 1}`}
                        >
                            {currentPage + 1}
                        </PaginationLink>
                    </PaginationItem>
                )}
                {currentPage + 2 <= totalPages && (
                    <PaginationItem>
                        <PaginationLink
                            rel="prefetch"
                            href={`${pathname}?page=${currentPage + 2}`}
                        >
                            {currentPage + 2}
                        </PaginationLink>
                    </PaginationItem>
                )}
                <PaginationItem>
                    {currentPage <= totalPages && (
                        <PaginationNext
                            rel="prefetch"
                            href={`${pathname}?page=${nextPage}`}
                        />
                    )}
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
}
