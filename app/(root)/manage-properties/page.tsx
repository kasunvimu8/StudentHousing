import AdminFilterSection from "@/components/custom/manage-properties/AdminFilterSection";
import PageTitle from "@/components/shared/PageTitle";
import { Button } from "@/components/ui/button";
import React, { Suspense } from "react";
import { FilterParamTypes } from "@/types";
import { Skeleton } from "@/components/ui/Skelton";
import ManagePropertyTable from "@/components/custom/manage-properties/ManagePropertyTable";

const Page = async ({ searchParams }: { searchParams: FilterParamTypes }) => {
  return (
    <div className="h-full w-full">
      <div className="grid grid-cols-2 gap-2">
        <div className="col-span-2 md:col-span-1">
          <PageTitle title="Manage Properties" />
        </div>
        <div className="col-span-2 md:col-span-1 self-end justify-end flex">
          <Button className="py-5 px-7 section-highlight-background-color secondary-font-color text-bold">
            Create Proeprty
          </Button>
        </div>
      </div>
      <AdminFilterSection />
      <div className="mx-auto py-5">
        <Suspense
          key="manage-properties-table"
          fallback={
            <Skeleton className="h-[300px] w-full rounded-lg section-light-background-color" />
          }
        >
          <ManagePropertyTable searchParams={searchParams} />
        </Suspense>
      </div>
    </div>
  );
};

export default Page;
