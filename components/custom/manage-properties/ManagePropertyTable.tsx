import { getProperties } from "@/actions/properties";
import { DataTable } from "@/components/ui/data-table/DataTable";
import { managePropertyInitialVisibility } from "@/constants";
import { FilterParamTypes, Property, SortOption } from "@/types";
import React from "react";
import { columns } from "./PropertiesColumns";

const ManagePropertyTable = async ({
  searchParams,
}: {
  searchParams: FilterParamTypes;
}) => {
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
    <DataTable
      columns={columns}
      data={properties}
      initialVisibility={managePropertyInitialVisibility}
    />
  );
};

export default ManagePropertyTable;
