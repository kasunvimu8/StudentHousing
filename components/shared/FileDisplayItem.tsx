import React from "react";
import { LuDownload, LuImage, LuX } from "react-icons/lu";

const FileDisplayItem = ({
  fileId,
  name,
  handleFileRemove,
}: {
  name: string;
  fileId: string;
  handleFileRemove: (fileId: string) => void;
}) => {
  return (
    <div className="flex items-center justify-between w-full">
      <div className="flex items-center">
        <LuImage className="w-4 h-4 mr-2" />
        <span className="font-medium text-sm">{name}</span>
      </div>
      <div className="flex justify-end gap-2">
        <div className="primary-font-color p-1 rounded">
          <LuDownload
            strokeWidth="3"
            onClick={() => {
              console.log("handle download");
            }}
            className="w-4 h-4 cursor-pointer"
          />
        </div>
        <div className="primary-font-color p-1 rounded ">
          <LuX
            strokeWidth="3"
            onClick={() => handleFileRemove(fileId)}
            className="w-4 h-4 cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};

export default FileDisplayItem;
