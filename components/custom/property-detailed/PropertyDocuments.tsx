"use client";

import React from "react";
import SectionTitle from "@/components/shared/SectionTitle";
import { LuDownload, LuExternalLink } from "react-icons/lu";
import { getDocumentName, handleDownloadDocument } from "@/lib/utils";

const PropertyDocuments = ({ documents }: { documents: string[] }) => {
  return (
    <div className="pt-4">
      <SectionTitle title="Contract Documents" />
      <div className="grid grid-flow-row gap-3 max-w-[300px] md:max-w-[400px] py-6">
        {documents.map((document) => {
          const name = getDocumentName(document);
          return (
            <div
              className="section-background-color rounded p-2 flex justify-between text-center"
              key={name}
            >
              <div className="px-2 font-normal text-sm">{name}</div>
              <div className="flex items-center px-2">
                <div className="row-end-1 px-2">
                  <LuExternalLink
                    className="text-lg cursor-pointer"
                    onClick={() => {
                      window.open(document, "_blank");
                    }}
                  />
                </div>
                <div className="row-end-2 px-2">
                  <LuDownload
                    className="text-lg cursor-pointer"
                    onClick={() => {
                      handleDownloadDocument(document);
                    }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PropertyDocuments;
