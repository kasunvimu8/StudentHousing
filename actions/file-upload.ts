"use server";

import { revalidatePath } from "next/cache";
import path from "path";
import { deleteFile, handleUpload } from "@/lib/storage";
import Property from "@/database/models/property.model";
import { ResponseT } from "@/types";
import { generateFileName } from "@/lib/utils";
import Reservation from "@/database/models/reservation.model";
import Profile from "@/database/models/profiles.model";
import { sendInfoEmail } from "@/lib/email";
import logger from "@/lib/logger";

type formDatPaylaod = {
  data: FormData;
  id: string;
};

async function uploadFile(
  formDataList: formDatPaylaod[],
  section: string,
  subSection: string,
  id: string
): Promise<ResponseT> {
  try {
    const uploadPath = path.join(
      require("os").homedir(),
      "storage",
      section,
      id,
      subSection
    );

    for (const formData of formDataList) {
      const file = formData.data.get("file") as File | null;

      if (file) {
        const name = generateFileName(file.name, formData.id);
        const filePath = await handleUpload(formData.data, uploadPath, name);

        // logging
        logger.info(`#FILE UPLOAD COMMON: File upload success ${filePath}`);
      }
    }

    return {
      msg: "Files uploaded successfully",
      type: "ok",
    };
  } catch (err) {
    // logging
    logger.error(
      `#FILE UPLOAD COMMON: File upload failed ${JSON.stringify(err)}`
    );

    return {
      msg: "Failed to upload files",
      type: "error",
    };
  }
}

/* Handle Property Document Upload */
export async function uploadPropertyFile(
  formDataList: formDatPaylaod[],
  section: string,
  subSection: string,
  id: string
): Promise<ResponseT> {
  const data = await Property.find({ property_id: id });
  if (data && data.length > 0) {
    // logging
    logger.error(
      `#FILE UPLOAD : File upload failed. Try to uplaod file when creating a new property but the property id already exists`
    );

    return {
      msg: "Property ID already exists",
      type: "error",
    };
  }

  return uploadFile(formDataList, section, subSection, id);
}

/* Handle Property Document Update */
export async function updatePropertyFiles(
  formDataList: formDatPaylaod[],
  section: string,
  subSection: string,
  id: string,
  removedFiles: string[],
  filePropertyUrls: string[]
): Promise<ResponseT> {
  try {
    // first upload if any new files are added
    if (formDataList.length > 0) {
      await uploadFile(formDataList, section, subSection, id);
    }
    await Property.updateOne(
      { property_id: id },
      {
        $set: {
          [subSection]: filePropertyUrls,
        },
      }
    );

    // remove delted files in the server
    for (const fileUrl of removedFiles) {
      const uploadPath = path.join(
        require("os").homedir(),
        "storage",
        section,
        id,
        subSection,
        fileUrl
      );
      await deleteFile(uploadPath);

      // logging
      logger.info(
        `#FILE UPLOAD COMMON: File deletion success url : ${uploadPath}`
      );
    }

    // logging
    logger.info(
      `#FILE UPLOAD : File upload sucess. property files upload process successfully completed`
    );

    revalidatePath("/");
    return {
      msg: "Property files updated successfully",
      type: "ok",
    };
  } catch (err) {
    // logging
    logger.error(
      `#FILE UPLOAD : File upload failed. property files upload process failed with error: ${JSON.stringify(
        err
      )}`
    );
    return {
      msg: "Failed to update files",
      type: "error",
    };
  }
}

/* Handle Reservation Document Upload */
export async function uploadContractFile(
  formDataList: formDatPaylaod[],
  reservationId: string
): Promise<ResponseT> {
  try {
    const uploadPath = path.join(
      require("os").homedir(),
      "storage",
      "contracts",
      reservationId
    );

    for (const formData of formDataList) {
      const file = formData.data.get("file") as File | null;

      if (file) {
        const filePath = await handleUpload(
          formData.data,
          uploadPath,
          file.name
        );

        // logging
        logger.info(
          `#FILE UPLOAD : Reservation contract file upload success ${filePath}`
        );
      }
    }
    return {
      msg: "Files uploaded successfully",
      type: "ok",
    };
  } catch (err) {
    // logging
    logger.error(
      `#FILE UPLOAD : File upload failed. Reservation contract file upload process failed with error: ${JSON.stringify(
        err
      )}`
    );
    return {
      msg: "Failed to upload files",
      type: "error",
    };
  }
}

