import { fetchExistingWaitingList } from "@/actions/waiting-list";
import WaitingListForm from "./WaitingListForm";
import React from "react";

export default async function WaitingListParent() {
  const waitingListData = await fetchExistingWaitingList();
  const data = waitingListData ?? {
    fromDate: new Date(),
    maxRent: 0,
    apartmentType: "all",
    additionalData: "",
  };

  return <WaitingListForm existingData={data} isUpdate={!!waitingListData} />;
}
