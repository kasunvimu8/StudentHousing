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
      className="gap-2 flex items-center"
    >
      <Icon className="icon w-4 h-4" />
      {menu.title}
    </Link>
  );
};

export default MenuItem;
