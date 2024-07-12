"use client";

import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { Checkbox } from "@/components/ui/checkbox";

export function CheckboxComponent({ inputKey }: { inputKey: string }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const urlParam = searchParams.get(inputKey)?.toString();
  let value = urlParam === "true";

  const updateURL = (term: boolean) => {
    const params = new URLSearchParams(searchParams);

    params.set(inputKey, String(term));
    value = term;

    // if (term) {
    // } else {
    //   value = term;
    //   params.delete(inputKey);
    //   value = false;
    // }
    replace(`${pathname}?${params.toString()}`);
  };

  return <Checkbox checked={value} onCheckedChange={() => updateURL(!value)} />;
}
