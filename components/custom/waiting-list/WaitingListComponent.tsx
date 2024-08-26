import { WaitinRecordType } from "@/types";
import React from "react";

const WaitingListComponent = ({
  waitingList,
}: {
  waitingList: WaitinRecordType[];
}) => {
  return (
    <div className="flex flex-col gap-2 p-4 pt-0">
      <div className="h-[200px]">Test 1</div>
      <div className="h-[200px]">Test 2</div>
      <div className="h-[200px]">Test 3</div>
      <div className="h-[200px]">Test 4</div>
      <div className="h-[200px]">Test 5</div>
      <div className="h-[200px]">Test 6</div>
      <div className="h-[200px]">Test</div>
      <div className="h-[200px]">Test</div>
    </div>
  );
};

export default WaitingListComponent;
