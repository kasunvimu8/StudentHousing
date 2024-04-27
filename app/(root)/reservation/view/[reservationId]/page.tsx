import { getReservation } from "@/actions/reservations";
import ContractDocument from "@/components/custom/reservation/ContractDocument";
import PageTitle from "@/components/shared/PageTitle";
import { reservationStatuses } from "@/constants";
import { ReservationType } from "@/types";
import Link from "next/link";
import React from "react";

const page = async ({ params }: { params: { reservationId: string } }) => {
  const reservation: ReservationType = await getReservation(
    params.reservationId
  );
  const statusData = reservationStatuses.find(
    (item) => item.id === reservation?.status
  );
  let passedStatus = true;

  return (
    <div className="h-full w-full">
      <div className="grid grid-cols-2 gap-2">
        <div className="col-span-2 md:col-span-1">
          <PageTitle title={`Reservation - ${reservation.property_id}`} />
        </div>
      </div>
      <div className="mx-auto py-5">
        <div className="flex justify-center items-center flex-col">
          <div className="font-semibold text-2xl pb-1">
            {statusData?.description || ""}
          </div>
          <div className="font-normal text-sm text-center pb-1">
            {statusData?.actionDescription || ""}
          </div>
          <div className="text-sm primary-light-font-color">{`Reference Id : ${reservation._id}`}</div>

          <div className="max-w-350 mx-auto flex items-center justify-between gap-10 pt-4">
            {reservationStatuses.map((reservationStatus) => {
              const currentStatus =
                reservationStatus.id === reservation?.status
                  ? "section-highlight-background-color secondary-font-color"
                  : passedStatus
                  ? "bg-gray-200 primary-font-color"
                  : "section-light-background-color primary-font-color";

              if (reservationStatus.id === reservation?.status) {
                passedStatus = false;
              }

              return (
                reservationStatus.workflowDispaly && (
                  <div
                    className="relative flex items-center"
                    key={reservationStatus.id}
                  >
                    <span className={`workflow-number ${currentStatus}`}>
                      {reservationStatus.workflowNumber}
                    </span>
                    {reservationStatus.workflowNumber !== 4 && (
                      <span className="workflow-connector"></span>
                    )}
                  </div>
                )
              );
            })}
          </div>
        </div>
      </div>

      <div className="mx-auto py-5">
        <ul className="list-disc p-2">
          <li className="p-1 font-normal text-sm">
            {`For more details about the property (including the contract
            documents), please click `}
            <Link
              href={`/property/view/${reservation.property_ref_id}`}
              className="font-bold"
            >
              here
            </Link>
          </li>
          <li className="p-1 font-normal text-sm">
            {` For more details about the reservation process, please click `}
            <Link href="/information" className="font-bold">
              here
            </Link>
          </li>
          <li className="p-1 font-normal text-sm">
            Please ensure that all documents are submitted before April 30,
            2024. Failure to do so will result in automatic cancellation of the
            reservation.
          </li>
        </ul>
      </div>
      <div className="mx-auto py-5">
        <ContractDocument reservation={reservation} />
      </div>
    </div>
  );
};

export default page;
