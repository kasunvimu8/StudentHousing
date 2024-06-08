"use client";

import { confirmMovingOut } from "@/actions/rentals";
import DialogComponent from "@/components/shared/DialogComponent";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/components/ui/use-toast";
import React, { useState } from "react";

function ConfirmationButton({
  reservationId,
  endDate,
}: {
  reservationId: string;
  endDate: string;
}) {
  const { toast } = useToast();
  const [check, setCheck] = useState(false);

  const handleConfirmation = async () => {
    const res: { msg: string; type: string } = await confirmMovingOut(
      reservationId
    );

    if (res) {
      toast({
        title: `Moving Out Confirmation : ${
          res.type === "ok" ? "Success" : "Failed"
        }`,
        description: res.msg,
        variant: res.type === "ok" ? "ok" : "error",
      });
    }
  };

  return (
    <DialogComponent
      buttonTitle="Confirm"
      dialogTitle="Confirm Moving Out"
      dialogDescription="Upon Confirm, The moving-out process will be confirmed with the administrators."
      submitTitleMain="Confirm"
      submitMainButtonDisable={!check}
      cls="py-5 px-7 text-bold primary-background-color secondary-font-color"
      clickSubmit={handleConfirmation}
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
          I hereby confirm that I will move out by {endDate}.
        </label>
      </div>
    </DialogComponent>
  );
}

export default ConfirmationButton;
