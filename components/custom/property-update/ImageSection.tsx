"use client";

import FileUploadComponent from "@/components/shared/FileUploadComponent";
import { PropertySectionProps } from "@/types";
import React from "react";

const ImageSectioon: React.FC<PropertySectionProps> = ({
  propertyState,
  updateLocalState,
}) => {
  return (
    <FileUploadComponent
      propertyState={propertyState}
      updateLocalState={updateLocalState}
      uploadKey="images"
    />
  );
};

export default ImageSectioon;
