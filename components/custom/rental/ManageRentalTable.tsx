import React from "react";
import { getAllRentals } from "@/actions/reservations";
import { DataTable } from "@/components/ui/data-table/DataTable";
import { FilterParamTypes, SortOption } from "@/types";
import { initialVisibilityManageRentals } from "@/constants";
import { columns } from "@/components/custom/rental/ManageRentalColumns";

const ManageRentalTable = async ({
  searchParams,
}: {
  searchParams: FilterParamTypes;
}) => {
  const sort = searchParams.sort;

  const sortOption: SortOption =
    sort === "recent-update"
      ? { updated_at: -1 }
      : sort === "room-asc"
      ? { property_id: 1 }
      : sort === "room-decs"
      ? { property_id: -1 }
      : { created_at: -1 };

  const data = await getAllRentals(sortOption, searchParams);
  return (
    <DataTable
      columns={columns}
      data={data}
      initialVisibility={initialVisibilityManageRentals}
    />
  );
};

export default ManageRentalTable;
