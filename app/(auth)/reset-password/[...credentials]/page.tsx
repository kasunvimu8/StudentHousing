import { veriftToken } from "@/actions/authentications";
import ResetPasswordForm from "@/components/custom/auth/ResetPassword";
import Link from "next/link";
import React from "react";
import { FaExclamationTriangle } from "react-icons/fa";

const page = async ({ params }: { params: { credentials: string[] } }) => {
  const user_id: any = params.credentials?.[0];
  const token: any = params.credentials?.[1];
  let isVerified: boolean = false;

  if (token && user_id) {
    const res = await veriftToken(token, user_id);
    if (res) {
      isVerified = true;
    }
  }
  return isVerified ? (
    <ResetPasswordForm token={token} user_id={user_id} />
  ) : (
    <div
      className="flex flex-col items-center justify-center"
      style={{ height: "calc(100vh - 300px)" }}
    >
      <FaExclamationTriangle className="text-4xl hightlight-font-color mb-4" />
      <h1 className="text-2xl font-bold mb-2">
        Oops! The link that you click is invalid or expired !
      </h1>
      <p className="text-lg mb-4 text-center">
        Please contact the administrator if you require further assistance
      </p>
      <Link href="/login" className="mt-2">
        <div className="hightlight-font-color">Go to Login Page</div>
      </Link>
    </div>
  );
};

export default page;
