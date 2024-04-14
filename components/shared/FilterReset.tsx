"use client";

import React from "react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

const PropertyFilterReset = ({ newPath }: { newPath: string }) => {
  const router = useRouter();

  const resentFilter = () => {
    router.push(newPath);
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
