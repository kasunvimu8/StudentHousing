"use client";

import React from "react";
import { Button } from "../ui/button";

const PropertyFilterButton = () => {
  const resentFilter = () => {
    window.history.replaceState(null, "", "/properties");
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

export default PropertyFilterButton;
