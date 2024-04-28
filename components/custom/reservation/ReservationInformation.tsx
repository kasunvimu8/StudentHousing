import { expirationDuration } from "@/constants";
import { calculateFutureDate, formatDateTime } from "@/lib/utils";
import { ReservationType } from "@/types";
import Link from "next/link";
import React from "react";

const ReservationInformation = ({
  reservation,
}: {
  reservation: ReservationType;
}) => {
  const expiredDate = calculateFutureDate(
    new Date(reservation.created_at),
    expirationDuration
  );
  return (
    <ul className="list-disc p-2">
      <li className="p-1 font-normal text-sm">
        {`For more details about the property (including the contract
            documents), please click `}
        <Link
          href={`/property/view/${reservation.property_ref_id}`}
          className="font-bold"
        >
          here.
        </Link>
      </li>
      <li className="p-1 font-normal text-sm">
        {` For more details about the reservation process, please click `}
        <Link href="/information" className="font-bold">
          here.
        </Link>
      </li>
      <li className="p-1 font-normal text-sm">
        {`Please ensure that all documents are submitted `}
        <span className="font-bold">
          before {formatDateTime(expiredDate).simpleDate}
        </span>
        . Failure to do so will result in automatic cancellation of the
        reservation.
      </li>
      <li className="p-1 font-normal text-sm">
        Please ensure that all required documents are fully completed before
        uploading. No alterations will be possible thereafter.
      </li>
    </ul>
  );
};

export default ReservationInformation;
