import AdminFilterSection from "@/components/custom/manage-properties/AdminFilterSection";
import PageTitle from "@/components/shared/PageTitle";
import { Button } from "@/components/ui/button";
import React, { Suspense } from "react";
import { DataTable } from "@/components/ui/data-table/DataTable";
import { getProperties } from "@/actions/properties";
import { FilterParamTypes, Property, SortOption } from "@/types";
import { columns } from "@/components/custom/manage-properties/PropertiesColumns";
import { initialVisibility } from "@/constants";
import { Skeleton } from "@/components/ui/Skelton";

const Page = async ({ searchParams }: { searchParams: FilterParamTypes }) => {
  let properties: Property[] = [];

  const sort = searchParams.sort;
  const page = 1;

  const sortOption: SortOption =
    sort === "recent-update"
      ? { updated_at: -1 }
      : sort === "room-asc"
      ? { property_id: 1 }
      : sort === "room-decs"
      ? { property_id: -1 }
      : { created_at: -1 };

  const data = await getProperties(-1, page, sortOption, searchParams, "all");
  properties = JSON.parse(JSON.stringify(data));

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
          <DataTable
            columns={columns}
            data={properties}
            initialVisibility={initialVisibility}
          />
        </Suspense>
      </div>
    </div>
  );
};

export default Page;
