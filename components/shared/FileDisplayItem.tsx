import { handleDownloadDocument } from "@/lib/utils";
import React from "react";
import { LuDownload, LuExternalLink, LuFile, LuX } from "react-icons/lu";

const FileDisplayItem = ({
  name,
  fileId,
  fileUrl,
  handleFileRemove,
  editable,
}: {
  name: string;
  fileId: string;
  fileUrl: string | undefined;
  handleFileRemove: (fileId: string) => void;
  editable?: boolean;
}) => {
  return (
    <div className="flex items-center justify-between w-full">
      <div className="flex items-center">
        <LuFile className="w-4 h-4 mr-2" />
        <span className="font-medium text-sm">{name}</span>
      </div>
      <div className="flex justify-end gap-2">
        <div className="primary-font-color p-1 rounded">
          <LuExternalLink
            strokeWidth="3"
            onClick={() => {
              if (fileUrl) window.open(fileUrl, "_blank");
            }}
            className="w-4 h-4 cursor-pointer"
          />
        </div>
        <div className="primary-font-color p-1 rounded">
          <LuDownload
            strokeWidth="3"
            onClick={() => {
              if (fileUrl) handleDownloadDocument(fileUrl);
            }}
            className="w-4 h-4 cursor-pointer"
          />
        </div>

        {editable && (
          <div className="primary-font-color p-1 rounded ">
            <LuX
              strokeWidth="3"
              onClick={() => handleFileRemove(fileId)}
              className="w-4 h-4 cursor-pointer"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default FileDisplayItem;
