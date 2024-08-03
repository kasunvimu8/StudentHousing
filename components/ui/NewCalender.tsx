import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { FC, useState } from "react";
import { BaseComponent as Select } from "@/components/ui/dropdown/BaseComponent";
import { Calendar } from "@/components/ui/calendar";
import { formatDateTime } from "@/lib/utils";
import { Label } from "@/components/ui/label";

interface DatePickerProps {
  value: Date | undefined;
  onChange: (value: string) => void;
  selectionType?: "date" | "month" | "year" | "recurringDate";
  fromDate?: Date;
  placeholder?: string;
  toDate?: Date;
}

const DatePicker: FC<DatePickerProps> = ({
  onChange,
  value = undefined,
  selectionType,
  placeholder = "Select date",
  fromDate = undefined,
  toDate = undefined,
}) => {
  // Utility functions
  const formatYear = (date: Date) => date.getFullYear().toString();
  const formatMonth = (date: Date) =>
    (date.getMonth() + 1).toString().padStart(2, "0");
  const getMonthLabel = (index: number) =>
    new Date(0, index).toLocaleString("default", { month: "short" });

  // SET MONTH AND YEAR
  const [year, setYear] = useState<string | undefined>(formatYear(new Date()));
  const [defaultMonth, setDefaultMonth] = useState<Date>(new Date());
  const [open, setOpen] = useState(false);

  const fromYear = fromDate
    ? fromDate.getFullYear()
    : new Date().getFullYear() - 50;
  const toYear = toDate ? toDate.getFullYear() : new Date().getFullYear() + 50;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-normal py-2 h-[38px]",
            !value && "text-muted-foreground"
          )}
          onClick={() => setOpen(!open)}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {value ? (
            selectionType === "recurringDate" ? (
              format(value, "MMMM dd")
            ) : (
              formatDateTime(value).simpleDate
            )
          ) : (
            <Label className="text-sm font-medium cursor-pointer leading-none opacity-70 p-1">
              {placeholder}
            </Label>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0" align="start">
        <div className="flex flex-col gap-2 p-2 w-full bg-white">
          <div
            className={`w-full grid gap-3 ${
              selectionType === "recurringDate" ? "grid-cols-1" : "grid-cols-2"
            }`}
          >
            <div className="">
              <Select
                value={String(year)}
                options={Array.from(
                  { length: toYear - fromYear + 1 },
                  (_, i) => ({
                    id: String(toYear - i),
                    description: String(toYear - i),
                  })
                )}
                optionsLabel="Year"
                showAllItem={false}
                handleSelect={(value: any) => {
                  setYear(value);
                  setDefaultMonth(
                    new Date(Number(value), defaultMonth?.getMonth() || 0)
                  );
                }}
                className={"w-auto min-w-[100px]"}
              />
            </div>
            <div className="!h-3">
              <Select
                value={formatMonth(defaultMonth)}
                options={Array.from({ length: 12 }, (_, i) => ({
                  id: (i + 1).toString().padStart(2, "0"),
                  description: getMonthLabel(i),
                }))}
                optionsLabel="Month"
                showAllItem={false}
                handleSelect={(e: any) => {
                  setDefaultMonth(new Date(Number(year), Number(e) - 1));
                }}
                className={"w-auto min-w-[100px]"}
              />
            </div>
          </div>

          <Calendar
            className="w-full"
            fromDate={fromDate}
            toDate={toDate}
            mode="single"
            month={defaultMonth}
            onMonthChange={(e: any) => {
              if (selectionType !== "recurringDate") {
                setDefaultMonth(e);
                setYear(e.getFullYear().toString());
              }
            }}
            selected={value}
            onSelect={(e: any) => {
              if (e) {
                onChange(e);
                setOpen(false);
              }
            }}
            initialFocus
          />
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default DatePicker;
