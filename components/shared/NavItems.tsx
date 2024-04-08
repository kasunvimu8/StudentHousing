"use client";

import { headerLinks } from "@/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

// ---------------- Main Menu Component in the Header ---------------------//

const NavItems = () => {
  const pathname = usePathname();

  return (
    <ul className="md:flex-between flex w-full flex-col items-start gap-4 md:flex-row pt-5">
      {headerLinks.map((link) => {
        const isActive = pathname === link.route;

        return (
          <li
            key={link.id}
            className={`${
              isActive ? "font-semibold hightlight-font-color" : "font-normal"
            } flex-center text-xl whitespace-nowrap`}
          >
            <Link href={link.route}>{link.label}</Link>
          </li>
        );
      })}
    </ul>
  );
};

export default NavItems;
