import { getUserId } from "@/actions/profiles";
import { formatDateTime } from "@/lib/utils";
import { ReservationType } from "@/types";
import Link from "next/link";
import React from "react";
import DocumentsList from "./DocumentsList";

const ReservationInformation = async ({
  reservation,
}: {
  reservation: ReservationType;
}) => {
  const userId = await getUserId();
  const convention = `${userId}`;

  return (
    <ul className="list-disc p-2">
      <li className="p-1 font-normal text-sm">
        {`Please upload the files listed below. Ensure that each document is named
        according to your ID used during account creation. Adhering to the file `}
        <span className="font-bold">
          naming conventions is mandatory.
          {`(<enrollment_id>-<file_name>.pdf)`}
        </span>
        <DocumentsList convention={convention} />
      </li>
      <li className="p-1 font-normal text-sm">
        {`Please ensure that all documents are submitted `}
        <span className="font-bold">
          before{" "}
          {formatDateTime(new Date(reservation?.document_submission_deadline))
            ?.simpleDate || ""}
        </span>
        . Failure to do so will result in cancellation of the reservation.
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
