import { propertyTypes } from "@/constants";
import { cn, formatDateTime } from "@/lib/utils";
import { WaitinRecordType } from "@/types";
import React from "react";

const WaitingListComponent = ({
  waitingList,
  selectedWaitingListItem,
  setSelectedWaitingListItem,
}: {
  waitingList: WaitinRecordType[];
  selectedWaitingListItem: WaitinRecordType;
  setSelectedWaitingListItem: React.Dispatch<
    React.SetStateAction<WaitinRecordType>
  >;
}) => {
  return (
    <div className="flex flex-col gap-2 p-4 pt-0">
      {waitingList.length > 0 ? (
        <>
          {waitingList.map((item) => {
            const aprtmentTpe =
              item.apartment_type === "all"
                ? "All Types"
                : propertyTypes.find((type) => type.id === item.apartment_type)
                    ?.description;
            return (
              <button
                key={item.user_id}
                className={cn(
                  "flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:section-background-color",
                  selectedWaitingListItem.user_id === item.user_id &&
                    "bg-gray-100"
                )}
                onClick={() => setSelectedWaitingListItem(item)}
              >
                <div className="flex w-full flex-col gap-1">
                  <div className="flex items-center">
                    <div className="font-semibold text-sm">
                      Enrollment Id : {item.user_id}
                    </div>
                    <div className="ml-auto text-xs">
                      {`Created on `}
                      {item.created_at
                        ? formatDateTime(item.created_at).simpleDate
                        : ""}
                    </div>
                  </div>
                  <div className="w-full grid grid-cols-2 gap-2">
                    <div className="flex flex-col items-start">
                      <div className="primary-light-font-color text-xs">
                        Apartment Type
                      </div>
                      <div className="text-sm primary-font-color">
                        {aprtmentTpe}
                      </div>
                    </div>
                    <div className="flex flex-col items-start">
                      <div className="primary-light-font-color text-xs">
                        Max Rent
                      </div>
                      <div className="text-sm primary-font-color">
                        {item.max_rent} €
                      </div>
                    </div>
                    <div className="flex flex-col items-start">
                      <div className="primary-light-font-color text-xs">
                        Desired Semesters
                      </div>
                      <div className="text-sm primary-font-color">
                        {item.desired_semesters_stay}
                      </div>
                    </div>
                    <div className="flex flex-col items-start">
                      <div className="primary-light-font-color text-xs">
                        From Date
                      </div>
                      <div className="text-sm primary-font-color">
                        {formatDateTime(item.from_date).simpleDate}
                      </div>
                    </div>
                  </div>
                  <div className="text-xs font-normal pt-2">
                    <div className="flex flex-col items-start">
                      <div className="primary-light-font-color text-xs">
                        Additional Data
                      </div>
                      <div className="text-sm primary-font-color">
                        {item.additional_data}
                      </div>
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </>
      ) : (
        <div className="text-sm font-normal text-center">
          No waiting list entries found
        </div>
      )}
    </div>
  );
};

export default WaitingListComponent;
