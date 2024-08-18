"use server";

import { revalidatePath } from "next/cache";
import path from "path";
import { deleteFile, handleUpload } from "@/lib/storage";

type formDatPaylaod = {
  data: FormData;
  id: string;
};

export async function uploadPublicFile(
  formDataList: formDatPaylaod[],
  section: string,
  subSection: string,
  id: string
) {
  try {
    const uploadPath = path.join(
      require("os").homedir(),
      "storage/public",
      section,
      id,
      subSection
    );

    for (const formData of formDataList) {
      const filePath = await handleUpload(
        formData.data,
        uploadPath,
        formData.id
      );
    }
    return "success";
  } catch (err) {
    console.log(err);
    return "failed";
  }
}

export async function uploadPrivateFile(
  id: string,
  formDataList: FormData[]
): Promise<string | null> {
  try {
    const uploadPath = path.join(
      require("os").homedir(),
      "storage/private",
      "uploads",
      "00000"
    );
    for (const formData of formDataList) {
      const filePath = await handleUpload(formData, uploadPath);
    }
    return "success";
  } catch (err) {
    console.log(err);
    return "failed";
  }
}

export async function removeFile(filePath: string): Promise<void> {
  const fullPath = path.join(process.cwd(), filePath);
  await deleteFile(fullPath);

  // Optionally revalidate any path after deletion
  revalidatePath("/");
}
