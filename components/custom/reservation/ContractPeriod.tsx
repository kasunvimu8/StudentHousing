"use client";

import { formatDateTime, formatDateToISOStringWithTimeZone } from "@/lib/utils";
import React, { useState } from "react";
import { BaseComponent as Calender } from "@/components/ui/calendar/BaseComponent";
import ConfirmationComponent from "@/components/shared/ConfirmationComponent";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { updateRentalPeriod } from "@/actions/reservations";

const ContractPeriod = ({
  reservationId,
  isAdmin,
  from,
  to,
}: {
  reservationId: string;
  isAdmin: boolean;
  from?: string;
  to?: string;
}) => {
  const [fromDate, setfromDate] = useState(from ? from : "");
  const [toDate, setToDate] = useState(to ? to : "");
  const { toast } = useToast();

  const udpdateRentalPeriod = async () => {
    const res: { msg: string; type: string } = await updateRentalPeriod(
      reservationId,
      fromDate,
      toDate
    );
    if (res) {
      toast({
        title: `Rental Period Update : ${
          res.type === "ok" ? "Success" : "Failed"
        }`,
        description: res.msg,
      });
    }
  };

  return (
    <div className="grid grid-cols-2 pt-6 gap-5">
      <div className="col-span-2 md:col-span-1 grid grid-rows-2 gap-2">
        <div className="text-sm text-center self-center font-normal primary-light-font-color">
          Rented From
        </div>
        {isAdmin ? (
          <div className="text-sm font-normal">
            <Calender
              date={fromDate === "" ? undefined : new Date(fromDate)}
              handleSelect={(value) =>
                setfromDate(String(formatDateToISOStringWithTimeZone(value)))
              }
            />
          </div>
        ) : (
          <div className="text-sm font-normal text-center self-center">{formatDateTime(new Date(String(fromDate))).simpleDate}</div>
        )}
      </div>

      <div className="col-span-2 md:col-span-1 grid grid-rows-2 gap-2">
        <div className="text-sm text-center self-center font-normal primary-light-font-color">
          Rented To
        </div>
        {isAdmin ? (
          <div className="text-sm font-normal">
            <Calender
              date={toDate === "" ? undefined : new Date(toDate)}
              handleSelect={(value) =>
                setToDate(String(formatDateToISOStringWithTimeZone(value)))
              }
            />
          </div>
        ) : (
          <div className="text-sm font-normal text-center self-center">{formatDateTime(new Date(String(toDate))).simpleDate}</div>
        )}
      </div>

      <div className="col-span-2 pt-4">
        <ConfirmationComponent
          title={`Update Rental Period - Are you absolutely sure ?`}
          description={
            "This will update the start and end dates of the rental period"
          }
          confirmedCallback={() => udpdateRentalPeriod()}
        >
          <div className="flex justify-end">
            <Button
              className="primary-background-color secondary-font-color self-end disabled:bg-white disabled:primary-font-color"
              size="lg"
            >
              Update Rental Period
            </Button>
          </div>
        </ConfirmationComponent>
      </div>
    </div>
  );
};

export default ContractPeriod;
