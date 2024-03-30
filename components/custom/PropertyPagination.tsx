"use client";

import React, { ReactNode, useEffect } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const PropertyPagination = ({
  children,
  totalPages,
}: {
  children: ReactNode;
  totalPages: number;
}) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const currentPage = searchParams.get("page")?.toString();

  const handlePagination = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams);
    if (pageNumber) {
      params.set("page", String(pageNumber));
    } else {
      params.set("page", "1");
    }
    replace(`${pathname}?${params.toString()}`);
  };

  useEffect(() => {
    handlePagination(1);
  }, []);

  return (
    <div>
      {children}
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>
          <>
            {Array.from({ length: totalPages }, (_, index) => {
              const pageNumber = index + 1;
              return (
                <PaginationItem key={pageNumber}>
                  <PaginationLink
                    isActive={String(pageNumber) === currentPage}
                    href="#"
                    onClick={() => handlePagination(pageNumber)}
                  >
                    {pageNumber}
                  </PaginationLink>
                </PaginationItem>
              );
            })}
          </>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" className="disabled" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default PropertyPagination;
