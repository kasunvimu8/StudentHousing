import React from "react";
import { getAllReservations } from "@/actions/reservations";
import { DataTable } from "@/components/ui/data-table/DataTable";
import { initialVisibilityManageReservations } from "@/constants";
import { FilterParamTypes, SortOption } from "@/types";
import { columns } from "@/components/custom/reservation/ManageReservationColumns";

const ManageReservationtable = async ({
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

  const data = await getAllReservations(sortOption, searchParams);
  return (
    <DataTable
      columns={columns}
      data={data}
      initialVisibility={initialVisibilityManageReservations}
    />
  );
};

export default ManageReservationtable;
