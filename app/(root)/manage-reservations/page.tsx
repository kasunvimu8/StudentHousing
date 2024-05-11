import PageTitle from "@/components/shared/PageTitle";
import React, { Suspense } from "react";
import { Skeleton } from "@/components/ui/Skelton";
import ManageReservationtable from "@/components/custom/reservation/ManageReservationtable";
import AdminFilterSection from "@/components/custom/reservation/AdminFilterSection";
import { FilterParamTypes } from "@/types";

const Page = async ({ searchParams }: { searchParams: FilterParamTypes }) => {
  return (
    <div className="h-full w-full">
      <div className="grid grid-cols-2 gap-2">
        <div className="col-span-2 md:col-span-1">
          <PageTitle title="Manage Reservations" />
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
          <ManageReservationtable searchParams={searchParams} />
        </Suspense>
      </div>
    </div>
  );
};

export default Page;
