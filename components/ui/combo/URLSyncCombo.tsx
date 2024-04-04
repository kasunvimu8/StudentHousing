"use client";

import { ComboContentType } from "@/types";
import React from "react";
import { ComboboxComponent } from "./BaseComponent";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

const URLSyncCombo = ({
  notfoundLabel,
  placeholder,
  options,
  inputKey,
  showAllItem,
}: {
  notfoundLabel: string;
  placeholder: string;
  inputKey: string;
  showAllItem: boolean;
  options: ComboContentType[];
}) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const urlParam = searchParams.get(inputKey)?.toString();
  let value = urlParam ? urlParam : showAllItem ? "all" : options?.[0]?.id;

  const onValueChange = (newValues: string) => {
    const params = new URLSearchParams(searchParams);
    if (newValues) {
      params.set(inputKey, newValues);
    } else {
      params.delete(inputKey);
    }
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <ComboboxComponent
      notfoundLabel={notfoundLabel}
      placeholder={placeholder}
      options={options}
      value={value}
      onValueChange={onValueChange}
      showAllItem={showAllItem}
    />
  );
};

export default URLSyncCombo;
