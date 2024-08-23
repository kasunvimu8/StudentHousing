"use client";

import FileUploadComponent from "@/components/shared/FileUploadComponent";
import { PropertySectionProps } from "@/types";
import React from "react";

const ContractDocumentSection: React.FC<PropertySectionProps> = ({
  propertyState,
  updateLocalState,
  documentsURL,
  isCreate,
}) => {
  return (
    <FileUploadComponent
      propertyState={propertyState}
      updateLocalState={updateLocalState}
      uploadKey="documents"
      title="Contract Documents"
      fileUrls={documentsURL}
      isCreate={!!isCreate}
    />
  );
};

export default ContractDocumentSection;
