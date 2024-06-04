"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { ReservationType } from "@/types";
import { submitDocuments } from "@/actions/reservations";
import { getNextStatus } from "@/lib/utils";
import DialogComponent from "@/components/shared/DialogComponent";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";

const SubmitDocumentsButton = ({
  reservation,
  files,
  isAdmin,
}: {
  files: any;
  reservation: ReservationType;
  isAdmin: boolean;
}) => {
  const { toast } = useToast();
  const router = useRouter();
  const [comment, setComment] = useState("");
  const [check, setCheck] = useState(false);

  // admin document uploaded wont change the workflow of the reservation process. It just edit the the content
  // only the user can forward the reservation process to 'document review'workflow from 'document submission'
  const nextStatus: string = isAdmin
    ? reservation.status
    : getNextStatus(reservation.status);

  const submitDocumentsHandle = async (comment: string) => {
    const res: { msg: string; type: string } = await submitDocuments(
      files,
      reservation._id,
      nextStatus,
      isAdmin,
      comment
    );
    if (res) {
      toast({
        title: `Upload Documents : ${res.type === "ok" ? "Success" : "Failed"}`,
        description: res.msg,
        variant: res.type === "ok" ? "ok" : "error",
      });

      if (res.type === "ok") {
        if (isAdmin) {
          router.push("/manage-reservations");
        } else {
          router.push("/my-reservations");
        }
      }
    }
  };

  return (
    <div className="flex justify-end pt-6">
      <DialogComponent
        buttonTitle="Upload"
        dialogTitle="Upload Documents - Confirmation"
        dialogDescription="Once you confirm, your contract documents will be uploaded to the administration for review. No alterations can be made to any document thereafter."
        submitTitleMain="Upload Documents"
        cls="py-5 px-7 text-bold primary-background-color secondary-font-color"
        clickSubmit={() => {
          submitDocumentsHandle(comment);
        }}
        displayButtonDisable={files.length !== 3}
        submitMainButtonDisable={!check}
      >
        <div className="flex flex-col justify-start gap-2">
          <Label htmlFor="propertyId" className="text-left pt-2">
            Additional Comments
          </Label>
          <Textarea
            placeholder="Type any additional comments here."
            value={comment}
            rows={4}
            onChange={(e) => {
              setComment(e.currentTarget.value);
            }}
          />
          {!isAdmin && (
            <div className="flex items-center space-x-2">
              <Checkbox
                id="terms"
                checked={check}
                onCheckedChange={() => setCheck((check) => !check)}
              />
              <label
                htmlFor="terms"
                className="text-sm pt-1 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                I hereby confirm that the documents are accurate and complete.
              </label>
            </div>
          )}
        </div>
      </DialogComponent>
    </div>
  );
};

export default SubmitDocumentsButton;
