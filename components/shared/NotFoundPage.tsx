import React from "react";
import Link from "next/link";
import { FaExclamationTriangle } from "react-icons/fa";

const NoDataNotFoundPage = () => {
  return (
    <div
      className="flex flex-col items-center justify-center"
      style={{ height: "calc(100vh - 300px)" }}
    >
      <FaExclamationTriangle className="text-4xl hightlight-font-color mb-4" />
      <h1 className="text-2xl font-bold mb-2">Oops! Page Not Found</h1>
      <p className="text-lg mb-4 text-center">
        The page you are looking for does not exist.
      </p>
      <Link href="/" className="mt-2">
        <div className="hightlight-font-color">Go to Home Page</div>
      </Link>
    </div>
  );
};

export default NoDataNotFoundPage;
