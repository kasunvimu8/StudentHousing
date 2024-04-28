import { getUserType } from "@/actions/profiles";
import { getReservation } from "@/actions/reservations";
import ContractDocument from "@/components/custom/reservation/ContractDocument";
import ReservationInformation from "@/components/custom/reservation/ReservationInformation";
import PageTitle from "@/components/shared/PageTitle";
import {
  documentSubmission,
  reservationCancelled,
  reservationCompleted,
  reservationStatuses,
} from "@/constants";
import { ReservationType } from "@/types";
import React from "react";

const page = async ({ params }: { params: { reservationId: string } }) => {
  const reservation: ReservationType = await getReservation(
    params.reservationId
  );
  const statusData = reservationStatuses.find(
    (item) => item.id === reservation?.status
  );

  /**
   * editable : enable for normal users when reservation is in document submission state
   * for admins it enables allways execpt for the cancelled and rented reservations
   */
  let passedStatus = true;
  let isDocumentSubmission = reservation?.status === documentSubmission;
  let isCancelled = reservation?.status === reservationCancelled;
  let isRented = reservation?.status === reservationCompleted;
  const userType = await getUserType();
  const isAdmin = userType === "admin";
  let editable = isDocumentSubmission || (isAdmin && !isCancelled && !isRented);

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
      {isDocumentSubmission && (
        <div className="mx-auto py-5">
          <ReservationInformation reservation={reservation} />
        </div>
      )}
      {isCancelled ? (
        <div className="mx-auto py-5">
          <div className="font-normal text-sm">
            Your reservation has been cancelled by the administration due to
            below reason. Please contact if you have a problem related to this
            cancellation.
          </div>
          <div className="pt-4 font-normal text-sm">Reason :</div>
          <div className="pt-2 font-normal text-sm">
            The property has been withdrawn from the listing.
          </div>
        </div>
      ) : (
        <div className="mx-auto py-5">
          <ContractDocument
            reservation={reservation}
            editable={editable}
            isDocumentSubmission={isDocumentSubmission}
            isAdmin={isAdmin}
          />
        </div>
      )}
    </div>
  );
};

export default page;
