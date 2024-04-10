import React from "react";
import { Skeleton } from "../../ui/Skelton";

export const PropertiesLoading = () => {
  return (
    <div className="flex items-center justify-between gap-10 flex-grow w-full">
      <Skeleton className="h-[400px] w-[320px] rounded-lg section-light-background-color" />
      <Skeleton className="hidden sm:block h-[400px] w-[320px] rounded-lg section-light-background-color" />
      <Skeleton className="hidden lg:block h-[400px] w-[320px] rounded-lg section-light-background-color" />
    </div>
  );
};

export const MapLoading = () => {
  return (
    <div className="flex items-center justify-between gap-10 flex-grow w-full">
      <Skeleton className="h-[400px] w-[320px] md:h-[400px] md:w-[1000px] lg:h-[400px] lg:w-[1100px] rounded-lg section-light-background-color" />
    </div>
  );
};
