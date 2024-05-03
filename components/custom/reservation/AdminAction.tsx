"use client";

import {
  approveDocument,
  cancelReservation,
  rejectReservationDocument,
} from "@/actions/reservations";
import DialogComponent from "@/components/shared/DialogComponent";
import { BaseComponent } from "@/components/ui/dropdown/BaseComponent";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { cancelledRequestedEntities } from "@/constants";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { BaseComponent as Calender } from "@/components/ui/calendar/BaseComponent";
import { formatDateToISOStringWithTimeZone } from "@/lib/utils";

export const AdminActionReservationCancel = ({
  reservationId,
  propertyId,
  userId,
  cls,
}: {
  propertyId: string;
  reservationId: string;
  userId: string;
  cls?: string;
}) => {
  const router = useRouter();
  const { toast } = useToast();
  const [user, setUser] = useState(cancelledRequestedEntities[0]?.id || "");
  const [comment, setComment] = useState("");
  const [listingEnable, setListingEnable] = useState(true);

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
      cls={`py-5 px-7 text-bold ${cls}`}
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

export const AdminActionReject = ({
  reservationId,
  cls,
}: {
  propertyId: string;
  reservationId: string;
  userId: string;
  cls?: string;
}) => {
  const router = useRouter();
  const { toast } = useToast();
  const [comment, setComment] = useState("");

  const rejectDocuments = async (comment: string) => {
    const res: { msg: string; type: string } = await rejectReservationDocument(
      reservationId,
      comment
    );
    if (res) {
      toast({
        title: `Reject Documents : ${res.type === "ok" ? "Success" : "Failed"}`,
        description: res.msg,
      });
      if (res.type === "ok") {
        router.push("/manage-reservations");
      }
    }
  };
  return (
    <DialogComponent
      buttonTitle="Reject and Resubmission"
      dialogTitle="Reject and Resubmission"
      dialogDescription="This will result in the rejection of the submitted documents and prompt the tenant to resubmit them."
      submitTitleMain="Reject and Ask for Resubmission"
      submitMainButtonDisable={comment === ""}
      cls={`py-5 px-7 text-bold ${cls}`}
      clickSubmit={() => {
        rejectDocuments(comment);
      }}
    >
      <div className="flex flex-col justify-start gap-2">
        <Label htmlFor="propertyId" className="text-left pt-2">
          Reason
        </Label>
        <Textarea
          placeholder="Type reason for the rejection here."
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

export const ApproveReservation = ({
  reservationId,
  from,
  to,
}: {
  reservationId: string;
  from: string | undefined;
  to: string | undefined;
}) => {
  const router = useRouter();
  const [fromDate, setfromDate] = useState(from ? from : "");
  const [toDate, setToDate] = useState(to ? to : "");
  const { toast } = useToast();

  const approve = async () => {
    const res: { msg: string; type: string } = await approveDocument(
      reservationId,
      fromDate,
      toDate
    );
    if (res) {
      toast({
        title: `Reservation Approval : ${
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
      buttonTitle="Approve Documents"
      dialogTitle="Approve Documents"
      dialogDescription="Once approved, the property will be allocated to the user permanently."
      submitTitleMain="Confirm"
      submitMainButtonDisable={
        !(fromDate && fromDate !== "" && toDate && toDate !== "")
      }
      cls="py-5 px-7 text-bold primary-background-color secondary-font-color"
      clickSubmit={() => {
        approve();
      }}
    >
      <div className="flex flex-col justify-start gap-2">
        <Label htmlFor="propertyId" className="text-left p-2 gap-1">
          Please update the exact rental period.
        </Label>
        <div className="grid grid-cols-3 gap-2">
          <div className="text-sm font-normal primary-light-font-color flex items-center">
            Rented From
          </div>
          <div className="text-sm font-normal col-span-2">
            <Calender
              date={fromDate === "" ? undefined : new Date(fromDate)}
              handleSelect={(value) =>
                setfromDate(String(formatDateToISOStringWithTimeZone(value)))
              }
            />
          </div>
          <div className="text-sm font-normal primary-light-font-color flex items-center">
            Rented To
          </div>
          <div className="text-sm font-normal col-span-2">
            <Calender
              date={toDate === "" ? undefined : new Date(toDate)}
              handleSelect={(value) =>
                setToDate(String(formatDateToISOStringWithTimeZone(value)))
              }
            />
          </div>
        </div>
      </div>
    </DialogComponent>
  );
};

export const AdminActionDocumentReview = ({
  reservationId,
  propertyId,
  userId,
  from,
  to,
}: {
  propertyId: string;
  reservationId: string;
  userId: string;
  from: string;
  to?: string;
}) => {
  return (
    <div className="flex justify-end gap-4">
      <AdminActionReject
        reservationId={reservationId}
        propertyId={propertyId}
        userId={userId}
        cls="primary-font-color bg-white"
      />
      <AdminActionReservationCancel
        reservationId={reservationId}
        propertyId={propertyId}
        userId={userId}
        cls="primary-font-color bg-white"
      />
      <ApproveReservation reservationId={reservationId} from={from} to={to} />
    </div>
  );
};
