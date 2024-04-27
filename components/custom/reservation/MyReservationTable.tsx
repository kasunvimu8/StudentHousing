import React from "react";
import { getMyReservations } from "@/actions/reservations";
import { DataTable } from "@/components/ui/data-table/DataTable";
import { initialVisibilityMyReservations } from "@/constants";
import { columns } from "@/components/custom/reservation/MyReservationsColumns";
import { getUserId } from "@/lib/user";

const MyReservationTable = async () => {
  const user_id = getUserId();
  const data = await getMyReservations(user_id);

  return (
    <DataTable
      columns={columns}
      data={data}
      initialVisibility={initialVisibilityMyReservations}
    />
  );
};

export default MyReservationTable;
