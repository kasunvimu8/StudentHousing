"use client";

import React, { useState } from "react";
import { Button } from "../../ui/button";
import { makeReservation } from "@/actions/reservations";
import { Property } from "@/types";
import ConfirmationComponent from "@/components/shared/ConfirmationComponent";
import { useRouter } from "next/navigation";
import { reservationPayloadSchema } from "@/lib/validators";
import { ZodError } from "zod";
import { availableStatus } from "@/constants";
import { useToast } from "@/components/ui/use-toast";
import DialogComponent from "@/components/shared/DialogComponent";
import { Checkbox } from "@/components/ui/checkbox";

const PropertyReserve = ({ property }: { property: Property }) => {
  const router = useRouter();
  const { toast } = useToast();
  const [check, setCheck] = useState(false);

  const isPropertyAvailable = property.status === availableStatus;
  const reservationPayload = { property_ref_id: property._id };
  const validatePropertyState = () => {
    try {
      reservationPayloadSchema.parse(reservationPayload);
      return true;
    } catch (error) {
      if (error instanceof ZodError) {
        return false;
      }
      return false;
    }
  };

  const handleReservation = async () => {
    const res: { msg: string; type: string } = await makeReservation(
      reservationPayload
    );
    if (res) {
      toast({
        title: `Property ${property.property_id} : Reservation ${
          res.type === "ok" ? "Success" : "Failed"
        }`,
        description: res.msg,
        variant: res.type === "ok" ? "ok" : "error"
      });

      if (res.type === "ok") {
        router.push("/my-reservations");
      } else {
        router.push("/properties");
      }
    }
  };

  return (
    <div className="flex justify-end py-6">
      {isPropertyAvailable && (
        <DialogComponent
          buttonTitle="Reserve"
          dialogTitle={`Reserve Property ${property.property_id} - Are you absolutely sure ?`}
          dialogDescription="Upon confirmation, the property will be temporarily reserved for you. Please submit the contracts promptly to secure your reservation in my reservation page. Failure to do so will result in cancellation of the reservation and adverse effects on your next reservations. You may only make one reservation at a time. Please visit information page for more details."
          submitTitleMain="Reserve"
          submitMainButtonDisable={!check}
          cls="py-5 px-7 text-bold primary-background-color secondary-font-color"
          clickSubmit={() => {
            handleReservation();
          }}
        >
          <div className="flex items-center space-x-2">
            <Checkbox
              id="terms"
              checked={check}
              onCheckedChange={() => setCheck((check) => !check)}
            />
            <label
              htmlFor="terms"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              I hereby confirm that I have read and understood all information
              regarding the reservation.
            </label>
          </div>
        </DialogComponent>
      )}
    </div>
  );
};

export default PropertyReserve;
