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
        {`Please upload the files listed below. Ensure that each document is named
        according to your ID used during account creation (e.g., Passport ID or
        NIC). Adhering to the file `}
        <span className="font-bold">
          naming conventions is mandatory.
          {`(<passport_id>-<reservation_id>-<file_name>.pdf)`}
        </span>
        <ul className="list-decimal p-3">
          <li className="p-1 font-normal text-sm ">
            Signed Contract Document{" "}
            <span className="primary-light-font-color">
              (e.g : N123456-652e606b021a28adfd286910-contract.pdf)
            </span>
          </li>
          <li className="p-1 font-normal text-sm">
            Scanned Passport or NIC {" "}
            <span className="primary-light-font-color">
              (e.g : N123456-652e606b021a28adfd286910-id.pdf)
            </span>
          </li>
          <li className="p-1 font-normal text-sm">
            Enrollment Certificate{" "}
            <span className="primary-light-font-color">
              (e.g :
              N123456-652e606b021a28adfd286910-enrollment-certificate.pdf)
            </span>
          </li>
        </ul>
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
        If you have directed here with admin comment, it means your previous
        documents were rejected and you're being requested to resubmit them.
      </li>
    </ul>
  );
};

export default ReservationInformation;
