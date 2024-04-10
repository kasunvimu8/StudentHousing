"use client";

import React from "react";
import { Button } from "../../ui/button";
import { useRouter } from "next/navigation";

const PropertyReserve = () => {
  const router = useRouter();

  const reserve = () => {};
  return (
    <div className="flex justify-end py-6">
        <Button
        className="py-5 px-10 primary-background-color secondary-font-color self-end"
        onClick={reserve}
        >
        Reserve
        </Button>
    </div>
  );
};

export default PropertyReserve;
