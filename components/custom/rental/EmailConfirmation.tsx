import { ReservationType } from "@/types";
import React from "react";
import { GoCheckCircleFill } from "react-icons/go";
import ConfirmationButton from "./ConfirmationButton";
import { formatDateTime } from "@/lib/utils";

const EmailConfirmation = ({
  reservation,
}: {
  reservation: ReservationType;
}) => {
  const confirmationStatus =
    reservation?.rental_end?.tenant_confirmation_status;
  const endDate = reservation.to
    ? formatDateTime(new Date(String(reservation.to))).simpleDate
    : "-";

  return (
    <div className="flex flex-col items-center justify-center">
      {confirmationStatus ? (
        <>
          <GoCheckCircleFill className="text-4xl success-color mb-4" />
          <h1 className="text-2xl font-bold mb-2">
            Moving Out Confirmation - Success
          </h1>
          <p className="text-lg mb-4 text-center max-w-[700px]">
            The moving-out process has been successfully confirmed with the
            administrators. Please plan your move on or before the specified
            date to ensure a smooth transition for the new tenant.
          </p>
        </>
      ) : (
        <>
          <h1 className="text-2xl font-bold mb-2">
            Moving Out Confirmation - Form
          </h1>
          <p className="text-lg mb-4 text-center max-w-[700px]">
            Your rental contract will be terminated soon. Please confirm your
            moving out date of {endDate}, with us immediately. If you require an
            extension for valid reasons, contact the administrator listed on the
            contact page as soon as possible.
          </p>
          <ConfirmationButton
            reservationId={reservation._id}
            endDate={endDate}
          />
        </>
      )}
    </div>
  );
};

export default EmailConfirmation;
