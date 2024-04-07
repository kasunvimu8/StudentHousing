"use client";

import React, { useState, useEffect, useRef, ReactNode } from "react";
import { TbTriangleInvertedFilled } from "react-icons/tb";

interface TooltipProps {
  content: string;
  children: ReactNode;
}

const Tooltip: React.FC<TooltipProps> = ({ content, children }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const tooltipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        tooltipRef.current &&
        !tooltipRef.current.contains(event.target as Node)
      ) {
        setShowTooltip(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative inline-block">
      <div
        onClick={() => setShowTooltip(!showTooltip)}
        className="inline-block cursor-pointer primary-font-color"
      >
        {children}
      </div>
      {showTooltip && (
        <>
          <div
            ref={tooltipRef}
            className="tooltip-content primary-background-color w-[200px] px-3 py-1.5 text-xs font-medium secondary-font-color rounded-md shadow-lg absolute bottom-full left-1/2 transform -translate-x-[15px] -translate-y-1.5"
            style={{ zIndex: 1000 }}
          >
            <TbTriangleInvertedFilled className="absolute -bottom-2 primary-font-color" />
            <div className="relative">{content}</div>
          </div>
        </>
      )}
    </div>
  );
};

export default Tooltip;
