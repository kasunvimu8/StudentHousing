"use client";

import { uploadPublicPropertyFile } from "@/actions/file-upload";
import FileDisplayItem from "@/components/shared/FileDisplayItem";
import FileUploader from "@/components/shared/FileUploader";
import Loading from "@/components/shared/Loading";
import SectionTitle from "@/components/shared/SectionTitle";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { generateFileName } from "@/lib/utils";
import { FileType } from "@/types";
import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

interface FileUpload {
  propertyState: Record<string, any>;
  updateLocalState: (key: string, value: any) => void;
  uploadKey: string;
  title: string;
  isCreate: boolean;
  fileUrls?: string[];
}

const FileUploadComponent: React.FC<FileUpload> = ({
  propertyState,
  updateLocalState,
  uploadKey,
  title,
  fileUrls,
  isCreate,
}) => {
  const [files, setFiles] = useState<FileType[]>([]);
  const [filesIndicators, setFilesIndicators] = useState<string[]>([]);

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

        const newFileIndicators = newFiles.map((file) => {
          return generateFileName(file.data.name, file.id);
        });
        setFilesIndicators((prev) => [...prev, ...newFileIndicators]);

        const filePaths = newFiles.map((file: FileType) => {
          const name = generateFileName(file.data.name, file.id);
          return `public/properties/${propertyState.property_id}/${uploadKey}/${name}`;
        });

        updateLocalState(uploadKey, filePaths);

        setUploadStatus(false);
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    }
  };

  const fetchInitialFiles = async () => {
    try {
      const dataState =
        uploadKey === "images" ? propertyState.images : propertyState.documents;
      const fileIndicators = dataState?.map((fileUrl: string) =>
        fileUrl.split("/").pop()
      );
      setFilesIndicators(fileIndicators);
    } catch (error) {
      console.error("Error fetching files:", error);
    }
  };

  const handleFileRemove = async (fileId: string) => {
    //TODO
    try {
      const updatedFiles = filesIndicators.filter((id) => id !== fileId);
      setFilesIndicators(updatedFiles);

      // update the local state of the file
      // update the

      // updateLocalState(
      //   uploadKey,
      //   updatedFiles.map((file) => file?.data.name)
      // );
      // setUploadStatus(false);
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

  const handleUpdate = async () => {
    //TODO
  };

  const limitExeeds = files.length >= 10;

  return (
    <div className="pt-3">
      <SectionTitle title={title} />
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
          {filesIndicators?.map((filesIndicator) => {
            const fileUrl = fileUrls?.find((fileUrl) =>
              fileUrl.includes(filesIndicator)
            );
            return (
              <div
                key={filesIndicator}
                className="flex items-center my-3 p-1 section-light-background-color rounded max-w-[600px]"
              >
                <FileDisplayItem
                  fileId={filesIndicator}
                  fileUrl={fileUrl}
                  name={filesIndicator}
                  handleFileRemove={handleFileRemove}
                  editable={true}
                />
              </div>
            );
          })}
        </div>
      </div>
      {!uploadStatus && (
        <div className="flex justify-end">
          <Button
            className="primary-background-color secondary-font-color self-end disabled:bg-white disabled:primary-font-color"
            disabled={!propertyState.property_id || files.length === 0}
            size="lg"
            onClick={() => {
              if (isCreate) {
                handleUpload();
              } else {
                handleUpdate();
              }
            }}
          >
            <span className="px-2">
              {isCreate ? "Save Files" : "Update Files"}
            </span>
            {loading && <Loading />}
          </Button>
        </div>
      )}
    </div>
  );
};

export default FileUploadComponent;
