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

export const BaseComponent = ({
  value,
  options,
  optionsLabel,
  showAllItem,
  handleSelect,
}: {
  value: string;
  options: OptionType[];
  optionsLabel: string;
  showAllItem: boolean;
  handleSelect: (value: string) => void;
}) => {
  return (
    <Select onValueChange={(value) => handleSelect(value)} value={value}>
      <SelectTrigger className="w-[250px] bg-white">
        <SelectValue />
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