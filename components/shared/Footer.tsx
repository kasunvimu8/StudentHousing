import Link from "next/link";
import React from "react";

// ----- Footer Component - Shared in all components except login, register & logout pages ----------//
const Footer = () => {
  return (
    <footer className="section-background-color rounded-t-lg mt-6">
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-6">
        <ul className="flex justify-center mt-2 text-sm font-medium gap-10 p-2">
          <li>
            <Link href={"/properties"}>Properties</Link>
          </li>
          <li>
            <Link href={"/information"}>Infromation</Link>
          </li>
          <li>
            <Link href={"/contacts"}> Contact </Link>
          </li>
        </ul>
        <hr className="my-3 border-gray-200 sm:mx-auto" />
        <span className="block text-sm text-center ">
          © 2024 All Rights Reserved.
        </span>
      </div>
    </footer>
  );
};
export default Footer;
