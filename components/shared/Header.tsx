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
import { normalUserNavMenu } from "@/constants";

const Header = () => {
  return (
    <header className="w-full p-2 md:px-10 sm:px-8 py-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
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
                <NavigationMenuTrigger className="text-base font-normal">Kasun Vimukthi</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[130px] gap-3 p-4 md:w-[150px]">
                    {normalUserNavMenu.map((menu) => (
                      <Link
                        key={menu.title}
                        href={menu.href}
                        className="primary-font-color font-normal text-base"
                      >
                        {menu.title}
                      </Link>
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
