"use client";

import FileDisplayItem from "@/components/shared/FileDisplayItem";
import FileUploader from "@/components/shared/FileUploader";
import SectionTitle from "@/components/shared/SectionTitle";
import { PropertySectionProps } from "@/types";
import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

interface FileObject {
  id: string;
  name: string;
}

const ContractDocumentSection: React.FC<PropertySectionProps> = ({
  propertyState,
  updateLocalState,
}) => {
  const [files, setFiles] = useState<FileObject[]>([]);

  useEffect(() => {
    fetchInitialFiles();
  }, []);

  const handleFileUpload = async (newFiles: any) => {
    const newFile: FileObject = newFiles?.[0];
    if (newFile) {
      try {
        const newFileItem = { id: uuidv4(), name: newFile.name };
        const newFiles = [...files, newFileItem];
        setFiles(newFiles);
        updateLocalState(
          "documents",
          newFiles.map((file) => file.name)
        );
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    }
  };

  const fetchInitialFiles = async () => {
    try {
      // Retrieve list of files from AWS S3 bucket
      //   const fetchedFiles = await Storage.list("images/");

      // Map fetched files to UploadedFile interface
      const mappedFiles = propertyState.documents?.map((file: any) => ({
        id: uuidv4(),
        name: file.split("/").pop() || "",
      }));

      setFiles(mappedFiles);
    } catch (error) {
      console.error("Error fetching files:", error);
    }
  };

  const handleFileRemove = async (fileId: string) => {
    try {
      const updatedFiles = files.filter((file) => file.id !== fileId);
      setFiles(updatedFiles);
      updateLocalState(
        "documents",
        updatedFiles.map((file) => file.name)
      );
    } catch (error) {
      console.error("Error removing file:", error);
    }
  };

  return (
    <div className="pt-5">
      <SectionTitle title="Contract Documents" />
      <div className="w-full grid grid-cols-2 gap-2 md:gap-8 py-5">
        <div className="col-span-2 md:col-span-1">
          <FileUploader
            handleFileUpload={handleFileUpload}
            info="Drag & Drop or Select .pdf files"
          />
        </div>
        <div className="col-span-2 md:col-span-1">
          {files?.map((file) => (
            <div
              key={file.id}
              className="flex items-center mb-2 p-1 section-light-background-color rounded max-w-[600px]"
            >
              <FileDisplayItem
                fileId={file?.id}
                name={file?.name}
                handleFileRemove={handleFileRemove}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContractDocumentSection;
