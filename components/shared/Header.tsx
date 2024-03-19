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
import { normalUserNavMenu } from "@/constants";

// ----- Header Component - Shared in all components except login, register & logout pages ----------//

const Header = () => {
  return (
    <header className="w-full px-5 md:px-10 py-8">
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
        <div className="flex items-center gap-2">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="font-medium text-sm">
                  Kasun Vimukthi
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[150px] gap-3 p-2 md:w-[180px]">
                    {normalUserNavMenu.map((menu) => (
                      <MenuItem menu={menu} />
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
