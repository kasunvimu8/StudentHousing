import React from "react";
import Link from "next/link";
import { getIconFromKey } from "@/lib/icons";
import { NavType } from "@/types";

// ---------------- Menu Item Component ---------------------//

const MenuItem = ({ menu }: { menu: NavType }) => {
  const Icon = getIconFromKey(menu.icon);

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
