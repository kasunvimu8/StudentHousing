import { formatDateTime } from "@/lib/utils";
import { ReservationType } from "@/types";
import React from "react";

const AdminReservationInformation = async ({
  reservation,
}: {
  reservation: ReservationType;
}) => {
  return (
    <ul className="list-disc p-2">
      <li className="p-1 font-normal text-sm">
        {`Tenant should submit the documents `}
        <span className="font-bold">
          by{" "}
          {formatDateTime(new Date(reservation?.document_submission_deadline))
            ?.simpleDate || ""}
        </span>
        . If the deadline has passed, you may cancel the reservation.
      </li>
    </ul>
  );
};

export default AdminReservationInformation;
