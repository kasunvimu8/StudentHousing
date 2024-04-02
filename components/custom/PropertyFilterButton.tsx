"use client";

import React from "react";
import { Button } from "../ui/button";

const PropertyFilterButton = ({ filter }: { filter: () => void }) => {
  const resentFilter = () => {
    window.history.replaceState(null, "", "/properties");
  };
  return (
    <div className="grid grid-cols-2 gap-2 justify-end">
      <Button className="py-5 px-7 self-end" onClick={resentFilter}>
        Reset
      </Button>
      <Button
        className="py-5 px-7 primary-background-color secondary-font-color self-end"
        onClick={filter}
      >
        Filter
      </Button>
    </div>
  );
};

export default PropertyFilterButton;
