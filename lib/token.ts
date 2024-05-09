import { randomBytes } from "crypto";

function generateRandomToken(): Promise<string> {
  return new Promise((resolve, reject) => {
    randomBytes(32, (err, buffer) => {
      if (err) {
        reject("Failed to generate random bytes: " + err.message);
      } else {
        resolve(buffer.toString("hex"));
      }
    });
  });
}

export default async function getToken() {
  try {
    const token = await generateRandomToken();
    return token;
  } catch (error) {
    return null;
  }
}
