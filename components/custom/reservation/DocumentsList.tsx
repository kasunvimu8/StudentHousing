"use client";

import React from "react";
import { LuCopy } from "react-icons/lu";
import { toast } from "sonner";

const DocumentsList = ({ convention }: { convention: string }) => {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast(`${text} has been copied`);
  };

  return (
    <ul className="list-decimal p-3 flex flex-col items-start">
      <li className="p-1 font-normal text-sm flex flex-col sm:flex-row justify-start items-center w-full gap-2">
        <span>
          Signed Contract Document{" "}
          <span className="primary-light-font-color">
            (e.g: {convention}-contract.pdf)
          </span>
        </span>
        <LuCopy
          className="cursor-pointer"
          onClick={() => copyToClipboard(`${convention}-contract`)}
        />
      </li>
      <li className="p-1 font-normal text-sm flex flex-col sm:flex-row justify-start items-center w-full gap-2">
        <span>
          Scanned Passport or NIC{" "}
          <span className="primary-light-font-color">
            (e.g: {convention}-id.pdf)
          </span>
        </span>
        <LuCopy
          className="cursor-pointer"
          onClick={() => copyToClipboard(`${convention}-id`)}
        />
      </li>
      <li className="p-1 font-normal text-sm flex flex-col sm:flex-row justify-start items-center w-full gap-2">
        <span>
          Enrollment Certificate{" "}
          <span className="primary-light-font-color">
            (e.g: {convention}-enrollment-certificate.pdf)
          </span>
        </span>
        <LuCopy
          className="cursor-pointer"
          onClick={() =>
            copyToClipboard(`${convention}-enrollment-certificate`)
          }
        />
      </li>
    </ul>
  );
};

export default DocumentsList;
