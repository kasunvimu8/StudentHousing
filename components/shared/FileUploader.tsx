"use client";
import { useDropzone } from "react-dropzone";
import React, { ChangeEvent } from "react";
import { LuUpload } from "react-icons/lu";
import { useToast } from "../ui/use-toast";
import { v4 as uuidv4 } from "uuid";
import { FileType } from "@/types";
interface FileUploaderProps {
  handleFileUpload: (files: FileType[]) => void;
  info: string;
  limitExeeds?: boolean;
}

const FileUploader: React.FC<FileUploaderProps> = ({
  handleFileUpload,
  info,
  limitExeeds = false,
}) => {
  const maxSize = 5 * 1024 * 1024;
  const { toast } = useToast();

  const onDrop = (acceptedFiles: File[]) => {
    if (limitExeeds) {
      toast({
        title: "File Upload Failed",
        description: "You are not allowed to upload more than 10 files",
        variant: "error",
      });

      return;
    }

    const filesWithUuid = acceptedFiles.map((file) => ({
      data: file,
      id: uuidv4().split("-")[0],
    }));

    handleFileUpload(filesWithUuid);
  };

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpg"],
      "application/pdf": [".pdf"],
    },
    maxSize: maxSize,
    maxFiles: 10,
  });

  return (
    <div className="col-span-3 md:col-span-1">
      <div {...getRootProps({ className: "dropzone" })}>
        <div className="flex items-center justify-center overflow-hidden rounded-lg border-2 border-gray-100 w-full h-[150px] cursor-pointer section-light-background-color">
          <div className="flex flex-col items-center py-4 ">
            <LuUpload className="w-[28px] h-[28px] text-gray-400 text-center" />
            <input {...getInputProps()} />
            <div className="font-medium text-sm p-2 text-center">{info}</div>
            <div className="font-medium text-xs text-center">
              (A single file should be less than 5 Mb and maximum 10 files
              allowed)
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileUploader;
