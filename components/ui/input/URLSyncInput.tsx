"use client";

import { useEffect } from "react";
import { Input } from "@/components/ui/input";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

export function InputComponent({ inputKey }: { inputKey: string }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const urlParam = searchParams.get(inputKey)?.toString();
  let value = urlParam ? urlParam : "";

  const updateURL = (term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set(inputKey, term);
      value = term;
    } else {
      params.delete(inputKey);
      value = "";
    }
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="w-[250px]">
      <Input
        value={value}
        className="bg-white"
        onChange={(e: React.FormEvent<HTMLInputElement>) =>
          updateURL(e.currentTarget.value)
        }
      />
    </div>
  );
}
