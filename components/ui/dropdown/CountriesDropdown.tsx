"use client";

import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { OptionType } from "@/types";
import { cn } from "@/lib/utils";
import Flag from "react-world-flags";

export const CountriesDropdown = ({
  value,
  options,
  optionsLabel,
  showAllItem,
  handleSelect,
  className,
  placeHoder,
}: {
  value: string;
  options: OptionType[];
  optionsLabel: string;
  showAllItem: boolean;
  handleSelect: (value: string) => void;
  className?: string;
  placeHoder?: string;
}) => {
  return (
    <Select onValueChange={(value) => handleSelect(value)} value={value}>
      <SelectTrigger className={cn("w-[250px] bg-white", className)}>
        <SelectValue placeholder={placeHoder} />
      </SelectTrigger>
      <SelectContent className="bg-white">
        <SelectGroup>
          <SelectLabel>{optionsLabel}</SelectLabel>
          {showAllItem && (
            <SelectItem
              key="all"
              value="all"
              className="hover:section-light-background-color"
            >
              All
            </SelectItem>
          )}
          {options.map((option) => (
            <SelectItem
              key={option.id}
              value={option.id}
              className="hover:section-light-background-color"
            >
              <div style={{ display: "flex", alignItems: "center" }}>
                <Flag code={option.id} className="w-5 h-5 mr-2" />
                <span style={{ marginRight: "10px" }}>
                  {option.description}
                </span>
              </div>
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
