import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Image from "next/image";
import NavItems from "./NavItems";
import { LuAlignLeft } from "react-icons/lu";
import { NavLinkData } from "@/types";

// ---------------- Mobile Memu Component ---------------------//

const MobileNav = ({ links }: { links: NavLinkData[] }) => {
  return (
    <nav className="md:hidden">
      <Sheet>
        <SheetTrigger className="align-middle">
          <LuAlignLeft size={25} className="primary-font-color" />
        </SheetTrigger>
        <SheetContent
          side="left"
          className="flex flex-col gap-6 bg-white md:hidden topest-overlay"
        >
          <Image
            src="/images/logo.png"
            alt="logo"
            width={200}
            height={55}
            className="mt-1"
          />
          <NavItems links={links} />
        </SheetContent>
      </Sheet>
    </nav>
  );
};

export default MobileNav;
