"use client";

import { signOut } from "@/actions/authentications";
import React from "react";
import { LuLogOut } from "react-icons/lu";

const Logout = () => {
  return (
    <div onClick={() => signOut()} className="gap-2 flex items-center">
      <LuLogOut className="icon w-4 h-4" /> Logout
    </div>
  );
};

export default Logout;
