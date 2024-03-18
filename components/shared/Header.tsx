import Image from "next/image";
import Link from "next/link";
import React from "react";

const navigation = [
  { name: "Dashboard", href: "#", current: true },
  { name: "Team", href: "#", current: false },
  { name: "Projects", href: "#", current: false },
  { name: "Calendar", href: "#", current: false },
];

const Header = () => {
  return (
    <header className="w-full p-2 md:px-10 md:py-5 sm:px-6 sm:py-5">
      <div className="flex items-center justify-between m-2">
        <Link href="/" className="w-30">
          <Image
            src="/images/logo.svg"
            width={100}
            height={100}
            alt="Student Housing Logo"
          />
        </Link>
        {/* <div className="hidden sm:ml-6 sm:block">
          <div className="flex space-x-4">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white"
                aria-current="page"
              >
                {item.name}
              </a>
            ))}
          </div>
        </div> */}
        <div className="flex items-center gap-2">
          <button>
            <Link href="/sign-in">Login</Link>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
