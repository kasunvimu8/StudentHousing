import React from "react";
import { Label } from "../../ui/label";
import {
  adminsortOptions,
  numberOfRooms,
  propertyStatuses,
  propertyTypes,
} from "@/constants";
import { DropdownComponent } from "../../ui/dropdown/URLSyncDropdown";
import { DatePickerComponent } from "../../ui/calendar/URLSyncDropdown";
import PropertyFilterReset from "../../shared/FilterReset";

const AdminFilterSection = () => {
  return (
    <div className="my-5 rounded-lg section-background-color">
      <div className="grid grid-cols-6 gap-4 p-5">
        <div className="col-span-6 md:col-span-3 lg:col-span-2">
          <div className="flex flex-col gap-2 p-1">
            <Label>Property Type</Label>
            <DropdownComponent
              options={propertyTypes}
              optionsLabel="Select Property Types"
              showAllItem={true}
              inputKey="property_type"
            />
          </div>
        </div>
        <div className="col-span-6 md:col-span-3 lg:col-span-2">
          <div className="flex flex-col gap-2 p-1">
            <Label>Available From</Label>
            <div className="min-w-[300px]">
              <DatePickerComponent inputKey={"from"} />
            </div>
          </div>
        </div>
        <div className="col-span-6 md:col-span-3 lg:col-span-2">
          <div className="flex flex-col gap-2 p-1">
            <Label>Property Status</Label>
            <DropdownComponent
              options={propertyStatuses}
              optionsLabel="Select Property Status"
              showAllItem={true}
              inputKey="rooms"
            />
          </div>
        </div>
        <div className="col-span-6 md:col-span-3 lg:col-span-2">
          <div className="flex flex-col gap-2 p-1">
            <Label>Number of Rooms</Label>
            <DropdownComponent
              options={numberOfRooms}
              optionsLabel="Select Number of Rooms"
              showAllItem={true}
              inputKey="rooms"
            />
          </div>
        </div>
        <div className="col-span-6 md:col-span-3 lg:col-span-2">
          <div className="flex flex-col gap-2 p-1">
            <Label>Sort By</Label>
            <DropdownComponent
              options={adminsortOptions}
              optionsLabel="Select Sort Option"
              showAllItem={false}
              inputKey="sort"
            />
          </div>
        </div>
        <div className="col-span-6 md:col-start-5 md:col-end-7 flex justify-end">
          <PropertyFilterReset newPath="/manage-properties" />
        </div>
      </div>
    </div>
  );
};

export default AdminFilterSection;
