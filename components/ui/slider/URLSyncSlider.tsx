"use client";

import { useEffect, useState } from "react";
import { SliderProps } from "@/types";
import BaseComponent from "./BaseComponent";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

/* Slider Component - Because of limitation on available Slider component in radix UI,needed to maintain
 local state in the component rather than sync with the urls params  -> onvalue commit changes the url and onchange 
 update the local state
 */

export const Slider = ({
  min,
  max,
  step,
  minStepsBetweenThumbs,
  inputKey,
  formatLabel,
}: SliderProps) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const urlParam = searchParams.get(inputKey)?.toString();
  let initialValue = urlParam ? urlParam.split(",") : "";
  let intialValues: number[] = Array.isArray(initialValue)
    ? initialValue.map((str: string) => parseInt(str))
    : [min, max];

  const [localValues, setLocalValues] = useState(intialValues);

  const handleValueChange = (newValues: number[]) => {
    setLocalValues(newValues);
  };

  useEffect(() => {
    let value = urlParam ? urlParam.split(",") : "";
    let values: number[] = Array.isArray(value)
      ? value.map((str: string) => parseInt(str))
      : [min, max];

    // Update localValues when the external value prop changes
    setLocalValues(Array.isArray(values) ? values : [min, max]);
  }, [urlParam]);

  const onValueCommit = (newValues: number[]) => {
    const params = new URLSearchParams(searchParams);
    if (newValues) {
      const str = newValues.join(",");
      params.set(inputKey, str);
    } else {
      params.delete(inputKey);
    }
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <BaseComponent
      min={min}
      max={max}
      step={step}
      minStepsBetweenThumbs={minStepsBetweenThumbs}
      value={localValues}
      formatLabel={formatLabel}
      onValueChange={handleValueChange}
      onValueCommit={onValueCommit}
      inputKey={inputKey}
    />
  );
};
