import Image from "next/image";
import Link from "next/link";
import React from "react";
import MobileNavItems from "@/components/shared/MobileNavItems";
import { UserNav } from "@/components/shared/UserNavigation";
import { getUserType } from "@/actions/profiles";
import { adminType, headerLinks } from "@/constants";
import HeaderNavigation from "@/components/shared/HeaderNavigation";

// ----- Header Component - Shared in all components except login, register & logout pages ----------//

const Header = async () => {
  const userType = await getUserType();
  const links =
    userType === adminType
      ? headerLinks
      : headerLinks.filter((link) => !link.isAdminRoute);

  return (
    <header className="w-full p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          <nav className="flex md:hidden items-center justify-start w-25">
            <MobileNavItems links={links} />
          </nav>
          <Link href="/" className="w-30 ml-2 mt-1 hidden md:flex">
            <Image
              src="/images/logo.png"
              width={257}
              height={70}
              alt="Student Housing Logo"
            />
          </Link>
          <Link href="/" className="w-30 ml-2 mt-1 md:hidden">
            <Image
              src="/images/logo.png"
              width={180}
              height={50}
              alt="Student Housing Logo"
            />
          </Link>
        </div>
        <nav className="hidden md:flex items-center  justify-center w-full">
          <HeaderNavigation />
        </nav>
        <div className="flex items-center gap-2 pr-8 md:pr-10">
          <UserNav />
        </div>
      </div>
    </header>
  );
};

export default Header;
