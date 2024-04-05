"use client";

import React from "react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

const PropertyFilterReset = () => {
  const router = useRouter();

  const resentFilter = () => {
    router.push("/properties");
  };
  return (
    <Button
      className="py-5 px-7 primary-background-color secondary-font-color self-end"
      onClick={resentFilter}
    >
      Reset
    </Button>
  );
};

export default PropertyFilterReset;
