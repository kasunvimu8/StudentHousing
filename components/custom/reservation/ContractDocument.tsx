"use client";

import FileDisplayItem from "@/components/shared/FileDisplayItem";
import FileUploader from "@/components/shared/FileUploader";
import SectionTitle from "@/components/shared/SectionTitle";
import { FileType, ReservationType } from "@/types";
import React, { useState, useEffect } from "react";
import SubmitDocumentsButton from "@/components/custom/reservation/SubmitDocumentsButton";
import { getNextStatus } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { handleContractDocumentSubmission } from "@/actions/reservations";

const ContractDocument = ({
  reservation,
  editable,
  isDocumentSubmission,
  isAdmin,
  fileUrls,
}: {
  reservation: ReservationType;
  isDocumentSubmission: boolean;
  editable: boolean;
  isAdmin: boolean;
  fileUrls: string[];
}) => {
  const [files, setFiles] = useState<FileType[]>([]);
  const [filesIndicators, setFilesIndicators] = useState<string[]>([]);
  const [removedFiles, setRemovedFiles] = useState<string[]>([]);

  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    fetchInitialFiles();
  }, []);

  const handleFileUpload = async (newFiles: FileType[]) => {
    if (newFiles?.length > 0) {
      try {
        setFiles((prevFiles) => {
          const updatedFiles = [...prevFiles];

          newFiles.forEach((newFile) => {
            const existingFileIndex = updatedFiles.findIndex(
              (file) => file.data.name === newFile.data.name
            );

            if (existingFileIndex !== -1) {
              // Replace the existing file data with the new file data
              updatedFiles[existingFileIndex] = newFile;
            } else {
              // Add new file to the list if it doesn't already exist
              updatedFiles.push(newFile);
            }
          });

          return updatedFiles;
        });

        const newFileIndicators = newFiles.map((file) => file.data.name);

        setFilesIndicators((prev) => {
          const existingIndicators = new Set(prev);
          const updatedIndicators = [...prev];

          newFileIndicators.forEach((indicator) => {
            if (!existingIndicators.has(indicator)) {
              updatedIndicators.push(indicator);
            }
          });

          return updatedIndicators;
        });
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    }
  };

  const fetchInitialFiles = async () => {
    try {
      const dataState = reservation.signed_documents;
      if (dataState && dataState.length > 0) {
        const fileIndicators = dataState
          .map((fileUrl: string) => fileUrl.split("/").pop())
          .filter((fileName): fileName is string => !!fileName);

        setFilesIndicators(fileIndicators);
      } else {
        setFilesIndicators([]);
      }
    } catch (error) {
      console.error("Error fetching files:", error);
    }
  };

  const handleFileRemove = async (fileId: string) => {
    try {
      const updatedFiles = filesIndicators.filter((id) => id !== fileId);
      setFilesIndicators(updatedFiles);

      const isExistingFileRemoved = reservation.signed_documents?.find(
        (fileUrl) => fileUrl.includes(fileId)
      );

      // update the state to be removed once hit save
      if (isExistingFileRemoved) {
        setRemovedFiles((prevFiles) => [...prevFiles, fileId]);
      } else {
        // remove the file from files (just uploaded file got deleted)
        const filesUpdated = files.filter((file) => file.data.name !== fileId);
        setFiles(filesUpdated);
      }
    } catch (error) {
      console.error("Error removing file:", error);
    }
  };

  const handleUpdate = async (comment: string) => {
    try {
      let formDataArray = [];
      const dataState = reservation.signed_documents;

      for (const currentFile of files) {
        const formData = new FormData();
        formData.append("file", currentFile.data);

        formDataArray.push({ data: formData, id: currentFile.id });
      }

      /* Since file naming is stricted and defined, we do not need to remove files and it just will replace the
       file in the storage. Only need to update the reservation links */
      let effectiveRemovedFiles: string[] = [];
      removedFiles.map((removedFiles) => {
        const isExistingFileRemoved = dataState?.map((fileUrl) =>
          fileUrl.includes(removedFiles)
        );
        if (isExistingFileRemoved) effectiveRemovedFiles.push(removedFiles);
      });
      // remove duplicates
      effectiveRemovedFiles = Array.from(new Set(effectiveRemovedFiles));

      /* admin document uploaded wont change the workflow of the reservation process. It just edit the the content
      / only the user can forward the reservation process to 'document review'workflow from 'document submission' */
      const nextStatus: string = isAdmin
        ? reservation.status
        : getNextStatus(reservation.status);

      const { msg, type } = await handleContractDocumentSubmission(
        formDataArray,
        reservation._id,
        effectiveRemovedFiles,
        filesIndicators,
        nextStatus,
        isAdmin,
        comment
      );

      if (type === "ok") {
        setRemovedFiles([]);

        if (isAdmin) {
          router.push("/manage-reservations");
        } else {
          router.push("/my-reservations");
        }
      } else {
        fetchInitialFiles();
        setFiles([]);
        setRemovedFiles([]);
      }

      toast({
        title: `File Update ${type === "ok" ? "Success" : "Failed"} `,
        description: msg,
        variant: type,
      });
    } catch (error) {
      toast({
        title: "File Update Failed",
        description: (error as Error).message || "An unknown error occurred.",
        variant: "error",
      });
    }
  };

  const limitExeeds = filesIndicators.length >= 3;
  return (
    <div className="p-5 border-2 border-gray-200 border-dashed rounded">
      <SectionTitle
        title={isDocumentSubmission ? "Upload Documents" : "Uploaded Documents"}
      />
      <div
        className={`w-full grid gap-2 md:gap-8 py-5 ${
          editable ? "grid-cols-2" : "grid-cols-1"
        }`}
      >
        {editable && (
          <div className="col-span-2 md:col-span-1">
            <FileUploader
              handleFileUpload={handleFileUpload}
              info="Drag & Drop or Select .pdf files"
              limitExeeds={limitExeeds}
              limitSize={3}
              disabled={false}
            />
          </div>
        )}
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
                  editable={editable}
                />
              </div>
            );
          })}
        </div>
        <></>
      </div>
      {editable && (
        <SubmitDocumentsButton
          filesIndicators={filesIndicators}
          handleUpdate={handleUpdate}
        />
      )}
    </div>
  );
};

export default ContractDocument;
