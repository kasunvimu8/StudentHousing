"use client";

import { OptionType } from "@/types";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import BaseComponent from "./BaseComponent";
import { useEffect } from "react";

export function DropdownComponent({
  options,
  optionsLabel,
  showAllItem,
  inputKey,
}: {
  options: OptionType[];
  optionsLabel: string;
  showAllItem: boolean;
  inputKey: string;
}) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const urlParam = searchParams.get(inputKey)?.toString();
  let value = urlParam ? urlParam : showAllItem ? "all" : options?.[0]?.id;

  function updateURL(term: string) {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set(inputKey, term);
      value = term;
    } else {
      params.delete(inputKey);
      value = "all";
    }
    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <BaseComponent
      value={value}
      options={options}
      optionsLabel={optionsLabel}
      showAllItem={showAllItem}
      handleSelect={updateURL}
    />
  );
}
