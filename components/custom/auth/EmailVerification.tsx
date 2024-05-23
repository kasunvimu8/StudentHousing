"use client";
import Link from "next/link";
import React from "react";
import { FaExclamationTriangle } from "react-icons/fa";
import { GoCheckCircleFill } from "react-icons/go";

const EmailVerification = (data: { msg: string; type: string }) => {
  return (
    <div
      className="flex flex-col items-center justify-center"
      style={{ height: "calc(100vh - 300px)" }}
    >
      {data.type === "ok" ? (
        <GoCheckCircleFill className="text-4xl hightlight-font-color mb-4" />
      ) : (
        <FaExclamationTriangle className="text-4xl hightlight-font-color mb-4" />
      )}
      <h1 className="text-2xl font-bold mb-2">
        Email Verification - {data.type === "ok" ? "Success" : "Failed"}
      </h1>
      <p className="text-lg mb-4 text-center">{data.msg}</p>
      <Link href="/login" className="mt-2">
        <div className="hightlight-font-color">Go to Login Page</div>
      </Link>
    </div>
  );
};

export default EmailVerification;
