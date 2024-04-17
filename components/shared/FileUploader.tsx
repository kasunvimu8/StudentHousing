"use client";

import React from "react";
import { LuUpload } from "react-icons/lu";
import { Input } from "@/components/ui/input";

const FileUploader = ({
  handleFileUpload,
}: {
  handleFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => {};
}) => {
  return (
    <div className="col-span-3 md:col-span-1">
      <div className="flex items-center justify-center overflow-hidden rounded-lg border-2 border-gray-100 w-[300px]">
        <div className="flex flex-col items-center py-6">
          <LuUpload className="w-[35px] h-[35px] text-gray-400" />
          <div className="w-full h-[40px] flex pl-[55px] mb-5">
            <Input
              className="font-medium text-base cursor-pointer mt-5 text-center w-[120px]"
              type="file"
              onChange={handleFileUpload}
              accept="image/*"
            />
          </div>
          <div className="font-medium text-sm p-2 text-center">
            (Select only png, jpg, jpeg files)
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileUploader;
