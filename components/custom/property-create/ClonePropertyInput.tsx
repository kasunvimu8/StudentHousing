"use client";

import React, { useState } from "react";
import DialogComponent from "@/components/shared/DialogComponent";
import { ComboboxComponent } from "@/components/ui/combo/BaseComponent";
import { Label } from "@/components/ui/label";
import { ComboContentType } from "@/types";

const ClonePropertyInput = ({
  options,
  handleClone,
}: {
  options: ComboContentType[];
  handleClone: (propertyId: string) => void;
}) => {
  const [selectState, setSelectState] = useState("");

  const onValueChange = (value: string) => {
    setSelectState(value);
  };

  return (
    <DialogComponent
      buttonTitle="Clone Data"
      dialogTitle="Clone Data"
      dialogDescription="Choose a property to clone data from an existing property."
      submitTitleMain="Clone"
      submitMainButtonDisable={selectState === ""}
      cls="py-5 px-7 section-highlight-background-color secondary-font-color text-bold"
      clickSubmit={() => {
        const propertyItem = options.find(
          (option) => option.value === selectState
        );
        if (propertyItem?.id) {
          handleClone(propertyItem.id);
        }
      }}
    >
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="propertyId" className="text-right">
          Property Id
        </Label>
        <ComboboxComponent
          notfoundLabel="No Property Found"
          placeholder="Search Properties"
          options={options}
          value={selectState}
          onValueChange={onValueChange}
          showAllItem={false}
        />
      </div>
    </DialogComponent>
  );
};

export default ClonePropertyInput;
