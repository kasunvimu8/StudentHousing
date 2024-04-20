"use client";
import { useDropzone } from "react-dropzone";
import React from "react";
import { LuUpload } from "react-icons/lu";

const FileUploader = ({
  handleFileUpload,
  info,
}: {
  handleFileUpload: (event: any) => {};
  info: string;
}) => {
  const maxSize = 5 * 1024 * 1024;

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    onDrop: (files) => handleFileUpload(files),
    accept: {
      "image/*": [".png", ".jpg"],
      "application/pdf": [".pdf"],
    },
    maxSize: maxSize,
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
              (A single file should be less than 5 Mb)
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileUploader;
