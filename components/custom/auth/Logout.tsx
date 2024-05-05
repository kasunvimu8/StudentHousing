"use client";

import { signOut } from "@/actions/authentications";
import React from "react";
import { LuLogOut } from "react-icons/lu";

const Logout = () => {
  return (
    <div
      onClick={() => signOut()}
      className="cursor-pointer primary-font-color p-1 gap-2 rounded-md font-medium text-sm hover:section-light-background-color flex items-center justify-start"
    >
      <LuLogOut className="icon w-5 h-5" /> Logout
    </div>
  );
};

export default Logout;
