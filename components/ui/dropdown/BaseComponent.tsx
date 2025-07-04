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

export const BaseComponent = ({
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
              {option.description}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
