"use client";

import { uploadPublicPropertyFile } from "@/actions/file-upload";
import FileDisplayItem from "@/components/shared/FileDisplayItem";
import FileUploader from "@/components/shared/FileUploader";
import Loading from "@/components/shared/Loading";
import SectionTitle from "@/components/shared/SectionTitle";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { getFileExtension } from "@/lib/utils";
import { FileType } from "@/types";
import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

interface FileUpload {
  propertyState: Record<string, any>;
  updateLocalState: (key: string, value: any) => void;
  uploadKey: string;
}

const FileUploadComponent: React.FC<FileUpload> = ({
  propertyState,
  updateLocalState,
  uploadKey,
}) => {
  const [files, setFiles] = useState<FileType[]>([]);
  const [uploadStatus, setUploadStatus] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchInitialFiles();
  }, []);

  const handleFileUpload = async (newFiles: FileType[]) => {
    if (newFiles?.length > 0) {
      try {
        setFiles((prevFiles) => [...prevFiles, ...newFiles]);

        updateLocalState(
          uploadKey,
          newFiles.map((file: FileType) => file?.data?.name)
        );

        setUploadStatus(false);
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
        uploadKey,
        updatedFiles.map((file) => file?.data.name)
      );
      setUploadStatus(false);
    } catch (error) {
      console.error("Error removing file:", error);
    }
  };

  const handleUpload = async () => {
    setLoading(true);
    try {
      let formDataArray = [];
      for (const currentFile of files) {
        const formData = new FormData();
        formData.append("file", currentFile.data);

        formDataArray.push({ data: formData, id: currentFile.id });
      }
      const { msg, type } = await uploadPublicPropertyFile(
        formDataArray,
        "properties",
        uploadKey,
        propertyState.property_id
      );

      if (type === "ok") {
        setUploadStatus(true);
      }

      toast({
        title: `File Upload ${type === "ok" ? "Success" : "Failed"} `,
        description: msg,
        variant: type,
      });
    } catch (error) {
      toast({
        title: "File Upload Failed",
        description: (error as Error).message || "An unknown error occurred.",
        variant: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const limitExeeds = files.length >= 10;

  return (
    <div className="pt-3">
      <SectionTitle title="Images" />
      <div className="pt-2 font-normal text-xs primary-light-font-color flex items-center">
        Files need to be saved separately before creating the property. Please
        make sure that the property ID is provided before saving
      </div>
      <div className="w-full grid grid-cols-2 gap-2 md:gap-8 py-5">
        <div className="col-span-2 md:col-span-1">
          <FileUploader
            handleFileUpload={handleFileUpload}
            info="Drag & Drop or Select .png or .jpg files"
            limitExeeds={limitExeeds}
          />
        </div>
        <div className="col-span-2 md:col-span-1">
          {files?.map((file) => (
            <div
              key={file.id}
              className="flex items-center my-3 p-1 section-light-background-color rounded max-w-[600px]"
            >
              <FileDisplayItem
                fileId={file.data.name}
                name={`${file.id}.${getFileExtension(file.data.name)}`}
                handleFileRemove={handleFileRemove}
              />
            </div>
          ))}
        </div>
      </div>
      {!uploadStatus && (
        <div className="flex justify-end">
          <Button
            className="primary-background-color secondary-font-color self-end disabled:bg-white disabled:primary-font-color"
            disabled={!propertyState.property_id || files.length === 0}
            size="lg"
            onClick={handleUpload}
          >
            <span className="px-2"> Save Files</span>
            {loading && <Loading />}
          </Button>
        </div>
      )}
    </div>
  );
};

export default FileUploadComponent;
