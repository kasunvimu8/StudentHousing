import { fetchAllAssignableProperties } from "@/actions/properties";
import { fetchAllWaitingList } from "@/actions/waiting-list";
import { WaitingListMatcher } from "@/components/custom/waiting-list/WaitingList";
import PageTitle from "@/components/shared/PageTitle";
import React from "react";

export default async function Page() {
  const waitingListData = fetchAllWaitingList();
  const allAssignableProperties = fetchAllAssignableProperties();

  const [waitingList, properties] = await Promise.all([
    waitingListData,
    allAssignableProperties,
  ]);
  return (
    <div className="h-full w-full">
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2 md:col-span-1">
          <PageTitle title="Manage Waiting List" />
        </div>
      </div>
      <div className="mx-auto py-4">
        <div className="font-normal text-sm py-2">
          Please match the waiting list record against the available properties.
          Available properties includes all the properties listed in the website
          and the all idle properties.
        </div>
        <WaitingListMatcher waitingList={waitingList} properties={properties} />
      </div>
    </div>
  );
}
