import { fetchExistingWaitingList } from "@/actions/waiting-list";
import WaitingListForm from "./WaitingListForm";
import React from "react";
import { getUserId } from "@/actions/profiles";
import { v4 as uuidv4 } from "uuid";

export default async function WaitingListParent() {
  const userId = await getUserId();
  const waitingListData = await fetchExistingWaitingList();
  const id: string = uuidv4();
  const defaultData = {
    _id: id,
    from_date: new Date(),
    max_rent: 0,
    apartment_type: "all",
    additional_data: "",
    desired_semesters_stay: "1",
    user_id: userId,
  };

  const data = waitingListData ?? defaultData;

  return <WaitingListForm existingData={data} isUpdate={!!waitingListData} />;
}
