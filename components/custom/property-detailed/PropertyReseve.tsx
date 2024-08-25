"use client";

import React, { useState } from "react";
import { makeReservation } from "@/actions/reservations";
import { Property, userProfileExtended } from "@/types";
import { useRouter } from "next/navigation";
import { availableStatus, idleStatus, reservationPeriods } from "@/constants";
import { useToast } from "@/components/ui/use-toast";
import DialogComponent from "@/components/shared/DialogComponent";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { BaseComponent } from "@/components/ui/dropdown/BaseComponent";
import { AdminReservationDialog } from "./AdminReservationDialog";

const PropertyReserve = ({
  property,
  isAdmin,
  tenants,
}: {
  property: Property;
  isAdmin: boolean;
  tenants: userProfileExtended[];
}) => {
  const router = useRouter();
  const { toast } = useToast();
  const [check, setCheck] = useState(false);
  const [period, setPeriod] = useState("");

  const showAction =
    property.status === availableStatus ||
    (property.status === idleStatus && isAdmin);
  const reservationPayload = {
    property_ref_id: property._id,
    desired_semesters_stay: period,
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
        variant: res.type === "ok" ? "ok" : "error",
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
      {showAction && (
        <>
          {isAdmin ? (
            <AdminReservationDialog property={property} tenants={tenants} />
          ) : (
            <DialogComponent
              buttonTitle="Reserve"
              dialogTitle={`Reserve Property ${property.property_id} - Are you absolutely sure ?`}
              dialogDescription="Upon confirmation, the property will be temporarily reserved for you. After the reservation, please submit the contracts promptly to secure your reservation in my reservation page. Failure to do so will result in cancellation of the reservation and adverse effects on your next reservations. Please visit information page for more details."
              submitTitleMain="Reserve"
              submitMainButtonDisable={!check || period === ""}
              cls="py-5 px-7 text-bold primary-background-color secondary-font-color"
              clickSubmit={() => {
                handleReservation();
              }}
            >
              <div className="flex flex-col justify-start gap-2">
                <Label htmlFor="desired-semesters" className="text-left">
                  Please select desired number of semesters to reserve
                </Label>
                <Label htmlFor="info-desired" className="text-left text-xs">
                  * We cannot guarantee availability for all requested
                  semesters, but try our best to accommodate you.
                </Label>
                <BaseComponent
                  value={period}
                  options={reservationPeriods}
                  optionsLabel={"Desired semesters stay"}
                  showAllItem={false}
                  handleSelect={(selectItem: string) => {
                    const periodItem = reservationPeriods.find(
                      (option) => option.id === selectItem
                    );
                    if (periodItem?.id) {
                      setPeriod(periodItem.id);
                    }
                  }}
                />
              </div>
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
                  I hereby confirm that I have read and understood all
                  information regarding the reservation.
                </label>
              </div>
            </DialogComponent>
          )}
        </>
      )}
    </div>
  );
};

export default PropertyReserve;
