"use client";

import { useSearchParams, usePathname, useRouter } from "next/navigation";
import BaseComponent from "./BaseComponent";
import { formatDateToISOStringWithTimeZone } from "@/lib/utils";

export function DatePickerComponent({ inputKey }: { inputKey: string }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const urlParam = searchParams.get(inputKey)?.toString();
  let date: Date | undefined = urlParam ? new Date(urlParam) : undefined;

  function handleSelect(date: Date | undefined) {
    const params = new URLSearchParams(searchParams);
    if (date) {
      params.set(inputKey, String(formatDateToISOStringWithTimeZone(date)));
    } else {
      params.delete(inputKey);
    }
    replace(`${pathname}?${params.toString()}`);
  }

  return <BaseComponent date={date} handleSelect={handleSelect} />;
}
