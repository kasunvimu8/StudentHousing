"use client";

import React from "react";
import { LuArrowUp } from "react-icons/lu";
import { Button } from "../button";

const GotoTop = () => {
  const goUp = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="flex justify-end  py-[15px] md:py-[20px]">
      <Button className="highlight-background-color secondary-font-color">
        <LuArrowUp onClick={goUp} />
      </Button>
    </div>
  );
};

export default GotoTop;
