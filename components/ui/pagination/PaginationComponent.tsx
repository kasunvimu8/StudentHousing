"use client";

import React, { ReactNode } from "react";
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
import { numberPagesDisplayInPagination } from "@/constants";
import { LuHouse } from "react-icons/lu";
import GotoTop from "@/components/ui/pagination/GotoTop";

const PaginationComponent = ({
  children,
  totalPages,
  currentPage,
}: {
  children: ReactNode;
  totalPages: number;
  currentPage: number;
}) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  let page = currentPage;
  page = !page || page < 1 ? 1 : page;
  const prevPage = page - 1 > 0 ? page - 1 : 1;
  const nextPage = page + 1;
  const perPage = numberPagesDisplayInPagination - 1;

  const pageNumbers = [];
  for (let i = page - perPage; i <= page + perPage; i++) {
    if (i >= 1 && i <= totalPages && pageNumbers.length <= perPage) {
      pageNumbers.push(i);
    }
  }

  const handlePagination = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams);
    if (pageNumber) {
      params.set("page", String(pageNumber));
    } else {
      params.set("page", "1");
    }

    replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <React.Fragment>
      {children}
      {totalPages > 0 ? (
        <>
          <GotoTop />
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => handlePagination(prevPage)}
                  className={
                    currentPage === 1
                      ? "pointer-events-none primary-light-font-color"
                      : "cursor-pointer"
                  }
                />
              </PaginationItem>
              <>
                {pageNumbers.map((pageNumber, index) => (
                  <PaginationItem key={pageNumber}>
                    <PaginationLink
                      key={index}
                      isActive={pageNumber === currentPage}
                      onClick={() => handlePagination(pageNumber)}
                      className="cursor-pointer"
                    >
                      {pageNumber}
                    </PaginationLink>
                  </PaginationItem>
                ))}
              </>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext
                  onClick={() => handlePagination(nextPage)}
                  className={
                    page === totalPages
                      ? "pointer-events-none primary-light-font-color"
                      : "cursor-pointer"
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </>
      ) : (
        <div className="flex-center wrapper min-h-[200px] w-full flex-col gap-3 py-10 md:py-20 text-center justify-center items-center">
          <div className="flex justify-center">
            <LuHouse className="align-center w-[40px] h-[40px] primary-font-color opacity-40" />
          </div>
          <h3 className="text-lg font-medium">No Data Found</h3>
          <div className="text-sm font-normal ">Please try again later !</div>
        </div>
      )}
    </React.Fragment>
  );
};

export default PaginationComponent;
