"use client";

import FileDisplayItem from "@/components/shared/FileDisplayItem";
import FileUploader from "@/components/shared/FileUploader";
import SectionTitle from "@/components/shared/SectionTitle";
import { DetailsSectionProps } from "@/types";
import React, { useState, useEffect } from "react";
import { LuDownload, LuImage, LuX } from "react-icons/lu";
import { v4 as uuidv4 } from "uuid";

interface FileObject {
  id: string;
  name: string;
}

const ImageSectioon: React.FC<DetailsSectionProps> = ({
  propertyState,
  updateLocalState,
}) => {
  const [files, setFiles] = useState<FileObject[]>([]);

  useEffect(() => {
    fetchInitialFiles();
  }, []);

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        const newFile: FileObject = { id: uuidv4(), name: file.name };
        setFiles([...files, newFile]);
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
      const mappedFiles = propertyState.images?.map(
        (file: any, index: number) => ({
          id: index,
          name: file.split("/").pop() || "",
        })
      );

      setFiles(mappedFiles);
    } catch (error) {
      console.error("Error fetching files:", error);
    }
  };

  const handleFileRemove = async (fileId: string) => {
    try {
      const updatedFiles = files.filter((file) => file.id !== fileId);
      setFiles(updatedFiles); // Update state after removing file
    } catch (error) {
      console.error("Error removing file:", error);
    }
  };

  return (
    <div className="pt-3">
      <SectionTitle title="Images" />
      <div className="w-full grid grid-cols-3 gap-2 md:gap-10 py-5">
        <FileUploader handleFileUpload={handleFileUpload} />
        <div className="col-span-3 md:col-span-2">
          {files?.map((file) => (
            <div
              key={file.id}
              className="flex items-center mb-2 p-2 section-light-background-color rounded max-w-[600px]"
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

export default ImageSectioon;
