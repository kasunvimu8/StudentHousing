import PageTitle from "@/components/shared/PageTitle";
import React, { Suspense } from "react";
import { Skeleton } from "@/components/ui/Skelton";
import MyReservationTable from "@/components/custom/reservation/MyReservationTable";

const Page = async () => {
  return (
    <div className="h-full w-full">
      <div className="grid grid-cols-2 gap-2">
        <div className="col-span-2 md:col-span-1">
          <PageTitle title="My Reservations" />
        </div>
      </div>
      <div className="mx-auto py-5">
        <Suspense
          key="manage-properties-table"
          fallback={
            <Skeleton className="h-[300px] w-full rounded-lg section-light-background-color" />
          }
        >
          <MyReservationTable />
        </Suspense>
      </div>
    </div>
  );
};

export default Page;
