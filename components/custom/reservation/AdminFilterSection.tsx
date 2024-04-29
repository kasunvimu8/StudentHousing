import React from "react";
import { Label } from "../../ui/label";
import {
  adminsortOptions,
  numberOfRooms,
  propertyStatuses,
  propertyTypes,
  reservationStatuses,
} from "@/constants";
import { DropdownComponent } from "../../ui/dropdown/URLSyncDropdown";
import { DatePickerComponent } from "../../ui/calendar/URLSyncDropdown";
import PropertyFilterReset from "../../shared/FilterReset";
import { InputComponent } from "@/components/ui/input/URLSyncInput";
import URLSyncInputSuspense from "@/components/shared/URLSyncInputSuspense";

const AdminFilterSection = () => {
  return (
    <div className="my-5 rounded-lg section-background-color">
      <div className="grid grid-cols-6 gap-4 p-5">
        <div className="col-span-6 md:col-span-3 lg:col-span-2">
          <div className="flex flex-col gap-2 p-1">
            <Label>Reservation Id</Label>
            <URLSyncInputSuspense>
              <InputComponent inputKey="id" />
            </URLSyncInputSuspense>
          </div>
        </div>
        <div className="col-span-6 md:col-span-3 lg:col-span-2">
          <div className="flex flex-col gap-2 p-1">
            <Label>Property Id</Label>
            <URLSyncInputSuspense>
              <InputComponent inputKey="property_id" />
            </URLSyncInputSuspense>
          </div>
        </div>
        <div className="col-span-6 md:col-span-3 lg:col-span-2">
          <div className="flex flex-col gap-2 p-1">
            <Label>Room Id</Label>
            <URLSyncInputSuspense>
              <InputComponent inputKey="room_id" />
            </URLSyncInputSuspense>
          </div>
        </div>
        <div className="col-span-6 md:col-span-3 lg:col-span-2">
          <div className="flex flex-col gap-2 p-1">
            <Label>User Id</Label>
            <URLSyncInputSuspense>
              <InputComponent inputKey="user_id" />
            </URLSyncInputSuspense>
          </div>
        </div>
        <div className="col-span-6 md:col-span-3 lg:col-span-2">
          <div className="flex flex-col gap-2 p-1">
            <Label>Property Type</Label>
            <URLSyncInputSuspense>
              <DropdownComponent
                options={propertyTypes}
                optionsLabel="Select Property Types"
                showAllItem={true}
                inputKey="property_type"
              />
            </URLSyncInputSuspense>
          </div>
        </div>
        <div className="col-span-6 md:col-span-3 lg:col-span-2">
          <div className="flex flex-col gap-2 p-1">
            <Label>Available From</Label>
            <div className="min-w-[300px]">
              <URLSyncInputSuspense>
                <DatePickerComponent inputKey={"from"} />
              </URLSyncInputSuspense>
            </div>
          </div>
        </div>
        <div className="col-span-6 md:col-span-3 lg:col-span-2">
          <div className="flex flex-col gap-2 p-1">
            <Label>Reservation Status</Label>
            <URLSyncInputSuspense>
              <DropdownComponent
                options={reservationStatuses}
                optionsLabel="Select Reservation Status"
                showAllItem={true}
                inputKey="status"
              />
            </URLSyncInputSuspense>
          </div>
        </div>
        <div className="col-span-6 md:col-span-3 lg:col-span-2">
          <div className="flex flex-col gap-2 p-1">
            <Label>Sort By</Label>
            <URLSyncInputSuspense>
              <DropdownComponent
                options={adminsortOptions}
                optionsLabel="Select Sort Option"
                showAllItem={false}
                inputKey="sort"
              />
            </URLSyncInputSuspense>
          </div>
        </div>
        <div className="col-span-6 md:col-start-5 md:col-end-7 flex justify-end">
          <PropertyFilterReset newPath="/manage-reservations" />
        </div>
      </div>
    </div>
  );
};

export default AdminFilterSection;
