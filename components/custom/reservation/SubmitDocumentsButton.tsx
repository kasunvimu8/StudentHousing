"use client";

import React from "react";
import { Button } from "../../ui/button";
import ConfirmationComponent from "@/components/shared/ConfirmationComponent";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { ReservationType } from "@/types";
import { submitDocuments } from "@/actions/reservations";
import { getNextStatus } from "@/lib/utils";

const SubmitDocumentsButton = ({
  reservation,
  files,
  isAdmin
}: {
  files: any;
  reservation: ReservationType;
  isAdmin: boolean;
}) => {
  const { toast } = useToast();
  const router = useRouter();
  const nextStatus: string = isAdmin ? reservation.status : getNextStatus(reservation.status);

  const submitDocumentsHandle = async () => {
    const res: { msg: string; type: string } = await submitDocuments(
      files,
      reservation._id,
      nextStatus
    );
    if (res) {
      toast({
        title: `Upload Documents : ${res.type === "ok" ? "Success" : "Failed"}`,
        description: res.msg,
      });

      if (res.type === "ok") {
        router.push("/my-reservations");
      } else {
        router.push(`/reservations/view/${reservation._id}`);
      }
    }
  };

  return (
    <div className="flex justify-end pt-6">
      <ConfirmationComponent
        title="Upload Signed Documents - Confirmation"
        description="Once you confirm, your contract documents will be uploaded to the administration for review. No alterations can be made to any document thereafter."
        confirmedCallback={submitDocumentsHandle}
        disabled={files.length === 0}
      >
        <Button className="py-5 px-10 primary-background-color secondary-font-color self-end">
          Uplaod
        </Button>
      </ConfirmationComponent>
    </div>
  );
};

export default SubmitDocumentsButton;
