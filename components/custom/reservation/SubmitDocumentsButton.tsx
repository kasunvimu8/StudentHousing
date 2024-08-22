"use client";

import React, { useState } from "react";
import DialogComponent from "@/components/shared/DialogComponent";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";

const SubmitDocumentsButton = ({
  filesIndicators,
  handleUpdate,
}: {
  filesIndicators: string[];
  handleUpdate: (comment: string) => {};
}) => {
  const [comment, setComment] = useState("");
  const [check, setCheck] = useState(false);

  const submitDocumentsHandle = async (comment: string) => {
    // call the callback in the parent to save files & document submission
    handleUpdate(comment);
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
        displayButtonDisable={filesIndicators.length !== 3}
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
        </div>
      </DialogComponent>
    </div>
  );
};

export default SubmitDocumentsButton;
