import "server-only";

import { resetLinkValidation, sessionPeriodMinutes } from "@/constants";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const secretKey = "PmauWg4SAlDJ2mS+HpIqgkqv/fHc4m1VIOWuvkflqII=";
const key = new TextEncoder().encode(secretKey);

export async function encrypt(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${sessionPeriodMinutes * 60} minutes`)
    .sign(key);
}

export async function decrypt(token: string | undefined = "") {
  try {
    const { payload } = await jwtVerify(token, key, {
      algorithms: ["HS256"],
    });

    return payload;
  } catch (err) {
    return null;
  }
}

export async function createSession(
  email: string,
  role: string,
  user_id: string
) {
  // crete session
  const user = { role: role, user_id: user_id };
  const expires = new Date(Date.now() + sessionPeriodMinutes * 60 * 1000);

  const session = await encrypt({ user, expires });

  // 3. Store the session in cookies
  cookies().set("session", session, {
    httpOnly: true,
    secure: true,
    expires: expires,
    sameSite: "lax",
    path: "/",
  });
}

export function deleteSession() {
  cookies().delete("session");
}

export async function updateSession() {
  const session = cookies().get("session")?.value;
  const payload = await decrypt(session);

  if (!session || !payload) {
    return null;
  }

  const expires = new Date(Date.now() + sessionPeriodMinutes * 60 * 1000);
  cookies().set("session", session, {
    httpOnly: true,
    secure: true,
    expires: expires,
    sameSite: "lax",
    path: "/",
  });
}