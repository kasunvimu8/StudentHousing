import React from "react";
import { getMyReservations } from "@/actions/reservations";
import { DataTable } from "@/components/ui/data-table/DataTable";
import { initialVisibilityMyReservations } from "@/constants";
import { columns } from "@/components/custom/reservation/MyReservationsColumns";
import { getUserId } from "@/actions/profiles";

const MyReservationTable = async () => {
  const userId = await getUserId();
  const data = await getMyReservations(userId);

  return (
    <DataTable
      columns={columns}
      data={data}
      initialVisibility={initialVisibilityMyReservations}
    />
  );
};

export default MyReservationTable;
