"use client";

import React from "react";
import { Button } from "../../ui/button";
import { makeReservation } from "@/actions/reservations";
import { Property } from "@/types";
import { getUserId } from "@/lib/user";
import ConfirmationComponent from "@/components/shared/ConfirmationComponent";
import { useRouter } from "next/navigation";
import { reservationPayloadSchema } from "@/lib/validators";
import { ZodError } from "zod";
import { availableStatus } from "@/constants";
import { useToast } from "@/components/ui/use-toast";

const PropertyReserve = ({ property }: { property: Property }) => {
  const router = useRouter();
  const user_id = getUserId();
  const { toast } = useToast();

  const isPropertyAvailable = property.status === availableStatus;
  const reservationPayload = {
    property_ref_id: property._id,
    user_id: user_id,
  };
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
        <ConfirmationComponent
          title={`Reserve Property ${property.property_id} - Are you absolutely sure ?`}
          description="Once confirmed, your reservation quota will decrease by one. This temporarily reserves the property for you until you submit signed contracts promptly. Failure to do so will cancel the temporary reservation, making it available to other tenants. Visit Information page for more details"
          confirmedCallback={() => {
            handleReservation();
          }}
          disabled={!validatePropertyState()}
        >
          <Button className="py-5 px-10 primary-background-color secondary-font-color self-end">
            Reserve
          </Button>
        </ConfirmationComponent>
      )}
    </div>
  );
};

export default PropertyReserve;
