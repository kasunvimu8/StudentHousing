import PageTitle from "@/components/shared/PageTitle";
import React, { Suspense } from "react";
import { Skeleton } from "@/components/ui/Skelton";
import { FilterParamTypes } from "@/types";
import ManageRentalTable from "@/components/custom/rental/ManageRentalTable";
import AdminFilterSection from "@/components/custom/rental/AdminFilterSection";

const Page = async ({ searchParams }: { searchParams: FilterParamTypes }) => {
  return (
    <div className="h-full w-full">
      <div className="grid grid-cols-2 gap-2">
        <div className="col-span-2 md:col-span-1">
          <PageTitle title="Manage Rentals" />
        </div>
      </div>
      <AdminFilterSection />
      <div className="mx-auto py-5">
        <Suspense
          key="manage-reservations-table"
          fallback={
            <Skeleton className="h-[300px] w-full rounded-lg section-light-background-color" />
          }
        >
          <ManageRentalTable searchParams={searchParams} />
        </Suspense>
      </div>
    </div>
  );
};

export default Page;
