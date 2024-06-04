"use client";

import { NavLinkData } from "@/types";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

// ---------------- Main Menu Component in the Header ---------------------//

const NavItems = ({ links }: { links: NavLinkData[] }) => {
  const pathname = usePathname();
  return (
    <ul className="md:flex-between flex w-full flex-col items-start gap-6 md:flex-row">
      {links.map((link: NavLinkData) => {
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
