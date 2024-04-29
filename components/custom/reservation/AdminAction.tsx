"use client";

import { cancelReservation } from "@/actions/reservations";
import DialogComponent from "@/components/shared/DialogComponent";
import { BaseComponent } from "@/components/ui/dropdown/BaseComponent";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { cancelledRequestedEntities } from "@/constants";
import { getUserId } from "@/lib/user";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export const AdminActionReservationCancel = ({
  reservationId,
  propertyId,
  userId
}: {
  propertyId: string;
  reservationId: string;
  userId: string;
}) => {
  const router = useRouter();
  const { toast } = useToast();
  const [user, setUser] = useState(cancelledRequestedEntities[0]?.id || "");
  const [comment, setComment] = useState("");
  const [listingEnable, setListingEnable] = useState(false);

  const cancelReservationHandle = async (
    comment: string,
    user: string,
    listingEnable: boolean
  ) => {
    const res: { msg: string; type: string } = await cancelReservation(
      reservationId,
      propertyId,
      userId,
      user,
      comment,
      listingEnable
    );
    if (res) {
      toast({
        title: `Cancel Reservation : ${
          res.type === "ok" ? "Success" : "Failed"
        }`,
        description: res.msg,
      });
      if (res.type === "ok") {
        router.push("/manage-reservations");
      }
    }
  };
  return (
    <DialogComponent
      buttonTitle="Cancel Reservation"
      dialogTitle="Cancel Reservation"
      dialogDescription=""
      submitTitleMain="Cancel Reservation"
      submitMainButtonDisable={comment === "" || !user}
      cls="py-5 px-7 primary-background-color secondary-font-color text-bold"
      clickSubmit={() => {
        cancelReservationHandle(comment, user, listingEnable);
      }}
    >
      <div className="flex flex-col justify-start gap-2">
        <Label htmlFor="propertyId" className="text-left">
          Who wants to cancel the reservation ?
        </Label>
        <BaseComponent
          value={user}
          options={cancelledRequestedEntities}
          optionsLabel={"Select a Item"}
          showAllItem={false}
          handleSelect={(selectItem: string) => {
            const propertyItem = cancelledRequestedEntities.find(
              (option) => option.id === selectItem
            );
            if (propertyItem?.id) {
              setUser(propertyItem.id);
            }
          }}
        />
        <Label htmlFor="propertyId" className="text-left pt-2">
          Should the property be automatically relisted after cancellation?
        </Label>
        <Switch
          checked={listingEnable}
          onCheckedChange={() =>
            setListingEnable((listingEnable) => !listingEnable)
          }
        />
        <Label htmlFor="propertyId" className="text-left pt-2">
          Add Comment
        </Label>
        <Textarea
          placeholder="Type reason for the cancellation here."
          value={comment}
          rows={4}
          onChange={(e) => {
            setComment(e.currentTarget.value);
          }}
        />
      </div>
    </DialogComponent>
  );
};
