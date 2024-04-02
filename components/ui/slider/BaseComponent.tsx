"use client";

import { Fragment } from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";
import { cn } from "@/lib/utils";
import { SliderProps } from "@/types";

type SliderPropsExt = SliderProps & {
  onValueChange: (value: number[]) => void;
  onValueCommit: (value: number[]) => void;
};

const BaseComponent = ({
  min,
  max,
  step,
  minStepsBetweenThumbs,
  value,
  onValueChange,
  onValueCommit,
  formatLabel,
  className,
  inputKey,
  ...props
}: SliderPropsExt) => {
  return (
    <SliderPrimitive.Root
      min={min}
      max={max}
      step={step}
      value={value}
      onValueChange={onValueChange}
      onValueCommit={onValueCommit}
      className={cn(
        "relative flex w-full touch-none select-none mb-6 items-center",
        className
      )}
      {...props}
    >
      <SliderPrimitive.Track className="relative h-1.5 w-full grow overflow-hidden rounded-full primary-light-background-color">
        <SliderPrimitive.Range className="absolute h-full primary-background-color" />
      </SliderPrimitive.Track>
      {value?.map((val, index) => (
        <Fragment key={index}>
          <SliderPrimitive.Thumb className="block h-4 w-4 rounded-full border primary-background-color/50 primary-background-color shadow transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50">
            <div className="absolute top-5 left-1/2 transform -translate-x-1/2 z-30 rounded-md border bg-popover text-popover-foreground shadow-sm px-2 py-1 text-sm font-medium">
              {formatLabel ? formatLabel(val) : val}
            </div>
          </SliderPrimitive.Thumb>
        </Fragment>
      ))}
    </SliderPrimitive.Root>
  );
};

export default BaseComponent;
