"use client";

import FileUploadComponent from "@/components/shared/FileUploadComponent";
import { PropertySectionProps } from "@/types";
import React from "react";

const ContractDocumentSection: React.FC<PropertySectionProps> = ({
  propertyState,
  updateLocalState,
}) => {
  return (
    <FileUploadComponent
      propertyState={propertyState}
      updateLocalState={updateLocalState}
      uploadKey="documents"
      title="Contract Documents"
    />
  );
};

export default ContractDocumentSection;
