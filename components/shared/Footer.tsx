import Link from "next/link";
import React from "react";

// ----- Footer Component - Shared in all components except login, register & logout pages ----------//
const Footer = () => {
  return (
    <footer className="section-background-color rounded-t-lg mt-6 w-full">
      <div className="w-full py-6">
        <ul className="flex justify-center mt-2 text-sm font-medium gap-10 p-2">
          <li>
            <Link href={"https://www.linkedin.com/in/kasunvimu/"}>
              Developer
            </Link>
          </li>
          <li>
            <Link href={"/imprint"}>Imprint</Link>
          </li>
          <li>
            <Link href={"/data-protection"}> Data Protection </Link>
          </li>
        </ul>
        <hr className="my-3 border-gray-200 sm:mx-auto" />
        <span className="block text-sm text-center ">
          © 2024 All Rights Reserved
        </span>
      </div>
    </footer>
  );
};
export default Footer;
