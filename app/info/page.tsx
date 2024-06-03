import React from "react";
import InfoPage from "../(root)/information/page";
import Link from "next/link";
import Image from "next/image";

const page = () => {
  return (
    <div className="w-full h-full">
      <div className="w-full p-2 fixed bg-white topest-overlay">
        <header className="w-full p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <Link href="/" className="w-30 ml-2 mt-1">
                <Image
                  src="/images/logo.svg"
                  width={102}
                  height={52}
                  alt="Student Housing Logo"
                />
              </Link>
            </div>
          </div>
        </header>
      </div>
      <div
        className="flex px-10 sm:px-20 flex-col primary-font-color pt-[120px]"
        style={{ minHeight: "calc(100vh - 162px)" }}
      >
        <InfoPage />
      </div>
    </div>
  );
};

export default page;
