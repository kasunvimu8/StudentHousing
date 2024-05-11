"use client";

import * as React from "react";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CommandList } from "cmdk";
import { ComboContentType } from "@/types";

export function ComboboxComponent({
  notfoundLabel,
  placeholder,
  options,
  value,
  showAllItem,
  onValueChange,
}: {
  notfoundLabel: string;
  placeholder: string;
  value: string;
  showAllItem: boolean;
  options: ComboContentType[];
  onValueChange: (value: string) => void;
}) {
  const [open, setOpen] = React.useState(false);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[250px] justify-between bg-white"
        >
          {value === "all"
            ? "All"
            : options?.find((option) => option.value === value)?.label}
          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50 " />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[250px] p-0 bg-white">
        <Command
          filter={(value, search) => {
            if (value.includes(search)) return 1;
            return 0;
          }}
        >
          <CommandInput placeholder={placeholder} className="h-9" />
          <CommandEmpty>{notfoundLabel}</CommandEmpty>
          <CommandGroup>
            <CommandList className="max-h-[300px] overflow-y-auto">
              {showAllItem && (
                <CommandItem
                  key="all"
                  value="all"
                  onSelect={(currentValue) => {
                    onValueChange(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                  className="hover:section-light-background-color primary-font-color"
                >
                  All
                  <CheckIcon
                    className={cn(
                      "ml-auto h-4 w-4",
                      value === "all" ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              )}
              {options?.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.value}
                  onSelect={(currentValue) => {
                    onValueChange(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                  className="hover:section-light-background-color primary-font-color"
                >
                  {option.label}
                  <CheckIcon
                    className={cn(
                      "ml-auto h-4 w-4",
                      value === option.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandList>
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