/* Handle Reservation Document Submission */
export async function updateContractFiles(
  formDataList: formDatPaylaod[],
  reservationId: string,
  removedFiles: string[],
  fileContractUrls: string[],
  nextStatus: string,
  comment: string,
  isAdmin: boolean
): Promise<ResponseT> {
  try {
    // remove delted files in the server
    for (const fileUrl of removedFiles) {
      const uploadPath = path.join(
        require("os").homedir(),
        "storage",
        "contracts",
        reservationId,
        fileUrl
      );
      await deleteFile(uploadPath);

      // logging
      logger.info(
        `#FILE UPLOAD COMMON: File deletion success url : ${uploadPath}`
      );
    }

    // first upload if any new files are added
    if (formDataList.length > 0) {
      await uploadContractFile(formDataList, reservationId);
    }

    await Reservation.updateOne(
      { _id: reservationId },
      {
        $set: {
          status: nextStatus,
          signed_documents: fileContractUrls,
          user_comment: comment,
          admin_comment: "",
        },
      }
    );

    //sending email notification
    const reservation = await Reservation.findById(reservationId);
    const profile = await Profile.findOne({
      user_id: reservation.user_id,
    });
    await sendInfoEmail({
      to: profile.user_email,
      name: `${profile.first_name} ${profile.last_name}`,
      title: `${
        isAdmin
          ? "Admin has changed the uploaded documents"
          : "Reservation Status Changed"
      }`,
      desc: "Please visit the Reservation Details page by accessing the 'My Reservations' page to see the current status. If you have any questions or need further assistance, feel free to contact our administration available on the contact page.",
    });

    // logging
    logger.info(
      `#RESERVATION STATUS CHANGE: reservation status change for the reservation id : ${reservationId} to : ${nextStatus}`
    );
    logger.info(
      `#FILE UPLOAD: reservation contract files uploaded success reservation id : ${reservationId}`
    );

    revalidatePath("/");
    return {
      msg: "Files updated successfully",
      type: "ok",
    };
  } catch (err) {
    // logging
    logger.error(
      `#FILE UPLOAD: reservation contract files uploaded failed ${JSON.stringify(
        err
      )}`
    );

    return {
      msg: "Failed to update files",
      type: "error",
    };
  }
}

/* Handle Thumbnail upload */
export async function uploadThumbnail(
  formData: FormData,
  id: string,
  thumbnailUrl: string,
  removeFileUrl: string | null
): Promise<ResponseT> {
  try {
    const file = formData.get("file") as File | null;
    if (file) {
      // remove delted files in the server
      if (removeFileUrl) {
        const removeFile = path.join(
          require("os").homedir(),
          "storage",
          removeFileUrl
        );
        await deleteFile(removeFile);

        // logging
        logger.info(
          `#FILE UPLOAD COMMON: File deletion success url : ${removeFile}`
        );
      }

      // first upload if any new files are added
      const uploadPath = path.join(
        require("os").homedir(),
        "storage",
        "properties",
        id,
        "images"
      );
      const name = generateFileName(file.name, "thumbnail");
      const filePath = await handleUpload(formData, uploadPath, name);

      await Property.updateOne(
        { property_id: id },
        {
          $set: {
            thumbnail_url: thumbnailUrl,
          },
        }
      );

      // logging
      logger.info(
        `#FILE UPLOAD: Thubnail image changed of the property id : ${id}`
      );

      revalidatePath("/");
      return {
        msg: "Files updated successfully",
        type: "ok",
      };
    } else {
      // logging
      logger.error(`#FILE UPLOAD: Thubnail image upload failed. File is empty`);

      return {
        msg: "Failed to update files. File not received.",
        type: "error",
      };
    }
  } catch (err) {
    // logging
    logger.error(
      `#FILE UPLOAD: Thubnail image upload failed with error ${JSON.stringify(
        err
      )}`
    );
    return {
      msg: "Failed to update files",
      type: "error",
    };
  }
}
