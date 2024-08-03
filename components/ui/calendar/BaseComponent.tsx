import React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn, formatDateTime } from "@/lib/utils";

export const BaseComponent = ({
  date,
  handleSelect,
  className,
  fromYear,
  toYear,
}: {
  date: Date | undefined;
  handleSelect: (date: Date | undefined) => void;
  className?: string;
  fromYear?: number;
  toYear?: number;
}) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[250px] justify-start text-left font-normal bg-white",
            !date && "text-muted-foreground",
            className ?? className
          )}
        >
          {date ? formatDateTime(date).simpleDate : <span>Select a date</span>}
          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={handleSelect}
          initialFocus
          className="bg-white margin-zero"
          captionLayout="dropdown-buttons"
          fromYear={fromYear}
          toYear={toYear}
        />
      </PopoverContent>
    </Popover>
  );
};
