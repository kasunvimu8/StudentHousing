import React from "react";
import Link from "next/link";
import { LuLogOut, LuHome, LuUserCog2 } from "react-icons/lu";
import { IconType } from "react-icons";

// ---------------- Menu Item Component ---------------------//

const MenuItem = ({ menu }: any) => {
  let Icon: IconType;
  if (menu.icon == "LuLogOut") {
    Icon = LuLogOut;
  } else if (menu.icon == "LuHome") {
    Icon = LuHome;
  } else {
    Icon = LuUserCog2;
  }

  return (
    <Link
      href={menu.href}
      className="primary-font-color p-1 gap-2 rounded-md font-medium text-sm hover:section-light-background-color flex items-center"
    >
      <Icon className="icon w-5 h-5" />
      {menu.title}
    </Link>
  );
};

export default MenuItem;
