import fs from "fs";
import path from "path";

// Function to delete a file
export const deleteFile = (filePath: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    fs.unlink(filePath, (err) => {
      if (err) {
        return reject(new Error("Failed to delete file"));
      }
      resolve();
    });
  });
};

export async function handleUpload(
  formData: FormData,
  uploadPath: string,
  fileName?: string
): Promise<string> {
  const file = formData.get("file") as File | null;
  if (!file) {
    throw new Error("No file provided");
  }
  const filename = fileName ?? file.name;
  const maxSize = 5 * 1024 * 1024; // 5 MB
  // Check if the file size exceeds the maximum allowed size
  if (file.size > maxSize) {
    throw new Error(`File size exceeds the maximum allowed size of 5 MB.`);
  }

  const arrayBuffer = await file.arrayBuffer();
  const buffer: any = Buffer.from(arrayBuffer);

  const destination = path.join(uploadPath, filename);

  // Ensure the directory exists
  fs.mkdirSync(path.dirname(destination), { recursive: true });

  // Write the file to the destination
  await fs.promises.writeFile(destination, buffer);

  return destination;
}
