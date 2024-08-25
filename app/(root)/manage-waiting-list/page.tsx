import { fetchAllWaitingList } from "@/actions/waiting-list";
import PageTitle from "@/components/shared/PageTitle";
import React from "react";

export default async function Page() {
  const waitingListData = await fetchAllWaitingList();
  return (
    <div className="h-full w-full">
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2 md:col-span-1">
          <PageTitle title="Manage Waiting List" />
        </div>
      </div>
      <div className="mx-auto py-5"></div>
    </div>
  );
}
