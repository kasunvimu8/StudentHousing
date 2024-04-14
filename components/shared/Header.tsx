import Image from "next/image";
import Link from "next/link";
import React from "react";
import NavItems from "@/components/shared/NavItems";
import MobileNavItems from "@/components/shared/MobileNavItems";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import MenuItem from "./MenuItem";
import { adminUsernavigation, normalUserNavMenu } from "@/constants";
import { getUserType } from "@/actions/profiles";

// ----- Header Component - Shared in all components except login, register & logout pages ----------//

const Header = async () => {
  const userType = await getUserType();
  const navOptions =
    userType === "admin" ? adminUsernavigation : normalUserNavMenu;
  return (
    <header className="w-full p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          <nav className="flex md:hidden items-center justify-start w-25">
            <MobileNavItems />
          </nav>
          <Link href="/" className="w-30 ml-2">
            <Image
              src="/images/logo.svg"
              width={102}
              height={52}
              alt="Student Housing Logo"
            />
          </Link>
        </div>
        <nav className="hidden md:flex items-center w-full max-w-xs">
          <NavItems />
        </nav>
        <div className="flex items-center gap-2 pr-8 md:pr-10">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="font-medium text-sm">
                  Kasun Vimukthi
                </NavigationMenuTrigger>
                <NavigationMenuContent className="bg-white">
                  <ul className="grid w-[200px] gap-3 p-2">
                    {navOptions?.map((menu) => (
                      <MenuItem menu={menu} key={menu.id} />
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </div>
    </header>
  );
};

export default Header;
