"use client";

import { PropertySectionProps } from "@/types";
import Loading from "@/components/shared/Loading";
import SectionTitle from "@/components/shared/SectionTitle";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { generateFileName } from "@/lib/utils";
import React, { useState } from "react";
import { uploadThumbnail } from "@/actions/file-upload";
import Image from "next/image";
import { error } from "console";

const ThumbnailImageSection: React.FC<PropertySectionProps> = ({
  propertyState,
  updateLocalState,
  imageURL,
  isCreate,
}) => {
  const [thumbnail, setThumbnail] = useState<File | undefined>();
  const [initialThumbnailUrl, setInitialThumbnailUrl] = useState<string | null>(
    propertyState.thumbnail_url || null
  );
  const [uploadStatus, setUploadStatus] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleUpload = async () => {
    setLoading(true);
    try {
      if (thumbnail) {
        if (thumbnail.size > 5 * 1024 * 1024) {
          alert("File size exceeds the maximum limit of 5MB.");
          toast({
            title: "File Upload Failed",
            description: "File size exceeds the maximum limit of 5MB",
            variant: "error",
          });
          return;
        } else {
          const formData = new FormData();
          formData.append("file", thumbnail);

          const name = generateFileName(thumbnail.name, "thumbnail");
          const { msg, type } = await uploadThumbnail(
            formData,
            propertyState.property_id,
            propertyState.thumbnail_url,
            initialThumbnailUrl
          );

          if (type === "ok") {
            setUploadStatus(true);
          }

          toast({
            title: `File Upload ${type === "ok" ? "Success" : "Failed"} `,
            description: msg,
            variant: type,
          });
        }
      }
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

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setThumbnail(file);

      const name = generateFileName(file.name, "thumbnail");
      updateLocalState(
        "thumbnail_url",
        `properties/${propertyState.property_id}/images/${name}`
      );

      setUploadStatus(false);
    }
  };

  const src = thumbnail
    ? URL.createObjectURL(thumbnail)
    : imageURL || "/images/not_found.jpg";
  return (
    <div className="pt-3">
      <SectionTitle title={" Thumbnail Image"} />
      <div className="pt-2 font-normal text-xs primary-light-font-color flex items-center">
        Image need to be saved separately before creating the property. Please
        also ensure that the property ID is provided before saving Files.
        Additionally, do not change the property ID after uploading files. If
        you need to change the property ID, remove the existing files and
        re-upload all of them after changing the property ID.
      </div>
      <div className="w-full flex flex-col md:flex-row gap-8 py-5">
        <div className="flex-1 md:flex-none md:w-1/4 flex items-center justify-center">
          <div className="relative inline-block">
            <Button
              className="py-2 px-4 rounded cursor-pointer"
              variant="outline"
            >
              Choose File
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="absolute inset-0 opacity-0 cursor-pointer"
                disabled={!propertyState.property_id}
              />
            </Button>
          </div>
        </div>
        <div className="flex-1 md:flex-none md:w-3/4 flex items-center justify-start">
          <div className="relative w-full max-w-[300px] max-h-[400px] flex items-start justify-start p-1">
            <Image
              src={src}
              alt="thumbnail"
              height={250}
              width={380}
              className="rounded-lg object-cover"
            />
          </div>
        </div>
      </div>

      {!uploadStatus && (
        <div className="flex justify-end">
          <Button
            className="primary-background-color secondary-font-color self-end disabled:bg-white disabled:primary-font-color"
            disabled={!propertyState.property_id || (!thumbnail && isCreate)}
            size="lg"
            onClick={() => {
              handleUpload();
            }}
          >
            <span className="px-2">
              {isCreate ? "Save File" : "Update File"}
            </span>
            {loading && <Loading />}
          </Button>
        </div>
      )}
    </div>
  );
};

export default ThumbnailImageSection;
