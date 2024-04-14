import AdminFilterSection from "@/components/custom/manage-properties/AdminFilterSection";
import PageTitle from "@/components/shared/PageTitle";
import { Button } from "@/components/ui/button";
import React from "react";
import { DataTable } from "@/components/ui/data-table/DataTable";
import { getProperties, getProperyCount } from "@/actions/properties";
import { FilterParamTypes, Property, SortOption } from "@/types";
import { columns } from "@/components/custom/manage-properties/PropertiesColumns";
import { initialVisibility, numberOfPropertiesInDataTable } from "@/constants";

const Page = async ({ searchParams }: { searchParams: FilterParamTypes }) => {
  let properties: Property[] = [];

  const sort = searchParams.sort;
  const page = searchParams?.page ? Number(searchParams.page) : 1;

  const sortOption: SortOption =
    sort === "lowest"
      ? { rent: 1 }
      : sort === "highest"
      ? { rent: -1 }
      : { created_at: -1 };

  const data1 = getProperties(
    numberOfPropertiesInDataTable,
    page,
    sortOption,
    searchParams,
    "available"
  );
  const count = getProperyCount(searchParams);
  const [total, propertiesData] = await Promise.all([count, data1]);

  properties = JSON.parse(JSON.stringify(propertiesData));

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
      <div className="container mx-auto py-10">
        <DataTable columns={columns} data={properties} total={total} initialVisibility={initialVisibility}/>
      </div>
    </div>
  );
};

export default Page;
