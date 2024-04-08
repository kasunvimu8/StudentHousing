import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Image from "next/image";
import NavItems from "./NavItems";
import { LuAlignLeft } from "react-icons/lu";

// ---------------- Mobile Memu Component ---------------------//

const MobileNav = () => {
  return (
    <nav className="md:hidden">
      <Sheet>
        <SheetTrigger className="align-middle">
          <LuAlignLeft size={25} className="primary-font-color" />
        </SheetTrigger>
        <SheetContent
          side="left"
          className="flex flex-col gap-6 bg-white md:hidden"
        >
          <Image src="/images/logo.svg" alt="logo" width={102} height={52} />
          <NavItems />
        </SheetContent>
      </Sheet>
    </nav>
  );
};

export default MobileNav;
