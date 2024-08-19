"use server";

import { revalidatePath } from "next/cache";
import path from "path";
import { deleteFile, handleUpload } from "@/lib/storage";
import Property from "@/database/models/property.model";
import { ResponseT } from "@/types";
import { generateFileName } from "@/lib/utils";

type formDatPaylaod = {
  data: FormData;
  id: string;
};

async function uploadPublicFile(
  formDataList: formDatPaylaod[],
  section: string,
  subSection: string,
  id: string
): Promise<ResponseT> {
  try {
    const uploadPath = path.join(
      require("os").homedir(),
      "storage",
      "public",
      section,
      id,
      subSection
    );

    for (const formData of formDataList) {
      const file = formData.data.get("file") as File | null;

      if (file) {
        const name = generateFileName(file.name, formData.id);
        const filePath = await handleUpload(formData.data, uploadPath, name);
      }
    }
    return {
      msg: "Files uploaded successfully",
      type: "ok",
    };
  } catch (err) {
    console.log(err);
    return {
      msg: "Failed to upload files",
      type: "error",
    };
  }
}

async function uploadPrivateFile(id: string, formDataList: FormData[]) {
  try {
    const uploadPath = path.join(
      require("os").homedir(),
      "storage",
      "private",
      "uploads",
      "00000"
    );
    for (const formData of formDataList) {
      const filePath = await handleUpload(formData, uploadPath);
    }

    return {
      msg: "Files uploaded successfully",
      type: "ok",
    };
  } catch (err) {
    console.log(err);
    return {
      msg: "Failed to upload files",
      type: "error",
    };
  }
}

export async function removeFile(filePath: string): Promise<void> {
  const fullPath = path.join(process.cwd(), filePath);
  await deleteFile(fullPath);

  // Optionally revalidate any path after deletion
  revalidatePath("/");
}

export async function uploadPublicPropertyFile(
  formDataList: formDatPaylaod[],
  section: string,
  subSection: string,
  id: string
): Promise<ResponseT> {
  const data = await Property.find({ property_id: id });
  if (data && data.length > 0) {
    return {
      msg: "Property ID already exists",
      type: "error",
    };
  }

  return uploadPublicFile(formDataList, section, subSection, id);
}
