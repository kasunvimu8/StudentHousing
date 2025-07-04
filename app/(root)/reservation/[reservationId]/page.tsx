import { getUserType } from "@/actions/profiles";
import { getReservation } from "@/actions/reservations";
import {
  AdminActionDocumentReview,
  AdminActionReservationCancel,
} from "@/components/custom/reservation/AdminAction";
import AdminReservationInformation from "@/components/custom/reservation/AdminReservationInformation";
import ContractDocument from "@/components/custom/reservation/ContractDocument";
import ContractPeriod from "@/components/custom/reservation/ContractPeriod";
import ReservationInformation from "@/components/custom/reservation/ReservationInformation";
import PageTitle from "@/components/shared/PageTitle";
import {
  adminType,
  documentReview,
  documentSubmission,
  reservationCancelled,
  reservationCompleted,
  reservationStatuses,
} from "@/constants";
import { ReservationType } from "@/types";
import React from "react";
import { LuInfo } from "react-icons/lu";
import { PiWarningCircleLight } from "react-icons/pi";

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
  let isDocumentReview = reservation?.status === documentReview;
  let isCancelled = reservation?.status === reservationCancelled;
  let isRented = reservation?.status === reservationCompleted;
  const userType = await getUserType();
  const isAdmin = userType === adminType;
  let editable = isDocumentSubmission || (isAdmin && !isCancelled && !isRented);

  const fileUrls =
    reservation?.signed_documents && reservation.signed_documents.length > 0
      ? reservation?.signed_documents
          .filter((doc: string) => !!doc)
          .map((doc: string) => `${process.env.BASE_URL}/api/file/${doc}`)
      : [];

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
            {isAdmin
              ? statusData?.adminActionDescription
              : statusData?.actionDescription}
          </div>
          <div className="text-sm primary-light-font-color">{`Reservation Id : ${reservation._id}`}</div>

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
          {isRented && (
            <ContractPeriod
              reservationId={reservation._id}
              isAdmin={isAdmin}
              from={reservation.from}
              to={reservation.to}
            />
          )}
        </div>
      </div>
      {isDocumentSubmission && (
        <div className="mx-auto py-5">
          {isAdmin ? (
            <AdminReservationInformation reservation={reservation} />
          ) : (
            <ReservationInformation reservation={reservation} />
          )}
        </div>
      )}

      {isCancelled ? (
        <div className="mx-auto py-5">
          <div className="font-normal text-sm">
            Your reservation has been cancelled by the administration due to
            below reason. If you have a problem related to this cancellation,
            Please contact the administrator.
          </div>
          <div className="font-normal text-sm alert-background mt-5 p-4 rounded">
            <div className="font-normal text-sm">Reason :</div>
            <div className="pt-2 font-normal text-sm">
              {reservation.admin_comment}
            </div>
          </div>
        </div>
      ) : (
        <>
          {isAdmin && reservation.user_comment && (
            <div className="font-normal text-sm alert-background p-4 rounded flex items-center">
              <LuInfo className="ml-2 text-lg" />
              <span className="ml-2">
                Tenant Comment - {reservation.user_comment}
              </span>
            </div>
          )}
          {!isAdmin && reservation.admin_comment && (
            <div className="font-normal text-sm alert-background p-4 rounded flex items-center">
              <PiWarningCircleLight className="ml-2 text-lg" />
              <span className="ml-2">
                Admin Comment - {reservation.admin_comment}
              </span>
            </div>
          )}

          {isAdmin && isDocumentSubmission ? (
            <></>
          ) : (
            <div className="mx-auto py-5">
              <ContractDocument
                reservation={reservation}
                editable={editable}
                isDocumentSubmission={isDocumentSubmission}
                isAdmin={isAdmin}
                fileUrls={fileUrls}
              />
            </div>
          )}
        </>
      )}

      {isAdmin && (
        <>
          {isDocumentSubmission && (
            <div className="flex justify-end pt-6">
              <AdminActionReservationCancel
                reservationId={reservation._id}
                propertyId={reservation.property_ref_id}
                userId={reservation.user_id}
                cls="primary-background-color secondary-font-color"
              />
            </div>
          )}
          {isDocumentReview && (
            <div className="flex justify-end pt-6">
              <AdminActionDocumentReview
                reservationId={reservation._id}
                desired_semesters_stay={reservation.desired_semesters_stay}
                propertyId={reservation.property_ref_id}
                userId={reservation.user_id}
                from={reservation.from}
                to={reservation.to}
                admin_assigned_reservation={
                  reservation.admin_assigned_reservation
                }
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default page;
