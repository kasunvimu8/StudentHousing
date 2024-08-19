"use client";

import FileUploadComponent from "@/components/shared/FileUploadComponent";
import { PropertySectionProps } from "@/types";
import React from "react";

const ImageSectioon: React.FC<PropertySectionProps> = ({
  propertyState,
  updateLocalState,
  imagesURL,
  isCreate,
}) => {
  return (
    <FileUploadComponent
      propertyState={propertyState}
      updateLocalState={updateLocalState}
      uploadKey="images"
      title="Images"
      fileUrls={imagesURL}
      isCreate={!!isCreate}
    />
  );
};

export default ImageSectioon;
