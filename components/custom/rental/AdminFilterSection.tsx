import React from "react";
import { Label } from "../../ui/label";
import { adminsortOptions } from "@/constants";
import { DropdownComponent } from "../../ui/dropdown/URLSyncDropdown";
import PropertyFilterReset from "../../shared/FilterReset";
import { InputComponent } from "@/components/ui/input/URLSyncInput";
import URLSyncInputSuspense from "@/components/shared/URLSyncInputSuspense";
import { CheckboxComponent } from "@/components/ui/check/URLSyncCheckbox";

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
              <InputComponent inputKey="property-id" />
            </URLSyncInputSuspense>
          </div>
        </div>
        <div className="col-span-6 md:col-span-3 lg:col-span-2">
          <div className="flex flex-col gap-2 p-1">
            <Label>User Id</Label>
            <URLSyncInputSuspense>
              <InputComponent inputKey="user-id" />
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
        <div className="col-span-6 md:col-span-3 lg:col-span-2 content-center">
          <div className="flex flex-col gap-2 p-1">
            <div className="flex items-center space-x-2 text-center align-middle">
              <URLSyncInputSuspense>
                <CheckboxComponent inputKey="rental-end" />
              </URLSyncInputSuspense>
              <Label>Rental ended soon</Label>
            </div>
          </div>
        </div>
        <div className="col-span-6 md:col-span-3 lg:col-span-2 content-center">
          <div className="flex flex-col gap-2 p-1">
            <div className="flex items-center space-x-2 text-center align-middle">
              <URLSyncInputSuspense>
                <CheckboxComponent inputKey="confirm" />
              </URLSyncInputSuspense>
              <Label>Tenant Confirmed</Label>
            </div>
          </div>
        </div>
        <div className="col-span-6 md:col-span-3 lg:col-span-2 content-center">
          <div className="flex flex-col gap-2 p-1">
            <div className="flex items-center space-x-2 text-center align-middle">
              <URLSyncInputSuspense>
                <CheckboxComponent inputKey="dispatch" />
              </URLSyncInputSuspense>
              <Label>Property Relisted </Label>
            </div>
          </div>
        </div>
        <div className="col-span-6 md:col-span-3 lg:col-span-2"></div>
        <div className="col-span-6 md:col-start-5 md:col-end-7 flex justify-end">
          <PropertyFilterReset newPath="/manage-rentals" />
        </div>
      </div>
    </div>
  );
};

export default AdminFilterSection;
