import React, { ReactNode, Suspense } from "react";
import { Skeleton } from "../ui/Skelton";

const URLSyncInputSuspense = ({ children }: { children: ReactNode }) => {
  return (
    <Suspense
      fallback={
        <Skeleton className="h-[36px] w-[250px] rounded-lg section-light-background-color" />
      }
    >
      {children}
    </Suspense>
  );
};

export default URLSyncInputSuspense;
